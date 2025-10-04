import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon.png';

const JobPeople = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'shortlist'>('people');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [peopleCount, setPeopleCount] = useState(0);
  const [visibleMatches, setVisibleMatches] = useState(0);
  const [isSearching, setIsSearching] = useState(true);

  // Animate people count from 0 to 548 over 10 seconds
  useEffect(() => {
    const duration = 10000; // 10 seconds
    const targetCount = 548;
    const incrementTime = 50; // Update every 50ms
    const steps = duration / incrementTime;
    const increment = targetCount / steps;

    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        setPeopleCount(targetCount);
        setIsSearching(false);
        clearInterval(interval);
      } else {
        setPeopleCount(Math.floor(currentCount));
      }
    }, incrementTime);

    return () => clearInterval(interval);
  }, []);

  // Gradually show more matches
  useEffect(() => {
    const matchInterval = setInterval(() => {
      setVisibleMatches(prev => {
        if (prev >= 17) {
          clearInterval(matchInterval);
          return 17;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(matchInterval);
  }, []);

  const bestMatches = [
    { initials: 'JD', name: 'John Doe', color: 'bg-blue-400' },
    { initials: 'SM', name: 'Sarah Miller', color: 'bg-purple-400' },
    { initials: 'RJ', name: 'Robert Johnson', color: 'bg-green-400' },
    { initials: 'EW', name: 'Emma Wilson', color: 'bg-pink-400' },
    { initials: 'MB', name: 'Michael Brown', color: 'bg-yellow-400' },
    { initials: 'OD', name: 'Olivia Davis', color: 'bg-indigo-400' },
    { initials: 'WG', name: 'William Garcia', color: 'bg-red-400' },
    { initials: 'AM', name: 'Ava Martinez', color: 'bg-teal-400' },
    { initials: 'JR', name: 'James Rodriguez', color: 'bg-orange-400' },
    { initials: 'ST', name: 'Sophia Taylor', color: 'bg-cyan-400' },
    { initials: 'DH', name: 'David Harris', color: 'bg-lime-400' },
    { initials: 'IL', name: 'Isabella Lopez', color: 'bg-fuchsia-400' },
    { initials: 'CH', name: 'Christopher Hill', color: 'bg-amber-400' },
    { initials: 'ML', name: 'Mia Lee', color: 'bg-emerald-400' },
    { initials: 'JW', name: 'Joseph White', color: 'bg-rose-400' },
    { initials: 'AY', name: 'Abigail Young', color: 'bg-violet-400' },
    { initials: 'TK', name: 'Thomas King', color: 'bg-sky-400' },
  ];

  const jobs = [
    { id: 1, title: 'Senior Product Designer' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  const [messages] = useState([
    { text: 'Find me a senior product designer based in Stockholm.', isUser: true },
    { text: 'Okay! How much experience should the candidates have?', isUser: false },
    { text: '5+ years', isUser: true },
    { text: 'For sure! Is there anything else I should keep in mind?', isUser: false },
    { text: 'They should have strong Figma skills', isUser: true }
  ]);

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="h-[68px] bg-background flex items-center justify-between px-6 flex-shrink-0">
        {/* Left side - Back button and Jobs dropdown */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          {/* Jobs dropdown */}
          <div className="relative">
            <button
              onClick={() => setJobsDropdownOpen(!jobsDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
            >
              <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
              <span className="font-medium text-gray-700">Senior product designer</span>
              <ChevronDown className="w-4 h-4 text-gray-700" />
            </button>
            
            {jobsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                {jobs.map((job) => (
                  <button
                    key={job.id}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors text-left"
                    onClick={() => setJobsDropdownOpen(false)}
                  >
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
                    <span className="text-sm">{job.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: '#FAF8F4' }}>
          <button
            onClick={() => navigate('/job')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'job' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Job
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'people' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            People
          </button>
          <button
            onClick={() => setActiveTab('shortlist')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'shortlist' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Shortlist
          </button>
        </div>

        {/* Right side - Profile, Invite, More */}
        <div className="flex items-center gap-3">
          <img 
            src={userAvatarImage} 
            alt="Profile" 
            className="w-9 h-9 rounded-full object-cover shadow-md border-2 border-gray-200"
          />
          <button className="px-3 py-1.5 rounded-lg font-medium transition-all bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg border border-gray-700">
            Invite
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200">
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left side - Search Animation */}
        <ResizablePanel defaultSize={isChatCollapsed ? 100 : 65} minSize={30}>
          <div className="h-full flex flex-col py-6 pb-8 relative" style={{ backgroundColor: '#FAF8F4' }}>
            <div className={`flex-1 overflow-y-auto bg-background rounded-[15px] relative ${isChatCollapsed ? 'mx-6' : 'ml-6 mr-2.5'}`}>
              <div className="h-full flex flex-col justify-center px-12 py-10 gap-8">
                {/* Searching Loader */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center gap-3 text-lg font-medium text-foreground">
                    {isSearching && (
                      <div className="w-5 h-5 border-2 border-[rgba(21,52,61,0.3)] border-t-[rgba(21,52,61,1)] rounded-full animate-spin" />
                    )}
                    {isSearching ? 'Searching for people...' : 'Search complete!'}
                  </div>
                </div>

                {/* External Sources */}
                <div className="rounded-2xl p-8" style={{ backgroundColor: '#FAF8F4' }}>
                  <h3 className="text-xs font-semibold text-muted-foreground text-center mb-6 uppercase tracking-wider">
                    External Sources
                  </h3>
                  <div className="relative overflow-hidden h-20">
                    <div className="flex gap-6 animate-[scroll_20s_linear_infinite] absolute whitespace-nowrap">
                      <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <circle cx="128" cy="128" r="128" fill="#FF4500"/>
                            <path d="M213.3 128c0-9.4-7.6-17-17-17-4.6 0-8.7 1.9-11.7 4.9-11.5-8.3-27.4-13.7-45-14.4l7.7-36.1 25 5.3c.3 6.4 5.6 11.5 12.1 11.5 6.7 0 12.1-5.4 12.1-12.1s-5.4-12.1-12.1-12.1c-4.9 0-9.1 2.9-11 7.1l-28-6c-1-.2-2.1.1-2.8.8-.7.7-1.1 1.7-.9 2.7l-8.5 39.9c-17.8.6-34 6.1-45.6 14.5-3-3.1-7.2-5-11.9-5-9.4 0-17 7.6-17 17 0 6.7 3.9 12.5 9.5 15.2-.3 1.8-.5 3.6-.5 5.5 0 28 32.5 50.7 72.5 50.7s72.5-22.7 72.5-50.7c0-1.9-.2-3.7-.5-5.5 5.7-2.7 9.6-8.5 9.6-15.2z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <defs>
                              <linearGradient id="behance-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0057FF"/>
                                <stop offset="100%" stopColor="#1769FF"/>
                              </linearGradient>
                            </defs>
                            <circle cx="128" cy="128" r="128" fill="url(#behance-gradient)"/>
                            <text x="128" y="180" fontSize="140" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Bē</text>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <defs>
                              <linearGradient id="dribbble-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ea4c89"/>
                                <stop offset="100%" stopColor="#e73d7c"/>
                              </linearGradient>
                            </defs>
                            <circle cx="128" cy="128" r="128" fill="url(#dribbble-gradient)"/>
                            <circle cx="128" cy="128" r="90" fill="none" stroke="white" strokeWidth="12"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="#0A66C2" rx="20"/>
                            <path d="M77.8 96.5h27.9v89.4H77.8V96.5zm14-44.7c8.9 0 16.1 7.2 16.1 16.1 0 8.9-7.2 16.1-16.1 16.1-8.9 0-16.1-7.2-16.1-16.1 0-8.9 7.2-16.1 16.1-16.1zm53 44.7h26.7v12.2h.4c3.7-7 12.8-14.4 26.4-14.4 28.2 0 33.4 18.6 33.4 42.7v49.2h-27.9v-43.6c0-10.4-.2-23.8-14.5-23.8-14.5 0-16.7 11.3-16.7 23v44.4h-27.9V96.5z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <circle cx="128" cy="128" r="128" fill="white"/>
                            <path d="M115.75 128L65 77.25l21.25-21.25L151 120.75 130.25 141.5z" fill="#4285F4"/>
                            <path d="M115.75 128l50.5 50.75-21.25 21.25L80.25 135.25 101 114.5z" fill="#EA4335"/>
                            <path d="M140.25 128L191 178.75l-21.25 21.25L105 135.25 125.75 114.5z" fill="#FBBC04"/>
                            <path d="M140.25 128L89.75 77.25l21.25-21.25L175.75 120.75 155 141.5z" fill="#34A853"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <circle cx="128" cy="128" r="128" fill="#1DB954"/>
                            <path d="M128 58c-38.7 0-70 31.3-70 70s31.3 70 70 70 70-31.3 70-70-31.3-70-70-70zm32.2 100.9c-1.3 2.1-4 2.8-6.1 1.5-16.7-10.2-37.7-12.5-62.5-6.8-2.4.5-4.7-.9-5.3-3.2-.5-2.4.9-4.7 3.2-5.3 27.1-6.2 50.2-3.5 68.9 7.9 2.1 1.2 2.8 4 1.8 6.1zm8.7-19.4c-1.6 2.6-5 3.4-7.6 1.8-19.1-11.7-48.2-15.1-70.8-8.3-3 .9-6.1-.8-7-3.7-.9-3 .8-6.1 3.7-7 25.8-7.8 57.7-4 79.9 9.4 2.6 1.6 3.4 5 1.8 7.6zm.8-20.2c-22.9-13.6-60.7-14.8-82.6-8.2-3.5 1.1-7.3-1-8.4-4.5-1.1-3.5 1-7.3 4.5-8.4 25.2-7.6 67.2-6.1 93.4 9.5 3.2 1.9 4.2 6 2.3 9.2-1.9 3.1-6 4.2-9.2 2.4z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="#232F3E" rx="20"/>
                            <path d="M142.2 168.5c-22.2 16.4-54.5 25.1-82.2 25.1-38.9 0-73.9-14.4-100.4-38.3-2.1-1.9-.2-4.5 2.3-3 28.9 16.8 64.6 26.9 101.5 26.9 24.9 0 52.3-5.2 77.5-15.9 3.8-1.6 7 2.5 3.3 5.2z" fill="#FF9900" transform="translate(128, 128)"/>
                            <path d="M149.8 160.5c-2.8-3.6-18.6-1.7-25.7-.9-2.2.3-2.5-1.6-.5-3 12.6-8.9 33.2-6.3 35.6-3.3 2.4 3-.6 24.1-12.7 34.2-1.8 1.6-3.6.7-2.8-1.3 2.7-6.7 8.7-21.8 6.1-25.7z" fill="#FF9900" transform="translate(128, 128)"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="#181717" rx="128"/>
                            <path d="M128 30C71.4 30 25.5 75.9 25.5 132.5c0 45.3 29.4 83.7 70.1 97.3 5.1.9 7-2.2 7-4.9 0-2.4-.1-10.3-.1-18.7-28.5 6.2-34.5-12.1-34.5-12.1-4.7-11.9-11.4-15-11.4-15-9.3-6.4.7-6.2.7-6.2 10.3.7 15.7 10.6 15.7 10.6 9.1 15.6 23.9 11.1 29.7 8.5.9-6.6 3.6-11.1 6.5-13.7-22.7-2.6-46.6-11.3-46.6-50.4 0-11.1 4-20.2 10.5-27.4-1.1-2.6-4.6-13 1-27.1 0 0 8.6-2.7 28.1 10.5 8.2-2.3 16.9-3.4 25.6-3.4 8.7 0 17.4 1.2 25.6 3.4 19.5-13.2 28.1-10.5 28.1-10.5 5.6 14.1 2.1 24.5 1 27.1 6.5 7.1 10.5 16.3 10.5 27.4 0 39.2-23.9 47.8-46.7 50.3 3.7 3.2 7 9.4 7 19 0 13.7-.1 24.7-.1 28.1 0 2.7 1.8 5.9 7 4.9 40.7-13.6 70-52 70-97.3C230.5 75.9 184.6 30 128 30z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <defs>
                              <linearGradient id="meta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0081FB"/>
                                <stop offset="100%" stopColor="#0064E0"/>
                              </linearGradient>
                            </defs>
                            <circle cx="128" cy="128" r="128" fill="url(#meta-gradient)"/>
                            <path d="M159 76c-19.9 0-31 13.7-31 30.7v4.5c0-17-11.1-30.7-31-30.7-20.2 0-35 15.3-35 38.7v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6C194 91.3 179.2 76 159 76z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="black" rx="50"/>
                            <path d="M203.5 101c-.8-7.2-3.5-13.6-8.1-18.3-4.6-4.7-11-7.4-18.1-8.2-14.1-1.6-35.3-1.6-35.3-1.6s-21.2 0-35.3 1.6c-7.1.8-13.5 3.5-18.1 8.2-4.6 4.7-7.3 11.1-8.1 18.3-1.6 14.1-1.6 43.5-1.6 43.5s0 29.4 1.6 43.5c.8 7.2 3.5 13.6 8.1 18.3 4.6 4.7 11 7.4 18.1 8.2 14.1 1.6 35.3 1.6 35.3 1.6s21.2 0 35.3-1.6c7.1-.8 13.5-3.5 18.1-8.2 4.6-4.7 7.3-11.1 8.1-18.3 1.6-14.1 1.6-43.5 1.6-43.5s0-29.4-1.6-43.5zm-85.6 70.9v-54.8l47.1 27.4-47.1 27.4z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                      {/* Duplicate for seamless loop */}
                      <div className="flex gap-6 items-center">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <circle cx="128" cy="128" r="128" fill="#FF4500"/>
                            <path d="M213.3 128c0-9.4-7.6-17-17-17-4.6 0-8.7 1.9-11.7 4.9-11.5-8.3-27.4-13.7-45-14.4l7.7-36.1 25 5.3c.3 6.4 5.6 11.5 12.1 11.5 6.7 0 12.1-5.4 12.1-12.1s-5.4-12.1-12.1-12.1c-4.9 0-9.1 2.9-11 7.1l-28-6c-1-.2-2.1.1-2.8.8-.7.7-1.1 1.7-.9 2.7l-8.5 39.9c-17.8.6-34 6.1-45.6 14.5-3-3.1-7.2-5-11.9-5-9.4 0-17 7.6-17 17 0 6.7 3.9 12.5 9.5 15.2-.3 1.8-.5 3.6-.5 5.5 0 28 32.5 50.7 72.5 50.7s72.5-22.7 72.5-50.7c0-1.9-.2-3.7-.5-5.5 5.7-2.7 9.6-8.5 9.6-15.2z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <defs>
                              <linearGradient id="behance-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#0057FF"/>
                                <stop offset="100%" stopColor="#1769FF"/>
                              </linearGradient>
                            </defs>
                            <circle cx="128" cy="128" r="128" fill="url(#behance-gradient-2)"/>
                            <text x="128" y="180" fontSize="140" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Bē</text>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <defs>
                              <linearGradient id="dribbble-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ea4c89"/>
                                <stop offset="100%" stopColor="#e73d7c"/>
                              </linearGradient>
                            </defs>
                            <circle cx="128" cy="128" r="128" fill="url(#dribbble-gradient-2)"/>
                            <circle cx="128" cy="128" r="90" fill="none" stroke="white" strokeWidth="12"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="#0A66C2" rx="20"/>
                            <path d="M77.8 96.5h27.9v89.4H77.8V96.5zm14-44.7c8.9 0 16.1 7.2 16.1 16.1 0 8.9-7.2 16.1-16.1 16.1-8.9 0-16.1-7.2-16.1-16.1 0-8.9 7.2-16.1 16.1-16.1zm53 44.7h26.7v12.2h.4c3.7-7 12.8-14.4 26.4-14.4 28.2 0 33.4 18.6 33.4 42.7v49.2h-27.9v-43.6c0-10.4-.2-23.8-14.5-23.8-14.5 0-16.7 11.3-16.7 23v44.4h-27.9V96.5z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <circle cx="128" cy="128" r="128" fill="white"/>
                            <path d="M115.75 128L65 77.25l21.25-21.25L151 120.75 130.25 141.5z" fill="#4285F4"/>
                            <path d="M115.75 128l50.5 50.75-21.25 21.25L80.25 135.25 101 114.5z" fill="#EA4335"/>
                            <path d="M140.25 128L191 178.75l-21.25 21.25L105 135.25 125.75 114.5z" fill="#FBBC04"/>
                            <path d="M140.25 128L89.75 77.25l21.25-21.25L175.75 120.75 155 141.5z" fill="#34A853"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <circle cx="128" cy="128" r="128" fill="#1DB954"/>
                            <path d="M128 58c-38.7 0-70 31.3-70 70s31.3 70 70 70 70-31.3 70-70-31.3-70-70-70zm32.2 100.9c-1.3 2.1-4 2.8-6.1 1.5-16.7-10.2-37.7-12.5-62.5-6.8-2.4.5-4.7-.9-5.3-3.2-.5-2.4.9-4.7 3.2-5.3 27.1-6.2 50.2-3.5 68.9 7.9 2.1 1.2 2.8 4 1.8 6.1zm8.7-19.4c-1.6 2.6-5 3.4-7.6 1.8-19.1-11.7-48.2-15.1-70.8-8.3-3 .9-6.1-.8-7-3.7-.9-3 .8-6.1 3.7-7 25.8-7.8 57.7-4 79.9 9.4 2.6 1.6 3.4 5 1.8 7.6zm.8-20.2c-22.9-13.6-60.7-14.8-82.6-8.2-3.5 1.1-7.3-1-8.4-4.5-1.1-3.5 1-7.3 4.5-8.4 25.2-7.6 67.2-6.1 93.4 9.5 3.2 1.9 4.2 6 2.3 9.2-1.9 3.1-6 4.2-9.2 2.4z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="#232F3E" rx="20"/>
                            <path d="M142.2 168.5c-22.2 16.4-54.5 25.1-82.2 25.1-38.9 0-73.9-14.4-100.4-38.3-2.1-1.9-.2-4.5 2.3-3 28.9 16.8 64.6 26.9 101.5 26.9 24.9 0 52.3-5.2 77.5-15.9 3.8-1.6 7 2.5 3.3 5.2z" fill="#FF9900" transform="translate(128, 128)"/>
                            <path d="M149.8 160.5c-2.8-3.6-18.6-1.7-25.7-.9-2.2.3-2.5-1.6-.5-3 12.6-8.9 33.2-6.3 35.6-3.3 2.4 3-.6 24.1-12.7 34.2-1.8 1.6-3.6.7-2.8-1.3 2.7-6.7 8.7-21.8 6.1-25.7z" fill="#FF9900" transform="translate(128, 128)"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="#181717" rx="128"/>
                            <path d="M128 30C71.4 30 25.5 75.9 25.5 132.5c0 45.3 29.4 83.7 70.1 97.3 5.1.9 7-2.2 7-4.9 0-2.4-.1-10.3-.1-18.7-28.5 6.2-34.5-12.1-34.5-12.1-4.7-11.9-11.4-15-11.4-15-9.3-6.4.7-6.2.7-6.2 10.3.7 15.7 10.6 15.7 10.6 9.1 15.6 23.9 11.1 29.7 8.5.9-6.6 3.6-11.1 6.5-13.7-22.7-2.6-46.6-11.3-46.6-50.4 0-11.1 4-20.2 10.5-27.4-1.1-2.6-4.6-13 1-27.1 0 0 8.6-2.7 28.1 10.5 8.2-2.3 16.9-3.4 25.6-3.4 8.7 0 17.4 1.2 25.6 3.4 19.5-13.2 28.1-10.5 28.1-10.5 5.6 14.1 2.1 24.5 1 27.1 6.5 7.1 10.5 16.3 10.5 27.4 0 39.2-23.9 47.8-46.7 50.3 3.7 3.2 7 9.4 7 19 0 13.7-.1 24.7-.1 28.1 0 2.7 1.8 5.9 7 4.9 40.7-13.6 70-52 70-97.3C230.5 75.9 184.6 30 128 30z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <defs>
                              <linearGradient id="meta-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0081FB"/>
                                <stop offset="100%" stopColor="#0064E0"/>
                              </linearGradient>
                            </defs>
                            <circle cx="128" cy="128" r="128" fill="url(#meta-gradient-2)"/>
                            <path d="M159 76c-19.9 0-31 13.7-31 30.7v4.5c0-17-11.1-30.7-31-30.7-20.2 0-35 15.3-35 38.7v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6C194 91.3 179.2 76 159 76z" fill="white"/>
                          </svg>
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center">
                          <svg className="w-10 h-10" viewBox="0 0 256 256" fill="none">
                            <rect width="256" height="256" fill="black" rx="50"/>
                            <path d="M203.5 101c-.8-7.2-3.5-13.6-8.1-18.3-4.6-4.7-11-7.4-18.1-8.2-14.1-1.6-35.3-1.6-35.3-1.6s-21.2 0-35.3 1.6c-7.1.8-13.5 3.5-18.1 8.2-4.6 4.7-7.3 11.1-8.1 18.3-1.6 14.1-1.6 43.5-1.6 43.5s0 29.4 1.6 43.5c.8 7.2 3.5 13.6 8.1 18.3 4.6 4.7 11 7.4 18.1 8.2 14.1 1.6 35.3 1.6 35.3 1.6s21.2 0 35.3-1.6c7.1-.8 13.5-3.5 18.1-8.2 4.6-4.7 7.3-11.1 8.1-18.3 1.6-14.1 1.6-43.5 1.6-43.5s0-29.4-1.6-43.5zm-85.6 70.9v-54.8l47.1 27.4-47.1 27.4z" fill="white"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Internal Sources */}
                <div className="rounded-2xl p-8" style={{ backgroundColor: '#FAF8F4' }}>
                  <h3 className="text-xs font-semibold text-muted-foreground text-center mb-6 uppercase tracking-wider">
                    Internal Sources
                  </h3>
                  <div className="flex gap-4 justify-center">
                    <div className="px-6 py-2 bg-white rounded-lg text-sm font-medium shadow-sm">Network</div>
                    <div className="px-6 py-2 bg-white rounded-lg text-sm font-medium shadow-sm">Applied</div>
                  </div>
                </div>

                {/* People Found Counter */}
                <div className="rounded-2xl p-8" style={{ backgroundColor: '#FAF8F4' }}>
                  <h3 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider text-center">People Found</h3>
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-blue-400 border-2 border-white" />
                      <div className="w-10 h-10 rounded-full bg-purple-400 border-2 border-white" />
                      <div className="w-10 h-10 rounded-full bg-green-400 border-2 border-white" />
                    </div>
                    <div className="text-3xl font-bold text-foreground">{peopleCount}</div>
                  </div>
                </div>

                {/* Best Matches */}
                <div className="rounded-2xl p-8" style={{ backgroundColor: '#FAF8F4' }}>
                  <h3 className="text-xs font-semibold text-muted-foreground text-center mb-6 uppercase tracking-wider">
                    Best Matches
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {bestMatches.slice(0, visibleMatches).map((match, index) => (
                      <div
                        key={index}
                        className={`w-14 h-14 rounded-xl ${match.color} flex items-center justify-center text-white font-semibold text-sm animate-fade-in shadow-sm`}
                        title={match.name}
                      >
                        {match.initials}
                      </div>
                    ))}
                    {visibleMatches >= 17 && (
                      <div className="w-14 h-14 rounded-xl bg-gray-400 flex items-center justify-center text-white font-semibold text-sm animate-fade-in shadow-sm">
                        +12
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {isChatCollapsed && (
                <button
                  onClick={() => setIsChatCollapsed(false)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200 z-10"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
              )}
            </div>
          </div>
        </ResizablePanel>

        {!isChatCollapsed && <ResizableHandle className="w-0 bg-transparent" />}

        {/* Right side - Chat Interface */}
        {!isChatCollapsed && (
          <ResizablePanel defaultSize={35} minSize={30}>
            <div className="h-full flex flex-col" style={{ backgroundColor: '#FAF8F4' }}>
              <div className="flex flex-col h-full py-6 pr-8 pl-2.5 pb-8">
                {/* Chat Header */}
                <div className="flex gap-6 mb-12 flex-shrink-0 relative">
                  <button
                    onClick={() => setIsChatCollapsed(true)}
                    className="absolute right-0 top-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                </div>

              {/* Chat Messages - Scrollable */}
              <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        message.isUser
                          ? 'bg-white shadow-sm text-foreground px-6 py-4 rounded-2xl'
                          : 'text-foreground px-6 py-4'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input - Fixed at bottom */}
              <form className="relative flex-shrink-0">
                <textarea
                  placeholder="Ask anything about this job description..."
                  rows={3}
                  className="w-full bg-white rounded-2xl px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px] shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-4 bottom-4 w-10 h-10 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors shadow-md"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </div>
  );
};

export default JobPeople;
