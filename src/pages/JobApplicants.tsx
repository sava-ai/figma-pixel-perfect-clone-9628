import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, Search, ChevronLeft, X, UserPlus, HelpCircle, Bookmark, MapPin, Briefcase, Award } from 'lucide-react';
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
import { InviteDialog } from '@/components/InviteDialog';

interface Applicant {
  id: number;
  name: string;
  image: string;
  city: string;
  country: string;
  match: string;
  matchScore: number;
  matchTotal: number;
  isNew: boolean;
  isAssigned: boolean;
  description: string;
  roles: { company: string; role: string; logo?: string }[];
  status: 'connected' | 'applied' | 'contacted';
  lastActivity: string;
  tags: number;
  requirements: { label: string; matched: boolean }[];
}

const JobApplicants = () => {
  const navigate = useNavigate();
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [activeFilter, setActiveFilter] = useState<'assigned' | 'new' | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const applicants: Applicant[] = [
    {
      id: 1,
      name: "Jennifer Worthington",
      image: profile1,
      city: "Stockholm",
      country: "Sweden",
      match: "15/18",
      matchScore: 15,
      matchTotal: 18,
      isNew: false,
      isAssigned: true,
      description: "A seasoned Senior Product Designer with extensive leadership experience, I have dedicated several years to the fintech sector, contributing to high-growth companies and building world-class products.",
      roles: [
        { company: "Klarna", role: "Senior UX/UI Designer" },
        { company: "Spotify", role: "Product Designer" },
        { company: "Tink", role: "Product Design Intern" }
      ],
      status: 'connected',
      lastActivity: '2d',
      tags: 2,
      requirements: [
        { label: "Located in Stockholm", matched: true },
        { label: "Senior Product Design", matched: true },
        { label: "Senior-Level Experience", matched: true }
      ]
    },
    {
      id: 2,
      name: "Arlene McCoy",
      image: profile2,
      city: "Stockholm",
      country: "Sweden",
      match: "15/18",
      matchScore: 15,
      matchTotal: 18,
      isNew: true,
      isAssigned: false,
      description: "An experienced Senior Product Designer with a strong background in fintech, where I've spent years helping high-growth startups scale their design operations and build user-centered products.",
      roles: [
        { company: "Northmill", role: "Senior Product Designer" },
        { company: "Delivery Hero", role: "Product Designer" },
        { company: "Trustly", role: "Product Designer" }
      ],
      status: 'applied',
      lastActivity: '1d',
      tags: 1,
      requirements: [
        { label: "Located in Stockholm", matched: true },
        { label: "Senior Product Design", matched: true },
        { label: "Senior-Level Experience", matched: true }
      ]
    },
    {
      id: 3,
      name: "Marcus Andersson",
      image: profile3,
      city: "Gothenburg",
      country: "Sweden",
      match: "14/18",
      matchScore: 14,
      matchTotal: 18,
      isNew: false,
      isAssigned: false,
      description: "Senior Designer at Asseco with 10 years of experience, having multiple projects on Dribbble displaying potential of exponential product understanding.",
      roles: [
        { company: "Asseco", role: "Senior Designer" },
        { company: "H&M", role: "UX Designer" }
      ],
      status: 'contacted',
      lastActivity: '3d',
      tags: 0,
      requirements: [
        { label: "Located in Stockholm", matched: false },
        { label: "Senior Product Design", matched: true },
        { label: "Senior-Level Experience", matched: true }
      ]
    },
    {
      id: 4,
      name: "Emma Lundberg",
      image: profile4,
      city: "Malmö",
      country: "Sweden",
      match: "16/18",
      matchScore: 16,
      matchTotal: 18,
      isNew: true,
      isAssigned: false,
      description: "An innovative Senior Product Designer known for data-driven approach and exceptional prototyping skills with 9 years in the industry.",
      roles: [
        { company: "Bambora", role: "Lead Product Designer" },
        { company: "iZettle", role: "Product Designer" }
      ],
      status: 'applied',
      lastActivity: '5h',
      tags: 3,
      requirements: [
        { label: "Located in Stockholm", matched: false },
        { label: "Senior Product Design", matched: true },
        { label: "Senior-Level Experience", matched: true }
      ]
    }
  ];

  const filteredApplicants = applicants.filter(a => {
    if (activeFilter === 'assigned') return a.isAssigned;
    if (activeFilter === 'new') return a.isNew;
    return true;
  });

  const assignedCount = applicants.filter(a => a.isAssigned).length;
  const newCount = applicants.filter(a => a.isNew).length;

  const jobs = [
    { id: 1, title: 'Senior Product Designer' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  return (
    <div className="h-screen w-full flex flex-col bg-[#F6F5F3] overflow-hidden">
      {/* Header */}
      <header className="h-[68px] bg-background flex items-center justify-between px-6 flex-shrink-0 border-b border-[#EEEDEC]">
        {/* Left side - Back button */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/job/people/view')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all bg-white border border-[#EEEDEC] hover:bg-accent"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to searches</span>
          </button>
        </div>

        {/* Center - Title */}
        <h1 className="text-lg font-medium">Applicants ({applicants.length})</h1>

        {/* Right side - Search */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#EEEDEC] hover:bg-accent transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Applicant List */}
        <div className="w-[480px] flex-shrink-0 overflow-y-auto p-6 border-r border-[#EEEDEC]">
          {/* Filters */}
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => setActiveFilter('assigned')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'assigned' 
                  ? 'bg-[#15343D] text-white' 
                  : 'bg-white border border-[#EEEDEC] text-gray-700 hover:bg-accent'
              }`}
            >
              Assigned to me <span className="ml-1 opacity-70">{assignedCount}</span>
            </button>
            <button 
              onClick={() => setActiveFilter('new')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === 'new' 
                  ? 'bg-[#15343D] text-white' 
                  : 'bg-white border border-[#EEEDEC] text-gray-700 hover:bg-accent'
              }`}
            >
              New <span className="ml-1 opacity-70">{newCount}</span>
            </button>
            <button 
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                activeFilter === 'all' 
                  ? 'bg-[#15343D] text-white' 
                  : 'bg-white border border-[#EEEDEC] text-gray-700 hover:bg-accent'
              }`}
            >
              All statuses <ChevronDown className="w-3 h-3" />
            </button>
          </div>

          {/* Assigned to me section */}
          {(activeFilter === 'all' || activeFilter === 'assigned') && assignedCount > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">Assigned to me</h3>
              {filteredApplicants.filter(a => a.isAssigned).map(applicant => (
                <div 
                  key={applicant.id}
                  onClick={() => setSelectedApplicant(applicant)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all mb-3 ${
                    selectedApplicant?.id === applicant.id 
                      ? 'border-[#15343D] bg-white shadow-sm' 
                      : 'border-[#EEEDEC] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img src={applicant.image} alt={applicant.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                        <span className="px-2 py-0.5 bg-[#15343D] text-white text-xs rounded-full flex items-center gap-1">
                          <img src={userAvatarImage} alt="" className="w-3 h-3 rounded-full" />
                          Assigned
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {applicant.city} · <span className="text-green-600">{applicant.match} match</span>
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{applicant.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {applicant.roles.slice(0, 3).map((role, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-xs rounded-lg text-gray-700">
                            {role.role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* New section */}
          {(activeFilter === 'all' || activeFilter === 'new') && newCount > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-600 mb-3">New ({newCount})</h3>
              {filteredApplicants.filter(a => a.isNew && !a.isAssigned).map(applicant => (
                <div 
                  key={applicant.id}
                  onClick={() => setSelectedApplicant(applicant)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all mb-3 ${
                    selectedApplicant?.id === applicant.id 
                      ? 'border-[#15343D] bg-[#F0F9E8] shadow-sm' 
                      : 'border-[#EEEDEC] bg-[#F8FCF3] hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img src={applicant.image} alt={applicant.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900">{applicant.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {applicant.city} · <span className="text-green-600">{applicant.match} match</span>
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{applicant.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {applicant.roles.slice(0, 3).map((role, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white text-xs rounded-lg text-gray-700 border border-[#EEEDEC]">
                            {role.role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Panel - Applicant Details */}
        <div className="flex-1 overflow-y-auto bg-white">
          {selectedApplicant ? (
            <div className="p-8">
              {/* Top Actions */}
              <div className="flex justify-end gap-2 mb-8">
                <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#EEEDEC] hover:bg-accent">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-[#EEEDEC] hover:bg-accent">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              {/* Profile */}
              <div className="text-center mb-8">
                <img 
                  src={selectedApplicant.image} 
                  alt={selectedApplicant.name} 
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h2 className="text-2xl font-medium text-gray-900 mb-1" style={{ fontFamily: 'CustomHeading, sans-serif' }}>
                  {selectedApplicant.name}
                </h2>
                <p className="text-gray-600">{selectedApplicant.city}, {selectedApplicant.country}</p>

                {/* Status badges */}
                <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="flex -space-x-1">
                      <img src={profile5} alt="" className="w-4 h-4 rounded-full border border-white" />
                      <img src={profile6} alt="" className="w-4 h-4 rounded-full border border-white" />
                    </span>
                    Connected
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {selectedApplicant.lastActivity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Applied
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {selectedApplicant.tags}
                  </span>
                  <span>...</span>
                </div>
              </div>

              {/* Match Score */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 text-2xl text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{selectedApplicant.matchScore}/{selectedApplicant.matchTotal}</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600 mt-1">Match</p>
              </div>

              {/* Requirements */}
              <div className="space-y-3 mb-8">
                {selectedApplicant.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-[#EEEDEC]">
                    <div className="flex items-center gap-3">
                      {idx === 0 && <MapPin className="w-5 h-5 text-gray-400" />}
                      {idx === 1 && <Briefcase className="w-5 h-5 text-gray-400" />}
                      {idx === 2 && <Award className="w-5 h-5 text-gray-400" />}
                      <span className="text-gray-900">{req.label}</span>
                      <span className="text-red-500">*</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                      req.matched 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {req.matched && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>}
                      Full match
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-white rounded-full shadow-lg px-2 py-2 border border-[#EEEDEC]">
                <button className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 rounded-full bg-white border border-[#EEEDEC] flex items-center justify-center hover:bg-accent transition-colors">
                  <UserPlus className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-12 h-12 rounded-full bg-white border border-[#EEEDEC] flex items-center justify-center hover:bg-accent transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                </button>
                <button className="w-12 h-12 rounded-full bg-[#15343D] text-white flex items-center justify-center hover:bg-[#1a4049] transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select an applicant to view details</p>
            </div>
          )}
        </div>
      </div>

      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
};

export default JobApplicants;
