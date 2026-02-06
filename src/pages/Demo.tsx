import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { bestCandidates } from '@/data/candidates';
import CandidateProfilePanel from '@/components/CandidateProfilePanel';
import CandidateDetailPanel from '@/components/CandidateDetailPanel';
import { PipelineGridCard } from '@/components/PipelineGridCard';
import jobDropdownIcon from '@/assets/job-dropdown-icon-new.png';
import userAvatarImage from '@/assets/user-avatar.png';
import profile1 from '@/assets/profile-1.jpg';
import profile2 from '@/assets/profile-2.jpg';
import profile3 from '@/assets/profile-3.jpg';
import profile4 from '@/assets/profile-4.jpg';
import profile5 from '@/assets/profile-5.jpg';
import profile6 from '@/assets/profile-6.jpg';

const SLIDE_DURATION = 5000;
const SLIDES = ['dashboard', 'review', 'pipeline'] as const;

// Static header used across all slides
const DemoHeader = ({ activeTab }: { activeTab: string }) => (
  <header className="h-[54px] flex items-center justify-between px-5 flex-shrink-0 relative" style={{ backgroundColor: '#F2F1ED', borderBottom: '1px solid #D9D9D9' }}>
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#E8E6DD' }}>
        <svg className="w-4 h-4" style={{ color: '#333333' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md" style={{ backgroundColor: '#E8E6DD' }}>
        <img src={jobDropdownIcon} alt="Job" className="w-5 h-5 rounded-md" />
        <span className="font-medium text-sm" style={{ color: '#333333' }}>BD Representative / Sales Manager</span>
      </div>
    </div>
    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-0.5 px-0.5 h-7 rounded-md" style={{ backgroundColor: '#E8E6DD' }}>
      {['Job', 'Review (10)', 'Pipeline'].map((label, i) => {
        const tabKey = ['dashboard', 'review', 'pipeline'][i];
        return (
          <div
            key={label}
            className={`px-3 h-[22px] rounded text-xs font-medium flex items-center ${activeTab === tabKey ? 'bg-white shadow-sm' : ''}`}
            style={{ color: '#333333' }}
          >
            {label}
          </div>
        );
      })}
    </div>
    <div className="flex items-center gap-2">
      <img src={userAvatarImage} alt="Profile" className="w-7 h-7 rounded-full object-cover border-2 border-gray-200" />
    </div>
  </header>
);

// Slide 1: Dashboard
const DashboardSlide = () => {
  const [applicants, setApplicants] = useState(0);
  const [rejections, setRejections] = useState(0);
  const [bestMatches, setBestMatches] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setApplicants(Math.floor(23 * p));
      setRejections(Math.floor(8 * p));
      setBestMatches(Math.floor(100 * p));
      if (step >= steps) {
        setApplicants(23);
        setRejections(8);
        setBestMatches(100);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex justify-center overflow-y-auto" style={{ backgroundColor: '#FBFAF9' }}>
      <div className="w-full max-w-[1200px] py-6 px-6">
        {/* Stats Row */}
        <div className="flex gap-3 mb-4 pt-3">
          <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1rem', color: '#333' }}>Applicants</p>
            </div>
            <p className="text-4xl font-medium mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A1A' }}>{applicants}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span style={{ fontFamily: 'Inter, sans-serif' }}>Review now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          <div className="flex-1 rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1rem', color: '#333' }}>Rejected</p>
            </div>
            <p className="text-4xl font-medium mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A1A' }}>{rejections}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span style={{ fontFamily: 'Inter, sans-serif' }}>Review now</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Best Matches Title */}
        <h3 className="mb-3" style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Best matches</h3>

        {/* Rate Candidates Banner */}
        <div
          className="w-full rounded-xl p-5 mb-4"
          style={{ background: 'linear-gradient(135deg, #EBDBBD 0%, #D5A27F 20%, #CD785C 45%, #CD785C 100%)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
              <svg className="w-4 h-4" style={{ color: '#000' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1rem', color: '#000' }}>Rate matched candidates</p>
          </div>
          <p className="text-4xl font-medium mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#000' }}>{bestMatches}</p>
          <div className="flex items-center gap-1 text-sm" style={{ color: 'rgba(0,0,0,0.7)' }}>
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Review and rate now</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Pipeline cards */}
        <div className="flex items-center justify-between mb-3 pt-3">
          <h3 style={{ fontSize: '1.5rem', color: '#333333', fontFamily: 'CooperLight, sans-serif' }}>Your Pipeline</h3>
          <div className="flex items-center gap-1 text-sm font-medium" style={{ color: '#333333' }}>
            View pipeline <ChevronRight className="w-4 h-4" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'To contact', count: 50 },
            { label: 'To Schedule', count: 40 },
            { label: 'Interviewing', count: 25 },
            { label: 'Ready', count: 8 },
          ].map(item => (
            <div key={item.label} className="rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E6E6' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#CD785C' }}>
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p style={{ fontFamily: 'CooperLight, sans-serif', fontSize: '1rem', color: '#333' }}>{item.label}</p>
              </div>
              <p className="text-4xl font-medium mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#1A1A1A' }}>{item.count}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span style={{ fontFamily: 'Inter, sans-serif' }}>Review now</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Slide 2: Candidate Review
const ReviewSlide = () => {
  const candidate = bestCandidates[0];
  return (
    <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#FBFAF9' }}>
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="py-6 px-4">
          <div className="flex gap-4 items-start">
            <div className="w-[45%] min-w-0">
              <CandidateProfilePanel
                candidate={candidate}
                currentIndex={0}
                totalCount={10}
                hideProgressHeader={true}
              />
            </div>
            <div className="w-[55%] min-w-0">
              <div className="bg-white border border-[#EEEDEC] rounded-xl overflow-hidden">
                <CandidateDetailPanel
                  candidate={candidate}
                  onClose={() => {}}
                  onNotAGoodFit={() => {}}
                  onSaveToJob={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Slide 3: Pipeline Grid
const pipelineCandidates = [
  { id: '1', name: 'Sarah Chapman', image: profile1, position: 'Senior UX/UI Designer', company: 'Klarna', city: 'Warsaw', country: 'Poland', rating: 4, companies: ['Stripe', 'Figma'], lastContact: '1h ago', match: '10/12', engagementRate: 78, status: 'saved' as const, statusLabel: 'Saved', statusDate: 'Just now', followUp: 'Follow up in 2 days' },
  { id: '2', name: 'Sam Morris', image: profile2, position: 'Senior UX/UI Designer', company: 'Spotify', city: 'Cracow', country: 'Poland', rating: 5, companies: ['Ares', 'Figma'], lastContact: '3h ago', match: '11/12', engagementRate: 92, status: 'saved' as const, statusLabel: 'Saved', statusDate: '16 Jan', followUp: 'Respond to message' },
  { id: '3', name: 'Esther Howard', image: profile3, position: 'Senior UX/UI Designer', company: 'Bambora', city: 'Wroclaw', country: 'Poland', rating: 3, companies: ['Stripe'], lastContact: '2d ago', match: '9/12', engagementRate: 65, status: 'contacted' as const, statusLabel: 'Contacted', statusDate: '16 Jan', followUp: 'Follow up in 2 days' },
  { id: '4', name: 'Pia Lorry', image: profile4, position: 'Senior UX/UI Designer', company: 'Tink', city: 'Warsaw', country: 'Poland', rating: 4, companies: ['Figma'], lastContact: '5h ago', match: '8/12', engagementRate: 71, status: 'contacted' as const, statusLabel: 'Contacted', statusDate: '14 days ago', followUp: 'No activity in 14 days' },
  { id: '5', name: 'Devon Lane', image: profile5, position: 'Senior UX/UI Designer', company: 'iZettle', city: 'Warsaw', country: 'Poland', rating: 5, companies: ['Stripe', 'Figma'], lastContact: '1d ago', match: '12/12', engagementRate: 95, status: 'interview' as const, statusLabel: 'Interview 1', statusDate: '16 Jan', followUp: 'Interview scheduled • 16 Jan' },
  { id: '6', name: 'John Wilson', image: profile6, position: 'Senior UX/UI Designer', company: 'King', city: 'Warsaw', country: 'Poland', rating: 4, companies: ['Figma'], lastContact: '12h ago', match: '10/12', engagementRate: 83, status: 'interview' as const, statusLabel: 'Interview 1', statusDate: '3 days ago', followUp: 'Met with Sarah • 3 days ago' },
];

const PipelineSlide = () => (
  <div className="flex-1 flex overflow-hidden" style={{ backgroundColor: '#FBFAF9' }}>
    <div className="flex-1 min-w-0 flex justify-center">
      <div className="w-full max-w-[1400px] h-full flex flex-col pt-6 pb-3 px-6">
        <div className="flex-1 overflow-y-auto bg-background rounded-[15px] p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineCandidates.map(c => (
              <PipelineGridCard key={c.id} candidate={c} onReject={() => {}} onDelete={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Demo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % SLIDES.length);
        setIsTransitioning(false);
      }, 400);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden pointer-events-none select-none" style={{ backgroundColor: '#F5F4F1' }}>
      <DemoHeader activeTab={SLIDES[currentSlide]} />
      
      <div
        className="flex-1 flex flex-col overflow-hidden transition-opacity duration-400"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        {SLIDES[currentSlide] === 'dashboard' && <DashboardSlide />}
        {SLIDES[currentSlide] === 'review' && <ReviewSlide />}
        {SLIDES[currentSlide] === 'pipeline' && <PipelineSlide />}
      </div>

      {/* Progress dots */}
      <div className="flex-shrink-0 flex items-center justify-center gap-2 py-3" style={{ backgroundColor: '#F2F1ED', borderTop: '1px solid #D9D9D9' }}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: currentSlide === i ? 24 : 8,
              height: 8,
              backgroundColor: currentSlide === i ? '#CD785C' : '#D9D9D9',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Demo;
