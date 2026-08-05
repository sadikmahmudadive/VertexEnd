import React, { useState } from 'react';
import { Video, Image as ImageIcon, ArrowUpRight, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'c1',
    title: 'Enterprise Client Portal & RBAC',
    category: 'Platform',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    description:
      'A legacy customer portal re-engineered into a sub-second Next.js portal with role-based access, automated invoicing, and live telemetry.',
    outcome: '84% drop in customer support tickets & 4.2x faster page loads.',
    metric: '84% Efficiency Gain',
    tags: ['React 19', 'Next.js', 'Firebase', 'Stripe'],
  },
  {
    id: 'c2',
    title: 'Real-Time Telemetry & Operations Grid',
    category: 'Data',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    description:
      'Unified executive dashboard integrating multi-region server health, streaming telemetry, and team activity logs into a single glass pane.',
    outcome: 'Real-time alerting reduced incident mean-time-to-resolution (MTTR) by 62%.',
    metric: '62% Faster MTTR',
    tags: ['Dashboards', 'BigQuery', 'Firestore', 'WebSockets'],
  },
  {
    id: 'c3',
    title: 'Edge Media Optimization Pipeline',
    category: 'Media',
    type: 'video',
    mediaUrl: 'https://res.cloudinary.com/demo/video/upload/v1688647000/sea_shell.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description:
      'Cloudinary and WebP/AVIF transformation pipeline supporting high-resolution multi-tenant digital asset delivery under heavy concurrent traffic.',
    outcome: 'Zero packet loss during peak product drops and 70% CDN egress cost savings.',
    metric: '70% Egress Savings',
    tags: ['Cloudinary', 'Edge CDN', 'WebP/AVIF', 'Node.js'],
  },
  {
    id: 'c4',
    title: 'Field Service Offline-First Application',
    category: 'Mobile',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Cross-platform mobile application for field engineers with local SQLite caching, background bi-directional sync, and biometric authentication.',
    outcome: '100% data reliability in zero-connectivity environments across 500+ daily technicians.',
    metric: '100% Sync Accuracy',
    tags: ['React Native', 'SQLite', 'Offline Sync', 'Biometrics'],
  },
];

const CATEGORIES = ['All', 'Platform', 'Data', 'Mobile', 'Media', 'Uploaded Asset'];

export default function Portfolio({ customMediaList }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const allProjects =
    customMediaList && customMediaList.length > 0
      ? customMediaList.map((item) => ({
          id: item.id || item.publicId || String(Math.random()),
          title: item.title || 'Client Deliverable',
          category: item.category || 'Uploaded Asset',
          type: item.mediaType === 'video' ? 'video' : 'image',
          mediaUrl: item.url || item.mediaUrl,
          posterUrl: item.posterUrl,
          description:
            item.description || 'A managed asset engineered and delivered through VertexHand.',
          outcome: item.outcome || 'Production deliverable with verifiable performance gain.',
          metric: item.metric || 'Enterprise Grade',
          tags: item.tags || ['Cloudinary', 'Firestore', 'React'],
        }))
      : INITIAL_PROJECTS;

  const filtered =
    activeCategory === 'All' ? allProjects : allProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal-on-scroll section-header" style={{ marginBottom: '28px' }}>
          <span className="overline">Selected Work</span>
          <h2 className="heading-2" style={{ maxWidth: '780px' }}>
            Production systems built for scale, performance, and operational excellence.
          </h2>
          <p className="section-lead" style={{ maxWidth: '740px' }}>
            Explore verified case studies spanning high-throughput web applications, real-time analytics dashboards, and mission-critical cloud pipelines.
          </p>
        </div>

        <div className="tab-bar reveal-on-scroll delay-1" style={{ marginBottom: '32px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`tab-item${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filtered.map((project, idx) => (
            <article
              key={project.id}
              className="card-light project-card reveal-on-scroll"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transitionDelay: `${(idx % 4) * 80}ms`,
              }}
            >
              <div className="project-media" style={{ position: 'relative', height: '220px', background: 'var(--color-surface-alt)' }}>
                {project.type === 'video' ? (
                  <video
                    src={project.mediaUrl}
                    poster={project.posterUrl}
                    muted
                    loop
                    controls
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={project.mediaUrl}
                    alt={project.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}

                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    background: 'rgba(10, 16, 28, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '999px',
                    color: project.type === 'video' ? 'var(--color-secondary-light)' : '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.type === 'video' ? <Video size={12} /> : <ImageIcon size={12} />}
                  {project.type}
                </div>

                {project.metric && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      background: 'rgba(16, 185, 129, 0.9)',
                      color: '#ffffff',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      borderRadius: '6px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                    }}
                  >
                    {project.metric}
                  </div>
                )}
              </div>

              <div className="project-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--color-secondary)',
                      }}
                    >
                      {project.category}
                    </span>
                    <h3 style={{ marginTop: '4px', marginBottom: 0, color: '#ffffff', fontSize: '18.5px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                      {project.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="project-arrow" size={18} color="var(--color-secondary)" />
                </div>

                <p style={{ margin: '0 0 16px', color: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', lineHeight: '22px' }}>
                  {project.description}
                </p>

                <div
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(6, 11, 20, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      letterSpacing: '0.09em',
                      textTransform: 'uppercase',
                      color: '#6ee7b7',
                      marginBottom: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <CheckCircle size={12} color="#10b981" />
                    Verified Business Outcome
                  </div>
                  <p style={{ margin: 0, color: '#ffffff', fontSize: '13px', lineHeight: '19px', fontWeight: 500 }}>
                    {project.outcome}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        padding: '3px 8px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.09)',
                        color: 'rgba(255, 255, 255, 0.82)',
                        borderRadius: '6px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
