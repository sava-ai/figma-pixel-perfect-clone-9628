import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon, Clock, Paperclip, Bell, Search, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import jobDropdownIcon from '@/assets/job-dropdown-icon.png';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';

interface CreateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Guest {
  id: number;
  name: string;
  avatar: string;
  jobTitle: string;
}

const jobs = [
  { id: 1, title: 'Senior Product Designer' },
  { id: 2, title: 'Chief Operations Officer' },
  { id: 3, title: 'Frontend Developer' }
];

const people = [
  { id: 1, name: 'Martin Outhern', avatar: profile1, jobId: 1, jobTitle: 'Senior Product Designer' },
  { id: 2, name: 'Nicole Kim', avatar: profile2, jobId: 1, jobTitle: 'Senior Product Designer' },
  { id: 3, name: 'Sarah Chapman', avatar: profile3, jobId: 2, jobTitle: 'Chief Operations Officer' },
  { id: 4, name: 'Marcus Andersson', avatar: profile4, jobId: 3, jobTitle: 'Frontend Developer' },
  { id: 5, name: 'Emma Lundberg', avatar: profile5, jobId: 1, jobTitle: 'Senior Product Designer' },
];

export const CreateMeetingDialog = ({ open, onOpenChange }: CreateMeetingDialogProps) => {
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>([]);
  const [reminder, setReminder] = useState('15');
  const [message, setMessage] = useState('');

  const filteredPeople = people.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJob = !selectedJob || person.jobId.toString() === selectedJob;
    return matchesSearch && matchesJob;
  });

  const addGuest = (person: typeof people[0]) => {
    if (!selectedGuests.find(g => g.id === person.id)) {
      setSelectedGuests([...selectedGuests, {
        id: person.id,
        name: person.name,
        avatar: person.avatar,
        jobTitle: person.jobTitle
      }]);
    }
  };

  const removeGuest = (guestId: number) => {
    setSelectedGuests(selectedGuests.filter(g => g.id !== guestId));
  };

  const handleSave = () => {
    const defaultMessage = `Hi,

You're invited to: ${title}

📅 ${date ? format(date, 'PPP') : 'Date TBD'}
⏰ ${startTime} - ${endTime}
🔗 ${meetLink || 'Link will be provided'}

Looking forward to seeing you there!`;

    setMessage(defaultMessage);
    setShowMessageDialog(true);
  };

  const handleSendInvite = () => {
    console.log('Sending invite with message:', message);
    setShowMessageDialog(false);
    onOpenChange(false);
    // Reset form
    setTitle('');
    setDate(undefined);
    setStartTime('');
    setEndTime('');
    setMeetLink('');
    setSelectedGuests([]);
    setMessage('');
    setSearchQuery('');
    setSelectedJob('');
  };

  return (
    <>
      <Dialog open={open && !showMessageDialog} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-hedvig text-2xl">Create Meeting</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
              <Input
                id="title"
                placeholder="Meeting title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={!title ? 'border-destructive/50' : ''}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Date <span className="text-destructive">*</span></Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground border-destructive/50"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start-time"
                    type="time"
                    className={cn("pl-10", !startTime && "border-destructive/50")}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-time">End Time <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end-time"
                    type="time"
                    className={cn("pl-10", !endTime && "border-destructive/50")}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-2">
              <Label>Guests</Label>
              
              {/* Selected Guests */}
              {selectedGuests.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedGuests.map(guest => (
                    <div key={guest.id} className="flex items-center gap-2 bg-accent rounded-full pl-1 pr-3 py-1">
                      <img src={guest.avatar} alt={guest.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-sm">{guest.name}</span>
                      <button onClick={() => removeGuest(guest.id)} className="hover:text-destructive">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Search and Filter */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search people..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.map(job => (
                      <SelectItem key={job.id} value={job.id.toString()}>{job.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* People List */}
              <div className="border rounded-lg max-h-48 overflow-y-auto">
                {filteredPeople.map(person => (
                  <button
                    key={person.id}
                    onClick={() => addGuest(person)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-accent transition-colors text-left"
                    disabled={selectedGuests.some(g => g.id === person.id)}
                  >
                    <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.jobTitle}</p>
                    </div>
                    {selectedGuests.some(g => g.id === person.id) && (
                      <span className="text-sm text-muted-foreground">Added</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Google Meet Link */}
            <div className="space-y-2">
              <Label htmlFor="meet-link">Google Meet Link (optional)</Label>
              <Input
                id="meet-link"
                placeholder="https://meet.google.com/..."
                value={meetLink}
                onChange={(e) => setMeetLink(e.target.value)}
              />
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments (optional)</Label>
              <Button variant="outline" className="w-full justify-start">
                <Paperclip className="mr-2 h-4 w-4" />
                Add attachment
              </Button>
            </div>

            {/* Reminder */}
            <div className="space-y-2">
              <Label htmlFor="reminder">Reminder</Label>
              <Select value={reminder} onValueChange={setReminder}>
                <SelectTrigger>
                  <Bell className="mr-2 h-4 w-4" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">At time of event</SelectItem>
                  <SelectItem value="15">15 minutes before</SelectItem>
                  <SelectItem value="30">30 minutes before</SelectItem>
                  <SelectItem value="60">1 hour before</SelectItem>
                  <SelectItem value="1440">1 day before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title || !date || !startTime || !endTime}>
              {!title || !date || !startTime || !endTime ? 'Fill required fields' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-hedvig">Invitation Message</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Recipients ({selectedGuests.length})</Label>
              <div className="flex flex-wrap gap-2">
                {selectedGuests.map(guest => (
                  <div key={guest.id} className="flex items-center gap-2 bg-accent rounded-full pl-1 pr-3 py-1">
                    <img src={guest.avatar} alt={guest.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-sm">{guest.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={10}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
              Back
            </Button>
            <Button onClick={handleSendInvite}>
              Send Invitations
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
