import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, Search, Filter } from 'lucide-react';
import { ProfileDialog } from '@/components/ProfileDialog';
import { ApplicantReviewDialog } from '@/components/ApplicantReviewDialog';
import { RejectionDialog } from '@/components/RejectionDialog';
import { InviteDialog } from '@/components/InviteDialog';
import { JobChatPanel } from '@/components/JobChatPanel';
import { BulkContactDialog } from '@/components/BulkContactDialog';
import CandidateDetailPanel from '@/components/CandidateDetailPanel';
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
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-[54px] bg-background flex items-center justify-between px-5 flex-shrink-0">
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
          <div className={`h-full flex flex-col pt-6 pb-3 relative ${isChatCollapsed ? 'w-full max-w-[1200px]' : 'w-full'}`}>
            <div className={`flex-1 overflow-y-auto relative scrollbar-hide ${isChatCollapsed ? 'mx-6' : 'ml-4 mr-4'}`}>
              <div className={`${selectedBestMatch ? 'pl-0 pr-0' : 'pl-0 pr-0'} ${isChatCollapsed ? '' : 'max-w-[1200px]'}`}>
              {/* Header with stats - hide when profile is selected */}
                {!selectedBestMatch && (
                  <div className="mb-5 animate-slide-down-fade-in overflow-hidden">

                    {/* Rate Candidates Banner */}
                    <button
                      onClick={() => setSelectedBestMatch(filteredCandidates[0])}
                      className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6 text-left hover:border-primary/40 hover:from-primary/15 transition-all group mb-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <h2 className="font-hedvig text-xl font-semibold text-foreground mb-1">
                              Rate matched candidates ({filteredCandidates.length})
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              We have found {filteredCandidates.length} matches for BD Representative / Sales Manager. Review and rate them now.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
                          <span className="text-sm font-medium">Start reviewing</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Navigation Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {/* Shortlist Card */}
                      <button 
                        onClick={() => navigate('/job/pipeline')} 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-950">Shortlist</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">View best matches</p>
                        <div className="flex items-center gap-2 text-sm text-gray-950">
                          <span>View shortlist</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Outreach Card */}
                      <button 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-950">Outreach</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Reach out to shortlisted</p>
                        <div className="flex items-center gap-2 text-sm text-gray-950">
                          <span>View outreach</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Interview Card */}
                      <button 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-gray-950">Interview</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Candidates ready to schedule</p>
                        <div className="flex items-center gap-2 text-sm text-gray-950">
                          <span>View pipeline</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>

                    {/* Second Row - Job, Company, Brain */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Job Card */}
                      <button 
                        onClick={() => navigate('/joboffer')} 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Job</span>
                          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Company Card */}
                      <button 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Company</span>
                          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>

                      {/* Brain Card */}
                      <button 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-rose-100 flex items-center justify-center">
                            <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Brain</span>
                          <svg className="w-4 h-4 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Best Matches Content */}
                {selectedBestMatch ? (
                  // Split view: header + list on left, detail panel on right - aligned at top
                  <div className="flex gap-4 h-[calc(100vh-90px)] animate-content-expand">
                    {/* Left side: header + candidate list */}
                    <div className="w-[40%] flex flex-col min-h-0">
                      {/* Best matches header */}
                      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                        <h2 className="font-hedvig font-medium text-foreground text-xl">
                          Best matches ({filteredCandidates.length})
                        </h2>
                      </div>
                      {/* Candidate list */}
                      <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide">
                      {filteredCandidates.map(candidate => (
                        <div
                          key={candidate.id}
                          className={`bg-white border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer ${
                            selectedBestMatch.id === candidate.id ? 'border-primary' : 'border-[#EEEDEC]'
                          }`}
                          onClick={() => setSelectedBestMatch(candidate)}
                        >
                          {/* Candidate header */}
                          <div className="flex items-start gap-3 mb-3">
                            <InitialsAvatar name={candidate.name} size="md" className="rounded-xl flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                <h3 className="text-sm font-medium text-foreground truncate">
                                  {candidate.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                  {candidate.isNew && (
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                  )}
                                  <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m3 7 9 6 9-6" />
                                  </svg>
                                  <span className="text-xs text-muted-foreground">+5</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{candidate.city}</span>
                                <span>•</span>
                                <span className="font-medium text-lime-800">{candidate.match} match</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                            {candidate.description}
                          </p>

                          {/* Experience summary */}
                          <p className="text-xs text-muted-foreground mb-2">
                            Experience · {8 + (candidate.id % 3)} yrs total
                          </p>

                          {/* Roles */}
                          <div className="space-y-2 mb-3">
                            {candidate.roles.slice(0, 2).map((role, idx) => {
                              const icon = getCompanyIcon(role.company);
                              return (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  {/* Company icon */}
                                  <div 
                                    className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: icon.bg }}
                                  >
                                    <span className="text-xs font-bold" style={{ color: icon.text }}>{icon.letter}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground truncate">{role.role}</p>
                                    <p className="text-muted-foreground truncate">
                                      {role.company} · Jun 2023 − Present · 6m
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Education */}
                          {candidate.education && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-2">Education</p>
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 bg-[#8B0000]">
                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-foreground truncate">{candidate.education.degree}</p>
                                  <p className="text-muted-foreground truncate">
                                    {candidate.education.school} · {candidate.education.graduationDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      </div>
                    </div>

                    {/* Detail Panel */}
                    <div className="w-[60%] bg-white border border-[#EEEDEC] rounded-xl overflow-hidden">
                      <CandidateDetailPanel
                        candidate={selectedBestMatch}
                        onClose={() => setSelectedBestMatch(null)}
                      />
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