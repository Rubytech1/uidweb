import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardNav from '../components/dashboard/DashboardNav';
import MembershipCard from '../components/dashboard/MembershipCard';
import DiscountCode from '../components/dashboard/DiscountCode';
import Benefits from '../components/dashboard/Benefits';
import EventsList from '../components/dashboard/EventsList';
import NewsList from '../components/dashboard/NewsList';
import ProfilePanel from '../components/profile/ProfilePanel';
import type { MemberEvent, MemberNews } from '../types';

// ── Mock data — will be replaced by Supabase queries ────────────
const MOCK_EVENTS: MemberEvent[] = [
  {
    id: 'e1',
    title: 'Annual Cultural Gala',
    description: 'Join us for an evening of celebration, music and community.',
    date: '2026-09-15T18:00:00',
    location: 'Toronto Reference Library',
  },
  {
    id: 'e2',
    title: 'Youth Leadership Workshop',
    description: 'A hands-on workshop for young community leaders.',
    date: '2026-08-03T14:00:00',
    location: 'Civic Centre, Hall B',
  },
  {
    id: 'e3',
    title: 'Community Iftar Dinner',
    description: 'Breaking fast together — all members and families welcome.',
    date: '2026-03-12T19:00:00',
    location: 'UID Toronto Headquarters',
  },
];

const MOCK_NEWS: MemberNews[] = [
  {
    id: 'n1',
    title: 'New Partnership with Toronto Arts Council',
    excerpt: 'UID Toronto is proud to announce a new cultural partnership for 2026.',
    date: '2026-07-01',
  },
  {
    id: 'n2',
    title: 'Executive Board Election Results',
    excerpt: 'Meet your newly elected executive board members for the 2026–2028 term.',
    date: '2026-06-20',
  },
  {
    id: 'n3',
    title: 'Scholarship Applications Now Open',
    excerpt: 'Applications for the 2026 UID Toronto Student Scholarship are now being accepted.',
    date: '2026-06-05',
  },
];

type Section = 'overview' | 'events' | 'news' | 'profile';

export default function Dashboard() {
  const { user } = useAuth();
  const [section, setSection] = useState<Section>('overview');

  // Smooth scroll to section when nav is used
  useEffect(() => {
    const el = document.getElementById(`section-${section}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [section]);

  if (!user) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
      <div className="ottoman-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />
      <DashboardNav active={section} onNavigate={s => setSection(s as Section)} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1140px', margin: '0 auto', padding: '120px 1.25rem 4rem' }}>
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--uid-teal)', fontWeight: 600, marginBottom: '0.5rem', fontFamily: "'DM Sans', sans-serif" }}>
            Member Dashboard
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 44px)', fontWeight: 400, color: 'var(--uid-navy)', margin: 0, lineHeight: 1.2 }}>
            <em>Hello, {user.first_name}</em>
          </h1>
        </motion.div>

        {/* Overview section */}
        <div id="section-overview" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}
          className="dashboard-grid-overview">
          <MembershipCard user={user} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <DiscountCode code={user.discount_code || 'UID-2026-XK7P'} />
            <Benefits />
          </div>
        </div>

        {/* Events + News */}
        <div id="section-events" style={{ marginBottom: '1.5rem' }}>
          <EventsList events={MOCK_EVENTS} />
        </div>

        <div id="section-news" style={{ marginBottom: '1.5rem' }}>
          <NewsList news={MOCK_NEWS} />
        </div>

        {/* Profile */}
        <div id="section-profile">
          <ProfilePanel />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .dashboard-grid-overview {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
