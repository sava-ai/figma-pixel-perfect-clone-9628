import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, MoreVertical, Clock, MoreHorizontal, Calendar, MessageSquare, User, Trash2, XCircle } from 'lucide-react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { InviteDialog } from '@/components/InviteDialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
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
  lastContact: string;
  match: string;
}

interface Column {
  id: string;
  title: string;
  candidates: Candidate[];
}

const CandidateCard = ({ candidate, isDragging, onReject, onDelete }: { 
  candidate: Candidate; 
  isDragging?: boolean;
  onReject: (candidateId: string) => void;
  onDelete: (candidateId: string) => void;
}) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(candidate.rating);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const companyLogos: { [key: string]: string } = {
    'Ares': companyAres,
    'Figma': companyFigma,
    'IDEO': companyIdeo,
    'Stripe': companyStripe,
  };

  const handleScheduleMeeting = () => {
    navigate('/calendar');
  };

  const handleWriteMessage = () => {
    navigate('/messages');
  };

  const handleViewProfile = () => {
    // TODO: Implement view profile
    console.log('View profile for', candidate.name);
  };

  const handleReject = () => {
    onReject(candidate.id);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete(candidate.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className={`bg-card border border-border/40 rounded-xl p-4 cursor-move transition-all ${isDragging ? 'opacity-50' : 'hover:shadow-md'}`}>
        <div className="flex items-start gap-3 mb-3">
          <img 
            src={candidate.image} 
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="font-medium text-sm text-foreground truncate">{candidate.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleScheduleMeeting}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule meeting
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleWriteMessage}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Write message
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleViewProfile}>
                    <User className="w-4 h-4 mr-2" />
                    View profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleReject}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-xs text-muted-foreground truncate">{candidate.position} - {candidate.company}</p>
          </div>
        </div>

        {/* Match score above stars */}
        <div className="mb-2">
          <span className="text-xs text-muted-foreground">{candidate.match} match</span>
        </div>

        {/* Rating stars and last contact */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
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
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs">{candidate.lastContact}</span>
          </div>
        </div>

      {/* Location and Company logos */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-xs text-muted-foreground">
            {candidate.city}, {candidate.country}
          </span>
          
          {/* Company logos */}
          <div className="flex items-center gap-1">
            {candidate.companies.slice(0, 2).map((company, idx) => (
              <div key={idx} className="w-6 h-6 rounded-full bg-white border border-border/40 flex items-center justify-center overflow-hidden">
                <img 
                  src={companyLogos[company] || companyAres} 
                  alt={company}
                  className="w-4 h-4 object-contain"
                />
              </div>
            ))}
            {candidate.companies.length > 2 && (
              <div className="w-6 h-6 rounded-full bg-muted border border-border/40 flex items-center justify-center">
                <span className="text-[10px] font-medium text-muted-foreground">+{candidate.companies.length - 2}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {candidate.name} from the pipeline. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const SortableCandidate = ({ 
  candidate, 
  onReject, 
  onDelete 
}: { 
  candidate: Candidate;
  onReject: (candidateId: string) => void;
  onDelete: (candidateId: string) => void;
}) => {
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
      <CandidateCard 
        candidate={candidate} 
        isDragging={isDragging}
        onReject={onReject}
        onDelete={onDelete}
      />
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
          lastContact: '1h ago',
          match: '10/12',
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
          lastContact: '3h ago',
          match: '11/12',
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
          lastContact: '2d ago',
          match: '9/12',
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
          lastContact: '5h ago',
          match: '8/12',
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
          lastContact: '1d ago',
          match: '12/12',
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
          lastContact: '12h ago',
          match: '10/12',
        },
      ],
    },
    {
      id: 'second-interview',
      title: 'Second interview',
      candidates: [],
    },
    {
      id: 'rejected',
      title: 'Rejected',
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

  const handleRejectCandidate = (candidateId: string) => {
    setColumns(prev => {
      const sourceColumn = prev.find(col => col.candidates.some(c => c.id === candidateId));
      const rejectedColumn = prev.find(col => col.id === 'rejected');
      
      if (!sourceColumn || !rejectedColumn) return prev;
      
      const candidate = sourceColumn.candidates.find(c => c.id === candidateId);
      if (!candidate) return prev;

      return prev.map(col => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            candidates: col.candidates.filter(c => c.id !== candidateId),
          };
        }
        if (col.id === 'rejected') {
          return {
            ...col,
            candidates: [...col.candidates, candidate],
          };
        }
        return col;
      });
    });
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setColumns(prev => prev.map(col => ({
      ...col,
      candidates: col.candidates.filter(c => c.id !== candidateId),
    })));
  };

  const activeDragCandidate = activeDragId 
    ? columns.flatMap(col => col.candidates).find(c => c.id === activeDragId)
    : null;

  if (activeDragCandidate) {
    console.log('Active drag candidate:', activeDragCandidate);
  }

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
            <div className={`flex-1 overflow-hidden bg-background rounded-[15px] relative ${isChatCollapsed ? 'mx-6' : 'ml-6 mr-6'}`}>
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="h-full overflow-x-auto overflow-y-hidden pl-6 pr-6 pt-6 pb-6">
                  <div className="flex gap-4 h-full pr-6" style={{ minWidth: 'max-content' }}>
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
                          className="flex-1 rounded-xl p-3 overflow-y-auto"
                          style={{ minHeight: '200px', backgroundColor: '#FAF8F4' }}
                        >
                          <SortableContext
                            items={column.candidates.map(c => c.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            <div className="space-y-3">
                              {column.candidates.map((candidate) => (
                                <SortableCandidate 
                                  key={candidate.id} 
                                  candidate={candidate}
                                  onReject={handleRejectCandidate}
                                  onDelete={handleDeleteCandidate}
                                />
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
                    <CandidateCard 
                      candidate={activeDragCandidate} 
                      isDragging
                      onReject={handleRejectCandidate}
                      onDelete={handleDeleteCandidate}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>

              {isChatCollapsed && (
                <button
                  onClick={() => setIsChatCollapsed(false)}
                  className="fixed bottom-8 right-8 flex items-center gap-2 px-4 py-3 rounded-full transition-all bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-xl border border-gray-700 z-50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium">AI</span>
                </button>
              )}
            </div>
          </div>
        </ResizablePanel>

        {!isChatCollapsed && <ResizableHandle className="w-0 bg-transparent" />}

        {/* Right side - Chat Interface */}
        {!isChatCollapsed && (
          <ResizablePanel defaultSize={35} minSize={30}>
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
                    onClick={() => setIsChatCollapsed(true)}
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
                    <div className="flex justify-start">
                      <div className="text-foreground px-6 py-4">
                        I can help you manage your pipeline and suggest the best candidates for each stage.
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Team Chat View */}
                    <div className="space-y-6">
                      {/* Team Member 1 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2">
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                            SM
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">Sarah Miller</span>
                          <span className="text-xs text-muted-foreground">2h ago</span>
                        </div>
                        <div className="bg-white shadow-sm text-foreground px-6 py-4 rounded-2xl ml-8">
                          Move the top candidates to screening stage
                        </div>
                        <div className="text-foreground px-6 py-4 ml-8">
                          I've moved 3 top-rated candidates to the screening stage for your review.
                        </div>
                      </div>

                      {/* Team Member 2 */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2">
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                            MC
                          </div>
                          <span className="text-sm font-medium text-muted-foreground">Mike Chen</span>
                          <span className="text-xs text-muted-foreground">5h ago</span>
                        </div>
                        <div className="bg-white shadow-sm text-foreground px-6 py-4 rounded-2xl ml-8">
                          Schedule first interviews for candidates in the screening stage
                        </div>
                        <div className="text-foreground px-6 py-4 ml-8">
                          I've scheduled interviews for next week. All candidates have been notified via email.
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input - Fixed at bottom */}
              <form className="relative flex-shrink-0">
                <textarea
                  placeholder="Ask anything about the pipeline..."
                  rows={3}
                  className="w-full bg-white rounded-2xl px-6 py-5 pr-16 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)] resize-none min-h-[80px] shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-4 bottom-4 w-10 h-10 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors shadow-md"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </ResizablePanel>
        )}
      </ResizablePanelGroup>

      <InviteDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
};

export default JobPipeline;
