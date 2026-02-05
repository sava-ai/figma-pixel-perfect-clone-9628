import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { UserMenu } from '@/components/UserMenu';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon-new.png';
import InitialsAvatar from '@/components/InitialsAvatar';
import { bestCandidates } from '@/data/candidates';

interface ReviewedCandidate {
  id: number;
  action: 'saved' | 'rejected';
  rating: 1 | 2 | 3 | null;
  feedback: string;
}

const JobBestMatchesReviewed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  
  // Get reviewed data from navigation state or use mock data
  const reviewedData = (location.state as { 
    savedCandidates?: number[];
    rejectedCandidates?: number[];
    skippedCandidates?: number[];
    feedbackHistory?: ReviewedCandidate[];
  }) || {};
  
  const savedCount = reviewedData.savedCandidates?.length || 4;
  const rejectedCount = reviewedData.rejectedCandidates?.length || 3;
  const skippedCount = reviewedData.skippedCandidates?.length || 3;
  
  // Mock feedback history if not provided
  const feedbackHistory: ReviewedCandidate[] = reviewedData.feedbackHistory || [
    { id: 1, action: 'saved', rating: 3, feedback: 'Great experience at top companies, strong B2B sales background.' },
    { id: 2, action: 'rejected', rating: 2, feedback: 'Missing required CRM experience.' },
    { id: 3, action: 'saved', rating: 2, feedback: 'Good international experience, decent English.' },
    { id: 4, action: 'rejected', rating: 3, feedback: 'No B2B lead generation experience at all.' },
    { id: 5, action: 'saved', rating: 3, feedback: 'Perfect match - SaaS sales, CRM tools, fluent English.' },
  ];

  const jobs = [
    { id: 1, title: 'BD Representative / Sales Manager' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  const getCandidateById = (id: number) => {
    return bestCandidates.find(c => c.id === id);
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
            Review (10)
          </button>
          <button
            onClick={() => navigate('/job/pipeline')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all"
            style={{ color: '#333333' }}
          >
            Pipeline
          </button>
        </div>

        {/* Right side - Profile */}
        <div className="flex items-center gap-2">
          <UserMenu initials="TW" src={userAvatarImage} />
        </div>
      </header>

      {/* Main Content - Centered without chat */}
      <div className="flex-1 flex justify-center overflow-hidden" style={{ backgroundColor: '#FBFAF9' }}>
        <div className="w-full max-w-[800px] py-6 px-6 overflow-y-auto">
          
          {/* System Alignment Banner */}
          <div
            className="w-full rounded-xl p-5 mb-6"
            style={{ background: 'linear-gradient(135deg, #EBDBBD 0%, #D5A27F 20%, #CD785C 45%, #CD785C 100%)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                <svg className="w-4 h-4" style={{ color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1rem', color: '#000000' }}>System alignment</p>
            </div>
            <p className="text-2xl font-medium mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#000000' }}>
              All candidates reviewed!
            </p>
            <p className="text-sm" style={{ color: 'rgba(0,0,0,0.7)' }}>
              You've reviewed all 10 candidates. {skippedCount > 0 && `You have ${skippedCount} skipped candidates to review.`}
            </p>
            
            {/* Stats row */}
            <div className="flex gap-6 mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  <svg className="w-3.5 h-3.5" style={{ color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: '#000000' }}>{savedCount} saved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  <svg className="w-3.5 h-3.5" style={{ color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: '#000000' }}>{rejectedCount} rejected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
                  <svg className="w-3.5 h-3.5" style={{ color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium" style={{ color: '#000000' }}>{skippedCount} skipped</span>
              </div>
            </div>
          </div>

          {/* Key Insights Section */}
          <div className="mb-5">
            <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>
              Key insights
            </h3>
            <p className="text-xs font-medium mb-2" style={{ color: '#666663' }}>
              What Laidback learned from your feedback
            </p>
            <Textarea
              placeholder="Based on your ratings, you prefer candidates with strong B2B sales experience and international backgrounds..."
              className="min-h-[100px] text-sm resize-none border-[#D9D9D9]"
              style={{ backgroundColor: '#FFFFFF' }}
              readOnly
              defaultValue="Based on your ratings, you prefer candidates with strong B2B sales experience at SaaS companies. You rated international experience highly and rejected candidates lacking CRM proficiency."
            />
          </div>

          {/* Brain Adjustments Section */}
          <div className="mb-5">
            <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>
              Brain adjustments
            </h3>
            <p className="text-xs font-medium mb-2" style={{ color: '#666663' }}>
              What will change based on your feedback
            </p>
            <Textarea
              placeholder="Future candidate matching will prioritize..."
              className="min-h-[100px] text-sm resize-none border-[#D9D9D9]"
              style={{ backgroundColor: '#FFFFFF' }}
              readOnly
              defaultValue="• Increased weight on B2B SaaS experience (+15%)
• CRM proficiency now marked as critical requirement
• International experience boosted in scoring
• Candidates without direct sales roles deprioritized"
            />
          </div>

          {/* Feedback History Section - Collapsible */}
          <div className="mb-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="feedback-history" className="border-0">
                <AccordionTrigger className="py-0 mb-3 hover:no-underline">
                  <h3 style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>
                    Feedback history ({feedbackHistory.length})
                  </h3>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}>
                    {feedbackHistory.map((item, index) => {
                      const candidate = getCandidateById(item.id);
                      if (!candidate) return null;
                      
                      return (
                        <div 
                          key={item.id} 
                          className="px-5 py-4 border-b border-[#E6E6E6] last:border-b-0"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <InitialsAvatar name={candidate.name} size="sm" />
                            <div className="flex-1 text-left">
                              <p className="text-sm font-medium" style={{ color: '#333333' }}>{candidate.name}</p>
                              <p className="text-xs" style={{ color: '#666663' }}>{candidate.roles[0]?.role || 'Candidate'}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.rating && (
                                <span 
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{ 
                                    backgroundColor: item.action === 'saved' ? '#E8F5E8' : '#FEE2E2',
                                    color: item.action === 'saved' ? '#2E7D32' : '#BF4D43'
                                  }}
                                >
                                  {item.rating}/3
                                </span>
                              )}
                              <span 
                                className="px-2 py-0.5 rounded text-xs font-medium capitalize"
                                style={{ 
                                  backgroundColor: item.action === 'saved' ? '#E8F5E8' : '#FEE2E2',
                                  color: item.action === 'saved' ? '#2E7D32' : '#BF4D43'
                                }}
                              >
                                {item.action}
                              </span>
                            </div>
                          </div>
                          {item.feedback && (
                            <div className="pl-11 mt-2">
                              <p className="text-sm" style={{ color: '#666663' }}>{item.feedback}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 pb-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/job/people/view')}
              className="px-6"
            >
              Skip
            </Button>
            <Button 
              onClick={() => navigate('/job/best-matches')}
              className="px-6"
              style={{ background: 'linear-gradient(135deg, #CC785C 0%, #D4A27F 100%)', color: '#FFFFFF' }}
            >
              Start a new batch
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBestMatchesReviewed;
