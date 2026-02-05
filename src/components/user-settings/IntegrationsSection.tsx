 import React from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { Mail, Calendar } from 'lucide-react';
 
 interface IntegrationsSectionProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ open, onOpenChange }) => {
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
         <DialogHeader className="p-5 pb-4 border-b border-[#E6E6E6]">
           <DialogTitle 
             className="text-lg" 
             style={{ fontFamily: 'CooperLight', color: '#333333' }}
           >
             Integrations
           </DialogTitle>
         </DialogHeader>
         
         <div className="p-5 space-y-3">
           <div className="flex items-center justify-between p-4 rounded-lg border border-[#E6E6E6] bg-white">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EA4335' }}>
                 <Mail className="w-5 h-5 text-white" />
               </div>
               <div>
                 <p className="font-medium text-sm" style={{ color: '#333333' }}>Gmail</p>
                 <p className="text-xs" style={{ color: '#666666' }}>Connect your Gmail account</p>
               </div>
             </div>
             <Button variant="outline" size="sm" className="border-[#D9D9D9]">
               Connect
             </Button>
           </div>
           <div className="flex items-center justify-between p-4 rounded-lg border border-[#E6E6E6] bg-white">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0078D4' }}>
                 <Calendar className="w-5 h-5 text-white" />
               </div>
               <div>
                 <p className="font-medium text-sm" style={{ color: '#333333' }}>Outlook</p>
                 <p className="text-xs" style={{ color: '#666666' }}>Connect your Outlook account</p>
               </div>
             </div>
             <Button variant="outline" size="sm" className="border-[#D9D9D9]">
               Connect
             </Button>
           </div>
         </div>
       </DialogContent>
     </Dialog>
   );
 };