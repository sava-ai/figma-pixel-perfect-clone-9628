import React from 'react';
import { UserAvatar } from './UserAvatar';
import { JobStatsExtended } from './JobStats';
import { ActionButtons } from './ActionButtons';

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
    <article className="bg-white rounded-xl p-6 shadow-sm border border-border flex flex-col h-full">
      <header className="flex items-center justify-between mb-6">
        <div className="bg-[rgba(21,52,61,1)] rounded-lg w-10 h-10 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-foreground">
          <div className="w-2 h-2 rounded-full bg-[rgba(21,52,61,1)]" />
          <span>{isPublished ? 'Published' : 'Draft'}</span>
        </div>
      </header>

      <h3 className="text-[rgba(21,52,61,1)] text-lg font-medium mb-4">
        {title}
      </h3>

      <div className="flex items-center gap-2 text-xs mb-6">
        <UserAvatar src={userAvatar} size="sm" />
        <span className="text-foreground">{userName}</span>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <svg className="w-4 h-4 mb-1 text-[rgba(21,52,61,1)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
          </svg>
          <div className="text-base font-medium text-[rgba(21,52,61,1)]">{stats.found}</div>
          <div className="text-[10px] text-muted-foreground">Found</div>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-4 h-4 mb-1 text-[rgba(21,52,61,1)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
          </svg>
          <div className="text-base font-medium text-[rgba(21,52,61,1)]">{stats.saved}</div>
          <div className="text-[10px] text-muted-foreground">Saved</div>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-4 h-4 mb-1 text-[rgba(21,52,61,1)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
          </svg>
          <div className="text-base font-medium text-[rgba(21,52,61,1)]">{stats.contacted}</div>
          <div className="text-[10px] text-muted-foreground">Contacted</div>
        </div>
        <div className="flex flex-col items-center">
          <svg className="w-4 h-4 mb-1 text-[rgba(21,52,61,1)]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16z" />
          </svg>
          <div className="text-base font-medium text-[rgba(21,52,61,1)]">{stats.interviewed}</div>
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
