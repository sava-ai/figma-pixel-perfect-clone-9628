import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, Search, Filter } from 'lucide-react';
import { ProfileDialog } from '@/components/ProfileDialog';
import { ApplicantReviewDialog } from '@/components/ApplicantReviewDialog';
import { RejectionDialog } from '@/components/RejectionDialog';
import { InviteDialog } from '@/components/InviteDialog';
import { JobChatPanel } from '@/components/JobChatPanel';
import { BulkContactDialog } from '@/components/BulkContactDialog';
import CandidateDetailPanel from '@/components/CandidateDetailPanel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
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
import profile9 from '@/assets/profile-9.jpg';
import profile10 from '@/assets/profile-10.jpg';
import profile11 from '@/assets/profile-11.jpg';
import profile12 from '@/assets/profile-12.jpg';
import profile13 from '@/assets/profile-13.jpg';
import profile14 from '@/assets/profile-14.jpg';
import profile15 from '@/assets/profile-15.jpg';
import profile16 from '@/assets/profile-16.jpg';
import profile17 from '@/assets/profile-17.jpg';
import profile18 from '@/assets/profile-18.jpg';
import profile19 from '@/assets/profile-19.jpg';
import profile20 from '@/assets/profile-20.jpg';
// Company icon configurations
const companyIcons: Record<string, { bg: string; text: string; letter: string }> = {
  'Klarna': { bg: '#FFB3C7', text: '#000', letter: 'K' },
  'Spotify': { bg: '#1DB954', text: '#fff', letter: 'S' },
  'Tink': { bg: '#000', text: '#fff', letter: 'T' },
  'Asseco': { bg: '#0066B3', text: '#fff', letter: 'A' },
  'H&M': { bg: '#E50010', text: '#fff', letter: 'H' },
  'Ericsson': { bg: '#0082CE', text: '#fff', letter: 'E' },
  'Bambora': { bg: '#5E2CA5', text: '#fff', letter: 'B' },
  'iZettle': { bg: '#FF6B00', text: '#fff', letter: 'i' },
  'King': { bg: '#FF5E00', text: '#fff', letter: 'K' },
  'Northmill': { bg: '#00C4B4', text: '#fff', letter: 'N' },
  'Delivery Hero': { bg: '#D41A11', text: '#fff', letter: 'D' },
  'Trustly': { bg: '#0A2540', text: '#fff', letter: 'T' },
  'Schibsted': { bg: '#FF6200', text: '#fff', letter: 'S' },
  'Avanza': { bg: '#00C281', text: '#fff', letter: 'A' },
  'Collector Bank': { bg: '#002855', text: '#fff', letter: 'C' },
  'Tetra Pak': { bg: '#0033A0', text: '#fff', letter: 'TP' },
  'Sony Mobile': { bg: '#000', text: '#fff', letter: 'S' },
  'Axis': { bg: '#00A3E0', text: '#fff', letter: 'A' },
  'Tobii': { bg: '#00A3E0', text: '#fff', letter: 'T' },
  'Mojang': { bg: '#8B0000', text: '#fff', letter: 'M' },
  'Paradox': { bg: '#E03C31', text: '#fff', letter: 'P' },
};

const getCompanyIcon = (company: string) => {
  const icon = companyIcons[company];
  if (icon) return icon;
  // Generate consistent random color based on company name
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
  const index = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return { bg: colors[index], text: '#fff', letter: company.charAt(0) };
};

const JobPeopleView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'pipeline'>('people');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<typeof bestCandidates[0] | null>(null);
  const [selectedBestMatch, setSelectedBestMatch] = useState<typeof bestCandidates[0] | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [applicantReviewDialogOpen, setApplicantReviewDialogOpen] = useState(false);
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [bulkContactDialogOpen, setBulkContactDialogOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Animated counters
  const [applicantsCount, setApplicantsCount] = useState(0);
  const [rejectionsCount, setRejectionsCount] = useState(0);
  const [bestMatchesCount, setBestMatchesCount] = useState(0);
  
  const targetApplicants = 23;
  const targetRejections = 8;
  const targetBestMatches = 100;
  const allTags = ['Referred', 'AI sourced', 'Sourced', 'Database', 'Applicant'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const bestCandidates = [{
    id: 1,
    name: "Sarah Chapman",
    image: profile1,
    city: "Stockholm",
    match: "10/12",
    isNew: true,
    description: "A seasoned Senior Product Designer with extensive leadership experience in fintech. Sarah has dedicated over 8 years to building world-class products, contributing to high-growth companies. Her expertise lies in creating intuitive user experiences while driving product strategy and mentoring design teams.",
    roles: [{
      company: "Klarna",
      role: "Senior UX/UI Designer"
    }, {
      company: "Spotify",
      role: "Product Designer"
    }, {
      company: "Tink",
      role: "Product Design Intern"
    }],
    currentRoleIndex: 0,
    engagementRate: 85,
    tags: ['AI sourced'],
    education: {
      school: "Royal Institute of Technology",
      degree: "Master of Science in Design",
      graduationDate: "Jun 2015"
    },
    summary: "Senior Product Designer with leadership experience. Worked several years in fintech, at high-growth companies, which is aligned with your company.",
    skillTags: ['Award winner', 'UX Strategy', 'Fintech Experience'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Stockholm', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'full' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Team collaboration', status: 'full' as const, required: false },
    ],
  }, {
    id: 2,
    name: "Marcus Andersson",
    image: profile2,
    city: "Gothenburg",
    match: "9/12",
    isNew: true,
    description: "Marcus is a Senior Designer at Asseco with 10 years of experience, having multiple projects on Dribbble displaying potential of exponential product understanding. He specializes in design systems and has led transformation initiatives across enterprise platforms, bringing consistency and scalability to complex products.",
    roles: [{
      company: "Asseco",
      role: "Senior Designer"
    }, {
      company: "H&M",
      role: "UX Designer"
    }, {
      company: "Ericsson",
      role: "UI Designer"
    }],
    isOpenToWork: true,
    engagementRate: 0,
    tags: ['Sourced'],
    education: {
      school: "Chalmers University",
      degree: "Bachelor of Arts in Design",
      graduationDate: "May 2014"
    },
    summary: "Senior Designer specializing in design systems and enterprise platforms. Expert in creating scalable design solutions.",
    skillTags: ['Design Systems', 'Enterprise', 'Dribbble Featured'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Gothenburg', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'full' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'partial' as const, required: false },
      { icon: 'sparkles' as const, label: 'Team collaboration', status: 'full' as const, required: false },
    ],
  }, {
    id: 3,
    name: "Emma Lundberg",
    image: profile3,
    city: "Malmö",
    match: "11/12",
    isNew: false,
    description: "Emma is an innovative Senior Product Designer known for her data-driven approach and exceptional prototyping skills. With 9 years in the industry, she has crafted user experiences for both B2B and B2C products, always focusing on measurable impact and user satisfaction metrics.",
    roles: [{
      company: "Bambora",
      role: "Lead Product Designer"
    }, {
      company: "iZettle",
      role: "Product Designer"
    }, {
      company: "King",
      role: "Senior UI Designer"
    }],
    currentRoleIndex: 0,
    engagementRate: 88,
    tags: ['Referred'],
    education: {
      school: "Lund University",
      degree: "Master of Fine Arts",
      graduationDate: "Jun 2016"
    },
    summary: "Data-driven Product Designer with exceptional prototyping skills. Focus on measurable impact and user satisfaction.",
    skillTags: ['Data-driven', 'Prototyping', 'B2B/B2C'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Malmö', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'full' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Leadership experience', status: 'full' as const, required: false },
    ],
  }, {
    id: 4,
    name: "Oliver Karlsson",
    image: profile4,
    city: "Stockholm",
    match: "10/12",
    isNew: true,
    description: "Oliver brings a unique blend of technical knowledge and design excellence, having worked extensively with cross-functional teams in agile environments. His 7 years of experience span fintech, e-commerce, and SaaS products, with a strong focus on accessibility and inclusive design practices.",
    roles: [{
      company: "Northmill",
      role: "Senior Product Designer"
    }, {
      company: "Delivery Hero",
      role: "Product Designer"
    }, {
      company: "Trustly",
      role: "UX Designer"
    }],
    isOpenToWork: true,
    engagementRate: 79,
    tags: ['Database'],
    education: {
      school: "Stockholm University",
      degree: "Bachelor of Science in HCI",
      graduationDate: "Jan 2017"
    },
    summary: "Technical designer with strong accessibility focus. Experience across fintech, e-commerce, and SaaS products.",
    skillTags: ['Accessibility', 'Technical', 'Agile'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Stockholm', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'partial' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Team collaboration', status: 'full' as const, required: false },
    ],
  }, {
    id: 5,
    name: "Linnea Bergström",
    image: profile5,
    city: "Uppsala",
    match: "9/12",
    isNew: false,
    description: "Linnea excels at transforming complex requirements into elegant, user-friendly interfaces. With 6 years specializing in fintech and payment solutions, she has a proven track record of improving conversion rates and reducing user friction through thoughtful design iterations and rigorous testing.",
    roles: [{
      company: "Lunar",
      role: "Product Designer"
    }, {
      company: "Wrapp",
      role: "UX/UI Designer"
    }, {
      company: "Zimpler",
      role: "Junior Designer"
    }],
    currentRoleIndex: 0,
    engagementRate: 0,
    tags: ['AI sourced'],
    education: {
      school: "Uppsala University",
      degree: "Bachelor of Arts in Design",
      graduationDate: "May 2018"
    },
    summary: "Fintech specialist with strong focus on conversion optimization. Expert in payment solutions design.",
    skillTags: ['Fintech', 'Payments', 'Conversion'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Uppsala', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'partial' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'full' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Team collaboration', status: 'unknown' as const, required: false },
    ],
  }, {
    id: 6,
    name: "Filip Johansson",
    image: profile6,
    city: "Stockholm",
    match: "10/12",
    isNew: false,
    description: "Filip is a creative problem-solver with extensive experience in building design systems and leading design sprints. His 8 years in the field have equipped him with deep expertise in user research, interaction design, and visual design, making him a versatile asset to any product team.",
    roles: [{
      company: "Schibsted",
      role: "Senior Product Designer"
    }, {
      company: "Avanza",
      role: "Lead Designer"
    }, {
      company: "Collector Bank",
      role: "Product Designer"
    }],
    currentRoleIndex: 0,
    engagementRate: 81,
    tags: ['Sourced'],
    education: {
      school: "Konstfack",
      degree: "Master of Fine Arts",
      graduationDate: "Jun 2016"
    },
    summary: "Design systems expert with strong user research skills. Experienced in leading design sprints and workshops.",
    skillTags: ['Design Systems', 'Research', 'Workshops'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Stockholm', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'full' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Leadership experience', status: 'full' as const, required: false },
    ],
  }, {
    id: 7,
    name: "Isabella Nilsson",
    image: profile7,
    city: "Lund",
    match: "11/12",
    isNew: false,
    description: "Isabella combines strategic thinking with exceptional execution skills, having delivered award-winning products throughout her 9-year career. She specializes in end-to-end product design, from initial research and concept development to final implementation and post-launch optimization.",
    roles: [{
      company: "Tetra Pak",
      role: "Senior UX Designer"
    }, {
      company: "Sony Mobile",
      role: "Product Designer"
    }, {
      company: "Axis",
      role: "Interaction Designer"
    }],
    isOpenToWork: true,
    engagementRate: 93,
    tags: ['Referred'],
    education: {
      school: "Lund University",
      degree: "Master of Science in Design",
      graduationDate: "Jun 2015"
    },
    summary: "Award-winning designer with end-to-end expertise. Strong strategic thinking and execution skills.",
    skillTags: ['Award winner', 'Strategic', 'End-to-end'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Lund', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'full' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'full' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Leadership experience', status: 'full' as const, required: false },
    ],
  }, {
    id: 8,
    name: "Alexander Berg",
    image: profile8,
    city: "Stockholm",
    match: "9/12",
    isNew: false,
    description: "Alexander is passionate about creating delightful user experiences through animation and micro-interactions. His 7 years of experience include work on mobile apps, web platforms, and emerging technologies, always pushing the boundaries of what's possible in digital product design.",
    roles: [{
      company: "Tobii",
      role: "Senior Product Designer"
    }, {
      company: "Mojang",
      role: "UI/UX Designer"
    }, {
      company: "Paradox",
      role: "Product Designer"
    }],
    currentRoleIndex: 0,
    engagementRate: 76,
    tags: ['Applicant'],
    education: {
      school: "Hyper Island",
      degree: "Digital Media Creative",
      graduationDate: "Dec 2017"
    },
    summary: "Animation and micro-interaction specialist. Experience across mobile, web, and emerging technologies.",
    skillTags: ['Animation', 'Motion', 'Mobile'],
    coreCriteria: [
      { icon: 'location' as const, label: 'Located in Stockholm', status: 'full' as const, required: true },
      { icon: 'briefcase' as const, label: 'Senior Product Designer', status: 'full' as const, required: true },
      { icon: 'clock' as const, label: '5+ Years of Design Experience', status: 'partial' as const, required: true },
      { icon: 'graduation' as const, label: "Bachelor's Degree or Higher", status: 'partial' as const, required: false },
    ],
    softSkills: [
      { icon: 'sparkles' as const, label: 'Fluent English', status: 'full' as const, required: false },
      { icon: 'sparkles' as const, label: 'Team collaboration', status: 'full' as const, required: false },
    ],
    documents: [
      { id: 1, name: 'Alexander_Berg_CV.pdf', type: 'PDF Document', url: '#' },
      { id: 2, name: 'Portfolio_2025.pdf', type: 'PDF Document', url: '#' },
      { id: 3, name: 'Cover_Letter.pdf', type: 'PDF Document', url: '#' }
    ],
    notes: []
  }];

  const filteredCandidates = selectedTags.length === 0 
    ? bestCandidates 
    : bestCandidates.filter(candidate => 
        selectedTags.some(tag => candidate.tags.includes(tag))
      );
  
  // Animate counters on mount
  useEffect(() => {
    const duration = 5000; // 5 seconds
    const steps = 60; // 60 frames per second
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setApplicantsCount(Math.floor(targetApplicants * progress));
      setRejectionsCount(Math.floor(targetRejections * progress));
      setBestMatchesCount(Math.floor(targetBestMatches * progress));
      
      if (currentStep >= steps) {
        setApplicantsCount(targetApplicants);
        setRejectionsCount(targetRejections);
        setBestMatchesCount(targetBestMatches);
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  const jobs = [{
    id: 1,
    title: 'Senior Product Designer'
  }, {
    id: 2,
    title: 'Chief Operations Officer'
  }, {
    id: 3,
    title: 'Frontend Developer'
  }];

  const rejectedCandidates = [
    { id: 1, name: "Michael Johnson", email: ["michael.j@email.com", "m.johnson@work.com"], image: profile9, appliedDate: "2024-01-15" },
    { id: 2, name: "Sarah Williams", email: "sarah.w@email.com", image: profile10, appliedDate: "2024-01-16" },
    { id: 3, name: "David Brown", email: ["david.b@email.com", "d.brown@personal.com", "david@freelance.com"], image: profile11, appliedDate: "2024-01-17" },
    { id: 4, name: "Emily Davis", email: "emily.d@email.com", image: profile12, appliedDate: "2024-01-18" },
    { id: 5, name: "James Wilson", email: ["james.w@email.com", "j.wilson@company.com"], image: profile13, appliedDate: "2024-01-19" },
    { id: 6, name: "Lisa Anderson", email: "lisa.a@email.com", image: profile14, appliedDate: "2024-01-20" },
    { id: 7, name: "Robert Taylor", email: "robert.t@email.com", image: profile15, appliedDate: "2024-01-21" },
    { id: 8, name: "Jennifer Thomas", email: "jennifer.t@email.com", image: profile16, appliedDate: "2024-01-22" },
  ];
  return <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-[54px] bg-background flex items-center justify-between px-5 flex-shrink-0">
        {/* Left side - Back button and Jobs dropdown */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/')} className="w-7 h-7 rounded-md flex items-center justify-center transition-all bg-white hover:bg-gray-50 border border-gray-200">
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Jobs dropdown */}
          <div className="relative">
            <button onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all bg-white hover:bg-gray-50 border border-gray-200">
              <img src={jobDropdownIcon} alt="Job" className="w-4 h-4 rounded" />
              <span className="font-medium text-sm text-gray-700">Senior product designer</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-700" />
            </button>
            
            {jobsDropdownOpen && <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                {jobs.map(job => <button key={job.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left" onClick={() => setJobsDropdownOpen(false)}>
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
                    <span className="text-sm">{job.title}</span>
                  </button>)}
              </div>}
          </div>
        </div>

        {/* Center - Tabs */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-md" style={{
        backgroundColor: '#FAF8F4'
      }}>
          <button onClick={() => navigate('/job')} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm ${activeTab === 'job' ? 'bg-white border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Job
          </button>
          <button onClick={() => setActiveTab('people')} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm ${activeTab === 'people' ? 'bg-white border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            People
          </button>
          <button onClick={() => navigate('/job/pipeline')} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all text-sm ${activeTab === 'pipeline' ? 'bg-white border border-gray-200 text-gray-700 font-medium' : 'text-foreground hover:text-foreground'}`}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Pipeline
          </button>
        </div>

        {/* Right side - Profile, Invite, More */}
        <div className="flex items-center gap-2">
          <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
          <button 
            onClick={() => setInviteDialogOpen(true)}
            className="px-2.5 py-1 rounded-md text-sm font-medium transition-all bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
          >
            Invite
          </button>
          <button className="w-7 h-7 rounded-md flex items-center justify-center transition-all bg-white hover:bg-gray-50 border border-gray-200">
            <MoreVertical className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content - Flex layout without resizable */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Candidates View */}
        <div className={`flex-1 ${!isChatCollapsed ? 'mr-0' : ''}`}>
          <div className="h-full flex flex-col pt-6 pb-3 relative" style={{
          backgroundColor: '#FBFAF9'
        }}>
            <div className={`flex-1 overflow-y-auto relative scrollbar-hide ${isChatCollapsed ? 'mx-6' : 'ml-4 mr-2'}`}>
              <div className={`${selectedBestMatch ? 'pl-0 pr-0' : 'pl-0 pr-0'} max-w-[1200px]`}>
              {/* Header with stats - hide when profile is selected */}
                {!selectedBestMatch && (
                  <div className="mb-6 animate-slide-down-fade-in overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-lg font-medium text-foreground">{bestMatchesCount} of 230 people</h1>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white border border-[#EEEDEC] rounded-lg hover:bg-muted/50 transition-colors">
                          <Search className="w-3.5 h-3.5" />
                          <span className="text-muted-foreground">Searches (6)</span>
                        </button>
                      </div>
                    </div>

                    {/* Applicants and Rejections */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white border border-[#EEEDEC] rounded-xl p-5 relative">
                        <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                          <p className="text-sm text-slate-950">Applicants</p>
                        </div>
                        <p className="font-hedvig text-3xl font-semibold text-foreground mb-4">{applicantsCount}</p>
                        <button 
                          onClick={() => navigate('/job/applicants')}
                          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <span className="text-gray-950">Review now</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <div className="bg-white border border-[#EEEDEC] rounded-xl p-5 relative">
                        <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-destructive" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <path d="m15 9-6 6" />
                              <path d="m9 9 6 6" />
                            </svg>
                          </div>
                          <p className="text-sm text-gray-950">Rejections</p>
                        </div>
                        <p className="font-hedvig text-3xl font-semibold text-foreground mb-4">{rejectionsCount}</p>
                        <button 
                          onClick={() => setRejectionDialogOpen(true)}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span className="text-gray-950">Review now</span>
                          <svg fill="none" stroke="black" viewBox="0 0 24 24" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Best Matches Content */}
                {selectedBestMatch ? (
                  // Split view: header + list on left, detail panel on right - aligned at top
                  <div className="flex gap-4 h-[calc(100vh-90px)] animate-content-expand">
                    {/* Left side: header + candidate list */}
                    <div className="w-[40%] flex flex-col min-h-0">
                      {/* Best matches header */}
                      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                        <h2 className="font-hedvig font-medium text-foreground text-xl">
                          Best matches ({filteredCandidates.length})
                        </h2>
                        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-2">
                              <Filter className="w-3.5 h-3.5" />
                              Filter
                              {selectedTags.length > 0 && (
                                <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                                  {selectedTags.length}
                                </span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56" align="start">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm">Filter by tags</h4>
                              <div className="space-y-2">
                                {allTags.map(tag => (
                                  <div key={tag} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={tag}
                                      checked={selectedTags.includes(tag)}
                                      onCheckedChange={() => toggleTag(tag)}
                                    />
                                    <label
                                      htmlFor={tag}
                                      className="text-sm cursor-pointer"
                                    >
                                      {tag}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {selectedTags.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => setSelectedTags([])}
                                >
                                  Clear filters
                                </Button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* Candidate list */}
                      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                      {filteredCandidates.map(candidate => (
                        <div
                          key={candidate.id}
                          className={`bg-white border rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer ${
                            selectedBestMatch.id === candidate.id ? 'border-primary' : 'border-[#EEEDEC]'
                          }`}
                          onClick={() => setSelectedBestMatch(candidate)}
                        >
                          {/* Candidate header */}
                          <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                              <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-0.5">
                                <h3 className="text-sm font-medium text-foreground truncate">
                                  {candidate.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                  {candidate.isNew && (
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                  )}
                                  <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="5" width="18" height="14" rx="2" />
                                    <path d="m3 7 9 6 9-6" />
                                  </svg>
                                  <span className="text-xs text-muted-foreground">+5</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{candidate.city}</span>
                                <span>•</span>
                                <span className="font-medium text-lime-800">{candidate.match} match</span>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
                            {candidate.description}
                          </p>

                          {/* Experience summary */}
                          <p className="text-xs text-muted-foreground mb-2">
                            Experience · {8 + (candidate.id % 3)} yrs total
                          </p>

                          {/* Roles */}
                          <div className="space-y-2 mb-3">
                            {candidate.roles.slice(0, 2).map((role, idx) => {
                              const icon = getCompanyIcon(role.company);
                              return (
                                <div key={idx} className="flex items-center gap-2 text-xs">
                                  {/* Company icon */}
                                  <div 
                                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: icon.bg }}
                                  >
                                    <span className="text-[10px] font-bold" style={{ color: icon.text }}>{icon.letter}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-foreground truncate">{role.role}</p>
                                    <p className="text-muted-foreground truncate">
                                      {role.company} · Jun 2023 − Present · 6m
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Education */}
                          {candidate.education && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-2">Education</p>
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#8B0000]">
                                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-foreground truncate">{candidate.education.degree}</p>
                                  <p className="text-muted-foreground truncate">
                                    {candidate.education.school} · {candidate.education.graduationDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      </div>
                    </div>

                    {/* Detail Panel */}
                    <div className="w-[60%] bg-white border border-[#EEEDEC] rounded-xl overflow-hidden">
                      <CandidateDetailPanel
                        candidate={selectedBestMatch}
                        onClose={() => setSelectedBestMatch(null)}
                      />
                    </div>
                  </div>
                ) : (
                  // Default grid view with header
                  <>
                    {/* Best matches header */}
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="font-hedvig font-medium text-foreground text-xl">
                        Best matches ({filteredCandidates.length})
                      </h2>
                      <Popover open={filterOpen} onOpenChange={setFilterOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 gap-2">
                            <Filter className="w-3.5 h-3.5" />
                            Filter
                            {selectedTags.length > 0 && (
                              <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground rounded-full text-xs">
                                {selectedTags.length}
                              </span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="start">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm">Filter by tags</h4>
                            <div className="space-y-2">
                              {allTags.map(tag => (
                                <div key={tag} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`grid-${tag}`}
                                    checked={selectedTags.includes(tag)}
                                    onCheckedChange={() => toggleTag(tag)}
                                  />
                                  <label
                                    htmlFor={`grid-${tag}`}
                                    className="text-sm cursor-pointer"
                                  >
                                    {tag}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {selectedTags.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full"
                                onClick={() => setSelectedTags([])}
                              >
                                Clear filters
                              </Button>
                            )}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    {filteredCandidates.map(candidate => <div
                        key={candidate.id} 
                        className="bg-white border border-[#EEEDEC] rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer group relative"
                        onClick={() => setSelectedBestMatch(candidate)}
                      >
                        {candidate.isNew && (
                          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-primary text-primary-foreground rounded-full text-[10px] font-semibold">
                            <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></span>
                            NEW
                          </div>
                        )}
                        {/* Candidate header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                            <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-foreground mb-0.5 truncate">
                              {candidate.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                              <span>{candidate.city}</span>
                              <span>•</span>
                              <span className="font-medium text-lime-800">{candidate.match} Match</span>
                            </div>
                          </div>
                        </div>


                        {/* Description */}
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                          {candidate.description}
                        </p>

                        {/* Roles */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {candidate.roles.slice(0, 2).map((role, idx) => {
                            const isCurrent = candidate.currentRoleIndex === idx;
                            return (
                              <div 
                                key={idx} 
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted/50 rounded-lg text-xs"
                              >
                                  {role.company === 'Klarna' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FFB3C7]">
                                      <span className="text-[10px] font-bold" style={{
                                color: '#000'
                              }}>K</span>
                                    </div>}
                                  {role.company === 'Spotify' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#1DB954]">
                                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                      </svg>
                                    </div>}
                                  {role.company === 'Tink' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-black">
                                      <span className="text-[10px] font-bold text-white">T</span>
                                    </div>}
                                  {role.company === 'Asseco' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0066B3]">
                                      <span className="text-[10px] font-bold text-white">A</span>
                                    </div>}
                                  {role.company === 'H&M' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#E50010]">
                                      <span className="text-[8px] font-bold text-white">H&M</span>
                                    </div>}
                                  {role.company === 'Ericsson' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0082CE]">
                                      <span className="text-[10px] font-bold text-white">E</span>
                                    </div>}
                                  {role.company === 'Bambora' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#5E2CA5]">
                                      <span className="text-[10px] font-bold text-white">B</span>
                                    </div>}
                                  {role.company === 'iZettle' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#2DBECD]">
                                      <span className="text-[10px] font-bold text-white">iZ</span>
                                    </div>}
                                  {role.company === 'King' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6C00]">
                                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                      </svg>
                                    </div>}
                                  {role.company === 'Northmill' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00C896]">
                                      <span className="text-[10px] font-bold text-white">N</span>
                                    </div>}
                                  {role.company === 'Delivery Hero' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#D61F26]">
                                      <span className="text-[10px] font-bold text-white">DH</span>
                                    </div>}
                                  {role.company === 'Trustly' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0EE06E]">
                                      <span className="text-[10px] font-bold text-black">T</span>
                                    </div>}
                                  {role.company === 'Lunar' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-black">
                                      <span className="text-[10px] font-bold text-white">L</span>
                                    </div>}
                                  {role.company === 'Wrapp' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6C00]">
                                      <span className="text-[10px] font-bold text-white">W</span>
                                    </div>}
                                  {role.company === 'Zimpler' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00B67A]">
                                      <span className="text-[10px] font-bold text-white">Z</span>
                                    </div>}
                                  {role.company === 'Schibsted' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#FF6200]">
                                      <span className="text-[10px] font-bold text-white">S</span>
                                    </div>}
                                  {role.company === 'Avanza' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00C281]">
                                      <span className="text-[10px] font-bold text-white">A</span>
                                    </div>}
                                  {role.company === 'Collector Bank' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#002855]">
                                      <span className="text-[10px] font-bold text-white">C</span>
                                    </div>}
                                  {role.company === 'Tetra Pak' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#0033A0]">
                                      <span className="text-[10px] font-bold text-white">TP</span>
                                    </div>}
                                  {role.company === 'Sony Mobile' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-black">
                                      <span className="text-[10px] font-bold text-white">S</span>
                                    </div>}
                                  {role.company === 'Axis' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00A3E0]">
                                      <span className="text-[10px] font-bold text-white">A</span>
                                    </div>}
                                  {role.company === 'Tobii' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#00A3E0]">
                                      <span className="text-[10px] font-bold text-white">T</span>
                                    </div>}
                                  {role.company === 'Mojang' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#8B0000]">
                                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                        <rect x="4" y="4" width="6" height="6" />
                                        <rect x="14" y="4" width="6" height="6" />
                                        <rect x="4" y="14" width="6" height="6" />
                                        <rect x="14" y="14" width="6" height="6" />
                                      </svg>
                                    </div>}
                                  {role.company === 'Paradox' && <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#E03C31]">
                                      <span className="text-[10px] font-bold text-white">P</span>
                                    </div>}
                                  <span className="text-muted-foreground truncate">
                                    {role.role}
                                  </span>
                                  {isCurrent && (
                                    <span className="ml-auto pl-1.5 text-[9px] font-semibold text-primary uppercase tracking-wider">
                                      Current
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                        </div>

                        {/* Education */}
                        {candidate.education && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Education</p>
                            <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/50 rounded-lg text-xs">
                              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 bg-[#8B0000]">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                                </svg>
                              </div>
                              <span className="text-muted-foreground truncate">
                                {candidate.education.school} · {candidate.education.degree}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>)}
                    </div>
                  </>
                )}
              </div>

              {isChatCollapsed && <button onClick={() => setIsChatCollapsed(false)} className="absolute top-6 right-6 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200 z-10">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>}
            </div>
          </div>
        </div>

        {/* Right Panel - Chat - Fixed width, no resize handle */}
        {!isChatCollapsed && (
          <div className="w-[380px] flex-shrink-0">
            <JobChatPanel 
              defaultMessages={[{ text: 'I\'ve found 100 candidates matching your criteria. The search covered external sources (LinkedIn, GitHub, Dribbble) and internal sources (Network, Applied). The best matches are displayed based on their skills, experience, and cultural fit.', isUser: false }]}
              placeholder="Ask anything about the candidates..."
              onCollapse={() => setIsChatCollapsed(true)}
            />
          </div>
        )}
      </div>

      {/* Profile Dialog */}
      <ProfileDialog 
        candidate={selectedCandidate}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        onPrevious={() => {
          const currentIndex = bestCandidates.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex > 0) {
            setSelectedCandidate(bestCandidates[currentIndex - 1]);
          }
        }}
        onNext={() => {
          const currentIndex = bestCandidates.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < bestCandidates.length - 1) {
            setSelectedCandidate(bestCandidates[currentIndex + 1]);
          } else {
            setProfileDialogOpen(false);
          }
        }}
        onSkip={() => {
          const currentIndex = bestCandidates.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < bestCandidates.length - 1) {
            setSelectedCandidate(bestCandidates[currentIndex + 1]);
          } else {
            setProfileDialogOpen(false);
          }
        }}
      />

      {/* Applicant Review Dialog */}
      <ApplicantReviewDialog
        candidate={selectedCandidate}
        open={applicantReviewDialogOpen}
        onOpenChange={setApplicantReviewDialogOpen}
        onPrevious={() => {
          const applicants = bestCandidates.filter(c => c.tags.includes('Applicant'));
          const currentIndex = applicants.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex > 0) {
            setSelectedCandidate(applicants[currentIndex - 1]);
          }
        }}
        onNext={() => {
          const applicants = bestCandidates.filter(c => c.tags.includes('Applicant'));
          const currentIndex = applicants.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < applicants.length - 1) {
            setSelectedCandidate(applicants[currentIndex + 1]);
          } else {
            setApplicantReviewDialogOpen(false);
          }
        }}
        onSkip={() => {
          const applicants = bestCandidates.filter(c => c.tags.includes('Applicant'));
          const currentIndex = applicants.findIndex(c => c.id === selectedCandidate?.id);
          if (currentIndex < applicants.length - 1) {
            setSelectedCandidate(applicants[currentIndex + 1]);
          } else {
            setApplicantReviewDialogOpen(false);
          }
        }}
      />

      {/* Rejection Dialog */}
      <RejectionDialog
        open={rejectionDialogOpen}
        onOpenChange={setRejectionDialogOpen}
        candidates={rejectedCandidates}
      />

      {/* Invite Dialog */}
      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />

      {/* Bulk Contact Dialog */}
      <BulkContactDialog
        open={bulkContactDialogOpen}
        onOpenChange={setBulkContactDialogOpen}
        candidates={filteredCandidates}
      />
    </div>;
};
export default JobPeopleView;