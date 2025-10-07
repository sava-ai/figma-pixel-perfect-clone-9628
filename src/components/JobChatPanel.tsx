import { useState, useRef, useEffect } from 'react';
import { X, Users, Search as SearchIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProfileDialog } from '@/components/ProfileDialog';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';

interface Message {
  text: string;
  isUser: boolean;
  action?: 'compare' | 'similar';
}

interface LocalCandidate {
  id: number;
  name: string;
  image: string;
  city: string;
  match: string;
}

interface Candidate {
  id: number;
  name: string;
  image: string;
  city: string;
  match: string;
  description: string;
  roles: { company: string; role: string; }[];
}

interface JobChatPanelProps {
  defaultMessages?: Message[];
  placeholder?: string;
  onCollapse: () => void;
}

export const JobChatPanel = ({ 
  defaultMessages = [], 
  placeholder = "Ask anything about the candidates...",
  onCollapse
}: JobChatPanelProps) => {
  const [chatMode, setChatMode] = useState<'personal' | 'team'>('personal');
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [findSimilarOpen, setFindSimilarOpen] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<LocalCandidate[]>([]);
  const [selectedForSimilar, setSelectedForSimilar] = useState<LocalCandidate | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recentCandidates: LocalCandidate[] = [
    { id: 1, name: 'Emma', image: profile1, city: 'Stockholm', match: '10/12' },
    { id: 2, name: 'Oliver', image: profile2, city: 'Gothenburg', match: '9/12' },
    { id: 3, name: 'Emilia', image: profile3, city: 'Malmö', match: '11/12' },
    { id: 4, name: 'Lucas', image: profile4, city: 'Uppsala', match: '10/12' },
    { id: 5, name: 'Sofia', image: profile5, city: 'Lund', match: '9/12' },
  ];

  const filteredCandidates = searchQuery
    ? recentCandidates.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : recentCandidates;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleCompareSelect = (candidate: LocalCandidate) => {
    if (selectedForCompare.find(c => c.id === candidate.id)) {
      setSelectedForCompare(selectedForCompare.filter(c => c.id !== candidate.id));
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, candidate]);
    }
  };

  const handleCompareConfirm = () => {
    if (selectedForCompare.length === 2) {
      const message = `Compare candidates @${selectedForCompare[0].name} with @${selectedForCompare[1].name}`;
      setInputValue(message);
      setCompareOpen(false);
    }
  };

  const handleSimilarSelect = (candidate: LocalCandidate) => {
    setSelectedForSimilar(candidate);
  };

  const handleSimilarConfirm = () => {
    if (selectedForSimilar) {
      const message = `Find similar candidates to @${selectedForSimilar.name}`;
      setInputValue(message);
      setFindSimilarOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userMessage: Message = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Check if it's a compare or similar message
    const isCompare = inputValue.toLowerCase().includes('compare candidates');
    const isSimilar = inputValue.toLowerCase().includes('find similar');

    setTimeout(() => {
      setIsThinking(false);
      if (isCompare) {
        setMessages(prev => [...prev, { 
          text: 'I\'ve analyzed both candidates in detail. Emma has 8+ years of experience with strong Figma skills and design system expertise, while Oliver brings 7 years of experience with a focus on accessibility and inclusive design. Emma excels in fintech products, while Oliver has broader experience across fintech, e-commerce, and SaaS platforms.',
          isUser: false,
          action: 'compare'
        }]);
      } else if (isSimilar) {
        setMessages(prev => [...prev, { 
          text: 'I\'ve found 12 candidates with similar profiles to Emilia. They all have 6-9 years of experience in product design, strong portfolios in fintech and payment solutions, and expertise in user research and conversion optimization.',
          isUser: false,
          action: 'similar'
        }]);
      } else {
        setMessages(prev => [...prev, { 
          text: 'I can help you with that. Let me know if you need more information.',
          isUser: false
        }]);
      }
    }, 2000);

    // Reset selections
    setSelectedForCompare([]);
    setSelectedForSimilar(null);
  };

  const handleCheckCandidates = () => {
    // Open profile dialog with mock data
    setSelectedCandidate({
      id: 1,
      name: 'Emma Lundberg',
      image: profile3,
      city: 'Malmö',
      match: '11/12',
      description: 'Emma is an innovative Senior Product Designer known for her data-driven approach and exceptional prototyping skills. With 9 years in the industry, she has crafted user experiences for both B2B and B2C products, always focusing on measurable impact and user satisfaction metrics.',
      roles: [
        { company: 'Bambora', role: 'Lead Product Designer' },
        { company: 'iZettle', role: 'Product Designer' },
        { company: 'King', role: 'Senior UI Designer' }
      ]
    });
    setProfileDialogOpen(true);
  };

  return (
    <>
      <div className="h-full flex flex-col" style={{ backgroundColor: '#FAF8F4' }}>
        <div className="flex flex-col h-full py-6 pr-6 pl-2.5 pb-8">
          {/* Chat Header */}
          <div className="flex items-center justify-between gap-6 mb-12 flex-shrink-0 relative">
            {/* Left side - Personal/Team Switch */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setChatMode('personal')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  chatMode === 'personal' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Personal
              </button>
              <button
                onClick={() => setChatMode('team')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  chatMode === 'team' 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Team
              </button>
            </div>

            {/* Right side - Collapse Button */}
            <button
              onClick={onCollapse}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          {/* Chat Messages - Scrollable */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {chatMode === 'personal' ? (
              <>
                {messages.map((message, index) => (
                  <div key={index}>
                    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
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
                    {message.action && !message.isUser && (
                      <div className="flex justify-start mt-3">
                        <Button
                          onClick={handleCheckCandidates}
                          variant="outline"
                          size="sm"
                          className="ml-6"
                        >
                          Check candidates
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                    <div className="bg-transparent text-foreground px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Team Chat View */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                        SM
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">Sarah Miller</span>
                      <span className="text-xs text-muted-foreground">30m ago</span>
                    </div>
                    <div className="bg-white shadow-sm text-foreground px-6 py-4 rounded-2xl ml-8">
                      Compare Emma and Oliver for the senior role
                    </div>
                    <div className="text-foreground px-6 py-4 ml-8">
                      Both are excellent candidates. Emma has stronger Figma skills, while Oliver excels in accessibility design.
                    </div>
                  </div>
                </div>
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input - Fixed at bottom */}
          <div className="flex-shrink-0 space-y-2">
            {/* Compare Collapsible */}
            <Collapsible open={compareOpen} onOpenChange={setCompareOpen}>
              <CollapsibleContent className="mb-2">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Select 2 candidates to compare</h3>
                    <button onClick={() => setCompareOpen(false)}>
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-3"
                  />
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onClick={() => handleCompareSelect(candidate)}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedForCompare.find(c => c.id === candidate.id)
                            ? 'bg-primary/10 border border-primary'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <img src={candidate.image} alt={candidate.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.city}</p>
                        </div>
                        {candidate.match && <span className="text-xs text-muted-foreground">{candidate.match}</span>}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleCompareConfirm}
                    disabled={selectedForCompare.length !== 2}
                    className="w-full mt-3"
                    size="sm"
                  >
                    Confirm ({selectedForCompare.length}/2)
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Find Similar Collapsible */}
            <Collapsible open={findSimilarOpen} onOpenChange={setFindSimilarOpen}>
              <CollapsibleContent className="mb-2">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-border/40">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Select a candidate</h3>
                    <button onClick={() => setFindSimilarOpen(false)}>
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                  <Input
                    placeholder="Search candidates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-3"
                  />
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filteredCandidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onClick={() => handleSimilarSelect(candidate)}
                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                          selectedForSimilar?.id === candidate.id
                            ? 'bg-primary/10 border border-primary'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <img src={candidate.image} alt={candidate.name} className="w-8 h-8 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.city}</p>
                        </div>
                        {candidate.match && <span className="text-xs text-muted-foreground">{candidate.match}</span>}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={handleSimilarConfirm}
                    disabled={!selectedForSimilar}
                    className="w-full mt-3"
                    size="sm"
                  >
                    Confirm
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFindSimilarOpen(false);
                  setCompareOpen(!compareOpen);
                  setSearchQuery('');
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="w-4 h-4" />
                <span>Compare</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCompareOpen(false);
                  setFindSimilarOpen(!findSimilarOpen);
                  setSearchQuery('');
                }}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <SearchIcon className="w-4 h-4" />
                <span>Find similar</span>
              </Button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={placeholder}
                rows={3}
                disabled={isThinking}
                className="w-full bg-white rounded-2xl px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px] shadow-sm"
              />
              <button
                type="submit"
                disabled={isThinking || !inputValue.trim()}
                className="absolute right-4 bottom-4 w-10 h-10 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Profile Dialog */}
      <ProfileDialog 
        candidate={selectedCandidate}
        open={profileDialogOpen}
        onOpenChange={setProfileDialogOpen}
        onPrevious={() => {}}
        onNext={() => setProfileDialogOpen(false)}
        onSkip={() => setProfileDialogOpen(false)}
      />
    </>
  );
};
