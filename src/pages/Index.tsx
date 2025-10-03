import React, { useState } from 'react';
import { UserAvatar } from '@/components/UserAvatar';
import { JobCard } from '@/components/JobCard';
import backgroundImage from '@/assets/background.png';
import userAvatarImage from '@/assets/user-avatar.png';
import logoIcon from '@/assets/logo-icon.svg';
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPositions, setShowMyPositions] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isThinking, setIsThinking] = useState(false);
  const jobData = {
    title: "Chief Operations Officer",
    userName: "Mateusz Budka",
    userAvatar: userAvatarImage,
    stats: {
      found: 55,
      saved: 55,
      contacted: 55,
      interviewed: 55
    },
    actionsNeeded: 4
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Add user message
    setMessages([{ text: searchQuery, isUser: true }]);
    setIsChatMode(true);
    setIsThinking(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false);
    }, 2000);
    
    setSearchQuery('');
  };
  const jobs = Array(9).fill(jobData);
  return <main className="min-h-screen w-full relative">
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />

      <div className="relative z-10 flex flex-col items-center pt-8 pb-20 px-4">
        {/* Logo - left sidebar */}
        <aside className="fixed left-4 top-8">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
            <img src={logoIcon} alt="Logo" className="w-6 h-6" />
          </div>
        </aside>

        {/* Right sidebar */}
        <aside className="fixed right-4 top-8 flex flex-col gap-4">
          <UserAvatar initials="TW" />
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </aside>

        {/* Main content */}
        <div className="w-full max-w-[1200px]">
          {/* Chat Mode */}
          {isChatMode ? (
            <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-in-right`}
                  >
                    <div
                      className={`max-w-[600px] px-6 py-4 rounded-2xl shadow-lg ${
                        message.isUser
                          ? 'bg-white text-foreground'
                          : 'bg-[rgba(21,52,61,1)] text-white'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isThinking && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-center gap-2 px-6 py-4">
                      <svg className="w-5 h-5 text-yellow-400 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input at Bottom */}
              <form onSubmit={handleSearch} className="relative animate-slide-in-right">
                <textarea
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Ask me anything"
                  rows={1}
                  className="w-full bg-white rounded-2xl shadow-lg px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Search section */}
              <div className="text-center mb-8">
                <h1 className="font-hedvig text-[rgba(21,52,61,1)] mb-6 max-w-[750px] mx-auto leading-tight text-5xl pt-[30px]">
                  Describe who you want to hire
                </h1>
                <form onSubmit={handleSearch} className="relative max-w-[750px] mx-auto">
                  <textarea
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="For example: find a user experience designer in Warsaw"
                    rows={4}
                    className="w-full bg-white rounded-2xl shadow-lg px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 bottom-4 w-12 h-12 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Jobs section */}
              <section className="bg-white rounded-3xl shadow-xl p-8 mt-12">
            <h2 className="text-[45px] font-hedvig font-normal text-[rgba(21,52,61,1)] tracking-tight mb-8">
              Jobs
            </h2>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search jobs..." className="w-full bg-white border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)]" />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                <UserAvatar initials="TW" size="sm" />
                <span>Show only my positions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Show archived
              </button>
            </div>

                {/* Job cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job, index) => <JobCard key={index} {...job} onMenuClick={() => console.log('Menu clicked', index)} onActionClick={() => console.log('Action clicked', index)} />)}
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </main>;
};
export default Index;