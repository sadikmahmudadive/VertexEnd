import React, { useState } from 'react';
import { LogIn, LogOut, Menu, Settings, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'How we work' },
  { href: '#work', label: 'Our work' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ user, onOpenAuth, onLogout, onOpenAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = user?.role === 'admin';

  const closeAndRun = (action) => {
    setMobileOpen(false);
    action();
  };

  return (
    <header className="site-header">
      <div className="container navbar-shell">
        <a href="#overview" className="brand" aria-label="VertexEnd home">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span className="brand-name">VertexEnd</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          {isAdmin && (
            <button type="button" onClick={onOpenAdmin} className="nav-tool-button">
              <Settings size={16} /> Content Studio
            </button>
          )}

          {user ? (
            <button type="button" onClick={onLogout} className="nav-signin" title="Sign out">
              <LogOut size={16} /> Sign out
            </button>
          ) : (
            <button type="button" onClick={onOpenAuth} className="nav-signin">
              <LogIn size={16} /> Team sign in
            </button>
          )}

          <a href="#contact" className="navbar-cta">Start a project</a>

          <button
            type="button"
            className="nav-icon-button"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav">
          <div className="container mobile-nav-inner">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            {isAdmin && (
              <button type="button" onClick={() => closeAndRun(onOpenAdmin)}>Open content studio</button>
            )}
            {!user && <button type="button" onClick={() => closeAndRun(onOpenAuth)}>Team sign in</button>}
            <a href="#contact" className="mobile-nav-cta" onClick={() => setMobileOpen(false)}>Start a project</a>
          </div>
        </div>
      )}
    </header>
  );
}
