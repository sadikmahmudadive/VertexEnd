import React, { useState } from 'react';
import { Terminal, LogIn, LogOut, UploadCloud, Menu, X, ShieldCheck, Briefcase } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onLogout, onOpenUploader, onOpenAdmin }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#overview', label: 'Overview' },
    { href: '#capabilities', label: 'Capabilities' },
    { href: '#work', label: 'Work' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(10, 16, 28, 0.92)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container" style={{ width: '100%', maxWidth: '1200px' }}>
          <div
            style={{
              height: '72px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <a
              href="#overview"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Terminal color="#0a1020" size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--color-white)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  VertexEnd
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.58)',
                    fontSize: '12px',
                    lineHeight: 1.2,
                    marginTop: '2px',
                  }}
                >
                  Software engineering partner
                </div>
              </div>
            </a>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} aria-label="Main navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isAdmin && (
                <>
                  <button
                    onClick={onOpenAdmin}
                    className="btn-secondary"
                    style={{
                      minHeight: '40px',
                      padding: '9px 14px',
                      fontSize: '13px',
                      gap: '8px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    <ShieldCheck size={15} />
                    <span>Content Studio</span>
                  </button>
                  <button
                    onClick={onOpenUploader}
                    className="btn-primary"
                    style={{ minHeight: '40px', padding: '9px 14px', fontSize: '13px', minWidth: 'auto', gap: '8px' }}
                  >
                    <UploadCloud size={15} />
                    <span>Upload Asset</span>
                  </button>
                </>
              )}

              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-primary)',
                      padding: '5px 8px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: isAdmin ? 'rgba(240, 90, 40, 0.18)' : 'rgba(83, 171, 252, 0.15)',
                      color: isAdmin ? '#ffb38f' : 'var(--color-sky-blue)',
                      border: `1px solid ${isAdmin ? 'rgba(240, 90, 40, 0.28)' : 'rgba(83, 171, 252, 0.25)'}`,
                    }}
                  >
                    {isAdmin ? 'Admin' : 'Team'}
                  </span>
                  <button
                    onClick={onLogout}
                    className="btn-secondary"
                    style={{
                      minHeight: '40px',
                      padding: '9px 14px',
                      fontSize: '13px',
                      gap: '8px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.14)',
                      color: 'var(--color-white)',
                    }}
                    title="Sign out"
                  >
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="btn-primary"
                  style={{ minHeight: '40px', padding: '9px 16px', fontSize: '13px', minWidth: 'auto', gap: '8px' }}
                >
                  <LogIn size={15} />
                  <span>Team Login</span>
                </button>
              )}

              <button
                id="mobile-menu-btn"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="nav-icon-button"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(7, 10, 18, 0.96)',
            padding: '96px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: 'var(--color-white)',
                textDecoration: 'none',
                fontSize: '22px',
                fontWeight: 500,
                fontFamily: 'var(--font-primary)',
                padding: '18px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {link.label}
            </a>
          ))}

          {!user && (
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAuth();
              }}
              className="btn-primary"
              style={{ marginTop: '28px', width: '100%' }}
            >
              <LogIn size={15} />
              <span>Team Login</span>
            </button>
          )}

          {isAdmin && (
            <div style={{ display: 'grid', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAdmin();
                }}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
              >
                <Briefcase size={15} />
                <span>Content Studio</span>
              </button>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenUploader();
                }}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', gap: '8px' }}
              >
                <UploadCloud size={15} />
                <span>Upload Asset</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
