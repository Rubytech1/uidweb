import { useEffect, useRef, useState } from 'react';
import { Check, Users, Star } from 'lucide-react';
import { useLang } from '../context/LangContext';
import { RosetteWatermark } from './BackgroundDecor';

function PricingCard({
  plan,
  featured = false,
  visible,
  delay,
}: {
  plan: { name: string; price: string; period: string; cta: string; features: readonly string[]; badge?: string };
  featured?: boolean;
  visible: boolean;
  delay: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: '280px',
        maxWidth: '380px',
        background: featured ? 'linear-gradient(160deg, #0D4D7C 0%, #061E30 100%)' : '#fff',
        borderRadius: '28px',
        padding: '2.5rem',
        border: featured ? 'none' : '1px solid rgba(62,200,200,0.2)',
        position: 'relative',
        overflow: 'hidden',
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transition: `opacity 0.65s ease-out ${delay}, transform 0.65s ease-out ${delay}`,
        boxShadow: featured ? '0 32px 80px rgba(13,77,124,0.35)' : '0 8px 32px rgba(13,77,124,0.06)',
      }}
    >
      {featured && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: '28px', background: 'linear-gradient(90deg, transparent, rgba(62,200,200,0.12), transparent)', backgroundSize: '300% 100%', animation: 'borderTrace 4s linear infinite', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', padding: '1.5px', pointerEvents: 'none' }} />
      )}

      {/* Badge */}
      {plan.badge && (
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '5px 14px', borderRadius: '99px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', background: 'rgba(62,200,200,0.18)', color: 'var(--uid-teal)', border: '1px solid rgba(62,200,200,0.3)' }}>
            <Star size={10} fill="currentColor" /> {plan.badge}
          </span>
        </div>
      )}

      {/* Plan name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: featured ? 'rgba(62,200,200,0.18)' : 'rgba(62,200,200,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Users size={16} style={{ color: 'var(--uid-teal)' }} />
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: featured ? 'rgba(255,255,255,0.65)' : 'var(--text-soft)', margin: 0 }}>
          {plan.name}
        </p>
      </div>

      {/* Price */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '64px', fontWeight: 400, color: featured ? '#fff' : 'var(--uid-navy)', lineHeight: 1, letterSpacing: '-2px' }}>
            {plan.price}
          </span>
        </div>
        <p style={{ fontSize: '13px', fontWeight: 300, color: featured ? 'rgba(255,255,255,0.55)' : 'var(--text-soft)', margin: '4px 0 0' }}>
          {plan.period}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: featured ? 'rgba(255,255,255,0.1)' : 'rgba(62,200,200,0.2)', marginBottom: '1.5rem' }} />

      {/* Features */}
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {plan.features.map((f, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <div style={{ minWidth: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', flexShrink: 0 }}>
              <Check size={10} style={{ color: '#fff' }} />
            </div>
            <p style={{ fontSize: '14px', fontWeight: 300, color: featured ? 'rgba(255,255,255,0.8)' : 'var(--uid-dark)', margin: 0, lineHeight: 1.55 }}>{f}</p>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        className="shimmer-btn"
        style={{
          width: '100%', padding: '15px', borderRadius: '99px', fontSize: '14.5px', fontWeight: 500,
          background: featured
            ? 'linear-gradient(135deg, var(--uid-teal), var(--uid-mid))'
            : 'linear-gradient(135deg, var(--uid-navy), var(--uid-mid))',
          color: '#fff', border: 'none', cursor: 'pointer',
          fontFamily: "'DM Sans', sans-serif",
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = featured ? '0 14px 36px rgba(62,200,200,0.35)' : '0 14px 36px rgba(13,77,124,0.3)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
      >
        {plan.cta}
      </button>
    </div>
  );
}

export default function MembershipSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(true); }),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="uye" className="section-pad" style={{ padding: '7rem 2rem', background: 'var(--off-white)', position: 'relative', overflow: 'hidden' }}>
      <div className="ottoman-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45, pointerEvents: 'none' }} />
      <RosetteWatermark />

      {/* Floating particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="particle" style={{ width: `${3 + Math.random() * 4}px`, height: `${3 + Math.random() * 4}px`, left: `${Math.random() * 100}%`, '--dur': `${14 + Math.random() * 12}s`, '--dly': `${Math.random() * 8}s` } as React.CSSProperties} />
      ))}

      <div ref={sectionRef} style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--uid-teal)', fontWeight: 600, marginBottom: '0.75rem' }}>
            {t.membership.tag}
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(34px, 5vw, 52px)', fontWeight: 300, color: 'var(--uid-navy)', margin: '0 0 1rem' }}>
            <em>{t.membership.heading}</em>
          </h2>
          <p style={{ fontSize: '15.5px', color: 'var(--text-mid)', fontWeight: 300, maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            {t.membership.subtitle}
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
          <PricingCard plan={t.membership.monthly} visible={visible} delay="0s" />
          <PricingCard plan={t.membership.yearly} featured visible={visible} delay="0.12s" />
        </div>

        {/* Trust row */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem 2rem', marginTop: '2rem' }}>
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
