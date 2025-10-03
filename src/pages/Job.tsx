import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import userAvatarImage from '@/assets/user-avatar.png';

const Job = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'shortlist'>('job');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState(`Senior Product Designer

Job description

About us
We build workflow analytics tools that help product teams spot friction points in minutes

Role overview
We need a senior product designer to own complex feature work from research to polished UI for our core analytics platform in Stockholm. You will collaborate with product and engineering to ship user-centered solutions that move key metrics

Responsibilities
• Drive problem-framing and discovery research for new product initiatives.
• Translate insights into flows, wireframes, prototypes, and final visuals in Figma.
• Partnering on a daily with PMs and engineers for defining scope, milestones, and success metrics
• Maintain and evolve our cross-platform design system
• Instrument live experiments and iterate

Qualifications`);

  const [messages] = useState([
    { text: 'Find me a senior product designer based in Stockholm.', isUser: true },
    { text: 'Okay! How much experience should the candidates have?', isUser: false },
    { text: '5+ years', isUser: true },
    { text: 'For sure! Is there anything else I should keep in mind?', isUser: false },
    { text: 'They should have strong Figma skills', isUser: true }
  ]);

  const jobs = [
    { id: 1, title: 'Senior Product Designer', emoji: '🎨' },
    { id: 2, title: 'Chief Operations Officer', emoji: '💼' },
    { id: 3, title: 'Frontend Developer', emoji: '💻' }
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
              <span className="text-lg">🎨</span>
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
                    <span className="text-lg">{job.emoji}</span>
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
            onClick={() => setActiveTab('job')}
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
        {/* Left side - Job Description Editor */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col p-6" style={{ backgroundColor: '#FAF8F4' }}>
            <div className="flex-1 overflow-y-auto bg-background rounded-[15px] p-12">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-full min-h-[800px] text-foreground focus:outline-none resize-none font-sans bg-transparent"
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="w-0 bg-transparent" />

        {/* Right side - Chat Interface */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col" style={{ backgroundColor: '#FAF8F4' }}>
            <div className="flex flex-col h-full py-8 pr-8 pl-6">
              {/* Chat Header */}
              <div className="flex gap-6 mb-6 border-b pb-4 flex-shrink-0">
                <button className="text-foreground font-medium border-b-2 border-[rgba(21,52,61,1)] pb-2">
                  AI chat
                </button>
                <button className="text-muted-foreground font-medium pb-2 hover:text-foreground transition-colors">
                  Team chat
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
                      className={`max-w-[80%] px-6 py-4 rounded-2xl ${
                        message.isUser
                          ? 'bg-white shadow-sm text-foreground'
                          : 'text-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Thinking indicator */}
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 px-6 py-4">
                    <svg className="w-5 h-5 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-muted-foreground">Thinking...</span>
                  </div>
                </div>
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
                  className="absolute right-4 bottom-4 w-12 h-12 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors shadow-md"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Job;
