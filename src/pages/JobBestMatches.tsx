import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, SkipForward } from 'lucide-react';
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
  const [skippedCandidates, setSkippedCandidates] = useState<number[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<number[]>([]);
  const [rejectedCandidates, setRejectedCandidates] = useState<number[]>([]);
  const [reviewComplete, setReviewComplete] = useState(false);
  const [viewingSkipped, setViewingSkipped] = useState(false);
  const [skippedIndex, setSkippedIndex] = useState(0);
  
  const filteredCandidates = bestCandidates;
  
  // Get current candidate based on mode
  const getCurrentCandidate = () => {
    if (viewingSkipped && skippedCandidates.length > 0) {
      const candidateId = skippedCandidates[skippedIndex];
      return filteredCandidates.find(c => c.id === candidateId);
    }
    return filteredCandidates[currentCandidateIndex];
  };
  
  const selectedBestMatch = getCurrentCandidate();

  const jobs = [
    { id: 1, title: 'BD Representative / Sales Manager' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  // Handle skip action
  const handleSkip = () => {
    if (selectedBestMatch && !viewingSkipped) {
      setSkippedCandidates(prev => [...prev, selectedBestMatch.id]);
    }
    moveToNext();
  };

  // Handle save action
  const handleSave = () => {
    if (selectedBestMatch) {
      setSavedCandidates(prev => [...prev, selectedBestMatch.id]);
      if (viewingSkipped) {
        // Remove from skipped list
        setSkippedCandidates(prev => prev.filter(id => id !== selectedBestMatch.id));
      }
    }
    moveToNext();
  };

  // Handle reject action
  const handleReject = () => {
    if (selectedBestMatch) {
      setRejectedCandidates(prev => [...prev, selectedBestMatch.id]);
      if (viewingSkipped) {
        // Remove from skipped list
        setSkippedCandidates(prev => prev.filter(id => id !== selectedBestMatch.id));
      }
    }
    moveToNext();
  };

  // Move to next candidate
  const moveToNext = () => {
    if (viewingSkipped) {
      if (skippedIndex < skippedCandidates.length - 1) {
        setSkippedIndex(skippedIndex + 1);
      } else {
        // Done reviewing skipped
        setViewingSkipped(false);
        setSkippedIndex(0);
      }
    } else {
      if (selectedBestMatch) {
        setReviewedCandidates(prev => new Set(prev).add(selectedBestMatch.id));
      }
      const nextIndex = currentCandidateIndex + 1;
      if (nextIndex < filteredCandidates.length) {
        setCurrentCandidateIndex(nextIndex);
      } else {
        setReviewComplete(true);
      }
    }
  };

  // Handle navigation to next candidate (legacy)
  const handleNextCandidate = (action: 'save' | 'reject') => {
    if (action === 'save') {
      handleSave();
    } else {
      handleReject();
    }
  };

  // Handle going back to the dashboard
  const handleBackToList = () => {
    navigate('/job/people/view');
  };

  // Enter skipped review mode
  const handleReviewSkipped = () => {
    if (skippedCandidates.length > 0) {
      setViewingSkipped(true);
      setSkippedIndex(0);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: '#F5F4F1' }}>
      {/* Header */}
      <header className="h-[54px] flex items-center justify-between px-5 flex-shrink-0 relative" style={{ backgroundColor: '#F2F1ED', borderBottom: '1px solid #D9D9D9' }}>
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

        {/* Center - Navigation Tabs */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-0.5 px-0.5 h-7 rounded-md" style={{ backgroundColor: '#E8E6DD' }}>
          <button
            onClick={() => navigate('/job/people/view')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all"
            style={{ color: '#333333' }}
          >
            Job
          </button>
          <button
            onClick={() => navigate('/job/best-matches')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all bg-white shadow-sm"
            style={{ color: '#333333' }}
          >
            Review (50)
          </button>
          <button
            onClick={() => navigate('/job/pipeline')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all"
            style={{ color: '#333333' }}
          >
            Pipeline
          </button>
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
          <div className={`h-full flex flex-col py-6 pb-0 relative ${isChatCollapsed ? 'w-full max-w-[1200px]' : 'w-full'}`}>
            <div className={`flex-1 overflow-y-auto relative scrollbar-hide ${isChatCollapsed ? 'mx-6' : 'ml-4 mr-4'}`}>
              <div className={`${isChatCollapsed ? '' : 'max-w-[1200px]'}`}>
                {/* Focused Candidate Review */}
                {!reviewComplete && selectedBestMatch ? (
                  <div className="animate-content-expand pb-6">
                    {/* Split view: Profile on left, Detail panel on right - both scroll together */}
                    <div className="flex gap-4">
                      {/* Left side: Profile panel */}
                      <div className="w-[45%]">
                        <CandidateProfilePanel
                          candidate={selectedBestMatch}
                          currentIndex={viewingSkipped ? skippedIndex : currentCandidateIndex}
                          totalCount={viewingSkipped ? skippedCandidates.length : filteredCandidates.length}
                          hideProgressHeader={true}
                        />
                      </div>

                      {/* Right side: Detail panel */}
                      <div className="w-[55%]">
                        <div className="bg-white border border-[#EEEDEC] rounded-xl overflow-hidden">
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
                  <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="font-hedvig text-2xl font-semibold text-foreground mb-2">
                      All candidates reviewed!
                    </h2>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      You've reviewed all {filteredCandidates.length} candidates. 
                      {skippedCandidates.length > 0 && ` You have ${skippedCandidates.length} skipped candidates to review.`}
                    </p>
                    <div className="flex gap-3">
                      {skippedCandidates.length > 0 && (
                        <Button variant="outline" onClick={handleReviewSkipped}>
                          Review {skippedCandidates.length} skipped
                        </Button>
                      )}
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

      {/* Sticky Footer */}
      {!reviewComplete && selectedBestMatch && (
        <div 
          className="flex-shrink-0 px-6 py-3 border-t flex items-center justify-between"
          style={{ backgroundColor: '#F2F1ED', borderColor: '#D9D9D9' }}
        >
          {/* Left - Batch info */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium" style={{ fontFamily: 'CooperLight, serif', color: '#333333' }}>
              {viewingSkipped ? 'Reviewing Skipped' : 'Candidates Batch 3'}
            </span>
            {skippedCandidates.length > 0 && !viewingSkipped && (
              <button 
                onClick={handleReviewSkipped}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#E8E6DD', color: '#666663' }}
              >
                <SkipForward className="w-3.5 h-3.5" />
                {skippedCandidates.length} skipped
              </button>
            )}
            {viewingSkipped && (
              <button 
                onClick={() => setViewingSkipped(false)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all hover:opacity-80"
                style={{ backgroundColor: '#E8E6DD', color: '#666663' }}
              >
                Back to batch
              </button>
            )}
          </div>

          {/* Center - Action buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={handleReject}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80 border"
              style={{ backgroundColor: '#FFFFFF', borderColor: '#BF4D43', color: '#BF4D43' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
              Not a good fit
            </button>
            
            {!viewingSkipped && (
              <button 
                onClick={handleSkip}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80 border"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#D9D9D9', color: '#666663' }}
              >
                <SkipForward className="w-4 h-4" />
                Skip
              </button>
            )}
            
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #CC785C 0%, #D4A27F 100%)', color: '#FFFFFF' }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Save to job
            </button>
          </div>

          {/* Right - Stats */}
          <div className="flex items-center gap-4 text-xs" style={{ color: '#666663' }}>
            <span>{savedCandidates.length} saved</span>
            <span>{rejectedCandidates.length} rejected</span>
            <span>{skippedCandidates.length} skipped</span>
          </div>
        </div>
      )}

      <InviteDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
      />
    </div>
  );
};

export default JobBestMatches;
