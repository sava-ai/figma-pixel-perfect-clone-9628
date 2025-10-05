import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';

interface Message {
  text: string;
  isUser: boolean;
}

interface AIChatOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIChatOverlay = ({ open, onOpenChange }: AIChatOverlayProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Find me a senior product designer based in Stockholm.', isUser: true },
    { text: 'Okay! How much experience should the candidates have?', isUser: false },
    { text: '5+ years', isUser: true },
    { text: 'For sure! Is there anything else I should keep in mind?', isUser: false },
    { text: 'They should have strong Figma skills', isUser: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [chatWidth, setChatWidth] = useState(480);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth >= 320 && newWidth <= 800) {
        setChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Mock AI response after 2 seconds
    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        text: 'Great! I\'ll help you find the perfect candidate with those qualifications.', 
        isUser: false 
      }]);
    }, 2000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="p-0 flex flex-col border-r-0"
        style={{ 
          backgroundColor: '#FAF8F4',
          width: `${chatWidth}px`
        }}
      >
        {/* Close button */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-sm hover:shadow-md border border-gray-200"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Resize handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-primary/20 transition-colors z-20"
          onMouseDown={() => setIsResizing(true)}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              style={{
                animation: 'slideFromCenter 0.4s ease-out forwards',
                animationDelay: `${index * 0.05}s`
              }}
            >
              <div
                className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-md ${
                  message.isUser
                    ? 'bg-white text-foreground'
                    : 'bg-[rgba(21,52,61,1)] text-white'
                }`}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-[rgba(21,52,61,1)] text-white px-5 py-3 rounded-2xl shadow-md">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[15px]">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-0 flex-shrink-0">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder="Ask me anything..."
                className="w-full px-5 py-4 pr-14 rounded-2xl resize-none bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] leading-relaxed"
                rows={3}
                disabled={isThinking}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isThinking}
                className="absolute bottom-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
