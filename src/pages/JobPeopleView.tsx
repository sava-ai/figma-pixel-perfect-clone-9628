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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/job')}
            className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <img src={jobDropdownIcon} alt="Job" className="w-4 h-4" />
              <span className="text-sm font-medium text-foreground">Senior Product Designer</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => navigate('/job')}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
            >
              Job
            </button>
            <button
              onClick={() => navigate('/job/people')}
              className="px-4 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg"
            >
              People
            </button>
            <button className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50">
              Shortlist
            </button>
          </nav>

          <button className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-accent/50 transition-colors">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>

          <div className="w-8 h-8 rounded-xl overflow-hidden">
            <img src={userAvatarImage} alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Candidates View */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full overflow-y-auto bg-background">
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
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Chat */}
        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full flex flex-col bg-card/30">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="max-w-2xl mx-auto space-y-4">
                {/* System message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-card border border-border/40 rounded-xl p-4">
                      <p className="text-sm text-foreground">
                        I've found 100 candidates matching your criteria. The search covered external sources (LinkedIn, GitHub, Dribbble) and internal sources (Network, Applied). 
                        <br /><br />
                        The best matches are displayed based on their skills, experience, and cultural fit. You can review applicants and rejections in the summary cards above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="border-t border-border/40 p-4 bg-card/50">
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything about the candidates..."
                    className="flex-1 px-4 py-2.5 bg-background border border-border/40 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default JobPeopleView;
