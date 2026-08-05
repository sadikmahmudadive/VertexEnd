import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const FRAME_DIR = '/scroll%20animation/';

// Pre-build all frame paths with proper URI encoding
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, '0');
  return `${FRAME_DIR}ezgif-frame-${n}.jpg`;
});

export default function ScrollAnimation() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);           // cache of loaded Image objects
  const currentFrameRef = useRef(0);      // actual displayed frame index
  const targetFrameRef = useRef(0);       // scroll-driven target frame
  const rafRef = useRef(null);
  const lastDrawnFrameRef = useRef(-1);

  // ─── Find nearest loaded frame if current isn't ready ─────────────────────
  const getNearestLoadedImage = useCallback((targetIndex) => {
    const images = imagesRef.current;
    if (images[targetIndex] && images[targetIndex].complete && images[targetIndex].naturalWidth > 0) {
      return images[targetIndex];
    }
    // Search backward first
    for (let i = targetIndex - 1; i >= 0; i--) {
      if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
        return images[i];
      }
    }
    // Search forward if backward didn't find any
    for (let i = targetIndex + 1; i < TOTAL_FRAMES; i++) {
      if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
        return images[i];
      }
    }
    return null;
  }, []);

  // ─── Draw a specific frame to canvas ───────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const img = getNearestLoadedImage(clampedIndex);
    if (!img) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    if (!width || !height) return;

    // Cover-fit the image (like object-fit: cover)
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const offsetX = (width - drawW) / 2;
    const offsetY = (height - drawH) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    lastDrawnFrameRef.current = clampedIndex;
  }, [getNearestLoadedImage]);

  // ─── Smooth interpolation loop ─────────────────────────────────────────────
  const animLoop = useCallback(() => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;

    if (Math.abs(current - target) > 0.25) {
      // Ease toward target (lerp factor 0.14 = fluid and immediate)
      const next = current + (target - current) * 0.14;
      currentFrameRef.current = next;
      drawFrame(next);
    } else if (Math.round(current) !== Math.round(target)) {
      currentFrameRef.current = target;
      drawFrame(target);
    }

    rafRef.current = requestAnimationFrame(animLoop);
  }, [drawFrame]);

  // ─── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      const viewportH = window.innerHeight || 1;

      // Progress: 0 at top, 1 at bottom of page
      const maxScroll = Math.max(1, docHeight - viewportH);
      const rawProgress = Math.max(0, Math.min(1, scrollY / maxScroll));

      targetFrameRef.current = rawProgress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    // Set up a MutationObserver to watch for content size changes
    const observer = new MutationObserver(handleScroll);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      observer.disconnect();
    };
  }, []);

  // ─── Canvas resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // ─── Pre-load all frames ───────────────────────────────────────────────────
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);
    rafRef.current = requestAnimationFrame(animLoop);

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = FRAME_PATHS[0];
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Load remaining frames aggressively in concurrent batches
    const batchSize = 15;
    let batchIndex = 1;

    const loadBatch = () => {
      const end = Math.min(batchIndex + batchSize, TOTAL_FRAMES);
      for (let i = batchIndex; i < end; i++) {
        const img = new Image();
        img.src = FRAME_PATHS[i];
        const idx = i;
        img.onload = () => {
          imagesRef.current[idx] = img;
          if (Math.abs(currentFrameRef.current - idx) < 2) {
            drawFrame(currentFrameRef.current);
          }
        };
      }
      batchIndex = end;
      if (batchIndex < TOTAL_FRAMES) {
        setTimeout(loadBatch, 30);
      }
    };
    setTimeout(loadBatch, 60);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animLoop, drawFrame]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        background: '#060b14',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
      {/* Lightened, subtle frosted vignette so 3D background animation is clearly visible while text is crisp */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 35%, rgba(6, 11, 20, 0.12) 0%, rgba(6, 11, 20, 0.35) 75%), linear-gradient(180deg, rgba(6, 11, 20, 0.25) 0%, rgba(6, 11, 20, 0.15) 50%, rgba(6, 11, 20, 0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

