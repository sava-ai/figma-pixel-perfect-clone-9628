import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Archive, Trash2, Circle, FileCheck } from 'lucide-react';
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
  company?: string;
  status: 'published' | 'draft' | 'archived';
  sourcingStatus?: 'completed' | 'in_progress' | 'none';
  newMatches?: number;
  newApplied?: number;
  stats: {
    found: number;
    applied: number;
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
        className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-[#EFEEED] hover:bg-[#F0F0EB] transition-colors text-[#666663]"
      >
        •••
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-[#EEEDEC] rounded-lg shadow-lg z-50 overflow-hidden">
          <button
            onClick={() => { setIsOpen(false); onArchive?.(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#262625] hover:bg-[#F0F0EB] transition-colors"
          >
            <Archive className="w-3.5 h-3.5" />
            Archive
          </button>
          <button
            onClick={() => { setIsOpen(false); onDelete?.(); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#BF4D43] hover:bg-[#F0F0EB] transition-colors border-t border-[#EEEDEC]"
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
    <div className="grid grid-cols-3 gap-4">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="bg-white border border-[#E6E6E6] rounded-xl p-5 hover:bg-[#F0F0EB] cursor-pointer transition-colors flex flex-col"
          onClick={() => navigate('/job/people/view')}
        >
          {/* Header: Status + Menu */}
          <div className="flex items-center justify-between mb-3">
            <span 
              className={`px-2 py-0.5 text-[10px] font-medium rounded-sm capitalize ${getStatusBadge(job.status)}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {job.status}
            </span>
            
            {/* Sourcing Status Notification */}
            <div className="flex items-center">
              {job.sourcingStatus === 'completed' && job.newMatches && job.newMatches > 0 ? (
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-sm bg-[#EBDBBC] text-[#262625]">
                  {job.newMatches} new matches
                </span>
              ) : job.sourcingStatus === 'in_progress' ? (
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-sm bg-[#D4A27F] text-[#262625] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CC785C] animate-pulse"></span>
                  Sourcing enabled
                </span>
              ) : job.sourcingStatus === 'none' ? (
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-sm bg-[#F0F0EB] text-[#666663]">
                  Sourcing disabled
                </span>
              ) : null}
            </div>
          </div>

          {/* Title */}
          <h3 
            className="text-base text-[#292524] mb-3 line-clamp-2 min-h-[40px]"
            style={{ fontFamily: 'CooperLight, serif' }}
          >
            {job.title}
          </h3>

          {/* Company */}
          {job.company && (
            <p 
              className="text-sm text-muted-foreground mb-3 -mt-1"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {job.company}
            </p>
          )}

          {/* Owner */}
          <div className="flex items-center gap-2 mb-4">
            <UserAvatar src={job.userAvatar} size="sm" />
            <span 
              className="text-muted-foreground"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
            >
              {job.userName.split(' ')[0]} {job.userName.split(' ')[1]?.[0]}.
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between gap-2 mb-4 pt-3 border-t border-[#EEEDEC]">
            <div className="flex flex-col items-center gap-0.5">
              <img src={starIcon} alt="" className="w-4 h-4" />
              <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>{job.stats.found}</span>
              <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>Found</span>
            </div>
            <div className="flex flex-col items-center gap-0.5 relative">
              <FileCheck className="w-4 h-4 text-[#262625]" />
              <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
                {job.stats.applied}
              </span>
              <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>Applied</span>
              {typeof job.newApplied === 'number' && job.newApplied > 0 && (
                <span className="absolute -top-1 -right-2 px-1 py-0.5 text-[8px] font-medium rounded-full bg-[#CC785C] text-white min-w-[16px] text-center">
                  +{job.newApplied}
                </span>
              )}
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <img src={savedIcon} alt="" className="w-4 h-4" />
              <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>{job.stats.saved}</span>
              <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>Saved</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <img src={contactedIcon} alt="" className="w-4 h-4" />
              <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>{job.stats.contacted}</span>
              <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>Contacted</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <img src={interviewedIcon} alt="" className="w-4 h-4" />
              <span className="font-medium" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>{job.stats.interviewed}</span>
              <span className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px' }}>Interviewed</span>
            </div>
          </div>

          {/* Actions Needed */}
          <div className="flex items-center gap-2 mt-auto">
            <div onClick={(e) => e.stopPropagation()}>
              <JobRowMenu 
                onEdit={() => console.log('Edit', index)}
                onArchive={() => console.log('Archive', index)}
                onDelete={() => console.log('Delete', index)}
              />
            </div>
            {job.actionsNeeded && job.actionsNeeded > 0 && (
              <button 
                className="flex-1 px-3 py-2 bg-white border border-[#EFEEED] text-[#262625] rounded-md hover:bg-[#F0F0EB] transition-colors"
                onClick={(e) => { e.stopPropagation(); navigate('/job/people/view'); }}
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}
              >
                {job.actionsNeeded} actions needed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
