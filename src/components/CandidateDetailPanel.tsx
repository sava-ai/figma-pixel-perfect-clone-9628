import React, { useState } from 'react';
import { X, MoreHorizontal, Share2, Mail, MapPin, Briefcase, GraduationCap, Clock, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface CriteriaItem {
  icon: 'location' | 'briefcase' | 'graduation' | 'clock' | 'sparkles';
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
}
interface CandidateDetailPanelProps {
  candidate: Candidate | null;
  onClose: () => void;
}
const CandidateDetailPanel = ({
  candidate,
  onClose
}: CandidateDetailPanelProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [criteriaStatuses, setCriteriaStatuses] = useState<Record<string, string>>({});
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
  const defaultTags = candidate.tags || ['Sourced'];
  const defaultSkillTags = candidate.skillTags || ['Award winner', 'UX Strategy', 'Fintech Experience'];
  const defaultSummary = candidate.summary || candidate.description || `Senior Product Designer with leadership experience. Worked several years in fintech, at high-growth companies, which is aligned with your company.`;
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
      <div className="flex items-center justify-end gap-2 p-4">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Share2 className="w-4 h-4 text-muted-foreground" />
        </button>
        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Profile Section - Centered */}
        <div className="flex flex-col items-center pt-6 pb-6 border-b border-[#EEEDEC]">
          <img src={candidate.image} alt={candidate.name} className="w-20 h-20 rounded-sm object-cover mb-3" />
          <h2 className="text-lg font-semibold text-[#292524] font-['LabilGrotesk'] mb-1">
            {candidate.name}
          </h2>
          <p className="text-sm text-[#666666] mb-3">
            {candidate.city}, Sweden
          </p>

          {/* Tags Row */}
          <div className="flex items-center gap-2 flex-wrap justify-center mb-4">
            {defaultTags.map((tag, index) => <span key={index} className="px-2.5 py-1 bg-[#F6F5F3] text-[#666666] text-xs rounded-full">
                {tag}
              </span>)}
            <button className="p-1 hover:bg-[#F6F5F3] rounded transition-colors">
              <MoreHorizontal size={14} className="text-[#999999]" />
            </button>
          </div>

          {/* Match Score */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#2D7A2D]">
              
              <span className="text-2xl font-semibold font-['LabilGrotesk']">
                {matchScore}/{matchTotal}
              </span>
              
            </div>
            <span className="text-xs text-[#666666] mt-0.5">Match</span>
          </div>
        </div>

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
          <button onClick={() => setShowDetails(!showDetails)} className="w-full py-2.5 text-sm text-[#666666] hover:text-[#292524] transition-colors flex items-center justify-center gap-1">
            {showDetails ? 'Hide details' : 'Show details'}
            <ChevronDown size={14} className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
          </button>

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
        <button className="flex items-center gap-2 text-sm text-[#D32F2F] hover:text-[#D32F2F]/80 transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
          </svg>
          Not a good fit
        </button>
        <div className="flex-1"></div>
        <button className="w-10 h-10 rounded-lg border border-[#EEEDEC] flex items-center justify-center hover:bg-muted transition-colors">
          <Mail className="w-4 h-4 text-muted-foreground" />
        </button>
        <Button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-4 h-10 rounded-lg">
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          Save to job
        </Button>
      </div>
    </div>;
};
export default CandidateDetailPanel;