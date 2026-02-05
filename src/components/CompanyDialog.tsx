 import React from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Input } from "@/components/ui/input";
 import { Textarea } from "@/components/ui/textarea";
 import { Button } from "@/components/ui/button";
 
 interface Company {
   id: string;
   name: string;
   website: string;
   employees: string;
 }
 
 interface CompanyDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   company: Company | null;
 }
 
 export const CompanyDialog: React.FC<CompanyDialogProps> = ({ open, onOpenChange, company }) => {
   if (!company) return null;
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
         <DialogHeader className="p-6 pb-4 border-b border-[#E6E6E6]">
           <DialogTitle 
             className="text-xl" 
             style={{ fontFamily: 'CooperLight', color: '#333333' }}
           >
             {company.name}
           </DialogTitle>
         </DialogHeader>
         
         <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
           <div>
             <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
               Company Name <span className="text-red-500">*</span>
             </label>
             <Input 
               placeholder="Enter company name" 
               className="border-[#D9D9D9] focus:border-[#333333]"
               defaultValue={company.name}
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
               Company Website
             </label>
             <Input 
               placeholder="https://example.com" 
               className="border-[#D9D9D9] focus:border-[#333333]"
               defaultValue={company.website}
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
               What do you sell? <span className="text-red-500">*</span>
             </label>
             <Textarea 
               placeholder="Describe your product or service..." 
               className="border-[#D9D9D9] focus:border-[#333333] min-h-[80px] resize-none"
             />
             <p className="text-xs mt-1" style={{ color: '#888888' }}>
               Used to qualify prospects and craft relevant messages
             </p>
           </div>
 
           <div>
             <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
               Target ICP
             </label>
             <Textarea 
               placeholder="Ideal buyer profile—role, company size, industry..." 
               className="border-[#D9D9D9] focus:border-[#333333] min-h-[80px] resize-none"
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
               Employee Count
             </label>
             <Input 
               placeholder="e.g., 50-200" 
               className="border-[#D9D9D9] focus:border-[#333333]"
               defaultValue={company.employees}
             />
           </div>
 
           <div>
             <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
               Company Tags
             </label>
             <Input 
               placeholder="Enter tags separated by commas" 
               className="border-[#D9D9D9] focus:border-[#333333]"
             />
           </div>
 
           <div className="pt-2 border-t border-[#E6E6E6]">
             <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#666666' }}>
               About You
             </p>
             <Textarea 
               placeholder="Your background for more personal messages..." 
               className="border-[#D9D9D9] focus:border-[#333333] min-h-[80px] resize-none"
             />
           </div>
 
           <div className="pt-2 flex gap-3">
             <Button 
               variant="outline"
               className="flex-1 border-[#D9D9D9]"
               onClick={() => onOpenChange(false)}
             >
               Cancel
             </Button>
             <Button 
               className="flex-1"
               style={{ backgroundColor: '#333333', color: 'white' }}
             >
               Save changes
             </Button>
           </div>
         </div>
       </DialogContent>
     </Dialog>
   );
 };