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
  layout = 'full'
}) => {
  if (layout === 'compact') {
    return (
      <article className="flex w-full flex-col items-stretch text-[rgba(40,42,48,1)] font-normal">
        <header className="flex w-full items-stretch gap-5 text-[10px] whitespace-nowrap justify-between">
          <img
            src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/1db17103497e17df9468448b30d03d6872cabf71?placeholderIfAbsent=true"
            alt="Job status"
            className="aspect-[1] object-contain w-9 shrink-0 rounded-lg"
          />
          <div className="flex items-stretch gap-1.5">
            <div className="bg-[rgba(21,52,61,1)] flex w-2.5 shrink-0 h-2.5 rounded-[50%]" />
            <div>{isPublished ? 'Published' : 'Draft'}</div>
          </div>
        </header>
        <h3 className="text-[rgba(21,52,61,1)] text-[22px] font-medium leading-none mr-[23px] mt-[30px] max-md:mr-2.5">
          {title}
        </h3>
        <div className="flex items-stretch gap-[9px] text-xs mt-6">
          <UserAvatar src={userAvatar} size="sm" />
          <div className="my-auto">{userName}</div>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full">
      <header className="flex items-stretch gap-[9px] text-xs text-[rgba(40,42,48,1)] font-normal">
        <UserAvatar src={userAvatar} size="sm" />
        <div className="my-auto">{userName}</div>
      </header>
      
      <main>
        <JobStatsExtended {...stats} />
      </main>
      
      <footer className="mt-[27px]">
        <ActionButtons 
          actionsNeeded={actionsNeeded}
          onMenuClick={onMenuClick}
          onActionClick={onActionClick}
        />
      </footer>
    </article>
  );
};
