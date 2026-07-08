import { useLang } from '../context/LangContext';
import { CityAndIslamicSkyline, OttomanCorners, FloatingRosettes } from './BackgroundDecor';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.round(3 + Math.random() * 7),
  left: Math.round(Math.random() * 100),
  dur: (10 + Math.random() * 18).toFixed(1),
  dly: (Math.random() * 12).toFixed(1),
}));

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(165deg, #F0F9FF 0%, #EAF5F5 35%, #F7FAFC 65%, #FFFFFF 100%)',
        paddingTop: '76px',
      }}
    >
      {/* Ottoman star grid */}
      <div className="ottoman-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

      {/* Teal orb */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,200,200,0.16), transparent 70%)',
        animation: 'floatOrb 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      {/* Navy orb */}
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(13,77,124,0.08), transparent 70%)',
        animation: 'floatOrb 10s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />

      {/* Ottoman arches */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '520px', height: '320px', borderRadius: '0 0 260px 260px', border: '1.5px solid rgba(62,200,200,0.13)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '680px', height: '380px', borderRadius: '0 0 340px 340px', border: '1.5px solid rgba(13,77,124,0.06)', pointerEvents: 'none' }} />

      <CityAndIslamicSkyline />
      <OttomanCorners />
      <FloatingRosettes />

      {/* Stars */}
      <div style={{ position: 'absolute', top: '15%', left: '8%', fontSize: '28px', color: 'rgba(62,200,200,0.09)', animation: 'spin40 40s linear infinite', pointerEvents: 'none' }}>✦</div>
      <div style={{ position: 'absolute', bottom: '18%', right: '7%', fontSize: '22px', color: 'rgba(13,77,124,0.07)', animation: 'spin70 60s linear infinite', pointerEvents: 'none' }}>✦</div>

      {/* Particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size, height: p.size,
            left: `${p.left}%`,
            '--dur': `${p.dur}s`,
            '--dly': `${p.dly}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 1.5rem', maxWidth: '900px' }}>
        {/* Eyebrow badge */}
        <div
          className="fade-up"
          style={{
            animationDelay: '0.1s',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(62,200,200,0.1)', border: '1px solid rgba(62,200,200,0.28)',
            borderRadius: '30px', padding: '6px 16px',
            fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--uid-navy)', marginBottom: '1.75rem',
          }}
        >
          <span className="pulse-dot" />
          {t.hero.badge}
        </div>

        {/* H1 */}
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(54px, 8.5vw, 100px)',
            fontWeight: 300,
            lineHeight: 1.04,
            letterSpacing: '-1.5px',
            marginBottom: '1.5rem',
          }}
        >
          <div className="fade-up" style={{ animationDelay: '0.25s' }}>
            <span style={{ color: 'var(--uid-dark)' }}>{t.hero.line1a} </span>
            <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--uid-navy)' }}>{t.hero.line1b}</em>
          </div>
          <div className="fade-up" style={{ animationDelay: '0.4s' }}>
            <span style={{ color: 'var(--uid-dark)' }}>{t.hero.line2a} </span>
            <span style={{ fontWeight: 500, color: 'var(--uid-teal)' }}>{t.hero.line2b}</span>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up"
          style={{
            animationDelay: '0.55s',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '17px', fontWeight: 300, color: 'var(--text-mid)',
            lineHeight: 1.85, maxWidth: '580px', margin: '0 auto 2.5rem',
          }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="fade-up hero-ctas" style={{ animationDelay: '0.7s', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="shimmer-btn"
            onClick={() => document.getElementById('uye')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '15px 40px', borderRadius: '32px', fontSize: '15px', fontWeight: 500,
              background: 'linear-gradient(135deg, #0D4D7C, #1A6A9A)', color: '#fff',
              border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(13,77,124,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            {t.hero.ctaPrimary}
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '15px 40px', borderRadius: '32px', fontSize: '15px', fontWeight: 400,
              background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(13,77,124,0.22)',
              color: 'var(--uid-navy)', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              transition: 'border-color 0.3s, color 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--uid-teal)'; e.currentTarget.style.color = 'var(--uid-teal)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(13,77,124,0.22)'; e.currentTarget.style.color = 'var(--uid-navy)'; e.currentTarget.style.transform = ''; }}
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      }}>
        <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text-soft)' }}>SCROLL</span>
        <div style={{ width: '1.5px', height: '54px', background: 'rgba(62,200,200,0.2)', borderRadius: '99px', position: 'relative', overflow: 'hidden' }}>
          <div className="scroll-thumb" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '16px', background: 'var(--uid-teal)', borderRadius: '99px' }} />
        </div>
      </div>
    </section>
  );
}
