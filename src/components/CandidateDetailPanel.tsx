import React, { useState } from 'react';
import { X, MoreHorizontal, Share2, Mail, MapPin, Briefcase, GraduationCap, Clock, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Award, Code, Building2, Globe, Heart, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import InitialsAvatar from '@/components/InitialsAvatar';
import CandidateFeedbackDialog from '@/components/CandidateFeedbackDialog';
interface CriteriaItem {
  icon: 'location' | 'briefcase' | 'graduation' | 'clock' | 'sparkles' | 'award' | 'code' | 'building' | 'globe' | 'heart' | 'users';
  label: string;
  status: 'full' | 'partial' | 'none' | 'unknown';
  required?: boolean;
}
interface CandidateRole {
  company: string;
  role: string;
}
interface CandidateEducation {
  school: string;
  degree: string;
  graduationDate: string;
}
interface Candidate {
  id: number;
  name: string;
  image: string;
  city: string;
  match: string;
  isNew?: boolean;
  description: string;
  roles: CandidateRole[];
  currentRoleIndex?: number;
  isOpenToWork?: boolean;
  engagementRate?: number;
  tags?: string[];
  education?: CandidateEducation;
  summary?: string;
  skillTags?: string[];
  coreCriteria?: CriteriaItem[];
  softSkills?: CriteriaItem[];
  linkedin?: string;
}
interface CandidateDetailPanelProps {
  candidate: Candidate | null;
  onClose: () => void;
  onNotAGoodFit?: () => void;
  onSaveToJob?: () => void;
  currentIndex?: number;
  totalCandidates?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}
const CandidateDetailPanel = ({
  candidate,
  onClose,
  onNotAGoodFit,
  onSaveToJob,
  currentIndex = 0,
  totalCandidates = 0,
  onPrevious,
  onNext
}: CandidateDetailPanelProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [criteriaStatuses, setCriteriaStatuses] = useState<Record<string, string>>({});
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackActionType, setFeedbackActionType] = useState<'not-a-good-fit' | 'save-to-job'>('not-a-good-fit');
  if (!candidate) return null;

  // Parse match score
  const [matchScore, matchTotal] = candidate.match.split('/').map(Number);
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'location':
        return MapPin;
      case 'briefcase':
        return Briefcase;
      case 'graduation':
        return GraduationCap;
      case 'clock':
        return Clock;
      case 'sparkles':
        return Sparkles;
      case 'award':
        return Award;
      case 'code':
        return Code;
      case 'building':
        return Building2;
      case 'globe':
        return Globe;
      case 'heart':
        return Heart;
      case 'users':
        return Users;
      default:
        return Briefcase;
    }
  };
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'full':
        return 'bg-[#E8F5E8] text-[#2D7A2D]';
      case 'partial':
        return 'bg-[#F5F5F5] text-[#666666]';
      case 'none':
        return 'bg-[#FDEAEA] text-[#D32F2F]';
      case 'unknown':
        return 'bg-[#F0F0F0] text-[#999999]';
      default:
        return 'bg-[#F5F5F5] text-[#666666]';
    }
  };
  const defaultCoreCriteria: CriteriaItem[] = candidate.coreCriteria || [{
    icon: 'location',
    label: `Located in ${candidate.city}`,
    status: 'full',
    required: true
  }, {
    icon: 'briefcase',
    label: 'Senior Product Designer',
    status: matchScore >= 9 ? 'full' : 'partial',
    required: true
  }, {
    icon: 'clock',
    label: '5+ Years of Design Experience',
    status: matchScore >= 10 ? 'full' : 'partial',
    required: true
  }, {
    icon: 'graduation',
    label: "Bachelor's Degree or Higher",
    status: 'full',
    required: false
  }];
  const defaultSoftSkills: CriteriaItem[] = candidate.softSkills || [{
    icon: 'sparkles',
    label: 'Fluent English',
    status: 'full',
    required: false
  }, {
    icon: 'sparkles',
    label: 'Team collaboration',
    status: 'unknown',
    required: false
  }, {
    icon: 'sparkles',
    label: 'Leadership experience',
    status: 'partial',
    required: false
  }];
  
  // Extended criteria for the dialog with reasoning - based on PriceMind BDR job requirements
  interface DialogCriteriaItem {
    icon: 'location' | 'briefcase' | 'graduation' | 'clock' | 'sparkles' | 'award' | 'code' | 'building' | 'globe' | 'heart' | 'users';
    label: string;
    status: 'full' | 'partial' | 'none' | 'unknown';
    required?: boolean;
    reasoning: string;
  }

  // Generate reasoning based on candidate's actual background
  const getReasoningForCriteria = (label: string, status: string): string => {
    const reasonings: Record<string, Record<string, string>> = {
      'B2B Lead Generation Experience': {
        full: `${candidate.name} has demonstrated strong B2B lead generation experience through roles at ${candidate.roles[0]?.company || 'previous companies'}. Track record of identifying and qualifying business prospects.`,
        partial: `Some exposure to B2B sales processes, but limited direct lead generation experience. May require additional training.`,
        none: `No documented B2B lead generation experience. Background is primarily in other areas.`,
        unknown: `Unable to verify B2B lead generation experience from available information.`
      },
      '1-3 Years Digital Sales': {
        full: `Has ${candidate.roles.length > 1 ? 'multiple years' : 'relevant experience'} in digital sales environments. Comfortable with remote selling and digital communication tools.`,
        partial: `Some digital sales experience, but may be less than the preferred 1-3 years or primarily traditional sales.`,
        none: `No documented digital sales experience. Background is in non-sales roles.`,
        unknown: `Digital sales experience not clearly documented in profile.`
      },
      'CRM & Sales Tools (HubSpot, Salesforce)': {
        full: `Proficient with CRM platforms including HubSpot and/or Salesforce. Has used these tools extensively in previous roles.`,
        partial: `Some CRM experience, but may not have deep expertise with HubSpot or Salesforce specifically.`,
        none: `No documented CRM or sales tools experience.`,
        unknown: `CRM proficiency not specified in available information.`
      },
      'Fluent English Communication': {
        full: `Demonstrates excellent English communication skills. ${candidate.roles[0]?.company?.includes('Google') || candidate.roles[0]?.company?.includes('Shopify') ? 'Has worked in English-speaking international environments.' : 'Profile and experience indicate strong English proficiency.'}`,
        partial: `English skills present but may need assessment for business-level fluency.`,
        none: `English proficiency not demonstrated or limited.`,
        unknown: `English communication level not clearly specified.`
      },
      'International/European Clients': {
        full: `Has experience working with international clients, particularly in European markets. Understands cross-cultural business dynamics.`,
        partial: `Some international exposure, but limited direct experience with European B2B clients.`,
        none: `No documented international client experience.`,
        unknown: `International client experience not specified.`
      },
      'Distribution/Manufacturing Knowledge': {
        full: `Has direct experience in distribution or manufacturing sectors. Understands industry-specific challenges and terminology.`,
        partial: `Some exposure to distribution/manufacturing, but not a primary focus area.`,
        none: `No documented experience in distribution or manufacturing industries.`,
        unknown: `Industry background not clearly specified.`
      }
    };
    
    return reasonings[label]?.[status] || `Assessment based on available profile information for ${candidate.name}.`;
  };

  // Map candidate's coreCriteria to dialog format with reasoning
  const dialogCoreCriteria: DialogCriteriaItem[] = defaultCoreCriteria.map(item => ({
    ...item,
    reasoning: getReasoningForCriteria(item.label, item.status)
  }));

  // Map candidate's softSkills to dialog format with reasoning
  const dialogSoftSkills: DialogCriteriaItem[] = defaultSoftSkills.map(item => ({
    ...item,
    reasoning: getReasoningForCriteria(item.label, item.status)
  }));

  // Generate dynamic highlights based on candidate data
  const generateHighlights = () => {
    const highlights: { icon: string; label: string }[] = [];
    
    // Add company-based highlight
    if (candidate.roles && candidate.roles.length > 0) {
      const topCompanies = ['Google', 'Salesforce', 'HubSpot', 'Shopify', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'LinkedIn', 'Oracle'];
      const workedAtTop = candidate.roles.some(role => 
        topCompanies.some(company => role.company.toLowerCase().includes(company.toLowerCase()))
      );
      if (workedAtTop) {
        const topCompany = candidate.roles.find(role => 
          topCompanies.some(company => role.company.toLowerCase().includes(company.toLowerCase()))
        );
        highlights.push({ icon: 'building', label: `Experience at ${topCompany?.company}` });
      } else if (candidate.roles.length >= 2) {
        highlights.push({ icon: 'building', label: `${candidate.roles.length} relevant positions` });
      }
    }
    
    // Add experience-based highlight
    if (candidate.roles && candidate.roles.length > 0) {
      const currentRole = candidate.roles[0];
      if (currentRole.role.toLowerCase().includes('senior') || currentRole.role.toLowerCase().includes('lead')) {
        highlights.push({ icon: 'award', label: 'Senior-level experience' });
      } else if (currentRole.role.toLowerCase().includes('manager') || currentRole.role.toLowerCase().includes('director')) {
        highlights.push({ icon: 'award', label: 'Management experience' });
      } else {
        highlights.push({ icon: 'briefcase', label: currentRole.role });
      }
    }
    
    // Add skill-based highlight from skillTags
    if (candidate.skillTags && candidate.skillTags.length > 0) {
      const primarySkill = candidate.skillTags[0];
      highlights.push({ icon: 'sparkles', label: primarySkill });
    } else if (matchScore >= 10) {
      highlights.push({ icon: 'sparkles', label: 'Strong criteria match' });
    }
    
    // Add location highlight
    highlights.push({ icon: 'location', label: `Based in ${candidate.city}` });
    
    return highlights.slice(0, 3); // Limit to 3 highlights
  };
  
  const highlightItems = generateHighlights();
  
  const defaultTags = candidate.tags || ['Sourced'];
  const defaultSkillTags = candidate.skillTags || ['Award winner', 'UX Strategy', 'Fintech Experience'];
  const defaultSummary = candidate.summary || candidate.description || `Senior Product Designer with leadership experience. Worked several years in fintech, at high-growth companies, which is aligned with your company.`;
  
  const handleNotAGoodFitClick = () => {
    setFeedbackActionType('not-a-good-fit');
    setFeedbackDialogOpen(true);
  };

  const handleSaveToJobClick = () => {
    setFeedbackActionType('save-to-job');
    setFeedbackDialogOpen(true);
  };

  const handleFeedbackSubmit = (feedback: string, rating: number | null) => {
    console.log('Feedback submitted:', { action: feedbackActionType, feedback, rating, candidateId: candidate.id });
    // Handle the action after feedback - call the callback to move to next candidate
    if (feedbackActionType === 'not-a-good-fit' && onNotAGoodFit) {
      onNotAGoodFit();
    } else if (feedbackActionType === 'save-to-job' && onSaveToJob) {
      onSaveToJob();
    }
  };

  const handleFeedbackSkip = () => {
    console.log('Feedback skipped for:', feedbackActionType);
    // Handle the action without feedback - still move to next candidate
    if (feedbackActionType === 'not-a-good-fit' && onNotAGoodFit) {
      onNotAGoodFit();
    } else if (feedbackActionType === 'save-to-job' && onSaveToJob) {
      onSaveToJob();
    }
  };

  const handleStatusChange = (criteriaLabel: string, newStatus: string) => {
    setCriteriaStatuses(prev => ({
      ...prev,
      [criteriaLabel]: newStatus
    }));
  };
  const getEffectiveStatus = (item: CriteriaItem) => {
    return (criteriaStatuses[item.label] || item.status) as 'full' | 'partial' | 'none' | 'unknown';
  };
  const renderCriteriaItem = (item: CriteriaItem, index: number) => {
    const IconComponent = getIconComponent(item.icon);
    const effectiveStatus = getEffectiveStatus(item);
    return <div key={index} className="flex items-center justify-between py-2.5 border-b border-[#F3F3F3] last:border-b-0">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <IconComponent size={16} className="text-[#666666] flex-shrink-0" />
          <span className="text-sm text-[#292524] truncate">
            {item.label}
            {item.required && <span className="text-[#D32F2F] ml-0.5">*</span>}
          </span>
        </div>
        <Select value={effectiveStatus} onValueChange={value => handleStatusChange(item.label, value)}>
          <SelectTrigger className={`h-7 w-auto min-w-[100px] border-0 text-xs font-medium px-2.5 gap-1 ${getStatusStyle(effectiveStatus)}`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border border-[#EEEDEC] shadow-lg z-50">
            <SelectItem value="full" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2D7A2D]"></span>
                Full match
              </span>
            </SelectItem>
            <SelectItem value="partial" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#999999]"></span>
                Part match
              </span>
            </SelectItem>
            <SelectItem value="none" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F]"></span>
                No match
              </span>
            </SelectItem>
            <SelectItem value="unknown" className="text-xs">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CCCCCC]"></span>
                Unknown
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>;
  };
  return <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-4 border-b border-[#EEEDEC]">
        {/* Match Score */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold text-[#2D7A2D] font-['LabilGrotesk']">
            {matchScore}/{matchTotal}
          </span>
          <span className="text-sm text-[#666666]">Match</span>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
          {candidate.linkedin && (
            <a 
              href={candidate.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              title="View LinkedIn Profile"
            >
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </a>
          )}
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">

        {/* Criteria Sections */}
        <div className="p-5">
          {/* Core Criteria Section */}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-[#999999] uppercase tracking-wide mb-2">
              Core Criteria
            </h3>
            <div className="bg-white rounded-lg px-3 border border-[#EEEDEC]">
              {defaultCoreCriteria.map((item, index) => renderCriteriaItem(item, index))}
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-[#999999] uppercase tracking-wide mb-2">
              Soft Skills
            </h3>
            <div className="bg-white rounded-lg px-3 border border-[#EEEDEC]">
              {defaultSoftSkills.map((item, index) => renderCriteriaItem(item, index))}
            </div>
          </div>

          {/* Show Details Button */}
          <button 
            onClick={() => setShowDetailsDialog(true)} 
            className="w-full py-3 text-sm text-[#666666] hover:text-[#292524] bg-[#F6F5F3] hover:bg-[#EEEDEC] rounded-lg transition-colors flex items-center justify-center gap-2 border border-[#EEEDEC]"
          >
            Show details
            <ChevronDown size={14} />
          </button>

          {/* Details Dialog */}
          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogContent className="max-w-[1265px] p-0 gap-0 overflow-hidden">
              <div className="grid grid-cols-[1fr_1.8fr]">
                {/* Left Column - Match Score */}
                <div className="p-8 bg-[#FAFAF9] border-r border-[#EEEDEC] flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf size={24} className="text-[#2D7A2D] rotate-[-45deg]" />
                    <span className="text-5xl font-semibold text-[#2D7A2D] font-['LabilGrotesk']">
                      {matchScore}/{matchTotal}
                    </span>
                    <Leaf size={24} className="text-[#2D7A2D] rotate-[135deg]" />
                  </div>
                  <span className="text-sm text-[#666666] mb-8">Match</span>
                  
                  <p className="text-sm text-[#444444] leading-relaxed mb-8 text-center">
                    {defaultSummary}
                  </p>
                  
                  <div className="w-full space-y-4">
                    {highlightItems.map((item, index) => {
                      const IconComponent = getIconComponent(item.icon);
                      return (
                        <div key={index} className="flex items-center gap-3 text-sm text-[#444444]">
                          <IconComponent size={18} className="text-[#2D7A2D]" />
                          <span>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column - Criteria with Accordions */}
                <div className="p-8 max-h-[700px] overflow-y-auto scrollbar-hide">
                  {/* Core Criteria */}
                  <div className="mb-6">
                    <h3 className="text-xs font-medium text-[#999999] uppercase tracking-wide mb-3">
                      Core Criteria
                    </h3>
                    <Accordion type="multiple" className="divide-y divide-[#EEEDEC]">
                      {dialogCoreCriteria.map((item, index) => {
                        const IconComponent = getIconComponent(item.icon);
                        const statusColor = item.status === 'full' ? 'text-[#2D7A2D]' : 
                                           item.status === 'partial' ? 'text-[#B8860B]' : 
                                           item.status === 'none' ? 'text-[#D32F2F]' : 'text-[#999999]';
                        const statusDot = item.status === 'full' ? 'bg-[#2D7A2D]' : 
                                         item.status === 'partial' ? 'bg-[#B8860B]' : 
                                         item.status === 'none' ? 'bg-[#D32F2F]' : 'bg-[#CCCCCC]';
                        return (
                          <AccordionItem key={index} value={`core-${index}`} className="border-0">
                            <AccordionTrigger className="py-4 hover:no-underline">
                              <div className="flex items-center gap-3 flex-1">
                                <span className={`w-2 h-2 rounded-full ${statusDot}`}></span>
                                <IconComponent size={16} className="text-[#666666]" />
                                <span className="text-sm text-[#292524] font-normal">
                                  {item.label}
                                  {item.required && <span className="text-[#D32F2F] ml-0.5">*</span>}
                                </span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 pt-0">
                              <p className="text-sm text-[#666666] leading-relaxed pl-8">
                                {item.reasoning}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>

                  {/* Soft Skills */}
                  <div>
                    <h3 className="text-xs font-medium text-[#999999] uppercase tracking-wide mb-3">
                      Soft Skills
                    </h3>
                    <Accordion type="multiple" className="divide-y divide-[#EEEDEC]">
                      {dialogSoftSkills.map((item, index) => {
                        const IconComponent = getIconComponent(item.icon);
                        const statusDot = item.status === 'full' ? 'bg-[#2D7A2D]' : 
                                         item.status === 'partial' ? 'bg-[#B8860B]' : 
                                         item.status === 'none' ? 'bg-[#D32F2F]' : 'bg-[#CCCCCC]';
                        return (
                          <AccordionItem key={index} value={`soft-${index}`} className="border-0">
                            <AccordionTrigger className="py-4 hover:no-underline">
                              <div className="flex items-center gap-3 flex-1">
                                <span className={`w-2 h-2 rounded-full ${statusDot}`}></span>
                                <IconComponent size={16} className="text-[#666666]" />
                                <span className="text-sm text-[#292524] font-normal">{item.label}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-4 pt-0">
                              <p className="text-sm text-[#666666] leading-relaxed pl-8">
                                {item.reasoning}
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Summary Section */}
          <div className="mb-5 pt-3 border-t border-[#F3F3F3]">
            <h3 className="text-xs font-medium text-[#999999] uppercase tracking-wide mb-2">
              Summary
            </h3>
            <p className="text-sm text-[#444444] leading-relaxed">
              {defaultSummary}
            </p>
          </div>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2">
            {defaultSkillTags.map((tag, index) => <span key={index} className="px-3 py-1.5 bg-[#F0EDE8] text-[#555555] text-xs rounded-full font-medium">
                {tag}
              </span>)}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#EEEDEC] flex items-center gap-3">
        <button 
          onClick={handleNotAGoodFitClick}
          className="flex items-center gap-2 text-sm text-[#D32F2F] hover:text-[#D32F2F]/80 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
          </svg>
          Not a good fit
        </button>
        <div className="flex-1"></div>
        <button className="w-10 h-10 rounded-lg border border-[#EEEDEC] flex items-center justify-center hover:bg-muted transition-colors">
          <Mail className="w-4 h-4 text-muted-foreground" />
        </button>
        <Button 
          onClick={handleSaveToJobClick}
          className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 h-10 rounded-lg"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          Save to job
        </Button>
      </div>

      {/* Feedback Dialog */}
      <CandidateFeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
        actionType={feedbackActionType}
        candidateName={candidate.name}
        onSubmit={handleFeedbackSubmit}
        onSkip={handleFeedbackSkip}
      />
    </div>;
};
export default CandidateDetailPanel;