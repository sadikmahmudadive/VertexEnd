import React from 'react';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';

const TRUST_POINTS = [
  {
    icon: Award,
    label: 'Engineering Standard',
    value: 'Senior-Only Delivery',
    sub: 'No junior handoffs or overhead',
  },
  {
    icon: Database,
    label: 'Cloud & Infrastructure',
    value: '99.99% SLA Architecture',
    sub: 'Multi-region failover & auto-scaling',
  },
  {
    icon: ShieldCheck,
    label: 'Compliance & Security',
    value: 'SOC 2 & Zero-Trust Ready',
    sub: 'Encrypted at rest & in transit',
  },
  {
    icon: Cpu,
    label: 'Code Ownership',
    value: '100% IP & Zero Lock-In',
    sub: 'Your repo, your infrastructure',
  },
];

export default function TrustBar() {
  return (
    <section className="trust-section" aria-label="Enterprise Delivery Standards">
      <div className="container">
        <div className="trust-grid">
          {TRUST_POINTS.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.label} className="trust-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <Icon size={16} color="var(--color-secondary)" />
                  <span>{point.label}</span>
                </div>
                <strong>{point.value}</strong>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11.5px', textTransform: 'none', letterSpacing: 'normal', fontWeight: 400, marginTop: '2px' }}>
                  {point.sub}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
