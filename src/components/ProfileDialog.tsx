import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Linkedin, Phone, Link as LinkIcon, Award, FileText, ExternalLink, ChevronLeft, ChevronRight, Sparkles, Paperclip } from "lucide-react";
import * as React from "react";
import { AskAIPopover } from "@/components/AskAIPopover";
import { useAIPersonalize } from "@/hooks/useAIPersonalize";
import aresLogo from "@/assets/company-ares.png";
import stripeLogo from "@/assets/company-stripe.png";
import figmaLogo from "@/assets/company-figma.png";
import ideoLogo from "@/assets/company-ideo.png";

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
  engagementRate: number;
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

  const [contactMethod, setContactMethod] = React.useState<'email' | 'linkedin'>('email');
  const [messageBody, setMessageBody] = React.useState(`Hi ${candidate.name.split(' ')[0]},

I hope you're doing well. My name is Sarah Whitman, and I'm a recruiter at Ares Studio. We're looking for a talented Product Designer to join our team, and your work stood out to us.

Looking forward to connecting!`);
  
  const { isPersonalizing, personalizeText } = useAIPersonalize();

  const handlePersonalize = async () => {
    const personalized = await personalizeText(messageBody, {
      name: candidate.name,
      role: candidate.roles[0]?.role || 'Product Designer'
    });
    setMessageBody(personalized);
  };

  const achievements = [
    "Award winner UX hackathon 2025",
    "AI First",
    "Forbes 30 under 30",
    "UX Planning",
    "Startup Experience",
    "Design Systems Expert",
    "Fintech Specialist"
  ];

  const aiAnalysis = `${candidate.name} is an exceptional match for the Product Designer position. With extensive experience in fintech and proven leadership abilities, they demonstrate strong alignment with the role requirements. Their portfolio showcases a deep understanding of user-centered design principles and ability to balance business objectives with user needs. The candidate has a track record of successful product launches and team collaboration, making them an ideal fit for a fast-paced, innovation-driven environment.`;

  const companyLogos: Record<string, string> = {
    "Ares Studio": aresLogo,
    "Stripe": stripeLogo,
    "Figma": figmaLogo,
    "IDEO": ideoLogo,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[1200px] h-[90vh] p-0 overflow-hidden flex flex-col">
        <div className="flex flex-col h-full min-h-0">
          {/* Header */}
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">Contact {candidate.name}</h2>
            <p className="text-sm text-muted-foreground mb-3">2 of 2</p>
            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full">
              <div className="h-full bg-primary w-1/2 transition-all rounded-full" />
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="grid grid-cols-2 gap-8 p-6">
              {/* Left side - Profile info */}
              <div className="space-y-6">
                {/* Profile picture and basic info */}
                <div className="flex flex-col items-center text-center space-y-3">
                  <img 
                    src={candidate.image} 
                    alt={candidate.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold">{candidate.name}</h3>
                    <p className="text-muted-foreground">{candidate.city}, Poland</p>
                    <div className="flex items-center justify-center gap-3 mt-2">
                      <span className="text-sm text-muted-foreground">{candidate.match} match</span>
                      <span className="text-sm font-medium text-primary">Engagement: {candidate.engagementRate}%</span>
                    </div>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <p className="text-sm font-medium">AI Summary</p>
                  </div>
                  <p className="text-sm text-black leading-relaxed font-light">
                    {candidate.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {achievements.slice(0, 5).map((achievement, idx) => (
                    <Badge key={idx} variant="secondary" className="px-3 py-1.5" style={{ backgroundColor: '#FAF8F4' }}>
                      {achievement}
                    </Badge>
                  ))}
                </div>

                {/* About section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">About</h4>
                  
                  {/* AI Analysis */}
                  <div className="rounded-lg p-4 space-y-2" style={{ backgroundColor: '#FAF8F4' }}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium">AI Analysis</p>
                    </div>
                    <p className="text-sm text-black leading-relaxed font-light">
                      <span className="font-normal">{candidate.name}</span> is an <span className="font-normal">exceptional match</span> for the <span className="font-normal">Product Designer position</span>. With <span className="font-normal">extensive experience in fintech</span> and <span className="font-normal">proven leadership abilities</span>, they demonstrate <span className="font-normal">strong alignment</span> with the role requirements. Their portfolio showcases a deep understanding of <span className="font-normal">user-centered design principles</span> and ability to balance business objectives with user needs. The candidate has a track record of <span className="font-normal">successful product launches</span> and team collaboration, making them an <span className="font-normal">ideal fit</span> for a fast-paced, innovation-driven environment.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold">Experience</h5>
                    <div className="space-y-3">
                      {candidate.roles.map((role, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border">
                            <img 
                              src={companyLogos[role.company] || aresLogo} 
                              alt={role.company}
                              className="w-full h-full object-contain p-1"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{role.role}</p>
                            <p className="text-xs text-muted-foreground">{role.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold">Contact Information</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>+46 70 123 45 67</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{candidate.name.toLowerCase().replace(' ', '.')}@email.com</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        <a href="#" className="text-primary hover:underline">linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '-')}</a>
                      </div>
                    </div>
                    <Separator className="my-4" />
                  </div>

                  {/* Achievements & Links */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold">Achievements & Portfolio</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-muted-foreground" />
                        <span>UX Hackathon Winner 2025</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <a href="#" className="text-primary hover:underline flex items-center gap-1">
                          Portfolio
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <LinkIcon className="w-4 h-4 text-muted-foreground" />
                        <a href="#" className="text-primary hover:underline flex items-center gap-1">
                          Dribbble Profile
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Contact form */}
              <div className="space-y-4 sticky top-0 self-start max-h-[calc(90vh-180px)] overflow-y-auto">
                <div className="rounded-lg p-6 space-y-4">
                  <h4 className="text-sm font-semibold uppercase text-muted-foreground">Template</h4>
                  
                  {/* Template accordion */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="template" className="border rounded-lg shadow-md">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm">Contact</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="space-y-2">
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                            Initial Outreach
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                            Follow-up
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                            Interview Invitation
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Contact options */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-semibold uppercase text-muted-foreground">Contact options</h5>
                    <div className="flex gap-1 p-1 bg-muted rounded-lg">
                      <Button 
                        variant={contactMethod === 'email' ? 'default' : 'ghost'}
                        className="flex-1 gap-2"
                        onClick={() => setContactMethod('email')}
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </Button>
                      <Button 
                        variant={contactMethod === 'linkedin' ? 'default' : 'ghost'}
                        className="flex-1 gap-2"
                        onClick={() => setContactMethod('linkedin')}
                      >
                        <Linkedin className="w-4 h-4" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>

                  {/* Email selection accordion - only show when email is selected */}
                  {contactMethod === 'email' && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="email" className="border rounded-lg shadow-md">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="text-sm">{candidate.name.toLowerCase().replace(' ', '.')}@email.com</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-3">
                          <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                              {candidate.name.toLowerCase().replace(' ', '.')}@email.com
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors">
                              {candidate.name.toLowerCase().split(' ')[0]}@company.com
                            </button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  {/* Subject input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold uppercase text-muted-foreground">Subject</label>
                    <Input 
                      placeholder="Opportunity at Ares Studio" 
                      defaultValue="Opportunity at Ares Studio"
                      className="shadow-md"
                    />
                  </div>

                  {/* Body textarea */}
                  <div className="space-y-2 relative">
                    <label className="text-sm font-semibold uppercase text-muted-foreground">Body</label>
                    <div className="relative">
                      <Textarea 
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        className="min-h-[200px] resize-none shadow-md"
                      />
                      {isPersonalizing && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-md flex items-center justify-center animate-fade-in">
                          <div className="flex flex-col items-center gap-3">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <div className="flex items-center gap-2">
                              <Sparkles className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">AI is personalizing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Paperclip className="w-4 h-4" />
                      Add attachment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 gap-2"
                      onClick={handlePersonalize}
                      disabled={isPersonalizing}
                    >
                      <Sparkles className="w-4 h-4" />
                      AI Personalize
                    </Button>
                    <AskAIPopover
                      trigger={
                        <Button variant="outline" className="flex-1 gap-2">
                          <Sparkles className="w-4 h-4" />
                          Ask AI
                        </Button>
                      }
                      onApply={(answer) => {
                        // Append AI answer as a note or suggestion
                        setMessageBody(prev => prev + '\n\n' + answer);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onPrevious}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onSkip}
              >
                Skip
              </Button>
              <Button 
                onClick={onNext}
                className="gap-2"
              >
                Send & next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
