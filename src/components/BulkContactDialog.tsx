import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronRight, Mail, Linkedin, Loader2 } from 'lucide-react';
import { useAIPersonalize } from '@/hooks/useAIPersonalize';
import { ProfileDialog } from '@/components/ProfileDialog';

interface Candidate {
  id: number;
  name: string;
  image: string;
  city: string;
  match: string;
  roles: { company: string; role: string }[];
  description: string;
  engagementRate: number;
}

interface BulkContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: Candidate[];
}

type Channel = 'email' | 'linkedin' | 'both';

interface PersonalizedMessage {
  candidateId: number;
  message: string;
  channel: Channel;
}

export const BulkContactDialog = ({ open, onOpenChange, candidates }: BulkContactDialogProps) => {
  const [step, setStep] = useState<'select' | 'personalize' | 'sending'>('select');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [personalizedMessages, setPersonalizedMessages] = useState<PersonalizedMessage[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<Set<number>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [sendingProgress, setSendingProgress] = useState(0);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const { personalizeText } = useAIPersonalize();

  const itemsPerPage = 50;
  const totalPages = Math.ceil(candidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = candidates.slice(startIndex, endIndex);

  const toggleCandidate = (id: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAll = () => {
    if (currentCandidates.every(c => selectedIds.has(c.id))) {
      const newSelected = new Set(selectedIds);
      currentCandidates.forEach(c => newSelected.delete(c.id));
      setSelectedIds(newSelected);
    } else {
      const newSelected = new Set(selectedIds);
      currentCandidates.forEach(c => newSelected.add(c.id));
      setSelectedIds(newSelected);
    }
  };

  const handleContactAll = async () => {
    setIsGenerating(true);
    setStep('personalize');

    const selectedCandidates = candidates.filter(c => selectedIds.has(c.id));
    const messages: PersonalizedMessage[] = [];

    for (const candidate of selectedCandidates) {
      const message = await personalizeText('', {
        name: candidate.name,
        role: candidate.roles[0]?.role || 'professional'
      });
      messages.push({
        candidateId: candidate.id,
        message,
        channel: 'both'
      });
    }

    setPersonalizedMessages(messages);
    setIsGenerating(false);
  };

  const updateMessage = (candidateId: number, message: string) => {
    setPersonalizedMessages(prev =>
      prev.map(m => m.candidateId === candidateId ? { ...m, message } : m)
    );
  };

  const updateChannel = (candidateId: number, channel: Channel) => {
    setPersonalizedMessages(prev =>
      prev.map(m => m.candidateId === candidateId ? { ...m, channel } : m)
    );
  };

  const updateAllChannels = (channel: Channel) => {
    setPersonalizedMessages(prev =>
      prev.map(m => ({ ...m, channel }))
    );
  };

  const toggleExpanded = (candidateId: number) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedMessages(newExpanded);
  };

  const handleSendAndApprove = async () => {
    setStep('sending');
    const total = personalizedMessages.length;

    for (let i = 0; i < total; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setSendingProgress(i + 1);
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset and close
    setStep('select');
    setSelectedIds(new Set());
    setPersonalizedMessages([]);
    setExpandedMessages(new Set());
    setSendingProgress(0);
    setCurrentPage(1);
    onOpenChange(false);
  };

  const handleClose = () => {
    setStep('select');
    setSelectedIds(new Set());
    setPersonalizedMessages([]);
    setExpandedMessages(new Set());
    setSendingProgress(0);
    setCurrentPage(1);
    setProfileDialogOpen(false);
    setSelectedCandidate(null);
    onOpenChange(false);
  };

  const openProfile = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setProfileDialogOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        {step === 'select' && (
          <>
            <DialogHeader>
              <DialogTitle>Select Best Matches to Contact</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedIds.size} candidates
                </p>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium">
                        <Checkbox
                          checked={currentCandidates.every(c => selectedIds.has(c.id))}
                          onCheckedChange={toggleAll}
                        />
                      </th>
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Location</th>
                      <th className="text-left p-3 font-medium">Match</th>
                      <th className="text-left p-3 font-medium">Current Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCandidates.map(candidate => (
                      <tr key={candidate.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedIds.has(candidate.id)}
                            onCheckedChange={() => toggleCandidate(candidate.id)}
                          />
                        </td>
                        <td className="p-3">
                          <div 
                            className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => openProfile(candidate)}
                          >
                            <img src={candidate.image} alt={candidate.name} className="w-8 h-8 rounded-full object-cover" />
                            <span className="font-medium">{candidate.name}</span>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{candidate.city}</td>
                        <td className="p-3 text-sm font-medium text-primary">{candidate.match}</td>
                        <td className="p-3 text-sm">{candidate.roles[0]?.role || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleContactAll} disabled={selectedIds.size === 0}>
                Contact {selectedIds.size} {selectedIds.size === 1 ? 'Candidate' : 'Candidates'}
              </Button>
            </div>
          </>
        )}

        {step === 'personalize' && (
          <>
            <DialogHeader>
              <DialogTitle>Review & Personalize Messages</DialogTitle>
            </DialogHeader>

            {isGenerating ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Generating personalized messages...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {personalizedMessages.length} messages generated
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Send all via:</span>
                      <Button variant="outline" size="sm" onClick={() => updateAllChannels('email')}>
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateAllChannels('linkedin')}>
                        <Linkedin className="w-3 h-3 mr-1" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateAllChannels('both')}>
                        Both
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3">
                  {personalizedMessages.map(pm => {
                    const candidate = candidates.find(c => c.id === pm.candidateId);
                    if (!candidate) return null;

                    const isExpanded = expandedMessages.has(pm.candidateId);

                    return (
                      <div key={pm.candidateId} className="border rounded-lg p-4 bg-card">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <img src={candidate.image} alt={candidate.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="font-medium">{candidate.name}</p>
                              <p className="text-xs text-muted-foreground">{candidate.roles[0]?.role}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant={pm.channel === 'email' || pm.channel === 'both' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateChannel(pm.candidateId, pm.channel === 'email' ? 'linkedin' : 'email')}
                            >
                              <Mail className="w-3 h-3" />
                            </Button>
                            <Button
                              variant={pm.channel === 'linkedin' || pm.channel === 'both' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateChannel(pm.candidateId, pm.channel === 'linkedin' ? 'email' : 'linkedin')}
                            >
                              <Linkedin className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpanded(pm.candidateId)}
                            >
                              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        {isExpanded && (
                          <Textarea
                            value={pm.message}
                            onChange={(e) => updateMessage(pm.candidateId, e.target.value)}
                            className="min-h-[150px] text-sm"
                          />
                        )}

                        {!isExpanded && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{pm.message}</p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setStep('select')}>Back</Button>
                  <Button onClick={handleSendAndApprove}>Send and Approve</Button>
                </div>
              </>
            )}
          </>
        )}

        {step === 'sending' && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Sending Messages...</h3>
                <p className="text-2xl font-bold text-primary">
                  {sendingProgress} / {personalizedMessages.length}
                </p>
              </div>
              <div className="w-full max-w-xs mx-auto bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(sendingProgress / personalizedMessages.length) * 100}%` }}
                />
              </div>
              {sendingProgress === personalizedMessages.length && (
                <div className="mt-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-green-600">All messages sent successfully!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>

      {/* Profile Dialog */}
      {selectedCandidate && (
        <ProfileDialog
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
          candidate={selectedCandidate}
          onNext={() => {
            const currentIndex = candidates.findIndex(c => c.id === selectedCandidate?.id);
            if (currentIndex < candidates.length - 1) {
              setSelectedCandidate(candidates[currentIndex + 1]);
            } else {
              setProfileDialogOpen(false);
            }
          }}
          onPrevious={() => {
            const currentIndex = candidates.findIndex(c => c.id === selectedCandidate?.id);
            if (currentIndex > 0) {
              setSelectedCandidate(candidates[currentIndex - 1]);
            }
          }}
          onSkip={() => {
            const currentIndex = candidates.findIndex(c => c.id === selectedCandidate?.id);
            if (currentIndex < candidates.length - 1) {
              setSelectedCandidate(candidates[currentIndex + 1]);
            } else {
              setProfileDialogOpen(false);
            }
          }}
        />
      )}
    </Dialog>
  );
};
