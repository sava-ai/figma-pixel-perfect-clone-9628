 import React from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 
 interface ProfileSectionProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export const ProfileSection: React.FC<ProfileSectionProps> = ({ open, onOpenChange }) => {
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
         <DialogHeader className="p-5 pb-4 border-b border-[#E6E6E6]">
           <DialogTitle 
             className="text-lg" 
             style={{ fontFamily: 'CooperLight', color: '#333333' }}
           >
             Profile
           </DialogTitle>
         </DialogHeader>
         
         <div className="p-5 space-y-4">
           <div className="grid grid-cols-2 gap-3">
             <div>
               <label className="block text-xs font-medium mb-1.5" style={{ color: '#666666' }}>
                 First name
               </label>
               <Input 
                 placeholder="Enter first name" 
                 className="border-[#D9D9D9] focus:border-[#333333] h-9 text-sm"
                 defaultValue="Tom"
               />
             </div>
             <div>
               <label className="block text-xs font-medium mb-1.5" style={{ color: '#666666' }}>
                 Last name
               </label>
               <Input 
                 placeholder="Enter last name" 
                 className="border-[#D9D9D9] focus:border-[#333333] h-9 text-sm"
                 defaultValue="Wilson"
               />
             </div>
           </div>
           <div>
             <label className="block text-xs font-medium mb-1.5" style={{ color: '#666666' }}>
               Role
             </label>
             <Input 
               placeholder="Enter your role" 
               className="border-[#D9D9D9] focus:border-[#333333] h-9 text-sm"
               defaultValue="Talent Acquisition Lead"
             />
           </div>
           <div>
             <label className="block text-xs font-medium mb-1.5" style={{ color: '#666666' }}>
               Company
             </label>
             <Input 
               placeholder="Enter company name" 
               className="border-[#D9D9D9] focus:border-[#333333] h-9 text-sm"
               defaultValue="Laidback"
             />
           </div>
           <Button 
             size="sm"
             className="w-full"
             style={{ backgroundColor: '#333333', color: 'white' }}
           >
             Save changes
           </Button>
         </div>
       </DialogContent>
     </Dialog>
   );
 };