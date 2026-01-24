import React from 'react';

interface UserAvatarProps {
  src?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ 
  src, 
  initials = "TW", 
  size = 'md',
  className = ""
}) => {
  const sizeClasses = {
    sm: "w-[21px] h-[21px] text-[8px]",
    md: "w-[45px] h-[45px] text-xl",
    lg: "w-[45px] h-[45px] text-xl"
  };

  if (src) {
    return (
      <img
        src={src}
        alt="User avatar"
        className={`aspect-[1] object-contain rounded-sm ${sizeClasses[size]} ${className}`}
      />
    );
  }

  if (initials) {
    return (
      <div className={`bg-[rgba(21,52,61,1)] flex flex-col items-center justify-center text-white font-normal whitespace-nowrap rounded-sm ${sizeClasses[size]} ${className}`}>
        <div>{initials}</div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-sm ${sizeClasses[size]} ${className}`} />
  );
};
