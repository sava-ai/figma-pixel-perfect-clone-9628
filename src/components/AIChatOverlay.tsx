import React, { useState, useEffect, useRef } from 'react';
import { X, Search, GitCompare, Users } from 'lucide-react';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProfileDialog } from '@/components/ProfileDialog';

interface Message {
  text: string;
  isUser: boolean;
  action?: 'compare' | 'find-similar';
}

interface Candidate {
  id: string;
  name: string;
  image: string;
  position: string;
  company: string;
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
  const [compareOpen, setCompareOpen] = useState(false);
  const [findSimilarOpen, setFindSimilarOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<Candidate[]>([]);
  const [selectedForSimilar, setSelectedForSimilar] = useState<Candidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock candidates data
  const recentCandidates: Candidate[] = [
    { id: '1', name: 'Emma', image: '', position: 'Senior Designer', company: 'Klarna' },
    { id: '2', name: 'Oliver', image: '', position: 'Lead Designer', company: 'Spotify' },
    { id: '3', name: 'Emilia', image: '', position: 'Product Designer', company: 'Bambora' },
    { id: '4', name: 'Johan', image: '', position: 'UX Designer', company: 'Tink' },
    { id: '5', name: 'Lisa', image: '', position: 'Senior UX Designer', company: 'iZettle' },
  ];

  const filteredCandidates = recentCandidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      const message = `Compare candidates @${selectedForCompare[0].name} with @${selectedForCompare[1].name}`;
      setInputValue(message);
      setCompareOpen(false);
      setSelectedForCompare([]);
      setSearchQuery('');
    }
  };

  const handleSimilarConfirm = () => {
    if (selectedForSimilar) {
      const message = `Find similar candidates to @${selectedForSimilar.name}`;
      setInputValue(message);
      setFindSimilarOpen(false);
      setSelectedForSimilar(null);
      setSearchQuery('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const isCompareAction = inputValue.includes('Compare candidates');
    const isFindSimilarAction = inputValue.includes('Find similar candidates');
    
    const userMessage: Message = { 
      text: inputValue, 
      isUser: true,
      action: isCompareAction ? 'compare' : isFindSimilarAction ? 'find-similar' : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Mock AI response after 2 seconds
    setTimeout(() => {
      setIsThinking(false);
      
      let responseText = '';
      if (isCompareAction) {
        responseText = 'I\'ve analyzed both candidates. Emma has more experience in fintech and user research, while Oliver excels in design systems and team leadership. Both are excellent matches, but Emma might be better suited for the senior role due to her extensive background.';
      } else if (isFindSimilarAction) {
        responseText = 'I found 8 candidates with similar profiles to Emilia. They share experience in product design, fintech background, and have worked at similar-sized companies. I\'ve ranked them by match score.';
      } else {
        responseText = 'Great! I\'ll help you find the perfect candidate with those qualifications.';
      }
      
      setMessages(prev => [...prev, { 
        text: responseText, 
        isUser: false,
        action: (isCompareAction || isFindSimilarAction) ? (isCompareAction ? 'compare' : 'find-similar') : undefined
      }]);
    }, 2000);
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
            <div key={index}>
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
              
              {/* Show Check candidates button for AI responses with actions */}
              {!message.isUser && message.action && (
                <div className="flex justify-start mt-2">
                  <Button
                    onClick={() => setProfileDialogOpen(true)}
                    variant="outline"
                    size="sm"
                    className="text-sm"
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
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <GitCompare className="w-4 h-4" />
                Compare
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <p className="text-xs text-muted-foreground uppercase font-medium">Recent candidates</p>
                  {filteredCandidates.map((candidate) => (
                    <button
                      key={candidate.id}
                      onClick={() => handleCompareSelect(candidate)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedForCompare.find(c => c.id === candidate.id)
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-xs opacity-80">{candidate.position} - {candidate.company}</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    {selectedForCompare.length}/2 selected
                  </p>
                  <Button
                    size="sm"
                    onClick={handleCompareConfirm}
                    disabled={selectedForCompare.length !== 2}
                  >
                    Add to chat
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Find Similar Accordion */}
          <Collapsible open={findSimilarOpen} onOpenChange={setFindSimilarOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="w-4 h-4" />
                Find similar
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-md space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <p className="text-xs text-muted-foreground uppercase font-medium">Recent candidates</p>
                  {filteredCandidates.map((candidate) => (
                    <button
                      key={candidate.id}
                      onClick={() => handleSimilarSelect(candidate)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedForSimilar?.id === candidate.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <p className="font-medium">{candidate.name}</p>
                      <p className="text-xs opacity-80">{candidate.position} - {candidate.company}</p>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    {selectedForSimilar ? '1 selected' : 'Select a candidate'}
                  </p>
                  <Button
                    size="sm"
                    onClick={handleSimilarConfirm}
                    disabled={!selectedForSimilar}
                  >
                    Add to chat
                  </Button>
                </div>
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

        {/* Profile Dialog */}
        <ProfileDialog
          candidate={{
            id: 1,
            name: 'Emma Lundberg',
            image: '',
            city: 'Stockholm',
            match: '9/12',
            description: 'Experienced product designer with 8+ years in fintech.',
            roles: [
              { company: 'Stripe', role: 'Senior Product Designer' },
              { company: 'Figma', role: 'Lead Designer' }
            ]
          }}
          open={profileDialogOpen}
          onOpenChange={setProfileDialogOpen}
        />
      </SheetContent>
    </Sheet>
  );
};
