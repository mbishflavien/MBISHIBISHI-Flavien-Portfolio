import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import type { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { loadScriptFont, inflatedTextGeometry, arrowGeometry, livelyMaterial } from './inflated';
import { stickerAtlas } from './stickers';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Pointer over the whole window, -1..1, shared by every scene ---------- */
const pointer = new THREE.Vector2(0, 0);
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  }, { passive: true });
}

// A damped spring, for scale pops and squishes. Stepped in small slices of real time,
// so it settles on schedule even when the frame rate is low.
function spring(state: { x: number; v: number }, target: number, dt: number, k = 180, c = 12) {
  let left = Math.min(dt, 0.25);
  while (left > 0) {
    const h = Math.min(left, 1 / 120);
    const a = -k * (state.x - target) - c * state.v;
    state.v += a * h;
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
      <directionalLight position={[-6, -3, 2]} intensity={0.6} color="#6fd6ff" />
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

function useFont() {
  const [font, setFont] = useState<Font | null>(null);
  useEffect(() => { loadScriptFont().then(setFont).catch(() => setFont(null)); }, []);
  return font;
}

/* ---------- The lively inflated word ---------- */
function LivelyWord({
  words, interval = 4800, width = 0.6, position = [0, 0, 0] as [number, number, number], onPress,
}: {
  words: string[]; interval?: number; width?: number; position?: [number, number, number]; onPress?: () => void;
}) {
  const font = useFont();
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const { material, uniforms } = useMemo(() => livelyMaterial('#2b44ff'), []);
  const [index, setIndex] = useState(0);
  const pop = useRef({ x: 0, v: 0 });
  const squash = useRef({ x: 0, v: 0 });
  const target = useRef(1);
  const hover = useRef(0);
  const still = reduced();

  // Deflate, swap, inflate.
  useEffect(() => {
    if (words.length < 2 || still) return;
    const id = window.setInterval(() => {
      target.current = 0;
      window.setTimeout(() => { setIndex((i) => (i + 1) % words.length); target.current = 1; }, 240);
    }, interval);
    return () => window.clearInterval(id);
  }, [words, interval, still]);

  const geometry = useMemo(() => (font ? inflatedTextGeometry(font, words[index % words.length]) : null), [font, words, index]);
  const fit = useMemo(() => {
    if (!geometry?.boundingBox) return 1;
    const w = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    return (viewport.width * width) / w;
  }, [geometry, viewport.width, width]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 1 / 30);
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uWaveTime.value += d;
    uniforms.uPokeAmt.value += (hover.current - uniforms.uPokeAmt.value) * 0.12;
    uniforms.uWobble.value = still ? 0 : 1;
    const s = still ? 1 : spring(pop.current, target.current, dt, 240, 15);
    const q = spring(squash.current, 0, dt, 260, 9);
    g.scale.set(fit * s * (1 + q * 0.18), fit * s * (1 - q * 0.22), fit * s * (1 + q * 0.1));
    if (!still) {
      g.rotation.y += (pointer.x * 0.45 - g.rotation.y) * 0.06;
      g.rotation.x += (-pointer.y * 0.3 - g.rotation.x) * 0.06;
      g.rotation.z = Math.sin(t * 0.6) * 0.03;
      g.position.y = position[1] + Math.sin(t * 1.1) * 0.08;
    }
  });

  const toLocal = (e: ThreeEvent<PointerEvent | MouseEvent>) => mesh.current!.worldToLocal(e.point.clone());

  if (!geometry) return null;
  return (
    <group ref={group} position={position}>
      <mesh
        ref={mesh}
        geometry={geometry}
        material={material}
        onPointerMove={(e) => { e.stopPropagation(); uniforms.uPoke.value.copy(toLocal(e)); hover.current = 1; }}
        onPointerOut={() => { hover.current = 0; document.body.style.cursor = ''; }}
        onPointerOver={() => { if (onPress) document.body.style.cursor = 'pointer'; }}
        onPointerDown={(e) => {
          e.stopPropagation();
          uniforms.uWaveOrigin.value.copy(toLocal(e));
          uniforms.uWaveTime.value = 0;
          uniforms.uWaveAmp.value = 1;
          squash.current.v += 9;
        }}
        onClick={(e) => { e.stopPropagation(); onPress?.(); }}
      />
    </group>
  );
}

/* ---------- The cursor arrow: floats and turns to point at the pointer ---------- */
function LivelyArrow({ position, size = 0.9 }: { position: [number, number, number]; size?: number }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => arrowGeometry(), []);
  const { material, uniforms } = useMemo(() => livelyMaterial('#3350ff'), []);
  const squash = useRef({ x: 0, v: 0 });
  const hover = useRef(0);
  const { viewport } = useThree();
  const still = reduced();

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 1 / 30);
    const t = state.clock.elapsedTime;
    uniforms.uTime.value = t;
    uniforms.uWaveTime.value += d;
    uniforms.uPokeAmt.value += (hover.current - uniforms.uPokeAmt.value) * 0.12;
    const q = spring(squash.current, 0, dt, 260, 9);
    g.scale.setScalar(size * (1 + q * 0.2));
    if (still) return;
    // aim the tip (which points up-left in the shape) at the pointer
    const px = (pointer.x * viewport.width) / 2 - position[0];
    const py = (pointer.y * viewport.height) / 2 - position[1];
    const aim = Math.atan2(py, px) + Math.PI * 0.86;
    g.rotation.z += (Math.atan2(Math.sin(aim - g.rotation.z), Math.cos(aim - g.rotation.z))) * 0.08;
    g.rotation.x = Math.sin(t * 1.3) * 0.35 + pointer.y * 0.4;
    g.rotation.y = Math.cos(t * 1.1) * 0.35 + pointer.x * 0.5;
    g.position.y = position[1] + Math.sin(t * 1.6) * 0.12;
  });

  return (
    <group ref={group} position={position}>
      <mesh
        ref={mesh}
        geometry={geometry}
        material={material}
        onPointerMove={(e) => { uniforms.uPoke.value.copy(mesh.current!.worldToLocal(e.point.clone())); hover.current = 1; }}
        onPointerOut={() => (hover.current = 0)}
        onPointerDown={(e) => {
          e.stopPropagation();
          uniforms.uWaveOrigin.value.copy(mesh.current!.worldToLocal(e.point.clone()));
          uniforms.uWaveTime.value = 0;
          uniforms.uWaveAmp.value = 1.4;
          squash.current.v += 10;
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
    const d = Math.min(dt, 1 / 30);
    const t = state.clock.elapsedTime;
    const rectAttr = geometry.getAttribute('uvRect') as THREE.InstancedBufferAttribute;
    const top = viewport.height * 0.62, bottom = -viewport.height * 0.62;
    stickers.forEach((s, i) => {
      if (s.alive && !still) {
        if (s.oneShot) { s.vy -= 6 * d; s.vx *= 0.99; } // thrown: gravity
        s.p.y += s.vy * d;
        s.p.x += (s.vx + Math.sin(t * 0.9 + s.phase) * 0.35) * d;
        s.rot += s.spin * d;
        if (s.p.y < bottom - 1) {
          if (s.oneShot) s.alive = false;
          else spawn(s, (Math.random() - 0.5) * viewport.width * 1.05, top + Math.random(), -1 - Math.random() * 2, false);
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
      <Canvas dpr={[1, 1.75]} camera={{ fov: 30, position: [0, 0, 12] }} gl={{ antialias: true, alpha: true }} frameloop={visible ? 'always' : 'never'}>
        <Studio />
        <Positioned>
          {({ w, h, mobile }) => (
            <>
              <LivelyWord words={words} width={mobile ? 0.84 : 0.5} position={[mobile ? 0 : -w * 0.01, mobile ? -h * 0.02 : h * 0.04, 0]} />
              <LivelyArrow position={[mobile ? w * 0.3 : w * 0.36, mobile ? -h * 0.17 : -h * 0.17, 0.5]} size={mobile ? 0.6 : 0.95} />
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
              <LivelyWord words={words} width={mobile ? 0.95 : 0.7} position={[0, mobile ? -h * 0.06 : -h * 0.1, 0]} onPress={onPress} />
            </>
          )}
        </Positioned>
      </Canvas>
    </div>
  );
}
