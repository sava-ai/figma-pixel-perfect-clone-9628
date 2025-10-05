import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, Search } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
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

const JobPeopleView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'shortlist'>('people');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bestCandidates = [
    {
      id: 1,
      name: "Sarah Chapman",
      image: profile1,
      city: "Stockholm",
      match: "10/12",
      description: "A seasoned Senior Product Designer with extensive leadership experience in fintech. Sarah has dedicated over 8 years to building world-class products, contributing to high-growth companies. Her expertise lies in creating intuitive user experiences while driving product strategy and mentoring design teams.",
      roles: [
        { company: "Klarna", role: "Senior UX/UI Designer", logo: "K" },
        { company: "Spotify", role: "Product Designer", logo: "S" },
        { company: "Tink", role: "Product Design Intern", logo: "T" }
      ]
    },
    {
      id: 2,
      name: "Marcus Andersson",
      image: profile2,
      city: "Gothenburg",
      match: "9/12",
      description: "Marcus is a Senior Designer at Asseco with 10 years of experience, having multiple projects on Dribbble displaying potential of exponential product understanding. He specializes in design systems and has led transformation initiatives across enterprise platforms, bringing consistency and scalability to complex products.",
      roles: [
        { company: "Asseco", role: "Senior Designer", logo: "A" },
        { company: "H&M", role: "UX Designer", logo: "H" },
        { company: "Ericsson", role: "UI Designer", logo: "E" }
      ]
    },
    {
      id: 3,
      name: "Emma Lundberg",
      image: profile3,
      city: "Malmö",
      match: "11/12",
      description: "Emma is an innovative Senior Product Designer known for her data-driven approach and exceptional prototyping skills. With 9 years in the industry, she has crafted user experiences for both B2B and B2C products, always focusing on measurable impact and user satisfaction metrics.",
      roles: [
        { company: "Bambora", role: "Lead Product Designer", logo: "B" },
        { company: "iZettle", role: "Product Designer", logo: "I" },
        { company: "King", role: "Senior UI Designer", logo: "K" }
      ]
    },
    {
      id: 4,
      name: "Oliver Karlsson",
      image: profile4,
      city: "Stockholm",
      match: "10/12",
      description: "Oliver brings a unique blend of technical knowledge and design excellence, having worked extensively with cross-functional teams in agile environments. His 7 years of experience span fintech, e-commerce, and SaaS products, with a strong focus on accessibility and inclusive design practices.",
      roles: [
        { company: "Northmill", role: "Senior Product Designer", logo: "N" },
        { company: "Delivery Hero", role: "Product Designer", logo: "D" },
        { company: "Trustly", role: "UX Designer", logo: "T" }
      ]
    },
    {
      id: 5,
      name: "Linnea Bergström",
      image: profile5,
      city: "Uppsala",
      match: "9/12",
      description: "Linnea excels at transforming complex requirements into elegant, user-friendly interfaces. With 6 years specializing in fintech and payment solutions, she has a proven track record of improving conversion rates and reducing user friction through thoughtful design iterations and rigorous testing.",
      roles: [
        { company: "Lunar", role: "Product Designer", logo: "L" },
        { company: "Wrapp", role: "UX/UI Designer", logo: "W" },
        { company: "Zimpler", role: "Junior Designer", logo: "Z" }
      ]
    },
    {
      id: 6,
      name: "Filip Johansson",
      image: profile6,
      city: "Stockholm",
      match: "10/12",
      description: "Filip is a creative problem-solver with extensive experience in building design systems and leading design sprints. His 8 years in the field have equipped him with deep expertise in user research, interaction design, and visual design, making him a versatile asset to any product team.",
      roles: [
        { company: "Schibsted", role: "Senior Product Designer", logo: "S" },
        { company: "Avanza", role: "Lead Designer", logo: "A" },
        { company: "Collector Bank", role: "Product Designer", logo: "C" }
      ]
    },
    {
      id: 7,
      name: "Isabella Nilsson",
      image: profile7,
      city: "Lund",
      match: "11/12",
      description: "Isabella combines strategic thinking with exceptional execution skills, having delivered award-winning products throughout her 9-year career. She specializes in end-to-end product design, from initial research and concept development to final implementation and post-launch optimization.",
      roles: [
        { company: "Tetra Pak", role: "Senior UX Designer", logo: "T" },
        { company: "Sony Mobile", role: "Product Designer", logo: "S" },
        { company: "Axis", role: "Interaction Designer", logo: "A" }
      ]
    },
    {
      id: 8,
      name: "Alexander Berg",
      image: profile8,
      city: "Stockholm",
      match: "9/12",
      description: "Alexander is passionate about creating delightful user experiences through animation and micro-interactions. His 7 years of experience include work on mobile apps, web platforms, and emerging technologies, always pushing the boundaries of what's possible in digital product design.",
      roles: [
        { company: "Tobii", role: "Senior Product Designer", logo: "T" },
        { company: "Mojang", role: "UI/UX Designer", logo: "M" },
        { company: "Paradox", role: "Product Designer", logo: "P" }
      ]
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const jobs = [
    { id: 1, title: 'Senior Product Designer' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-[68px] bg-background flex items-center justify-between px-6 flex-shrink-0">
        {/* Left side - Back button and Jobs dropdown */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Jobs dropdown */}
          <div className="relative">
            <button
              onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
            >
              <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
              <span className="font-medium text-gray-700">Senior product designer</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </button>
            
            {jobsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                {jobs.map((job) => (
                  <button
                    key={job.id}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
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

        {/* Center - Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: '#FAF8F4' }}>
          <button
            onClick={() => navigate('/job')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'job' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Job
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'people' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            People
          </button>
          <button
            onClick={() => setActiveTab('shortlist')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'shortlist' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Shortlist
          </button>
        </div>

        {/* Right side - Profile, Invite, More */}
        <div className="flex items-center gap-3">
          <img 
            src={userAvatarImage} 
            alt="Profile" 
            className="w-9 h-9 rounded-full object-cover shadow-md border-2 border-gray-200"
          />
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
          <div className="h-full flex flex-col py-6 pb-8 relative" style={{ backgroundColor: '#FAF8F4' }}>
            <div className={`flex-1 overflow-y-auto bg-background rounded-[15px] relative ${isChatCollapsed ? 'mx-6' : 'ml-6 mr-2.5'}`}>
              <div className="p-6 max-w-[1200px] mx-auto">
                {/* Header with stats */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-medium text-foreground">100 of 230 people</h1>
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
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Applicants</p>
                          <p className="text-3xl font-semibold text-foreground">23</p>
                        </div>
                      </div>
                      <button className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors">
                        → Review now
                      </button>
                    </div>

                    <div className="bg-card border border-border/40 rounded-xl p-5">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                          <svg className="w-5 h-5 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="m15 9-6 6" />
                            <path d="m9 9 6 6" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground mb-1">Sent rejections</p>
                          <p className="text-3xl font-semibold text-foreground">8</p>
                        </div>
                      </div>
                      <button className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        → Review now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Best matches section */}
                <div className="mb-4">
                  <h2 className="text-base font-medium text-foreground mb-4">Best matches</h2>
                </div>

                {/* Candidates grid */}
                <div className="grid grid-cols-2 gap-4">
                  {bestCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="bg-card border border-border/40 rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer group"
                    >
                      {/* Candidate header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <img 
                            src={candidate.image} 
                            alt={candidate.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-foreground mb-0.5 truncate">
                            {candidate.name}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{candidate.city}</span>
                            <span>•</span>
                            <span className="text-primary font-medium">{candidate.match} Match</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                        {candidate.description}
                      </p>

                      {/* Roles */}
                      <div className="flex flex-wrap gap-2">
                        {candidate.roles.map((role, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/50 rounded-lg text-xs"
                          >
                            <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-[10px] font-semibold text-primary">
                                {role.logo}
                              </span>
                            </div>
                            <span className="text-muted-foreground truncate">
                              {role.role}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {isChatCollapsed && (
                <button
                  onClick={() => setIsChatCollapsed(false)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200 z-10"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </ResizablePanel>

        {!isChatCollapsed && <ResizableHandle className="w-0 bg-transparent" />}

        {/* Right Panel - Chat */}
        {!isChatCollapsed && (
          <ResizablePanel defaultSize={35} minSize={30}>
            <div className="h-full flex flex-col" style={{ backgroundColor: '#FAF8F4' }}>
              <div className="flex flex-col h-full py-6 pr-8 pl-2.5 pb-8">
                {/* Chat Header */}
                <div className="flex gap-6 mb-12 flex-shrink-0 relative">
                  <button
                    onClick={() => setIsChatCollapsed(true)}
                    className="absolute right-0 top-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
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
                  <textarea
                    placeholder="Ask anything about the candidates..."
                    rows={3}
                    className="w-full bg-white rounded-2xl px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px] shadow-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 bottom-4 w-10 h-10 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors shadow-md"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default JobPeopleView;
