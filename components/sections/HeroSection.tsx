'use client'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <>
      <style>{`
        .hero-bg {
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(76,186,122,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(76,186,122,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 80% 60%, rgba(201,169,110,0.04) 0%, transparent 50%),
            #080c0a;
        }

        .hero-badge {
          opacity: 0;
          transform: translateY(12px);
          animation: heroFadeUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s forwards;
        }
        .hero-h1 {
          opacity: 0;
          transform: translateY(16px);
          animation: heroFadeUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s forwards;
        }
        .hero-sub {
          opacity: 0;
          transform: translateY(16px);
          animation: heroFadeUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.28s forwards;
        }
        .hero-ctas {
          opacity: 0;
          transform: translateY(16px);
          animation: heroFadeUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards;
        }
        .hero-trust {
          opacity: 0;
          animation: heroFadeUp 0.6s ease 0.55s forwards;
        }

        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(44px, 8vw, 96px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.0;
          color: #e8ede9;
          margin: 24px 0 0;
          text-wrap: balance;
        }

        .hero-title .accent { color: #4cba7a; }
        .hero-title .muted  { color: #5a7066; }

        .hero-sub-text {
          font-size: clamp(16px, 2.2vw, 20px);
          color: #8db8a0;
          font-weight: 300;
          line-height: 1.65;
          max-width: 520px;
          margin: 20px auto 0;
        }

        .hero-sub-text strong {
          color: #e8ede9;
          font-weight: 500;
        }

        .hero-cta-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 40px;
        }

        .hero-trust-bar {
          margin-top: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #3d5247;
          flex-wrap: wrap;
        }

        .hero-trust-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #3d5247;
          flex-shrink: 0;
        }

        .hero-scroll {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          animation: heroFadeUp 0.6s ease 1s forwards;
        }

        .hero-scroll-line {
          width: 1px;
          height: 32px;
          background: linear-gradient(to bottom, #4cba7a, transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }

        .hero-scroll-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #3d5247;
        }

        @media (max-width: 600px) {
          .hero-trust-bar  { gap: 6px 12px; }
          .hero-trust-dot  { display: none; }
          .hero-scroll     { display: none; }
        }
      `}</style>

      <section
        className="hero-bg"
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(120px, 15vw, 160px) 24px clamp(80px, 10vw, 120px)',
          overflow: 'hidden',
        }}
        aria-labelledby="hero-heading"
      >
        {/* Badge */}
        <div className="hero-badge">
          <Badge dot>
            Sistema de optimización humana · Argentina
          </Badge>
        </div>

        {/* Headline */}
        <h1 id="hero-heading" className="hero-h1 hero-title">
          Diseñado para{' '}
          <span className="accent">rendir más.</span>
          <br />
          <span className="muted">Por más tiempo.</span>
        </h1>

        {/* Subheadline — copy universal */}
        <div className="hero-sub">
          <p className="hero-sub-text">
            Para quienes no aceptan el desgaste como algo inevitable.{' '}
            <strong>6 packs de precisión. Un solo sistema.</strong>
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-ctas hero-cta-wrap">
          <Button size="lg" href="#packs">
            Explorar los packs
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
          <Button variant="secondary" size="lg" href="#diferencial">
            ¿Por qué NUVEN?
          </Button>
        </div>

        {/* Trust bar */}
        <div className="hero-trust">
          <div className="hero-trust-bar">
            <span>Garantía 30 días</span>
            <span className="hero-trust-dot" />
            <span>Envío gratis a todo el país</span>
            <span className="hero-trust-dot" />
            <span>ANMAT compatible</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll" aria-hidden="true">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-label">scroll</span>
        </div>
      </section>
    </>
  )
}