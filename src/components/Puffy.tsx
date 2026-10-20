import React, { useEffect, useId, useRef } from 'react';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Shared pointer position (0..1), read by every inflated piece on the page.
const pointer = { x: 0.5, y: 0.4 };
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX / window.innerWidth;
    pointer.y = e.clientY / window.innerHeight;
  }, { passive: true });
}

// Tilts `wrap` in perspective towards the pointer and moves the filter's lights with it.
function useLiveLight(
  wrapRef: React.RefObject<HTMLElement | null>,
  svgRef: React.RefObject<SVGSVGElement | null>,
  keyRef: React.RefObject<SVGFEPointLightElement | null>,
  { tilt = 14, aim = false }: { tilt?: number; aim?: boolean } = {}
) {
  useEffect(() => {
    let raf = 0, x = pointer.x, y = pointer.y, visible = true;
    const still = reduced();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    const loop = () => {
      raf = 0;
      x += (pointer.x - x) * 0.07;
      y += (pointer.y - y) * 0.07;
      const svg = svgRef.current, key = keyRef.current, wrap = wrapRef.current;
      if (svg && key) {
        const vb = svg.viewBox.baseVal;
        key.setAttribute('x', String(vb.width * (x * 1.3 - 0.15)));
        key.setAttribute('y', String(vb.height * (y * 1.6 - 0.9)));
      }
      if (wrap && !still) {
        const r = wrap.getBoundingClientRect();
        const cx = (r.left + r.width / 2) / window.innerWidth, cy = (r.top + r.height / 2) / window.innerHeight;
        const rx = (y - cy) * -tilt, ry = (x - cx) * tilt;
        let rot = '';
        if (aim) {
          // The arrow's tip turns to point at the pointer.
          const ang = Math.atan2((y - cy) * window.innerHeight, (x - cx) * window.innerWidth) * (180 / Math.PI);
          rot = ` rotate(${(ang - 20) * 0.35}deg)`;
        }
        wrap.style.setProperty('--tilt', `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)${rot}`);
      }
      if (visible) raf = requestAnimationFrame(loop);
    };
    if (wrapRef.current) io.observe(wrapRef.current);
    raf = requestAnimationFrame(loop);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [wrapRef, svgRef, keyRef, tilt, aim]);
}

// A press squishes the shape like a balloon, then it springs back.
function squish(el: HTMLElement | null) {
  if (!el || reduced()) return;
  el.classList.remove('is-squished');
  void el.offsetWidth;
  el.classList.add('is-squished');
}

/*
 * The inflated material: a blurred alpha channel used as a height map, lit by a key light that
 * follows the pointer (glossy highlight), a fixed fill (body shading) and a cool rim from below.
 */
function PuffFilter({ id, keyRef, blur = 10, colour = '#2a40ff' }: { id: string; keyRef: React.Ref<SVGFEPointLightElement>; blur?: number; colour?: string }) {
  return (
    <filter id={id} x="-20%" y="-30%" width="140%" height="170%" colorInterpolationFilters="sRGB">
      <feGaussianBlur in="SourceAlpha" stdDeviation={blur} result="h" />
      {/* body shading */}
      <feDiffuseLighting in="h" surfaceScale={blur * 1.1} diffuseConstant="1.2" lightingColor="#ffffff" result="d">
        <feDistantLight azimuth="235" elevation="42" />
      </feDiffuseLighting>
      <feFlood floodColor={colour} result="c" />
      <feComposite in="c" in2="d" operator="arithmetic" k1="1.15" k2="0.1" k3="0" k4="0" result="lit" />
      {/* glossy key highlight, follows the pointer */}
      <feSpecularLighting in="h" surfaceScale={blur * 1.1} specularConstant="1.35" specularExponent="38" lightingColor="#ffffff" result="s">
        <fePointLight ref={keyRef} x="300" y="-80" z={blur * 34} />
      </feSpecularLighting>
      {/* cool rim light from below */}
      <feSpecularLighting in="h" surfaceScale={blur * 1.1} specularConstant="0.7" specularExponent="12" lightingColor="#6fd6ff" result="rim">
        <feDistantLight azimuth="70" elevation="18" />
      </feSpecularLighting>
      <feComposite in="lit" in2="rim" operator="arithmetic" k1="0" k2="1" k3="0.55" k4="0" result="litRim" />
      <feComposite in="litRim" in2="s" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="shiny" />
      <feComposite in="shiny" in2="SourceAlpha" operator="in" result="body" />
      {/* soft contact shadow */}
      <feGaussianBlur in="SourceAlpha" stdDeviation={blur * 2} result="sh" />
      <feOffset in="sh" dx={blur * 0.8} dy={blur * 2.8} result="sho" />
      <feFlood floodColor="#010626" floodOpacity="0.7" />
      <feComposite in2="sho" operator="in" result="shadow" />
      <feMerge>
        <feMergeNode in="shadow" />
        <feMergeNode in="body" />
      </feMerge>
    </filter>
  );
}

export function PuffyWord({ words, className, interval = 3200 }: { words: string[]; className?: string; interval?: number }) {
  const id = useId().replace(/:/g, '');
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const keyRef = useRef<SVGFEPointLightElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  useLiveLight(wrapRef, svgRef, keyRef);

  // Cycle the word: deflate, swap, inflate with a spring.
  useEffect(() => {
    let i = 0;
    const el = textRef.current;
    if (!el) return;
    el.textContent = words[0];
    if (words.length < 2 || reduced()) return;
    const timer = window.setInterval(() => {
      el.classList.remove('is-in');
      el.classList.add('is-out');
      window.setTimeout(() => {
        i = (i + 1) % words.length;
        el.textContent = words[i];
        el.classList.remove('is-out');
        void (el as unknown as HTMLElement).getBoundingClientRect();
        el.classList.add('is-in');
      }, 380);
    }, interval);
    return () => window.clearInterval(timer);
  }, [words, interval]);

  return (
    <div ref={wrapRef} className={`puffy ${className ?? ''}`} onPointerDown={() => squish(wrapRef.current)}>
      <svg ref={svgRef} className="puffy__svg" viewBox="0 0 1200 440" role="img" aria-label={words.join(', ')}>
        <defs>
          <PuffFilter id={id} keyRef={keyRef} blur={11} />
        </defs>
        <text
          ref={textRef}
          className="puffy__text"
          x="600"
          y="300"
          textAnchor="middle"
          fontFamily="Damion, cursive"
          fontSize="250"
          fill="#2a40ff"
          stroke="#2a40ff"
          strokeWidth="16"
          strokeLinejoin="round"
          strokeLinecap="round"
          filter={`url(#${id})`}
        >
          {words[0]}
        </text>
      </svg>
    </div>
  );
}

export function PuffyArrow({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const keyRef = useRef<SVGFEPointLightElement>(null);
  useLiveLight(wrapRef, svgRef, keyRef, { tilt: 26, aim: true });
  return (
    <div ref={wrapRef} className={`puffy puffy--arrow ${className ?? ''}`} onPointerDown={() => squish(wrapRef.current)}>
      <svg ref={svgRef} className="puffy__svg" viewBox="0 0 220 200" aria-hidden="true">
        <defs>
          <PuffFilter id={id} keyRef={keyRef} blur={7} colour="#3150ff" />
        </defs>
        <path
          d="M30 40 L190 100 L118 118 L92 180 Z"
          fill="#3150ff"
          stroke="#3150ff"
          strokeWidth="22"
          strokeLinejoin="round"
          filter={`url(#${id})`}
        />
      </svg>
    </div>
  );
}
