import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface Platform {
  name: string;
  candidatesCount: number;
  candidatesQuality: number;
}

interface PublishingPlatformsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const platforms: Platform[] = [
  { name: 'Pracuj.pl', candidatesCount: 127, candidatesQuality: 84 },
  { name: 'justjoin.it', candidatesCount: 93, candidatesQuality: 92 },
  { name: 'Rocketjobs', candidatesCount: 54, candidatesQuality: 88 },
  { name: 'OLX', candidatesCount: 211, candidatesQuality: 67 },
  { name: 'Indeed', candidatesCount: 342, candidatesQuality: 73 },
  { name: 'LinkedIn', candidatesCount: 156, candidatesQuality: 91 },
  { name: 'Glassdoor', candidatesCount: 78, candidatesQuality: 86 },
  { name: 'CareerBuilder', candidatesCount: 102, candidatesQuality: 79 },
  { name: 'Monster', candidatesCount: 89, candidatesQuality: 71 },
];

export const PublishingPlatformsDialog: React.FC<PublishingPlatformsDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Publishing Platforms</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="font-medium text-base">{platform.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    live
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold">{platform.candidatesCount}</div>
                    <div className="text-xs text-muted-foreground">Candidates</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm font-semibold">{platform.candidatesQuality}%</div>
                    <div className="text-xs text-muted-foreground">Quality</div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
