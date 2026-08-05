import React from 'react';
import { ArrowRight, Check, Cloud, ShieldCheck, Sparkles, Terminal, Activity, Lock } from 'lucide-react';

const DELIVERY_AREAS = [
  { icon: Sparkles, label: 'Product Engineering', detail: 'React, Next.js, Node.js' },
  { icon: Cloud, label: 'Cloud Platforms', detail: 'Firebase, AWS, GCP' },
  { icon: ShieldCheck, label: 'Secure Operations', detail: 'Zero-Trust, Role RBAC' },
];

export default function Hero({ settings }) {
  const heroCopy = {
    titleLine1: settings?.titleLine1 || 'Software built for',
    titleLine2: settings?.titleLine2 || 'teams that need',
    titleLine3: settings?.titleLine3 || 'speed, reliability,',
    titleLine4: settings?.titleLine4 || 'and room to grow.',
    description:
      settings?.description ||
      'VertexHand designs and delivers modern software systems, product platforms, and cloud workflows for companies that need dependable execution and a partner that can ship.',
    ctaPrimaryText: settings?.ctaPrimaryText || 'Start a Project',
    ctaSecondaryText: settings?.ctaSecondaryText || 'View Capabilities',
    stat1Value: settings?.stat1Value || '12+',
    stat1Label: settings?.stat1Label || 'Years of delivery',
    stat2Value: settings?.stat2Value || '99.9%',
    stat2Label: settings?.stat2Label || 'Platform uptime',
    stat3Value: settings?.stat3Value || '< 24h',
    stat3Label: settings?.stat3Label || 'Response SLA',
  };

  const stats = [
    { value: heroCopy.stat1Value, label: heroCopy.stat1Label },
    { value: heroCopy.stat2Value, label: heroCopy.stat2Label },
    { value: heroCopy.stat3Value, label: heroCopy.stat3Label },
  ];

  return (
    <section
      id="overview"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        color: 'var(--color-white)',
        paddingTop: 'calc(64px + 96px)',
        paddingBottom: '100px',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-grid">
          <div className="hero-copy reveal-on-scroll">
            <div className="hero-eyebrow">
              <Sparkles size={14} color="var(--color-secondary)" />
              <span>Full-Stack Engineering & Cloud Partner</span>
            </div>

            <h1 className="hero-title">
              {heroCopy.titleLine1} {heroCopy.titleLine2}{' '}
              <span>{heroCopy.titleLine3} {heroCopy.titleLine4}</span>
            </h1>

            <p className="hero-description">{heroCopy.description}</p>

            <div className="hero-actions">
              <a href="#contact" className="btn-primary">
                <span>{heroCopy.ctaPrimaryText}</span>
                <ArrowRight size={17} />
              </a>
              <a href="#capabilities" className="btn-outline">
                {heroCopy.ctaSecondaryText}
              </a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px', marginTop: '28px' }}>
              <span className="hero-assurance">
                <Check size={16} /> Senior engineering team
              </span>
              <span className="hero-assurance">
                <Check size={16} /> 100% Code ownership
              </span>
              <span className="hero-assurance">
                <Check size={16} /> Post-launch SLA support
              </span>
            </div>
          </div>

          <aside className="hero-panel reveal-on-scroll delay-1" aria-label="VertexHand delivery overview">
            <div className="hero-panel-heading">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={15} color="var(--color-primary-light)" />
                <span>Delivery Workspace</span>
              </div>
              <span className="hero-panel-status">
                <i /> Live System Status
              </span>
            </div>

            <div className="hero-panel-body">
              <p className="hero-panel-kicker">Core Capabilities</p>
              <h2>From early architecture to scalable production systems.</h2>
              
              <div className="hero-delivery-list">
                {DELIVERY_AREAS.map(({ icon: Icon, label, detail }) => (
                  <div key={label} className="hero-delivery-item">
                    <Icon size={18} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span>{label}</span>
                      <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
                        {detail}
                      </span>
                    </div>
                    <Check size={16} className="hero-delivery-check" />
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
