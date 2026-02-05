import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon-new.png';

const versions = [
  { id: 1, label: 'Version 1.0', date: 'Jan 15, 2025', active: true },
  { id: 2, label: 'Version 0.9', date: 'Jan 10, 2025', active: false },
  { id: 3, label: 'Version 0.8', date: 'Jan 5, 2025', active: false },
  { id: 4, label: 'Version 0.7', date: 'Dec 28, 2024', active: false },
  { id: 5, label: 'Version 0.6', date: 'Dec 20, 2024', active: false },
  { id: 6, label: 'Version 0.5', date: 'Dec 15, 2024', active: false },
  { id: 7, label: 'Version 0.4', date: 'Dec 10, 2024', active: false },
  { id: 8, label: 'Version 0.3', date: 'Dec 5, 2024', active: false },
];

const companyContext = {
  mission: "To revolutionize how businesses manage their pricing strategies through AI-powered insights and automation.",
  vision: "Become the leading global platform for intelligent pricing optimization across all industries.",
  values: "Innovation, Transparency, Customer Success, Data-Driven Decision Making, Continuous Learning.",
  sizeLocation: "50-100 employees, headquartered in San Francisco with remote teams across Europe and Asia.",
  productServices: "AI-powered pricing optimization platform, real-time market analysis, competitor price tracking, dynamic pricing recommendations.",
  leadership: "Founded by experienced entrepreneurs from Google and McKinsey. CEO has 15+ years in SaaS, CTO previously led AI teams at Amazon.",
  uniqueDifferentiators: "Proprietary ML algorithms with 95% accuracy, real-time competitor monitoring, seamless integration with major e-commerce platforms.",
  workingCulture: "Remote-first, async communication, quarterly in-person offsites, strong emphasis on work-life balance and continuous learning.",
  keyAchievements: "Series B funding of $45M, 500+ enterprise clients, 3x YoY revenue growth, Featured in Forbes 30 Under 30.",
};

const jobContext = {
  hiringPhilosophy: "We prioritize cultural fit and growth potential over perfect experience matches. Looking for self-starters who thrive in ambiguity.",
  cultureFitPreferences: "Collaborative team players who can work independently, strong communication skills, comfort with rapid iteration.",
  technicalChallenges: "Building scalable sales processes, navigating complex enterprise deals, managing multi-stakeholder relationships.",
  coreRequirements: "5+ years B2B sales experience, proven track record of exceeding quotas, experience with SaaS or tech products.",
  softRequirements: "MBA preferred but not required, experience in pricing or retail tech, multi-language capabilities.",
  redFlags: "Job hopping without clear progression, lack of quantifiable achievements, poor communication during interviews.",
  technicalSkills: "CRM proficiency (Salesforce, HubSpot), sales analytics tools, presentation software, basic understanding of APIs.",
  culturalFit: "Values transparency and direct feedback, comfortable with data-driven decision making, entrepreneurial mindset.",
  derivedSignals: "Look for candidates who ask insightful questions about our product, show genuine curiosity about pricing strategies.",
};

const JobBrain = () => {
  const navigate = useNavigate();
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);

  const [companyContextOpen, setCompanyContextOpen] = useState(true);
  const [jobContextOpen, setJobContextOpen] = useState(true);

  const jobs = [
    { id: 1, title: 'BD Representative / Sales Manager' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' },
  ];

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
              {/* Left Panel - Versions */}
              <div className="w-56 bg-white border border-[#EEEDEC] rounded-xl flex flex-col flex-shrink-0">
                <div className="p-4 border-b border-[#EEEDEC]">
                  <h2 className="text-sm font-semibold text-gray-900">Versions</h2>
                </div>
                <ScrollArea className="flex-1">
                  <div className="p-2">
                    {versions.map(version => (
                      <button
                        key={version.id}
                        onClick={() => setSelectedVersion(version)}
                        className={`w-full text-left px-3 py-3 rounded-lg transition-colors mb-1 ${
                          selectedVersion.id === version.id
                            ? 'bg-[#FDF8F6] border border-[#E8D5CE]'
                            : 'hover:bg-[#FAFAF7]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-sm font-medium ${
                            selectedVersion.id === version.id ? 'text-[#CC785C]' : 'text-gray-900'
                          }`}>
                            {version.label}
                          </span>
                          {version.active && (
                            <span className="text-xs px-2 py-0.5 bg-[#E8F5E8] text-[#2E7D32] rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{version.date}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Right Panel - Context Accordions */}
              <div className="flex-1 bg-white border border-[#EEEDEC] rounded-xl overflow-hidden flex flex-col">
                {/* Panel Header */}
                <div className="p-5 border-b border-[#EEEDEC]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1.25rem', color: '#333333' }}>
                        {selectedVersion.label} - Brain Context
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{selectedVersion.date}</p>
                    </div>
                    {selectedVersion.active && (
                      <span className="text-xs px-3 py-1 bg-[#E8F5E8] text-[#2E7D32] rounded-full font-medium">
                        Active Version
                      </span>
                    )}
                  </div>
                </div>
                
                <ScrollArea className="flex-1">
                  <div className="p-5 space-y-6">
                    {/* Company Context Section */}
                    <Collapsible open={companyContextOpen} onOpenChange={setCompanyContextOpen}>
                      <CollapsibleTrigger className="w-full flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity">
                        {companyContextOpen ? (
                          <ChevronDown className="w-4 h-4" style={{ color: '#333333' }} />
                        ) : (
                          <ChevronRight className="w-4 h-4" style={{ color: '#333333' }} />
                        )}
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E8F5E8' }}>
                          <svg className="w-4 h-4" style={{ color: '#2E7D32' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#333333' }}>Company Context</h3>
                        <span className="text-xs text-[#999999] ml-auto">9 items</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <Accordion type="multiple" className="space-y-2 ml-7">
                          <AccordionItem value="mission" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Mission</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.mission}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="vision" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Vision</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.vision}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="values" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Values</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.values}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="sizeLocation" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Size & Location</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.sizeLocation}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="productServices" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Product & Services</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.productServices}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="leadership" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Leadership</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.leadership}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="uniqueDifferentiators" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Unique Differentiators</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.uniqueDifferentiators}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="workingCulture" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Working Culture</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.workingCulture}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="keyAchievements" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Key Achievements</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.keyAchievements}</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Job Context Section */}
                    <Collapsible open={jobContextOpen} onOpenChange={setJobContextOpen}>
                      <CollapsibleTrigger className="w-full flex items-center gap-3 mb-3 hover:opacity-80 transition-opacity">
                        {jobContextOpen ? (
                          <ChevronDown className="w-4 h-4" style={{ color: '#333333' }} />
                        ) : (
                          <ChevronRight className="w-4 h-4" style={{ color: '#333333' }} />
                        )}
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FDF8F6' }}>
                          <svg className="w-4 h-4" style={{ color: '#CC785C' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h3 className="text-sm font-medium" style={{ color: '#333333' }}>Job Context</h3>
                        <span className="text-xs text-[#999999] ml-auto">9 items</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <Accordion type="multiple" className="space-y-2 ml-7">
                          <AccordionItem value="hiringPhilosophy" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Hiring Philosophy</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.hiringPhilosophy}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="cultureFitPreferences" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Culture Fit Preferences</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.cultureFitPreferences}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="technicalChallenges" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Technical Challenges</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.technicalChallenges}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="coreRequirements" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Core Requirements</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.coreRequirements}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="softRequirements" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Soft Requirements</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.softRequirements}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="redFlags" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Red Flags</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.redFlags}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="technicalSkills" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Technical Skills</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.technicalSkills}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="culturalFit" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Cultural Fit</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.culturalFit}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="derivedSignals" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <span className="text-sm font-normal" style={{ color: '#333333' }}>Derived Signals</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.derivedSignals}</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CollapsibleContent>
                    </Collapsible>
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

export default JobBrain;
