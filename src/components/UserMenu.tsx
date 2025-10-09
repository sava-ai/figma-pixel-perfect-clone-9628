import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserAvatar } from '@/components/UserAvatar';

interface UserMenuProps {
  initials?: string;
  src?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ initials = "TW", src }) => {
  const menuItems = [
    { label: "Settings", icon: "⚙️" },
    { label: "Team", icon: "👥" },
    { label: "Integrations", icon: "🔗" },
    { label: "Templates", icon: "📄" },
    { label: "Knowledge", icon: "📚" },
    { label: "Logout", icon: "🚪" },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hover:opacity-80 transition-opacity">
          <UserAvatar initials={initials} src={src} />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-3 bg-background border-border" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted cursor-not-allowed opacity-60 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
