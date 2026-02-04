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
  location?: string;
  startDate?: string;
  endDate?: string;
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
  hideProgressHeader?: boolean;
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

// Generate company descriptor tags (product/industry focus)
const getCompanyDescriptors = (companyName: string): string[] => {
  const descriptors: Record<string, string[]> = {
    'Google': ['AI', 'Cloud Computing', 'Search Technology', 'Advertising'],
    'Shopify': ['E-commerce Platform', 'Payments', 'SaaS'],
    'Salesforce': ['CRM', 'Cloud Software', 'Enterprise', 'AI'],
    'HubSpot': ['Marketing Automation', 'Inbound Marketing', 'SaaS'],
    'Nielsen': ['Data Analytics', 'Consumer Insights', 'Market Research'],
    'Acronis': ['Data Protection', 'Cybersecurity', 'Cloud Backup'],
    'Akamai Technologies': ['CDN', 'Edge Computing', 'Web Security'],
    'SoftServe': ['Digital Transformation', 'Custom Software', 'IT Consulting'],
    'SALESmanago': ['Marketing Automation', 'CDP', 'AI-Powered'],
    'PinMeTo': ['Local SEO', 'Multi-location', 'Brand Management'],
    'Kontakt.io': ['IoT', 'Bluetooth Beacons', 'Asset Tracking'],
    'UNITALK': ['VoIP', 'Cloud Telephony', 'Contact Center'],
    'Mitrix Technology': ['IT Outsourcing', 'Custom Development'],
    'Perfection42': ['Mobile Apps', 'Product Development', 'Startups'],
    'Barbara Bang': ['iGaming', 'Slot Games', 'Entertainment'],
    'ProtoQ': ['Tech Advisory', 'Digital Strategy'],
    'Oxagile': ['Video Streaming', 'HealthTech', 'Custom Software'],
    'ExxonMobil': ['Oil & Gas', 'Energy', 'Petrochemicals'],
  };

  return descriptors[companyName] || ['Technology', 'B2B'];
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
  // Using brand colors: Ivory/Manilla tones
  switch (type) {
    case 'public':
      return 'border-[#E5E4DF]';
    case 'private':
      return 'border-[#E5E4DF]';
    case 'startup':
      return 'border-[#D4A27F]';
    default:
      return 'border-[#E5E4DF]';
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
  totalCount,
  hideProgressHeader = false
}) => {
  const defaultSkillTags = candidate.skillTags || ['Sales', 'B2B', 'CRM'];
  const defaultSummary = candidate.summary || candidate.description;

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-[#EEEDEC] overflow-hidden">
      {/* Header with progress - conditionally rendered */}
      {!hideProgressHeader && (
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
      )}

      <ScrollArea className="flex-1">
        <div className="p-5">
          {/* Profile Header */}
          <div className="mb-5">
            <div className="flex items-start gap-4 mb-3">
              <InitialsAvatar name={candidate.name} size="lg" className="rounded-xl flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-foreground truncate mb-0.5">
                  {candidate.name}
                </h2>
                {/* Current Position */}
                {candidate.roles && candidate.roles.length > 0 && (
                  <div>
                    <p className="text-sm text-foreground font-medium">{candidate.roles[0].role}</p>
                    <p className="text-sm text-muted-foreground">{candidate.roles[0].company}</p>
                  </div>
                )}
              </div>
            </div>
            {/* Location - aligned left */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{candidate.city}, Poland</span>
            </div>
            {/* Social Links - aligned left */}
            <div className="flex flex-wrap items-center gap-3">
              {candidate.linkedin && (
                <a 
                  href={candidate.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              )}
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
              >
                <Globe className="w-3.5 h-3.5" />
                Portfolio
              </a>
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.626-5.374-12-12-12z"/>
                </svg>
                Dribbble
              </a>
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269L12 17.854 5.242 13.769zm11.516 0L12 9.5 7.242 13.769 12 17.854l4.758-4.085z"/>
                </svg>
                Behance
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-5">
            <h3 className="font-medium uppercase tracking-wide mb-2" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333', fontSize: '0.9rem' }}>
              About
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {defaultSummary}
            </p>
          </div>

          {/* Skills Bubbles */}
          <div className="mb-5">
            <h3 className="font-medium uppercase tracking-wide mb-2" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333', fontSize: '0.9rem' }}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {defaultSkillTags.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="px-3 py-1.5 border-0 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#EBDBBC', color: '#262625' }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          {candidate.languages && candidate.languages.length > 0 && (
            <div className="mb-5">
              <h3 className="font-medium uppercase tracking-wide mb-2" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333', fontSize: '0.9rem' }}>
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {candidate.languages.map((lang, index) => (
                  <Badge 
                    key={index}
                    variant="outline"
                    className="px-2.5 py-1 rounded-full text-xs border-0"
                    style={{ backgroundColor: '#F0F0EB', color: '#40403E' }}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Experience Section */}
          <div className="mb-5">
            <h3 className="font-medium uppercase tracking-wide mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333', fontSize: '0.9rem' }}>
              Experience
            </h3>
            <div className="bg-white rounded-lg divide-y divide-[#EEEDEC]">
              {candidate.roles.map((role, idx) => {
                const companyInfo = getCompanyInfo(role.company);
                const companyDescriptors = getCompanyDescriptors(role.company);
                const roleSkills = getRoleSkills(role.role, role.company);
                const icon = getCompanyIcon(role.company);
                
                // Generate mock dates and location if not provided
                const mockDates = [
                  { start: 'March 2024', end: 'Present' },
                  { start: 'June 2022', end: 'February 2024' },
                  { start: 'January 2020', end: 'May 2022' },
                  { start: 'August 2018', end: 'December 2019' },
                ];
                const mockLocations = [
                  'Warsaw, Masovian, Poland',
                  'Cracow, Lesser Poland, Poland',
                  'Remote',
                  'Wroclaw, Lower Silesian, Poland',
                ];
                const dateRange = role.startDate && role.endDate 
                  ? `${role.startDate} - ${role.endDate}`
                  : `${mockDates[idx % mockDates.length].start} - ${mockDates[idx % mockDates.length].end}`;
                const location = role.location || mockLocations[idx % mockLocations.length];
                
                return (
                  <div key={idx} className="p-4">
                    {/* Role Header */}
                    <div className="flex items-start gap-3 mb-2">
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

                    {/* Date and Location */}
                    <div className="flex flex-col gap-1 mb-3 ml-[52px]">
                      <span className="text-xs text-muted-foreground">{dateRange}</span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {location}
                      </span>
                    </div>

                    {/* Company Links */}
                    <div className="flex items-center gap-3 mb-3 ml-[52px]">
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

                    {/* Company Tags Section */}
                    <div className="ml-[52px] mb-3">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">Company</p>
                      <div className="flex flex-wrap gap-1.5">
                        {/* Main tags: size, category, type */}
                        {companyInfo.employees && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border-0" style={{ backgroundColor: '#F0F0EB', color: '#40403E' }}>
                            <Users className="w-3 h-3" />
                            {companyInfo.employees}
                          </span>
                        )}
                        {companyInfo.category && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border-0" style={{ backgroundColor: '#F0F0EB', color: '#40403E' }}>
                            <Building2 className="w-3 h-3" />
                            {companyInfo.category}
                          </span>
                        )}
                        {companyInfo.type && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border-0" style={{ backgroundColor: '#EBDBBC', color: '#262625' }}>
                            {companyInfo.type === 'public' ? 'Enterprise' : 
                             companyInfo.type === 'startup' ? 'Startup' : 'Private Company'}
                          </span>
                        )}
                        {/* Additional descriptor tags */}
                        {companyDescriptors.map((descriptor, descIdx) => (
                          <span 
                            key={descIdx}
                            className="inline-flex items-center px-2 py-1 text-xs rounded-full border-0"
                            style={{ backgroundColor: '#E5E4DF', color: '#40403E' }}
                          >
                            {descriptor}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Skills Acquired Section */}
                    <div className="ml-[52px]">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">Skills Acquired</p>
                      <div className="flex flex-wrap gap-1.5">
                        {roleSkills.map((skill, skillIdx) => (
                          <Badge 
                            key={skillIdx}
                            variant="outline"
                            className="px-2 py-0.5 rounded-full text-xs border-0"
                            style={{ backgroundColor: '#D4A27F', color: '#191919' }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Education Section */}
          {candidate.education && (
            <div className="mb-5">
              <h3 className="font-medium uppercase tracking-wide mb-3" style={{ fontFamily: 'CooperLight, sans-serif', color: '#333333', fontSize: '0.9rem' }}>
                Education
              </h3>
              <div className="bg-white rounded-lg">
                <div className="p-4">
                  {/* Education Header */}
                  <div className="flex items-start gap-3 mb-2">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#CC785C' }}
                    >
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{candidate.education.degree}</p>
                      <p className="text-sm text-muted-foreground">{candidate.education.school}</p>
                    </div>
                  </div>

                  {/* Date and Location */}
                  <div className="flex flex-col gap-1 ml-[52px]">
                    <span className="text-xs text-muted-foreground">{candidate.education.graduationDate}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      Warsaw, Poland
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </ScrollArea>
    </div>
  );
};

export default CandidateProfilePanel;
