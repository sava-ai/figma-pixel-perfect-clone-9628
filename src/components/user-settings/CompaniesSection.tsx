import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2, Plus, ChevronRight } from 'lucide-react';
import { CompanyDialog } from '../CompanyDialog';

interface CompaniesSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockCompanies = [
  { 
    id: '1', 
    name: 'Acme Corp', 
    website: 'acme.com', 
    employees: '50-200',
    jobs: ['Chief Commercial Officer', 'Sales Development Manager']
  },
  { 
    id: '2', 
    name: 'TechStart Inc', 
    website: 'techstart.io', 
    employees: '10-50',
    jobs: ['Senior Product Designer', 'Frontend Developer']
  },
];

export const CompaniesSection: React.FC<CompaniesSectionProps> = ({ open, onOpenChange }) => {
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);

  const handleCompanyClick = (company: typeof mockCompanies[0]) => {
    setSelectedCompany(company);
    setCompanyDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
          <DialogHeader className="p-5 pb-4 border-b border-[#E6E6E6]">
            <DialogTitle 
              className="text-lg" 
              style={{ fontFamily: 'CooperLight', color: '#333333' }}
            >
              Companies
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-5 space-y-3">
            {mockCompanies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanyClick(company)}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-[#E6E6E6] bg-white hover:bg-[#FAFAF7] transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F0F0EB]">
                    <Building2 className="w-5 h-5" style={{ color: '#333333' }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#333333' }}>{company.name}</p>
                    <p className="text-xs" style={{ color: '#91918D' }}>{company.website}</p>
                    {company.jobs && company.jobs.length > 0 && (
                      <p className="text-xs mt-1" style={{ color: '#CC785C' }}>
                        {company.jobs.length} job{company.jobs.length > 1 ? 's' : ''}: {company.jobs.slice(0, 2).join(', ')}{company.jobs.length > 2 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4" style={{ color: '#91918D' }} />
              </button>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-dashed border-[#E6E6E6] gap-2 hover:bg-[#F0F0EB] hover:border-[#CC785C]"
              style={{ color: '#666666' }}
            >
              <Plus className="w-4 h-4" />
              Add company
            </Button>
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
