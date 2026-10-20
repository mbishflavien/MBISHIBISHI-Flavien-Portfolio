import React, { useEffect, useRef } from 'react';

const CELL = 16;   // dot size in CSS pixels
const BAND = 0.35; // width of the growing edge, as a share of the image's diagonal

/*
 * An image shown as a blue duotone. Hovering grows a wave of square dots out from the point
 * where the pointer entered, revealing the full-colour image; leaving shrinks it back.
 */
export function DotReveal({ src, alt = '', className }: { src: string; alt?: string; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current!, cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const img = new Image();
    img.src = src;
    let w = 0, h = 0, dpr = 1, raf = 0;
    let p = 0, target = 0, ox = 0.5, oy = 0.5;
    let cover = { sx: 0, sy: 0, sw: 1, sh: 1 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layout = () => {
      const r = el.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      // object-fit: cover, mapped into source pixels
      const iw = img.naturalWidth || 1, ih = img.naturalHeight || 1;
      const scale = Math.max(w / iw, h / ih);
      const sw = w / scale, sh = h / scale;
      cover = { sx: (iw - sw) / 2, sy: (ih - sh) / 2, sw, sh };
      draw();
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (p <= 0.001 || !img.complete) return;
      if (p >= 0.999) { ctx.drawImage(img, cover.sx, cover.sy, cover.sw, cover.sh, 0, 0, w, h); return; }
      const diag = Math.hypot(w, h);
      const front = p * (1 + BAND);
      const kx = cover.sw / w, ky = cover.sh / h;
      const cols = Math.ceil(w / CELL), rows = Math.ceil(h / CELL);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const cx = (i + 0.5) * CELL, cy = (j + 0.5) * CELL;
          const d = Math.hypot(cx - ox * w, cy - oy * h) / diag;
          let g = (front - d) / BAND;
          if (g <= 0) continue;
          g = g >= 1 ? 1 : g * g * (3 - 2 * g);
          const s = CELL * g + 0.6;
          const x = cx - s / 2, y = cy - s / 2;
          ctx.drawImage(img, cover.sx + x * kx, cover.sy + y * ky, s * kx, s * ky, x, y, s, s);
        }
      }
    };

    const tick = () => {
      raf = 0;
      const speed = target > p ? 0.045 : 0.06;
      p += Math.sign(target - p) * Math.min(Math.abs(target - p), speed);
      draw();
      if (p !== target) raf = requestAnimationFrame(tick);
    };
    const go = (to: number, e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ox = (e.clientX - r.left) / r.width;
      oy = (e.clientY - r.top) / r.height;
      target = to;
      if (reduced) { p = to; draw(); return; }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const enter = (e: PointerEvent) => go(1, e);
    const leave = (e: PointerEvent) => go(0, e);

    img.onload = layout;
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    // Keyboard focus on the tile reveals it from the centre.
    const parent = el.closest('button, a');
    const focus = () => { ox = 0.5; oy = 0.5; target = 1; if (!raf) raf = requestAnimationFrame(tick); };
    const blur = () => { target = 0; if (!raf) raf = requestAnimationFrame(tick); };
    parent?.addEventListener('focus', focus);
    parent?.addEventListener('blur', blur);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      parent?.removeEventListener('focus', focus);
      parent?.removeEventListener('blur', blur);
    };
  }, [src]);

  return (
    <div ref={wrap} className={`dots ${className ?? ''}`}>
      <img src={src} alt={alt} loading="lazy" className="dots__base" />
      <canvas ref={canvas} className="dots__reveal" aria-hidden="true" />
    </div>
  );
}
