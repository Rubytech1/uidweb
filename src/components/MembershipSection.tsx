import { useEffect, useRef, useState } from 'react';
import { Check, Users } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { RosetteWatermark } from './BackgroundDecor';

export default function MembershipSection() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(true); }),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const plan = yearly ? t.membership.yearly : t.membership.monthly;
  const savingsLabel = lang === 'TR' ? '2 ay ücretsiz' : '2 months free';

  return (
    <section id="uye" className="section-pad" style={{ padding: '7rem 2rem', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
      <div className="ottoman-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }} />
      <RosetteWatermark />

      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="particle" style={{ width: `${3 + Math.random() * 4}px`, height: `${3 + Math.random() * 4}px`, left: `${Math.random() * 100}%`, '--dur': `${14 + Math.random() * 12}s`, '--dly': `${Math.random() * 8}s` } as React.CSSProperties} />
      ))}

      <div ref={sectionRef} style={{ maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--uid-teal)', fontWeight: 600, marginBottom: '0.75rem' }}>
            {t.membership.tag}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 300, color: 'var(--uid-navy)', margin: '0 0 1rem' }}>
            <em>{t.membership.heading}</em>
          </h2>
          <p style={{ fontSize: '15.5px', color: 'var(--text-mid)', fontWeight: 300, maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            {t.membership.subtitle}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '13.5px', fontWeight: yearly ? 300 : 600, color: yearly ? 'var(--text-soft)' : 'var(--uid-navy)', transition: 'all 0.3s' }}>
            {lang === 'TR' ? 'Aylık' : 'Monthly'}
          </span>
          <button
            onClick={() => setYearly(v => !v)}
            style={{
              width: '52px', height: '28px', borderRadius: '99px', border: 'none', cursor: 'pointer', position: 'relative', padding: 0,
              background: yearly ? 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid))' : 'rgba(13,77,124,0.15)',
              transition: 'background 0.35s',
            }}
          >
            <span style={{
              position: 'absolute', top: '4px', left: yearly ? '28px' : '4px',
              width: '20px', height: '20px', borderRadius: '50%', background: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
              transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </button>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: yearly ? 600 : 300, color: yearly ? 'var(--uid-navy)' : 'var(--text-soft)', transition: 'all 0.3s' }}>
              {lang === 'TR' ? 'Yıllık' : 'Yearly'}
            </span>
            <span style={{ fontSize: '10px', fontWeight: 600, background: 'rgba(62,200,200,0.14)', color: 'var(--uid-teal)', border: '1px solid rgba(62,200,200,0.3)', borderRadius: '99px', padding: '2px 8px', letterSpacing: '0.3px', opacity: yearly ? 1 : 0, transition: 'opacity 0.3s' }}>
              {savingsLabel}
            </span>
          </span>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'linear-gradient(160deg, #0D4D7C 0%, #061E30 100%)',
            borderRadius: '28px',
            padding: '2.75rem',
            position: 'relative',
            overflow: 'hidden',
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.65s ease-out, transform 0.65s ease-out',
            boxShadow: '0 32px 80px rgba(13,77,124,0.35)',
          }}
        >
          {/* Animated border */}
          <div style={{ position: 'absolute', inset: 0, borderRadius: '28px', background: 'linear-gradient(90deg, transparent, rgba(62,200,200,0.12), transparent)', backgroundSize: '300% 100%', animation: 'borderTrace 4s linear infinite', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1.5px', pointerEvents: 'none' }} />

          {/* Plan name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(62,200,200,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={16} style={{ color: 'var(--uid-teal)' }} />
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', margin: 0, transition: 'all 0.3s' }}>
              {plan.name}
            </p>
          </div>

          {/* Price */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '72px', fontWeight: 400, color: '#fff', lineHeight: 1, letterSpacing: '-2px', transition: 'all 0.3s' }}>
                {plan.price}
              </span>
            </div>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'rgba(255,255,255,0.55)', margin: '4px 0 0', transition: 'all 0.3s' }}>
              {plan.period}
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '1.5rem' }} />

          {/* Features */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {plan.features.map((f, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', flexShrink: 0 }}>
                  <Check size={10} style={{ color: '#fff' }} />
                </div>
                <p style={{ fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.55 }}>{f}</p>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="shimmer-btn"
            style={{
              width: '100%', padding: '16px', borderRadius: '99px', fontSize: '15px', fontWeight: 500,
              background: 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid))',
              color: '#fff', border: 'none', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 36px rgba(62,200,200,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            {plan.cta}
          </button>
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem 2rem', marginTop: '1.75rem' }}>
          {[t.membership.trust1, t.membership.trust2, t.membership.trust3].map(trust => (
            <span key={trust} style={{ fontSize: '12px', color: 'var(--text-soft)', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ color: 'var(--uid-teal)', fontSize: '10px' }}>✦</span> {trust}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
