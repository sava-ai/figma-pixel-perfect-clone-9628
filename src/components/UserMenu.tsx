import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Settings, Users, Link2, FileText, BookOpen, LogOut } from 'lucide-react';
import { UserAvatar } from '@/components/UserAvatar';

interface UserMenuProps {
  initials?: string;
  src?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ initials = "TW", src }) => {
  const menuItems = [
    { label: "Settings", icon: Settings },
    { label: "Team", icon: Users },
    { label: "Integrations", icon: Link2 },
    { label: "Templates", icon: FileText },
    { label: "Knowledge", icon: BookOpen },
    { label: "Logout", icon: LogOut },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="hover:opacity-80 transition-opacity">
          <UserAvatar initials={initials} src={src} />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-56 p-2" 
        align="end"
        sideOffset={8}
      >
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted cursor-not-allowed opacity-60 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
