import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, Sparkles } from '@react-three/drei';
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { loadScriptFont, layoutWord, arrowGeometry, livelyMaterial } from './inflated';
import { stickerAtlas } from './stickers';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const now = () => performance.now() / 1000;
const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInCubic = (x: number) => x * x * x;
const easeOutBack = (x: number) => 1 + 2.4 * Math.pow(x - 1, 3) + 1.4 * Math.pow(x - 1, 2);
const easeInBack = (x: number) => 2.4 * x * x * x - 1.4 * x * x;
// 0 → 1 with a springy overshoot, settled by t ≈ 0.9 s
const pop = (t: number) => (t <= 0 ? 0 : 1 - Math.exp(-6.5 * t) * Math.cos(11 * t));

/* ---------- Pointer and scroll, shared by every scene ---------- */
const pointer = new THREE.Vector2(0, 0);
// v: smoothed scroll speed (screens per second, signed, down is positive)
const scroll = { v: 0, lastY: 0, lastT: 0 };
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  }, { passive: true });
  scroll.lastY = window.scrollY;
  scroll.lastT = performance.now();
  const track = () => {
    const t = performance.now(), y = window.scrollY;
    const dt = Math.max(t - scroll.lastT, 1) / 1000;
    const raw = (y - scroll.lastY) / window.innerHeight / dt;
    scroll.v += (Math.max(-4, Math.min(4, raw)) - scroll.v) * 0.12;
    scroll.lastY = y; scroll.lastT = t;
    requestAnimationFrame(track);
  };
  requestAnimationFrame(track);
}

// A damped spring, stepped in small slices of real time so it settles at any frame rate.
function spring(state: { x: number; v: number }, target: number, dt: number, k = 180, c = 12) {
  let left = Math.min(dt, 0.25);
  while (left > 0) {
    const h = Math.min(left, 1 / 120);
    state.v += (-k * (state.x - target) - c * state.v) * h;
    state.x += state.v * h;
    left -= h;
  }
  return state.x;
}

/* ---------- Studio lighting rendered into an environment map: no files to download ---------- */
function Studio() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 6]} intensity={1.8} />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 4, 4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#9ec2ff" />
        <Lightformer form="rect" intensity={2} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#d4ff3a" />
        <Lightformer form="ring" intensity={3} position={[2, 2, 6]} scale={2} />
        <Lightformer form="rect" intensity={1} position={[0, -5, 2]} rotation-x={-Math.PI / 2} scale={[12, 4, 1]} color="#2a40ff" />
      </Environment>
    </>
  );
}

// A soft shadow cast back onto the blue, behind whatever floats in front of it.
function Backdrop({ y = -0.25 }: { y?: number }) {
  return (
    <ContactShadows
      rotation-x={Math.PI / 2}
      position={[0.2, y, -1.6]}
      scale={16}
      far={3.2}
      blur={2.8}
      opacity={0.55}
      resolution={512}
      color="#000a45"
      frames={Infinity}
    />
  );
}

// Every few seconds a soft key light sweeps across, so a highlight glides over the glossy letters.
function SweepLight({ every = 6, span = 9 }: { every?: number; span?: number }) {
  const light = useRef<THREE.DirectionalLight>(null);
  const still = reduced();
  useFrame((state) => {
    const l = light.current;
    if (!l) return;
    if (still) { l.intensity = 0; return; }
    const p = (state.clock.elapsedTime % every) / 2.2; // the sweep itself takes 2.2 s
    if (p > 1) { l.intensity = 0; return; }
    l.position.set(-span + p * span * 2, 2.5, 4);
    l.intensity = Math.sin(p * Math.PI) * 2.6;
  });
  return <directionalLight ref={light} color="#ffffff" intensity={0} />;
}

function useFont() {
  const [font, setFont] = useState<Font | null>(null);
  useEffect(() => { loadScriptFont().then(setFont).catch(() => setFont(null)); }, []);
  return font;
}

/* ---------- The lively word, built from separate letters ---------- */
interface Slot {
  key: string; i: number; n: number; x: number; geometry: THREE.BufferGeometry; offsetY: number;
  born: number; dying: number | null; seed: number; hop: { x: number; v: number };
}

function LivelyWord({
  words, interval = 5200, width = 0.6, maxHeight = 1, position = [0, 0, 0] as [number, number, number], onPress, track, introOnView = false,
}: {
  words: string[]; interval?: number; width?: number; maxHeight?: number; position?: [number, number, number];
  onPress?: () => void; track?: React.RefObject<HTMLElement | null>; introOnView?: boolean;
}) {
  const font = useFont();
  const group = useRef<THREE.Group>(null);
  const meshes = useRef(new Map<string, THREE.Mesh>());
  const { viewport } = useThree();
  const { material, uniforms } = useMemo(() => livelyMaterial('#2b44ff'), []);
  const [slots, setSlots] = useState<Slot[]>([]);
  const slotsRef = useRef<Slot[]>([]);
  slotsRef.current = slots;
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(!introOnView);
  const fit = useRef(0);
  const fitTarget = useRef(1);
  const squash = useRef({ x: 0, v: 0 });
  const hover = useRef(0);
  const still = reduced();
  const gen = useRef(0);

  // The footer word bounces in each time the section comes into view.
  useEffect(() => {
    if (!introOnView || !track?.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio > 0.35), { threshold: [0, 0.35, 0.6] });
    io.observe(track.current);
    return () => io.disconnect();
  }, [introOnView, track]);

  // Cycle through the words.
  useEffect(() => {
    if (words.length < 2 || still) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words, interval, still]);

  // Each change of word: the old letters tumble out one by one while the new ones bounce in.
  useEffect(() => {
    if (!font || !inView) return;
    const word = words[index % words.length];
    const { letters, width: w, height: hgt, offsetY } = layoutWord(font, word);
    const t = now();
    const g = ++gen.current;
    // Each word fills the width or the height it is allowed, whichever it reaches first,
    // so long words grow as large as short ones instead of shrinking to the same width.
    fitTarget.current = Math.min((viewport.width * width) / w, (viewport.height * maxHeight) / hgt);
    if (!fit.current || Math.abs(fit.current / fitTarget.current - 1) > 0.6) fit.current = fitTarget.current;
    setSlots((prev) => [
      ...prev.filter((s) => s.dying === null || t - s.dying < 1.2).map((s) => (s.dying === null ? { ...s, dying: t } : s)),
      ...letters.map((l, i) => ({
        key: `${g}-${i}`, i, n: letters.length, x: l.x, geometry: l.geometry, offsetY,
        born: t + (still ? -5 : 0.22), dying: null, seed: Math.random() * 2 - 1, hop: { x: 0, v: 0 },
      })),
    ]);
    const cleanup = window.setTimeout(() => setSlots((prev) => prev.filter((s) => s.dying === null)), 1400);
    return () => window.clearTimeout(cleanup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [font, words, index, inView, viewport.width, viewport.height, width, maxHeight]);

  useFrame((state, dt) => {
    const grp = group.current;
    if (!grp) return;
    const t = now();
    const time = state.clock.elapsedTime;
    uniforms.uTime.value = time;
    uniforms.uWaveTime.value += Math.min(dt, 0.1);
    uniforms.uPokeAmt.value += (hover.current - uniforms.uPokeAmt.value) * 0.12;
    uniforms.uWobble.value = still ? 0 : 1;

    // Scroll: how fast, and how far this section has travelled off the top of the screen.
    const v = still ? 0 : Math.max(-1.5, Math.min(1.5, scroll.v));
    let leave = 0;
    if (track?.current && !introOnView) {
      const r = track.current.getBoundingClientRect();
      leave = clamp01(-r.top / r.height);
    }

    // ease towards the new word's size in real time, so slow frames don't leave it small
    fit.current += (fitTarget.current - fit.current) * (1 - Math.exp(-Math.min(dt, 0.25) * 7));
    const q = spring(squash.current, 0, dt, 260, 9);
    const stretch = Math.min(Math.abs(v), 1);
    grp.scale.set(fit.current * (1 + q * 0.18 + stretch * 0.05), fit.current * (1 - q * 0.22 - stretch * 0.12), fit.current);
    if (!still) {
      grp.rotation.y += (pointer.x * 0.4 - grp.rotation.y) * 0.06;
      grp.rotation.x += (-pointer.y * 0.28 + v * 0.35 - grp.rotation.x) * 0.08;
      grp.rotation.z = Math.sin(time * 0.6) * 0.03;
      grp.position.set(position[0], position[1] + Math.sin(time * 1.1) * 0.08 + leave * viewport.height * 0.18, position[2] - leave * 2.5);
    }

    for (const s of slotsRef.current) {
      const m = meshes.current.get(s.key);
      if (!m) continue;
      const hop = spring(s.hop, 0, dt, 120, 7);
      const centre = s.i - (s.n - 1) / 2;
      // letters drift apart and turn as the hero scrolls away
      let x = s.x * (1 + leave * 0.55);
      let y = s.offsetY + hop * 0.12 + Math.sin(time * 9 - s.i * 0.9) * stretch * 0.16;
      let rx = 0, ry = leave * centre * 0.35, rz = 0, sc = 1;

      if (s.dying === null) {
        const lt = t - s.born - s.i * 0.075;
        if (lt < 0) { m.visible = false; continue; }
        m.visible = true;
        sc = pop(lt);
        const drop = 1 - easeOutBack(clamp01(lt / 0.7));
        y += drop * 1.3;
        ry += (1 - easeOutCubic(clamp01(lt / 0.8))) * Math.PI * 0.9 * (s.seed > 0 ? 1 : -1);
        rz += (1 - easeOutCubic(clamp01(lt / 0.6))) * s.seed * 0.7;
      } else {
        const lt = t - s.dying - s.i * 0.05;
        const e = clamp01(lt / 0.45);
        if (e >= 1) { m.visible = false; continue; }
        sc = 1 - easeInBack(e);
        y -= easeInCubic(e) * 1.2;
        rx += e * 2.6;
        rz += s.seed * e * 1.6;
        x += s.seed * e * 0.4;
      }
      m.position.set(x, y, 0);
      m.rotation.set(rx, ry, rz);
      m.scale.setScalar(Math.max(sc, 0.0001));
    }
  });

  const onDown = (e: ThreeEvent<PointerEvent>, s: Slot) => {
    e.stopPropagation();
    uniforms.uWaveOrigin.value.copy(e.point);
    uniforms.uWaveTime.value = 0;
    uniforms.uWaveAmp.value = 1;
    squash.current.v += 7;
    // the pressed letter jumps, its neighbours a little
    for (const o of slotsRef.current) if (o.dying === null) o.hop.v += 22 / (1 + Math.abs(o.i - s.i) * 1.5);
  };

  return (
    <group ref={group} position={position}>
      {slots.map((s) => (
        <mesh
          key={s.key}
          ref={(m) => { if (m) meshes.current.set(s.key, m); else meshes.current.delete(s.key); }}
          geometry={s.geometry}
          material={material}
          visible={false}
          onPointerMove={(e) => { e.stopPropagation(); uniforms.uPoke.value.copy(e.point); hover.current = 1; }}
          onPointerOut={() => { hover.current = 0; document.body.style.cursor = ''; }}
          onPointerOver={() => { if (onPress) document.body.style.cursor = 'pointer'; }}
          onPointerDown={(e) => onDown(e, s)}
          onClick={(e) => { e.stopPropagation(); onPress?.(); }}
        />
      ))}
    </group>
  );
}

/* ---------- The cursor arrow: floats, points at the pointer, spins with the scroll ---------- */
function LivelyArrow({ position, size = 0.9 }: { position: [number, number, number]; size?: number }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => arrowGeometry(), []);
  const { material, uniforms } = useMemo(() => livelyMaterial('#3350ff'), []);
  const squash = useRef({ x: 0, v: 0 });
  const spin = useRef(0);
  const hover = useRef(0);
  const { viewport } = useThree();
  const still = reduced();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uWaveTime.value += Math.min(dt, 0.1);
    uniforms.uPokeAmt.value += (hover.current - uniforms.uPokeAmt.value) * 0.12;
    const q = spring(squash.current, 0, dt, 260, 9);
    g.scale.setScalar(size * (1 + q * 0.2));
    if (still) return;
    // scrolling spins it like a pinwheel; the spin bleeds off when the page stops
    spin.current += scroll.v * Math.min(dt, 0.1) * 9;
    spin.current *= 0.97;
    const px = (pointer.x * viewport.width) / 2 - position[0];
    const py = (pointer.y * viewport.height) / 2 - position[1];
    const aim = Math.atan2(py, px) + Math.PI * 0.86 + spin.current;
    g.rotation.z += Math.atan2(Math.sin(aim - g.rotation.z), Math.cos(aim - g.rotation.z)) * 0.08;
    g.rotation.x = Math.sin(t * 1.3) * 0.35 + pointer.y * 0.4 + scroll.v * 0.6;
    g.rotation.y = Math.cos(t * 1.1) * 0.35 + pointer.x * 0.5;
    g.position.y = position[1] + Math.sin(t * 1.6) * 0.12;
  });

  return (
    <group ref={group} position={position}>
      <mesh
        geometry={geometry}
        material={material}
        onPointerMove={(e) => { uniforms.uPoke.value.copy(e.point); hover.current = 1; }}
        onPointerOut={() => (hover.current = 0)}
        onPointerDown={(e) => {
          e.stopPropagation();
          uniforms.uWaveOrigin.value.copy(e.point);
          uniforms.uWaveTime.value = 0;
          uniforms.uWaveAmp.value = 1.4;
          squash.current.v += 10;
          spin.current += 1.2;
        }}
      />
    </group>
  );
}

/* ---------- Sticker rain: die-cut stickers flutter down; a click throws a handful ---------- */
const STICKER_VERT = /* glsl */ `
attribute vec4 uvRect;
varying vec2 vUv;
void main() {
  vUv = uvRect.xy + uv * uvRect.zw;
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
}`;
const STICKER_FRAG = /* glsl */ `
uniform sampler2D map;
varying vec2 vUv;
void main() {
  vec4 c = texture2D(map, vUv);
  if (c.a < 0.02) discard;
  gl_FragColor = c;
  #include <colorspace_fragment>
}`;

interface Sticker {
  p: THREE.Vector3; vy: number; spin: number; rot: number; flutter: number; phase: number;
  scale: number; tex: number; oneShot: boolean; alive: boolean; vx: number;
}

export interface StickerRainHandle { burst: (x: number, y: number) => void }

function StickerRain({ handle, ambient = 18, pool = 60, size = 1 }: { handle: React.MutableRefObject<StickerRainHandle | null>; ambient?: number; pool?: number; size?: number }) {
  const [atlas, setAtlas] = useState<Awaited<ReturnType<typeof stickerAtlas>> | null>(null);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const still = reduced();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => { stickerAtlas().then(setAtlas); }, []);

  const stickers = useMemo<Sticker[]>(() => Array.from({ length: pool }, (_, i) => ({
    p: new THREE.Vector3(), vy: 0, vx: 0, spin: 0, rot: 0, flutter: 0, phase: 0, scale: 1,
    tex: i % 12, oneShot: i >= ambient, alive: false,
  })), [pool, ambient]);

  const spawn = (s: Sticker, x: number, y: number, z: number, burst: boolean) => {
    s.p.set(x, y, z);
    s.vy = burst ? 2.5 + Math.random() * 2.5 : -(0.5 + Math.random() * 0.7);
    s.vx = burst ? (Math.random() - 0.5) * 4 : 0;
    s.spin = (Math.random() - 0.5) * 2.4;
    s.rot = Math.random() * Math.PI * 2;
    s.flutter = 0.25 + Math.random() * 0.5;
    s.phase = Math.random() * Math.PI * 2;
    s.scale = (0.7 + Math.random() * 0.45) * size;
    s.tex = Math.floor(Math.random() * 12);
    s.alive = true;
  };

  // Ambient stickers start spread over the whole height so the field is full at once.
  useEffect(() => {
    stickers.forEach((s) => {
      if (s.oneShot) return;
      spawn(s, (Math.random() - 0.5) * viewport.width * 1.05, (Math.random() - 0.5) * viewport.height * 1.2, -1 - Math.random() * 2, false);
    });
    handle.current = {
      burst: (x, y) => {
        let n = 0;
        for (const s of stickers) {
          if (s.oneShot && !s.alive) { spawn(s, x + (Math.random() - 0.5) * 0.4, y, 0.5 + Math.random(), true); if (++n >= 7) break; }
        }
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stickers, viewport.width, viewport.height]);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(1, 1);
    g.setAttribute('uvRect', new THREE.InstancedBufferAttribute(new Float32Array(pool * 4), 4));
    return g;
  }, [pool]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { map: { value: null } },
    vertexShader: STICKER_VERT,
    fragmentShader: STICKER_FRAG,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), []);

  useEffect(() => { if (atlas) material.uniforms.map.value = atlas.texture; }, [atlas, material]);

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m || !atlas) return;
    const d = Math.min(dt, 0.1);
    const t = state.clock.elapsedTime;
    // scrolling down blows the stickers upward, like a gust
    const gust = still ? 0 : Math.max(-2, Math.min(2, scroll.v)) * viewport.height * 0.9;
    const rectAttr = geometry.getAttribute('uvRect') as THREE.InstancedBufferAttribute;
    const top = viewport.height * 0.62, bottom = -viewport.height * 0.62;
    stickers.forEach((s, i) => {
      if (s.alive && !still) {
        if (s.oneShot) { s.vy -= 6 * d; s.vx *= 0.99; }
        s.p.y += (s.vy + gust) * d;
        s.p.x += (s.vx + Math.sin(t * 0.9 + s.phase) * 0.35) * d;
        s.rot += (s.spin + Math.abs(gust) * 0.4 * Math.sign(s.spin)) * d;
        if (s.p.y < bottom - 1) {
          if (s.oneShot) s.alive = false;
          else spawn(s, (Math.random() - 0.5) * viewport.width * 1.05, top + Math.random(), -1 - Math.random() * 2, false);
        } else if (!s.oneShot && s.p.y > top + 1.5) {
          // blown off the top: come back in from below
          s.p.y = bottom - 0.5;
        }
      }
      dummy.position.copy(s.p);
      dummy.rotation.set(Math.sin(t * 1.7 + s.phase) * s.flutter, Math.cos(t * 1.3 + s.phase) * s.flutter, s.rot);
      dummy.scale.setScalar(s.alive ? s.scale : 0);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      const r = atlas.rects[s.tex % atlas.count];
      rectAttr.setXYZW(i, r.x, r.y, r.z, r.w);
    });
    m.instanceMatrix.needsUpdate = true;
    rectAttr.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[geometry, material, pool]} frustumCulled={false} renderOrder={-1} />;
}

/* ---------- Canvases ---------- */
function useVisible(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

function Positioned({ children }: { children: (v: { w: number; h: number; mobile: boolean }) => React.ReactNode }) {
  const { viewport, size } = useThree();
  return <>{children({ w: viewport.width, h: viewport.height, mobile: size.width < 700 })}</>;
}

export function HeroScene({ words }: { words: string[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useVisible(wrap);
  return (
    <div ref={wrap} className="scene scene--hero">
      <Canvas dpr={[1, 2]} camera={{ fov: 30, position: [0, 0, 12] }} gl={{ antialias: true, alpha: true }} frameloop={visible ? 'always' : 'never'}>
        <Studio />
        <SweepLight />
        <Positioned>
          {({ w, h, mobile }) => (
            <>
              <Backdrop y={mobile ? -h * 0.03 : h * 0.03} />
              <Sparkles
                count={mobile ? 26 : 60}
                scale={[w * (mobile ? 0.95 : 0.88), h * 0.46, 2.5]}
                position={[0, mobile ? 0 : h * 0.08, 0.6]}
                size={mobile ? 2.2 : 3}
                speed={0.35}
                noise={1.2}
                opacity={0.85}
                color="#e6ecff"
              />
              <LivelyWord track={wrap} words={words} width={mobile ? 0.94 : 0.86} maxHeight={mobile ? 0.3 : 0.38} position={[mobile ? 0 : -w * 0.02, mobile ? h * 0.01 : h * 0.08, 0]} />
              <LivelyArrow position={[mobile ? w * 0.32 : w * 0.39, mobile ? -h * 0.18 : -h * 0.2, 0.5]} size={mobile ? 0.6 : 1.05} />
            </>
          )}
        </Positioned>
      </Canvas>
    </div>
  );
}

export function ContactScene({ word, onPress }: { word: string; onPress: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useVisible(wrap);
  const rain = useRef<StickerRainHandle | null>(null);
  const words = useMemo(() => [word], [word]);
  return (
    <div ref={wrap} className="scene scene--contact">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 30, position: [0, 0, 12] }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? 'always' : 'never'}
        onPointerMissed={(e) => {
          // A click on empty space throws a handful of stickers from that point.
          const el = wrap.current!;
          const r = el.getBoundingClientRect();
          const nx = ((e.clientX - r.left) / r.width) * 2 - 1, ny = -((e.clientY - r.top) / r.height) * 2 + 1;
          const vh = 2 * Math.tan((30 * Math.PI) / 360) * 12, vw = vh * (r.width / r.height);
          rain.current?.burst((nx * vw) / 2, (ny * vh) / 2);
        }}
      >
        <Studio />
        <Positioned>
          {({ h, mobile }) => (
            <>
              <StickerRain handle={rain} ambient={mobile ? 6 : 18} size={mobile ? 0.7 : 1} />
              <Backdrop y={mobile ? -h * 0.1 : -h * 0.14} />
              <LivelyWord
                track={wrap}
                introOnView
                words={words}
                width={mobile ? 0.95 : 0.7}
                position={[0, mobile ? -h * 0.06 : -h * 0.1, 0]}
                onPress={onPress}
              />
            </>
          )}
        </Positioned>
      </Canvas>
    </div>
  );
}
