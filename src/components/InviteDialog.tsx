import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, X } from 'lucide-react';

interface InvitedPerson {
  id: string;
  email: string;
  permission: 'view' | 'edit';
}

interface InviteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteDialog = ({ open, onOpenChange }: InviteDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState<'view' | 'edit'>('view');
  const [invitedPeople, setInvitedPeople] = useState<InvitedPerson[]>([
    { id: '1', email: 'sarah.johnson@company.com', permission: 'edit' },
    { id: '2', email: 'mike.chen@company.com', permission: 'view' },
    { id: '3', email: 'alex.rivera@company.com', permission: 'edit' },
  ]);

  const handleInvite = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Check if already invited
    if (invitedPeople.some(person => person.email === email)) {
      toast({
        title: "Already invited",
        description: "This person has already been invited",
        variant: "destructive",
      });
      return;
    }

    // Add to invited list
    setInvitedPeople([...invitedPeople, {
      id: Date.now().toString(),
      email,
      permission,
    }]);

    // Show success toast
    toast({
      title: "Invite sent!",
      description: `Invitation sent to ${email}`,
      duration: 3000,
    });

    // Reset form
    setEmail('');
    setPermission('view');
  };

  const handleRemove = (id: string) => {
    setInvitedPeople(invitedPeople.filter(person => person.id !== id));
  };

  const handlePermissionChange = (id: string, newPermission: 'view' | 'edit') => {
    setInvitedPeople(invitedPeople.map(person => 
      person.id === id ? { ...person, permission: newPermission } : person
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite People</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Invite Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInvite()}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="permission">Permission</Label>
              <Select value={permission} onValueChange={(value: 'view' | 'edit') => setPermission(value)}>
                <SelectTrigger id="permission">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleInvite} className="w-full">
              Send Invite
            </Button>
          </div>

          {/* Invited People List */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Invited people</Label>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {invitedPeople.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{person.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-3">
                    <Select
                      value={person.permission}
                      onValueChange={(value: 'view' | 'edit') => handlePermissionChange(person.id, value)}
                    >
                      <SelectTrigger className="w-[100px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="view">View</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleRemove(person.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {invitedPeople.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No people invited yet
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
