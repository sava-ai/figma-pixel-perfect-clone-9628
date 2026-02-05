import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

interface UsageSectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UsageSection: React.FC<UsageSectionProps> = ({ open, onOpenChange }) => {
  const [onDemandEnabled, setOnDemandEnabled] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 gap-0 bg-[#FAFAF8] border-[#E6E6E6]">
        <DialogHeader className="p-5 pb-4 border-b border-[#E6E6E6]">
          <DialogTitle 
            className="text-lg" 
            style={{ fontFamily: 'CooperLight', color: '#333333' }}
          >
            Usage
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-5 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#91918D' }}>
              Current Period
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-[#E6E6E6] bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: '#333333' }}>Runs</span>
                  <span className="text-sm font-medium" style={{ color: '#333333' }}>0 / 40</span>
                </div>
                <div className="h-2 bg-[#F0F0EB] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '0%', backgroundColor: '#CC785C' }} />
                </div>
                <p className="text-xs mt-1" style={{ color: '#91918D' }}>this month</p>
              </div>
              <div className="p-3 rounded-lg border border-[#E6E6E6] bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm" style={{ color: '#333333' }}>CSV rows</span>
                  <span className="text-sm font-medium" style={{ color: '#333333' }}>0 / 1,000</span>
                </div>
                <div className="h-2 bg-[#F0F0EB] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: '0%', backgroundColor: '#CC785C' }} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide mb-3" style={{ color: '#91918D' }}>
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
                CSV rows: <span className="font-medium" style={{ color: '#CC785C' }}>2 cents/row</span>
              </p>
              <p className="text-xs mt-3 pt-3 border-t border-[#E6E6E6]" style={{ color: '#91918D' }}>
                You will NOT be charged for any usage within your plan limits.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
