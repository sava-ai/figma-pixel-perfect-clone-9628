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
  return <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
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

        {/* Center - Tabs */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-md" style={{
        backgroundColor: '#FAF8F4'
      }}>
          <button onClick={() => navigate('/job')} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm ${activeTab === 'job' ? 'bg-white border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Job
          </button>
          <button onClick={() => setActiveTab('people')} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm ${activeTab === 'people' ? 'bg-white border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            People (230)
          </button>
          <button onClick={() => navigate('/job/pipeline')} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm ${activeTab === 'pipeline' ? 'bg-white border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Pipeline (18)
          </button>
        </div>

        {/* Right side - Profile, Invite, More, Expand Chat */}
        <div className="flex items-center gap-2">
          <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
          <button 
            onClick={() => setInviteDialogOpen(true)}
            className="px-2.5 py-1 rounded-md text-sm font-medium transition-all bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
          >
            Invite
          </button>
          <button className="w-7 h-7 rounded-md flex items-center justify-center transition-all bg-white hover:bg-gray-50 border border-gray-200">
            <MoreVertical className="w-4 h-4 text-gray-700" />
          </button>
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
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-lg font-medium text-foreground">{bestMatchesCount} of 230 people</h1>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white border border-[#EEEDEC] rounded-lg hover:bg-muted/50 transition-colors">
                          <Search className="w-3.5 h-3.5" />
                          <span className="text-muted-foreground">Searches (6)</span>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-0.5 p-0.5 rounded-md mb-4" style={{ backgroundColor: '#FAF8F4' }}>
                      <button 
                        onClick={() => navigate('/job')} 
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm text-foreground hover:text-foreground"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Job & Company
                      </button>
                      <button 
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm bg-white border border-gray-200 text-gray-700 font-medium"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Candidates (230)
                      </button>
                      <button 
                        onClick={() => navigate('/job/pipeline')} 
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm text-foreground hover:text-foreground"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        Shortlist (18)
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
                        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                              <Filter className="w-3.5 h-3.5" />
                              Filter
                              {selectedTags.length > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                                  {selectedTags.length}
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56" align="start">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm">Filter by tags</h4>
                              <div className="space-y-2">
                                {allTags.map(tag => (
                                  <div key={tag} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={tag}
                                      checked={selectedTags.includes(tag)}
                                      onCheckedChange={() => toggleTag(tag)}
                                    />
                                    <label
                                      htmlFor={tag}
                                      className="text-sm cursor-pointer"
                                    >
                                      {tag}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {selectedTags.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => setSelectedTags([])}
                                >
                                  Clear filters
                                </Button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
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
                ) : (
                  // Default grid view with header
                  <>
                    {/* Best matches header */}
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="font-hedvig font-medium text-foreground text-xl">
                        Best matches ({filteredCandidates.length})
                      </h2>
                      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 gap-2">
                            <Filter className="w-3.5 h-3.5" />
                            Filter
                            {selectedTags.length > 0 && (
                              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                                {selectedTags.length}
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="start">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Filter by tags</h4>
                            <div className="space-y-2">
                              {allTags.map(tag => (
                                <div key={tag} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`grid-${tag}`}
                                    checked={selectedTags.includes(tag)}
                                    onCheckedChange={() => toggleTag(tag)}
                                  />
                                  <label
                                    htmlFor={`grid-${tag}`}
                                    className="text-sm cursor-pointer"
                                  >
                                    {tag}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {selectedTags.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full"
                                onClick={() => setSelectedTags([])}
                              >
                                Clear filters
                              </Button>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    {filteredCandidates.map(candidate => <div
                        key={candidate.id} 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer group relative"
                        onClick={() => setSelectedBestMatch(candidate)}
                      >
                        {candidate.isNew && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
                            NEW
                          </div>
                        )}
                        {/* Candidate header */}
                        <div className="flex items-start gap-3 mb-4">
                          <InitialsAvatar name={candidate.name} size="md" className="rounded-xl flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-foreground mb-0.5 truncate">
                              {candidate.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <span>{candidate.city}</span>
                              <span>•</span>
                              <span className="font-medium text-lime-800">{candidate.match} Match</span>
                            </div>
                          </div>
                        </div>


                        {/* Description */}
                        <p className="text-[0.9rem] text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                          {candidate.description}
                        </p>

                        {/* Roles */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.roles.slice(0, 2).map((role, idx) => {
                            const isCurrent = candidate.currentRoleIndex === idx;
                            return (
                              <div 
                                key={idx} 
                                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-border rounded-lg text-xs"
                              >
                                  {role.company === 'Klarna' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FFB3C7]">
                                      <span className="text-[10px] font-bold" style={{
                                color: '#000'
                              }}>K</span>
                                    </div>}
                                  {role.company === 'Spotify' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#1DB954]">
                                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                      </svg>
                                    </div>}
                                  {role.company === 'Tink' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-black">
                                      <span className="text-[10px] font-bold text-white">T</span>
                                    </div>}
                                  {role.company === 'Asseco' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0066B3]">
                                      <span className="text-[10px] font-bold text-white">A</span>
                                    </div>}
                                  {role.company === 'H&M' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#E50010]">
                                      <span className="text-[8px] font-bold text-white">H&M</span>
                                    </div>}
                                  {role.company === 'Ericsson' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0082CE]">
                                      <span className="text-[10px] font-bold text-white">E</span>
                                    </div>}
                                  {role.company === 'Bambora' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#5E2CA5]">
                                      <span className="text-[10px] font-bold text-white">B</span>
                                    </div>}
                                  {role.company === 'iZettle' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#2DBECD]">
                                      <span className="text-[10px] font-bold text-white">iZ</span>
                                    </div>}
                                  {role.company === 'King' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6C00]">
                                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                      </svg>
                                    </div>}
                                  {role.company === 'Northmill' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00C896]">
                                      <span className="text-[10px] font-bold text-white">N</span>
                                    </div>}
                                  {role.company === 'Delivery Hero' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#D61F26]">
                                      <span className="text-[10px] font-bold text-white">DH</span>
                                    </div>}
                                  {role.company === 'Trustly' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0EE06E]">
                                      <span className="text-[10px] font-bold text-black">T</span>
                                    </div>}
                                  {role.company === 'Lunar' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-black">
                                      <span className="text-[10px] font-bold text-white">L</span>
                                    </div>}
                                  {role.company === 'Wrapp' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6C00]">
                                      <span className="text-[10px] font-bold text-white">W</span>
                                    </div>}
                                  {role.company === 'Zimpler' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00B67A]">
                                      <span className="text-[10px] font-bold text-white">Z</span>
                                    </div>}
                                  {role.company === 'Schibsted' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6200]">
                                      <span className="text-[10px] font-bold text-white">S</span>
                                    </div>}
                                  {role.company === 'Avanza' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00C281]">
                                      <span className="text-[10px] font-bold text-white">A</span>
                                    </div>}
                                  {role.company === 'Collector Bank' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#002855]">
                                      <span className="text-[10px] font-bold text-white">C</span>
                                    </div>}
                                  {role.company === 'Tetra Pak' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0033A0]">
                                      <span className="text-[10px] font-bold text-white">TP</span>
                                    </div>}
                                  {role.company === 'Sony Mobile' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-black">
                                      <span className="text-[10px] font-bold text-white">S</span>
                                    </div>}
                                  {role.company === 'Axis' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00A3E0]">
                                      <span className="text-[10px] font-bold text-white">A</span>
                                    </div>}
                                  {role.company === 'Tobii' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00A3E0]">
                                      <span className="text-[10px] font-bold text-white">T</span>
                                    </div>}
                                  {role.company === 'Mojang' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#8B0000]">
                                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                        <rect x="4" y="4" width="6" height="6" />
                                        <rect x="14" y="4" width="6" height="6" />
                                        <rect x="4" y="14" width="6" height="6" />
                                        <rect x="14" y="14" width="6" height="6" />
                                      </svg>
                                    </div>}
                                  {role.company === 'Paradox' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#E03C31]">
                                      <span className="text-[10px] font-bold text-white">P</span>
                                    </div>}
                                  <span className="text-muted-foreground truncate">
                                    {role.role}
                                  </span>
                                  {isCurrent && (
                                    <span className="ml-auto pl-1.5 text-[9px] font-semibold text-primary uppercase tracking-wider">
                                      Current
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>

                        {/* Education */}
                        {candidate.education && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Education</p>
                            <div className="flex items-center gap-2 px-2.5 py-1.5 border border-border rounded-lg text-xs">
                              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#8B0000]">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                </svg>
                              </div>
                              <span className="text-muted-foreground truncate">
                                {candidate.education.school} · {candidate.education.degree}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Chat - Fixed width, no resize handle */}
        {!isChatCollapsed && (
          <div className="w-[380px] flex-shrink-0">
            <JobChatPanel 
              defaultMessages={[{ text: 'I\'ve found 100 candidates matching your criteria. The search covered external sources (LinkedIn, GitHub, Dribbble) and internal sources (Network, Applied). The best matches are displayed based on their skills, experience, and cultural fit.', isUser: false }]}
              placeholder="Ask anything about the candidates..."
            />
          </div>
        )}
      </div>

      {/* Profile Dialog */}
      <ProfileDialog 
        candidate={selectedCandidate}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        onPrevious={() => {
          const currentIndex = bestCandidates.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex > 0) {
            setSelectedCandidate(bestCandidates[currentIndex - 1]);
          }
        }}
        onNext={() => {
          const currentIndex = bestCandidates.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < bestCandidates.length - 1) {
            setSelectedCandidate(bestCandidates[currentIndex + 1]);
          } else {
            setProfileDialogOpen(false);
          }
        }}
        onSkip={() => {
          const currentIndex = bestCandidates.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < bestCandidates.length - 1) {
            setSelectedCandidate(bestCandidates[currentIndex + 1]);
          } else {
            setProfileDialogOpen(false);
          }
        }}
      />

      {/* Applicant Review Dialog */}
      <ApplicantReviewDialog
        candidate={selectedCandidate}
        open={applicantReviewDialogOpen}
        onOpenChange={setApplicantReviewDialogOpen}
        onPrevious={() => {
          const applicants = bestCandidates.filter(c => c.tags.includes('Applicant'));
          const currentIndex = applicants.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex > 0) {
            setSelectedCandidate(applicants[currentIndex - 1]);
          }
        }}
        onNext={() => {
          const applicants = bestCandidates.filter(c => c.tags.includes('Applicant'));
          const currentIndex = applicants.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < applicants.length - 1) {
            setSelectedCandidate(applicants[currentIndex + 1]);
          } else {
            setApplicantReviewDialogOpen(false);
          }
        }}
        onSkip={() => {
          const applicants = bestCandidates.filter(c => c.tags.includes('Applicant'));
          const currentIndex = applicants.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < applicants.length - 1) {
            setSelectedCandidate(applicants[currentIndex + 1]);
          } else {
            setApplicantReviewDialogOpen(false);
          }
        }}
      />

      {/* Rejection Dialog */}
      <RejectionDialog
        open={rejectionDialogOpen}
        onOpenChange={setRejectionDialogOpen}
        candidates={rejectedCandidates}
      />

      {/* Invite Dialog */}
      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />

      {/* Bulk Contact Dialog */}
      <BulkContactDialog
        open={bulkContactDialogOpen}
        onOpenChange={setBulkContactDialogOpen}
        candidates={filteredCandidates}
      />
    </div>;
};
export default JobPeopleView;