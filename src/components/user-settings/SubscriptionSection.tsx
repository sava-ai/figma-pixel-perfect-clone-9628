 import React from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 
 interface SubscriptionSectionProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ open, onOpenChange }) => {
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
         <DialogHeader className="p-5 pb-4 border-b border-[#E6E6E6]">
           <DialogTitle 
             className="text-lg" 
             style={{ fontFamily: 'CooperLight', color: '#333333' }}
           >
             Subscription
           </DialogTitle>
         </DialogHeader>
         
         <div className="p-5 space-y-4">
           <div className="p-4 rounded-lg border border-[#E6E6E6] bg-white">
             <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#666666' }}>
               Current plan
             </p>
             <p className="text-2xl font-semibold" style={{ color: '#333333', fontFamily: 'CooperLight' }}>
               Pro
             </p>
           </div>
           <Button 
             variant="outline" 
             className="w-full border-[#D9D9D9]"
             style={{ color: '#333333' }}
           >
             Manage plan
           </Button>
         </div>
       </DialogContent>
     </Dialog>
   );
 };