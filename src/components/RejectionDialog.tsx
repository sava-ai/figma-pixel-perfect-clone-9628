import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, Sparkles, MessageSquare, ChevronDown } from 'lucide-react';
import { AskAIPopover } from '@/components/AskAIPopover';
import { useAIPersonalize } from '@/hooks/useAIPersonalize';

interface RejectedCandidate {
  id: number;
  name: string;
  email: string | string[];
  image: string;
  appliedDate: string;
}

interface RejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: RejectedCandidate[];
}

const templates = [
  {
    id: 'standard',
    name: 'Standard Rejection',
    subject: 'Update on your application',
    body: 'Thank you for your interest in the position. After careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.'
  },
  {
    id: 'encouraging',
    name: 'Encouraging Rejection',
    subject: 'Thank you for applying',
    body: 'We appreciate the time you took to apply and interview with us. While we have chosen to pursue other candidates for this role, we were impressed by your background and encourage you to apply for future opportunities.'
  },
  {
    id: 'future',
    name: 'Keep for Future',
    subject: 'Your application status',
    body: 'Thank you for your application. While we are not moving forward with your candidacy for this specific role, we would like to keep your resume on file for future opportunities that may be a better fit.'
  }
];

export function RejectionDialog({ open, onOpenChange, candidates }: RejectionDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(new Set());
  const [selectedEmails, setSelectedEmails] = useState<Map<number, string>>(new Map());
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const { isPersonalizing, personalizeText } = useAIPersonalize();

  const handlePersonalize = async () => {
    const personalized = await personalizeText(body, {
      name: 'candidate',
      role: 'the position'
    });
    setBody(personalized);
  };
  const [sendingProgress, setSendingProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const handleSelectAll = () => {
    if (selectedCandidates.size === candidates.length) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(candidates.map(c => c.id)));
    }
  };

  const toggleCandidate = (id: number, email?: string) => {
    const newSelected = new Set(selectedCandidates);
    const newEmails = new Map(selectedEmails);
    
    if (newSelected.has(id)) {
      newSelected.delete(id);
      newEmails.delete(id);
    } else {
      newSelected.add(id);
      if (email) {
        newEmails.set(id, email);
      } else {
        // Set default email
        const candidate = candidates.find(c => c.id === id);
        if (candidate) {
          const defaultEmail = Array.isArray(candidate.email) ? candidate.email[0] : candidate.email;
          newEmails.set(id, defaultEmail);
        }
      }
    }
    setSelectedCandidates(newSelected);
    setSelectedEmails(newEmails);
  };

  const selectEmail = (candidateId: number, email: string) => {
    const newEmails = new Map(selectedEmails);
    newEmails.set(candidateId, email);
    setSelectedEmails(newEmails);
  };

  const selectedList = candidates.filter(c => selectedCandidates.has(c.id));

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSubject(template.subject);
    setBody(template.body);
  };

  const handleSend = async () => {
    setStep(3);
    setIsSending(true);
    
    // Simulate sending emails
    for (let i = 1; i <= selectedList.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setSendingProgress(i);
    }
    
    setIsSending(false);
    
    // Show success for 2 seconds then close
    setTimeout(() => {
      onOpenChange(false);
      // Reset state
      setTimeout(() => {
        setStep(1);
        setSelectedCandidates(new Set());
        setSelectedEmails(new Map());
        setSubject('');
        setBody('');
        setSendingProgress(0);
      }, 300);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        {step === 1 && (
          <>
            <div className="px-6 pt-6 pb-4">
              <DialogHeader>
                <DialogTitle className="font-hedvig">Select candidates to reject</DialogTitle>
              </DialogHeader>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedCandidates.size === candidates.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-muted-foreground">
                    Select all ({selectedCandidates.size} of {candidates.length} selected)
                  </span>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Candidate</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Applied</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {candidates.map((candidate) => {
                      const emails = Array.isArray(candidate.email) ? candidate.email : [candidate.email];
                      const hasMultipleEmails = emails.length > 1;
                      const selectedEmail = selectedEmails.get(candidate.id) || emails[0];
                      
                      return (
                        <TableRow key={candidate.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedCandidates.has(candidate.id)}
                              onCheckedChange={() => toggleCandidate(candidate.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={candidate.image} 
                                alt={candidate.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="font-medium">{candidate.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {hasMultipleEmails ? (
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="emails" className="border-none">
                                  <AccordionTrigger className="py-0 hover:no-underline">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                      <span>{selectedEmail}</span>
                                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
                                        +{emails.length - 1}
                                      </span>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="pb-2">
                                    <div className="space-y-1 mt-2">
                                      {emails.map((email, index) => (
                                        <button
                                          key={index}
                                          onClick={() => selectEmail(candidate.id, email)}
                                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                            selectedEmail === email
                                              ? 'bg-primary/10 text-primary font-medium'
                                              : 'hover:bg-muted text-muted-foreground'
                                          }`}
                                        >
                                          {email}
                                        </button>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ) : (
                              <span className="text-muted-foreground">{emails[0]}</span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{candidate.appliedDate}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="border-t bg-background px-6 py-4 flex justify-end gap-3 mt-auto">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => setStep(2)}
                disabled={selectedCandidates.size === 0}
              >
                Continue ({selectedCandidates.size})
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="px-6 pt-6 pb-4">
              <DialogHeader>
                <DialogTitle className="font-hedvig">Send rejection message</DialogTitle>
              </DialogHeader>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-6">
              {/* Recipient bubbles */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase text-muted-foreground">Sending to ({selectedList.length})</label>
                <div className="flex flex-wrap gap-2">
                  {selectedList.slice(0, 10).map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full"
                    >
                      <img 
                        src={candidate.image} 
                        alt={candidate.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-sm">{candidate.name}</span>
                    </div>
                  ))}
                  {selectedList.length > 10 && (
                    <div className="flex items-center justify-center bg-accent px-3 py-1.5 rounded-full">
                      <span className="text-sm font-medium">+{selectedList.length - 10}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Template picker */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase text-muted-foreground">Template</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start gap-2 shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Select a template</span>
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 bg-background" align="start">
                    <div className="space-y-1">
                      {templates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => {
                            handleTemplateSelect(template);
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                        >
                          <div className="font-medium">{template.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">{template.subject}</div>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase text-muted-foreground">Subject</label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Email subject..."
                  className="shadow-md"
                />
              </div>

              {/* Body */}
              <div className="space-y-2 relative">
                <label className="text-sm font-semibold uppercase text-muted-foreground">Body</label>
                <div className="relative">
                  <Textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Email body..."
                    className="min-h-[200px] resize-none shadow-md"
                  />
                  {isPersonalizing && (
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex items-center justify-center animate-fade-in">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">AI is personalizing...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* AI Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-2"
                    onClick={handlePersonalize}
                    disabled={isPersonalizing}
                  >
                    <Sparkles className="w-4 h-4" />
                    AI Personalize
                  </Button>
                  <AskAIPopover
                    trigger={
                      <Button variant="outline" size="sm" className="flex-1 gap-2">
                        <Sparkles className="w-4 h-4" />
                        Ask AI
                      </Button>
                    }
                    onApply={(answer) => {
                      setBody(prev => prev + '\n\n' + answer);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="border-t bg-background px-6 py-4 flex justify-between gap-3 mt-auto">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                onClick={handleSend}
                disabled={!subject || !body}
              >
                Send to {selectedList.length} {selectedList.length === 1 ? 'candidate' : 'candidates'}
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="py-12">
            <div className="text-center space-y-6">
              {isSending ? (
                <>
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-20 h-20 border-4 border-primary/20 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold mb-2">
                      Sending messages...
                    </div>
                    <div className="text-4xl font-bold text-primary">
                      {sendingProgress}/{selectedList.length}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold mb-2 font-hedvig">
                      Success!
                    </div>
                    <div className="text-muted-foreground">
                      Rejection messages sent to {selectedList.length} {selectedList.length === 1 ? 'candidate' : 'candidates'}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
