import React from 'react';
import { ExternalLink, MapPin, Users, Building2, Globe, Linkedin, GraduationCap } from 'lucide-react';
import InitialsAvatar from '@/components/InitialsAvatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CompanyInfo {
  name: string;
  employees?: string;
  category?: string;
  type?: 'public' | 'private' | 'startup';
  website?: string;
  linkedin?: string;
}

interface CandidateRole {
  company: string;
  role: string;
  companyInfo?: CompanyInfo;
  skills?: string[];
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
  linkedin?: string;
  languages?: string[];
}

interface CandidateProfilePanelProps {
  candidate: Candidate;
  currentIndex: number;
  totalCount: number;
}

// Generate company info based on company name
const getCompanyInfo = (companyName: string): CompanyInfo => {
  const companyData: Record<string, CompanyInfo> = {
    'Google': { name: 'Google', employees: '150,000+', category: 'Technology', type: 'public', website: 'https://google.com', linkedin: 'https://linkedin.com/company/google' },
    'Shopify': { name: 'Shopify', employees: '10,000+', category: 'E-commerce', type: 'public', website: 'https://shopify.com', linkedin: 'https://linkedin.com/company/shopify' },
    'Salesforce': { name: 'Salesforce', employees: '70,000+', category: 'CRM Software', type: 'public', website: 'https://salesforce.com', linkedin: 'https://linkedin.com/company/salesforce' },
    'HubSpot': { name: 'HubSpot', employees: '7,000+', category: 'Marketing Software', type: 'public', website: 'https://hubspot.com', linkedin: 'https://linkedin.com/company/hubspot' },
    'Nielsen': { name: 'Nielsen', employees: '40,000+', category: 'Market Research', type: 'public', website: 'https://nielsen.com', linkedin: 'https://linkedin.com/company/nielsen' },
    'Acronis': { name: 'Acronis', employees: '2,000+', category: 'Cybersecurity', type: 'private', website: 'https://acronis.com', linkedin: 'https://linkedin.com/company/acronis' },
    'Akamai Technologies': { name: 'Akamai', employees: '9,000+', category: 'Cloud Security', type: 'public', website: 'https://akamai.com', linkedin: 'https://linkedin.com/company/akamai-technologies' },
    'SoftServe': { name: 'SoftServe', employees: '15,000+', category: 'IT Services', type: 'private', website: 'https://softserveinc.com', linkedin: 'https://linkedin.com/company/softserve' },
    'SALESmanago': { name: 'SALESmanago', employees: '500+', category: 'Marketing Automation', type: 'private', website: 'https://salesmanago.com', linkedin: 'https://linkedin.com/company/salesmanago' },
    'PinMeTo': { name: 'PinMeTo', employees: '100+', category: 'SaaS', type: 'startup', website: 'https://pinmeto.com', linkedin: 'https://linkedin.com/company/pinmeto' },
    'Kontakt.io': { name: 'Kontakt.io', employees: '200+', category: 'IoT', type: 'startup', website: 'https://kontakt.io', linkedin: 'https://linkedin.com/company/kontakt-io' },
    'UNITALK': { name: 'UNITALK', employees: '50+', category: 'Telecommunications', type: 'private', website: 'https://unitalk.com', linkedin: 'https://linkedin.com/company/unitalk' },
    'Mitrix Technology': { name: 'Mitrix', employees: '100+', category: 'IT Outsourcing', type: 'private', website: 'https://mitrix.com', linkedin: 'https://linkedin.com/company/mitrix-technology' },
    'Perfection42': { name: 'Perfection42', employees: '50+', category: 'Software Development', type: 'startup', website: 'https://perfection42.com', linkedin: 'https://linkedin.com/company/perfection42' },
    'Barbara Bang': { name: 'Barbara Bang', employees: '100+', category: 'Gaming', type: 'startup', website: 'https://barbarabang.com', linkedin: 'https://linkedin.com/company/barbara-bang' },
    'ProtoQ': { name: 'ProtoQ', employees: '50+', category: 'Tech Consulting', type: 'startup', website: 'https://protoq.com', linkedin: 'https://linkedin.com/company/protoq' },
    'Oxagile': { name: 'Oxagile', employees: '500+', category: 'Software Development', type: 'private', website: 'https://oxagile.com', linkedin: 'https://linkedin.com/company/oxagile' },
    'ExxonMobil': { name: 'ExxonMobil', employees: '60,000+', category: 'Energy', type: 'public', website: 'https://exxonmobil.com', linkedin: 'https://linkedin.com/company/exxonmobil' },
  };

  // Try to find exact match or partial match
  const exactMatch = companyData[companyName];
  if (exactMatch) return exactMatch;

  // Default company info
  return {
    name: companyName,
    employees: '50-200',
    category: 'Technology',
    type: 'private',
    website: `https://${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
    linkedin: `https://linkedin.com/company/${companyName.toLowerCase().replace(/\s+/g, '-')}`
  };
};

// Generate skills for a role based on company and role type
const getRoleSkills = (role: string, company: string): string[] => {
  const skillSets: Record<string, string[]> = {
    'sales': ['B2B Sales', 'Lead Generation', 'CRM', 'Negotiation', 'Pipeline Management'],
    'development': ['Business Development', 'Client Relations', 'Strategic Partnerships', 'Market Research'],
    'account': ['Account Management', 'Customer Success', 'Upselling', 'Retention Strategies'],
    'manager': ['Team Leadership', 'Sales Strategy', 'Forecasting', 'P&L Management'],
    'google': ['Google Workspace', 'Analytics', 'Ads Platform', 'Enterprise Sales'],
    'shopify': ['E-commerce', 'Platform Sales', 'Merchant Solutions', 'Partner Relations'],
    'sdr': ['Cold Outreach', 'Lead Qualification', 'Sales Cadence', 'Prospecting'],
    'bdr': ['Outbound Sales', 'Demo Scheduling', 'Sales Intelligence', 'Market Mapping'],
  };

  const roleKey = role.toLowerCase();
  const companyKey = company.toLowerCase();
  
  let skills: string[] = [];
  
  // Add role-based skills
  if (roleKey.includes('sales') || roleKey.includes('sdr')) {
    skills = [...skills, ...skillSets['sales'].slice(0, 3)];
  }
  if (roleKey.includes('development') || roleKey.includes('bd')) {
    skills = [...skills, ...skillSets['development'].slice(0, 2)];
  }
  if (roleKey.includes('account')) {
    skills = [...skills, ...skillSets['account'].slice(0, 2)];
  }
  if (roleKey.includes('manager')) {
    skills = [...skills, ...skillSets['manager'].slice(0, 2)];
  }
  if (roleKey.includes('sdr')) {
    skills = [...skills, ...skillSets['sdr'].slice(0, 2)];
  }
  if (roleKey.includes('bdr')) {
    skills = [...skills, ...skillSets['bdr'].slice(0, 2)];
  }

  // Add company-specific skills
  if (companyKey.includes('google')) {
    skills = [...skills, ...skillSets['google'].slice(0, 2)];
  }
  if (companyKey.includes('shopify')) {
    skills = [...skills, ...skillSets['shopify'].slice(0, 2)];
  }

  // Remove duplicates and limit
  return [...new Set(skills)].slice(0, 4);
};

const getCompanyTypeStyle = (type: 'public' | 'private' | 'startup' | undefined) => {
  switch (type) {
    case 'public':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'private':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'startup':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getCompanyIcon = (company: string) => {
  const colors = [
    { bg: '#E8F5E9', text: '#2E7D32' },
    { bg: '#E3F2FD', text: '#1565C0' },
    { bg: '#FFF3E0', text: '#EF6C00' },
    { bg: '#FCE4EC', text: '#C2185B' },
    { bg: '#F3E5F5', text: '#7B1FA2' },
    { bg: '#E0F7FA', text: '#00838F' },
    { bg: '#FFF8E1', text: '#F9A825' },
  ];
  
  const index = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return {
    ...colors[index],
    letter: company.charAt(0).toUpperCase()
  };
};

const CandidateProfilePanel: React.FC<CandidateProfilePanelProps> = ({
  candidate,
  currentIndex,
  totalCount
}) => {
  const defaultSkillTags = candidate.skillTags || ['Sales', 'B2B', 'CRM'];
  const defaultSummary = candidate.summary || candidate.description;

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-[#EEEDEC] overflow-hidden">
      {/* Header with progress */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEDEC]">
        <span className="text-sm text-muted-foreground">
          Reviewing {currentIndex + 1} of {totalCount}
        </span>
        <div className="flex items-center gap-2">
          <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-5">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-5">
            <InitialsAvatar name={candidate.name} size="lg" className="rounded-xl flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-foreground truncate">
                  {candidate.name}
                </h2>
                {candidate.isNew && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">New</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{candidate.city}</span>
                <span>•</span>
                <span className="font-medium text-lime-700">{candidate.match} match</span>
              </div>
              {candidate.linkedin && (
                <a 
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  View LinkedIn profile
                </a>
              )}
            </div>
          </div>

          {/* Summary Section */}
          <div className="mb-5 p-4 bg-[#FAFAF9] rounded-lg">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Summary
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {defaultSummary}
            </p>
          </div>

          {/* Skills Bubbles */}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {defaultSkillTags.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="px-3 py-1.5 bg-[#F0EDE8] text-[#555555] border-[#E5E2DC] rounded-full text-xs font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Experience
            </h3>
            <div className="space-y-4">
              {candidate.roles.map((role, idx) => {
                const companyInfo = getCompanyInfo(role.company);
                const roleSkills = getRoleSkills(role.role, role.company);
                const icon = getCompanyIcon(role.company);
                
                return (
                  <div key={idx} className="p-4 bg-white border border-[#EEEDEC] rounded-lg">
                    {/* Role Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: icon.bg }}
                      >
                        <span className="text-sm font-bold" style={{ color: icon.text }}>
                          {icon.letter}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{role.role}</p>
                        <p className="text-sm text-muted-foreground">{role.company}</p>
                      </div>
                    </div>

                    {/* Company Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {companyInfo.employees && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-200">
                          <Users className="w-3 h-3" />
                          {companyInfo.employees}
                        </span>
                      )}
                      {companyInfo.category && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded border border-gray-200">
                          <Building2 className="w-3 h-3" />
                          {companyInfo.category}
                        </span>
                      )}
                      {companyInfo.type && (
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded border ${getCompanyTypeStyle(companyInfo.type)}`}>
                          {companyInfo.type === 'public' ? 'Public Company' : 
                           companyInfo.type === 'startup' ? 'Startup' : 'Private Company'}
                        </span>
                      )}
                    </div>

                    {/* Company Links */}
                    <div className="flex items-center gap-3 mb-3">
                      {companyInfo.website && (
                        <a 
                          href={companyInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <Globe className="w-3 h-3" />
                          Company website
                        </a>
                      )}
                      {companyInfo.linkedin && (
                        <a 
                          href={companyInfo.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="w-3 h-3" />
                          Company LinkedIn
                        </a>
                      )}
                    </div>

                    {/* Role Skills Bubbles */}
                    <div className="flex flex-wrap gap-1.5">
                      {roleSkills.map((skill, skillIdx) => (
                        <Badge 
                          key={skillIdx}
                          variant="outline"
                          className="px-2 py-0.5 bg-white text-muted-foreground border-border rounded-full text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education Section */}
          {candidate.education && (
            <div className="mb-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Education
              </h3>
              <div className="p-4 bg-white border border-[#EEEDEC] rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#8B0000] flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{candidate.education.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {candidate.education.school} · {candidate.education.graduationDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Languages Section */}
          {candidate.languages && candidate.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.languages.map((lang, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="px-2.5 py-1 bg-white text-muted-foreground border-border rounded-full text-xs"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CandidateProfilePanel;
