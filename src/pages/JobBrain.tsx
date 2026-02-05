import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Target, Eye, Heart, MapPin, Package, Users, Sparkles, Briefcase, Trophy, Brain, UserCheck, Wrench, CheckCircle, FileText, AlertTriangle, Code, Compass, Lightbulb, ClipboardList, Star } from 'lucide-react';
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
  jobDescription: {
    title: "Business Development Representative / Sales Manager",
    company: "PriceMind",
    location: "Warsaw, Poland",
    salary: "12,000 - 18,000 PLN net/month + commission",
    contractType: "B2B / Employment Contract (UoP)",
    workType: "Hybrid (3 days office, 2 days remote)",
    description: "We are looking for a driven Business Development Representative / Sales Manager to join our team and help expand PriceMind's presence across the CEE region. You will work closely with our Founder and CEO to identify, engage, and convert enterprise clients seeking pricing optimization solutions.",
    languages: ["English (Fluent - required)", "Polish (Native)", "German (Nice to have)"],
    skills: ["B2B Sales", "Lead Generation", "CRM Management", "Sales Analytics", "Presentation Skills", "Negotiation", "Account Management"],
    qualifications: [
      "Bachelor's degree in Business, Marketing, or related field",
      "Strong understanding of B2B sales cycles",
      "Proven ability to work with C-level executives",
      "Data-driven approach to sales strategy",
    ],
    responsibilities: [
      "Identify and prioritize target companies and decision makers across CEE region",
      "Gather information on pricing needs and tools used by target companies",
      "Establish contact with decision makers and open sales opportunities",
      "Refine lead generation tools and sales messages alongside marketing team",
      "Implement mass lead generation campaigns",
      "Manage CRM and all internal/external stakeholder communications",
      "Collect client feedback and provide insights to teams",
    ],
    requiredExperience: [
      "1-3 years in a digital sales function",
      "Experience in large corporate B2B lead generation",
      "Experience with CRM and sales tools (Salesforce, HubSpot)",
      "Excellent communication skills in English",
      "Ability to work independently",
    ],
    preferredExperience: [
      "Proven track record selling to international/European clients",
      "Understanding of pricing tools and software",
      "Knowledge of distribution and manufacturing industries",
      "MBA or equivalent business education",
    ],
    aboutUs: "PriceMind is a trusted provider of pricing software services and IT solutions for pricing management. We support large companies across retail, distribution, and manufacturing sectors in optimizing their pricing processes and increasing profitability. Operating as a software integrator for Pricefx, we are now extending our partner network with three other SaaS pricing solution providers, focusing our sales activities on the CEE region. Join a lean, dynamic organization where initiative and taking responsibility are valued and rewarded.",
    tags: ["B2B Sales", "CEE Region", "SaaS", "Pricing Software"],
  },
  initialInformation: {
    hiringPhilosophy: {
      summary: "The hiring philosophy emphasizes finding candidates who are not only experienced in B2B sales but also possess strong collaborative skills, a proactive and adaptable mindset, and a genuine passion for helping businesses optimize their pricing strategies. There is a willingness to consider strong candidates with slightly less experience if they demonstrate exceptional problem-solving abilities, a drive to learn, and a cultural fit aligned with the company's mission to empower clients rather than just sell to them.",
      points: [
        "Cultural fit and growth potential valued over perfect experience matches",
        "Self-starters who thrive in ambiguity and adapt to fast-paced environments",
        "Candidates who demonstrate initiative and take ownership of their work",
        "Intellectual curiosity and a track record of learning quickly",
      ],
    },
    cultureFitPreferences: [
      "Collaborative team dynamic that emphasizes working closely with leadership while maintaining autonomy",
      "Mindset and approach that ensures the sales person is seen as a trusted advisor, contributing to client success rather than just closing deals",
      "Proactivity and a 'get things done' mindset, taking initiative to drive tasks to completion without constant supervision",
      "Comfort with rapid iteration and ability to adapt strategies based on market feedback",
      "Strong communication skills for managing multi-stakeholder relationships",
    ],
    technicalChallenges: [
      "Building scalable sales processes for the CEE region with varying market maturity",
      "Navigating complex enterprise sales cycles with multiple decision makers",
      "Understanding and articulating technical pricing software benefits to non-technical buyers",
      "Managing relationships across different cultural contexts in CEE markets",
      "Balancing lead generation volume with quality of enterprise prospects",
    ],
  },
  coreRequirements: "5+ years B2B sales experience, proven track record of exceeding quotas, experience with SaaS or tech products.",
  softRequirements: "MBA preferred but not required, experience in pricing or retail tech, multi-language capabilities.",
  redFlags: [
    "Job hopping without clear progression or explanation",
    "Lack of quantifiable achievements in previous roles",
    "Poor communication or unprepared during interviews",
    "No research done about PriceMind or the pricing industry",
    "Inability to articulate past successes with specific metrics",
  ],
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
                        <span className="text-xs text-[#999999] ml-auto">7 items</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <Accordion type="multiple" className="space-y-2 ml-7">
                          <AccordionItem value="missionVisionValues" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Target className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Mission, Vision & Values</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <div className="space-y-4 pt-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Target className="w-3 h-3" style={{ color: '#666663' }} />
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Mission</span>
                                  </div>
                                  <p className="text-sm pl-5" style={{ color: '#666663' }}>{companyContext.mission}</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Eye className="w-3 h-3" style={{ color: '#666663' }} />
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Vision</span>
                                  </div>
                                  <p className="text-sm pl-5" style={{ color: '#666663' }}>{companyContext.vision}</p>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <Heart className="w-3 h-3" style={{ color: '#666663' }} />
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Values</span>
                                  </div>
                                  <p className="text-sm pl-5" style={{ color: '#666663' }}>{companyContext.values}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="sizeLocation" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Size & Location</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.sizeLocation}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="productServices" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Package className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Product & Services</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.productServices}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="leadership" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Leadership</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.leadership}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="uniqueDifferentiators" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Unique Differentiators</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.uniqueDifferentiators}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="workingCulture" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Working Culture</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{companyContext.workingCulture}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="keyAchievements" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4" style={{ color: '#2E7D32' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Key Achievements</span>
                              </div>
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
                        <span className="text-xs text-[#999999] ml-auto">7 items</span>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <Accordion type="multiple" className="space-y-2 ml-7">
                          {/* Job Description - First */}
                          <AccordionItem value="jobDescription" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <ClipboardList className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Job Description</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <div className="space-y-4 pt-3">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Title</span>
                                    <p className="text-sm" style={{ color: '#666663' }}>{jobContext.jobDescription.title}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Company</span>
                                    <p className="text-sm" style={{ color: '#666663' }}>{jobContext.jobDescription.company}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Location</span>
                                    <p className="text-sm" style={{ color: '#666663' }}>{jobContext.jobDescription.location}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Work Type</span>
                                    <p className="text-sm" style={{ color: '#666663' }}>{jobContext.jobDescription.workType}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Contract Type</span>
                                    <p className="text-sm" style={{ color: '#666663' }}>{jobContext.jobDescription.contractType}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-medium" style={{ color: '#333333' }}>Salary</span>
                                    <p className="text-sm" style={{ color: '#666663' }}>{jobContext.jobDescription.salary}</p>
                                  </div>
                                </div>

                                {/* Description */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Description</span>
                                  <p className="text-sm mt-1" style={{ color: '#666663' }}>{jobContext.jobDescription.description}</p>
                                </div>

                                {/* Languages */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Languages</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {jobContext.jobDescription.languages.map((lang, index) => (
                                      <span key={index} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F0F0EB', color: '#666663' }}>{lang}</span>
                                    ))}
                                  </div>
                                </div>

                                {/* Skills */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Skills</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {jobContext.jobDescription.skills.map((skill, index) => (
                                      <span key={index} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#EBDBBC', color: '#262625' }}>{skill}</span>
                                    ))}
                                  </div>
                                </div>

                                {/* Qualifications */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Qualifications</span>
                                  <ul className="space-y-1 mt-1">
                                    {jobContext.jobDescription.qualifications.map((item, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 mt-1 shrink-0" style={{ color: '#CC785C' }} />
                                        <span className="text-sm" style={{ color: '#666663' }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Responsibilities */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Responsibilities</span>
                                  <ul className="space-y-1 mt-1">
                                    {jobContext.jobDescription.responsibilities.map((item, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 mt-1 shrink-0" style={{ color: '#CC785C' }} />
                                        <span className="text-sm" style={{ color: '#666663' }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Required Experience */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Required Experience</span>
                                  <ul className="space-y-1 mt-1">
                                    {jobContext.jobDescription.requiredExperience.map((item, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 mt-1 shrink-0" style={{ color: '#CC785C' }} />
                                        <span className="text-sm" style={{ color: '#666663' }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Preferred Experience */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Preferred Experience</span>
                                  <ul className="space-y-1 mt-1">
                                    {jobContext.jobDescription.preferredExperience.map((item, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <Star className="w-3 h-3 mt-1 shrink-0" style={{ color: '#999999' }} />
                                        <span className="text-sm" style={{ color: '#666663' }}>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* About Us */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>About Us</span>
                                  <p className="text-sm mt-1" style={{ color: '#666663' }}>{jobContext.jobDescription.aboutUs}</p>
                                </div>

                                {/* Tags */}
                                <div>
                                  <span className="text-xs font-medium" style={{ color: '#333333' }}>Tags</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {jobContext.jobDescription.tags.map((tag, index) => (
                                      <span key={index} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F0F0EB', color: '#666663' }}>{tag}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          {/* Initial Information - Analysis */}
                          <AccordionItem value="initialInformation" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Initial Information</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-4 pt-0 border-t border-[#EEEDEC]">
                              <div className="space-y-5 pt-4">
                                {/* Hiring Philosophy */}
                                <div>
                                  <p className="text-sm" style={{ color: '#666663' }}>
                                    <span className="font-semibold" style={{ color: '#333333' }}>Hiring Philosophy: </span>
                                    {jobContext.initialInformation.hiringPhilosophy.summary}
                                  </p>
                                  <ul className="mt-3 space-y-2">
                                    {jobContext.initialInformation.hiringPhilosophy.points.map((point, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="text-sm mt-0.5" style={{ color: '#666663' }}>•</span>
                                        <span className="text-sm" style={{ color: '#666663' }}>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Culture Fit Preferences */}
                                <div>
                                  <p className="text-sm font-semibold mb-2" style={{ color: '#333333' }}>Culture Fit Preferences:</p>
                                  <ul className="space-y-2">
                                    {jobContext.initialInformation.cultureFitPreferences.map((pref, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="text-sm mt-0.5" style={{ color: '#666663' }}>•</span>
                                        <span className="text-sm" style={{ color: '#666663' }}>{pref}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technical Challenges */}
                                <div>
                                  <p className="text-sm font-semibold mb-2" style={{ color: '#333333' }}>Technical Challenges:</p>
                                  <ul className="space-y-2">
                                    {jobContext.initialInformation.technicalChallenges.map((challenge, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <span className="text-sm mt-0.5" style={{ color: '#666663' }}>•</span>
                                        <span className="text-sm" style={{ color: '#666663' }}>{challenge}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="coreRequirements" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Core Requirements</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.coreRequirements}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="softRequirements" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Soft Requirements</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.softRequirements}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="redFlags" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" style={{ color: '#DC2626' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Red Flags</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <ul className="space-y-2 pt-3">
                                {jobContext.redFlags.map((flag, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <AlertTriangle className="w-3 h-3 mt-1 shrink-0" style={{ color: '#DC2626' }} />
                                    <span className="text-sm" style={{ color: '#DC2626' }}>{flag}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="technicalSkills" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Code className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Technical Skills</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.technicalSkills}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="culturalFit" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Compass className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Cultural Fit</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-3 pt-0 border-t border-[#EEEDEC]">
                              <p className="text-sm pt-3" style={{ color: '#666663' }}>{jobContext.culturalFit}</p>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="derivedSignals" className="border border-[#EEEDEC] rounded-lg bg-white overflow-hidden">
                            <AccordionTrigger className="py-3 px-4 hover:no-underline hover:bg-[#FAFAF7]">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="w-4 h-4" style={{ color: '#CC785C' }} />
                                <span className="text-sm font-normal" style={{ color: '#333333' }}>Derived Signals</span>
                              </div>
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
