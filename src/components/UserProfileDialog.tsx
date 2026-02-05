 import React, { useState } from 'react';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 import { Switch } from "@/components/ui/switch";
 import { Mail, Calendar, Building2, Plus, ChevronRight } from 'lucide-react';
 import { CompanyDialog } from './CompanyDialog';
 
 interface UserProfileDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
 }
 
 type Section = 'profile' | 'integrations' | 'subscription' | 'usage' | 'companies';
 
 const mockCompanies = [
   { id: '1', name: 'Acme Corp', website: 'acme.com', employees: '50-200' },
   { id: '2', name: 'TechStart Inc', website: 'techstart.io', employees: '10-50' },
 ];
 
 export const UserProfileDialog: React.FC<UserProfileDialogProps> = ({ open, onOpenChange }) => {
   const [activeSection, setActiveSection] = useState<Section>('profile');
   const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
   const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
   const [onDemandEnabled, setOnDemandEnabled] = useState(false);
 
   const sections: { id: Section; label: string }[] = [
     { id: 'profile', label: 'Profile' },
     { id: 'integrations', label: 'Integrations' },
     { id: 'subscription', label: 'Subscription' },
     { id: 'usage', label: 'Usage' },
     { id: 'companies', label: 'Companies' },
   ];
 
   const handleCompanyClick = (company: typeof mockCompanies[0]) => {
     setSelectedCompany(company);
     setCompanyDialogOpen(true);
   };
 
   const renderContent = () => {
     switch (activeSection) {
       case 'profile':
         return (
           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                   First name
                 </label>
                 <Input 
                   placeholder="Enter first name" 
                   className="border-[#D9D9D9] focus:border-[#333333]"
                   defaultValue="Tom"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                   Last name
                 </label>
                 <Input 
                   placeholder="Enter last name" 
                   className="border-[#D9D9D9] focus:border-[#333333]"
                   defaultValue="Wilson"
                 />
               </div>
             </div>
             <div>
               <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                 Role
               </label>
               <Input 
                 placeholder="Enter your role" 
                 className="border-[#D9D9D9] focus:border-[#333333]"
                 defaultValue="Talent Acquisition Lead"
               />
             </div>
             <div>
               <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                 Company
               </label>
               <Input 
                 placeholder="Enter company name" 
                 className="border-[#D9D9D9] focus:border-[#333333]"
                 defaultValue="Laidback"
               />
             </div>
             <div className="pt-2">
               <Button 
                 className="w-full"
                 style={{ backgroundColor: '#333333', color: 'white' }}
               >
                 Save changes
               </Button>
             </div>
           </div>
         );
 
       case 'integrations':
         return (
           <div className="space-y-3">
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
         );
 
       case 'subscription':
         return (
           <div className="space-y-4">
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
         );
 
       case 'usage':
         return (
           <div className="space-y-5">
             <div>
               <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#666666' }}>
                 Current Period
               </p>
               <div className="space-y-3">
                 <div className="p-3 rounded-lg border border-[#E6E6E6] bg-white">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-sm" style={{ color: '#333333' }}>Runs</span>
                     <span className="text-sm font-medium" style={{ color: '#333333' }}>0 / 40</span>
                   </div>
                   <div className="h-2 bg-[#F0F0EB] rounded-full overflow-hidden">
                     <div className="h-full bg-[#333333] rounded-full" style={{ width: '0%' }} />
                   </div>
                   <p className="text-xs mt-1" style={{ color: '#666666' }}>this month</p>
                 </div>
                 <div className="p-3 rounded-lg border border-[#E6E6E6] bg-white">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-sm" style={{ color: '#333333' }}>CSV rows</span>
                     <span className="text-sm font-medium" style={{ color: '#333333' }}>0 / 1,000</span>
                   </div>
                   <div className="h-2 bg-[#F0F0EB] rounded-full overflow-hidden">
                     <div className="h-full bg-[#333333] rounded-full" style={{ width: '0%' }} />
                   </div>
                 </div>
               </div>
             </div>
             <div>
               <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#666666' }}>
                 On-Demand Usage
               </p>
               <div className="p-4 rounded-lg border border-[#E6E6E6] bg-white">
                 <div className="flex items-center justify-between mb-3">
                   <span className="text-sm font-medium" style={{ color: '#333333' }}>
                     {onDemandEnabled ? 'Enabled' : 'Disabled'}
                   </span>
                   <Switch 
                     checked={onDemandEnabled} 
                     onCheckedChange={setOnDemandEnabled}
                   />
                 </div>
                 <p className="text-xs mb-2" style={{ color: '#666666' }}>
                   Enable to continue using Laidback beyond your plan limits:
                 </p>
                 <p className="text-xs" style={{ color: '#666666' }}>
                   CSV rows: <span className="font-medium">2 cents/row</span>
                 </p>
                 <p className="text-xs mt-3 pt-3 border-t border-[#E6E6E6]" style={{ color: '#888888' }}>
                   You will NOT be charged for any usage within your plan limits.
                 </p>
               </div>
             </div>
           </div>
         );
 
       case 'companies':
         return (
           <div className="space-y-3">
             {mockCompanies.map((company) => (
               <button
                 key={company.id}
                 onClick={() => handleCompanyClick(company)}
                 className="w-full flex items-center justify-between p-4 rounded-lg border border-[#E6E6E6] bg-white hover:bg-[#FAFAF8] transition-colors text-left"
               >
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F0F0EB]">
                     <Building2 className="w-5 h-5" style={{ color: '#333333' }} />
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
               className="w-full border-dashed border-[#D9D9D9] gap-2"
               style={{ color: '#666666' }}
             >
               <Plus className="w-4 h-4" />
               Add company
             </Button>
           </div>
         );
     }
   };
 
   return (
     <>
       <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-[580px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
           <DialogHeader className="p-6 pb-4 border-b border-[#E6E6E6]">
             <DialogTitle 
               className="text-xl" 
               style={{ fontFamily: 'CooperLight', color: '#333333' }}
             >
               Profile
             </DialogTitle>
           </DialogHeader>
           
           <div className="flex">
             {/* Sidebar */}
             <div className="w-44 border-r border-[#E6E6E6] p-3">
               <nav className="space-y-1">
                 {sections.map((section) => (
                   <button
                     key={section.id}
                     onClick={() => setActiveSection(section.id)}
                     className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                       activeSection === section.id
                         ? 'bg-white font-medium'
                         : 'hover:bg-white/50'
                     }`}
                     style={{ 
                       color: activeSection === section.id ? '#333333' : '#666666',
                       boxShadow: activeSection === section.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                     }}
                   >
                     {section.label}
                   </button>
                 ))}
               </nav>
             </div>
             
             {/* Content */}
             <div className="flex-1 p-6 max-h-[400px] overflow-y-auto">
               {renderContent()}
             </div>
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