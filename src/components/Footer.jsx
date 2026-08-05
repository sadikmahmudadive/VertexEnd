import React from 'react';
import { Terminal, Globe, Mail, ArrowUp, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'Core Capabilities',
    links: [
      { label: 'Product Engineering', href: '#capabilities' },
      { label: 'Cloud & Infrastructure', href: '#capabilities' },
      { label: 'API & Microservices', href: '#capabilities' },
      { label: 'Mobile Engineering', href: '#capabilities' },
      { label: 'Security & Compliance', href: '#capabilities' },
    ],
  },
  {
    title: 'Company & Process',
    links: [
      { label: 'System Overview', href: '#overview' },
      { label: 'Engagement Model', href: '#process' },
      { label: 'Selected Case Studies', href: '#work' },
      { label: 'Enterprise FAQ', href: '#faq' },
      { label: 'Book Scope Session', href: '#contact' },
    ],
  },
  {
    title: 'Connect & Inquiries',
    links: [
      { label: 'hello@vertexhand.dev', href: 'mailto:hello@vertexhand.dev' },
      { label: '+1 (800) 287-8336', href: 'tel:+18002878336' },
      { label: 'Global Engineering Hub', href: '#contact' },
      { label: 'Developer Portal', href: '#overview' },
    ],
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'rgba(4, 7, 13, 0.85)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--color-white)' }}>
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '32px', position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          <div>
            <a href="#overview" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '16px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
                }}
              >
                <Terminal size={17} color="#ffffff" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
                Vertex<span style={{ color: 'var(--color-secondary)' }}>Hand</span>
              </span>
            </a>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '13.5px', lineHeight: '22px', maxWidth: '320px', marginBottom: '20px' }}>
              Premier software engineering and cloud systems delivery. We partner with ambitious tech teams and high-growth enterprises worldwide.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                marginBottom: '20px',
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }}></span>
              <span style={{ fontSize: '11.5px', color: '#6ee7b7', fontWeight: 600 }}>All Systems Operational (99.99% SLA)</span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: Globe, href: '#' },
                { icon: Mail, href: 'mailto:hello@vertexhand.dev' },
                { icon: Code2, href: '#' },
                { icon: ShieldCheck, href: '#' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.09)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      transition: 'all var(--transition)',
                    }}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '16px',
                }}
              >
                {section.title}
              </h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {section.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      color: 'rgba(255, 255, 255, 0.72)',
                      textDecoration: 'none',
                      fontSize: '13.5px',
                      lineHeight: '20px',
                      transition: 'color var(--transition)',
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div
          className="container"
          style={{
            paddingTop: '18px',
            paddingBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.45)' }}>
            © {new Date().getFullYear()} VertexHand Systems LLC. All rights reserved. Built with precision.
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Security Policy'].map((item) => (
              <a key={item} href="#" style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)', textDecoration: 'none' }}>
                {item}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '5px 12px',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all var(--transition)',
              }}
            >
              <ArrowUp size={13} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
