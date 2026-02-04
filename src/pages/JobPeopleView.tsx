import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Search, Filter, ArrowLeft } from 'lucide-react';
import { ProfileDialog } from '@/components/ProfileDialog';
import { ApplicantReviewDialog } from '@/components/ApplicantReviewDialog';
import { RejectionDialog } from '@/components/RejectionDialog';
import { InviteDialog } from '@/components/InviteDialog';

import { BulkContactDialog } from '@/components/BulkContactDialog';
import CandidateDetailPanel from '@/components/CandidateDetailPanel';
import CandidateProfilePanel from '@/components/CandidateProfilePanel';
import InitialsAvatar from '@/components/InitialsAvatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon-new.png';
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
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'pipeline'>('job');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  
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
          <button onClick={() => navigate('/')} className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:opacity-80" style={{ backgroundColor: '#E8E6DD' }}>
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
            
            {jobsDropdownOpen && <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                {jobs.map(job => <button key={job.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left" onClick={() => setJobsDropdownOpen(false)}>
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
                    <span className="text-sm">{job.title}</span>
                  </button>)}
              </div>}
          </div>
        </div>

        {/* Center - Navigation Tabs */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-0.5 px-0.5 h-7 rounded-md" style={{ backgroundColor: '#E8E6DD' }}>
          <button
            onClick={() => navigate('/job/people/view')}
            className={`px-3 h-[22px] rounded text-xs font-medium transition-all ${
              activeTab === 'job' ? 'bg-white shadow-sm' : ''
            }`}
            style={{ color: '#333333' }}
          >
            Job
          </button>
          <button
            onClick={() => navigate('/job/best-matches')}
            className={`px-3 h-[22px] rounded text-xs font-medium transition-all ${
              activeTab === 'people' ? 'bg-white shadow-sm' : ''
            }`}
            style={{ color: '#333333' }}
          >
            Review (50)
          </button>
          <button
            onClick={() => navigate('/job/pipeline')}
            className={`px-3 h-[22px] rounded text-xs font-medium transition-all ${
              activeTab === 'pipeline' ? 'bg-white shadow-sm' : ''
            }`}
            style={{ color: '#333333' }}
          >
            Pipeline
          </button>
        </div>

        {/* Right side - Profile */}
        <div className="flex items-center gap-2">
          <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
        </div>
      </header>

      {/* Main Content - Flex layout without resizable */}
      <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#FBFAF9' }}>
        {/* Main Content */}
        <div className="flex-1 flex justify-center">
          <div className="h-full flex flex-col py-6 pb-5 relative w-full max-w-[1200px]">
            <div className="flex-1 overflow-y-auto relative scrollbar-hide mx-6">
              <div className={`${selectedBestMatch ? 'pl-0 pr-0' : 'pl-0 pr-0'}`}>
              {/* Header with stats - hide when profile is selected */}
                {!selectedBestMatch && (
                  <div className="mb-5 animate-slide-down-fade-in">
                    {/* Best Matches Section Title */}
                    <h3 className="mb-3 pt-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Best matches</h3>

                    {/* Rate Candidates Banner */}
                    <button
                      onClick={() => navigate('/job/best-matches')}
                      className="w-full rounded-xl py-10 px-8 text-left hover:opacity-90 transition-all group mb-4"
                      style={{ background: 'linear-gradient(135deg, #EBDBBD 0%, #D5A27F 20%, #CD785C 45%, #CD785C 100%)', border: 'none' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                          <svg className="w-7 h-7" style={{ color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <div>
                            <h2 className="text-lg mb-1" style={{ color: '#000000', fontFamily: 'CooperLight, sans-serif' }}>
                              Rate matched candidates ({filteredCandidates.length})
                            </h2>
                            <p className="text-sm" style={{ color: 'rgba(0, 0, 0, 0.6)', fontFamily: 'Inter, sans-serif' }}>
                              Review and rate {filteredCandidates.length} matches for this role.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm" style={{ color: '#000000', fontFamily: 'Inter, sans-serif' }}>Begin reviewing matches</span>
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" style={{ color: '#000000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Review and Rating History Banner */}
                    <button
                      className="w-full rounded-xl py-5 px-6 text-left hover:border-[#D9D9D9] transition-all group mb-4"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#D5A27F' }}>
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-base text-foreground" style={{ fontFamily: 'CooperLight, sans-serif' }}>
                              Review and rating history
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              View your past reviews and ratings.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>View reviews</span>
                          <svg className="w-5 h-5 text-[#6B6B6B] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Your Pipeline Section Title */}
                    <div className="flex items-center justify-between mb-3 pt-3">
                      <h3 style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Your Pipeline</h3>
                      <button 
                        onClick={() => navigate('/job/pipeline')}
                        className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity"
                        style={{ color: '#333333' }}
                      >
                        View pipeline
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Navigation Cards - Full Width Horizontal Scroll - Breaks out of container */}
                    <div className="overflow-x-auto scrollbar-hide mb-4 -mx-6" style={{ width: 'calc(100% + 48px)' }}>
                      <div className="flex gap-3 px-6">
                        {/* Shortlist Card */}
                        <button 
                          onClick={() => navigate('/job/pipeline')} 
                          className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group flex-shrink-0"
                          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6', width: '280px' }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Qualified Candidates</p>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#1A1A1A', color: '#FBFBFB' }}>50</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Candidates to contact</p>
                          <div className="w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm text-muted-foreground group-hover:text-foreground group-hover:border-[#1A1A1A] transition-all" style={{ border: '1px solid #E6E6E6' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif' }}>Engage with candidates</span>
                          </div>
                        </button>

                        {/* Outreach Card */}
                        <button 
                          className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group flex-shrink-0"
                          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6', width: '280px' }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Engaged Candidates</p>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#1A1A1A', color: '#FBFBFB' }}>40</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Candidates to schedule</p>
                          <div className="w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm text-muted-foreground group-hover:text-foreground group-hover:border-[#1A1A1A] transition-all" style={{ border: '1px solid #E6E6E6' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif' }}>Go to conversations</span>
                          </div>
                        </button>

                        {/* Interview Card */}
                        <button 
                          className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group flex-shrink-0"
                          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6', width: '280px' }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Interviewing Candidates</p>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#1A1A1A', color: '#FBFBFB' }}>25</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Scheduled to interview</p>
                          <div className="w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm text-muted-foreground group-hover:text-foreground group-hover:border-[#1A1A1A] transition-all" style={{ border: '1px solid #E6E6E6' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif' }}>View scheduled candidates</span>
                          </div>
                        </button>

                        {/* Rejected Candidates Card */}
                        <button 
                          className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group flex-shrink-0"
                          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6', width: '280px' }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Rejected Candidates</p>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#1A1A1A', color: '#FBFBFB' }}>12</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Candidates that got rejected</p>
                          <div className="w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm text-muted-foreground group-hover:text-foreground group-hover:border-[#1A1A1A] transition-all" style={{ border: '1px solid #E6E6E6' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif' }}>Send rejection messages</span>
                          </div>
                        </button>

                        {/* Qualified for Job Card */}
                        <button 
                          className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group flex-shrink-0"
                          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6', width: '280px' }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Qualified for Job</p>
                            <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{ backgroundColor: '#1A1A1A', color: '#FBFBFB' }}>8</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Ready to employ</p>
                          <div className="w-full flex items-center justify-center px-3 py-1.5 rounded-lg text-sm text-muted-foreground group-hover:text-foreground group-hover:border-[#1A1A1A] transition-all" style={{ border: '1px solid #E6E6E6' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif' }}>View ready candidates</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Knowledge Base Section Title */}
                    <h3 className="mb-3 pt-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Knowledge base</h3>

                    {/* Second Row - Job, Company, Brain */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Job Card */}
                      <button 
                        onClick={() => navigate('/job')}
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EBDBBD' }}>
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Job Description</span>
                          <span className="text-sm text-muted-foreground ml-auto" style={{ fontFamily: 'Inter, sans-serif' }}>View & Edit</span>
                          <svg className="w-3.5 h-3.5 text-[#6B6B6B] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>CTO</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>$150k + benefits</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Warsaw / Hybrid</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Full-time</span>
                          </div>
                        </div>
                      </button>

                      {/* Company Card */}
                      <button 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EBDBBD' }}>
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Company</span>
                          <span className="text-sm text-muted-foreground ml-auto" style={{ fontFamily: 'Inter, sans-serif' }}>View & Edit</span>
                          <svg className="w-3.5 h-3.5 text-[#6B6B6B] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <div className="flex items-center gap-1.5 font-medium text-foreground">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>PriceMind AI</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>51-200 employees</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>AI-powered pricing optimization</span>
                          </div>
                        </div>
                      </button>

                      {/* Brain Card */}
                      <button 
                        onClick={() => navigate('/job/brain')} 
                        className="rounded-xl p-4 text-left hover:border-[#D9D9D9] transition-colors group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}
                      >
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EBDBBD' }}>
                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-foreground" style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.05rem' }}>Brain & Reasoning</span>
                          <span className="text-sm text-muted-foreground ml-auto" style={{ fontFamily: 'Inter, sans-serif' }}>View & Edit</span>
                          <svg className="w-3.5 h-3.5 text-[#6B6B6B] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <div className="space-y-1.5 text-xs text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 font-medium text-foreground">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Reasoning v2.3</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Jan 28, 14:32</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 font-medium text-foreground">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>Reasoning v2.2</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Jan 25, 09:15</span>
                            </div>
                          </div>
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

      </div>

      <InviteDialog
        open={inviteDialogOpen}
        onOpenChange={setInviteDialogOpen}
      />
    </div>
  );
};

export default JobPeopleView;