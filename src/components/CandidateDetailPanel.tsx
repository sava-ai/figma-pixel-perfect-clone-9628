import { X, MoreHorizontal, Share2, Mail, MapPin, Link2, Briefcase, GraduationCap, Clock, CheckCheck, Check, XCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CandidateRole {
  company: string;
  role: string;
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
}

interface MatchCriteria {
  icon: React.ReactNode;
  label: string;
  status: 'full' | 'partial' | 'none' | 'unknown';
  required?: boolean;
}

interface CandidateDetailPanelProps {
  candidate: Candidate | null;
  onClose: () => void;
}

const CandidateDetailPanel = ({ candidate, onClose }: CandidateDetailPanelProps) => {
  if (!candidate) return null;

  // Parse match score
  const [matchScore, matchTotal] = candidate.match.split('/').map(Number);

  // Generate match criteria based on candidate data
  const matchCriteria: MatchCriteria[] = [
    {
      icon: <MapPin className="w-4 h-4 text-muted-foreground" />,
      label: `Located in ${candidate.city}`,
      status: 'full',
      required: true
    },
    {
      icon: <Briefcase className="w-4 h-4 text-muted-foreground" />,
      label: 'Senior Product Designer',
      status: matchScore >= 9 ? 'full' : 'partial',
      required: true
    },
    {
      icon: <GraduationCap className="w-4 h-4 text-muted-foreground" />,
      label: 'Senior-Level Experience',
      status: matchScore >= 10 ? 'full' : matchScore >= 8 ? 'partial' : 'none',
      required: true
    },
    {
      icon: <Clock className="w-4 h-4 text-muted-foreground" />,
      label: '5+ Years of Design Experience',
      status: matchScore >= 9 ? 'full' : 'partial',
      required: true
    },
    {
      icon: <Link2 className="w-4 h-4 text-muted-foreground" />,
      label: 'Fluent English',
      status: 'unknown',
      required: false
    }
  ];

  const getStatusBadge = (status: MatchCriteria['status']) => {
    switch (status) {
      case 'full':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#E8F5E9] text-[#2E7D32] rounded-md text-xs font-medium">
            <CheckCheck className="w-3.5 h-3.5" />
            Full match
          </div>
        );
      case 'partial':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F5F5F5] text-[#424242] rounded-md text-xs font-medium">
            <Check className="w-3.5 h-3.5" />
            Part match
          </div>
        );
      case 'none':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFEBEE] text-[#C62828] rounded-md text-xs font-medium">
            <XCircle className="w-3.5 h-3.5" />
            No match
          </div>
        );
      case 'unknown':
        return (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAFAFA] text-muted-foreground rounded-md text-xs font-medium">
            <HelpCircle className="w-3.5 h-3.5" />
            Unknown
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-[#EEEDEC]">
      {/* Header */}
      <div className="flex items-center justify-end gap-2 p-4 border-b border-[#EEEDEC]">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <Share2 className="w-4 h-4 text-muted-foreground" />
        </button>
        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center pt-6 pb-8 border-b border-[#EEEDEC]">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img 
              src={candidate.image} 
              alt={candidate.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-medium text-foreground mb-1">{candidate.name}</h2>
          <p className="text-sm text-muted-foreground mb-4">{candidate.city}, Sweden</p>

          {/* Status badges */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-primary/20 border-2 border-white"></div>
                <div className="w-5 h-5 rounded-full bg-primary/30 border-2 border-white"></div>
              </div>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Connected
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>2d</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="m22 2-5 10-5-3 5-10z" />
              </svg>
              <span>Sourced</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span>2</span>
            </div>
            <button className="w-6 h-6 rounded-full hover:bg-muted flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Match Score */}
        <div className="flex flex-col items-center py-6 border-b border-[#EEEDEC]">
          <div className="flex items-center gap-2 text-primary mb-1">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="text-2xl font-semibold">{matchScore}/{matchTotal}</span>
            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground">Match</p>
        </div>

        {/* Match Criteria */}
        <div className="p-5 space-y-3">
          {matchCriteria.map((criteria, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2.5 border-b border-[#EEEDEC] last:border-0"
            >
              <div className="flex items-center gap-3">
                {criteria.icon}
                <span className="text-sm text-foreground">
                  {criteria.label}
                  {criteria.required && <span className="text-[#C62828] ml-0.5">*</span>}
                </span>
              </div>
              {getStatusBadge(criteria.status)}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-[#EEEDEC] flex items-center gap-3">
        <button className="flex items-center gap-2 text-sm text-[#C62828] hover:text-[#C62828]/80 transition-colors">
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
    </div>
  );
};

export default CandidateDetailPanel;
