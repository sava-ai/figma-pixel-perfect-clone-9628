import React from 'react';
import { UserAvatar } from './UserAvatar';
import { JobStatsExtended } from './JobStats';
import { ActionButtons } from './ActionButtons';
import jobIcon from '@/assets/job-icon.svg';
import starIcon from '@/assets/star-icon.svg';
import savedIcon from '@/assets/saved-icon.svg';
import contactedIcon from '@/assets/contacted-icon.svg';
import interviewedIcon from '@/assets/interviewed-icon.svg';

interface JobCardProps {
  title: string;
  userName: string;
  userAvatar?: string;
  isPublished?: boolean;
  stats: {
    found: number;
    saved: number;
    contacted: number;
    interviewed: number;
  };
  actionsNeeded?: number;
  onMenuClick?: () => void;
  onActionClick?: () => void;
  layout?: 'full' | 'compact';
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  userName,
  userAvatar,
  isPublished = true,
  stats,
  actionsNeeded = 4,
  onMenuClick,
  onActionClick,
}) => {
  return (
    <article className="bg-[#FFFFFF] rounded-lg p-6 border border-[#EEEDEC] flex flex-col h-full">
      <header className="flex items-center justify-between mb-6">
        <div className="bg-[#292524] rounded-lg w-9 h-9 flex items-center justify-center">
          <img src={jobIcon} alt="Job" className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-foreground">
          <div className="w-2 h-2 rounded-full bg-[#292524]" />
          <span>{isPublished ? 'Published' : 'Draft'}</span>
        </div>
      </header>

      <h3 className="text-[#292524] text-lg font-medium mb-4" style={{ fontFamily: 'CustomHeading, sans-serif' }}>
        {title}
      </h3>

      <div className="flex items-center gap-2 text-xs mb-6">
        <UserAvatar src={userAvatar} size="sm" />
        <span className="text-foreground">{userName}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <img src={starIcon} alt="Found" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.found}</div>
          <div className="text-[10px] text-muted-foreground">Found</div>
        </div>
        <div className="flex flex-col items-center">
          <img src={savedIcon} alt="Saved" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.saved}</div>
          <div className="text-[10px] text-muted-foreground">Saved</div>
        </div>
        <div className="flex flex-col items-center">
          <img src={contactedIcon} alt="Contacted" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.contacted}</div>
          <div className="text-[10px] text-muted-foreground">Contacted</div>
        </div>
        <div className="flex flex-col items-center">
          <img src={interviewedIcon} alt="Interviewed" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.interviewed}</div>
          <div className="text-[10px] text-muted-foreground">Interviewed</div>
        </div>
      </div>

      <footer className="mt-auto">
        <ActionButtons 
          actionsNeeded={actionsNeeded}
          onMenuClick={onMenuClick}
          onActionClick={onActionClick}
        />
      </footer>
    </article>
  );
};
