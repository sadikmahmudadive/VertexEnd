import React from 'react';
import { Search, PenTool, ShipWheel, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    icon: <Search size={20} />,
    title: 'Discover',
    description:
      'We map the business goal, user flow, technical constraints, and what success needs to look like before writing code.',
  },
  {
    icon: <PenTool size={20} />,
    title: 'Design and build',
    description:
      'We shape the product experience, engineer the stack, and keep the implementation organized for future changes.',
  },
  {
    icon: <ShipWheel size={20} />,
    title: 'Launch and improve',
    description:
      'We support rollout, stabilize performance, and keep the system evolving once the first version reaches users.',
  },
];

export default function Process() {
  return (
    <section id="process" className="section section-muted">
      <div className="container">
        <div className="reveal-on-scroll section-header">
          <span className="overline">Delivery process</span>
          <h2 className="heading-2" style={{ maxWidth: '700px' }}>
            A straightforward engagement model that keeps work moving and expectations clear.
          </h2>
          <p className="section-lead" style={{ maxWidth: '700px' }}>
            The goal is not just to build something that works. It is to build something your
            team can actually operate, understand, and extend.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '20px',
          }}
        >
          {STEPS.map((step, index) => (
            <div key={step.title} className="card-light reveal-on-scroll" style={{ padding: '28px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  background: 'rgba(240, 90, 40, 0.10)',
                  border: '1px solid rgba(240, 90, 40, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  marginBottom: '18px',
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '8px',
                }}
              >
                Step {index + 1}
              </div>
              <h3 className="heading-3" style={{ marginBottom: '10px' }}>
                {step.title}
              </h3>
              <p className="body-compact" style={{ color: 'var(--color-text-muted)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="reveal-on-scroll"
          style={{
            marginTop: '24px',
            padding: '22px 24px',
            background: 'rgba(16, 28, 87, 0.08)',
            border: '1px solid rgba(16, 28, 87, 0.14)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <CheckCircle2 size={18} color="var(--color-primary)" />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: '22px', margin: 0 }}>
            Typical engagements include discovery workshops, build sprints, internal tooling, and
            ongoing support after launch.
          </p>
        </div>
      </div>
    </section>
  );
}
