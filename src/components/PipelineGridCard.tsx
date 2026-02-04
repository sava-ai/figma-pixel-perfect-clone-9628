import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Calendar, MessageSquare, User, Trash2, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

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
  engagementRate: number;
  status?: 'saved' | 'contacted' | 'interview';
  statusLabel?: string;
  statusDate?: string;
  followUp?: string;
}

interface PipelineGridCardProps {
  candidate: Candidate;
  onReject: (candidateId: string) => void;
  onDelete: (candidateId: string) => void;
}

export const PipelineGridCard = ({ candidate, onReject, onDelete }: PipelineGridCardProps) => {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleScheduleMeeting = () => {
    navigate('/calendar');
  };

  const handleWriteMessage = () => {
    navigate('/messages');
  };

  const handleViewProfile = () => {
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

  // Determine status styling
  const getStatusStyle = () => {
    switch (candidate.status) {
      case 'saved':
        return 'bg-muted text-muted-foreground';
      case 'contacted':
        return 'bg-muted text-muted-foreground';
      case 'interview':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <div className="bg-card border border-border/40 rounded-xl p-5 transition-all hover:shadow-md hover:border-border">
        {/* Header with avatar and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <img 
              src={candidate.image} 
              alt={candidate.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {/* Blue verified badge */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle()}`}>
              {candidate.statusLabel || 'Saved'}
            </span>
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
        </div>

        {/* Name */}
        <h3 className="text-base font-medium text-foreground mb-2" style={{ fontFamily: 'CooperLight, sans-serif' }}>
          {candidate.name}
        </h3>

        {/* Status info */}
        <p className="text-sm text-muted-foreground mb-1">
          {candidate.statusLabel || 'Saved'} • {candidate.statusDate || 'Just now'}
        </p>
        
        {candidate.followUp && (
          <p className="text-sm text-muted-foreground mb-4">
            {candidate.followUp}
          </p>
        )}

        {/* Role tag */}
        <div className="mt-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm">
            <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </span>
            {candidate.position}
          </span>
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
