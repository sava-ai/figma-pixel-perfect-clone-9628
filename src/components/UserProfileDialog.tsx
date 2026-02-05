 import React, { useState } from 'react';
 import {
   Dialog,
   DialogContent,
 } from "@/components/ui/dialog";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { Switch } from "@/components/ui/switch";
 import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 import { Mail, Calendar, Building2, Plus, ChevronRight, User, Plug, CreditCard, BarChart3 } from 'lucide-react';
 import { CompanyDialog } from './CompanyDialog';
 
 interface UserProfileDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 const mockCompanies = [
   { id: '1', name: 'Acme Corp', website: 'acme.com', employees: '50-200' },
   { id: '2', name: 'TechStart Inc', website: 'techstart.io', employees: '10-50' },
 ];
 
 export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onOpenChange }) => {
   const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
   const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
   const [onDemandEnabled, setOnDemandEnabled] = useState(false);
 
   const handleCompanyClick = (company: typeof mockCompanies[0]) => {
     setSelectedCompany(company);
     setCompanyDialogOpen(true);
   };
 
   return (
     <>
       <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-[480px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
           <div className="p-4 max-h-[500px] overflow-y-auto">
             <Accordion type="single" collapsible className="w-full space-y-2">
               {/* Profile Section */}
               <AccordionItem value="profile" className="border border-[#E6E6E6] rounded-lg bg-white px-4">
                 <AccordionTrigger className="py-3 hover:no-underline">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                       <User className="w-4 h-4" style={{ color: '#333333' }} />
                     </div>
                     <span className="font-medium text-sm" style={{ color: '#333333' }}>Profile</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pb-4">
                   <div className="space-y-3 pt-2">
                     <div className="grid grid-cols-2 gap-3">
                       <div>
                         <label className="block text-xs font-medium mb-1" style={{ color: '#666666' }}>
                           First name
                         </label>
                         <Input 
                           placeholder="Enter first name" 
                           className="border-[#D9D9D9] focus:border-[#333333] h-9 text-sm"
                           defaultValue="Tom"
                         />
                       </div>
                       <div>
                         <label className="block text-xs font-medium mb-1" style={{ color: '#666666' }}>
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
                       <label className="block text-xs font-medium mb-1" style={{ color: '#666666' }}>
                         Role
                       </label>
                       <Input 
                         placeholder="Enter your role" 
                         className="border-[#D9D9D9] focus:border-[#333333] h-9 text-sm"
                         defaultValue="Talent Acquisition Lead"
                       />
                     </div>
                     <div>
                       <label className="block text-xs font-medium mb-1" style={{ color: '#666666' }}>
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
                       className="w-full mt-2"
                       style={{ backgroundColor: '#333333', color: 'white' }}
                     >
                       Save changes
                     </Button>
                   </div>
                 </AccordionContent>
               </AccordionItem>
 
               {/* Integrations Section */}
               <AccordionItem value="integrations" className="border border-[#E6E6E6] rounded-lg bg-white px-4">
                 <AccordionTrigger className="py-3 hover:no-underline">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                       <Plug className="w-4 h-4" style={{ color: '#333333' }} />
                     </div>
                     <span className="font-medium text-sm" style={{ color: '#333333' }}>Integrations</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pb-4">
                   <div className="space-y-2 pt-2">
                     <div className="flex items-center justify-between p-3 rounded-lg border border-[#E6E6E6]">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: '#EA4335' }}>
                           <Mail className="w-4 h-4 text-white" />
                         </div>
                         <div>
                           <p className="font-medium text-sm" style={{ color: '#333333' }}>Gmail</p>
                           <p className="text-xs" style={{ color: '#666666' }}>Connect your Gmail</p>
                         </div>
                       </div>
                       <Button variant="outline" size="sm" className="border-[#D9D9D9] h-8 text-xs">
                         Connect
                       </Button>
                     </div>
                     <div className="flex items-center justify-between p-3 rounded-lg border border-[#E6E6E6]">
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: '#0078D4' }}>
                           <Calendar className="w-4 h-4 text-white" />
                         </div>
                         <div>
                           <p className="font-medium text-sm" style={{ color: '#333333' }}>Outlook</p>
                           <p className="text-xs" style={{ color: '#666666' }}>Connect your Outlook</p>
                         </div>
                       </div>
                       <Button variant="outline" size="sm" className="border-[#D9D9D9] h-8 text-xs">
                         Connect
                       </Button>
                     </div>
                   </div>
                 </AccordionContent>
               </AccordionItem>
 
               {/* Subscription Section */}
               <AccordionItem value="subscription" className="border border-[#E6E6E6] rounded-lg bg-white px-4">
                 <AccordionTrigger className="py-3 hover:no-underline">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                       <CreditCard className="w-4 h-4" style={{ color: '#333333' }} />
                     </div>
                     <span className="font-medium text-sm" style={{ color: '#333333' }}>Subscription</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pb-4">
                   <div className="space-y-3 pt-2">
                     <div className="p-3 rounded-lg border border-[#E6E6E6]">
                       <p className="text-xs uppercase tracking-wide mb-1" style={{ color: '#666666' }}>
                         Current plan
                       </p>
                       <p className="text-xl font-semibold" style={{ color: '#333333', fontFamily: 'CooperLight' }}>
                         Pro
                       </p>
                     </div>
                     <Button 
                       variant="outline" 
                       size="sm"
                       className="w-full border-[#D9D9D9]"
                       style={{ color: '#333333' }}
                     >
                       Manage plan
                     </Button>
                   </div>
                 </AccordionContent>
               </AccordionItem>
 
               {/* Usage Section */}
               <AccordionItem value="usage" className="border border-[#E6E6E6] rounded-lg bg-white px-4">
                 <AccordionTrigger className="py-3 hover:no-underline">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                       <BarChart3 className="w-4 h-4" style={{ color: '#333333' }} />
                     </div>
                     <span className="font-medium text-sm" style={{ color: '#333333' }}>Usage</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pb-4">
                   <div className="space-y-4 pt-2">
                     <div>
                       <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#666666' }}>
                         Current Period
                       </p>
                       <div className="space-y-2">
                         <div className="p-2.5 rounded-lg border border-[#E6E6E6]">
                           <div className="flex justify-between items-center mb-1.5">
                             <span className="text-xs" style={{ color: '#333333' }}>Runs</span>
                             <span className="text-xs font-medium" style={{ color: '#333333' }}>0 / 40</span>
                           </div>
                           <div className="h-1.5 bg-[#F0F0EB] rounded-full overflow-hidden">
                             <div className="h-full bg-[#333333] rounded-full" style={{ width: '0%' }} />
                           </div>
                           <p className="text-[10px] mt-1" style={{ color: '#666666' }}>this month</p>
                         </div>
                         <div className="p-2.5 rounded-lg border border-[#E6E6E6]">
                           <div className="flex justify-between items-center mb-1.5">
                             <span className="text-xs" style={{ color: '#333333' }}>CSV rows</span>
                             <span className="text-xs font-medium" style={{ color: '#333333' }}>0 / 1,000</span>
                           </div>
                           <div className="h-1.5 bg-[#F0F0EB] rounded-full overflow-hidden">
                             <div className="h-full bg-[#333333] rounded-full" style={{ width: '0%' }} />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div>
                       <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#666666' }}>
                         On-Demand Usage
                       </p>
                       <div className="p-3 rounded-lg border border-[#E6E6E6]">
                         <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-medium" style={{ color: '#333333' }}>
                             {onDemandEnabled ? 'Enabled' : 'Disabled'}
                           </span>
                           <Switch 
                             checked={onDemandEnabled} 
                             onCheckedChange={setOnDemandEnabled}
                           />
                         </div>
                         <p className="text-[10px] mb-1" style={{ color: '#666666' }}>
                           Enable to continue using Laidback beyond your plan limits:
                         </p>
                         <p className="text-[10px]" style={{ color: '#666666' }}>
                           CSV rows: <span className="font-medium">2 cents/row</span>
                         </p>
                         <p className="text-[10px] mt-2 pt-2 border-t border-[#E6E6E6]" style={{ color: '#888888' }}>
                           You will NOT be charged for any usage within your plan limits.
                         </p>
                       </div>
                     </div>
                   </div>
                 </AccordionContent>
               </AccordionItem>
 
               {/* Companies Section */}
               <AccordionItem value="companies" className="border border-[#E6E6E6] rounded-lg bg-white px-4">
                 <AccordionTrigger className="py-3 hover:no-underline">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                       <Building2 className="w-4 h-4" style={{ color: '#333333' }} />
                     </div>
                     <span className="font-medium text-sm" style={{ color: '#333333' }}>Companies</span>
                   </div>
                 </AccordionTrigger>
                 <AccordionContent className="pb-4">
                   <div className="space-y-2 pt-2">
                     {mockCompanies.map((company) => (
                       <button
                         key={company.id}
                         onClick={() => handleCompanyClick(company)}
                         className="w-full flex items-center justify-between p-3 rounded-lg border border-[#E6E6E6] hover:bg-[#FAFAF8] transition-colors text-left"
                       >
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-md flex items-center justify-center bg-[#F0F0EB]">
                             <Building2 className="w-4 h-4" style={{ color: '#333333' }} />
                           </div>
                           <div>
                             <p className="font-medium text-sm" style={{ color: '#333333' }}>{company.name}</p>
                             <p className="text-xs" style={{ color: '#666666' }}>{company.website}</p>
                           </div>
                         </div>
                         <ChevronRight className="w-4 h-4" style={{ color: '#999999' }} />
                       </button>
                     ))}
                     <Button 
                       variant="outline" 
                       size="sm"
                       className="w-full border-dashed border-[#D9D9D9] gap-2"
                       style={{ color: '#666666' }}
                     >
                       <Plus className="w-3 h-3" />
                       Add company
                     </Button>
                   </div>
                 </AccordionContent>
               </AccordionItem>
             </Accordion>
           </div>
         </DialogContent>
       </Dialog>
 
       <CompanyDialog
         open={companyDialogOpen}
         onOpenChange={setCompanyDialogOpen}
         company={selectedCompany}
       />
     </>
   );
 };