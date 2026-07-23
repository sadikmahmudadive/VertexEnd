import React from 'react';
import { Terminal, Globe, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Solutions: ['Product engineering', 'Cloud architecture', 'Internal tools', 'Mobile apps'],
  Company: ['About VertexEnd', 'Capabilities', 'Process', 'Contact'],
  Support: ['hello@vertexend.dev', '+1 (800) 287-8336', 'Remote-first team', 'Privacy policy'],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface-alt)', color: 'var(--color-white)' }}>
      <div className="container" style={{ paddingTop: '72px', paddingBottom: '32px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 1fr 1fr 1fr',
            gap: '32px',
          }}
        >
          <div>
            <a href="#overview" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '18px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Terminal size={18} color="#0a1020" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
                VertexEnd
              </span>
            </a>

            <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', lineHeight: '23px', maxWidth: '320px', marginBottom: '22px' }}>
              We design and ship software systems for companies that want stronger products,
              cleaner operations, and a technical partner who can keep up.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              {[Globe, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: '38px',
                    height: '38px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.72)',
                    textDecoration: 'none',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.46)',
                  marginBottom: '16px',
                }}
              >
                {heading}
              </h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {links.map((link) => (
                  <a
                    key={link}
                    href={link.includes('@') || link.includes('+1') ? '#' : `#${link === 'About VertexEnd' ? 'overview' : link === 'Capabilities' ? 'capabilities' : link === 'Process' ? 'process' : link === 'Contact' ? 'contact' : 'overview'}`}
                    style={{
                      color: 'rgba(255,255,255,0.76)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      lineHeight: '22px',
                    }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div
          className="container"
          style={{
            paddingTop: '18px',
            paddingBottom: '22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.52)' }}>
            © {new Date().getFullYear()} VertexEnd. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms', 'Accessibility'].map((item) => (
              <a key={item} href="#" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.50)', textDecoration: 'none' }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
