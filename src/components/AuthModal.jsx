import React, { useState } from 'react';
import { X, Shield, AlertTriangle } from 'lucide-react';
import { loginWithGoogle } from '../firebase';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg('');

    try {
      const result = await loginWithGoogle();

      if (result.user && result.profile) {
        onAuthSuccess({ ...result.user, role: result.profile.role || 'developer' });
        onClose();
      } else {
        setErrorMsg(result.error || 'Google sign-in was cancelled.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected sign-in error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(7, 10, 18, 0.76)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="card-light"
        style={{
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          padding: '32px',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
            }}
          >
            <Shield size={24} color="#0a1020" />
          </div>
          <h3 className="heading-3" style={{ marginBottom: '8px' }}>
            Team access
          </h3>
          <p className="body-compact" style={{ color: 'var(--color-text-muted)' }}>
            Sign in with Google to access the internal content tools and role-based management
            features.
          </p>
        </div>

        <div
          style={{
            padding: '12px 14px',
            background: 'rgba(16, 28, 87, 0.05)',
            borderLeft: '3px solid var(--color-primary-dark)',
            marginBottom: '20px',
            fontSize: '12px',
            color: 'var(--color-text-muted)',
            lineHeight: '18px',
          }}
        >
          <strong>Access note:</strong> Roles are read from Firestore and can be updated by the
          site owner in the <code>users</code> collection.
        </div>

        {errorMsg && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 14px',
              background: 'rgba(240, 90, 40, 0.08)',
              border: '1px solid rgba(240, 90, 40, 0.28)',
              color: 'var(--color-primary-dark)',
              fontSize: '13px',
              lineHeight: '19px',
              marginBottom: '20px',
            }}
          >
            <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          id="google-signin-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn-primary"
          style={{ width: '100%', marginBottom: '14px', justifyContent: 'center', gap: '10px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>{loading ? 'Connecting…' : 'Continue with Google'}</span>
        </button>

        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0, lineHeight: '18px' }}>
          Internal users with the correct role can manage content, messages, and media assets.
        </p>
      </div>
    </div>
  );
}
