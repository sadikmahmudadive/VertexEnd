import React from 'react';
import { ArrowRight, BadgeCheck, Cloud, ShieldCheck, Sparkles } from 'lucide-react';

export default function Hero({ onOpenAuth, settings }) {
  const heroCopy = {
    titleLine1: settings?.titleLine1 || 'Software built for',
    titleLine2: settings?.titleLine2 || 'teams that need',
    titleLine3: settings?.titleLine3 || 'speed, reliability,',
    titleLine4: settings?.titleLine4 || 'and room to grow.',
    description:
      settings?.description ||
      'VertexEnd designs and delivers modern software systems, product platforms, and cloud workflows for companies that need dependable execution and a partner that can ship.',
    ctaPrimaryText: settings?.ctaPrimaryText || 'Start a Project',
    ctaSecondaryText: settings?.ctaSecondaryText || 'View Capabilities',
    stat1Value: settings?.stat1Value || '12+',
    stat1Label: settings?.stat1Label || 'Years of combined delivery across product and platform teams',
    stat2Value: settings?.stat2Value || '99.9%',
    stat2Label: settings?.stat2Label || 'Target uptime for systems we architect and support',
    stat3Value: settings?.stat3Value || '24h',
    stat3Label: settings?.stat3Label || 'Typical response window for new inquiries',
  };

  return (
    <section
      id="overview"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #0a1020 0%, #111b34 48%, #182848 100%)',
        color: 'var(--color-white)',
        paddingTop: 'calc(72px + 84px)',
        paddingBottom: '92px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '0',
          background:
            'radial-gradient(circle at 12% 18%, rgba(240, 90, 40, 0.22), transparent 32%), radial-gradient(circle at 82% 18%, rgba(83, 171, 252, 0.16), transparent 26%), radial-gradient(circle at 70% 82%, rgba(255,255,255,0.07), transparent 30%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.08fr 0.92fr',
            gap: '56px',
            alignItems: 'center',
          }}
        >
          <div className="reveal-on-scroll">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 12px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.82)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '22px',
              }}
            >
              <Sparkles size={14} />
              <span>Software Engineering Company</span>
            </div>

            <h1
              className="display-lg"
              style={{
                color: '#ffffff',
                maxWidth: '14ch',
                marginBottom: '22px',
                fontSize: 'clamp(48px, 6vw, 78px)',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
              }}
            >
              {heroCopy.titleLine1}
              <br />
              {heroCopy.titleLine2}
              <br />
              {heroCopy.titleLine3}
              <br />
              <span style={{ color: 'var(--color-primary)' }}>{heroCopy.titleLine4}</span>
            </h1>

            <p
              style={{
                maxWidth: '720px',
                color: 'rgba(255,255,255,0.82)',
                fontSize: '19px',
                lineHeight: '32px',
                marginBottom: '32px',
              }}
            >
              {heroCopy.description}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
              <a href="#contact" className="btn-primary">
                <ArrowRight size={15} />
                <span>{heroCopy.ctaPrimaryText}</span>
              </a>
              <a
                href="#capabilities"
                className="btn-secondary"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: '#ffffff',
                }}
              >
                <span>{heroCopy.ctaSecondaryText}</span>
              </a>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '12px',
                maxWidth: '760px',
              }}
            >
              {[
                { icon: <ShieldCheck size={16} />, label: 'Secure delivery' },
                { icon: <Cloud size={16} />, label: 'Cloud-native architecture' },
                { icon: <BadgeCheck size={16} />, label: 'Measured execution' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    fontSize: '14px',
                    lineHeight: '20px',
                  }}
                >
                  <span style={{ color: 'var(--color-primary)' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll delay-2" style={{ display: 'grid', gap: '18px' }}>
            {[
              { value: heroCopy.stat1Value, label: heroCopy.stat1Label },
              { value: heroCopy.stat2Value, label: heroCopy.stat2Label },
              { value: heroCopy.stat3Value, label: heroCopy.stat3Label },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(8, 13, 24, 0.68)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  padding: '26px 26px',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.22)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '18px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '52px',
                      fontWeight: 700,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: '#ffffff',
                      minWidth: '92px',
                    }}
                  >
                    {stat.value}
                  </span>
                  <p style={{ color: 'rgba(255,255,255,0.76)', fontSize: '15px', lineHeight: '24px' }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}

            <div
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '24px 26px',
              }}
            >
              <p
                style={{
                  color: 'rgba(255,255,255,0.62)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Core stack
              </p>
              <h2 style={{ color: '#ffffff', fontSize: '22px', lineHeight: '30px', marginBottom: '8px' }}>
                Product, platform, and cloud delivery
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', lineHeight: '22px' }}>
                Strategy, development, integrations, analytics, and support in one delivery model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
