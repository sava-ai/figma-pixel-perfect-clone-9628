import React, { useState } from 'react';
import { UserAvatar } from '@/components/UserAvatar';
import { JobCard } from '@/components/JobCard';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMyPositions, setShowMyPositions] = useState(false);

  const jobData = {
    title: "Chief Operations Officer",
    userName: "Mateusz Budka",
    stats: {
      found: 55,
      saved: 55,
      contacted: 55,
      interviewed: 55
    },
    actionsNeeded: 4
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const jobs = Array(9).fill(jobData);

  return (
    <main className="min-h-screen w-full relative">
      <img
        src="https://api.builder.io/api/v1/image/assets/0677352841954e63b83e06744bf122f2/f3f0c4b87a4b2eb2916329b323625bed615637f8?placeholderIfAbsent=true"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center pt-20 pb-20 px-8">
        {/* Right sidebar */}
        <aside className="fixed right-8 top-8 flex flex-col gap-4">
          <UserAvatar initials="TW" />
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </aside>

        {/* Main content */}
        <div className="w-full max-w-[900px]">
          {/* Logo */}
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-20">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
          </div>

          {/* Search section */}
          <div className="text-center mb-8">
            <h1 className="text-[42px] font-serif italic text-[rgba(21,52,61,1)] mb-6">
              Describe who you want to hire
            </h1>
            <form onSubmit={handleSearch} className="relative max-w-[600px] mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="For example: find a user experience designer in Warsaw"
                className="w-full bg-white rounded-2xl shadow-lg px-6 py-4 pr-14 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)]"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[rgba(21,52,61,1)] rounded-full flex items-center justify-center hover:bg-[rgba(21,52,61,0.9)] transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>

          {/* Jobs section */}
          <section className="bg-white rounded-3xl shadow-xl p-8 mt-12">
            <h2 className="text-[45px] font-normal text-[rgba(21,52,61,1)] tracking-tight mb-8">
              Jobs
            </h2>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full bg-white border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[rgba(21,52,61,1)]"
                />
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                <UserAvatar initials="TW" size="sm" />
                <span>Show only my positions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                Show archived
              </button>
            </div>

            {/* Job cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard
                  key={index}
                  {...job}
                  onMenuClick={() => console.log('Menu clicked', index)}
                  onActionClick={() => console.log('Action clicked', index)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Index;
