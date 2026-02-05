import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  website: string;
  employees: string;
  jobs?: string[];
  hasPublishedJobs?: boolean;
}

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: Company | null;
}

export const CompanyDialog: React.FC<CompanyDialogProps> = ({ open, onOpenChange, company }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmName, setConfirmName] = useState('');

  if (!company) return null;

  // Acme Corp has published jobs, TechStart Inc doesn't
  const hasPublishedJobs = company.id === '1';

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    setConfirmName('');
  };

  const handleConfirmDelete = () => {
    if (confirmName === company.name) {
      setDeleteDialogOpen(false);
      onOpenChange(false);
      // In a real app, you would delete the company here
    }
  };

  return (
    <>
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
                Company Name <span style={{ color: '#CC785C' }}>*</span>
              </label>
              <Input 
                placeholder="Enter company name" 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] bg-white"
                defaultValue={company.name}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Company Website
              </label>
              <Input 
                placeholder="https://example.com" 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] bg-white"
                defaultValue={company.website}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                What do you sell? <span style={{ color: '#CC785C' }}>*</span>
              </label>
              <Textarea 
                placeholder="Describe your product or service..." 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] min-h-[80px] resize-none bg-white"
              />
              <p className="text-xs mt-1" style={{ color: '#91918D' }}>
                Used to qualify prospects and craft relevant messages
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Mission, Vision, Values
              </label>
              <Textarea 
                placeholder="Company mission, vision and core values..." 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] min-h-[80px] resize-none bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Employee Count
              </label>
              <Input 
                placeholder="e.g., 50-200" 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] bg-white"
                defaultValue={company.employees}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Location
              </label>
              <Input 
                placeholder="e.g., San Francisco, CA" 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Leadership
              </label>
              <Textarea 
                placeholder="Key leadership team members and their backgrounds..." 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] min-h-[80px] resize-none bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Unique Differentiators
              </label>
              <Textarea 
                placeholder="What sets this company apart from competitors..." 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] min-h-[80px] resize-none bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Working Culture
              </label>
              <Textarea 
                placeholder="Work environment, team dynamics, remote policies..." 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] min-h-[80px] resize-none bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Key Achievements
              </label>
              <Textarea 
                placeholder="Notable milestones, awards, and accomplishments..." 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] min-h-[80px] resize-none bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#333333' }}>
                Company Tags
              </label>
              <Input 
                placeholder="Enter tags separated by commas" 
                className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] bg-white"
              />
            </div>

            {/* Delete Company Button */}
            <button
              onClick={handleDeleteClick}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-md hover:bg-red-50 transition-colors"
              style={{ color: '#DC2626' }}
            >
              <Trash2 className="w-4 h-4" />
              Delete company
            </button>

            <div className="pt-2 flex gap-3">
              <Button 
                variant="outline"
                className="flex-1 border-[#E6E6E6] hover:bg-[#F0F0EB]"
                onClick={() => onOpenChange(false)}
                style={{ color: '#333333' }}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                style={{ backgroundColor: '#CC785C', color: 'white' }}
              >
                Save changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[400px] bg-white border-[#E6E6E6]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2" style={{ color: '#333333' }}>
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Delete {company.name}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm" style={{ color: '#666666' }}>
              {hasPublishedJobs ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm font-medium text-red-700">
                      This company cannot be deleted
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      This company is currently assigned to published jobs. To delete it, first archive or delete the associated jobs, or reassign them to a different company.
                    </p>
                  </div>
                  <p className="text-xs" style={{ color: '#91918D' }}>
                    Associated jobs: {company.jobs?.join(', ')}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <p>
                    This action cannot be undone. This will permanently delete the company and remove all associated data.
                  </p>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: '#333333' }}>
                      Type <span className="font-semibold">"{company.name}"</span> to confirm
                    </label>
                    <Input 
                      placeholder={company.name}
                      value={confirmName}
                      onChange={(e) => setConfirmName(e.target.value)}
                      className="border-[#E6E6E6] focus:border-[#CC785C] focus:ring-[#CC785C] bg-white"
                    />
                  </div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="border-[#E6E6E6] hover:bg-[#F0F0EB]"
              style={{ color: '#333333' }}
            >
              {hasPublishedJobs ? 'Close' : 'Cancel'}
            </AlertDialogCancel>
            {!hasPublishedJobs && (
              <Button 
                onClick={handleConfirmDelete}
                disabled={confirmName !== company.name}
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
