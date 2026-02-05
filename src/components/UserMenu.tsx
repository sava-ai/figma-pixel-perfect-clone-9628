import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User, Plug, CreditCard, BarChart3, Building2, LogOut } from 'lucide-react';
 import { UserAvatar } from '@/components/UserAvatar';
 import { ProfileSection } from './user-settings/ProfileSection';
 import { IntegrationsSection } from './user-settings/IntegrationsSection';
 import { SubscriptionSection } from './user-settings/SubscriptionSection';
 import { UsageSection } from './user-settings/UsageSection';
 import { CompaniesSection } from './user-settings/CompaniesSection';
 
 interface UserMenuProps {
   initials?: string;
   src?: string;
 }
 
 type DialogType = 'profile' | 'integrations' | 'subscription' | 'usage' | 'companies' | null;
 
 export const UserMenu: React.FC<UserMenuProps> = ({ initials = "TW", src }) => {
   const [popoverOpen, setPopoverOpen] = useState(false);
   const [activeDialog, setActiveDialog] = useState<DialogType>(null);
 
   const menuItems = [
     { id: 'profile' as const, label: 'Profile', icon: User },
     { id: 'integrations' as const, label: 'Integrations', icon: Plug },
     { id: 'subscription' as const, label: 'Subscription', icon: CreditCard },
     { id: 'usage' as const, label: 'Usage', icon: BarChart3 },
     { id: 'companies' as const, label: 'Companies', icon: Building2 },
   ];
 
   const handleItemClick = (id: DialogType) => {
     setPopoverOpen(false);
     setActiveDialog(id);
   };
 
   return (
     <>
       <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
         <PopoverTrigger asChild>
           <button className="hover:opacity-80 transition-opacity">
             <UserAvatar initials={initials} src={src} />
           </button>
         </PopoverTrigger>
         <PopoverContent 
           className="w-52 p-2 bg-white border-[#E6E6E6]" 
           align="end"
           sideOffset={8}
         >
          <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-[#F5F5F3] transition-colors text-left"
                    style={{ color: '#333333' }}
                  >
                    <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                      <Icon className="h-3.5 w-3.5" style={{ color: '#333333' }} />
                    </div>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="border-t border-[#E6E6E6] mt-2 pt-2">
              <button
                onClick={() => setPopoverOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-md hover:bg-[#F5F5F3] transition-colors text-left"
                style={{ color: '#333333' }}
              >
                <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                  <LogOut className="h-3.5 w-3.5" style={{ color: '#333333' }} />
                </div>
                <span>Sign out</span>
              </button>
            </div>
          </PopoverContent>
        </Popover>
 
       <ProfileSection 
         open={activeDialog === 'profile'} 
         onOpenChange={(open) => !open && setActiveDialog(null)} 
       />
       <IntegrationsSection 
         open={activeDialog === 'integrations'} 
         onOpenChange={(open) => !open && setActiveDialog(null)} 
       />
       <SubscriptionSection 
         open={activeDialog === 'subscription'} 
         onOpenChange={(open) => !open && setActiveDialog(null)} 
       />
       <UsageSection 
         open={activeDialog === 'usage'} 
         onOpenChange={(open) => !open && setActiveDialog(null)} 
       />
       <CompaniesSection 
         open={activeDialog === 'companies'} 
         onOpenChange={(open) => !open && setActiveDialog(null)} 
       />
     </>
   );
 };
