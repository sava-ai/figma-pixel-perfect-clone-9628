import React from 'react';
import { UserAvatar } from './UserAvatar';
import { JobStatsExtended } from './JobStats';
import { ActionButtons } from './ActionButtons';
import jobIcon from '@/assets/job-icon-new.svg';
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
  newStats?: {
    found?: number;
    saved?: number;
    contacted?: number;
    interviewed?: number;
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
  newStats,
  actionsNeeded = 4,
  onMenuClick,
  onActionClick,
}) => {
  return (
    <article className="bg-[#FFFFFF] rounded-lg p-6 border border-[#EEEDEC] flex flex-col h-full">
      <div className="mb-2">
        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
          isPublished 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {isPublished ? 'Published' : 'Draft'}
        </span>
      </div>

      <h3 className="text-[#292524] text-lg font-medium mb-4" style={{ fontFamily: 'CustomHeading, sans-serif' }}>
        {title}
      </h3>

      <div className="flex items-center gap-2 text-xs mb-6">
        <UserAvatar src={userAvatar} size="sm" />
        <span className="text-foreground">{userName}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center relative">
          <img src={starIcon} alt="Found" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.found}</div>
          <div className="text-[10px] text-muted-foreground">Found</div>
          {newStats?.found && newStats.found > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-semibold bg-blue-500 text-white rounded-full">
              +{newStats.found}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center relative">
          <img src={savedIcon} alt="Saved" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.saved}</div>
          <div className="text-[10px] text-muted-foreground">Saved</div>
          {newStats?.saved && newStats.saved > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-semibold bg-blue-500 text-white rounded-full">
              +{newStats.saved}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center relative">
          <img src={contactedIcon} alt="Contacted" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.contacted}</div>
          <div className="text-[10px] text-muted-foreground">Contacted</div>
          {newStats?.contacted && newStats.contacted > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-semibold bg-blue-500 text-white rounded-full">
              +{newStats.contacted}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center relative">
          <img src={interviewedIcon} alt="Interviewed" className="w-5 h-5 mb-1" />
          <div className="text-base font-medium text-[#292524]">{stats.interviewed}</div>
          <div className="text-[10px] text-muted-foreground">Interviewed</div>
          {newStats?.interviewed && newStats.interviewed > 0 && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[8px] font-semibold bg-blue-500 text-white rounded-full">
              +{newStats.interviewed}
            </span>
          )}
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
