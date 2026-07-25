import React from 'react';
import { ArrowRight, Check, Cloud, Code2, ShieldCheck } from 'lucide-react';

const DELIVERY_AREAS = [
  { icon: Code2, label: 'Product engineering' },
  { icon: Cloud, label: 'Cloud platforms' },
  { icon: ShieldCheck, label: 'Secure operations' },
];

export default function Hero({ settings }) {
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
    stat1Label: settings?.stat1Label || 'Years of combined delivery',
    stat2Value: settings?.stat2Value || '99.9%',
    stat2Label: settings?.stat2Label || 'Target platform uptime',
    stat3Value: settings?.stat3Value || '24h',
    stat3Label: settings?.stat3Label || 'Typical response window',
  };

  const stats = [
    { value: heroCopy.stat1Value, label: heroCopy.stat1Label },
    { value: heroCopy.stat2Value, label: heroCopy.stat2Label },
    { value: heroCopy.stat3Value, label: heroCopy.stat3Label },
  ];

  return (
    <section id="overview" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy reveal-on-scroll">
          <span className="hero-eyebrow">Independent software engineering company</span>
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

          <p className="hero-assurance">
            <Check size={16} /> Clear scope, senior delivery, and support after launch.
          </p>
        </div>

        <aside className="hero-panel reveal-on-scroll delay-1" aria-label="VertexEnd delivery overview">
          <div className="hero-panel-heading">
            <span>One team, end to end</span>
            <span className="hero-panel-status"><i /> Available for new work</span>
          </div>

          <div className="hero-panel-body">
            <p className="hero-panel-kicker">What we deliver</p>
            <h2>From early product decisions to dependable production systems.</h2>
            <div className="hero-delivery-list">
              {DELIVERY_AREAS.map(({ icon: Icon, label }) => (
                <div key={label} className="hero-delivery-item">
                  <Icon size={19} />
                  <span>{label}</span>
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
    </section>
  );
}
