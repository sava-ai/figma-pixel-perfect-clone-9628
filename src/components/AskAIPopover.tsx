import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';

interface AskAIPopoverProps {
  trigger: React.ReactNode;
  onApply?: (answer: string) => void;
}

export const AskAIPopover = ({ trigger, onApply }: AskAIPopoverProps) => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    
    setIsThinking(true);
    setAnswer('');
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI response
    const mockAnswers = [
      "Consider emphasizing their unique experience in fintech and how it aligns with your company's goals.",
      "You might want to mention specific projects they've worked on that relate to your open position.",
      "Highlight their awards and achievements to show you've done your research.",
      "Try adding a personal touch by referencing their portfolio work or recent accomplishments.",
      "Consider making your message more concise while keeping the key points about the opportunity."
    ];
    
    const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)];
    setAnswer(randomAnswer);
    setIsThinking(false);
  };

  const handleApply = () => {
    if (answer && onApply) {
      onApply(answer);
    }
    setOpen(false);
    setQuestion('');
    setAnswer('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-4 space-y-3" align="start" side="top">
        <div className="space-y-2">
          <label className="text-sm font-semibold">Ask AI</label>
          <Textarea
            placeholder="e.g., How can I make this message more personal?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[80px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAsk();
              }
            }}
          />
        </div>
        
        {(isThinking || answer) && (
          <div className="rounded-lg p-3 space-y-2 bg-muted animate-fade-in">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Response</span>
            </div>
            {isThinking ? (
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{answer}</p>
            )}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button
            onClick={handleAsk}
            disabled={!question.trim() || isThinking}
            className="flex-1"
            size="sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ask
          </Button>
          {answer && onApply && (
            <Button
              onClick={handleApply}
              variant="outline"
              size="sm"
            >
              Apply
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
