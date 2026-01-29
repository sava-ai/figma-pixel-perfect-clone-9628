import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon.png';

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

  const jobs = [
    { id: 1, title: 'BD Representative / Sales Manager' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' },
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF9]">
      {/* Header */}
      <header className="bg-white border-b border-[#EEEDEC] px-6 py-4">
        <div className="max-w-[1260px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/job/people/view')} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <Popover open={jobsDropdownOpen} onOpenChange={setJobsDropdownOpen}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <img src={jobDropdownIcon} alt="Job" className="w-5 h-5" />
                  <span className="font-medium text-gray-900">BD Representative / Sales Manager</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2 bg-white border border-gray-200 shadow-lg rounded-xl z-50">
                {jobs.map(job => (
                  <button
                    key={job.id}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                    onClick={() => setJobsDropdownOpen(false)}
                  >
                    {job.title}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-3">
            <img src={userAvatarImage} alt="User" className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content - Centered Container */}
      <div className="max-w-[1260px] mx-auto p-6">
        <div className="flex gap-4 h-[calc(100vh-130px)]">
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
                        ? 'bg-violet-50 border border-violet-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        selectedVersion.id === version.id ? 'text-violet-700' : 'text-gray-900'
                      }`}>
                        {version.label}
                      </span>
                      {version.active && (
                        <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
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
          <div className="flex-1 bg-white border border-[#EEEDEC] rounded-xl overflow-y-auto p-6">
            {/* Company Context Section */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Company Context</h2>
              </div>

              <Accordion type="multiple" className="divide-y divide-[#EEEDEC]">
                <AccordionItem value="mission" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Mission</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.mission}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="vision" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Vision</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.vision}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="values" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Values</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.values}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sizeLocation" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Size & Location</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.sizeLocation}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="productServices" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Product & Services</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.productServices}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="leadership" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Leadership</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.leadership}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="uniqueDifferentiators" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Unique Differentiators</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.uniqueDifferentiators}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="workingCulture" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Working Culture</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.workingCulture}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keyAchievements" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Key Achievements</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {companyContext.keyAchievements}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Job Context Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Job Context</h2>
              </div>

              <Accordion type="multiple" className="divide-y divide-[#EEEDEC]">
                <AccordionItem value="hiringPhilosophy" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Hiring Philosophy</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.hiringPhilosophy}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cultureFitPreferences" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Culture Fit Preferences</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.cultureFitPreferences}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technicalChallenges" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Technical Challenges</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.technicalChallenges}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="coreRequirements" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Core Requirements</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.coreRequirements}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="softRequirements" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Soft Requirements</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.softRequirements}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="redFlags" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Red Flags</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.redFlags}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technicalSkills" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Technical Skills</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.technicalSkills}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="culturalFit" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Cultural Fit</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.culturalFit}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="derivedSignals" className="border-none">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="text-sm font-normal text-gray-900">Derived Signals</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 pb-4">
                    {jobContext.derivedSignals}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default JobBrain;
