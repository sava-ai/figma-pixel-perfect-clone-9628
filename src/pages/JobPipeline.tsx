import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical } from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { InviteDialog } from '@/components/InviteDialog';
import userAvatarImage from '@/assets/user-avatar.png';
import jobDropdownIcon from '@/assets/job-dropdown-icon.png';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';
import profile6 from '@/assets/profile-6.jpg';
import companyAres from '@/assets/company-ares.png';
import companyFigma from '@/assets/company-figma.png';
import companyIdeo from '@/assets/company-ideo.png';
import companyStripe from '@/assets/company-stripe.png';
import starIcon from '@/assets/star-icon.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Candidate {
  id: string;
  name: string;
  image: string;
  position: string;
  company: string;
  city: string;
  country: string;
  rating: number;
  companies: string[];
}

interface Column {
  id: string;
  title: string;
  candidates: Candidate[];
}

const CandidateCard = ({ candidate, isDragging }: { candidate: Candidate; isDragging?: boolean }) => {
  const [rating, setRating] = useState(candidate.rating);

  const companyLogos: { [key: string]: string } = {
    'Ares': companyAres,
    'Figma': companyFigma,
    'IDEO': companyIdeo,
    'Stripe': companyStripe,
  };

  return (
    <div className={`bg-card border border-border/40 rounded-xl p-4 cursor-move transition-all ${isDragging ? 'opacity-50' : 'hover:shadow-md'}`}>
      <div className="flex items-start gap-3 mb-3">
        <img 
          src={candidate.image} 
          alt={candidate.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm text-foreground truncate">{candidate.name}</h3>
          <p className="text-xs text-muted-foreground truncate">{candidate.position} - {candidate.company}</p>
        </div>
      </div>

      {/* Rating stars */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={(e) => {
              e.stopPropagation();
              setRating(star);
            }}
            className="transition-transform hover:scale-110"
          >
            <img 
              src={starIcon} 
              alt="star"
              className="w-4 h-4"
              style={{
                filter: star <= rating ? 'none' : 'grayscale(100%) opacity(0.3)'
              }}
            />
          </button>
        ))}
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
          {candidate.city}, {candidate.country}
        </span>
      </div>

      {/* Company logos */}
      <div className="flex items-center gap-1">
        {candidate.companies.slice(0, 3).map((company, idx) => (
          <div key={idx} className="w-6 h-6 rounded-full bg-white border border-border/40 flex items-center justify-center overflow-hidden">
            <img 
              src={companyLogos[company] || companyAres} 
              alt={company}
              className="w-4 h-4 object-contain"
            />
          </div>
        ))}
        {candidate.companies.length > 3 && (
          <span className="text-xs text-muted-foreground ml-1">+{candidate.companies.length - 3}</span>
        )}
      </div>
    </div>
  );
};

const SortableCandidate = ({ candidate }: { candidate: Candidate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CandidateCard candidate={candidate} isDragging={isDragging} />
    </div>
  );
};

const JobPipeline = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'job' | 'people' | 'pipeline'>('pipeline');
  const [jobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);
  const [chatMode, setChatMode] = useState<'personal' | 'team'>('personal');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'ai-sourced',
      title: 'AI sourced',
      candidates: [
        {
          id: '1',
          name: 'Sarah Chapman',
          image: profile1,
          position: 'Senior Product Designer',
          company: 'Klarna',
          city: 'Stockholm',
          country: 'Sweden',
          rating: 4,
          companies: ['Stripe', 'Figma', 'IDEO'],
        },
        {
          id: '2',
          name: 'Marcus Andersson',
          image: profile2,
          position: 'Lead Designer',
          company: 'Spotify',
          city: 'Gothenburg',
          country: 'Sweden',
          rating: 5,
          companies: ['Ares', 'Figma'],
        },
      ],
    },
    {
      id: 'referred',
      title: 'Referred',
      candidates: [],
    },
    {
      id: 'sourced',
      title: 'Sourced',
      candidates: [
        {
          id: '3',
          name: 'Emma Lundberg',
          image: profile3,
          position: 'Product Designer',
          company: 'Bambora',
          city: 'Malmö',
          country: 'Sweden',
          rating: 3,
          companies: ['Stripe', 'IDEO'],
        },
      ],
    },
    {
      id: 'applied-approved',
      title: 'Applied & approved',
      candidates: [
        {
          id: '4',
          name: 'Johan Berg',
          image: profile4,
          position: 'UX Designer',
          company: 'Tink',
          city: 'Stockholm',
          country: 'Sweden',
          rating: 4,
          companies: ['Figma', 'Ares'],
        },
      ],
    },
    {
      id: 'screening',
      title: 'Screening',
      candidates: [
        {
          id: '5',
          name: 'Lisa Svensson',
          image: profile5,
          position: 'Senior UX Designer',
          company: 'iZettle',
          city: 'Stockholm',
          country: 'Sweden',
          rating: 5,
          companies: ['Stripe', 'Figma', 'IDEO', 'Ares'],
        },
      ],
    },
    {
      id: 'first-interview',
      title: 'First interview',
      candidates: [
        {
          id: '6',
          name: 'Anders Nilsson',
          image: profile6,
          position: 'Product Designer',
          company: 'King',
          city: 'Stockholm',
          country: 'Sweden',
          rating: 4,
          companies: ['Figma', 'IDEO'],
        },
      ],
    },
    {
      id: 'second-interview',
      title: 'Second interview',
      candidates: [],
    },
    {
      id: 'rejected-noticed',
      title: 'Rejected & noticed',
      candidates: [],
    },
    {
      id: 'top-picks',
      title: 'Top picks',
      candidates: [],
    },
  ]);

  const jobs = [
    { id: 1, title: 'Senior product designer' },
    { id: 2, title: 'Backend Engineer' },
    { id: 3, title: 'Frontend Developer' }
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveDragId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source and destination columns
    let sourceColumn: Column | undefined;
    let destColumn: Column | undefined;
    let candidate: Candidate | undefined;

    for (const col of columns) {
      const foundCandidate = col.candidates.find(c => c.id === activeId);
      if (foundCandidate) {
        sourceColumn = col;
        candidate = foundCandidate;
      }
      if (col.id === overId || col.candidates.some(c => c.id === overId)) {
        destColumn = col;
      }
    }

    if (!sourceColumn || !destColumn || !candidate) return;

    // If dropped on the same column, do nothing
    if (sourceColumn.id === destColumn.id) return;

    // Move candidate
    setColumns(prev => prev.map(col => {
      if (col.id === sourceColumn!.id) {
        return {
          ...col,
          candidates: col.candidates.filter(c => c.id !== activeId),
        };
      }
      if (col.id === destColumn!.id) {
        return {
          ...col,
          candidates: [...col.candidates, candidate!],
        };
      }
      return col;
    }));
  };

  const activeDragCandidate = activeDragId 
    ? columns.flatMap(col => col.candidates).find(c => c.id === activeDragId)
    : null;

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
              <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
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
                    <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded" />
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
            onClick={() => navigate('/job')}
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
            onClick={() => navigate('/job/people/view')}
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
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'pipeline' 
                ? 'bg-gradient-to-b from-white to-gray-100 shadow-md border border-gray-200 text-gray-700 font-medium' 
                : 'text-foreground hover:text-foreground'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            Pipeline
          </button>
        </div>

        {/* Right side - Profile, Invite, More */}
        <div className="flex items-center gap-3">
          <img 
            src={userAvatarImage} 
            alt="Profile" 
            className="w-9 h-9 rounded-full object-cover shadow-md border-2 border-gray-200"
          />
          <button 
            onClick={() => setInviteDialogOpen(true)}
            className="px-3 py-1.5 rounded-lg font-medium transition-all bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-md hover:shadow-lg border border-gray-700"
          >
            Invite
          </button>
          <button className="w-9 h-9 rounded-lg flex items-center justify-center transition-all bg-gradient-to-b from-white to-gray-100 shadow-md hover:shadow-lg border border-gray-200">
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Main Content with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1 overflow-hidden">
        {/* Left Panel - Pipeline View */}
        <ResizablePanel defaultSize={isChatCollapsed ? 100 : 65} minSize={30}>
          <div className="h-full flex flex-col py-6 pb-8 relative" style={{ backgroundColor: '#FAF8F4' }}>
            <div className={`flex-1 overflow-hidden bg-background rounded-[15px] relative ${isChatCollapsed ? 'mx-6' : 'ml-6 mr-2.5'}`}>
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="h-full overflow-x-auto overflow-y-hidden p-6">
                  <div className="flex gap-4 h-full" style={{ minWidth: 'max-content' }}>
                    {columns.map((column) => (
                      <div
                        key={column.id}
                        className="flex-shrink-0 w-[280px] flex flex-col"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-medium text-sm text-foreground">{column.title}</h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {column.candidates.length}
                          </span>
                        </div>
                        <div 
                          className="flex-1 bg-muted/20 rounded-xl p-3 overflow-y-auto"
                          style={{ minHeight: '200px' }}
                        >
                          <SortableContext
                            items={column.candidates.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="space-y-3">
                              {column.candidates.map((candidate) => (
                                <SortableCandidate key={candidate.id} candidate={candidate} />
                              ))}
                            </div>
                          </SortableContext>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <DragOverlay>
                  {activeDragCandidate ? (
                    <CandidateCard candidate={activeDragCandidate} isDragging />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </div>
          </div>
        </ResizablePanel>

        {!isChatCollapsed && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35} minSize={25} maxSize={50}>
              <div className="h-full flex flex-col py-6 pb-8 relative" style={{ backgroundColor: '#FAF8F4' }}>
                <div className="flex-1 overflow-hidden bg-background rounded-[15px] relative mr-6 ml-2.5 flex flex-col">
                  {/* Chat header */}
                  <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-lg font-semibold">AI Assistant</h2>
                      <button 
                        onClick={() => setIsChatCollapsed(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setChatMode('personal')}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          chatMode === 'personal'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        Personal
                      </button>
                      <button
                        onClick={() => setChatMode('team')}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                          chatMode === 'team'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        Team
                      </button>
                    </div>
                  </div>

                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg p-3">
                            <p className="text-sm">I can help you manage your pipeline and suggest the best candidates for each stage.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat input */}
                  <div className="p-4 border-t" style={{ backgroundColor: '#FAF8F4' }}>
                    <form className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Ask AI assistant..."
                          className="w-full px-4 py-2 pr-12 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
};

export default JobPipeline;
