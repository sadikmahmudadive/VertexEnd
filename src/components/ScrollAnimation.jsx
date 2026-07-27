import React, { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const FRAME_DIR = '/scroll animation/';

// Pre-build all frame paths
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, '0');
  return `${FRAME_DIR}ezgif-frame-${n}.jpg`;
});

export default function ScrollAnimation() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);           // cache of loaded Image objects
  const currentFrameRef = useRef(0);      // actual displayed frame index
  const targetFrameRef = useRef(0);       // scroll-driven target frame
  const rafRef = useRef(null);
  const loadedCountRef = useRef(0);

  // ─── Draw a specific frame to canvas ───────────────────────────────────────
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Cover-fit the image (like object-fit: cover)
    const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const offsetX = (width - drawW) / 2;
    const offsetY = (height - drawH) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // ─── Smooth interpolation loop ─────────────────────────────────────────────
  const animLoop = useCallback(() => {
    const current = currentFrameRef.current;
    const target = targetFrameRef.current;

    if (Math.abs(current - target) > 0.3) {
      // Ease toward target (lerp factor 0.12 = smooth but responsive)
      const next = current + (target - current) * 0.12;
      currentFrameRef.current = next;
      drawFrame(Math.round(next));
    } else if (Math.round(current) !== Math.round(target)) {
      currentFrameRef.current = target;
      drawFrame(Math.round(target));
    }

    rafRef.current = requestAnimationFrame(animLoop);
  }, [drawFrame]);

  // ─── Scroll handler ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportH = window.innerHeight;

      // Progress: 0 at top, 1 at bottom of page
      const maxScroll = docHeight - viewportH;
      const rawProgress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;

      targetFrameRef.current = rawProgress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also update on resize as docHeight might change
    window.addEventListener('resize', handleScroll);
    handleScroll(); // run on mount
    
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
      drawFrame(Math.round(currentFrameRef.current));
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // ─── Pre-load all frames ───────────────────────────────────────────────────
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);
    rafRef.current = requestAnimationFrame(animLoop);

    // Load first frame immediately so canvas isn't blank
    const firstImg = new Image();
    firstImg.src = FRAME_PATHS[0];
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      drawFrame(0);
    };

    // Load remaining frames in batches to avoid blocking
    const batchSize = 10;
    let batchIndex = 1;

    const loadBatch = () => {
      const end = Math.min(batchIndex + batchSize, TOTAL_FRAMES);
      for (let i = batchIndex; i < end; i++) {
        const img = new Image();
        img.src = FRAME_PATHS[i];
        const idx = i;
        img.onload = () => {
          imagesRef.current[idx] = img;
          loadedCountRef.current++;
        };
      }
      batchIndex = end;
      if (batchIndex < TOTAL_FRAMES) {
        setTimeout(loadBatch, 40);
      }
    };
    setTimeout(loadBatch, 80);

    return () => {
      cancelAnimationFrame(rafRef.current);
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
        zIndex: -10, // Keep it behind all content
        background: '#060b14', // Default dark background to match the theme
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
    </div>
  );
}
