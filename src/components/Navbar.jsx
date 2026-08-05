import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, Menu, Settings, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'How We Work' },
  { href: '#work', label: 'Our Work' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ user, onOpenAuth, onLogout, onOpenAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      const sections = ['capabilities', 'process', 'work', 'faq', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            current = `#${id}`;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAndRun = (action) => {
    setMobileOpen(false);
    action();
  };

  return (
    <>
      {/* Top Scroll Reading Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="site-header">
        <div className="container">
          <div className="navbar-shell">
            <a href="#overview" className="brand" aria-label="VertexHand home">
              <span className="brand-mark" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="brand-name">VertexHand</span>
            </a>

            <nav className="desktop-nav" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link${activeSection === link.href ? ' active' : ''}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="navbar-actions">
              <div className="nav-status-pill" title="Engineering availability status">
                <span className="pulse-dot" />
                <span>Available for Q3/Q4</span>
              </div>

              {isAdmin && (
                <button type="button" onClick={onOpenAdmin} className="nav-tool-button">
                  <Settings size={15} /> Content Studio
                </button>
              )}

              {user ? (
                <button type="button" onClick={onLogout} className="nav-signin" title="Sign out">
                  <LogOut size={15} /> Sign out
                </button>
              ) : (
                <button type="button" onClick={onOpenAuth} className="nav-signin">
                  <LogIn size={15} /> Team sign in
                </button>
              )}

              <a href="#contact" className="navbar-cta">
                <span>Start a project</span>
              </a>

              <button
                type="button"
                className="nav-icon-button"
                onClick={() => setMobileOpen((current) => !current)}
                aria-label="Toggle navigation"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-nav">
            <div className="mobile-nav-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-secondary)' }}>MENU</span>
                <span className="nav-status-pill" style={{ padding: '3px 8px', fontSize: '11px' }}>
                  <span className="pulse-dot" /> Live
                </span>
              </div>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: activeSection === link.href ? '#60a5fa' : '#ffffff' }}
                >
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <button type="button" onClick={() => closeAndRun(onOpenAdmin)}>
                  Open content studio
                </button>
              )}
              {!user && (
                <button type="button" onClick={() => closeAndRun(onOpenAuth)}>
                  Team sign in
                </button>
              )}
              <a href="#contact" className="mobile-nav-cta" onClick={() => setMobileOpen(false)}>
                Start a project
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
