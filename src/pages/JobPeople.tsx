import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobPeople = () => {
  const navigate = useNavigate();
  const [peopleCount, setPeopleCount] = useState(0);
  const [visibleMatches, setVisibleMatches] = useState(0);
  const [isSearching, setIsSearching] = useState(true);

  // Animate people count from 0 to 548 over 10 seconds
  useEffect(() => {
    const duration = 10000; // 10 seconds
    const targetCount = 548;
    const incrementTime = 50; // Update every 50ms
    const steps = duration / incrementTime;
    const increment = targetCount / steps;

    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        setPeopleCount(targetCount);
        setIsSearching(false);
        clearInterval(interval);
      } else {
        setPeopleCount(Math.floor(currentCount));
      }
    }, incrementTime);

    return () => clearInterval(interval);
  }, []);

  // Gradually show more matches
  useEffect(() => {
    const matchInterval = setInterval(() => {
      setVisibleMatches(prev => {
        if (prev >= 17) {
          clearInterval(matchInterval);
          return 17;
        }
        return prev + 1;
      });
    }, 600);

    return () => clearInterval(matchInterval);
  }, []);

  const bestMatches = [
    { initials: 'JD', name: 'John Doe', color: 'bg-blue-400' },
    { initials: 'SM', name: 'Sarah Miller', color: 'bg-purple-400' },
    { initials: 'RJ', name: 'Robert Johnson', color: 'bg-green-400' },
    { initials: 'EW', name: 'Emma Wilson', color: 'bg-pink-400' },
    { initials: 'MB', name: 'Michael Brown', color: 'bg-yellow-400' },
    { initials: 'OD', name: 'Olivia Davis', color: 'bg-indigo-400' },
    { initials: 'WG', name: 'William Garcia', color: 'bg-red-400' },
    { initials: 'AM', name: 'Ava Martinez', color: 'bg-teal-400' },
    { initials: 'JR', name: 'James Rodriguez', color: 'bg-orange-400' },
    { initials: 'ST', name: 'Sophia Taylor', color: 'bg-cyan-400' },
    { initials: 'DH', name: 'David Harris', color: 'bg-lime-400' },
    { initials: 'IL', name: 'Isabella Lopez', color: 'bg-fuchsia-400' },
    { initials: 'CH', name: 'Christopher Hill', color: 'bg-amber-400' },
    { initials: 'ML', name: 'Mia Lee', color: 'bg-emerald-400' },
    { initials: 'JW', name: 'Joseph White', color: 'bg-rose-400' },
    { initials: 'AY', name: 'Abigail Young', color: 'bg-violet-400' },
    { initials: 'TK', name: 'Thomas King', color: 'bg-sky-400' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafb] flex">
      {/* Main Content Area */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate('/job')}
              className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to job description
            </button>
          </div>

          {/* Searching Loader */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 text-xl font-medium text-foreground">
              {isSearching && (
                <div className="w-5 h-5 border-2 border-[rgba(21,52,61,0.3)] border-t-[rgba(21,52,61,1)] rounded-full animate-spin" />
              )}
              {isSearching ? 'Searching for people...' : 'Search complete!'}
            </div>
          </div>

          {/* External Sources */}
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-6 uppercase tracking-wider">
              External Sources
            </h3>
            <div className="relative overflow-hidden h-24">
              <div className="flex gap-6 animate-[scroll_20s_linear_infinite] absolute whitespace-nowrap">
                {/* First set of logos */}
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="128" fill="#FF4500"/>
                      <path d="M213.3 128c0-9.4-7.6-17-17-17-4.6 0-8.7 1.9-11.7 4.9-11.5-8.3-27.4-13.7-45-14.4l7.7-36.1 25 5.3c.3 6.4 5.6 11.5 12.1 11.5 6.7 0 12.1-5.4 12.1-12.1s-5.4-12.1-12.1-12.1c-4.9 0-9.1 2.9-11 7.1l-28-6c-1-.2-2.1.1-2.8.8-.7.7-1.1 1.7-.9 2.7l-8.5 39.9c-17.8.6-34 6.1-45.6 14.5-3-3.1-7.2-5-11.9-5-9.4 0-17 7.6-17 17 0 6.7 3.9 12.5 9.5 15.2-.3 1.8-.5 3.6-.5 5.5 0 28 32.5 50.7 72.5 50.7s72.5-22.7 72.5-50.7c0-1.9-.2-3.7-.5-5.5 5.7-2.7 9.6-8.5 9.6-15.2z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#1769FF" rx="128"/>
                      <path d="M85 165V91h25l25 40 25-40h25v74h-20v-44l-25 40h-10l-25-40v44H85z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="behance-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0057FF"/>
                          <stop offset="100%" stopColor="#1769FF"/>
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="url(#behance-gradient)"/>
                      <text x="128" y="180" fontSize="140" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Bē</text>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="dribbble-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ea4c89"/>
                          <stop offset="100%" stopColor="#e73d7c"/>
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="url(#dribbble-gradient)"/>
                      <circle cx="128" cy="128" r="90" fill="none" stroke="white" strokeWidth="12"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#0A66C2" rx="20"/>
                      <path d="M77.8 96.5h27.9v89.4H77.8V96.5zm14-44.7c8.9 0 16.1 7.2 16.1 16.1 0 8.9-7.2 16.1-16.1 16.1-8.9 0-16.1-7.2-16.1-16.1 0-8.9 7.2-16.1 16.1-16.1zm53 44.7h26.7v12.2h.4c3.7-7 12.8-14.4 26.4-14.4 28.2 0 33.4 18.6 33.4 42.7v49.2h-27.9v-43.6c0-10.4-.2-23.8-14.5-23.8-14.5 0-16.7 11.3-16.7 23v44.4h-27.9V96.5z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="128" fill="white"/>
                      <path d="M115.75 128L65 77.25l21.25-21.25L151 120.75 130.25 141.5z" fill="#4285F4"/>
                      <path d="M115.75 128l50.5 50.75-21.25 21.25L80.25 135.25 101 114.5z" fill="#EA4335"/>
                      <path d="M140.25 128L191 178.75l-21.25 21.25L105 135.25 125.75 114.5z" fill="#FBBC04"/>
                      <path d="M140.25 128L89.75 77.25l21.25-21.25L175.75 120.75 155 141.5z" fill="#34A853"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="128" fill="#1DB954"/>
                      <path d="M128 58c-38.7 0-70 31.3-70 70s31.3 70 70 70 70-31.3 70-70-31.3-70-70-70zm32.2 100.9c-1.3 2.1-4 2.8-6.1 1.5-16.7-10.2-37.7-12.5-62.5-6.8-2.4.5-4.7-.9-5.3-3.2-.5-2.4.9-4.7 3.2-5.3 27.1-6.2 50.2-3.5 68.9 7.9 2.1 1.2 2.8 4 1.8 6.1zm8.7-19.4c-1.6 2.6-5 3.4-7.6 1.8-19.1-11.7-48.2-15.1-70.8-8.3-3 .9-6.1-.8-7-3.7-.9-3 .8-6.1 3.7-7 25.8-7.8 57.7-4 79.9 9.4 2.6 1.6 3.4 5 1.8 7.6zm.8-20.2c-22.9-13.6-60.7-14.8-82.6-8.2-3.5 1.1-7.3-1-8.4-4.5-1.1-3.5 1-7.3 4.5-8.4 25.2-7.6 67.2-6.1 93.4 9.5 3.2 1.9 4.2 6 2.3 9.2-1.9 3.1-6 4.2-9.2 2.4z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#232F3E" rx="20"/>
                      <path d="M142.2 168.5c-22.2 16.4-54.5 25.1-82.2 25.1-38.9 0-73.9-14.4-100.4-38.3-2.1-1.9-.2-4.5 2.3-3 28.9 16.8 64.6 26.9 101.5 26.9 24.9 0 52.3-5.2 77.5-15.9 3.8-1.6 7 2.5 3.3 5.2z" fill="#FF9900" transform="translate(128, 128)"/>
                      <path d="M149.8 160.5c-2.8-3.6-18.6-1.7-25.7-.9-2.2.3-2.5-1.6-.5-3 12.6-8.9 33.2-6.3 35.6-3.3 2.4 3-.6 24.1-12.7 34.2-1.8 1.6-3.6.7-2.8-1.3 2.7-6.7 8.7-21.8 6.1-25.7z" fill="#FF9900" transform="translate(128, 128)"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#181717" rx="128"/>
                      <path d="M128 30C71.4 30 25.5 75.9 25.5 132.5c0 45.3 29.4 83.7 70.1 97.3 5.1.9 7-2.2 7-4.9 0-2.4-.1-10.3-.1-18.7-28.5 6.2-34.5-12.1-34.5-12.1-4.7-11.9-11.4-15-11.4-15-9.3-6.4.7-6.2.7-6.2 10.3.7 15.7 10.6 15.7 10.6 9.1 15.6 23.9 11.1 29.7 8.5.9-6.6 3.6-11.1 6.5-13.7-22.7-2.6-46.6-11.3-46.6-50.4 0-11.1 4-20.2 10.5-27.4-1.1-2.6-4.6-13 1-27.1 0 0 8.6-2.7 28.1 10.5 8.2-2.3 16.9-3.4 25.6-3.4 8.7 0 17.4 1.2 25.6 3.4 19.5-13.2 28.1-10.5 28.1-10.5 5.6 14.1 2.1 24.5 1 27.1 6.5 7.1 10.5 16.3 10.5 27.4 0 39.2-23.9 47.8-46.7 50.3 3.7 3.2 7 9.4 7 19 0 13.7-.1 24.7-.1 28.1 0 2.7 1.8 5.9 7 4.9 40.7-13.6 70-52 70-97.3C230.5 75.9 184.6 30 128 30z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="meta-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0081FB"/>
                          <stop offset="100%" stopColor="#0064E0"/>
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="url(#meta-gradient)"/>
                      <path d="M159 76c-19.9 0-31 13.7-31 30.7v4.5c0-17-11.1-30.7-31-30.7-20.2 0-35 15.3-35 38.7v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6C194 91.3 179.2 76 159 76z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="black" rx="50"/>
                      <path d="M203.5 101c-.8-7.2-3.5-13.6-8.1-18.3-4.6-4.7-11-7.4-18.1-8.2-14.1-1.6-35.3-1.6-35.3-1.6s-21.2 0-35.3 1.6c-7.1.8-13.5 3.5-18.1 8.2-4.6 4.7-7.3 11.1-8.1 18.3-1.6 14.1-1.6 43.5-1.6 43.5s0 29.4 1.6 43.5c.8 7.2 3.5 13.6 8.1 18.3 4.6 4.7 11 7.4 18.1 8.2 14.1 1.6 35.3 1.6 35.3 1.6s21.2 0 35.3-1.6c7.1-.8 13.5-3.5 18.1-8.2 4.6-4.7 7.3-11.1 8.1-18.3 1.6-14.1 1.6-43.5 1.6-43.5s0-29.4-1.6-43.5zm-85.6 70.9v-54.8l47.1 27.4-47.1 27.4z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="tiktok-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#25F4EE"/>
                          <stop offset="50%" stopColor="#FE2C55"/>
                          <stop offset="100%" stopColor="#000000"/>
                        </linearGradient>
                      </defs>
                      <rect width="256" height="256" fill="black" rx="60"/>
                      <path d="M178.9 88.2c-15.2-1.1-27.3-13.7-27.3-29.2v-2.9h-22.8v104.1c0 12.8-10.4 23.2-23.2 23.2-12.8 0-23.2-10.4-23.2-23.2 0-12.8 10.4-23.2 23.2-23.2 2.4 0 4.7.4 6.9 1.1V114c-2.2-.3-4.5-.5-6.9-.5-25.2 0-45.7 20.5-45.7 45.7 0 25.2 20.5 45.7 45.7 45.7s45.7-20.5 45.7-45.7V84.7c10 6.4 21.9 10.1 34.6 10.1v-22.5c-2.3 0-4.5-.1-6.8-.3-0.1 5.4.1 10.8.2 16.2z" fill="url(#tiktok-gradient)"/>
                    </svg>
                  </div>
                </div>
                {/* Duplicate set for seamless loop */}
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="128" fill="#FF4500"/>
                      <path d="M213.3 128c0-9.4-7.6-17-17-17-4.6 0-8.7 1.9-11.7 4.9-11.5-8.3-27.4-13.7-45-14.4l7.7-36.1 25 5.3c.3 6.4 5.6 11.5 12.1 11.5 6.7 0 12.1-5.4 12.1-12.1s-5.4-12.1-12.1-12.1c-4.9 0-9.1 2.9-11 7.1l-28-6c-1-.2-2.1.1-2.8.8-.7.7-1.1 1.7-.9 2.7l-8.5 39.9c-17.8.6-34 6.1-45.6 14.5-3-3.1-7.2-5-11.9-5-9.4 0-17 7.6-17 17 0 6.7 3.9 12.5 9.5 15.2-.3 1.8-.5 3.6-.5 5.5 0 28 32.5 50.7 72.5 50.7s72.5-22.7 72.5-50.7c0-1.9-.2-3.7-.5-5.5 5.7-2.7 9.6-8.5 9.6-15.2z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#1769FF" rx="128"/>
                      <path d="M85 165V91h25l25 40 25-40h25v74h-20v-44l-25 40h-10l-25-40v44H85z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="behance-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0057FF"/>
                          <stop offset="100%" stopColor="#1769FF"/>
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="url(#behance-gradient-2)"/>
                      <text x="128" y="180" fontSize="140" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">Bē</text>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="dribbble-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ea4c89"/>
                          <stop offset="100%" stopColor="#e73d7c"/>
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="url(#dribbble-gradient-2)"/>
                      <circle cx="128" cy="128" r="90" fill="none" stroke="white" strokeWidth="12"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#0A66C2" rx="20"/>
                      <path d="M77.8 96.5h27.9v89.4H77.8V96.5zm14-44.7c8.9 0 16.1 7.2 16.1 16.1 0 8.9-7.2 16.1-16.1 16.1-8.9 0-16.1-7.2-16.1-16.1 0-8.9 7.2-16.1 16.1-16.1zm53 44.7h26.7v12.2h.4c3.7-7 12.8-14.4 26.4-14.4 28.2 0 33.4 18.6 33.4 42.7v49.2h-27.9v-43.6c0-10.4-.2-23.8-14.5-23.8-14.5 0-16.7 11.3-16.7 23v44.4h-27.9V96.5z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="128" fill="white"/>
                      <path d="M115.75 128L65 77.25l21.25-21.25L151 120.75 130.25 141.5z" fill="#4285F4"/>
                      <path d="M115.75 128l50.5 50.75-21.25 21.25L80.25 135.25 101 114.5z" fill="#EA4335"/>
                      <path d="M140.25 128L191 178.75l-21.25 21.25L105 135.25 125.75 114.5z" fill="#FBBC04"/>
                      <path d="M140.25 128L89.75 77.25l21.25-21.25L175.75 120.75 155 141.5z" fill="#34A853"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <circle cx="128" cy="128" r="128" fill="#1DB954"/>
                      <path d="M128 58c-38.7 0-70 31.3-70 70s31.3 70 70 70 70-31.3 70-70-31.3-70-70-70zm32.2 100.9c-1.3 2.1-4 2.8-6.1 1.5-16.7-10.2-37.7-12.5-62.5-6.8-2.4.5-4.7-.9-5.3-3.2-.5-2.4.9-4.7 3.2-5.3 27.1-6.2 50.2-3.5 68.9 7.9 2.1 1.2 2.8 4 1.8 6.1zm8.7-19.4c-1.6 2.6-5 3.4-7.6 1.8-19.1-11.7-48.2-15.1-70.8-8.3-3 .9-6.1-.8-7-3.7-.9-3 .8-6.1 3.7-7 25.8-7.8 57.7-4 79.9 9.4 2.6 1.6 3.4 5 1.8 7.6zm.8-20.2c-22.9-13.6-60.7-14.8-82.6-8.2-3.5 1.1-7.3-1-8.4-4.5-1.1-3.5 1-7.3 4.5-8.4 25.2-7.6 67.2-6.1 93.4 9.5 3.2 1.9 4.2 6 2.3 9.2-1.9 3.1-6 4.2-9.2 2.4z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#232F3E" rx="20"/>
                      <path d="M142.2 168.5c-22.2 16.4-54.5 25.1-82.2 25.1-38.9 0-73.9-14.4-100.4-38.3-2.1-1.9-.2-4.5 2.3-3 28.9 16.8 64.6 26.9 101.5 26.9 24.9 0 52.3-5.2 77.5-15.9 3.8-1.6 7 2.5 3.3 5.2z" fill="#FF9900" transform="translate(128, 128)"/>
                      <path d="M149.8 160.5c-2.8-3.6-18.6-1.7-25.7-.9-2.2.3-2.5-1.6-.5-3 12.6-8.9 33.2-6.3 35.6-3.3 2.4 3-.6 24.1-12.7 34.2-1.8 1.6-3.6.7-2.8-1.3 2.7-6.7 8.7-21.8 6.1-25.7z" fill="#FF9900" transform="translate(128, 128)"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="#181717" rx="128"/>
                      <path d="M128 30C71.4 30 25.5 75.9 25.5 132.5c0 45.3 29.4 83.7 70.1 97.3 5.1.9 7-2.2 7-4.9 0-2.4-.1-10.3-.1-18.7-28.5 6.2-34.5-12.1-34.5-12.1-4.7-11.9-11.4-15-11.4-15-9.3-6.4.7-6.2.7-6.2 10.3.7 15.7 10.6 15.7 10.6 9.1 15.6 23.9 11.1 29.7 8.5.9-6.6 3.6-11.1 6.5-13.7-22.7-2.6-46.6-11.3-46.6-50.4 0-11.1 4-20.2 10.5-27.4-1.1-2.6-4.6-13 1-27.1 0 0 8.6-2.7 28.1 10.5 8.2-2.3 16.9-3.4 25.6-3.4 8.7 0 17.4 1.2 25.6 3.4 19.5-13.2 28.1-10.5 28.1-10.5 5.6 14.1 2.1 24.5 1 27.1 6.5 7.1 10.5 16.3 10.5 27.4 0 39.2-23.9 47.8-46.7 50.3 3.7 3.2 7 9.4 7 19 0 13.7-.1 24.7-.1 28.1 0 2.7 1.8 5.9 7 4.9 40.7-13.6 70-52 70-97.3C230.5 75.9 184.6 30 128 30z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="meta-gradient-2" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0081FB"/>
                          <stop offset="100%" stopColor="#0064E0"/>
                        </linearGradient>
                      </defs>
                      <circle cx="128" cy="128" r="128" fill="url(#meta-gradient-2)"/>
                      <path d="M159 76c-19.9 0-31 13.7-31 30.7v4.5c0-17-11.1-30.7-31-30.7-20.2 0-35 15.3-35 38.7v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6c0-14.5 8.1-22.3 18.5-22.3s18.5 7.8 18.5 22.3v55.6c0 4.6 3.7 8.2 8.2 8.2h.1c4.6 0 8.2-3.7 8.2-8.2v-55.6C194 91.3 179.2 76 159 76z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <rect width="256" height="256" fill="black" rx="50"/>
                      <path d="M203.5 101c-.8-7.2-3.5-13.6-8.1-18.3-4.6-4.7-11-7.4-18.1-8.2-14.1-1.6-35.3-1.6-35.3-1.6s-21.2 0-35.3 1.6c-7.1.8-13.5 3.5-18.1 8.2-4.6 4.7-7.3 11.1-8.1 18.3-1.6 14.1-1.6 43.5-1.6 43.5s0 29.4 1.6 43.5c.8 7.2 3.5 13.6 8.1 18.3 4.6 4.7 11 7.4 18.1 8.2 14.1 1.6 35.3 1.6 35.3 1.6s21.2 0 35.3-1.6c7.1-.8 13.5-3.5 18.1-8.2 4.6-4.7 7.3-11.1 8.1-18.3 1.6-14.1 1.6-43.5 1.6-43.5s0-29.4-1.6-43.5zm-85.6 70.9v-54.8l47.1 27.4-47.1 27.4z" fill="white"/>
                    </svg>
                  </div>
                  <div className="w-16 h-16 flex items-center justify-center">
                    <svg className="w-14 h-14" viewBox="0 0 256 256" fill="none">
                      <defs>
                        <linearGradient id="tiktok-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#25F4EE"/>
                          <stop offset="50%" stopColor="#FE2C55"/>
                          <stop offset="100%" stopColor="#000000"/>
                        </linearGradient>
                      </defs>
                      <rect width="256" height="256" fill="black" rx="60"/>
                      <path d="M178.9 88.2c-15.2-1.1-27.3-13.7-27.3-29.2v-2.9h-22.8v104.1c0 12.8-10.4 23.2-23.2 23.2-12.8 0-23.2-10.4-23.2-23.2 0-12.8 10.4-23.2 23.2-23.2 2.4 0 4.7.4 6.9 1.1V114c-2.2-.3-4.5-.5-6.9-.5-25.2 0-45.7 20.5-45.7 45.7 0 25.2 20.5 45.7 45.7 45.7s45.7-20.5 45.7-45.7V84.7c10 6.4 21.9 10.1 34.6 10.1v-22.5c-2.3 0-4.5-.1-6.8-.3-0.1 5.4.1 10.8.2 16.2z" fill="url(#tiktok-gradient-2)"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Sources */}
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-6 uppercase tracking-wider">
              Internal Sources
            </h3>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-3 bg-muted/50 px-6 py-3 rounded-xl">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    SM
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">Network</span>
              </div>
              <div className="flex items-center gap-3 bg-muted/50 px-6 py-3 rounded-xl">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-green-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    📄
                  </div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                    📋
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground">Applied</span>
              </div>
            </div>
          </div>

          {/* People Found Counter */}
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-4 uppercase tracking-wider">
              People Found
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-3">
                {[0, 1, 2].map((i) => (
                  <div 
                    key={i}
                    className={`w-10 h-10 rounded-full ${['bg-blue-400', 'bg-purple-400', 'bg-green-400'][i]} flex items-center justify-center text-white text-xs font-medium border-2 border-white transition-all duration-300 ${peopleCount > 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    {['JD', 'SM', 'RJ'][i]}
                  </div>
                ))}
              </div>
              <div className="text-5xl font-bold text-[rgba(21,52,61,1)] tabular-nums">
                {peopleCount}
              </div>
            </div>
          </div>

          {/* Best Matches */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground text-center mb-6 uppercase tracking-wider">
              Best Matches
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {bestMatches.slice(0, visibleMatches).map((match, index) => (
                <div 
                  key={index}
                  className={`w-16 h-16 rounded-2xl ${match.color} flex items-center justify-center text-white text-sm font-bold shadow-md transition-all duration-300 hover:scale-110 animate-scale-in`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  title={match.name}
                >
                  {match.initials}
                </div>
              ))}
              {visibleMatches >= 17 && (
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center text-foreground text-sm font-bold shadow-md animate-scale-in">
                  +12
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Chat Panel - keeping it consistent with the Job page */}
      <div className="w-[400px] border-l border-border bg-white flex flex-col">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <div className="text-sm text-muted-foreground">
            Searching through multiple sources to find the best candidates for your position...
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPeople;
