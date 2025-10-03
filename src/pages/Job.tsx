import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '@/assets/background.png';
import logoIcon from '@/assets/logo-icon.svg';

const Job = () => {
  const navigate = useNavigate();
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

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex">
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />

      {/* Logo - top left */}
      <aside className="fixed left-4 top-8 z-20">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-accent cursor-pointer transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </aside>

      {/* Left side - Job Description Editor */}
      <div className="relative z-10 w-1/2 p-8 pl-24 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-xl p-12 min-h-[calc(100vh-4rem)]">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-full min-h-[600px] text-foreground focus:outline-none resize-none font-sans"
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      </div>

      {/* Right side - Chat Interface */}
      <div className="relative z-10 w-1/2 p-8 pr-24 flex flex-col">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex gap-6 mb-6 border-b pb-4">
            <button className="text-foreground font-medium border-b-2 border-[rgba(21,52,61,1)] pb-2">
              AI chat
            </button>
            <button className="text-muted-foreground font-medium pb-2">
              Team chat
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-6 py-4 rounded-2xl shadow-lg ${
                    message.isUser
                      ? 'bg-white text-foreground'
                      : 'bg-[rgba(21,52,61,1)] text-white'
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
                <span className="text-foreground">Thinking...</span>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <form className="relative">
            <textarea
              placeholder="Ask anything about this job description..."
              rows={3}
              className="w-full bg-white rounded-2xl shadow-lg px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px]"
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
    </main>
  );
};

export default Job;
