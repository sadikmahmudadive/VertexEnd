import React, { useState } from 'react';
import { Video, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'c1',
    title: 'Client Portal Modernization',
    category: 'Platform',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    description:
      'A legacy customer portal was redesigned with a cleaner interface, faster workflows, and a Firebase-backed admin layer.',
    outcome: 'Reduced support requests and improved task completion across internal teams.',
    tags: ['React', 'Firebase', 'Workflow Design'],
  },
  {
    id: 'c2',
    title: 'Operations Dashboard',
    category: 'Data',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    description:
      'A unified operations dashboard combined reporting, status monitoring, and content control into one internal workspace.',
    outcome: 'Gave leadership better visibility into live system health and delivery progress.',
    tags: ['Dashboards', 'Analytics', 'Firestore'],
  },
  {
    id: 'c3',
    title: 'Media Delivery Pipeline',
    category: 'Media',
    type: 'video',
    mediaUrl: 'https://res.cloudinary.com/demo/video/upload/v1688647000/sea_shell.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    description:
      'A Cloudinary workflow for uploading, organizing, and presenting product media without slowing down the main app.',
    outcome: 'Simplified asset management and kept the public site responsive under heavier media loads.',
    tags: ['Cloudinary', 'Uploads', 'Optimization'],
  },
  {
    id: 'c4',
    title: 'Field Service Mobile App',
    category: 'Mobile',
    type: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9d?auto=format&fit=crop&w=1200&q=80',
    description:
      'A mobile-first experience for teams working on the move, with a focus on speed, clarity, and reliable sync.',
    outcome: 'Helped field staff capture updates faster with fewer handoff delays.',
    tags: ['Mobile UX', 'Offline-first', 'Sync'],
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
            item.description || 'A managed asset from the internal content workflow.',
          outcome: item.outcome || 'Delivered through the VertexEnd content pipeline.',
          tags: item.tags || ['Cloudinary', 'Firestore'],
        }))
      : INITIAL_PROJECTS;

  const filtered =
    activeCategory === 'All' ? allProjects : allProjects.filter((project) => project.category === activeCategory);

  return (
    <section id="work" className="section" style={{ background: 'transparent' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal-on-scroll section-header" style={{ marginBottom: '28px' }}>
          <span className="overline">Selected work</span>
          <h2 className="heading-2" style={{ maxWidth: '720px' }}>
            A snapshot of the kinds of systems and experiences we build.
          </h2>
          <p className="section-lead" style={{ maxWidth: '720px' }}>
            These examples highlight delivery across customer portals, internal tools, data views,
            and media workflows. Uploaded assets from the content studio appear here as well.
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
              <div className="project-media" style={{ position: 'relative', height: '210px', background: 'var(--color-surface-alt)' }}>
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
                    padding: '5px 10px',
                    background: 'rgba(10, 16, 28, 0.88)',
                    color: project.type === 'video' ? 'var(--color-secondary-light)' : '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.type === 'video' ? <Video size={11} /> : <ImageIcon size={11} />}
                  {project.type}
                </div>
              </div>

              <div className="project-content" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-primary-dark)',
                      }}
                    >
                      {project.category}
                    </span>
                    <h3 className="heading-3" style={{ marginTop: '6px', marginBottom: 0 }}>
                      {project.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="project-arrow" size={18} color="var(--color-text-muted)" />
                </div>

                <p className="body-compact" style={{ color: 'var(--color-text-muted)' }}>
                  {project.description}
                </p>

                <div
                  className="project-outcome"
                  style={{
                    padding: '14px 16px',
                    background: 'var(--color-bg-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '6px',
                    }}
                  >
                    Outcome
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-text)', fontSize: '14px', lineHeight: '22px' }}>
                    {project.outcome}
                  </p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
                  {project.tags.map((tag, i) => (
                    <span
                      className="project-tag"
                      key={i}
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '5px 10px',
                        background: '#f7f9fb',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-muted)',
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
