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
                <div className="bg-white rounded-lg border border-gray-200 animate-fade-in overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                      External Sources
                    </h3>
                    <span className="text-xs text-gray-500">7 platforms</span>
                  </div>
                  <div className="relative overflow-hidden bg-gray-50 h-16 flex items-center px-4">
                    <div className="flex gap-3 animate-scroll absolute whitespace-nowrap">
                      <div className="flex gap-3 items-center">
                        {/* LinkedIn */}
                        <div className="w-10 h-10 rounded-md bg-[#0A66C2] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                        </div>
                        {/* GitHub */}
                        <div className="w-10 h-10 rounded-md bg-[#181717] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
                          </svg>
                        </div>
                        {/* Google */}
                        <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        {/* Dribbble */}
                        <div className="w-10 h-10 rounded-md bg-[#ea4c89] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                          </svg>
                        </div>
                        {/* Behance */}
                        <div className="w-10 h-10 rounded-md bg-[#0057FF] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M6.5 4.5h3.75c1.24 0 2.25 1.01 2.25 2.25S11.49 9 10.25 9H6.5V4.5zM6.5 10h4.5c1.38 0 2.5 1.12 2.5 2.5S12.38 15 11 15H6.5v-5zm9.75 1.25c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.62 0 3.01-1.03 3.53-2.47h-2.36c-.28.36-.71.59-1.17.59-.83 0-1.5-.67-1.5-1.5h5.28c.03-.21.05-.43.05-.66 0-2.07-1.68-3.75-3.75-3.75zm-1.25 2.87c.18-.65.78-1.12 1.5-1.12s1.32.47 1.5 1.12h-3zm1.5-6.87h3v1h-3v-1z"></path>
                          </svg>
                        </div>
                        {/* Twitter/X */}
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </svg>
                        </div>
                        {/* Facebook */}
                        <div className="w-10 h-10 rounded-md bg-[#1877F2] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                          </svg>
                        </div>
                      </div>
                      {/* Duplicate for seamless loop */}
                      <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 rounded-md bg-[#0A66C2] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#181717] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-white border border-gray-200 flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#ea4c89] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#0057FF] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M6.5 4.5h3.75c1.24 0 2.25 1.01 2.25 2.25S11.49 9 10.25 9H6.5V4.5zM6.5 10h4.5c1.38 0 2.5 1.12 2.5 2.5S12.38 15 11 15H6.5v-5zm9.75 1.25c-2.07 0-3.75 1.68-3.75 3.75s1.68 3.75 3.75 3.75c1.62 0 3.01-1.03 3.53-2.47h-2.36c-.28.36-.71.59-1.17.59-.83 0-1.5-.67-1.5-1.5h5.28c.03-.21.05-.43.05-.66 0-2.07-1.68-3.75-3.75-3.75zm-1.25 2.87c.18-.65.78-1.12 1.5-1.12s1.32.47 1.5 1.12h-3zm1.5-6.87h3v1h-3v-1z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                          </svg>
                        </div>
                        <div className="w-10 h-10 rounded-md bg-[#1877F2] flex items-center justify-center">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
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
                    <span className="text-xs text-gray-500">{visibleMatches >= 17 ? '29' : visibleMatches} profiles</span>
                  </div>
                  <div className="p-4 flex flex-wrap gap-2">
                    {bestMatches.slice(0, visibleMatches).map((match, index) => (
                      <div
                        key={index}
                        className="w-12 h-12 rounded-md overflow-hidden animate-fade-in border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                        title={match.name}
                      >
                        <img src={match.image} alt={match.name} className="w-full h-full object-cover" />
                      </div>
                    ))}
                    {visibleMatches >= 17 && (
                      <div className="w-12 h-12 rounded-md bg-gray-700 flex items-center justify-center text-white font-semibold text-xs animate-fade-in border border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer">
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
