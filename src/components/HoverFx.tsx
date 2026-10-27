import { useEffect, useRef } from 'react';

// Site-wide pointer play, all by delegation so new elements join in for free:
// - a ring that trails the pointer, grows over anything clickable and shows its [data-cursor] label
// - [data-magnetic] elements lean toward the pointer
// - [data-tilt] elements tilt in 3D and carry a glare (CSS reads --rx, --ry, --gx, --gy)
export function HoverFx() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    document.documentElement.classList.add('has-fx');

    let x = -100, y = -100, rx = x, ry = y, raf = 0;
    let magnet: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const release = (el: HTMLElement | null, props: string[]) => {
      if (!el) return;
      props.forEach((p) => el.style.removeProperty(p));
      el.classList.remove('is-tilting');
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as Element | null;
      const hit = t?.closest<HTMLElement>('a, button, [data-cursor], canvas');
      ring.classList.toggle('is-hot', !!hit);
      const text = hit?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? (hit?.tagName === 'CANVAS' ? '✦' : '');
      if (label.textContent !== text) label.textContent = text;
      ring.classList.toggle('has-label', !!text);
      ring.classList.toggle('is-hidden', !!document.querySelector('dialog[open]'));

      const m = t?.closest<HTMLElement>('[data-magnetic]') ?? null;
      if (m !== magnet) { release(magnet, ['translate']); magnet = m; }
      if (m) {
        const r = m.getBoundingClientRect();
        const pull = Number(m.dataset.magnetic) || 0.3;
        m.style.translate = `${(x - r.left - r.width / 2) * pull}px ${(y - r.top - r.height / 2) * pull}px`;
      }

      const tl = t?.closest<HTMLElement>('[data-tilt]') ?? null;
      if (tl !== tilt) { release(tilt, ['--rx', '--ry', '--gx', '--gy']); tilt = tl; }
      if (tl) {
        const r = tl.getBoundingClientRect();
        const px = (x - r.left) / r.width, py = (y - r.top) / r.height;
        tl.classList.add('is-tilting');
        tl.style.setProperty('--ry', `${(px - 0.5) * 10}deg`);
        tl.style.setProperty('--rx', `${(0.5 - py) * 8}deg`);
        tl.style.setProperty('--gx', `${px * 100}%`);
        tl.style.setProperty('--gy', `${py * 100}%`);
      }
    };
    const onLeave = () => {
      ring.classList.add('is-hidden');
      release(magnet, ['translate']); magnet = null;
      release(tilt, ['--rx', '--ry', '--gx', '--gy']); tilt = null;
    };
    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    const tick = () => {
      rx += (x - rx) * 0.2; ry += (y - ry) * 0.2;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.classList.remove('has-fx');
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor is-hidden" aria-hidden="true">
      <span className="cursor__ring" />
      <span ref={labelRef} className="cursor__label" />
    </div>
  );
}
