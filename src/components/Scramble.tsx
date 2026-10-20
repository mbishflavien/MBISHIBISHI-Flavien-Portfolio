import { useEffect, useRef } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=?/<>';

// Hovering any [data-scramble] element scrambles its text for a moment, then restores it.
export function useHoverScramble(deps: unknown[]) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scramble]'));
    const offs = els.map((el) => {
      let raf = 0;
      const enter = () => {
        // Keep the real text while a scramble runs, so a second hover cannot capture the noise.
        const text = el.dataset.text ?? el.textContent ?? '';
        el.dataset.text = text;
        const start = performance.now();
        cancelAnimationFrame(raf);
        const tick = (now: number) => {
          const p = Math.min((now - start) / 420, 1);
          const settled = Math.floor(p * text.length);
          let out = '';
          for (let i = 0; i < text.length; i++) out += i < settled || text[i] === ' ' ? text[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
          el.textContent = out;
          if (p < 1) raf = requestAnimationFrame(tick);
          else { el.textContent = text; delete el.dataset.text; }
        };
        raf = requestAnimationFrame(tick);
      };
      el.addEventListener('pointerenter', enter);
      return () => { el.removeEventListener('pointerenter', enter); cancelAnimationFrame(raf); };
    });
    return () => offs.forEach((off) => off());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Text that resolves from random glyphs, on mount, when it changes, and again every so often.
export function Scramble({ text, className, every = 7000 }: { text: string; className?: string; every?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = text;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const duration = 700 + text.length * 40;
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const settled = Math.floor(p * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          out += i < settled || c === ' ' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    run();
    const timer = window.setInterval(run, every);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
    };
  }, [text, every]);

  return <span ref={ref} className={className} aria-label={text}>{text}</span>;
}
