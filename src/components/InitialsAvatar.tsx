import React from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Generate a consistent color based on the name
const getColorFromName = (name: string): string => {
  const colors = [
    'bg-[#E8D5B7]', // warm beige
    'bg-[#D4E5D1]', // sage green
    'bg-[#E5D4D4]', // dusty rose
    'bg-[#D4D8E5]', // soft blue
    'bg-[#E5E0D4]', // cream
    'bg-[#D4E5E3]', // mint
    'bg-[#E5D4E0]', // lavender
    'bg-[#D8E5D4]', // pale green
    'bg-[#E5DDD4]', // tan
    'bg-[#D4DBE5]', // periwinkle
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Get initials from name (first letter of first and last name)
const getInitials = (name: string): string => {
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
};

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ 
  name, 
  size = 'md',
  className = '' 
}) => {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);
  
  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${bgColor} 
        rounded-sm 
        flex items-center justify-center 
        font-medium text-[#444444]
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar;
