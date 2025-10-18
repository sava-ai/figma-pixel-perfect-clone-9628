import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, ChevronLeft } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { InviteDialog } from '@/components/InviteDialog';
import { JobChatPanel } from '@/components/JobChatPanel';
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

const JobPeople = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'pipeline'>('people');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [peopleCount, setPeopleCount] = useState(0);
  const [visibleMatches, setVisibleMatches] = useState(0);
  const [isSearching, setIsSearching] = useState(true);
  const [showExternalSources, setShowExternalSources] = useState(false);
  const [showInternalSources, setShowInternalSources] = useState(false);
  const [showPeopleFound, setShowPeopleFound] = useState(false);
  const [showBestMatches, setShowBestMatches] = useState(false);

  const profileImages = [
    profile1, profile2, profile3, profile4, profile5,
    profile6, profile7, profile8, profile9, profile10,
    profile11, profile12, profile13, profile14, profile15,
    profile16, profile17, profile18, profile19, profile20
  ];

  // Staged animation - show sections progressively
  useEffect(() => {
    // Stage 1: Show external sources after 2s
    const timer1 = setTimeout(() => setShowExternalSources(true), 2000);
    
    // Stage 2: Show internal sources after 5s
    const timer2 = setTimeout(() => setShowInternalSources(true), 5000);
    
    // Stage 3: Show people found after 8s and start counting
    const timer3 = setTimeout(() => {
      setShowPeopleFound(true);
      
      // Start counting people
      const duration = 7000; // 7 seconds
      const targetCount = 548;
      const incrementTime = 50;
      const steps = duration / incrementTime;
      const increment = targetCount / steps;

      let currentCount = 0;
      const countInterval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          setPeopleCount(targetCount);
          clearInterval(countInterval);
        } else {
          setPeopleCount(Math.floor(currentCount));
        }
      }, incrementTime);
    }, 8000);
    
    // Stage 4: Show best matches after 13s and stop searching indicator
    const timer4 = setTimeout(() => {
      setShowBestMatches(true);
      setIsSearching(false);
    }, 13000);

    // Stage 5: Navigate to view page 3 seconds after search completes
    const timer5 = setTimeout(() => {
      navigate('/job/people/view');
    }, 16000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [navigate]);

  // Gradually show more matches
  useEffect(() => {
    if (!showBestMatches) return;
    
    const matchInterval = setInterval(() => {
      setVisibleMatches(prev => {
        if (prev >= 17) {
          clearInterval(matchInterval);
          return 17;
        }
        return prev + 1;
      });
    }, 200);

    return () => clearInterval(matchInterval);
  }, [showBestMatches]);

  const bestMatches = [
    { name: 'John Doe', image: profile1 },
    { name: 'Sarah Miller', image: profile2 },
    { name: 'Robert Johnson', image: profile3 },
    { name: 'Emma Wilson', image: profile4 },
    { name: 'Michael Brown', image: profile5 },
    { name: 'Olivia Davis', image: profile6 },
    { name: 'William Garcia', image: profile7 },
    { name: 'Ava Martinez', image: profile8 },
    { name: 'James Rodriguez', image: profile9 },
    { name: 'Sophia Taylor', image: profile10 },
    { name: 'David Harris', image: profile11 },
    { name: 'Isabella Lopez', image: profile12 },
    { name: 'Christopher Hill', image: profile13 },
    { name: 'Mia Lee', image: profile14 },
    { name: 'Joseph White', image: profile15 },
    { name: 'Abigail Young', image: profile16 },
    { name: 'Thomas King', image: profile17 },
  ];

  const jobs = [
    { id: 1, title: 'Senior Product Designer' },
    { id: 2, title: 'Chief Operations Officer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  const defaultMessages = [
    { text: 'Find me a senior product designer based in Stockholm.', isUser: true },
    { text: 'Okay! How much experience should the candidates have?', isUser: false },
    { text: '5+ years', isUser: true },
    { text: 'For sure! Is there anything else I should keep in mind?', isUser: false },
    { text: 'They should have strong Figma skills', isUser: true }
  ];

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
            onClick={() => navigate('/job/pipeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'pipeline' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Pipeline
          </button>
        </div>

        {/* Right side - Profile, Invite, More */}
        <div className="flex items-center gap-3">
          <img 
            src={userAvatarImage} 
            alt="Profile" 
            className="w-9 h-9 rounded-full object-cover shadow-md border-2 border-gray-200"
          />
          <button 
            onClick={() => setInviteDialogOpen(true)}
            className="px-3 py-1.5 rounded-lg font-medium transition-all bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg border border-gray-700"
          >
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
          <div className="h-full flex flex-col py-8 relative" style={{ backgroundColor: '#FAF8F4' }}>
            <div className={`flex-1 overflow-y-auto relative ${isChatCollapsed ? 'mx-6' : 'ml-6 mr-3'}`}>
              <div className="h-full flex flex-col justify-center gap-3 max-w-3xl mx-auto px-4">
                {/* Searching Status */}
                <div className="bg-white rounded-lg border border-gray-200 px-4 py-3 animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    {isSearching && (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {isSearching ? 'Searching for candidates...' : 'Search complete'}
                    </span>
                  </div>
                </div>

                {/* External Sources */}
                {showExternalSources && (
                <div className="bg-white rounded-lg border border-gray-200 animate-fade-in flex-shrink-0">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      External Sources
                    </h3>
                    <span className="text-xs text-gray-500">13 platforms</span>
                  </div>
                  <div className="relative bg-gray-50 h-16 w-full overflow-hidden">
                    <div className="flex gap-3 animate-scroll absolute top-3 left-0 whitespace-nowrap px-4">
                      <div className="flex gap-3 items-center">
                        {/* LinkedIn */}
                        <div className="w-10 h-10 rounded-md bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                        </div>
                        {/* GitHub */}
                        <div className="w-10 h-10 rounded-md bg-[#181717] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
                          </svg>
                        </div>
                        {/* Stack Overflow */}
                        <div className="w-10 h-10 rounded-md bg-[#F58025] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                          </svg>
                        </div>
                        {/* Dribbble */}
                        <div className="w-10 h-10 rounded-md bg-[#ea4c89] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                          </svg>
                        </div>
                        {/* Behance */}
                        <div className="w-10 h-10 rounded-md bg-[#0057FF] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M6.5 4.5h3.75c1.24 0 2.25 1.01 2.25 2.25S11.49 9 10.25 9H6.5V4.5zM6.5 10h4.5c1.38 0 2.5 1.12 2.5 2.5S12.38 15 11 15H6.5v-5zm9.75 1.25c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.62 0 3.01-1.03 3.53-2.47h-2.36c-.28.36-.71.59-1.17.59-.83 0-1.5-.67-1.5-1.5h5.28c.03-.21.05-.43.05-.66 0-2.07-1.68-3.75-3.75-3.75zm-1.25 2.87c.18-.65.78-1.12 1.5-1.12s1.32.47 1.5 1.12h-3zm1.5-6.87h3v1h-3v-1z"></path>
                          </svg>
                        </div>
                        {/* Twitter/X */}
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </svg>
                        </div>
                        {/* Medium */}
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                          </svg>
                        </div>
                        {/* Product Hunt */}
                        <div className="w-10 h-10 rounded-md bg-[#DA552F] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.801 0-.993-.805-1.799-1.801-1.799zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.881 4.2 4.199 0 2.321-1.881 4.201-4.201 4.201z"/>
                          </svg>
                        </div>
                        {/* AngelList */}
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M16.465 9.954c.735-2.11 1.472-4.223 2.206-6.336.079-.226.168-.45.232-.681a.794.794 0 00-.09-.582.797.797 0 00-.523-.34 1.54 1.54 0 00-.787.028 1.166 1.166 0 00-.595.553 85.452 85.452 0 00-2.214 6.338c-.02.055-.03.113-.067.24h-.958c-.035-.126-.045-.188-.064-.245-.735-2.115-1.473-4.228-2.202-6.345a1.24 1.24 0 00-.57-.61 1.435 1.435 0 00-.877-.07.795.795 0 00-.526.335.795.795 0 00-.095.582c.067.237.156.467.237.699.735 2.11 1.47 4.222 2.199 6.334.024.07.043.14.078.253-.689.023-1.334.045-2.04.069v.948l.239.042h1.817c.024.089.041.159.06.229l2.216 6.36c.068.2.142.398.228.59.17.382.488.596.905.619.413.023.778-.15.977-.516.084-.155.148-.32.214-.484l2.237-6.425c.02-.056.03-.116.058-.223h1.864c.007 0 .015-.007.023-.007.033-.007.068-.014.177-.035v-.962c-.699-.024-1.353-.047-2.068-.072z"/>
                          </svg>
                        </div>
                        {/* Discord */}
                        <div className="w-10 h-10 rounded-md bg-[#5865F2] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                          </svg>
                        </div>
                        {/* Slack */}
                        <div className="w-10 h-10 rounded-md bg-[#4A154B] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                          </svg>
                        </div>
                        {/* Notion */}
                        <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="black" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
                          </svg>
                        </div>
                        {/* Figma */}
                        <div className="w-10 h-10 rounded-md bg-[#F24E1E] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
                          </svg>
                        </div>
                      </div>
                      {/* Duplicate for seamless loop */}
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-md bg-[#0A66C2] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#181717] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#F58025] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.936v.014zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.35 1.617-.01.001zM15.751 0l-1.746 1.294 6.405 8.604 1.746-1.294L15.749 0h.002z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#ea4c89] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#0057FF] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M6.5 4.5h3.75c1.24 0 2.25 1.01 2.25 2.25S11.49 9 10.25 9H6.5V4.5zM6.5 10h4.5c1.38 0 2.5 1.12 2.5 2.5S12.38 15 11 15H6.5v-5zm9.75 1.25c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.62 0 3.01-1.03 3.53-2.47h-2.36c-.28.36-.71.59-1.17.59-.83 0-1.5-.67-1.5-1.5h5.28c.03-.21.05-.43.05-.66 0-2.07-1.68-3.75-3.75-3.75zm-1.25 2.87c.18-.65.78-1.12 1.5-1.12s1.32.47 1.5 1.12h-3zm1.5-6.87h3v1h-3v-1z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#DA552F] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.801 0-.993-.805-1.799-1.801-1.799zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.881 4.2 4.199 0 2.321-1.881 4.201-4.201 4.201z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M16.465 9.954c.735-2.11 1.472-4.223 2.206-6.336.079-.226.168-.45.232-.681a.794.794 0 00-.09-.582.797.797 0 00-.523-.34 1.54 1.54 0 00-.787.028 1.166 1.166 0 00-.595.553 85.452 85.452 0 00-2.214 6.338c-.02.055-.03.113-.067.24h-.958c-.035-.126-.045-.188-.064-.245-.735-2.115-1.473-4.228-2.202-6.345a1.24 1.24 0 00-.57-.61 1.435 1.435 0 00-.877-.07.795.795 0 00-.526.335.795.795 0 00-.095.582c.067.237.156.467.237.699.735 2.11 1.47 4.222 2.199 6.334.024.07.043.14.078.253-.689.023-1.334.045-2.04.069v.948l.239.042h1.817c.024.089.041.159.06.229l2.216 6.36c.068.2.142.398.228.59.17.382.488.596.905.619.413.023.778-.15.977-.516.084-.155.148-.32.214-.484l2.237-6.425c.02-.056.03-.116.058-.223h1.864c.007 0 .015-.007.023-.007.033-.007.068-.014.177-.035v-.962c-.699-.024-1.353-.047-2.068-.072z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#5865F2] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#4A154B] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="black" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#F24E1E] flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}

                {/* Internal Sources */}
                {showInternalSources && (
                <div className="bg-white rounded-lg border border-gray-200 animate-fade-in overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Internal Sources
                    </h3>
                    <span className="text-xs text-gray-500">3 sources</span>
                  </div>
                  <div className="p-4 flex gap-2">
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex -space-x-1.5">
                        <img src={profile18} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                        <img src={profile19} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Network</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex -space-x-1.5">
                        <img src={profile20} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                        <img src={profile1} alt="" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Applied</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Database</span>
                    </div>
                  </div>
                </div>
                )}

                {/* People Found */}
                {showPeopleFound && (
                <div className="bg-white rounded-lg border border-gray-200 animate-fade-in overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      People Found
                    </h3>
                  </div>
                  <div className="p-6 flex items-center justify-center gap-4">
                    <div className="flex -space-x-2">
                      <img src={profile2} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                      <img src={profile3} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                      <img src={profile4} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900">{peopleCount}</div>
                  </div>
                </div>
                )}

                {/* Best Matches */}
                {showBestMatches && (
                <div className="bg-white rounded-lg border border-gray-200 animate-fade-in overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      Best Matches
                    </h3>
                    <span className="text-xs text-gray-500">{bestMatches.length} profiles</span>
                  </div>
                  <div className="p-4 flex items-center gap-2">
                    {bestMatches.slice(0, Math.min(visibleMatches, bestMatches.length)).map((match, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-md overflow-hidden animate-fade-in border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer flex-shrink-0"
                        title={match.name}
                      >
                        <img src={match.image} alt={match.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {visibleMatches >= bestMatches.length && (
                      <div className="w-12 h-12 rounded-md bg-gray-700 flex items-center justify-center text-white font-semibold text-sm animate-fade-in border border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer flex-shrink-0">
                        +12
                      </div>
                    )}
                  </div>
                </div>
                )}
              </div>

              {isChatCollapsed && (
                <button
                  onClick={() => setIsChatCollapsed(false)}
                  className="absolute top-6 right-6 w-8 h-8 rounded-md flex items-center justify-center transition-colors bg-white border border-gray-200 hover:bg-gray-50 z-10"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-700" />
                </button>
              )}
            </div>
          </div>
        </ResizablePanel>

        {!isChatCollapsed && <ResizableHandle className="w-0 bg-transparent" />}

        {/* Right side - Chat Interface */}
        {!isChatCollapsed && (
          <ResizablePanel defaultSize={35} minSize={30}>
            <JobChatPanel 
              defaultMessages={defaultMessages}
              placeholder="Ask anything about this job description..."
              onCollapse={() => setIsChatCollapsed(true)}
            />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>

      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
};

export default JobPeople;
