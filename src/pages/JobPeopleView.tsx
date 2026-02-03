import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Search, Filter, ArrowLeft } from 'lucide-react';
import { ProfileDialog } from '@/components/ProfileDialog';
import { ApplicantReviewDialog } from '@/components/ApplicantReviewDialog';
import { RejectionDialog } from '@/components/RejectionDialog';
import { InviteDialog } from '@/components/InviteDialog';
import { JobChatPanel } from '@/components/JobChatPanel';
import { BulkContactDialog } from '@/components/BulkContactDialog';
import CandidateDetailPanel from '@/components/CandidateDetailPanel';
import CandidateProfilePanel from '@/components/CandidateProfilePanel';
import InitialsAvatar from '@/components/InitialsAvatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon.png';
import profile9 from '@/assets/profile-9.jpg';
import profile10 from '@/assets/profile-10.jpg';
import profile11 from '@/assets/profile-11.jpg';
import profile12 from '@/assets/profile-12.jpg';
import profile13 from '@/assets/profile-13.jpg';
import profile14 from '@/assets/profile-14.jpg';
import profile15 from '@/assets/profile-15.jpg';
import profile16 from '@/assets/profile-16.jpg';
import { bestCandidates, getCompanyIcon } from '@/data/candidates';

const JobPeopleView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'pipeline'>('people');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof bestCandidates[0] | null>(null);
  const [selectedBestMatch, setSelectedBestMatch] = useState<typeof bestCandidates[0] | null>(null);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [reviewedCandidates, setReviewedCandidates] = useState<Set<number>>(new Set());
  const [reviewComplete, setReviewComplete] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [applicantReviewDialogOpen, setApplicantReviewDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [bulkContactDialogOpen, setBulkContactDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Animated counters
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [rejectionsCount, setRejectionsCount] = useState(0);
  const [bestMatchesCount, setBestMatchesCount] = useState(0);
  
  const targetApplicants = 23;
  const targetRejections = 8;
  const targetBestMatches = 100;
  const allTags = ['Referred', 'AI sourced', 'Sourced', 'Database', 'Applicant'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };


  const filteredCandidates = selectedTags.length === 0 
    ? bestCandidates 
    : bestCandidates.filter(candidate => 
        selectedTags.some(tag => candidate.tags.includes(tag))
      );

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
      setSelectedBestMatch(filteredCandidates[nextIndex]);
    } else {
      // All candidates reviewed
      setReviewComplete(true);
      setSelectedBestMatch(null);
    }
  };

  // Handle going back in the review flow
  const handleBackToList = () => {
    setSelectedBestMatch(null);
    setCurrentCandidateIndex(0);
    setReviewComplete(false);
  };

  // Start reviewing from the first candidate
  const handleStartReview = () => {
    setCurrentCandidateIndex(0);
    setSelectedBestMatch(filteredCandidates[0]);
    setReviewComplete(false);
  };
  
  // Animate counters on mount
  useEffect(() => {
    const duration = 5000; // 5 seconds
    const steps = 60; // 60 frames per second
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setApplicantsCount(Math.floor(targetApplicants * progress));
      setRejectionsCount(Math.floor(targetRejections * progress));
      setBestMatchesCount(Math.floor(targetBestMatches * progress));
      
      if (currentStep >= steps) {
        setApplicantsCount(targetApplicants);
        setRejectionsCount(targetRejections);
        setBestMatchesCount(targetBestMatches);
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  const jobs = [{
    id: 1,
    title: 'BD Representative / Sales Manager'
  }, {
    id: 2,
    title: 'Chief Operations Officer'
  }, {
    id: 3,
    title: 'Frontend Developer'
  }];

  const rejectedCandidates = [
    { id: 1, name: "Michael Johnson", email: ["michael.j@email.com", "m.johnson@work.com"], image: profile9, appliedDate: "2024-01-15" },
    { id: 2, name: "Sarah Williams", email: "sarah.w@email.com", image: profile10, appliedDate: "2024-01-16" },
    { id: 3, name: "David Brown", email: ["david.b@email.com", "d.brown@personal.com", "david@freelance.com"], image: profile11, appliedDate: "2024-01-17" },
    { id: 4, name: "Emily Davis", email: "emily.d@email.com", image: profile12, appliedDate: "2024-01-18" },
    { id: 5, name: "James Wilson", email: ["james.w@email.com", "j.wilson@company.com"], image: profile13, appliedDate: "2024-01-19" },
    { id: 6, name: "Lisa Anderson", email: "lisa.a@email.com", image: profile14, appliedDate: "2024-01-20" },
    { id: 7, name: "Robert Taylor", email: "robert.t@email.com", image: profile15, appliedDate: "2024-01-21" },
    { id: 8, name: "Jennifer Thomas", email: "jennifer.t@email.com", image: profile16, appliedDate: "2024-01-22" },
  ];
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: '#F5F4F1' }}>
      {/* Header */}
      <header className="h-[54px] flex items-center justify-between px-5 flex-shrink-0" style={{ backgroundColor: '#F2F1ED', borderBottom: '1px solid #D9D9D9' }}>
        {/* Left side - Back button and Jobs dropdown */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="w-7 h-7 rounded-md flex items-center justify-center transition-all bg-white hover:bg-gray-50 border border-gray-200">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Jobs dropdown */}
          <div className="relative">
            <button onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all bg-white hover:bg-gray-50 border border-gray-200">
              <img src={jobDropdownIcon} alt="Job" className="w-4 h-4 rounded" />
              <span className="font-medium text-sm text-gray-700">BD Representative / Sales Manager</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-700" />
            </button>
            
            {jobsDropdownOpen && <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                {jobs.map(job => <button key={job.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left" onClick={() => setJobsDropdownOpen(false)}>
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
                    <span className="text-sm">{job.title}</span>
                  </button>)}
              </div>}
          </div>
        </div>


        {/* Right side - Profile, Invite, More, Expand Chat */}
        <div className="flex items-center gap-2">
          <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
          <button 
            onClick={() => setIsChatCollapsed(!isChatCollapsed)}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-all bg-white hover:bg-gray-50 border border-gray-200"
            title={isChatCollapsed ? "Open AI Chat" : "Close AI Chat"}
          >
            <ChevronLeft className={`w-4 h-4 text-gray-700 transition-transform ${isChatCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </header>

      {/* Main Content - Flex layout without resizable */}
      <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#FBFAF9' }}>
        {/* Left Panel - Candidates View */}
        <div className={`flex-1 ${isChatCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`h-full flex flex-col py-6 pb-5 relative ${isChatCollapsed ? 'w-full max-w-[1200px]' : 'w-full'}`}>
            <div className={`flex-1 overflow-y-auto relative scrollbar-hide ${isChatCollapsed ? 'mx-6' : 'ml-4 mr-4'}`}>
              <div className={`${selectedBestMatch ? 'pl-0 pr-0' : 'pl-0 pr-0'} ${isChatCollapsed ? '' : 'max-w-[1200px]'}`}>
              {/* Header with stats - hide when profile is selected */}
                {!selectedBestMatch && (
                  <div className="mb-5 animate-slide-down-fade-in">
                    {/* Best Matches Section Title */}
                    <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Best matches</h3>

                    {/* Rate Candidates Banner */}
                    <button
                      onClick={handleStartReview}
                      className="w-full rounded-xl py-10 px-8 text-left hover:opacity-90 transition-all group mb-4"
                      style={{ backgroundColor: '#CD785C', border: 'none' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <h2 className="text-lg font-medium text-white mb-1">
                              Rate matched candidates ({filteredCandidates.length})
                            </h2>
                            <p className="text-sm text-white/80">
                              Review and rate {filteredCandidates.length} matches for this role.
                            </p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>

                    {/* Review and Rating History Banner */}
                    <button
                      className="w-full rounded-xl py-5 px-6 text-left hover:border-[#D9D9D9] transition-all group mb-4"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <svg className="w-5 h-5 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          <div>
                            <h2 className="text-base font-medium text-foreground">
                              Review and rating history
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              View your past reviews and ratings.
                            </p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-[#6B6B6B] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>

                    {/* Your Pipeline Section Title */}
                    <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Your Pipeline</h3>

                    {/* Navigation Cards */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {/* Shortlist Card */}
                      <button 
                        onClick={() => navigate('/job/pipeline')} 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B85B44' }}>
                            <svg className="w-4 h-4" style={{ color: '#FFFFFE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">50</span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">Shortlist</p>
                        <p className="text-sm text-muted-foreground mb-3">View best matches</p>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <span>View</span>
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Outreach Card */}
                      <button 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B85B44' }}>
                            <svg className="w-4 h-4" style={{ color: '#FFFFFE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">40</span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">Outreach</p>
                        <p className="text-sm text-muted-foreground mb-3">Reach out to shortlisted</p>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <span>View</span>
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Interview Card */}
                      <button 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#B85B44' }}>
                            <svg className="w-4 h-4" style={{ color: '#FFFFFE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">25</span>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">Interview</p>
                        <p className="text-sm text-muted-foreground mb-3">Ready to schedule</p>
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          <span>View</span>
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>

                    {/* Knowledge Base Section Title */}
                    <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Knowledge base</h3>

                    {/* Second Row - Job, Company, Brain */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Job Card */}
                      <button 
                        onClick={() => navigate('/joboffer')} 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EBDBBD' }}>
                            <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">Job</span>
                          <svg className="w-3.5 h-3.5 text-[#6B6B6B] ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Company Card */}
                      <button 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EBDBBD' }}>
                            <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">Company</span>
                          <svg className="w-3.5 h-3.5 text-[#6B6B6B] ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Brain Card */}
                      <button 
                        onClick={() => navigate('/job/brain')} 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EBDBBD' }}>
                            <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-foreground">Brain</span>
                          <svg className="w-3.5 h-3.5 text-[#6B6B6B] ml-auto group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Focused Candidate Review */}
                {selectedBestMatch && !reviewComplete ? (
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
                                  setSelectedBestMatch(filteredCandidates[currentCandidateIndex - 1]);
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
                                  setSelectedBestMatch(filteredCandidates[currentCandidateIndex + 1]);
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
                ) : reviewComplete ? (
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
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        {!isChatCollapsed && (
          <div className="w-[380px] flex-shrink-0 pr-4 pb-5">
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

export default JobPeopleView;