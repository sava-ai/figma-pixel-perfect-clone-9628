 import React, { useState } from 'react';
 import { UserAvatar } from '@/components/UserAvatar';
 import { UserProfileDialog } from './UserProfileDialog';

 interface UserMenuProps {
   initials?: string;
   src?: string;
 }
 
 export const UserMenu: React.FC<UserMenuProps> = ({ initials = "TW", src }) => {
   const [profileOpen, setProfileOpen] = useState(false);

   return (
     <>
       <button 
         className="hover:opacity-80 transition-opacity"
         onClick={() => setProfileOpen(true)}
       >
         <UserAvatar initials={initials} src={src} />
       </button>
       <UserProfileDialog open={profileOpen} onOpenChange={setProfileOpen} />
     </>
   );
 };
