import React, { useState } from 'react';
import { Compass, Code2, ShieldAlert, Rocket, CheckCircle2, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: Compass,
    phase: '01',
    title: 'Discovery & System Blueprint',
    duration: 'Week 1',
    description:
      'We deconstruct your requirements into technical specifications, user journey maps, cloud data models, and an unambiguous delivery timeline.',
    deliverables: ['System Architecture Spec', 'Clickable Prototype', 'Sprint Roadmap'],
  },
  {
    icon: Code2,
    phase: '02',
    title: 'Agile Sprint Execution',
    duration: 'Weeks 2-4',
    description:
      'Bi-weekly staging releases, transparent Slack/Linear progress, and continuous integration so you test functional software early and often.',
    deliverables: ['Live Staging Environments', 'Weekly Demo Recordings', 'Clean Git Repos'],
  },
  {
    icon: ShieldAlert,
    phase: '03',
    title: 'Hardening & Performance Audit',
    duration: 'Pre-Launch',
    description:
      'Rigorous automated regression testing, database indexing, Core Web Vitals optimization, and zero-trust security audits prior to cutover.',
    deliverables: ['Lighthouse 95+ Score', 'Security Audit Report', 'Load Test Verification'],
  },
  {
    icon: Rocket,
    phase: '04',
    title: 'Zero-Downtime Launch & SLA',
    duration: 'Production',
    description:
      'DNS transition, real-time APM telemetry monitoring, automated database backups, and direct senior engineer support on call.',
    deliverables: ['Zero-Downtime Cutover', 'Monitoring Dashboards', '24/7 Priority SLA'],
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal-on-scroll section-header">
          <span className="overline">Engagement Model</span>
          <h2 className="heading-2" style={{ maxWidth: '780px' }}>
            A predictable, transparent delivery engine from day one to production scale.
          </h2>
          <p className="section-lead" style={{ maxWidth: '740px' }}>
            No black boxes or handoff friction. You get weekly tangible builds, clear milestones, and direct communication with the senior engineers writing your code.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '22px' }}>
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isSelected = activeStep === index;

            return (
              <div
                key={step.title}
                className="card-light process-card reveal-on-scroll"
                onClick={() => setActiveStep(index)}
                style={{
                  cursor: 'pointer',
                  borderColor: isSelected ? 'rgba(59, 130, 246, 0.45)' : undefined,
                  background: isSelected ? 'rgba(18, 30, 56, 0.85)' : undefined,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <div
                    className="process-icon"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(59, 130, 246, 0.12)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#60a5fa',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-secondary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {step.duration}
                    </span>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'rgba(255, 255, 255, 0.2)', fontFamily: 'var(--font-mono)' }}>
                      {step.phase}
                    </span>
                  </div>
                </div>

                <h3 className="heading-3" style={{ marginBottom: '12px', color: '#ffffff', fontSize: '17px' }}>
                  {step.title}
                </h3>

                <p className="body-compact" style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px' }}>
                  {step.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', marginTop: 'auto' }}>
                  <span style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-secondary-light)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Key Deliverables
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {step.deliverables.map((d) => (
                      <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                        <CheckCircle2 size={13} color="#10b981" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="reveal-on-scroll card-accent"
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <CheckCircle2 size={22} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ display: 'block', color: '#ffffff', fontSize: '15px', marginBottom: '3px' }}>
                Guaranteed Senior Engineering Team on Every Project
              </strong>
              <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '13.5px', margin: 0 }}>
                Every engagement is staffed by senior systems engineers with 8+ years experience. No junior bait-and-switch.
              </p>
            </div>
          </div>
          <a href="#contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13.5px' }}>
            <span>Book Scope Consultation</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
