import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, ChevronRight, Sparkles, Check, X, ArrowDown, ArrowUp, ChevronRight as ChevronRightIcon, Building2, Briefcase, MapPin, Users, DollarSign, Clock, Pencil, Save, Search, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InviteDialog } from '@/components/InviteDialog';
import { PublishingPlatformsDialog } from '@/components/PublishingPlatformsDialog';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon-new.png';

const Job = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'pipeline'>('job');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [platformsDialogOpen, setPlatformsDialogOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [chatMode, setChatMode] = useState<'personal' | 'team'>('personal');
  const [showThinking, setShowThinking] = useState(true);
  const [showSecondThinking, setShowSecondThinking] = useState(false);
  const [showFirstMessage, setShowFirstMessage] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);
  const [showThirdThinking, setShowThirdThinking] = useState(false);
  const [showThirdMessage, setShowThirdMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestionRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [jobRoleOpen, setJobRoleOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Editable form data
  const [formData, setFormData] = useState({
    // Basic info
    title: 'Sales Development Manager',
    company: 'Stepapp',
    city: 'Warsaw',
    country: 'Poland',
    workType: 'hybrid' as 'hybrid' | 'remote' | 'office',
    
    // Salary
    salaryMin: '',
    salaryMax: '',
    currency: 'PLN',
    salaryPeriod: 'monthly' as 'monthly' | 'yearly' | 'hourly',
    
    // Employment types (checkboxes)
    employmentTypes: {
      permanent: true,
      b2b: false,
      contract: false,
      internship: false,
      freelance: false,
    },
    
    // Description sections
    description: 'We are seeking a Sales Development Manager with strong analytical and creative problem-solving skills to join our growing commercial team at Stepapp. You will be responsible for building, running, and continuously improving our sales development engine, ensuring predictable pipeline generation to support company growth.',
    languages: ['English', 'Polish'],
    skills: ['Sales Strategy', 'Team Management', 'CRM Systems', 'Data Analysis', 'Communication'],
    qualifications: ['Bachelor\'s degree in Business, Marketing, or related field', 'Proven track record of meeting sales targets'],
    responsibilities: ['Build and manage the sales development team', 'Create and optimize outbound sales processes'],
    requiredExperience: ['3+ years in sales', 'B2B SaaS experience', 'Team leadership'],
    preferredExperience: ['Startup experience', 'CRM expertise', 'Data analysis'],
    aboutUs: 'Stepapp is a fast-growing EdTech company revolutionizing how students learn and prepare for exams through gamification and AI-powered learning.',
  });
  const [savedFormData, setSavedFormData] = useState(formData);
  
  // Input states for adding new items
  const [newLanguage, setNewLanguage] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newRequiredExp, setNewRequiredExp] = useState('');
  const [newPreferredExp, setNewPreferredExp] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<{[key: string]: boolean}>({
    'suggestion1': true,
    'suggestion2': true,
    'suggestion3': true,
    'suggestion4': true,
  });
  const initialJobDescription = `Senior Product Designer

Job description

About us
We build workflow analytics tools that help product teams spot friction points in minutes
[AI_SUGGESTION:suggestion1]with a focus on real-time collaboration and data visualization[/AI_SUGGESTION]

Role overview
We need a senior product designer to own complex feature work from research to polished UI for our core analytics platform in Stockholm. You will collaborate with product and engineering to ship user-centered solutions that move key metrics

Responsibilities
• Drive problem-framing and discovery research for new product initiatives.
• Translate insights into flows, wireframes, prototypes, and final visuals in Figma.
• Partnering on a daily with PMs and engineers for defining scope, milestones, and success metrics
[AI_SUGGESTION:suggestion2]• Lead design critiques and mentor junior designers[/AI_SUGGESTION]
• Maintain and evolve our cross-platform design system
[AI_SUGGESTION:suggestion3]• Conduct competitive analysis and stay updated on design trends[/AI_SUGGESTION]
• Instrument live experiments and iterate

Qualifications
[AI_SUGGESTION:suggestion4]• 5+ years of experience in product design with strong Figma proficiency
• Portfolio demonstrating end-to-end design solutions
• Experience with user research methodologies and A/B testing[/AI_SUGGESTION]`;
  
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const [publishedJobDescription, setPublishedJobDescription] = useState(initialJobDescription);
  const isPublished = jobDescription === publishedJobDescription;

  const handlePublish = () => {
    setPublishedJobDescription(jobDescription);
  };

  React.useEffect(() => {
    // First thinking for 3 seconds
    const timer1 = setTimeout(() => {
      setShowThinking(false);
      setShowFirstMessage(true);
    }, 3000);

    // Second thinking starts after first message
    const timer2 = setTimeout(() => {
      setShowSecondThinking(true);
    }, 3000);

    // Second thinking ends and show second message
    const timer3 = setTimeout(() => {
      setShowSecondThinking(false);
      setShowSecondMessage(true);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [showThinking, showFirstMessage, showSecondThinking, showSecondMessage, showThirdThinking, showThirdMessage]);

  const scrollToSuggestion = (suggestionId: string) => {
    suggestionRefs.current[suggestionId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const activeSuggestions = Object.entries(aiSuggestions).filter(([_, isActive]) => isActive);
  const totalSuggestions = Object.keys(aiSuggestions).length;
  const appliedCount = totalSuggestions - activeSuggestions.length;

  const navigateToNextSuggestion = () => {
    if (activeSuggestions.length === 0) return;
    const nextIndex = (currentSuggestionIndex + 1) % activeSuggestions.length;
    setCurrentSuggestionIndex(nextIndex);
    scrollToSuggestion(activeSuggestions[nextIndex][0]);
  };

  const navigateToPrevSuggestion = () => {
    if (activeSuggestions.length === 0) return;
    const prevIndex = currentSuggestionIndex === 0 ? activeSuggestions.length - 1 : currentSuggestionIndex - 1;
    setCurrentSuggestionIndex(prevIndex);
    scrollToSuggestion(activeSuggestions[prevIndex][0]);
  };

  const handleFindCandidates = () => {
    setShowThirdThinking(true);
    
    // After 2 seconds, show the question message
    setTimeout(() => {
      setShowThirdThinking(false);
      setShowThirdMessage(true);
    }, 2000);
  };

  const handleApproveSuggestion = (suggestionId: string) => {
    // Remove the AI suggestion markup from the job description (with multiline support)
    const regex = new RegExp(`\\[AI_SUGGESTION:${suggestionId}\\]([\\s\\S]*?)\\[\\/AI_SUGGESTION\\]`, 'g');
    setJobDescription(prev => prev.replace(regex, '$1'));
    setAiSuggestions(prev => ({ ...prev, [suggestionId]: false }));
  };

  const handleRejectSuggestion = (suggestionId: string) => {
    // Remove the entire AI suggestion including the text (with multiline support)
    const regex = new RegExp(`\\[AI_SUGGESTION:${suggestionId}\\][\\s\\S]*?\\[\\/AI_SUGGESTION\\]`, 'g');
    setJobDescription(prev => prev.replace(regex, ''));
    setAiSuggestions(prev => ({ ...prev, [suggestionId]: false }));
  };

  const formatJobDescription = (text: string) => {
    const lines = text.split('\n');
    const result: JSX.Element[] = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      const trimmedLine = line.trim();
      const isSectionTitle = ['Senior Product Designer', 'Job description', 'About us', 'Role overview', 'Responsibilities', 'Qualifications'].includes(trimmedLine);
      
      // Check for AI suggestion opening tag
      const suggestionStartMatch = line.match(/\[AI_SUGGESTION:(\w+)\]/);
      
      if (suggestionStartMatch) {
        const suggestionId = suggestionStartMatch[1];
        
        if (aiSuggestions[suggestionId]) {
          // Extract text after the opening tag
          let suggestionText = line.substring(line.indexOf(']') + 1);
          
          // If closing tag is on the same line, remove it
          if (suggestionText.includes('[/AI_SUGGESTION]')) {
            suggestionText = suggestionText.replace('[/AI_SUGGESTION]', '').trim();
          } else {
            // Multi-line suggestion - collect remaining lines
            const textParts = [suggestionText];
            i++;
            while (i < lines.length && !lines[i].includes('[/AI_SUGGESTION]')) {
              textParts.push(lines[i]);
              i++;
            }
            // Add the last line before closing tag
            if (i < lines.length) {
              const lastLine = lines[i].replace('[/AI_SUGGESTION]', '').trim();
              if (lastLine) {
                textParts.push(lastLine);
              }
            }
            suggestionText = textParts.join('\n').trim();
          }
          
          result.push(
            <div 
              key={`suggestion-${suggestionId}-${result.length}`} 
              className="mb-1 flex items-start gap-2 group"
              ref={(el) => suggestionRefs.current[suggestionId] = el}
            >
              <div className="flex-1 whitespace-pre-wrap">
                <span className="font-semibold inline-flex items-start gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-500 inline mt-1 flex-shrink-0" />
                  <span>{suggestionText}</span>
                </span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button
                  onClick={() => handleApproveSuggestion(suggestionId)}
                  className="p-1 rounded hover:bg-green-100 transition-colors"
                  title="Approve"
                >
                  <Check className="w-4 h-4 text-green-600" />
                </button>
                <button
                  onClick={() => handleRejectSuggestion(suggestionId)}
                  className="p-1 rounded hover:bg-red-100 transition-colors"
                  title="Reject"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          );
          i++;
          continue;
        } else {
          // Skip hidden suggestions
          if (!line.includes('[/AI_SUGGESTION]')) {
            i++;
            while (i < lines.length && !lines[i].includes('[/AI_SUGGESTION]')) {
              i++;
            }
          }
          i++;
          continue;
        }
      }
      
      // Regular line (skip if it's just a closing tag)
      if (!line.includes('[/AI_SUGGESTION]')) {
        result.push(
          <div key={`line-${i}`} className={isSectionTitle ? 'text-xl font-semibold mb-2 mt-4' : 'mb-1'}>
            {line || '\u00A0'}
          </div>
        );
      }
      i++;
    }
    
    return result;
  };

  const [messages] = useState([
    { text: 'Find me a senior product designer based in Stockholm.', isUser: true },
    { text: 'Okay! How much experience should the candidates have?', isUser: false },
    { text: '5+ years', isUser: true },
    { text: 'For sure! Is there anything else I should keep in mind?', isUser: false },
    { text: 'They should have strong Figma skills', isUser: true }
  ]);

  const jobs = [
    { id: 1, title: 'Senior Product Designer' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden" style={{ backgroundColor: '#F5F4F1' }}>
      {/* Header */}
      <header className="h-[54px] flex items-center justify-between px-5 flex-shrink-0 relative" style={{ backgroundColor: '#F2F1ED', borderBottom: '1px solid #D9D9D9' }}>
        {/* Left side - Back button and Job title */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/job/people/view')}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: '#E8E6DD' }}
          >
            <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Job title and company - inline */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ backgroundColor: '#E8E6DD' }}>
            <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded-md" />
            <span className="font-medium text-sm" style={{ color: '#333333' }}>BD Representative / Sales Manager</span>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: '#333333' }} />
          </div>
        </div>

        {/* Center - Navigation Tabs */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-0.5 px-0.5 h-7 rounded-md" style={{ backgroundColor: '#E8E6DD' }}>
          <button
            onClick={() => navigate('/job/people/view')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all"
            style={{ color: '#333333' }}
          >
            Job
          </button>
          <button
            onClick={() => navigate('/job/best-matches')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all"
            style={{ color: '#333333' }}
          >
            Review (50)
          </button>
          <button
            onClick={() => navigate('/job/pipeline')}
            className="px-3 h-[22px] rounded text-xs font-medium transition-all"
            style={{ color: '#333333' }}
          >
            Pipeline
          </button>
        </div>

        {/* Right side - Chat Toggle and Profile */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsChatCollapsed(!isChatCollapsed)}
            className="w-7 h-7 rounded-md flex items-center justify-center transition-all hover:opacity-80"
            style={{ backgroundColor: '#E8E6DD' }}
            title={isChatCollapsed ? "Open AI Chat" : "Close AI Chat"}
          >
            <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3v18" />
            </svg>
          </button>
          <img 
            src={userAvatarImage} 
            alt="Profile" 
            className="w-7 h-7 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
      </header>

      {/* Main Content - Flex layout without resizable */}
      <div className="flex-1 flex overflow-hidden pt-6 pb-[19px]" style={{ backgroundColor: '#FBFAF9' }}>
        {/* Left Panel - Job Description Editor */}
        <div className={`flex-1 ${isChatCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`h-full flex flex-col relative ${isChatCollapsed ? 'w-full max-w-[1200px]' : 'w-full'}`}>
            <div className={`flex-1 overflow-y-auto rounded-xl relative scrollbar-hide ${isChatCollapsed ? 'mx-6' : 'ml-4 mr-4'}`} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}>
              <div className="px-[72px] py-12 pb-24">
                
                {/* Title Input */}
                <div className="mb-6">
                  {isEditMode ? (
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="text-2xl font-medium border-[#CD785C] focus-visible:ring-[#CD785C] h-auto py-3"
                      style={{ fontFamily: 'CooperLight, sans-serif' }}
                      placeholder="Job Title"
                    />
                  ) : (
                    <h1 className="text-2xl font-medium" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>
                      {formData.title}
                    </h1>
                  )}
                </div>

                {/* Company Information Accordion */}
                <Collapsible open={companyOpen} onOpenChange={setCompanyOpen} className="mb-6">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Company Information</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {!companyOpen && (
                      <div className="flex flex-wrap gap-2 mt-3 text-sm">
                        <span className="px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                          <Building2 className="w-3.5 h-3.5" />
                          {formData.company}
                        </span>
                        <span className="px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                          <Users className="w-3.5 h-3.5" />
                          50-200 employees
                        </span>
                        <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>EdTech</span>
                        <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>B2B</span>
                      </div>
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Company Name</label>
                          {isEditMode ? (
                            <Input
                              value={formData.company}
                              onChange={(e) => setFormData({...formData, company: e.target.value})}
                              className="border-[#CD785C] focus-visible:ring-[#CD785C]"
                            />
                          ) : (
                            <p className="text-foreground">{formData.company}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground mb-1 block">Employee Count</label>
                          <p className="text-foreground">50-200 employees</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">What we do</label>
                        <p className="text-foreground">Revolutionizing how students learn through gamification and AI-powered learning</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-1 block">Company Tags</label>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>Private Company</span>
                          <span className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>B2B Sales</span>
                          <span className="px-3 py-1.5 rounded-full text-sm" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>EdTech</span>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Job Role Details Accordion */}
                <Collapsible open={jobRoleOpen} onOpenChange={setJobRoleOpen} className="mb-8">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-muted-foreground" />
                        <span className="font-medium" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Job Role Details</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${jobRoleOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {!jobRoleOpen && (
                      <div className="flex flex-wrap gap-2 mt-3 text-sm">
                        <span className="px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                          <MapPin className="w-3.5 h-3.5" />
                          {formData.city}, {formData.country}
                        </span>
                        <span className="px-3 py-1.5 rounded-full text-white capitalize" style={{ backgroundColor: '#333333' }}>{formData.workType}</span>
                        {formData.salaryMin && formData.salaryMax && (
                          <span className="px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                            <DollarSign className="w-3.5 h-3.5" />
                            {formData.salaryMin} - {formData.salaryMax} {formData.currency}
                          </span>
                        )}
                        {Object.entries(formData.employmentTypes)
                          .filter(([_, checked]) => checked)
                          .map(([type]) => (
                            <span key={type} className="px-3 py-1.5 rounded-full capitalize" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                              {type === 'b2b' ? 'B2B' : type}
                            </span>
                          ))}
                      </div>
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pt-4 space-y-4">
                      {/* Location Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        {isEditMode ? (
                          <>
                            <Input
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                              className="w-32 border-[#CD785C] focus-visible:ring-[#CD785C]"
                              placeholder="City"
                              style={{ backgroundColor: '#F5F4F1' }}
                            />
                            <Input
                              value={formData.country}
                              onChange={(e) => setFormData({...formData, country: e.target.value})}
                              className="w-32 border-[#CD785C] focus-visible:ring-[#CD785C]"
                              placeholder="Country"
                              style={{ backgroundColor: '#F5F4F1' }}
                            />
                            <Select 
                              value={formData.workType} 
                              onValueChange={(value: 'hybrid' | 'remote' | 'office') => setFormData({...formData, workType: value})}
                            >
                              <SelectTrigger className="w-32" style={{ backgroundColor: '#333333', color: 'white' }}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="remote">Remote</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                              </SelectContent>
                            </Select>
                          </>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2 text-sm">
                            <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>{formData.city}, {formData.country}</span>
                            <span className="px-3 py-1.5 rounded-full text-white capitalize" style={{ backgroundColor: '#333333' }}>{formData.workType}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Salary Row */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm text-muted-foreground w-12">Salary</span>
                        {isEditMode ? (
                          <>
                            <Input
                              value={formData.salaryMin}
                              onChange={(e) => setFormData({...formData, salaryMin: e.target.value})}
                              className="w-28 border-[#CD785C] focus-visible:ring-[#CD785C]"
                              placeholder="Min"
                              style={{ backgroundColor: '#F5F4F1' }}
                            />
                            <span className="text-muted-foreground">-</span>
                            <Input
                              value={formData.salaryMax}
                              onChange={(e) => setFormData({...formData, salaryMax: e.target.value})}
                              className="w-28 border-[#CD785C] focus-visible:ring-[#CD785C]"
                              placeholder="Max"
                              style={{ backgroundColor: '#F5F4F1' }}
                            />
                            <Input
                              value={formData.currency}
                              onChange={(e) => setFormData({...formData, currency: e.target.value})}
                              className="w-20 text-center"
                              placeholder="PLN"
                              style={{ backgroundColor: '#333333', color: 'white' }}
                            />
                            <span className="text-muted-foreground">/</span>
                            <Select 
                              value={formData.salaryPeriod} 
                              onValueChange={(value: 'monthly' | 'yearly' | 'hourly') => setFormData({...formData, salaryPeriod: value})}
                            >
                              <SelectTrigger className="w-28" style={{ backgroundColor: '#333333', color: 'white' }}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                                <SelectItem value="hourly">Hourly</SelectItem>
                              </SelectContent>
                            </Select>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-sm">
                            {formData.salaryMin || formData.salaryMax ? (
                              <span className="px-3 py-1.5 rounded-full" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                                {formData.salaryMin && formData.salaryMax
                                  ? `${formData.salaryMin} - ${formData.salaryMax} ${formData.currency} / ${formData.salaryPeriod}`
                                  : formData.salaryMin || formData.salaryMax} {formData.currency} / {formData.salaryPeriod}
                              </span>
                            ) : (
                              <span className="text-muted-foreground italic">Not specified</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Employment Type */}
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="text-sm text-muted-foreground w-12">Type</span>
                        {isEditMode ? (
                          <>
                            {(['permanent', 'b2b', 'contract', 'internship', 'freelance'] as const).map((type) => (
                              <label key={type} className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={formData.employmentTypes[type]}
                                  onCheckedChange={(checked) => setFormData({
                                    ...formData, 
                                    employmentTypes: {...formData.employmentTypes, [type]: !!checked}
                                  })}
                                  className="border-[#CD785C] data-[state=checked]:bg-[#CD785C] data-[state=checked]:border-[#CD785C]"
                                />
                                <span className="text-sm capitalize">{type === 'b2b' ? 'B2B' : type}</span>
                              </label>
                            ))}
                          </>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(formData.employmentTypes)
                              .filter(([_, checked]) => checked)
                              .map(([type]) => (
                                <span key={type} className="px-3 py-1.5 rounded-full text-sm capitalize" style={{ backgroundColor: '#EDE9E1', color: '#302C24' }}>
                                  {type === 'b2b' ? 'B2B' : type}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>


                {/* Job Description Content - Only visible when Job Role accordion is expanded */}
                {jobRoleOpen && (
                  <>
                    {/* Description */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Description</h2>
                      {isEditMode ? (
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          className="min-h-[120px] border-[#CD785C] focus-visible:ring-[#CD785C]"
                        />
                      ) : (
                        <p className="text-foreground leading-relaxed">{formData.description}</p>
                      )}
                    </div>

                    {/* Languages (Tags) */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Languages</h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.languages.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-full border border-border text-sm flex items-center gap-2">
                            {tag}
                            {isEditMode && (
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  languages: formData.languages.filter((_, i) => i !== idx)
                                })}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                      {isEditMode && (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newLanguage.trim()) {
                                setFormData({...formData, languages: [...formData.languages, newLanguage.trim()]});
                                setNewLanguage('');
                              }
                            }}
                            className="flex-1 border-[#CD785C] focus-visible:ring-[#CD785C]"
                            placeholder="Add language..."
                          />
                          <button
                            onClick={() => {
                              if (newLanguage.trim()) {
                                setFormData({...formData, languages: [...formData.languages, newLanguage.trim()]});
                                setNewLanguage('');
                              }
                            }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Skills (Tags) */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Skills</h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.skills.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-full border border-border text-sm flex items-center gap-2">
                            {tag}
                            {isEditMode && (
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  skills: formData.skills.filter((_, i) => i !== idx)
                                })}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                      {isEditMode && (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newSkill.trim()) {
                                setFormData({...formData, skills: [...formData.skills, newSkill.trim()]});
                                setNewSkill('');
                              }
                            }}
                            className="flex-1 border-[#CD785C] focus-visible:ring-[#CD785C]"
                            placeholder="Add skill..."
                          />
                          <button
                            onClick={() => {
                              if (newSkill.trim()) {
                                setFormData({...formData, skills: [...formData.skills, newSkill.trim()]});
                                setNewSkill('');
                              }
                            }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Qualifications */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Qualifications</h2>
                      <ul className="space-y-2 mb-3">
                        {formData.qualifications.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                            <span className="text-foreground">{item}</span>
                            {isEditMode && (
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  qualifications: formData.qualifications.filter((_, i) => i !== idx)
                                })}
                                className="text-muted-foreground hover:text-destructive ml-auto"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {isEditMode && (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newQualification}
                            onChange={(e) => setNewQualification(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newQualification.trim()) {
                                setFormData({...formData, qualifications: [...formData.qualifications, newQualification.trim()]});
                                setNewQualification('');
                              }
                            }}
                            className="flex-1 border-[#CD785C] focus-visible:ring-[#CD785C]"
                            placeholder="Add qualification..."
                          />
                          <button
                            onClick={() => {
                              if (newQualification.trim()) {
                                setFormData({...formData, qualifications: [...formData.qualifications, newQualification.trim()]});
                                setNewQualification('');
                              }
                            }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Responsibilities</h2>
                      <ul className="space-y-2 mb-3">
                        {formData.responsibilities.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-foreground flex-shrink-0" />
                            <span className="text-foreground">{item}</span>
                            {isEditMode && (
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  responsibilities: formData.responsibilities.filter((_, i) => i !== idx)
                                })}
                                className="text-muted-foreground hover:text-destructive ml-auto"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {isEditMode && (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newResponsibility}
                            onChange={(e) => setNewResponsibility(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newResponsibility.trim()) {
                                setFormData({...formData, responsibilities: [...formData.responsibilities, newResponsibility.trim()]});
                                setNewResponsibility('');
                              }
                            }}
                            className="flex-1 border-[#CD785C] focus-visible:ring-[#CD785C]"
                            placeholder="Add responsibility..."
                          />
                          <button
                            onClick={() => {
                              if (newResponsibility.trim()) {
                                setFormData({...formData, responsibilities: [...formData.responsibilities, newResponsibility.trim()]});
                                setNewResponsibility('');
                              }
                            }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Required Experience (Tags) */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Required Experience</h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.requiredExperience.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-full border border-border text-sm flex items-center gap-2">
                            {tag}
                            {isEditMode && (
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  requiredExperience: formData.requiredExperience.filter((_, i) => i !== idx)
                                })}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                      {isEditMode && (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newRequiredExp}
                            onChange={(e) => setNewRequiredExp(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newRequiredExp.trim()) {
                                setFormData({...formData, requiredExperience: [...formData.requiredExperience, newRequiredExp.trim()]});
                                setNewRequiredExp('');
                              }
                            }}
                            className="flex-1 border-[#CD785C] focus-visible:ring-[#CD785C]"
                            placeholder="Add required experience..."
                          />
                          <button
                            onClick={() => {
                              if (newRequiredExp.trim()) {
                                setFormData({...formData, requiredExperience: [...formData.requiredExperience, newRequiredExp.trim()]});
                                setNewRequiredExp('');
                              }
                            }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Preferred Experience (Tags) */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>Preferred Experience</h2>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.preferredExperience.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-full border border-border text-sm flex items-center gap-2">
                            {tag}
                            {isEditMode && (
                              <button
                                onClick={() => setFormData({
                                  ...formData,
                                  preferredExperience: formData.preferredExperience.filter((_, i) => i !== idx)
                                })}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </span>
                        ))}
                      </div>
                      {isEditMode && (
                        <div className="flex items-center gap-2">
                          <Input
                            value={newPreferredExp}
                            onChange={(e) => setNewPreferredExp(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && newPreferredExp.trim()) {
                                setFormData({...formData, preferredExperience: [...formData.preferredExperience, newPreferredExp.trim()]});
                                setNewPreferredExp('');
                              }
                            }}
                            className="flex-1 border-[#CD785C] focus-visible:ring-[#CD785C]"
                            placeholder="Add preferred experience..."
                          />
                          <button
                            onClick={() => {
                              if (newPreferredExp.trim()) {
                                setFormData({...formData, preferredExperience: [...formData.preferredExperience, newPreferredExp.trim()]});
                                setNewPreferredExp('');
                              }
                            }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* About Us */}
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333' }}>About Us</h2>
                      {isEditMode ? (
                        <Textarea
                          value={formData.aboutUs}
                          onChange={(e) => setFormData({...formData, aboutUs: e.target.value})}
                          className="min-h-[100px] border-[#CD785C] focus-visible:ring-[#CD785C]"
                        />
                      ) : (
                        <p className="text-foreground leading-relaxed">{formData.aboutUs}</p>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Floating Action Bar - Fixed at bottom of viewport */}
        <div className="fixed bottom-[6%] left-1/2 transform -translate-x-1/2 z-50" style={{ marginLeft: isChatCollapsed ? '0' : '-190px' }}>
          <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-2 py-2 border border-[#E6E6E6]">
            {!isEditMode ? (
              <>
                <button
                  onClick={() => {
                    setIsEditMode(true);
                    setSavedFormData(formData);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-muted"
                  style={{ color: '#333333' }}
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => navigate('/job/people/view')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#CD785C' }}
                >
                  <Search className="w-4 h-4" />
                  Start sourcing
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setFormData(savedFormData);
                    setIsEditMode(false);
                  }}
                  className="px-5 py-2.5 rounded-full text-sm font-medium transition-colors hover:bg-muted"
                  style={{ color: '#333333' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSavedFormData(formData);
                    setIsEditMode(false);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#CD785C' }}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Chat - Fixed width */}
        {!isChatCollapsed && (
          <div
            className="w-[380px] flex-shrink-0 h-full pr-4"
            style={{ backgroundColor: '#FBFAF9' }}
          >
            <div className="h-full flex flex-col">
              <div className="flex flex-col h-full pl-0">

              {/* Chat Messages - Scrollable */}
              <div className="flex-1 overflow-y-auto mb-6 space-y-4 scrollbar-hide">
                {chatMode === 'personal' ? (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[90%] text-[0.875rem] leading-relaxed ${
                            message.isUser
                              ? 'bg-white shadow-sm text-foreground px-5 py-3 rounded-2xl'
                              : 'text-foreground px-5 py-3'
                          }`}
                        >
                          {message.text}
                        </div>
                      </div>
                    ))}
                
                    {/* Thinking indicator */}
                    {showThinking && (
                      <div className="flex justify-start">
                        <div className="bg-transparent text-foreground px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* First message with job block */}
                    {showFirstMessage && (
                      <div className="flex justify-start">
                        <div className="text-foreground text-[0.875rem]">
                          <div className="px-5 py-3">
                            I've captured the criteria for creating a perfect job description and created the position
                          </div>
                          <div className="mt-3 ml-5 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
                            <img src={jobDropdownIcon} alt="Job" className="w-8 h-8 rounded" />
                            <span className="font-medium text-gray-700">Senior product designer</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Second thinking indicator */}
                    {showSecondThinking && (
                      <div className="flex justify-start">
                        <div className="bg-transparent text-foreground px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Second message with button */}
                    {showSecondMessage && !showThirdThinking && !showThirdMessage && (
                      <div className="flex justify-start">
                        <div className="text-foreground text-[0.875rem]">
                          <div className="px-5 py-3">
                            Thank you for the information, I've created the job description and applied your requirements. You can further refine or start matching candidates directly.
                          </div>
                          <button 
                            onClick={handleFindCandidates}
                            className="mt-3 ml-5 px-4 py-2 bg-[rgba(21,52,61,1)] text-white rounded-lg hover:bg-[rgba(21,52,61,0.9)] transition-colors text-sm font-medium"
                          >
                            Find matching candidates
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Third thinking indicator */}
                    {showThirdThinking && (
                      <div className="flex justify-start">
                        <div className="bg-transparent text-foreground px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-sm">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Third message with job board options */}
                    {showThirdMessage && (
                      <div className="flex justify-start">
                        <div className="text-foreground text-[0.875rem]">
                          <div className="px-5 py-3">
                            Do you want me to publish the Job description on 20+ different job boards or just find candidates online?
                          </div>
                          <div className="mt-3 ml-5 flex flex-col gap-2">
                            <button 
                              className="px-4 py-2 bg-[rgba(21,52,61,1)] text-white rounded-lg hover:bg-[rgba(21,52,61,0.9)] transition-colors text-sm font-medium"
                            >
                              Publish job offer and find candidates
                            </button>
                            <button 
                              onClick={() => navigate('/job/people')}
                              className="px-4 py-2 bg-white text-[rgba(21,52,61,1)] border border-[rgba(21,52,61,1)] rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                              Find candidates without job offer
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Team Chat View */}
                    <div className="space-y-6">
                      {/* Team Member 1 - Sarah */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                            SM
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">Sarah Miller</span>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <div className="bg-white shadow-sm text-foreground px-6 py-4 rounded-lg ml-8">
                          Find frontend developers with React experience in Berlin
                        </div>
                        <div className="text-foreground px-6 py-4 ml-8">
                          I've found 45 candidates matching your criteria. Here are the top matches with strong React portfolios and Berlin location.
                        </div>
                      </div>

                      {/* Team Member 2 - Mike */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                            MC
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">Mike Chen</span>
                          <span className="text-xs text-muted-foreground">5h ago</span>
                        </div>
                        <div className="bg-white shadow-sm text-foreground px-6 py-4 rounded-lg ml-8">
                          Update the UX Designer job description to include Figma as a requirement
                        </div>
                        <div className="text-foreground px-6 py-4 ml-8">
                          I've updated the job description. Figma proficiency is now listed as a core requirement in the qualifications section.
                        </div>
                      </div>

                      {/* Team Member 3 - Alex */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2">
                          <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-medium">
                            AR
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">Alex Rivera</span>
                          <span className="text-xs text-muted-foreground">1d ago</span>
                        </div>
                        <div className="bg-white shadow-sm text-foreground px-6 py-4 rounded-lg ml-8">
                          Show me analytics for the Marketing Manager position
                        </div>
                        <div className="text-foreground px-6 py-4 ml-8">
                          The Marketing Manager position has received 156 applications over the past 2 weeks, with 23 qualified candidates shortlisted for interviews.
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input - Fixed at bottom */}
              <form className="relative flex-shrink-0">
                <textarea
                  placeholder="Ask anything about this job description..."
                  rows={3}
                  className="w-full bg-white rounded-2xl px-6 pt-5 pb-12 pr-14 text-[0.875rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none min-h-[100px] border border-border"
                />
                {/* Submit button */}
                <button
                  type="submit"
                  className="absolute right-3 bottom-3 w-7 h-7 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        )}
      </div>

      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
      <PublishingPlatformsDialog open={platformsDialogOpen} onOpenChange={setPlatformsDialogOpen} />
    </div>
  );
};

export default Job;
