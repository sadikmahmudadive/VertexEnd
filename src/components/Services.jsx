import React from 'react';
import { Cpu, Smartphone, ShieldCheck, Globe, Code, Layers, Workflow, Code2 } from 'lucide-react';

const ICON_MAP = {
  Strategy: <Workflow size={22} color="var(--color-primary)" />,
  Platform: <Globe size={22} color="var(--color-primary)" />,
  Product: <Code size={22} color="var(--color-primary)" />,
  Mobile: <Smartphone size={22} color="var(--color-primary)" />,
  Security: <ShieldCheck size={22} color="var(--color-primary)" />,
  Data: <Layers size={22} color="var(--color-primary)" />,
  API: <Code2 size={22} color="var(--color-primary)" />,
};

const DEFAULT_SERVICES = [
  {
    title: 'Product Engineering',
    description:
      'We build polished web apps, internal tools, and customer-facing products with a focus on speed, maintainability, and measurable outcomes.',
    tag: 'Product',
  },
  {
    title: 'Cloud Architecture',
    description:
      'Modern cloud foundations, Firebase-backed workflows, and deployment patterns that keep platforms dependable as demand grows.',
    tag: 'Platform',
  },
  {
    title: 'API and Integration Work',
    description:
      'Reliable API layers, third-party integrations, and automation flows that connect your product to the rest of your business.',
    tag: 'API',
  },
  {
    title: 'Mobile Experiences',
    description:
      'Responsive mobile applications and field tools designed for operational teams that need quick, focused workflows.',
    tag: 'Mobile',
  },
  {
    title: 'Security and Access',
    description:
      'Authentication, role controls, and secure admin patterns that protect internal operations without creating friction for your team.',
    tag: 'Security',
  },
  {
    title: 'Data and Operations',
    description:
      'Dashboards, content operations, and back-office systems that help teams move faster with better visibility.',
    tag: 'Data',
  },
];

export default function Services({ servicesList }) {
  const displayServices = servicesList && servicesList.length > 0 ? servicesList : DEFAULT_SERVICES;

  return (
    <section id="capabilities" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal-on-scroll section-header">
          <span className="overline">Capabilities</span>
          <h2 className="heading-2" style={{ maxWidth: '720px' }}>
            A delivery team for software products, cloud platforms, and internal systems.
          </h2>
          <p className="section-lead" style={{ maxWidth: '720px' }}>
            We help teams turn unfinished ideas, slow processes, and fragmented tooling into
            dependable systems that are easier to use, easier to run, and easier to scale.
          </p>
        </div>

        <div className="three-column-grid">
          {displayServices.map((srv, idx) => {
            const icon = ICON_MAP[srv.tag] || <Cpu size={22} color="var(--color-primary)" />;

            return (
              <article key={idx} className="card-light service-card reveal-on-scroll">
                <div
                  className="service-card-header"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '16px',
                    marginBottom: '18px',
                  }}
                >
                  <div>
                    <span className="badge-coral" style={{ marginBottom: '14px' }}>
                      {srv.tag}
                    </span>
                    <h3 className="heading-3" style={{ marginBottom: '10px' }}>
                      {srv.title}
                    </h3>
                  </div>
                  <div
                    className="service-icon"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: 'rgba(37, 99, 235, 0.08)',
                      border: '1px solid rgba(37, 99, 235, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                </div>

                <p className="body-compact" style={{ color: 'var(--color-text-muted)' }}>
                  {srv.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
