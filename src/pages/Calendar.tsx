import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [dayOffset, setDayOffset] = useState(0);
  
  const meetings = [
    {
      id: 1,
      name: "Martin Outhern",
      time: "10:00 AM - 11:00 AM",
      date: "Today",
      avatar: profile1,
      color: "bg-[#F5F3E8]"
    },
    {
      id: 2,
      name: "Nicole Kim",
      time: "11:30 AM - 12:30 PM",
      date: "Today",
      avatar: profile2,
      color: "bg-[#E8F3E8]"
    },
    {
      id: 3,
      name: "Sarah Chapman",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      avatar: profile3,
      color: "bg-[#F3E8F3]"
    },
    {
      id: 4,
      name: "Marcus Andersson",
      time: "4:00 PM - 5:00 PM",
      date: "Today",
      avatar: profile4,
      color: "bg-[#E8F0F3]"
    },
    {
      id: 5,
      name: "Emma Lundberg",
      time: "10:00 AM - 11:00 AM",
      date: "Tomorrow",
      avatar: profile5,
      color: "bg-[#F3EBE8]"
    }
  ];

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  return (
    <div className="min-h-screen bg-[#FAF8F4] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-hedvig text-4xl text-foreground">Meetings</h1>
          
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-foreground min-w-[100px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Day selector */}
        <div className="relative flex items-center gap-3">
          <button 
            onClick={() => setDayOffset(prev => prev - 1)}
            className="flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-1 overflow-hidden">
            <div 
              className="flex gap-2 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${dayOffset * 72}px)` }}
            >
              {Array.from({ length: 30 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const isToday = i === 0;
                
                return (
                  <button
                    key={i}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all ${
                      isToday 
                        ? 'bg-[rgba(21,52,61,1)] text-white shadow-md' 
                        : 'bg-white text-foreground hover:bg-accent'
                    }`}
                  >
                    <span className="text-xs mb-1">
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-2xl font-medium">
                      {date.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <button 
            onClick={() => setDayOffset(prev => prev + 1)}
            className="flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="grid grid-cols-[80px_1fr] gap-4">
          {/* Time labels */}
          <div className="flex flex-col">
            <div className="h-12" /> {/* Spacer for header */}
            {hours.map(hour => (
              <div key={hour} className="h-24 flex items-start justify-end pr-4">
                <span className="text-sm text-muted-foreground">
                  {hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar content */}
          <div className="relative">
            {/* Hour lines */}
            {hours.map(hour => (
              <div key={hour} className="h-24 border-t border-border" />
            ))}

            {/* Meeting bubbles */}
            <div className="absolute inset-0 pt-12">
              {/* Today's meetings */}
              <div 
                className={`absolute left-4 right-4 ${meetings[0].color} rounded-2xl p-4 flex items-center justify-between shadow-md border border-white/50`}
                style={{ top: '8rem', height: '5rem' }}
              >
                <div>
                  <p className="font-medium text-foreground">{meetings[0].name}</p>
                  <p className="text-sm text-muted-foreground">{meetings[0].time}</p>
                </div>
                <img 
                  src={meetings[0].avatar} 
                  alt={meetings[0].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              <div 
                className={`absolute left-4 right-4 ${meetings[1].color} rounded-2xl p-4 flex items-center justify-between shadow-md border border-white/50`}
                style={{ top: '16rem', height: '5rem' }}
              >
                <div>
                  <p className="font-medium text-foreground">{meetings[1].name}</p>
                  <p className="text-sm text-muted-foreground">{meetings[1].time}</p>
                </div>
                <img 
                  src={meetings[1].avatar} 
                  alt={meetings[1].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              <div 
                className={`absolute left-4 right-4 ${meetings[2].color} rounded-2xl p-4 flex items-center justify-between shadow-md border border-white/50`}
                style={{ top: '28rem', height: '5rem' }}
              >
                <div>
                  <p className="font-medium text-foreground">{meetings[2].name}</p>
                  <p className="text-sm text-muted-foreground">{meetings[2].time}</p>
                </div>
                <img 
                  src={meetings[2].avatar} 
                  alt={meetings[2].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>

              <div 
                className={`absolute left-4 right-4 ${meetings[3].color} rounded-2xl p-4 flex items-center justify-between shadow-md border border-white/50`}
                style={{ top: '40rem', height: '5rem' }}
              >
                <div>
                  <p className="font-medium text-foreground">{meetings[3].name}</p>
                  <p className="text-sm text-muted-foreground">{meetings[3].time}</p>
                </div>
                <img 
                  src={meetings[3].avatar} 
                  alt={meetings[3].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
