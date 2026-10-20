import { useEffect, useRef } from 'react';

const COLOURS = ['#36e1ff', '#2f6bff', '#7a5cff', '#c9f7ff', '#4fa3ff'];

// Hyperspace lines streaming out of the centre. `speedRef` lets the page push it faster while scrolling.
export function Starburst({ speedRef }: { speedRef: React.MutableRefObject<number> }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = false;

    const N = 520;
    const stars = Array.from({ length: N }, () => ({
      a: Math.random() * Math.PI * 2,
      d: Math.random(),
      v: 0.2 + Math.random() * 0.8,
      c: COLOURS[(Math.random() * COLOURS.length) | 0],
      wd: 0.6 + Math.random() * 1.6,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      raf = 0;
      const cx = w / 2, cy = h / 2, R = Math.hypot(cx, cy);
      const speed = reduced ? 0 : 0.0025 + speedRef.current * 0.02;
      speedRef.current *= 0.92;
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = 'round';
      for (const s of stars) {
        s.d += speed * s.v * (0.4 + s.d);
        if (s.d > 1.05) { s.d = 0.02 + Math.random() * 0.1; s.a = Math.random() * Math.PI * 2; }
        const r0 = s.d * R, len = (0.04 + s.d * 0.25) * R * (0.6 + speedRef.current * 2);
        const cos = Math.cos(s.a), sin = Math.sin(s.a);
        ctx.strokeStyle = s.c;
        ctx.globalAlpha = Math.min(1, s.d * 2.2);
        ctx.lineWidth = s.wd * (0.5 + s.d * 1.5);
        ctx.beginPath();
        ctx.moveTo(cx + cos * r0, cy + sin * r0);
        ctx.lineTo(cx + cos * (r0 + len), cy + sin * (r0 + len));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [speedRef]);

  return <canvas ref={ref} className="starburst" aria-hidden="true" />;
}
