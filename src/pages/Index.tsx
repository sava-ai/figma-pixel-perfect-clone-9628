import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAvatar } from '@/components/UserAvatar';
import { UserMenu } from '@/components/UserMenu';
import { JobCard } from '@/components/JobCard';
import { AIChatOverlay } from '@/components/AIChatOverlay';
import { MessagesOverlay } from '@/components/MessagesOverlay';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import backgroundImage from '@/assets/background-main-new.jpg';
import userAvatarImage from '@/assets/user-avatar.png';
import logoIcon from '@/assets/logo-icon.svg';
const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPositions, setShowMyPositions] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [chatButtonPosition, setChatButtonPosition] = useState({ top: 0, right: 0 });
  const chatButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (chatButtonRef.current) {
      const rect = chatButtonRef.current.getBoundingClientRect();
      setChatButtonPosition({ top: rect.top, right: window.innerWidth - rect.right });
    }
  }, []);
  const jobData = {
    title: "Chief Commercial Officer in East/North Asia and Pacific Ocean",
    userName: "Mateusz Budka",
    userAvatar: userAvatarImage,
    stats: {
      found: 55,
      saved: 55,
      contacted: 55,
      interviewed: 55
    },
    newStats: {
      saved: 3,
      contacted: 2
    },
    actionsNeeded: 4
  };
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // Add user message
    const userMessage = { text: searchQuery, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    
    const currentStep = conversationStep;
    
    if (!isChatMode) {
      setIsChatMode(true);
    }
    
    setConversationStep(prev => prev + 1);
    setIsThinking(true);
    setSearchQuery('');
    
    // Simulate AI response based on conversation step
    setTimeout(() => {
      setIsThinking(false);
      
      if (currentStep === 0) {
        setMessages(prev => [...prev, { text: 'Okay! How much experience should the candidates have?', isUser: false }]);
      } else if (currentStep === 1) {
        setMessages(prev => [...prev, { text: 'For sure! Is there anything else I should keep in mind?', isUser: false }]);
      } else if (currentStep === 2) {
        setMessages(prev => [...prev, { text: 'Got it! Let me create a job description for you...', isUser: false }]);
        setIsThinking(true);
        setTimeout(() => {
          navigate('/job');
        }, 3000);
      }
    }, 3000);
  };

  const handleBackToSearch = () => {
    setIsChatMode(false);
    setMessages([]);
    setIsThinking(false);
    setConversationStep(0);
  };
  const jobs = Array(9).fill(jobData);
  return (
    <>
      {/* Fixed background layer */}
      <div 
        className="fixed inset-0 w-screen h-screen -z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <main className="min-h-screen w-full relative">

      <div className="relative z-10 flex flex-col items-center pt-8 pb-20 px-4 overflow-hidden">
        {/* Logo - left sidebar */}
        <aside className="fixed left-4 top-8">
          <button 
            onClick={isChatMode ? handleBackToSearch : () => setIsAIChatOpen(true)}
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-accent transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-6 h-6">
              <img 
                src={logoIcon} 
                alt="Logo" 
                className={`absolute inset-0 w-6 h-6 transition-all duration-1000 ${
                  isChatMode ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'
                }`}
              />
              <svg 
                className={`absolute inset-0 w-6 h-6 transition-all duration-1000 ${
                  isChatMode ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
          </button>
        </aside>

        {/* AI Chat Overlay */}
        <AIChatOverlay open={isAIChatOpen} onOpenChange={setIsAIChatOpen} />

        {/* Messages Overlay */}
        <MessagesOverlay 
          isOpen={isMessagesOpen} 
          onClose={() => setIsMessagesOpen(false)}
          buttonPosition={chatButtonPosition}
        />

        {/* Right sidebar */}
        <aside className="fixed right-4 top-8 flex flex-col gap-4">
          <UserMenu initials="TW" />
          <button 
            ref={chatButtonRef}
            onClick={() => setIsMessagesOpen(true)}
            className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
              3
            </span>
          </button>
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
              5
            </span>
          </button>
        </aside>

        {/* Main content */}
        <div className="w-full max-w-[1200px]">
          {/* Chat Mode */}
          <div className={`transition-all duration-[2000ms] ease-in-out ${
            isChatMode 
              ? 'opacity-100 h-[calc(100vh-8rem)]' 
              : 'opacity-0 h-0 overflow-hidden pointer-events-none'
          }`}>
            <div className="flex flex-col h-full pt-[30px] max-w-[60%] mx-auto">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[600px] px-6 py-4 rounded-2xl shadow-lg ${
                        message.isUser
                          ? 'bg-white text-foreground'
                          : 'bg-[rgba(21,52,61,1)] text-white'
                      }`}
                      style={{
                        animation: message.isUser ? 'slideFromCenter 0.8s ease-out' : 'none'
                      }}
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
                      <span className="text-white">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input at Bottom */}
              <form onSubmit={handleSearch} className={`relative transition-all duration-[3000ms] ease-in-out ${
                isChatMode ? 'opacity-100 translate-y-0 delay-[2000ms]' : 'opacity-0 translate-y-20'
              }`}>
                <textarea
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Ask me anything"
                  rows={3}
                  className="w-full bg-white rounded-2xl shadow-lg px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch(e);
                    }
                  }}
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
          </div>

          {/* Search Mode */}
          <div className={`transition-all duration-[2000ms] ease-in-out ${
            !isChatMode 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-full pointer-events-none absolute w-full max-w-[1200px]'
          }`}>
            {/* Search section */}
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <AnimatedLogo className="mb-2" />
              </div>
              <h1 className={`text-[#292524] mb-6 max-w-[600px] mx-auto leading-tight text-[3rem] pt-[18px] transition-all duration-[1500ms] ${
                isChatMode ? 'opacity-0' : 'opacity-100'
              }`} style={{ fontFamily: 'CustomHeading, sans-serif' }}>
                Who can I find for you?
              </h1>
              <form onSubmit={handleSearch} className={`relative max-w-[600px] mx-auto transition-all duration-[4500ms] ease-in-out ${
                isChatMode ? 'translate-y-[55vh] opacity-0' : 'translate-y-0 opacity-100'
              }`}>
                <textarea
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="For example: find a user experience designer in Warsaw"
                  rows={4}
                  className="w-full bg-white rounded-lg px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#292524] resize-none border border-[#EEEDEC]"
                />
                <button
                  type="submit"
                  className="absolute right-4 bottom-4 w-[34px] h-[34px] bg-[#292524] rounded-full flex items-center justify-center hover:bg-[#292524]/90 transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Jobs section */}
            <section className={`bg-[#FFFFFF] rounded-lg border border-[#EEEDEC] p-8 mt-12 transition-all duration-[2500ms] ease-in-out ${
              isChatMode ? 'translate-y-[150vh] opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            {/* Filters with Jobs title */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <h2 className="text-[45px] font-hedvig font-normal text-[#292524] tracking-tight mr-auto">
                Jobs
              </h2>
              
              <div className="relative min-w-[320px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input type="text" placeholder="Search jobs..." className="w-full bg-white border border-[#EEEDEC] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#292524]" />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#EEEDEC] rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                <UserAvatar initials="TW" size="sm" />
                <span>Show only my positions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-[#EEEDEC] rounded-lg text-sm font-medium hover:bg-accent transition-colors">
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Index;