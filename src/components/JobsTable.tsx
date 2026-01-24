import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Archive, Trash2 } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import starIcon from '@/assets/star-icon.svg';
import savedIcon from '@/assets/saved-icon.svg';
import contactedIcon from '@/assets/contacted-icon.svg';
import interviewedIcon from '@/assets/interviewed-icon.svg';

interface Job {
  title: string;
  userName: string;
  userAvatar?: string;
  status: 'published' | 'draft' | 'archived';
  stats: {
    found: number;
    saved: number;
    contacted: number;
    interviewed: number;
  };
  actionsNeeded?: number;
}

interface JobsTableProps {
  jobs: Job[];
}

const JobRowMenu: React.FC<{ onEdit?: () => void; onArchive?: () => void; onDelete?: () => void }> = ({
  onEdit,
  onArchive,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent transition-colors text-muted-foreground"
      >
        •••
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#EEEDEC] rounded-lg shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => { setIsOpen(false); onEdit?.(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#292524] hover:bg-gray-50 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => { setIsOpen(false); onArchive?.(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#292524] hover:bg-gray-50 transition-colors border-t border-[#EEEDEC]"
          >
            <Archive className="w-3.5 h-3.5" />
            Archive
          </button>
          <button
            onClick={() => { setIsOpen(false); onDelete?.(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-[#EEEDEC]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export const JobsTable: React.FC<JobsTableProps> = ({ jobs }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-600',
      archived: 'bg-amber-100 text-amber-700',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="text-xs font-medium text-muted-foreground pl-4">Job Title</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">Owner</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground text-center">Found</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground text-center">Saved</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground text-center">Contacted</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground text-center">Interviewed</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground">Status</TableHead>
            <TableHead className="text-xs font-medium text-muted-foreground w-10 pr-4"></TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      
      <div className="flex flex-col gap-3">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border border-[#EEEDEC] rounded-lg hover:bg-accent/30 cursor-pointer transition-colors"
            onClick={() => navigate('/job')}
          >
            <Table>
              <TableBody>
                <TableRow className="border-none hover:bg-transparent">
                  <TableCell className="font-medium text-[#292524] max-w-[300px] pl-4 py-4">
                    <span className="line-clamp-1" style={{ fontFamily: 'CustomHeading, sans-serif' }}>
                      {job.title}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <UserAvatar src={job.userAvatar} size="sm" />
                      <span className="text-sm text-foreground">{job.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <img src={starIcon} alt="" className="w-4 h-4" />
                      <span className="text-sm font-medium">{job.stats.found}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <img src={savedIcon} alt="" className="w-4 h-4" />
                      <span className="text-sm font-medium">{job.stats.saved}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <img src={contactedIcon} alt="" className="w-4 h-4" />
                      <span className="text-sm font-medium">{job.stats.contacted}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex items-center justify-center gap-1.5">
                      <img src={interviewedIcon} alt="" className="w-4 h-4" />
                      <span className="text-sm font-medium">{job.stats.interviewed}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className={`px-2 py-0.5 text-[10px] font-medium rounded-sm capitalize ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                  </TableCell>
                  <TableCell className="pr-4 py-4" onClick={(e) => e.stopPropagation()}>
                    <JobRowMenu 
                      onEdit={() => console.log('Edit', index)}
                      onArchive={() => console.log('Archive', index)}
                      onDelete={() => console.log('Delete', index)}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};
