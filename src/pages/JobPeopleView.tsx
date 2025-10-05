import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, Search } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ProfileDialog } from '@/components/ProfileDialog';
import { RejectionDialog } from '@/components/RejectionDialog';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon.png';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';
import profile6 from '@/assets/profile-6.jpg';
import profile7 from '@/assets/profile-7.jpg';
import profile8 from '@/assets/profile-8.jpg';
import profile9 from '@/assets/profile-9.jpg';
import profile10 from '@/assets/profile-10.jpg';
import profile11 from '@/assets/profile-11.jpg';
import profile12 from '@/assets/profile-12.jpg';
import profile13 from '@/assets/profile-13.jpg';
import profile14 from '@/assets/profile-14.jpg';
import profile15 from '@/assets/profile-15.jpg';
import profile16 from '@/assets/profile-16.jpg';
import profile17 from '@/assets/profile-17.jpg';
import profile18 from '@/assets/profile-18.jpg';
import profile19 from '@/assets/profile-19.jpg';
import profile20 from '@/assets/profile-20.jpg';
const JobPeopleView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'shortlist'>('people');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof bestCandidates[0] | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Animated counters
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [rejectionsCount, setRejectionsCount] = useState(0);
  const [bestMatchesCount, setBestMatchesCount] = useState(0);
  
  const targetApplicants = 23;
  const targetRejections = 8;
  const targetBestMatches = 100;
  const bestCandidates = [{
    id: 1,
    name: "Sarah Chapman",
    image: profile1,
    city: "Stockholm",
    match: "10/12",
    description: "A seasoned Senior Product Designer with extensive leadership experience in fintech. Sarah has dedicated over 8 years to building world-class products, contributing to high-growth companies. Her expertise lies in creating intuitive user experiences while driving product strategy and mentoring design teams.",
    roles: [{
      company: "Klarna",
      role: "Senior UX/UI Designer"
    }, {
      company: "Spotify",
      role: "Product Designer"
    }, {
      company: "Tink",
      role: "Product Design Intern"
    }]
  }, {
    id: 2,
    name: "Marcus Andersson",
    image: profile2,
    city: "Gothenburg",
    match: "9/12",
    description: "Marcus is a Senior Designer at Asseco with 10 years of experience, having multiple projects on Dribbble displaying potential of exponential product understanding. He specializes in design systems and has led transformation initiatives across enterprise platforms, bringing consistency and scalability to complex products.",
    roles: [{
      company: "Asseco",
      role: "Senior Designer"
    }, {
      company: "H&M",
      role: "UX Designer"
    }, {
      company: "Ericsson",
      role: "UI Designer"
    }]
  }, {
    id: 3,
    name: "Emma Lundberg",
    image: profile3,
    city: "Malmö",
    match: "11/12",
    description: "Emma is an innovative Senior Product Designer known for her data-driven approach and exceptional prototyping skills. With 9 years in the industry, she has crafted user experiences for both B2B and B2C products, always focusing on measurable impact and user satisfaction metrics.",
    roles: [{
      company: "Bambora",
      role: "Lead Product Designer"
    }, {
      company: "iZettle",
      role: "Product Designer"
    }, {
      company: "King",
      role: "Senior UI Designer"
    }]
  }, {
    id: 4,
    name: "Oliver Karlsson",
    image: profile4,
    city: "Stockholm",
    match: "10/12",
    description: "Oliver brings a unique blend of technical knowledge and design excellence, having worked extensively with cross-functional teams in agile environments. His 7 years of experience span fintech, e-commerce, and SaaS products, with a strong focus on accessibility and inclusive design practices.",
    roles: [{
      company: "Northmill",
      role: "Senior Product Designer"
    }, {
      company: "Delivery Hero",
      role: "Product Designer"
    }, {
      company: "Trustly",
      role: "UX Designer"
    }]
  }, {
    id: 5,
    name: "Linnea Bergström",
    image: profile5,
    city: "Uppsala",
    match: "9/12",
    description: "Linnea excels at transforming complex requirements into elegant, user-friendly interfaces. With 6 years specializing in fintech and payment solutions, she has a proven track record of improving conversion rates and reducing user friction through thoughtful design iterations and rigorous testing.",
    roles: [{
      company: "Lunar",
      role: "Product Designer"
    }, {
      company: "Wrapp",
      role: "UX/UI Designer"
    }, {
      company: "Zimpler",
      role: "Junior Designer"
    }]
  }, {
    id: 6,
    name: "Filip Johansson",
    image: profile6,
    city: "Stockholm",
    match: "10/12",
    description: "Filip is a creative problem-solver with extensive experience in building design systems and leading design sprints. His 8 years in the field have equipped him with deep expertise in user research, interaction design, and visual design, making him a versatile asset to any product team.",
    roles: [{
      company: "Schibsted",
      role: "Senior Product Designer"
    }, {
      company: "Avanza",
      role: "Lead Designer"
    }, {
      company: "Collector Bank",
      role: "Product Designer"
    }]
  }, {
    id: 7,
    name: "Isabella Nilsson",
    image: profile7,
    city: "Lund",
    match: "11/12",
    description: "Isabella combines strategic thinking with exceptional execution skills, having delivered award-winning products throughout her 9-year career. She specializes in end-to-end product design, from initial research and concept development to final implementation and post-launch optimization.",
    roles: [{
      company: "Tetra Pak",
      role: "Senior UX Designer"
    }, {
      company: "Sony Mobile",
      role: "Product Designer"
    }, {
      company: "Axis",
      role: "Interaction Designer"
    }]
  }, {
    id: 8,
    name: "Alexander Berg",
    image: profile8,
    city: "Stockholm",
    match: "9/12",
    description: "Alexander is passionate about creating delightful user experiences through animation and micro-interactions. His 7 years of experience include work on mobile apps, web platforms, and emerging technologies, always pushing the boundaries of what's possible in digital product design.",
    roles: [{
      company: "Tobii",
      role: "Senior Product Designer"
    }, {
      company: "Mojang",
      role: "UI/UX Designer"
    }, {
      company: "Paradox",
      role: "Product Designer"
    }]
  }];
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, []);
  
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
    title: 'Senior Product Designer'
  }, {
    id: 2,
    title: 'Chief Operations Officer'
  }, {
    id: 3,
    title: 'Frontend Developer'
  }];

  const rejectedCandidates = [
    { id: 1, name: "Michael Johnson", email: "michael.j@email.com", image: profile9, appliedDate: "2024-01-15" },
    { id: 2, name: "Sarah Williams", email: "sarah.w@email.com", image: profile10, appliedDate: "2024-01-16" },
    { id: 3, name: "David Brown", email: "david.b@email.com", image: profile11, appliedDate: "2024-01-17" },
    { id: 4, name: "Emily Davis", email: "emily.d@email.com", image: profile12, appliedDate: "2024-01-18" },
    { id: 5, name: "James Wilson", email: "james.w@email.com", image: profile13, appliedDate: "2024-01-19" },
    { id: 6, name: "Lisa Anderson", email: "lisa.a@email.com", image: profile14, appliedDate: "2024-01-20" },
    { id: 7, name: "Robert Taylor", email: "robert.t@email.com", image: profile15, appliedDate: "2024-01-21" },
    { id: 8, name: "Jennifer Thomas", email: "jennifer.t@email.com", image: profile16, appliedDate: "2024-01-22" },
  ];
  return <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-[68px] bg-background flex items-center justify-between px-6 flex-shrink-0">
        {/* Left side - Back button and Jobs dropdown */}
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Jobs dropdown */}
          <div className="relative">
            <button onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200">
              <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
              <span className="font-medium text-gray-700">Senior product designer</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
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
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{
        backgroundColor: '#FAF8F4'
      }}>
          <button onClick={() => navigate('/job')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'job' ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Job
          </button>
          <button onClick={() => setActiveTab('people')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'people' ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            People
          </button>
          <button onClick={() => setActiveTab('shortlist')} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeTab === 'shortlist' ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Shortlist
          </button>
        </div>

        {/* Right side - Profile, Invite, More */}
        <div className="flex items-center gap-3">
          <img src={userAvatarImage} alt="Profile" className="w-9 h-9 rounded-full object-cover shadow-md border-2 border-gray-200" />
          <button className="px-3 py-1.5 rounded-lg font-medium transition-all bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg border border-gray-700">
            Invite
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200">
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Panel - Candidates View */}
        <ResizablePanel defaultSize={isChatCollapsed ? 100 : 65} minSize={30}>
          <div className="h-full flex flex-col py-6 pb-8 relative" style={{
          backgroundColor: '#FAF8F4'
        }}>
            <div className={`flex-1 overflow-y-auto bg-background rounded-[15px] relative ${isChatCollapsed ? 'mx-6' : 'ml-6 mr-2.5'}`}>
              <div className="p-6 max-w-[1200px] mx-auto">
                {/* Header with stats */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-medium text-foreground">{bestMatchesCount} of 230 people</h1>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                        <Search className="w-3.5 h-3.5" />
                        <span className="text-muted-foreground">Searches (6)</span>
                      </button>
                    </div>
                  </div>

                  {/* Applicants and Rejections */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-card border border-border/40 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-950">Applicants</p>
                      </div>
                      <p className="font-hedvig text-3xl font-semibold text-foreground mb-4">{applicantsCount}</p>
                      <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                        <span className="text-gray-950">Review now</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div className="bg-card border border-border/40 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="m15 9-6 6" />
                            <path d="m9 9 6 6" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-950">Rejections</p>
                      </div>
                      <p className="font-hedvig text-3xl font-semibold text-foreground mb-4">{rejectionsCount}</p>
                      <button 
                        onClick={() => setRejectionDialogOpen(true)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span className="text-gray-950">Review now</span>
                        <svg fill="none" stroke="black" viewBox="0 0 24 24" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Best matches section */}
                <div className="mb-4">
                  <h2 className="font-hedvig font-medium text-foreground mb-4 text-xl">Best matches</h2>
                </div>

                {/* Candidates grid */}
                <div className="grid grid-cols-2 gap-4">
                  {bestCandidates.map(candidate => <div 
                      key={candidate.id} 
                      className="bg-card border border-border/40 rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer group"
                      onClick={() => {
                        setSelectedCandidate(candidate);
                        setProfileDialogOpen(true);
                      }}
                    >
                      {/* Candidate header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground mb-0.5 truncate">
                            {candidate.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{candidate.city}</span>
                            <span>•</span>
                            <span className="font-medium text-lime-800">{candidate.match} Match</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                        {candidate.description}
                      </p>

                      {/* Roles */}
                      <div className="flex flex-wrap gap-2">
                        {candidate.roles.map((role, idx) => <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/50 rounded-lg text-xs">
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
                            {role.company === 'Wrapp' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6B9D]">
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
                          </div>)}
                      </div>
                    </div>)}
                </div>
              </div>

              {isChatCollapsed && <button onClick={() => setIsChatCollapsed(false)} className="absolute top-6 right-6 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200 z-10">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>}
            </div>
          </div>
        </ResizablePanel>

        {!isChatCollapsed && <ResizableHandle className="w-0 bg-transparent" />}

        {/* Right Panel - Chat */}
        {!isChatCollapsed && <ResizablePanel defaultSize={35} minSize={30}>
            <div className="h-full flex flex-col" style={{
          backgroundColor: '#FAF8F4'
        }}>
              <div className="flex flex-col h-full py-6 pr-8 pl-2.5 pb-8">
                {/* Chat Header */}
                <div className="flex gap-6 mb-12 flex-shrink-0 relative">
                  <button onClick={() => setIsChatCollapsed(true)} className="absolute right-0 top-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200">
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{
                  transform: 'rotate(180deg)'
                }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                </div>

                {/* Chat Messages - Scrollable */}
                <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                  <div className="flex justify-start">
                    <div className="text-foreground px-6 py-4">
                      I've found 100 candidates matching your criteria. The search covered external sources (LinkedIn, GitHub, Dribbble) and internal sources (Network, Applied). The best matches are displayed based on their skills, experience, and cultural fit.
                    </div>
                  </div>

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input - Fixed at bottom */}
                <form className="relative flex-shrink-0">
                  <textarea placeholder="Ask anything about the candidates..." rows={3} className="w-full bg-white rounded-2xl px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px] shadow-sm" />
                  <button type="submit" className="absolute right-4 bottom-4 w-10 h-10 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors shadow-md">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </ResizablePanel>}
      </ResizablePanelGroup>

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

      {/* Rejection Dialog */}
      <RejectionDialog
        open={rejectionDialogOpen}
        onOpenChange={setRejectionDialogOpen}
        candidates={rejectedCandidates}
      />
    </div>;
};
export default JobPeopleView;