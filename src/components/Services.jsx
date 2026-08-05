import React, { useState } from 'react';
import { Cpu, Smartphone, ShieldCheck, Globe, Code, Layers, Workflow, Code2, CheckCircle2, ArrowUpRight } from 'lucide-react';

const ICON_MAP = {
  Strategy: <Workflow size={22} color="#60a5fa" />,
  Platform: <Globe size={22} color="#60a5fa" />,
  Product: <Code size={22} color="#60a5fa" />,
  Mobile: <Smartphone size={22} color="#60a5fa" />,
  Security: <ShieldCheck size={22} color="#60a5fa" />,
  Data: <Layers size={22} color="#60a5fa" />,
  API: <Code2 size={22} color="#60a5fa" />,
};

const DEFAULT_SERVICES = [
  {
    title: 'Product Engineering',
    description:
      'We build polished web applications, customer-facing portals, and SaaS platforms engineered for high throughput, sub-second latency, and rapid feature velocity.',
    tag: 'Product',
    tech: ['React 19', 'Next.js', 'TypeScript', 'Tailwind/CSS'],
    highlight: 'Sub-second interaction latency',
  },
  {
    title: 'Cloud Architecture & Scale',
    description:
      'Modern cloud foundations, Firebase/AWS serverless infrastructure, and automated CI/CD pipelines that scale dynamically with your customer demand.',
    tag: 'Platform',
    tech: ['Firebase', 'AWS Lambda', 'GCP', 'Docker/K8s'],
    highlight: 'Auto-scaling & 99.99% SLA',
  },
  {
    title: 'API & Integration Ecosystems',
    description:
      'Resilient REST & GraphQL gateways, webhook orchestration, Stripe billing integrations, and enterprise CRM/ERP synchronization pipelines.',
    tag: 'API',
    tech: ['Node.js', 'GraphQL', 'Stripe API', 'Webhooks'],
    highlight: 'Idempotent, zero data loss',
  },
  {
    title: 'Cross-Platform Mobile',
    description:
      'High-performance iOS and Android applications with offline-first state synchronization, hardware integration, and native fluid animations.',
    tag: 'Mobile',
    tech: ['React Native', 'Expo', 'iOS & Android', 'SQLite'],
    highlight: '60 FPS fluid native feel',
  },
  {
    title: 'Enterprise Security & RBAC',
    description:
      'Role-based access control (RBAC), multi-tenant auth isolation, JWT/OAuth2 flows, and encryption standards designed for SOC-2 and HIPAA readiness.',
    tag: 'Security',
    tech: ['OAuth2', 'JWT', 'Zero-Trust', 'Audit Logs'],
    highlight: 'SOC-2 compliant patterns',
  },
  {
    title: 'Data Ops & Analytics',
    description:
      'Real-time administrative dashboards, content studio engines, telemetry tracking, and telemetry infrastructure giving leaders actionable operational clarity.',
    tag: 'Data',
    tech: ['PostgreSQL', 'Firestore', 'BigQuery', 'Recharts'],
    highlight: 'Real-time telemetry & metrics',
  },
];

export default function Services({ servicesList }) {
  const displayServices = servicesList && servicesList.length > 0 ? servicesList : DEFAULT_SERVICES;
  const [activeCard, setActiveCard] = useState(null);

  return (
    <section id="capabilities" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal-on-scroll section-header">
          <span className="overline">Core Capabilities</span>
          <h2 className="heading-2" style={{ maxWidth: '780px' }}>
            Full-lifecycle engineering for product teams and modern enterprises.
          </h2>
          <p className="section-lead" style={{ maxWidth: '720px' }}>
            We transform complex business requirements into fast, dependable, and maintainable software systems that scale seamlessly without technical debt.
          </p>
        </div>

        <div className="three-column-grid">
          {displayServices.map((srv, idx) => {
            const icon = ICON_MAP[srv.tag] || <Cpu size={22} color="#60a5fa" />;
            const isHovered = activeCard === idx;

            return (
              <article
                key={idx}
                className="card-light service-card reveal-on-scroll"
                onMouseEnter={() => setActiveCard(idx)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '16px',
                      marginBottom: '18px',
                    }}
                  >
                    <span className="badge-yellow">
                      {srv.tag}
                    </span>
                    <div
                      className="service-icon"
                      style={{
                        width: '42px',
                        height: '42px',
                        background: 'rgba(59, 130, 246, 0.12)',
                        border: '1px solid rgba(59, 130, 246, 0.28)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                  </div>

                  <h3 className="heading-3" style={{ marginBottom: '12px', color: '#ffffff' }}>
                    {srv.title}
                  </h3>

                  <p className="body-compact" style={{ color: 'rgba(255, 255, 255, 0.82)', marginBottom: '22px' }}>
                    {srv.description}
                  </p>
                </div>

                <div>
                  {srv.tech && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                      {srv.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: '11px',
                            fontFamily: 'var(--font-mono)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {srv.highlight && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        paddingTop: '12px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#6ee7b7',
                        fontSize: '12px',
                        fontWeight: 600,
                      }}
                    >
                      <CheckCircle2 size={14} color="#10b981" />
                      <span>{srv.highlight}</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
