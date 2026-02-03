import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { InviteDialog } from '@/components/InviteDialog';
import { JobChatPanel } from '@/components/JobChatPanel';
import CandidateDetailPanel from '@/components/CandidateDetailPanel';
import CandidateProfilePanel from '@/components/CandidateProfilePanel';
import { Button } from '@/components/ui/button';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon-new.png';
import { bestCandidates } from '@/data/candidates';

const JobBestMatches = () => {
  const navigate = useNavigate();
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [reviewedCandidates, setReviewedCandidates] = useState<Set<number>>(new Set());
  const [reviewComplete, setReviewComplete] = useState(false);
  
  const filteredCandidates = bestCandidates;
  const selectedBestMatch = filteredCandidates[currentCandidateIndex];

  const jobs = [
    { id: 1, title: 'BD Representative / Sales Manager' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  // Handle navigation to next candidate
  const handleNextCandidate = (action: 'save' | 'reject') => {
    // Mark current candidate as reviewed
    if (selectedBestMatch) {
      setReviewedCandidates(prev => new Set(prev).add(selectedBestMatch.id));
    }

    // Move to next candidate
    const nextIndex = currentCandidateIndex + 1;
    if (nextIndex < filteredCandidates.length) {
      setCurrentCandidateIndex(nextIndex);
    } else {
      // All candidates reviewed
      setReviewComplete(true);
    }
  };

  // Handle going back to the dashboard
  const handleBackToList = () => {
    navigate('/job/people/view');
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: '#F5F4F1' }}>
      {/* Header */}
      <header className="h-[54px] flex items-center justify-between px-5 flex-shrink-0" style={{ backgroundColor: '#F2F1ED', borderBottom: '1px solid #D9D9D9' }}>
        {/* Left side - Back button and Jobs dropdown */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/job/people/view')} className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:opacity-80" style={{ backgroundColor: '#E8E6DD' }}>
            <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Jobs dropdown */}
          <div className="relative">
            <button onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all hover:opacity-80" style={{ backgroundColor: '#E8E6DD' }}>
              <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded-md" />
              <span className="font-medium text-sm" style={{ color: '#333333' }}>BD Representative / Sales Manager</span>
              <ChevronDown className="w-3.5 h-3.5" style={{ color: '#333333' }} />
            </button>
            
            {jobsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                {jobs.map(job => (
                  <button key={job.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left" onClick={() => setJobsDropdownOpen(false)}>
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
                    <span className="text-sm">{job.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Expand Chat, Profile */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsChatCollapsed(!isChatCollapsed)}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: '#E8E6DD' }}
            title={isChatCollapsed ? "Open AI Chat" : "Close AI Chat"}
          >
            <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3v18" />
            </svg>
          </button>
          <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#FBFAF9' }}>
        {/* Left Panel - Candidates View */}
        <div className={`flex-1 ${isChatCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`h-full flex flex-col py-6 pb-5 relative ${isChatCollapsed ? 'w-full max-w-[1200px]' : 'w-full'}`}>
            <div className={`flex-1 overflow-y-auto relative scrollbar-hide ${isChatCollapsed ? 'mx-6' : 'ml-4 mr-4'}`}>
              <div className={`${isChatCollapsed ? '' : 'max-w-[1200px]'}`}>
                {/* Focused Candidate Review */}
                {!reviewComplete ? (
                  <div className="animate-content-expand">
                    {/* Split view: Title + Profile on left, Detail panel on right */}
                    <div className="flex gap-4 h-[calc(100vh-110px)]">
                      {/* Left side: Title + Enhanced profile panel */}
                      <div className="w-[45%] min-h-0 flex flex-col">
                        {/* Header */}
                        <h2 className="font-hedvig font-medium text-foreground text-xl mb-4">
                          Candidate batch 3
                        </h2>
                        {/* Profile panel */}
                        <div className="flex-1 min-h-0">
                          <CandidateProfilePanel
                            candidate={selectedBestMatch}
                            currentIndex={currentCandidateIndex}
                            totalCount={filteredCandidates.length}
                            hideProgressHeader={true}
                          />
                        </div>
                      </div>

                      {/* Right side: Navigation header + Detail panel */}
                      <div className="w-[55%] min-h-0 flex flex-col">
                        {/* Navigation header outside the panel */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm text-muted-foreground">
                            Reviewing {currentCandidateIndex + 1} of {filteredCandidates.length}
                          </span>
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => {
                                if (currentCandidateIndex > 0) {
                                  setCurrentCandidateIndex(currentCandidateIndex - 1);
                                }
                              }}
                              disabled={currentCandidateIndex === 0}
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 bg-white"
                            >
                              <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                            <button 
                              onClick={() => {
                                if (currentCandidateIndex < filteredCandidates.length - 1) {
                                  setCurrentCandidateIndex(currentCandidateIndex + 1);
                                }
                              }}
                              disabled={currentCandidateIndex >= filteredCandidates.length - 1}
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 bg-white"
                            >
                              <ChevronRight className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Detail panel */}
                        <div className="flex-1 min-h-0 bg-white border border-[#EEEDEC] rounded-xl overflow-hidden">
                          <CandidateDetailPanel
                            candidate={selectedBestMatch}
                            onClose={handleBackToList}
                            onNotAGoodFit={() => handleNextCandidate('reject')}
                            onSaveToJob={() => handleNextCandidate('save')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Review complete state
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-hedvig text-2xl font-semibold text-foreground mb-2">
                      All candidates reviewed!
                    </h2>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      You've reviewed all {filteredCandidates.length} candidates. Check your pipeline for saved candidates or reset to review again.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleBackToList}>
                        Back to dashboard
                      </Button>
                      <Button onClick={() => navigate('/job/pipeline')}>
                        View pipeline
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        {!isChatCollapsed && (
          <div className="w-[380px] flex-shrink-0 pr-4">
            <JobChatPanel />
          </div>
        )}
      </div>

      <InviteDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
      />
    </div>
  );
};

export default JobBestMatches;
