import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { RosetteWatermark } from './BackgroundDecor';

export default function MembershipSection() {
  const { t } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(true); }),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="uye" className="section-pad" style={{ padding: '7rem 2rem', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
      <div className="ottoman-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="particle" style={{ width: `${4 + Math.random() * 5}px`, height: `${4 + Math.random() * 5}px`, left: `${Math.random() * 100}%`, '--dur': `${14 + Math.random() * 12}s`, '--dly': `${Math.random() * 8}s` } as React.CSSProperties} />
      ))}

      <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--uid-teal)', fontWeight: 600, marginBottom: '0.75rem' }}>
            {t.membership.tag}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 300, color: 'var(--uid-navy)', margin: 0 }}>
            <em>{t.membership.heading}</em>
          </h2>
        </div>

        <div
          ref={cardRef}
          style={{
            background: '#fff', borderRadius: '28px', padding: '2.5rem',
            border: '1px solid rgba(62,200,200,0.2)',
            animation: visible ? 'memberGlow 3s ease-in-out infinite' : 'none',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <RosetteWatermark />
          <div style={{ position: 'absolute', inset: 0, borderRadius: '28px', background: 'linear-gradient(90deg, transparent, rgba(62,200,200,0.15), var(--uid-teal), rgba(62,200,200,0.15), transparent)', backgroundSize: '300% 100%', animation: visible ? 'borderTrace 4s linear infinite' : 'none', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1.5px', pointerEvents: 'none' }} />

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ display: 'inline-block', padding: '5px 18px', borderRadius: '99px', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', background: 'linear-gradient(135deg, rgba(62,200,200,0.15), rgba(26,106,154,0.15))', color: 'var(--uid-teal)', border: '1px solid rgba(62,200,200,0.3)' }}>✦ Community Access</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '42px', fontWeight: 300, color: 'var(--uid-navy)', margin: '0 0 0.5rem', lineHeight: 1 }}>
              {t.membership.plan}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '6px', margin: '0.5rem 0 0.25rem' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '72px', fontWeight: 300, color: 'var(--uid-navy)', lineHeight: 1, letterSpacing: '-2px' }}>$19.99</span>
              <span style={{ fontSize: '15px', color: 'var(--text-soft)', fontWeight: 300 }}>/month</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--uid-teal)', display: 'inline-block' }} />
              {t.membership.cancel}
            </p>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(62,200,200,0.3), transparent)', margin: '1.75rem 0' }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {t.membership.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ minWidth: '20px', height: '20px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
                  <Check size={11} style={{ color: '#fff' }} />
                </div>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--uid-dark)', margin: 0, lineHeight: 1.5 }}>{f}</p>
              </li>
            ))}
          </ul>

          <button
            className="shimmer-btn"
            style={{ width: '100%', padding: '16px', borderRadius: '99px', fontSize: '15px', fontWeight: 500, background: 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid), var(--uid-navy))', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,77,124,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            {t.membership.cta}
          </button>

          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem 1.5rem' }}>
            {[t.membership.trust1, t.membership.trust2, t.membership.trust3].map(trust => (
              <span key={trust} style={{ fontSize: '11px', color: 'var(--text-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: 'var(--uid-teal)', fontSize: '9px' }}>✦</span> {trust}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
