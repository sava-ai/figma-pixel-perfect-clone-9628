import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface CandidateFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionType: 'not-a-good-fit' | 'save-to-job';
  candidateName: string;
  onSubmit: (feedback: string, rating: number | null) => void;
  onSkip: () => void;
}

const CandidateFeedbackDialog: React.FC<CandidateFeedbackDialogProps> = ({
  open,
  onOpenChange,
  actionType,
  candidateName,
  onSubmit,
  onSkip,
}) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = () => {
    onSubmit(feedback, rating);
    setFeedback('');
    setRating(null);
    onOpenChange(false);
  };

  const handleSkip = () => {
    onSkip();
    setFeedback('');
    setRating(null);
    onOpenChange(false);
  };

  const title = actionType === 'not-a-good-fit' 
    ? 'Why is this not a good fit?' 
    : 'Why are you saving this candidate?';

  const placeholder = actionType === 'not-a-good-fit'
    ? 'Share your feedback about why this candidate isn\'t the right fit...'
    : 'Share your thoughts about why this candidate is a good match...';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[480px] p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-[#292524]">
            {title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Feedback for {candidateName}
          </p>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Feedback Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#292524]">
              Your feedback
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={placeholder}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Rating Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#292524]">
              Rate this candidate
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={cn(
                    'w-10 h-10 rounded-lg border text-sm font-medium transition-all',
                    rating === value
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#292524] border-[#EEEDEC] hover:border-[#999999]'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              1 = Poor fit, 5 = Excellent fit
            </p>
          </div>
        </div>

        <DialogFooter className="flex items-center gap-3 sm:justify-between">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-[#292524]"
          >
            Skip
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white"
          >
            Submit feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateFeedbackDialog;
