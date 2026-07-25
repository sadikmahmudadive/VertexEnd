import React from 'react';

const TRUST_POINTS = [
  { label: 'Product strategy', value: 'Discovery to delivery' },
  { label: 'Cloud and backend', value: 'Reliable architecture' },
  { label: 'Internal systems', value: 'Tools your team can run' },
  { label: 'Support model', value: 'Ongoing improvement' },
];

export default function TrustBar() {
  return (
    <section className="trust-section" aria-label="Delivery strengths">
      <div className="container">
        <div className="trust-grid">
          {TRUST_POINTS.map((point) => (
            <div key={point.label} className="trust-item">
              <span>{point.label}</span>
              <strong>{point.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
