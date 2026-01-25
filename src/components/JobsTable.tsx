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
  status: 'published' | 'draft' | 'archived';
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
    <div className="overflow-x-auto">
      <div className="flex flex-col min-w-[1080px]">
        {/* Header row with icons */}
        <div 
          className="grid grid-cols-[minmax(180px,1fr)_140px_80px_75px_70px_90px_95px_80px_120px_40px] gap-x-2 items-center px-5 pb-3 text-xs font-medium text-muted-foreground"
          style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
        >
          <span>Job Title</span>
          <span>Owner</span>
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={starIcon} alt="" className="w-4 h-4" />
            <span>Found</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <FileCheck className="w-4 h-4" />
            <span>Applied</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={savedIcon} alt="" className="w-4 h-4" />
            <span>Saved</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={contactedIcon} alt="" className="w-4 h-4" />
            <span>Contacted</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={interviewedIcon} alt="" className="w-4 h-4" />
            <span>Interviewed</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Circle className="w-4 h-4" />
            <span>Status</span>
          </div>
          <span className="text-center">Actions</span>
          <span></span>
        </div>
        
        {/* Job rows */}
        <div className="flex flex-col gap-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="grid grid-cols-[minmax(180px,1fr)_140px_80px_75px_70px_90px_95px_80px_120px_40px] gap-x-2 items-center bg-white border border-[#EEEDEC] rounded-lg px-5 py-4 hover:bg-accent/30 cursor-pointer transition-colors"
              onClick={() => navigate('/job')}
            >
              {/* Title */}
              <span 
                className="text-sm text-[#292524] truncate pr-3 min-w-0"
                style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
              >
                {job.title}
              </span>
              
              {/* Owner */}
              <div className="flex items-center gap-2 min-w-0">
                <UserAvatar src={job.userAvatar} size="sm" />
                <span 
                  className="text-sm text-foreground truncate"
                  style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
                >
                  {job.userName.split(' ')[0]} {job.userName.split(' ')[1]?.[0]}.
                </span>
              </div>
              
              {/* Stats - numbers only, centered */}
              <span 
                className="text-sm font-medium text-center"
                style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
              >
                {job.stats.found}
              </span>
              <span 
                className="text-sm font-medium text-center"
                style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
              >
                {job.stats.applied}
              </span>
              <span 
                className="text-sm font-medium text-center"
                style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
              >
                {job.stats.saved}
              </span>
              <span 
                className="text-sm font-medium text-center"
                style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
              >
                {job.stats.contacted}
              </span>
              <span 
                className="text-sm font-medium text-center"
                style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
              >
                {job.stats.interviewed}
              </span>
              
              {/* Status */}
              <div className="flex justify-center">
                <span 
                  className={`px-2 py-0.5 text-[10px] font-medium rounded-sm capitalize ${getStatusBadge(job.status)}`}
                  style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
                >
                  {job.status}
                </span>
              </div>
              
              {/* Actions Needed */}
              <div className="flex justify-center">
                {job.actionsNeeded && job.actionsNeeded > 0 ? (
                  <button 
                    className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors whitespace-nowrap"
                    onClick={(e) => { e.stopPropagation(); navigate('/job'); }}
                    style={{ fontFamily: 'LabilGrotesk, sans-serif' }}
                  >
                    {job.actionsNeeded} actions needed
                  </button>
                ) : (
                  <span></span>
                )}
              </div>
              
              {/* Menu */}
              <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                <JobRowMenu 
                  onEdit={() => console.log('Edit', index)}
                  onArchive={() => console.log('Archive', index)}
                  onDelete={() => console.log('Delete', index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
