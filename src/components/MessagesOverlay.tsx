import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';

interface MessagesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  buttonPosition: { top: number; right: number };
}

interface Message {
  id: number;
  name: string;
  avatar: string;
  message: string;
  time: string;
  unread: boolean;
}

const mockMessages: Message[] = [
  {
    id: 1,
    name: 'Sarah Miller',
    avatar: profile1,
    message: 'Hey! I reviewed the candidates for the UX Designer position...',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    name: 'Mike Chen',
    avatar: profile2,
    message: 'Can you send me the interview schedule for this week?',
    time: '15m ago',
    unread: true,
  },
  {
    id: 3,
    name: 'Alex Rivera',
    avatar: profile3,
    message: 'The developer candidate looks great! Let\'s move forward.',
    time: '1h ago',
    unread: false,
  },
  {
    id: 4,
    name: 'Emma Thompson',
    avatar: profile4,
    message: 'I have some questions about the COO role requirements.',
    time: '3h ago',
    unread: false,
  },
  {
    id: 5,
    name: 'David Park',
    avatar: profile5,
    message: 'Thanks for the update on the hiring timeline!',
    time: '1d ago',
    unread: false,
  },
];

const jobFilters = [
  'Chief Operations Officer',
  'UX Designer',
  'Senior Developer',
  'Product Manager',
  'Marketing Lead',
];

export const MessagesOverlay = ({ isOpen, onClose, buttonPosition }: MessagesOverlayProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesUnread = !showUnreadOnly || msg.unread;
    return matchesSearch && matchesUnread;
  });

  const handlePersonClick = () => {
    navigate('/messages');
    onClose();
  };

  const handleReadAllClick = () => {
    navigate('/messages');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Overlay */}
      <div 
        className="fixed z-50 bg-white rounded-2xl shadow-2xl w-[380px] flex flex-col"
        style={{
          top: `${buttonPosition.top}px`,
          right: `${buttonPosition.right + 60}px`,
          height: 'calc(100vh - 120px)',
          maxHeight: '700px',
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-hedvig text-2xl text-foreground">Messages</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-md"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-border space-y-3">
          {/* All/Unread Switch */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Show unread only</span>
            <Switch
              checked={showUnreadOnly}
              onCheckedChange={setShowUnreadOnly}
            />
          </div>

          {/* Job Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center justify-between px-3 py-2 bg-white rounded-lg text-sm hover:bg-accent transition-colors shadow-md">
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
          {filteredMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No messages found
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={handlePersonClick}
                className="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/50 transition-colors border-b border-border/50"
              >
                <img
                  src={msg.avatar}
                  alt={msg.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {msg.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className={`text-sm truncate ${msg.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {msg.message}
                  </p>
                </div>
                {msg.unread && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer Button */}
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleReadAllClick}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Read all messages
          </button>
        </div>
      </div>
    </>
  );
};
