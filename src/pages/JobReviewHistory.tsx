import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
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

interface ReviewBatch {
  id: number;
  label: string;
  date: string;
  candidatesReviewed: number;
  saved: number;
  rejected: number;
  candidates: ReviewedCandidate[];
}

const reviewBatches: ReviewBatch[] = [
  {
    id: 1,
    label: 'Batch #6',
    date: 'Feb 5, 2026',
    candidatesReviewed: 10,
    saved: 4,
    rejected: 6,
    candidates: [
      { id: 1, action: 'saved', rating: 3, feedback: 'Great experience at top companies, strong B2B sales background.' },
      { id: 2, action: 'rejected', rating: 2, feedback: 'Missing required CRM experience.' },
      { id: 3, action: 'saved', rating: 2, feedback: 'Good international experience, decent English.' },
      { id: 4, action: 'rejected', rating: 1, feedback: 'No B2B lead generation experience at all.' },
      { id: 5, action: 'saved', rating: 3, feedback: 'Perfect match - SaaS sales, CRM tools, fluent English.' },
    ],
  },
  {
    id: 2,
    label: 'Batch #5',
    date: 'Feb 3, 2026',
    candidatesReviewed: 8,
    saved: 3,
    rejected: 5,
    candidates: [
      { id: 6, action: 'saved', rating: 3, feedback: 'Strong enterprise sales background.' },
      { id: 7, action: 'rejected', rating: 2, feedback: 'Limited SaaS experience.' },
      { id: 8, action: 'saved', rating: 2, feedback: 'Good communication skills, needs training.' },
    ],
  },
  {
    id: 3,
    label: 'Batch #4',
    date: 'Jan 28, 2026',
    candidatesReviewed: 12,
    saved: 5,
    rejected: 7,
    candidates: [
      { id: 9, action: 'saved', rating: 3, feedback: 'Excellent track record in B2B.' },
      { id: 10, action: 'rejected', rating: 1, feedback: 'Wrong industry background.' },
    ],
  },
  {
    id: 4,
    label: 'Batch #3',
    date: 'Jan 20, 2026',
    candidatesReviewed: 6,
    saved: 2,
    rejected: 4,
    candidates: [
      { id: 11, action: 'saved', rating: 2, feedback: 'Promising junior candidate.' },
      { id: 12, action: 'rejected', rating: 2, feedback: 'Overqualified for the role.' },
    ],
  },
  {
    id: 5,
    label: 'Batch #2',
    date: 'Jan 15, 2026',
    candidatesReviewed: 10,
    saved: 4,
    rejected: 6,
    candidates: [
      { id: 13, action: 'saved', rating: 3, feedback: 'Perfect culture fit.' },
      { id: 14, action: 'rejected', rating: 1, feedback: 'No relevant experience.' },
    ],
  },
  {
    id: 6,
    label: 'Batch #1',
    date: 'Jan 10, 2026',
    candidatesReviewed: 5,
    saved: 1,
    rejected: 4,
    candidates: [
      { id: 15, action: 'saved', rating: 2, feedback: 'Good potential, needs mentoring.' },
    ],
  },
];

const JobReviewHistory = () => {
  const navigate = useNavigate();
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(reviewBatches[0]);

  const jobs = [
    { id: 1, title: 'BD Representative / Sales Manager' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' },
  ];

  const getCandidateById = (id: number) => {
    return bestCandidates.find(c => c.id === id);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#FBFAF9] overflow-hidden">
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
                  <button 
                    key={job.id} 
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FAFAF7] transition-colors text-left" 
                    onClick={() => setJobsDropdownOpen(false)}
                  >
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
                    <span className="text-sm">{job.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right side - Profile */}
        <div className="flex items-center gap-2">
          <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden justify-center" style={{ backgroundColor: '#FBFAF9' }}>
        <div className="h-full w-full max-w-[1200px] flex flex-col pt-6 pb-3">
          <div className="flex-1 overflow-hidden mx-6">
            <div className="flex gap-4 h-full">
              {/* Left Panel - Batches */}
              <div className="w-56 bg-white border border-[#EEEDEC] rounded-xl flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-[#EEEDEC]">
                  <h2 className="text-sm font-semibold text-gray-900">Review Batches</h2>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {reviewBatches.map(batch => (
                      <button
                        key={batch.id}
                        onClick={() => setSelectedBatch(batch)}
                        className={`w-full text-left px-3 py-3 rounded-lg transition-colors mb-1 ${
                          selectedBatch.id === batch.id
                            ? 'bg-[#FDF8F6] border border-[#E8D5CE]'
                            : 'hover:bg-[#FAFAF7]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            selectedBatch.id === batch.id ? 'text-[#CC785C]' : 'text-gray-900'
                          }`}>
                            {batch.label}
                          </span>
                          {batch.id === 1 && (
                            <span className="text-xs px-2 py-0.5 bg-[#E8F5E8] text-[#2E7D32] rounded-full">
                              Latest
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{batch.date}</span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-xs text-[#2E7D32]">{batch.saved} saved</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-[#BF4D43]">{batch.rejected} rejected</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Right Panel - Reviewed Candidates */}
              <div className="flex-1 bg-white border border-[#EEEDEC] rounded-xl overflow-hidden flex flex-col">
                {/* Panel Header */}
                <div className="p-5 border-b border-[#EEEDEC]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.25rem', color: '#333333' }}>
                        {selectedBatch.label} - Review History
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{selectedBatch.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E8F5E8' }}>
                          <svg className="w-3.5 h-3.5" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#2E7D32' }}>{selectedBatch.saved} saved</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEE2E2' }}>
                          <svg className="w-3.5 h-3.5" style={{ color: '#BF4D43' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium" style={{ color: '#BF4D43' }}>{selectedBatch.rejected} rejected</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidates List */}
                <ScrollArea className="flex-1">
                  <div className="divide-y divide-[#EEEDEC]">
                    {selectedBatch.candidates.map((item) => {
                      const candidate = getCandidateById(item.id);
                      if (!candidate) return null;
                      
                      return (
                        <div 
                          key={item.id} 
                          className="px-5 py-4 hover:bg-[#FAFAF7] transition-colors"
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
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobReviewHistory;
