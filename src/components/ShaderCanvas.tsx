import { useEffect, useRef } from 'react';

// A full-bleed canvas running one fragment shader, shared by the section backdrops.
// Plain WebGL (no three.js) so it starts before the 3D chunk loads. Pauses off screen and in hidden tabs,
// and draws one still frame when motion is reduced. Without WebGL it draws nothing and the CSS behind stays.
// Uniforms it provides:
//   uRes  canvas size in pixels
//   uTime seconds
//   uPtr  pointer, centred on the canvas and divided by its height, eased
//   uView how far the canvas has come into view: 0 when its top meets the viewport bottom, 1 when it reaches the top

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

export function ShaderCanvas({ frag, scale, className, timeOffset = 0 }: {
  frag: string;
  scale: number; // canvas pixels per CSS pixel
  className?: string;
  timeOffset?: number; // seconds to start into the animation, to skip a flat first frame
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;

    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uPtr = gl.getUniformLocation(prog, 'uPtr');
    const uView = gl.getUniformLocation(prog, 'uView');

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
      gl.uniform2f(uRes, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let px = 0, py = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / r.height;
      ty = -(e.clientY - r.top - r.height / 2) / r.height;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now() - timeOffset * 1000;
    let raf = 0, visible = true;
    const draw = (now: number) => {
      px += (tx - px) * 0.04; py += (ty - py) * 0.04;
      const r = canvas.getBoundingClientRect();
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPtr, px, py);
      gl.uniform1f(uView, reduced ? 1 : Math.min(Math.max((innerHeight - r.top) / innerHeight, 0), 1));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const resume = () => { cancelAnimationFrame(raf); if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduced && visible) draw(performance.now());
      resume();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', resume);

    draw(performance.now());
    canvas.classList.add('is-on');
    resume();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', resume);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [frag, scale, timeOffset]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
