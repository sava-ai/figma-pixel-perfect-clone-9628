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

// Profile images array to cycle through
const profileImages = [
  profile1, profile2, profile3, profile4, profile5,
  profile6, profile7, profile8, profile9, profile10,
  profile11, profile12, profile13, profile14, profile15,
  profile16, profile17, profile18, profile19, profile20,
];

export interface CandidateRole {
  company: string;
  role: string;
}

export interface CandidateEducation {
  school: string;
  degree: string;
  graduationDate: string;
}

export interface CandidateCriteria {
  icon: 'location' | 'briefcase' | 'clock' | 'graduation' | 'sparkles';
  label: string;
  status: 'full' | 'partial' | 'none' | 'unknown';
  required: boolean;
}

export interface Candidate {
  id: number;
  name: string;
  image: string;
  city: string;
  match: string;
  isNew: boolean;
  description: string;
  roles: CandidateRole[];
  currentRoleIndex?: number;
  isOpenToWork?: boolean;
  engagementRate: number;
  tags: string[];
  education: CandidateEducation;
  summary: string;
  skillTags: string[];
  coreCriteria: CandidateCriteria[];
  softSkills: CandidateCriteria[];
  linkedin?: string;
  languages?: string[];
}

const getRandomTags = () => {
  const allTags = ['AI sourced', 'Sourced', 'Database', 'Referred', 'Applicant'];
  return [allTags[Math.floor(Math.random() * allTags.length)]];
};

const getMatchScore = (experience: number): string => {
  if (experience >= 4) return `${Math.floor(Math.random() * 2) + 11}/12`;
  if (experience >= 3) return `${Math.floor(Math.random() * 2) + 9}/12`;
  return `${Math.floor(Math.random() * 2) + 7}/12`;
};

const getEngagementRate = (): number => Math.floor(Math.random() * 20) + 75;

export const bestCandidates: Candidate[] = [
  {
    id: 1,
    name: "Zoriana Ruda",
    image: profileImages[0],
    city: "Cracow",
    match: "10/12",
    isNew: true,
    description: "As a Business Development Specialist, my focus is on building relationships, driving sales, and identifying growth opportunities. I'm a highly motivated, responsible, sociable and very punctual person with strong lead generation and partnership skills.",
    roles: [
      { company: "Barbara Bang", role: "Lead Generation Manager" },
      { company: "SALESmanago", role: "Sales Development Representative" },
      { company: "ProtoQ", role: "Business Development Specialist" }
    ],
    currentRoleIndex: 0,
    engagementRate: 88,
    tags: ['AI sourced'],
    education: {
      school: "Taras Shevchenko National University of Kyiv",
      degree: "Bachelor's of Applied Mathematics",
      graduationDate: "2022"
    },
    summary: "Driven BD Specialist with 3+ years in lead generation and sales. Multilingual (EN, UA, PL, ES) with strong relationship-building skills.",
    skillTags: ['Lead Generation', 'B2B Sales', 'Strategic Partnerships'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Entrepreneurial mindset', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/zoriana-ruda-76b849219",
    languages: ['English', 'Ukrainian', 'Polish', 'Spanish'],
  },
  {
    id: 2,
    name: "Marta Filipovich",
    image: profileImages[1],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "Business development manager at Mitrix Technology with experience in IT services sales and outsourcing. Skilled at building client relationships and driving revenue growth in competitive B2B markets.",
    roles: [
      { company: "Mitrix Technology", role: "Business Development Manager" },
      { company: "Oxagile", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 82,
    tags: ['Sourced'],
    education: {
      school: "Warsaw University of Technology",
      degree: "Bachelor's in Information Technology",
      graduationDate: "2015"
    },
    summary: "BDM with IT outsourcing expertise. Strong track record in client acquisition and sales pipeline development.",
    skillTags: ['IT Sales', 'Business Development', 'Client Relationships'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Multilingual (EN, FR, PL)', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/martaphilipovich",
    languages: ['English', 'French', 'Polish'],
  },
  {
    id: 3,
    name: "David Crisanti",
    image: profileImages[2],
    city: "Cracow",
    match: "10/12",
    isNew: false,
    description: "Account Executive specializing in IP telephony and telecommunications solutions. Focus on driving sales growth and delivering exceptional value to clients through consultative selling and strong relationship management.",
    roles: [
      { company: "UNITALK", role: "Account Executive" },
      { company: "Google", role: "Business Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 91,
    tags: ['AI sourced'],
    education: {
      school: "Uniwersytet Ekonomiczny w Krakowie",
      degree: "Master, Tourism and Travel Services Management",
      graduationDate: "2021"
    },
    summary: "Account Executive with Google BDR background. Expert in consultative selling and telecommunications solutions.",
    skillTags: ['Account Management', 'Consultative Selling', 'Telecommunications'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (IT, PL, EN, DE, ES)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Solution selling', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/david-crisanti-280450267",
    languages: ['Italian', 'Polish', 'English', 'German', 'Spanish'],
  },
  {
    id: 4,
    name: "Valeriia Ushakova",
    image: profileImages[3],
    city: "Warsaw",
    match: "11/12",
    isNew: true,
    description: "IT Sales Specialist at SoftServe with 108% quota achievement and 35+ monthly qualified leads. Marketing background gives unique edge in translating complex technical solutions into clear business value.",
    roles: [
      { company: "SoftServe", role: "IT Sales Specialist" }
    ],
    currentRoleIndex: 0,
    engagementRate: 94,
    tags: ['AI sourced'],
    education: {
      school: "University",
      degree: "Marketing",
      graduationDate: "2022"
    },
    summary: "High-performing IT Sales Specialist with 108% quota achievement. Strong marketing background with Salesforce and HubSpot expertise.",
    skillTags: ['Enterprise Software', 'Digital Marketing', 'Pipeline Management'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Data-driven approach', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/valeriia-ushakova-7553a4194",
  },
  {
    id: 5,
    name: "Mustafa A.",
    image: profileImages[4],
    city: "Cracow",
    match: "8/12",
    isNew: false,
    description: "Sales Development Representative at Akamai Technologies empowering enterprises with cutting-edge security solutions. Focused on driving pipeline growth through personalized outreach and strategic partnerships.",
    roles: [
      { company: "Akamai Technologies", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 79,
    tags: ['Database'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2022"
    },
    summary: "SDR at Akamai focused on enterprise security solutions. Strong in strategic partnerships and pipeline development.",
    skillTags: ['SaaS', 'Security Solutions', 'Strategic Partnerships'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Technology expertise', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/mustafa-a-077256175",
  },
  {
    id: 6,
    name: "Filip Balewski",
    image: profileImages[5],
    city: "Gdańsk",
    match: "9/12",
    isNew: true,
    description: "Senior Sales Development Representative at PinMeTo with nearly 3 years of experience progressing from SDR Sales Assistant to Senior SDR. Proven track record in SaaS sales and client development.",
    roles: [
      { company: "PinMeTo", role: "Senior Sales Development Representative" },
      { company: "PinMeTo", role: "Sales Development Representative" },
      { company: "PinMeTo", role: "SDR Sales Assistant" }
    ],
    currentRoleIndex: 0,
    engagementRate: 84,
    tags: ['Sourced'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2022"
    },
    summary: "Senior SDR with rapid career progression at PinMeTo. Demonstrated ability to grow within organization and exceed targets.",
    skillTags: ['SaaS Sales', 'Lead Development', 'Client Relations'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Career progression', status: 'full', required: false },
      { icon: 'sparkles', label: 'Self-motivated', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/filip-balewski-076b61271",
  },
  {
    id: 7,
    name: "Jerson Sipanela",
    image: profileImages[6],
    city: "Warsaw",
    match: "10/12",
    isNew: false,
    description: "Business Development Manager at Nielsen driving revenue and generating sales for the industry leader in Marketing data. Strong at building relationships with clients and understanding their needs.",
    roles: [
      { company: "Nielsen", role: "Business Development Manager" },
      { company: "Kontakt.io", role: "Account Manager" },
      { company: "Kontakt.io", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 87,
    tags: ['AI sourced'],
    education: {
      school: "Vistula University",
      degree: "Bachelor of Engineering, Computer Science",
      graduationDate: "2025"
    },
    summary: "BDM at Nielsen with IoT and marketing data expertise. Strong technical background combined with sales excellence.",
    skillTags: ['Marketing Data', 'IoT Solutions', 'Account Management'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Technical background', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/jerson-sipanela-637630191",
  },
  {
    id: 8,
    name: "Harutyun Aslanyan",
    image: profileImages[7],
    city: "Klaipeda",
    match: "10/12",
    isNew: true,
    description: "B2B Sales and Business Development enthusiast with 4+ years of experience. 24/7 Business Development mindset with strong focus on pipeline management and CRM optimization.",
    roles: [
      { company: "Perfection42", role: "Business Development Manager" },
      { company: "Perfection42", role: "Sales Development Representative" },
      { company: "Perfection42", role: "Senior Lead Research Specialist" }
    ],
    currentRoleIndex: 0,
    engagementRate: 85,
    tags: ['Referred'],
    education: {
      school: "LCC International University, Lithuania",
      degree: "Bachelor of Business Administration, International Business",
      graduationDate: "2024"
    },
    summary: "BDM with 4+ years in B2B sales. Strong CRM expertise and proven career growth within organizations.",
    skillTags: ['B2B Sales', 'Cold Calling', 'CRM Management'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Lithuania', status: 'partial', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (EN, RU, AM, LT)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Entrepreneurial mindset', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/haslanyan",
    languages: ['English', 'Russian', 'Armenian', 'Lithuanian'],
  },
  {
    id: 9,
    name: "Aleksandar Angelov",
    image: profileImages[8],
    city: "Sofia",
    match: "9/12",
    isNew: false,
    description: "Results-driven Senior Sales Executive specializing in enterprise solutions with expertise in creating customized sales strategies. Previously Senior SDR at Shopify and BDR at Acronis.",
    roles: [
      { company: "Shopify", role: "Senior SDR" },
      { company: "Acronis", role: "BDR" },
      { company: "ExxonMobil", role: "OTS-Contract Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 86,
    tags: ['AI sourced'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2020"
    },
    summary: "Senior Sales Executive with Shopify and Acronis experience. Expert in enterprise solutions and customized sales strategies.",
    skillTags: ['Enterprise Solutions', 'E-commerce', 'Pipeline Management'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Bulgaria', status: 'partial', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (BG, EN, IT)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Strategic thinking', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/aleksandar-angelov-200957251",
    languages: ['Bulgarian', 'English', 'Italian'],
  },
  {
    id: 10,
    name: "Daria Chyncheva",
    image: profileImages[9],
    city: "Warsaw",
    match: "10/12",
    isNew: true,
    description: "Sales Account Manager at Halo Lab with 4 years of experience in tech services sales and business development. Expert at bringing together the right elements for business growth and project success.",
    roles: [
      { company: "Halo Lab", role: "Sales Account Manager" },
      { company: "Halo Lab", role: "Project Manager" },
      { company: "Depo Studio", role: "Project Account Manager Sales Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 89,
    tags: ['Sourced'],
    education: {
      school: "Taras Shevchenko National University of Kyiv",
      degree: "Bachelor's, Business Administration",
      graduationDate: "2025"
    },
    summary: "Sales Account Manager with 4 years in tech services. Strong project management skills and SaaS sales expertise.",
    skillTags: ['SaaS', 'Tech Services', 'Project Management'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (EN, ES, UA)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Creative problem solving', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/daria-chyncheva-5006b61b5",
    languages: ['English', 'Spanish', 'Ukrainian'],
  },
  {
    id: 11,
    name: "Hadil Obeid",
    image: profileImages[10],
    city: "Warsaw",
    match: "9/12",
    isNew: false,
    description: "Digital Marketing Specialist with 3+ years experience spanning Google Ads, business development, and account management. Strong analytical skills with experience in B2B aviation and tech sectors.",
    roles: [
      { company: "TTEC", role: "Digital Marketing Specialist Google Ads" },
      { company: "StorkJet", role: "Mid-level Business Development Account Manager" },
      { company: "StorkJet", role: "Junior Sales Business Development Specialist" }
    ],
    currentRoleIndex: 0,
    engagementRate: 81,
    tags: ['Database'],
    education: {
      school: "Jagiellonian University",
      degree: "Master's, Business and Finance Management",
      graduationDate: "2025"
    },
    summary: "BD Account Manager with digital marketing expertise. Strong analytical background in aviation and tech sectors.",
    skillTags: ['Digital Marketing', 'Google Ads', 'B2B Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Analytical mindset', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/hadil-obeid9",
  },
  {
    id: 12,
    name: "Marcel Kokoszkiewicz",
    image: profileImages[11],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "Business Development Representative helping companies gain technological edge through modern IT solutions. Focus on digital transformation, customer acquisition, and consultative sales approach.",
    roles: [
      { company: "Omega Code", role: "Business Development Representative" },
      { company: "Phinance S.A.", role: "Senior Partner's Assistant" },
      { company: "Omega Code", role: "Sales Assistant" }
    ],
    currentRoleIndex: 0,
    engagementRate: 83,
    tags: ['AI sourced'],
    education: {
      school: "Kozminski University",
      degree: "Bachelor's, Management",
      graduationDate: "2026"
    },
    summary: "BDR focused on digital transformation and IT solutions. Strong presentation skills and customer acquisition expertise.",
    skillTags: ['Digital Transformation', 'IT Solutions', 'Customer Acquisition'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (EN, PL, ES)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Consultative approach', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/marcel-kokoszkiewicz-a0477322b",
  },
  {
    id: 13,
    name: "Ryugo Kimura",
    image: profileImages[12],
    city: "Warsaw",
    match: "10/12",
    isNew: false,
    description: "Co-Founder of Agency Leaders (marketing agency) and Owner of RK Digital. Generalist specialized in marketing & sales with 4+ years experience including Account Management at 10Clouds.",
    roles: [
      { company: "Agency Leaders", role: "Co-Founder" },
      { company: "RK Digital", role: "Owner" },
      { company: "10Clouds", role: "Account Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 90,
    tags: ['Referred'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2020"
    },
    summary: "Entrepreneur with 4+ years in SaaS sales and account management. Strong Salesforce expertise and startup experience.",
    skillTags: ['SaaS', 'Account Management', 'Entrepreneurship'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Bilingual (EN, PL)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Entrepreneurial mindset', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/ryugo-robert-kimura",
    languages: ['English', 'Polish'],
  },
  {
    id: 14,
    name: "Klaudiusz I.",
    image: profileImages[13],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "Sales Development Representative at Pretius specializing in custom software and Low-code solutions. Focus on identifying synergies between business needs and technical capabilities.",
    roles: [
      { company: "Pretius", role: "Sales Development Representative" },
      { company: "WAAT AI Labs", role: "Partner" },
      { company: "RevGenius", role: "Member" }
    ],
    currentRoleIndex: 0,
    engagementRate: 82,
    tags: ['Sourced'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2022"
    },
    summary: "SDR at Pretius with focus on custom software and Low-code solutions. Strong in digital transformation sales.",
    skillTags: ['Custom Software', 'Low-code', 'Digital Transformation'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Technical understanding', status: 'full', required: false },
      { icon: 'sparkles', label: 'Solution-oriented', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/iklaudiusz",
  },
  {
    id: 15,
    name: "Ravan Jalilzade",
    image: profileImages[14],
    city: "Cracow",
    match: "10/12",
    isNew: false,
    description: "Sales Development Representative at Altamira with 3.5 years experience. Also serves as Project Development Manager at Dinemates. Strong focus on market research and account planning.",
    roles: [
      { company: "Altamira", role: "Sales Development Representative" },
      { company: "Dinemates", role: "Project Development Manager" },
      { company: "Buglance", role: "Product Business Development" }
    ],
    currentRoleIndex: 0,
    engagementRate: 86,
    tags: ['AI sourced'],
    education: {
      school: "University of Cologne",
      degree: "MBA, Computer and Information Sciences",
      graduationDate: "2021"
    },
    summary: "SDR with MBA background and strong project development skills. Experience in market research and account planning.",
    skillTags: ['Account Planning', 'Market Research', 'Project Development'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Strategic planning', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/ravan-jalilzade-057ab81b1",
  },
  {
    id: 16,
    name: "Anna Kontsevich",
    image: profileImages[15],
    city: "Warsaw",
    match: "8/12",
    isNew: true,
    description: "Business Development Manager in IT outsourcing sector handling full-cycle deals from lead generation to closing. Focus on client acquisition, mentoring, and process automation.",
    roles: [
      { company: "Mifort", role: "Business Development Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 78,
    tags: ['Database'],
    education: {
      school: "Belarusian State Economic University",
      degree: "Bachelor's, Business/Corporate Communications",
      graduationDate: "2022"
    },
    summary: "BDM with IT outsourcing expertise. Full-cycle sales experience with focus on mentoring and automation.",
    skillTags: ['IT Outsourcing', 'Full-cycle Sales', 'Lead Generation'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (EN, ES, CN)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Mentoring skills', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/anna-kontsevich-b09909204",
    languages: ['English', 'Spanish', 'Chinese'],
  },
  {
    id: 17,
    name: "Wiktoria Tryniszewska",
    image: profileImages[16],
    city: "Warsaw",
    match: "9/12",
    isNew: false,
    description: "Junior Sales Specialist at Microsoft with diverse experience including Key Account Management at Wipasz S.A. Strong organizational skills and HR background.",
    roles: [
      { company: "Microsoft", role: "Junior Sales Specialist" },
      { company: "Wipasz S.A.", role: "Key Account Manager" },
      { company: "Bosch Polska", role: "Human Resources Intern" }
    ],
    currentRoleIndex: 0,
    engagementRate: 84,
    tags: ['Sourced'],
    education: {
      school: "SGH Warsaw School of Economics",
      degree: "Master's, Management",
      graduationDate: "2025"
    },
    summary: "Microsoft Sales Specialist with KAM experience. Strong HR background and organizational excellence.",
    skillTags: ['Microsoft', 'Key Account Management', 'Enterprise Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Organizational excellence', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/wiktoria-tryniszewska-3a9432259",
  },
  {
    id: 18,
    name: "Illia Siankevich",
    image: profileImages[17],
    city: "Warsaw",
    match: "10/12",
    isNew: true,
    description: "Account Executive & Partnerships Lead at Supreme Solutions with 3+ years experience. Business-focused with marketing operations, sales and BD background. Data-driven approach to digital growth.",
    roles: [
      { company: "Supreme Solutions", role: "Account Executive Partnerships Lead" },
      { company: "Umbrelly", role: "Sales Development Representative" },
      { company: "TÜV SÜD", role: "Business Development" }
    ],
    currentRoleIndex: 0,
    engagementRate: 88,
    tags: ['AI sourced'],
    education: {
      school: "Collegium Civitas",
      degree: "Bachelor's, Marketing & Advertising",
      graduationDate: "Present"
    },
    summary: "AE & Partnerships Lead with strong marketing operations background. Data-driven approach with HubSpot expertise.",
    skillTags: ['Partnerships', 'Marketing Operations', 'B2B Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Data-driven', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/ilyasenkevich",
  },
  {
    id: 19,
    name: "Darya Kavaliuk",
    image: profileImages[18],
    city: "Warsaw",
    match: "10/12",
    isNew: false,
    description: "Business Development Manager at ONIX Consulting with expertise in IT outsourcing and consulting services. Strong track record in enterprise client acquisition and relationship management.",
    roles: [
      { company: "ONIX Consulting", role: "Business Development Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 87,
    tags: ['Referred'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2020"
    },
    summary: "BDM at ONIX Consulting with IT outsourcing expertise. Strong enterprise client acquisition skills.",
    skillTags: ['IT Consulting', 'Enterprise Sales', 'Client Relationships'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Relationship building', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/darya-k",
  },
  {
    id: 20,
    name: "Benjamin Wen",
    image: profileImages[19],
    city: "Warsaw",
    match: "8/12",
    isNew: true,
    description: "Business Development Manager with 3 years experience focusing on Chinese market expansion. Unique cultural expertise bridging Western and Eastern business practices.",
    roles: [
      { company: "Company", role: "Business Development Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 79,
    tags: ['Database'],
    education: {
      school: "Nottingham Trent University",
      degree: "Bachelor's",
      graduationDate: "2021"
    },
    summary: "BDM with Chinese market expertise. Unique ability to bridge Western and Eastern business practices.",
    skillTags: ['Chinese Market', 'Cross-cultural', 'Presentations'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Chinese cultural expertise', status: 'full', required: false },
      { icon: 'sparkles', label: 'Cross-cultural communication', status: 'full', required: false },
    ],
  },
  {
    id: 21,
    name: "Patrycja Kwolek",
    image: profileImages[0],
    city: "Cracow",
    match: "9/12",
    isNew: false,
    description: "Google Ads Account Strategist at TTEC with previous BD experience at SaaS companies. Strong background in cloud technology and mobile applications.",
    roles: [
      { company: "TTEC", role: "Google Ads Account Strategist" },
      { company: "Iwasoft", role: "Business Development Manager" },
      { company: "SALESmanago", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 83,
    tags: ['AI sourced'],
    education: {
      school: "Karpacka Państwowa Uczelnia",
      degree: "Bachelor's, English Philology",
      graduationDate: "2020"
    },
    summary: "Google Ads strategist with SaaS BD experience. Strong in cloud technology and automotive/electronics sectors.",
    skillTags: ['Google Ads', 'Cloud Technology', 'SaaS Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Digital marketing', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/patrycja-kwolek-6023091ba",
  },
  {
    id: 22,
    name: "Dominik Bajda",
    image: profileImages[1],
    city: "Warsaw",
    match: "10/12",
    isNew: true,
    description: "Key Account Manager at I know IT with proven track record in driving B2B and B2C sales growth. Strong negotiation skills and cross-selling expertise.",
    roles: [
      { company: "I know IT", role: "Key Account Manager" },
      { company: "Carsan Solutions", role: "Sales Specialist (AutoFus Group)" },
      { company: "Firmowe Finanse", role: "Credit Expert" }
    ],
    currentRoleIndex: 0,
    engagementRate: 86,
    tags: ['Sourced'],
    education: {
      school: "Kozminski University",
      degree: "Bachelor's, Economics",
      graduationDate: "Present"
    },
    summary: "KAM with B2B and B2C sales expertise. Strong negotiation and cross-selling skills in IT sector.",
    skillTags: ['Key Accounts', 'B2B/B2C Sales', 'Negotiations'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Negotiation skills', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/dominik-bajda-267060213",
  },
  {
    id: 23,
    name: "Ashwanth P",
    image: profileImages[2],
    city: "Warsaw",
    match: "8/12",
    isNew: false,
    description: "Sales Development Specialist with 2 years experience in inside sales and business development. Strong track record at upGrad and OutperformIQ.",
    roles: [
      { company: "Upreak India", role: "Sales Development Specialist" },
      { company: "upGrad", role: "Inside Sales Representative" },
      { company: "OutperformIQ", role: "Senior Business Development Executive" }
    ],
    currentRoleIndex: 0,
    engagementRate: 77,
    tags: ['Database'],
    education: {
      school: "Kannur University",
      degree: "Bachelor of Commerce",
      graduationDate: "2021"
    },
    summary: "Sales Development Specialist with strong inside sales background. Experience in EdTech and B2B sectors.",
    skillTags: ['Inside Sales', 'Business Development', 'EdTech'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Self-motivated', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/ashwanth-k-p-8b6164235",
  },
  {
    id: 24,
    name: "Jakub Zieleniewicz",
    image: profileImages[3],
    city: "Warsaw",
    match: "10/12",
    isNew: true,
    description: "Sales Development Representative at User.com with 4+ years experience. Strong progression from Junior BDM to SDR roles at Docplanner in healthcare tech sector.",
    roles: [
      { company: "User.com", role: "Sales Development Representative" },
      { company: "Docplanner", role: "Junior Business Development Manager" },
      { company: "Docplanner", role: "Junior Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 85,
    tags: ['AI sourced'],
    education: {
      school: "Uniwersytet Gdański",
      degree: "Bachelor's",
      graduationDate: "2023"
    },
    summary: "SDR with 4+ years in healthcare tech and SaaS. Strong career progression and cold calling expertise.",
    skillTags: ['Healthcare Tech', 'Cold Calling', 'SaaS Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Career progression', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/jakub-zieleniewicz-15a3aa232",
  },
  {
    id: 25,
    name: "Olga Filipowicz",
    image: profileImages[4],
    city: "Warsaw",
    match: "10/12",
    isNew: false,
    description: "Partner Marketing Sales Specialist at Microsoft with 4+ years experience. SGH graduate with strong marketing strategy and campaign management skills.",
    roles: [
      { company: "Microsoft", role: "Partner Marketing Sales Specialist" },
      { company: "AB S.A.", role: "Microsoft Devices Sales Marketing Specialist" },
      { company: "Microsoft", role: "Partner Account Sales Specialist" }
    ],
    currentRoleIndex: 0,
    engagementRate: 91,
    tags: ['Referred'],
    education: {
      school: "SGH Warsaw School of Economics",
      degree: "Master's, HR Business Partner",
      graduationDate: "2024"
    },
    summary: "Microsoft Partner Marketing Specialist with 4+ years. Strong strategy development and partner management skills.",
    skillTags: ['Microsoft', 'Partner Marketing', 'Strategy'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Bilingual (EN, DE)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Strategic thinking', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/olga-filipowicz-265a09220",
  },
  {
    id: 26,
    name: "Ali Aliyev",
    image: profileImages[5],
    city: "Cracow",
    match: "8/12",
    isNew: true,
    description: "Sales Development Representative with experience at Envio and Arlitech. Background in international business with strong analytical skills and multilingual capabilities.",
    roles: [
      { company: "Envio", role: "Sales Development Representative" },
      { company: "Arlitech Ltd.", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 76,
    tags: ['Sourced'],
    education: {
      school: "WSB University",
      degree: "Master's, International Business",
      graduationDate: "2025"
    },
    summary: "SDR with international business background. Multilingual with strong analytical and financial skills.",
    skillTags: ['International Business', 'Analytics', 'Multilingual'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'none', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (EN, RU, TR, AZ, FR)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Analytical mindset', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/alialiyev1",
    languages: ['English', 'Russian', 'Turkish', 'Azerbaijani', 'French'],
  },
  {
    id: 27,
    name: "Natalie Tapfuma",
    image: profileImages[6],
    city: "Szczecin",
    match: "8/12",
    isNew: false,
    description: "Account Executive at Vonage with proficiency in outbound and inbound sales. Target-driven mindset with exceptional spoken English skills fostering business growth.",
    roles: [
      { company: "Vonage", role: "Account Executive" },
      { company: "University", role: "Administrative Intern" },
      { company: "Africom Holdings", role: "Talent Sourcer" }
    ],
    currentRoleIndex: 0,
    engagementRate: 80,
    tags: ['AI sourced'],
    education: {
      school: "WSSP",
      degree: "Bachelor's",
      graduationDate: "2024"
    },
    summary: "Account Executive at Vonage with strong outbound/inbound sales skills. Target-driven with exceptional English.",
    skillTags: ['Account Executive', 'Outbound Sales', 'Target-driven'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Exceptional English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Target-driven', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/natalie-tapfuma-005b5b253",
  },
  {
    id: 28,
    name: "Svitlana Liuchshanska",
    image: profileImages[7],
    city: "Warsaw",
    match: "8/12",
    isNew: true,
    description: "SDR at Peppernode with experience in software development sales. Focus on full-cycle development, dedicated teams, and helping startups digitize existing businesses.",
    roles: [
      { company: "Peppernode", role: "SDR" },
      { company: "Softkit", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 78,
    tags: ['Database'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2021"
    },
    summary: "SDR with software development sales expertise. Experience in startup and SMB sectors.",
    skillTags: ['Software Sales', 'Startups', 'Technical Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Technical understanding', status: 'full', required: false },
      { icon: 'sparkles', label: 'Startup experience', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/svitlana-liushchanska-9922b01b4",
  },
  {
    id: 29,
    name: "Oleksandra Lyskova",
    image: profileImages[8],
    city: "Cracow",
    match: "10/12",
    isNew: false,
    description: "B2B Manager with 4 years experience at KUNA Pay, Promodo, and EventsWallet. Proficient in identifying and engaging potential clients across various industries with strong CRM management.",
    roles: [
      { company: "KUNA Pay", role: "B2B Manager" },
      { company: "Promodo", role: "B2B Manager" },
      { company: "EventsWallet", role: "B2B Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 87,
    tags: ['Sourced'],
    education: {
      school: "Lviv Polytechnic National University",
      degree: "Bachelor's, Marketing",
      graduationDate: "2022"
    },
    summary: "B2B Manager with 4 years experience across fintech and events. Strong CRM and lead nurturing expertise.",
    skillTags: ['B2B Management', 'Fintech', 'CRM'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'CRM expertise', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/oleksandra-lyskova-a5765822b",
  },
  {
    id: 30,
    name: "John Bartkowiak",
    image: profileImages[9],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "EMEA Business Development Representative at Clorce (Salesforce Partner since 2015). Expertise in Salesforce implementation, consulting, training and audit.",
    roles: [
      { company: "Clorce", role: "EMEA Business Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 82,
    tags: ['AI sourced'],
    education: {
      school: "SGH Warsaw School of Economics",
      degree: "Bachelor's, Sales Management",
      graduationDate: "2023"
    },
    summary: "EMEA BDR at Salesforce partner. Expertise in CRM implementation, consulting and training.",
    skillTags: ['Salesforce', 'CRM Consulting', 'EMEA Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Salesforce expertise', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/johnbartkowiak",
  },
  {
    id: 31,
    name: "Anastasiia Karpinets",
    image: profileImages[10],
    city: "Warsaw",
    match: "8/12",
    isNew: false,
    description: "Ambitious Sales Development Representative at Reelly.ai focused on real estate market. Skilled at connecting top agents and developers with high-potential opportunities.",
    roles: [
      { company: "Reelly.ai", role: "Sales Development Representative" },
      { company: "Code & Care", role: "Junior Sales Manager" },
      { company: "NDA", role: "Administrator" }
    ],
    currentRoleIndex: 0,
    engagementRate: 79,
    tags: ['Referred'],
    education: {
      school: "University of Warsaw",
      degree: "Bachelor's, Marketing Management",
      graduationDate: "2027"
    },
    summary: "SDR in real estate tech with strong relationship building skills. Multilingual with innovation focus.",
    skillTags: ['Real Estate Tech', 'Relationship Building', 'PropTech'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Multilingual (DE, EN, PL, UA, ES)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Results-oriented', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/anastasiia-karpinets-36203a290",
    languages: ['German', 'English', 'Polish', 'Ukrainian', 'Spanish'],
  },
  {
    id: 32,
    name: "Diana Negrea",
    image: profileImages[11],
    city: "Bucharest",
    match: "9/12",
    isNew: true,
    description: "Sales Development Representative at Flipsnack with diverse background including opportunity analysis at Genpact and tax consulting at KPMG. Strategic management expertise.",
    roles: [
      { company: "Flipsnack", role: "Sales Development Representative" },
      { company: "Genpact", role: "Senior Opportunity Analyst" },
      { company: "KPMG", role: "Tax Assistant" }
    ],
    currentRoleIndex: 0,
    engagementRate: 84,
    tags: ['Database'],
    education: {
      school: "Rotterdam School of Management, Erasmus University",
      degree: "Master's, Strategic Management",
      graduationDate: "2023"
    },
    summary: "SDR with strategic management background from RSM. Experience in opportunity analysis and tax consulting.",
    skillTags: ['Strategic Management', 'Opportunity Analysis', 'SaaS'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Romania', status: 'partial', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Strategic thinking', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/diana-negrea-172008209",
  },
  {
    id: 33,
    name: "Ekemini Udosen",
    image: profileImages[12],
    city: "Warsaw",
    match: "7/12",
    isNew: false,
    description: "Sales Development Representative and Account Executive at Vonage with nearly 2 years of experience in telecommunications and cloud communications.",
    roles: [
      { company: "Vonage", role: "Sales Development Representative" },
      { company: "Vonage", role: "Account Executive" }
    ],
    currentRoleIndex: 0,
    engagementRate: 75,
    tags: ['AI sourced'],
    education: {
      school: "WSPA Lublin",
      degree: "Bachelor's",
      graduationDate: "Present"
    },
    summary: "SDR/AE at Vonage with telecommunications expertise. Growing in cloud communications sales.",
    skillTags: ['Telecommunications', 'Cloud Communications', 'Account Executive'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'none', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'partial', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Quick learner', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/ekemini-udosen-7bbba3235",
  },
  {
    id: 34,
    name: "Konrad Kudlak",
    image: profileImages[13],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "Business Development Executive at Nomentia and Sales Force Europe with 2.5 years experience. Strong inside sales and export experience with German language skills.",
    roles: [
      { company: "Nomentia", role: "Business Development Executive" },
      { company: "Sales Force Europe", role: "Business Development Executive" },
      { company: "LRT Automotive GmbH", role: "Account Manager Key Account" }
    ],
    currentRoleIndex: 0,
    engagementRate: 83,
    tags: ['Sourced'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2022"
    },
    summary: "BD Executive with inside sales and export experience. Trilingual (PL, DE, EN) with automotive sector background.",
    skillTags: ['Inside Sales', 'Export', 'Automotive'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Trilingual (PL, DE, EN)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Export experience', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/konrad-kudlak-515359282",
    languages: ['Polish', 'German', 'English'],
  },
  {
    id: 35,
    name: "Olha Apanasenko",
    image: profileImages[14],
    city: "Cracow",
    match: "10/12",
    isNew: false,
    description: "SDR Sales Operations at Phenomenon Studio with nearly 4 years BD experience. Integral team member focused on collaboration and excellence in sales operations.",
    roles: [
      { company: "Phenomenon Studio", role: "SDR Sales Operations" },
      { company: "dreambit LLC", role: "Business Development Manager" },
      { company: "Lazarev.", role: "Business Development And Relationship Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 88,
    tags: ['Referred'],
    education: {
      school: "O.M. Beketov National University",
      degree: "Bachelor's",
      graduationDate: "2025"
    },
    summary: "SDR Sales Operations with nearly 4 years BD experience. Strong relationship building and sales process optimization.",
    skillTags: ['Sales Operations', 'Relationship Building', 'Process Optimization'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Bilingual (EN, UA)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Sales operations', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/olha-apanasenko",
    languages: ['English', 'Ukrainian'],
  },
  {
    id: 36,
    name: "Martyna Smerczek",
    image: profileImages[15],
    city: "Gliwice",
    match: "8/12",
    isNew: true,
    description: "Junior Sales Representative at Euvic Solutions with experience in technical customer service. Ambitious and determined with strong client-facing skills.",
    roles: [
      { company: "Euvic Solutions S.A.", role: "Junior Sales Representative" },
      { company: "AT&T", role: "Customer Service Center Employee" }
    ],
    currentRoleIndex: 0,
    engagementRate: 77,
    tags: ['Database'],
    education: {
      school: "Uniwersytet Gdański",
      degree: "Bachelor's",
      graduationDate: "Present"
    },
    summary: "Junior Sales Rep at Euvic Solutions. Customer service background with technical aptitude.",
    skillTags: ['Technical Sales', 'Customer Service', 'IT Solutions'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'partial', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Bilingual (EN, IT)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Customer focus', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/martyna-smerczek-8a300b327",
  },
  {
    id: 37,
    name: "Parsa Jabbari",
    image: profileImages[16],
    city: "Wroclaw",
    match: "10/12",
    isNew: false,
    description: "Inside Sales Account Manager at Aptean specializing in supply chain technology, AI solutions. B2B SaaS expertise with strong technical understanding.",
    roles: [
      { company: "Aptean", role: "Inside Sales Account Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 86,
    tags: ['AI sourced'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2020"
    },
    summary: "Inside Sales AM at Aptean with supply chain and AI expertise. Strong B2B SaaS account management skills.",
    skillTags: ['Supply Chain Tech', 'AI Solutions', 'B2B SaaS'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Technical expertise', status: 'full', required: false },
      { icon: 'sparkles', label: 'AI knowledge', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/parsa-jabbari-abbb29177",
  },
  {
    id: 38,
    name: "Sandra Kosińska",
    image: profileImages[17],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "Business Development Representative at Snoika generating inbound leads daily. Driven BDM with strong track record in Sales and Customer Success across Polish market.",
    roles: [
      { company: "Snoika", role: "Business Development Representative" },
      { company: "AIESEC in Poland", role: "Auditor" },
      { company: "AIESEC in Poland", role: "Head Of Public Relations" }
    ],
    currentRoleIndex: 0,
    engagementRate: 82,
    tags: ['Sourced'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2023"
    },
    summary: "BDR at Snoika with strong inbound lead generation. AIESEC leadership experience in PR and auditing.",
    skillTags: ['Inbound Leads', 'Public Relations', 'Growth Strategies'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Leadership experience', status: 'full', required: false },
      { icon: 'sparkles', label: 'Consultative selling', status: 'full', required: false },
    ],
  },
  {
    id: 39,
    name: "Kamil Borawski",
    image: profileImages[18],
    city: "Gdańsk",
    match: "10/12",
    isNew: false,
    description: "Account Strategist at Google with 3.5 years experience. Previously Senior Account Executive at Revolut and Sales Executive at Glovo. Strong B2B and B2C sales expertise.",
    roles: [
      { company: "Google", role: "Account Strategist" },
      { company: "Revolut", role: "Senior Account Executive" },
      { company: "Glovo", role: "Sales Executive Expansion" }
    ],
    currentRoleIndex: 0,
    engagementRate: 92,
    tags: ['AI sourced'],
    education: {
      school: "Wyższa Szkoła Bankowa w Gdańsku",
      degree: "Bachelor's, Marketing",
      graduationDate: "2023"
    },
    summary: "Google Account Strategist with Revolut and Glovo experience. Strong B2B/B2C and fintech expertise.",
    skillTags: ['Google', 'Fintech', 'Account Strategy'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Bilingual (EN, PL)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Enterprise experience', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/kamil-borawski-a763271b1",
  },
  {
    id: 40,
    name: "Kateryna Prokoshyna",
    image: profileImages[19],
    city: "Warsaw",
    match: "9/12",
    isNew: true,
    description: "Business Development Representative with 3+ years at Sloboda Studio and AltexSoft. Strong technical understanding with experience in Rails, Python, Django, Node.js and React.",
    roles: [
      { company: "Sloboda Studio", role: "Business Development Representative" },
      { company: "AltexSoft", role: "Account Development Representative" },
      { company: "Technorely Inc.", role: "Lead Generation Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 85,
    tags: ['Referred'],
    education: {
      school: "Kharkiv National University of Radioelectronics",
      degree: "Master's, Cyber/Computer Forensics",
      graduationDate: "2020"
    },
    summary: "BDR with 3+ years and strong technical background. Experience in software development sales across multiple technologies.",
    skillTags: ['Software Development', 'Technical Sales', 'Lead Generation'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Technical background', status: 'full', required: false },
      { icon: 'sparkles', label: 'Project management', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/kateryna-prokoshyna-26973b131",
  },
  {
    id: 41,
    name: "Mike Berezovskyi",
    image: profileImages[0],
    city: "Warsaw",
    match: "9/12",
    isNew: false,
    description: "Pre-Sales Engineer at Creatio with 2.5 years experience. Helps automate business processes in sales, marketing and service using Creatio products.",
    roles: [
      { company: "Creatio", role: "Pre-Sales Engineer" },
      { company: "Creatio", role: "Business Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 84,
    tags: ['Database'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2022"
    },
    summary: "Pre-Sales Engineer at Creatio with BDR background. Strong in business process automation and CRM solutions.",
    skillTags: ['Pre-Sales', 'Business Automation', 'CRM'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Trilingual (UA, RU, EN)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Technical pre-sales', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/mike-berezovskyi-aaa681282",
    languages: ['Ukrainian', 'Russian', 'English'],
  },
  {
    id: 42,
    name: "Kyle W.",
    image: profileImages[1],
    city: "Warsaw",
    match: "7/12",
    isNew: true,
    description: "Sales Development Representative at Unity Finance with experience in fintech sales. Strong background in business and commerce.",
    roles: [
      { company: "Unity Finance", role: "Sales Development Representative" },
      { company: "Interkassa", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 74,
    tags: ['AI sourced'],
    education: {
      school: "Jagiellonian University",
      degree: "Bachelor's, Business/Commerce",
      graduationDate: "2016"
    },
    summary: "SDR at Unity Finance with fintech experience. Strong business/commerce educational background.",
    skillTags: ['Fintech', 'Payment Solutions', 'B2B Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'none', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Fintech knowledge', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/kyle-w-3244702ab",
  },
  {
    id: 43,
    name: "Maya Pauliukavets",
    image: profileImages[2],
    city: "Warsaw",
    match: "9/12",
    isNew: false,
    description: "Account Executive at AppMagic with nearly 3 years experience. Mission-driven to achieve business growth through strategic thinking and proven expertise.",
    roles: [
      { company: "AppMagic", role: "Account Executive" },
      { company: "Webernetic Family", role: "Sales Representative" },
      { company: "Webernetic Family", role: "Account Manager" }
    ],
    currentRoleIndex: 0,
    engagementRate: 85,
    tags: ['Sourced'],
    education: {
      school: "Minsk State Linguistic University",
      degree: "Bachelor's, English and German Teacher",
      graduationDate: "2023"
    },
    summary: "Account Executive at AppMagic with digital marketing expertise. Strong SEO and strategic thinking skills.",
    skillTags: ['Account Executive', 'Digital Marketing', 'Strategic Thinking'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Strategic thinking', status: 'full', required: false },
      { icon: 'sparkles', label: 'SEO expertise', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/maya-pauliukavets",
  },
  {
    id: 44,
    name: "Veronika Semeniuk",
    image: profileImages[3],
    city: "Warsaw",
    match: "8/12",
    isNew: true,
    description: "Sales Development Representative at Salesbook with 2+ years experience including product management at Cortex Chemicals. Strong commercial and sales background.",
    roles: [
      { company: "Salesbook", role: "Sales Development Representative" },
      { company: "Cortex Chemicals", role: "Junior Product Manager" },
      { company: "Cortex Chemicals", role: "Commercial Assistant" }
    ],
    currentRoleIndex: 0,
    engagementRate: 79,
    tags: ['Referred'],
    education: {
      school: "Lesya Ukrainka Volyn National University",
      degree: "Master's, English Language and Literature",
      graduationDate: "2020"
    },
    summary: "SDR at Salesbook with product management background. Experience in chemical industry and commercial operations.",
    skillTags: ['Commercial Sales', 'Product Management', 'B2B'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Product knowledge', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/veronika-semeniuk-79b3a7219",
  },
  {
    id: 45,
    name: "Magdalena Grzesiak",
    image: profileImages[4],
    city: "Cracow",
    match: "8/12",
    isNew: false,
    description: "Business Development Representative at GamerSEO with 2+ years experience. Innovative and results-driven with 4 years in B2B and B2C sales and project management background.",
    roles: [
      { company: "GamerSEO", role: "Business Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 81,
    tags: ['Database'],
    education: {
      school: "University",
      degree: "Bachelor's",
      graduationDate: "2022"
    },
    summary: "BDR at GamerSEO with project management background. Experience in B2B/B2C sales and digital marketing.",
    skillTags: ['Project Management', 'Digital Marketing', 'SEO'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Project management', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/magdalena-grzesiak-2b99492a8",
  },
  {
    id: 46,
    name: "Dariusz Zalewski",
    image: profileImages[5],
    city: "Warsaw",
    match: "8/12",
    isNew: true,
    description: "Partner GoToMarket Lead for ISVs at Microsoft EMEA. Helping partners achieve business goals through GTM strategies, marketing activities, and business opportunity expansion.",
    roles: [
      { company: "Microsoft", role: "Partner GoToMarket Lead For ISVs (EMEA)" }
    ],
    currentRoleIndex: 0,
    engagementRate: 78,
    tags: ['AI sourced'],
    education: {
      school: "Business School, Warsaw University of Technology",
      degree: "Master's",
      graduationDate: "1999"
    },
    summary: "Microsoft EMEA Partner GTM Lead. Strong in partner strategy, marketing activities, and mobile applications.",
    skillTags: ['Microsoft', 'Partner Management', 'GTM Strategy'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'none', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Bilingual (EN, RU)', status: 'full', required: false },
      { icon: 'sparkles', label: 'Strategic planning', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/dariuszzalewskiprofile",
    languages: ['English', 'Russian'],
  },
  {
    id: 47,
    name: "Gergely Jonas",
    image: profileImages[6],
    city: "Budapest",
    match: "9/12",
    isNew: false,
    description: "Sales Manager at Indeveyes Technologies with 4+ years experience including VPP Energy Group. Engineering background with strong technical sales expertise.",
    roles: [
      { company: "Indeveyes Technologies", role: "Sales Manager" },
      { company: "VPP Energy Group", role: "Sales Manager" },
      { company: "Raw Development Kft", role: "Project Engineer" }
    ],
    currentRoleIndex: 0,
    engagementRate: 84,
    tags: ['Sourced'],
    education: {
      school: "Budapest University of Technology and Economics",
      degree: "MBA",
      graduationDate: "Present"
    },
    summary: "Sales Manager with 4+ years and engineering background. MBA candidate with strong technical sales skills.",
    skillTags: ['Sales Management', 'Energy Sector', 'Technical Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Hungary', status: 'partial', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Engineering background', status: 'full', required: false },
      { icon: 'sparkles', label: 'MBA candidate', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/gergely-jonas-245020155",
  },
  {
    id: 48,
    name: "Katarzyna Krajewska",
    image: profileImages[7],
    city: "Cracow",
    match: "9/12",
    isNew: true,
    description: "New Business Manager at edrone with 2.5 years experience. Real estate agent background with strong marketing strategy and client service expertise.",
    roles: [
      { company: "edrone", role: "New Business Manager" },
      { company: "Infinity Estate", role: "Real Estate Agent" },
      { company: "edrone", role: "Sales Development Representative" }
    ],
    currentRoleIndex: 0,
    engagementRate: 83,
    tags: ['Referred'],
    education: {
      school: "Jagiellonian University",
      degree: "Master's, Social Media in Management",
      graduationDate: "2024"
    },
    summary: "New Business Manager at edrone with real estate background. Strong in marketing strategy and social media.",
    skillTags: ['New Business', 'Real Estate', 'Marketing Strategy'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'partial', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent Polish', status: 'full', required: false },
      { icon: 'sparkles', label: 'Marketing expertise', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/katarzyna-krajewska-3b0091243",
  },
  {
    id: 49,
    name: "Fatma Kaplan",
    image: profileImages[8],
    city: "Warsaw",
    match: "9/12",
    isNew: false,
    description: "Account Executive at Vonage with 3+ years experience. International relations background with event planning and administrative experience.",
    roles: [
      { company: "Vonage", role: "Account Executive" },
      { company: "Fundacja CAT", role: "Event Planner" },
      { company: "MIGEM", role: "Administrative Secretary" }
    ],
    currentRoleIndex: 0,
    engagementRate: 82,
    tags: ['Database'],
    education: {
      school: "Adam Mickiewicz University",
      degree: "Master's, International Relations",
      graduationDate: "2025"
    },
    summary: "Account Executive at Vonage with international relations background. Strong organizational and event planning skills.",
    skillTags: ['Account Executive', 'International Relations', 'Event Planning'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Fluent English', status: 'full', required: false },
      { icon: 'sparkles', label: 'Organizational skills', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/fatma-kaplan-a8aab9209",
  },
  {
    id: 50,
    name: "Scarlett Gu",
    image: profileImages[9],
    city: "Warsaw",
    match: "10/12",
    isNew: true,
    description: "Global Business Consultant at Alibaba Group with nearly 4 years experience. Expertise in B2B e-commerce and helping businesses leverage the world's largest B2B platform.",
    roles: [
      { company: "Alibaba Group", role: "Global Business Consultant" },
      { company: "Zhejiang Jiyan Transmission", role: "Sales" }
    ],
    currentRoleIndex: 0,
    engagementRate: 89,
    tags: ['AI sourced'],
    education: {
      school: "University of Arizona, Eller College of Management",
      degree: "Bachelor's, Finance",
      graduationDate: "2024"
    },
    summary: "Alibaba Global Business Consultant with B2B e-commerce expertise. Strong finance background and international experience.",
    skillTags: ['B2B E-commerce', 'Alibaba', 'Global Sales'],
    coreCriteria: [
      { icon: 'location', label: 'Located in Poland', status: 'full', required: true },
      { icon: 'briefcase', label: 'BD/Sales Experience', status: 'full', required: true },
      { icon: 'clock', label: '3+ Years in B2B Sales', status: 'full', required: true },
      { icon: 'graduation', label: "Bachelor's Degree or Higher", status: 'full', required: false },
    ],
    softSkills: [
      { icon: 'sparkles', label: 'Global experience', status: 'full', required: false },
      { icon: 'sparkles', label: 'E-commerce expertise', status: 'full', required: false },
    ],
    linkedin: "https://www.linkedin.com/in/scarlett-gu-064977243",
  },
];

// Company icon configurations
export const companyIcons: Record<string, { bg: string; text: string; letter: string }> = {
  'Barbara Bang': { bg: '#6366F1', text: '#fff', letter: 'B' },
  'SALESmanago': { bg: '#10B981', text: '#fff', letter: 'S' },
  'ProtoQ': { bg: '#F59E0B', text: '#fff', letter: 'P' },
  'Mitrix Technology': { bg: '#3B82F6', text: '#fff', letter: 'M' },
  'Oxagile': { bg: '#8B5CF6', text: '#fff', letter: 'O' },
  'UNITALK': { bg: '#EC4899', text: '#fff', letter: 'U' },
  'Google': { bg: '#4285F4', text: '#fff', letter: 'G' },
  'SoftServe': { bg: '#00C853', text: '#fff', letter: 'S' },
  'Akamai Technologies': { bg: '#0090D0', text: '#fff', letter: 'A' },
  'PinMeTo': { bg: '#FF6B6B', text: '#fff', letter: 'P' },
  'Nielsen': { bg: '#006EB6', text: '#fff', letter: 'N' },
  'Kontakt.io': { bg: '#00BCD4', text: '#fff', letter: 'K' },
  'Perfection42': { bg: '#9C27B0', text: '#fff', letter: 'P' },
  'Shopify': { bg: '#96BF48', text: '#fff', letter: 'S' },
  'Acronis': { bg: '#0D1E47', text: '#fff', letter: 'A' },
  'ExxonMobil': { bg: '#E4002B', text: '#fff', letter: 'E' },
  'Halo Lab': { bg: '#7C3AED', text: '#fff', letter: 'H' },
  'Depo Studio': { bg: '#F97316', text: '#fff', letter: 'D' },
  'TTEC': { bg: '#00A3E0', text: '#fff', letter: 'T' },
  'StorkJet': { bg: '#1E40AF', text: '#fff', letter: 'S' },
  'Omega Code': { bg: '#059669', text: '#fff', letter: 'O' },
  'Phinance S.A.': { bg: '#7C2D12', text: '#fff', letter: 'P' },
  'Agency Leaders': { bg: '#DC2626', text: '#fff', letter: 'A' },
  'RK Digital': { bg: '#4F46E5', text: '#fff', letter: 'R' },
  '10Clouds': { bg: '#0EA5E9', text: '#fff', letter: '1' },
  'Pretius': { bg: '#15803D', text: '#fff', letter: 'P' },
  'WAAT AI Labs': { bg: '#7E22CE', text: '#fff', letter: 'W' },
  'RevGenius': { bg: '#BE185D', text: '#fff', letter: 'R' },
  'Altamira': { bg: '#0369A1', text: '#fff', letter: 'A' },
  'Dinemates': { bg: '#CA8A04', text: '#fff', letter: 'D' },
  'Buglance': { bg: '#16A34A', text: '#fff', letter: 'B' },
  'Mifort': { bg: '#9333EA', text: '#fff', letter: 'M' },
  'Microsoft': { bg: '#00A4EF', text: '#fff', letter: 'M' },
  'Wipasz S.A.': { bg: '#047857', text: '#fff', letter: 'W' },
  'Bosch Polska': { bg: '#E31937', text: '#fff', letter: 'B' },
  'Supreme Solutions': { bg: '#2563EB', text: '#fff', letter: 'S' },
  'Umbrelly': { bg: '#4338CA', text: '#fff', letter: 'U' },
  'TÜV SÜD': { bg: '#1D4ED8', text: '#fff', letter: 'T' },
  'ONIX Consulting': { bg: '#EA580C', text: '#fff', letter: 'O' },
  'Iwasoft': { bg: '#0891B2', text: '#fff', letter: 'I' },
  'I know IT': { bg: '#65A30D', text: '#fff', letter: 'I' },
  'Carsan Solutions': { bg: '#B91C1C', text: '#fff', letter: 'C' },
  'Firmowe Finanse': { bg: '#0D9488', text: '#fff', letter: 'F' },
  'Upreak India': { bg: '#C026D3', text: '#fff', letter: 'U' },
  'upGrad': { bg: '#059669', text: '#fff', letter: 'U' },
  'OutperformIQ': { bg: '#7C3AED', text: '#fff', letter: 'O' },
  'User.com': { bg: '#2563EB', text: '#fff', letter: 'U' },
  'Docplanner': { bg: '#14B8A6', text: '#fff', letter: 'D' },
  'AB S.A.': { bg: '#64748B', text: '#fff', letter: 'A' },
  'Envio': { bg: '#06B6D4', text: '#fff', letter: 'E' },
  'Arlitech Ltd.': { bg: '#8B5CF6', text: '#fff', letter: 'A' },
  'Vonage': { bg: '#5E35B1', text: '#fff', letter: 'V' },
  'Africom Holdings': { bg: '#F97316', text: '#fff', letter: 'A' },
  'Peppernode': { bg: '#DC2626', text: '#fff', letter: 'P' },
  'Softkit': { bg: '#10B981', text: '#fff', letter: 'S' },
  'KUNA Pay': { bg: '#F59E0B', text: '#fff', letter: 'K' },
  'Promodo': { bg: '#3B82F6', text: '#fff', letter: 'P' },
  'EventsWallet': { bg: '#6366F1', text: '#fff', letter: 'E' },
  'Clorce': { bg: '#00A1E0', text: '#fff', letter: 'C' },
  'Reelly.ai': { bg: '#EC4899', text: '#fff', letter: 'R' },
  'Code & Care': { bg: '#8B5CF6', text: '#fff', letter: 'C' },
  'Flipsnack': { bg: '#F43F5E', text: '#fff', letter: 'F' },
  'Genpact': { bg: '#0EA5E9', text: '#fff', letter: 'G' },
  'KPMG': { bg: '#00338D', text: '#fff', letter: 'K' },
  'Nomentia': { bg: '#2DD4BF', text: '#fff', letter: 'N' },
  'Sales Force Europe': { bg: '#00A1E0', text: '#fff', letter: 'S' },
  'LRT Automotive GmbH': { bg: '#EF4444', text: '#fff', letter: 'L' },
  'Phenomenon Studio': { bg: '#A855F7', text: '#fff', letter: 'P' },
  'dreambit LLC': { bg: '#6366F1', text: '#fff', letter: 'D' },
  'Lazarev.': { bg: '#0D9488', text: '#fff', letter: 'L' },
  'Euvic Solutions S.A.': { bg: '#3B82F6', text: '#fff', letter: 'E' },
  'AT&T': { bg: '#009FDB', text: '#fff', letter: 'A' },
  'Aptean': { bg: '#00A3A1', text: '#fff', letter: 'A' },
  'Snoika': { bg: '#8B5CF6', text: '#fff', letter: 'S' },
  'AIESEC in Poland': { bg: '#0066B3', text: '#fff', letter: 'A' },
  'Revolut': { bg: '#0075EB', text: '#fff', letter: 'R' },
  'Glovo': { bg: '#FFC244', text: '#000', letter: 'G' },
  'Sloboda Studio': { bg: '#FF6B6B', text: '#fff', letter: 'S' },
  'AltexSoft': { bg: '#00BCD4', text: '#fff', letter: 'A' },
  'Technorely Inc.': { bg: '#4F46E5', text: '#fff', letter: 'T' },
  'Creatio': { bg: '#FF7043', text: '#fff', letter: 'C' },
  'Unity Finance': { bg: '#4CAF50', text: '#fff', letter: 'U' },
  'Interkassa': { bg: '#2196F3', text: '#fff', letter: 'I' },
  'AppMagic': { bg: '#9C27B0', text: '#fff', letter: 'A' },
  'Webernetic Family': { bg: '#FF5722', text: '#fff', letter: 'W' },
  'Salesbook': { bg: '#00BCD4', text: '#fff', letter: 'S' },
  'Cortex Chemicals': { bg: '#795548', text: '#fff', letter: 'C' },
  'GamerSEO': { bg: '#4CAF50', text: '#fff', letter: 'G' },
  'Indeveyes Technologies': { bg: '#3F51B5', text: '#fff', letter: 'I' },
  'VPP Energy Group': { bg: '#FF9800', text: '#fff', letter: 'V' },
  'Raw Development Kft': { bg: '#607D8B', text: '#fff', letter: 'R' },
  'edrone': { bg: '#E91E63', text: '#fff', letter: 'E' },
  'Infinity Estate': { bg: '#9C27B0', text: '#fff', letter: 'I' },
  'Fundacja CAT': { bg: '#00BCD4', text: '#fff', letter: 'F' },
  'MIGEM': { bg: '#795548', text: '#fff', letter: 'M' },
  'Alibaba Group': { bg: '#FF6A00', text: '#fff', letter: 'A' },
  'Zhejiang Jiyan Transmission': { bg: '#607D8B', text: '#fff', letter: 'Z' },
};

export const getCompanyIcon = (company: string) => {
  const icon = companyIcons[company];
  if (icon) return icon;
  // Generate consistent random color based on company name
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
  const index = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return { bg: colors[index], text: '#fff', letter: company.charAt(0) };
};
