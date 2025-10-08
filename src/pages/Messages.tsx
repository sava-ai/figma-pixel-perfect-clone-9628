import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Sparkles, Award, FileText, ExternalLink, Phone, Mail, Linkedin, Link as LinkIcon, Send, ChevronLeft, ChevronRight, MoreHorizontal, User, XCircle, Paperclip, Bot } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AskAIPopover } from '@/components/AskAIPopover';
import { useAIPersonalize } from '@/hooks/useAIPersonalize';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import backgroundImage from '@/assets/background.png';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';
import aresLogo from '@/assets/company-ares.png';
import stripeLogo from '@/assets/company-stripe.png';
import figmaLogo from '@/assets/company-figma.png';
import ideoLogo from '@/assets/company-ideo.png';

interface Message {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: boolean;
  city: string;
  country: string;
}

interface ChatMessage {
  id: number;
  text: string;
  isMe: boolean;
  time: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    name: 'Sarah Miller',
    avatar: profile1,
    message: 'Hey! I reviewed the candidates for the UX Designer position...',
    time: '2m ago',
    unread: true,
    city: 'Stockholm',
    country: 'Sweden',
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: profile2,
    message: 'Can you send me the interview schedule for this week?',
    time: '15m ago',
    unread: true,
    city: 'Gothenburg',
    country: 'Sweden',
  },
  {
    id: 3,
    name: 'Alex Rivera',
    avatar: profile3,
    message: 'The developer candidate looks great! Let\'s move forward.',
    time: '1h ago',
    unread: false,
    city: 'Malmö',
    country: 'Sweden',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    avatar: profile4,
    message: 'I have some questions about the COO role requirements.',
    time: '3h ago',
    unread: false,
    city: 'Uppsala',
    country: 'Sweden',
  },
  {
    id: 5,
    name: 'David Park',
    avatar: profile5,
    message: 'Thanks for the update on the hiring timeline!',
    time: '1d ago',
    unread: false,
    city: 'Lund',
    country: 'Sweden',
  },
];

const mockChatHistory: ChatMessage[] = [
  { id: 1, text: 'Hey! I reviewed the candidates for the UX Designer position and I think we have some strong contenders.', isMe: false, time: '10:30 AM' },
  { id: 2, text: 'That\'s great! Which ones stood out to you?', isMe: true, time: '10:32 AM' },
  { id: 3, text: 'Sophia Anderson and Marcus Johnson both have impressive portfolios. Sophia has more fintech experience, while Marcus brings startup energy.', isMe: false, time: '10:35 AM' },
  { id: 4, text: 'Perfect. Let\'s schedule calls with both of them next week.', isMe: true, time: '10:36 AM' },
  { id: 5, text: 'Will do! I\'ll send out the invites today.', isMe: false, time: '10:37 AM' },
];

const jobFilters = [
  'Chief Operations Officer',
  'UX Designer',
  'Senior Developer',
  'Product Manager',
  'Marketing Lead',
];

const achievements = [
  "Award winner UX hackathon 2025",
  "AI First",
  "Forbes 30 under 30",
  "UX Planning",
  "Startup Experience",
  "Design Systems Expert",
  "Fintech Specialist"
];

const roles = [
  { company: 'Ares Studio', role: 'Senior Product Designer' },
  { company: 'Stripe', role: 'Product Designer' },
  { company: 'Figma', role: 'UX Designer' },
  { company: 'IDEO', role: 'Design Intern' },
];

const companyLogos: Record<string, string> = {
  "Ares Studio": aresLogo,
  "Stripe": stripeLogo,
  "Figma": figmaLogo,
  "IDEO": ideoLogo,
};

const Messages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Message>(mockMessages[0]);
  const [messageInput, setMessageInput] = useState('');
  const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(false);
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const { isPersonalizing, personalizeText } = useAIPersonalize();

  const handlePersonalize = async () => {
    if (!messageInput.trim()) return;
    const personalized = await personalizeText(messageInput, {
      name: selectedPerson.name,
      role: 'colleague'
    });
    setMessageInput(personalized);
  };

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnread = !showUnreadOnly || msg.unread;
    return matchesSearch && matchesUnread;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // In real app, send message here
      setMessageInput('');
    }
  };

  const handleViewProfile = (personId: number) => {
    console.log('View profile for person:', personId);
    // TODO: Implement view profile
  };

  const handleReject = (personId: number) => {
    console.log('Reject person:', personId);
    // TODO: Implement reject logic
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      
      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border px-6 py-4 flex items-center gap-4" style={{ backgroundColor: '#FAF8F4' }}>
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-hedvig text-3xl">Messages</h1>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Chat List */}
          <aside className="w-[380px] bg-white border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white rounded-full pl-10 pr-4 py-2 text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Show unread only</span>
                <Switch
                  checked={showUnreadOnly}
                  onCheckedChange={setShowUnreadOnly}
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded-lg text-sm hover:bg-accent transition-colors border border-border">
                    <span className="text-muted-foreground">
                      {selectedJob || 'Filter by job'}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[340px] p-0" align="start">
                  <div className="p-2">
                    <button
                      onClick={() => setSelectedJob(null)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors ${
                        !selectedJob ? 'bg-muted font-medium' : ''
                      }`}
                    >
                      All jobs
                    </button>
                    {jobFilters.map((job) => (
                      <button
                        key={job}
                        onClick={() => setSelectedJob(job)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors ${
                          selectedJob === job ? 'bg-muted font-medium' : ''
                        }`}
                      >
                        {job}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onMouseEnter={() => setHoveredMessageId(msg.id)}
                  onMouseLeave={() => {
                    // Only hide if dropdown is not open
                    if (openDropdownId !== msg.id) {
                      setHoveredMessageId(null);
                    }
                  }}
                  onClick={() => setSelectedPerson(msg)}
                  className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border/50 cursor-pointer ${
                    selectedPerson.id === msg.id ? '' : ''
                  }`}
                  style={selectedPerson.id === msg.id ? { backgroundColor: '#FAF8F4' } : {}}
                >
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {msg.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {(hoveredMessageId === msg.id || openDropdownId === msg.id) && (
                          <DropdownMenu
                            onOpenChange={(open) => {
                              setOpenDropdownId(open ? msg.id : null);
                              if (!open) {
                                setHoveredMessageId(null);
                              }
                            }}
                          >
                            <DropdownMenuTrigger asChild>
                              <button 
                                className="w-7 h-7 rounded-full bg-white border border-border/40 flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(msg.id);
                              }}>
                                <User className="w-4 h-4 mr-2" />
                                View profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleReject(msg.id);
                              }}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                    <p className={`text-sm truncate ${msg.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                      {msg.message}
                    </p>
                  </div>
                  {msg.unread && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Middle - Chat Area */}
          <div className="flex-1 flex flex-col" style={{ backgroundColor: '#FAF8F4' }}>
            {/* Chat Header */}
            <div className="px-6 py-4 bg-white border-b border-border flex items-center gap-3">
              <img
                src={selectedPerson.avatar}
                alt={selectedPerson.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{selectedPerson.name}</h3>
                <p className="text-xs text-muted-foreground">Active now</p>
              </div>
              {/* Toggle Button when collapsed */}
              {isRightPanelCollapsed && (
                <button
                  onClick={() => setIsRightPanelCollapsed(false)}
                  className="w-8 h-8 bg-muted border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {mockChatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${msg.isMe ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        msg.isMe
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-border">
              <TooltipProvider>
                <div className="relative flex items-center gap-2">
                  {/* Icon buttons on the left */}
                  <div className="flex items-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-muted text-muted-foreground hover:text-foreground"
                        >
                          <Paperclip className="w-5 h-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Attach attachment</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={handlePersonalize}
                          disabled={isPersonalizing || !messageInput.trim()}
                          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-50"
                        >
                          <Sparkles className="w-5 h-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>AI personalize</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <AskAIPopover
                        trigger={
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              <Bot className="w-5 h-5" />
                            </button>
                          </TooltipTrigger>
                        }
                        onApply={(answer) => {
                          setMessageInput(prev => prev ? prev + '\n\n' + answer : answer);
                        }}
                      />
                      <TooltipContent>
                        <p>Ask AI</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  {/* Input field */}
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="w-full bg-white rounded-full pl-6 pr-14 py-3 text-sm text-foreground shadow-md border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {isPersonalizing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-xs font-medium">Personalizing...</span>
                        </div>
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </TooltipProvider>
            </form>
          </div>

          {/* Right Sidebar - Profile */}
          <aside 
            className={`bg-white border-l border-border overflow-y-auto transition-all duration-300 ${
              isRightPanelCollapsed ? 'w-0' : 'w-[380px]'
            }`}
          >
            <div className={`p-6 space-y-6 ${isRightPanelCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
              {/* Toggle Button when expanded - at top left */}
              {!isRightPanelCollapsed && (
                <button
                  onClick={() => setIsRightPanelCollapsed(true)}
                  className="w-8 h-8 bg-muted border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors mb-4"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center space-y-3">
                <img 
                  src={selectedPerson.avatar} 
                  alt={selectedPerson.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedPerson.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPerson.city}, {selectedPerson.country}</p>
                </div>
              </div>

              {/* AI Summary */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium">AI Summary</p>
                </div>
                <p className="text-sm text-black leading-relaxed font-light">
                  {selectedPerson.name} is an exceptional professional with extensive experience in their field. Known for strong collaboration skills and innovative problem-solving abilities.
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {achievements.slice(0, 5).map((achievement, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1.5" style={{ backgroundColor: '#FAF8F4' }}>
                    {achievement}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* About Section */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">About</h4>
                
                {/* AI Analysis */}
                <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: '#FAF8F4' }}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">AI Analysis</p>
                  </div>
                  <p className="text-sm text-black leading-relaxed font-light">
                    <span className="font-normal">{selectedPerson.name}</span> is an <span className="font-normal">exceptional match</span> for collaborative projects. With <span className="font-normal">extensive experience</span> and <span className="font-normal">proven leadership abilities</span>, they demonstrate <span className="font-normal">strong alignment</span> with team goals. Their work showcases a deep understanding of <span className="font-normal">modern best practices</span> and ability to deliver results.
                  </p>
                </div>

                {/* Experience */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold">Experience</h5>
                  <div className="space-y-3">
                    {roles.map((role, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border">
                          <img 
                            src={companyLogos[role.company] || aresLogo} 
                            alt={role.company}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{role.role}</p>
                          <p className="text-xs text-muted-foreground">{role.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Contact Info */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold">Contact Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>+46 70 123 45 67</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedPerson.name.toLowerCase().replace(' ', '.')}@email.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      <a href="#" className="text-primary hover:underline">linkedin.com/in/{selectedPerson.name.toLowerCase().replace(' ', '-')}</a>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Achievements */}
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold">Achievements & Portfolio</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span>UX Hackathon Winner 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <a href="#" className="text-primary hover:underline flex items-center gap-1">
                        Portfolio
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      <a href="#" className="text-primary hover:underline flex items-center gap-1">
                        Personal Website
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Messages;
