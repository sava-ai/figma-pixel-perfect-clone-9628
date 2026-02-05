 import { Dialog, DialogContent } from "@/components/ui/dialog";
 import { Button } from "@/components/ui/button";
 import { ChevronLeft, ChevronRight, X } from "lucide-react";
 import * as React from "react";
 import CandidateProfilePanel from "@/components/CandidateProfilePanel";
 
 interface Role {
   company: string;
   role: string;
 }
 
 interface Candidate {
   id: number;
   name: string;
   image: string;
   city: string;
   match: string;
   description: string;
   roles: Role[];
   engagementRate?: number;
   tags?: string[];
   education?: {
     school: string;
     degree: string;
     graduationDate: string;
   };
   summary?: string;
   skillTags?: string[];
   linkedin?: string;
   languages?: string[];
 }
 
 interface ProfileDialogProps {
   candidate: Candidate | null;
   open: boolean;
   onOpenChange: (open: boolean) => void;
   onPrevious?: () => void;
   onNext?: () => void;
   onSkip?: () => void;
 }
 
 export const ProfileDialog = ({ candidate, open, onOpenChange, onPrevious, onNext, onSkip }: ProfileDialogProps) => {
   if (!candidate) return null;
 
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogContent className="max-w-[700px] p-0 overflow-hidden">
         <div className="flex flex-col max-h-[80vh]">
           {/* Header with navigation */}
           <div className="flex items-center justify-between px-6 py-4 border-b border-[#E6E6E6]">
             <div className="flex items-center gap-2">
               {onPrevious && (
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={onPrevious}
                   className="h-8 w-8"
                 >
                   <ChevronLeft className="h-4 w-4" />
                 </Button>
               )}
               <h2 className="text-lg font-semibold" style={{ color: '#333333' }}>
                 {candidate.name}
               </h2>
               {onNext && (
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={onNext}
                   className="h-8 w-8"
                 >
                   <ChevronRight className="h-4 w-4" />
                 </Button>
               )}
             </div>
             <Button
               variant="ghost"
               size="icon"
               onClick={() => onOpenChange(false)}
               className="h-8 w-8"
             >
               <X className="h-4 w-4" />
             </Button>
           </div>
 
           {/* Content - using CandidateProfilePanel */}
           <div className="flex-1 overflow-y-auto">
             <CandidateProfilePanel
               candidate={candidate}
               currentIndex={0}
               totalCount={1}
               hideProgressHeader={true}
             />
           </div>
 
           {/* Footer with actions */}
           {onSkip && (
             <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E6E6E6]">
               <Button
                 variant="outline"
                 onClick={onSkip}
                 className="border-[#D9D9D9]"
               >
                 Skip
               </Button>
               <Button
                 onClick={onNext}
                 style={{ backgroundColor: '#333333', color: 'white' }}
               >
                 Next
               </Button>
             </div>
           )}
         </div>
       </DialogContent>
     </Dialog>
   );
 };