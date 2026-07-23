import React, { useState } from 'react';
import { X, UploadCloud, Image as ImageIcon, Film, CheckCircle } from 'lucide-react';
import { openCloudinaryWidget } from '../cloudinary';

export default function MediaUploader({ isOpen, onClose, onUploadComplete }) {
  const [lastUploaded, setLastUploaded] = useState(null);

  if (!isOpen) return null;

  const handleLaunchCloudinary = () => {
    openCloudinaryWidget((mediaData) => {
      setLastUploaded(mediaData);
      if (onUploadComplete) onUploadComplete(mediaData);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(7, 10, 18, 0.74)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div className="card-light" style={{ width: '100%', maxWidth: '520px', position: 'relative', padding: '32px' }}>
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
              width: '46px',
              height: '46px',
              background: 'rgba(240, 90, 40, 0.12)',
              border: '1px solid rgba(240, 90, 40, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: 'var(--color-primary)',
            }}
          >
            <UploadCloud size={22} />
          </div>
          <h3 className="heading-3" style={{ marginBottom: '8px' }}>
            Content library upload
          </h3>
          <p className="body-compact" style={{ color: 'var(--color-text-muted)' }}>
            Upload approved images or videos to Cloudinary for use in the work showcase and other
            internal content areas.
          </p>
        </div>

        <button
          id="cloudinary-upload-trigger"
          onClick={handleLaunchCloudinary}
          className="upload-dropzone"
          style={{ width: '100%', marginBottom: '18px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '12px' }}>
            <ImageIcon size={22} color="var(--color-primary)" />
            <Film size={22} color="var(--color-primary-dark)" />
          </div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>
            Open Cloudinary upload widget
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            PNG, JPG, WEBP, MP4, MOV, WEBM up to 25 MB
          </p>
        </button>

        {lastUploaded && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px 16px',
              background: 'rgba(240, 90, 40, 0.08)',
              border: '1px solid rgba(240, 90, 40, 0.20)',
              marginBottom: '18px',
            }}
          >
            <CheckCircle size={18} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '1px' }} />
            <div style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '19px' }}>
              <strong>Upload complete.</strong>
              <div style={{ color: 'var(--color-text-muted)', marginTop: '2px', wordBreak: 'break-all', fontSize: '12px' }}>
                Type: {lastUploaded.mediaType} · ID: {lastUploaded.publicId}
              </div>
            </div>
          </div>
        )}

        <button onClick={onClose} className="btn-secondary" style={{ width: '100%' }}>
          Close uploader
        </button>
      </div>
    </div>
  );
}
