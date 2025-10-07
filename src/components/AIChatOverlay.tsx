import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Users, UserCheck } from 'lucide-react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProfileDialog } from './ProfileDialog';

interface Message {
  text: string;
  isUser: boolean;
  action?: 'compare' | 'find-similar';
}

interface Candidate {
  id: string;
  name: string;
  role: string;
}

interface AIChatOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AIChatOverlay = ({ open, onOpenChange }: AIChatOverlayProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'What are the wages for product designers in Warsaw right now?', isUser: true },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(true);
  const [chatWidth, setChatWidth] = useState(window.innerWidth * 0.3); // 30% of screen width
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Compare and Find Similar states
  const [compareOpen, setCompareOpen] = useState(false);
  const [findSimilarOpen, setFindSimilarOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Candidate[]>([]);
  const [selectedForSimilar, setSelectedForSimilar] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Mock recent candidates
  const recentCandidates: Candidate[] = [
    { id: '1', name: 'Emma Wilson', role: 'Senior Product Designer' },
    { id: '2', name: 'Oliver Karlsson', role: 'UX Designer' },
    { id: '3', name: 'Emilia Chen', role: 'Product Designer' },
    { id: '4', name: 'Marcus Andersson', role: 'UI/UX Designer' },
    { id: '5', name: 'Sarah Chapman', role: 'Lead Designer' },
  ];

  // Simulate AI response after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, { 
        text: 'Based on current market data, product designers in Warsaw typically earn between 8,000-15,000 PLN per month for mid-level positions, and 12,000-22,000 PLN for senior roles. These figures can vary based on company size, experience, and specific skills like UX research or UI specialization.', 
        isUser: false 
      }]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      const minWidth = window.innerWidth * 0.2; // 20% minimum
      const maxWidth = window.innerWidth * 0.5; // 50% maximum
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setChatWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const handleCompareSelect = (candidate: Candidate) => {
    if (selectedForCompare.find(c => c.id === candidate.id)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.id !== candidate.id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, candidate]);
    }
  };

  const handleSimilarSelect = (candidate: Candidate) => {
    setSelectedForSimilar(candidate);
  };

  const handleCompareConfirm = () => {
    if (selectedForCompare.length === 2) {
      setInputValue(`Compare candidates @${selectedForCompare[0].name} with @${selectedForCompare[1].name}`);
      setCompareOpen(false);
      setSelectedForCompare([]);
    }
  };

  const handleSimilarConfirm = () => {
    if (selectedForSimilar) {
      setInputValue(`Find similar candidates to @${selectedForSimilar.name}`);
      setFindSimilarOpen(false);
      setSelectedForSimilar(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const isCompareMessage = inputValue.startsWith('Compare candidates');
    const isFindSimilarMessage = inputValue.startsWith('Find similar candidates');

    const userMessage: Message = { 
      text: inputValue, 
      isUser: true,
      action: isCompareMessage ? 'compare' : isFindSimilarMessage ? 'find-similar' : undefined
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Mock AI response after 2 seconds
    setTimeout(() => {
      setIsThinking(false);
      if (isCompareMessage) {
        setMessages(prev => [...prev, { 
          text: 'I\'ve analyzed both candidates in detail. Emma has 8 years of experience with strong UI skills, while Oliver excels in UX research with 6 years of experience. Emma would be better for visual design projects, while Oliver is ideal for user research-focused roles.', 
          isUser: false,
          action: 'compare'
        }]);
      } else if (isFindSimilarMessage) {
        setMessages(prev => [...prev, { 
          text: 'I found 3 candidates with similar profiles to Emilia. They all have 5-7 years of experience in product design, strong portfolio work, and expertise in both UI and UX.', 
          isUser: false,
          action: 'find-similar'
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: 'Great! I\'ll help you find the perfect candidate with those qualifications.', 
          isUser: false 
        }]);
      }
    }, 2000);
  };

  const handleCheckCandidates = () => {
    setSelectedCandidate({
      name: "Emma Wilson",
      city: "Stockholm",
      profileImage: "/src/assets/profile-1.jpg",
      role: "Senior Product Designer"
    });
    setProfileDialogOpen(true);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="p-0 flex flex-col border-r-0 [&>button]:hidden"
        style={{ 
          backgroundColor: '#FAF8F4',
          width: `${chatWidth}px`,
          maxWidth: `${chatWidth}px`,
          minWidth: `${chatWidth}px`
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
          className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-primary/30 active:bg-primary/50 transition-colors z-20"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
          }}
        />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 pt-16 pb-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="space-y-2">
              <div
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: 'slideFromCenter 0.4s ease-out forwards',
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <div
                  className={`max-w-[85%] px-5 py-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-white text-foreground shadow-md'
                      : 'text-foreground'
                  }`}
                >
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {message.text}
                  </p>
                </div>
              </div>
              {!message.isUser && (message.action === 'compare' || message.action === 'find-similar') && (
                <div className="flex justify-start">
                  <Button
                    onClick={handleCheckCandidates}
                    variant="outline"
                    size="sm"
                    className="ml-5 bg-white shadow-sm hover:shadow-md"
                  >
                    Check candidates
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {isThinking && (
            <div className="flex justify-start">
              <div className="bg-transparent text-foreground px-5 py-3 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[15px]">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-0 flex-shrink-0 space-y-3">
          {/* Compare Accordion */}
          <Collapsible open={compareOpen} onOpenChange={setCompareOpen}>
            <CollapsibleContent className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-3">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <p className="text-xs text-gray-500 px-2 py-1">Recent candidates</p>
                  {recentCandidates
                    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(candidate => (
                      <button
                        key={candidate.id}
                        onClick={() => handleCompareSelect(candidate)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                          selectedForCompare.find(c => c.id === candidate.id) ? 'bg-primary/10' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{candidate.name}</p>
                          <p className="text-xs text-gray-500 truncate">{candidate.role}</p>
                        </div>
                        {selectedForCompare.find(c => c.id === candidate.id) && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                </div>
                <Button
                  onClick={handleCompareConfirm}
                  disabled={selectedForCompare.length !== 2}
                  className="w-full"
                  size="sm"
                >
                  Compare {selectedForCompare.length}/2 selected
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Find Similar Accordion */}
          <Collapsible open={findSimilarOpen} onOpenChange={setFindSimilarOpen}>
            <CollapsibleContent className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-3">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  <p className="text-xs text-gray-500 px-2 py-1">Recent candidates</p>
                  {recentCandidates
                    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(candidate => (
                      <button
                        key={candidate.id}
                        onClick={() => handleSimilarSelect(candidate)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                          selectedForSimilar?.id === candidate.id ? 'bg-primary/10' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{candidate.name}</p>
                          <p className="text-xs text-gray-500 truncate">{candidate.role}</p>
                        </div>
                        {selectedForSimilar?.id === candidate.id && (
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                </div>
                <Button
                  onClick={handleSimilarConfirm}
                  disabled={!selectedForSimilar}
                  className="w-full"
                  size="sm"
                >
                  Find similar
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

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
                className="w-full px-5 py-4 pr-14 pb-14 rounded-2xl resize-none bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-[15px] leading-relaxed"
                rows={3}
                disabled={isThinking}
              />
              {/* Action Buttons */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCompareOpen(!compareOpen);
                      setFindSimilarOpen(false);
                      setSearchQuery('');
                    }}
                    className="h-8 px-3 text-xs bg-gray-100 hover:bg-gray-200"
                  >
                    <Users className="w-3.5 h-3.5 mr-1.5" />
                    Compare
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFindSimilarOpen(!findSimilarOpen);
                      setCompareOpen(false);
                      setSearchQuery('');
                    }}
                    className="h-8 px-3 text-xs bg-gray-100 hover:bg-gray-200"
                  >
                    <Search className="w-3.5 h-3.5 mr-1.5" />
                    Find similar
                  </Button>
                </CollapsibleTrigger>
              </div>
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
        
        {/* Profile Dialog */}
        {selectedCandidate && (
          <ProfileDialog
            candidate={selectedCandidate}
            open={profileDialogOpen}
            onOpenChange={setProfileDialogOpen}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
