import * as THREE from 'three';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/* ---------- The script font, converted once by scripts/make-typeface.mjs ---------- */
let fontPromise: Promise<Font> | null = null;
export function loadScriptFont() {
  fontPromise ??= fetch('/fonts/damion.typeface.json')
    .then((r) => r.json())
    .then((json) => new FontLoader().parse(json));
  return fontPromise;
}

const SIZE = 1;
const glyphCache = new Map<string, THREE.BufferGeometry | null>();

// One puffy letter: a small flat face and a deep, many-step bevel read as a smooth round tube.
function letterGeometry(font: Font, ch: string) {
  if (glyphCache.has(ch)) return glyphCache.get(ch)!;
  if (ch.trim() === '') { glyphCache.set(ch, null); return null; }
  let g: THREE.BufferGeometry = new TextGeometry(ch, {
    font,
    size: SIZE,
    depth: 0.02,
    curveSegments: 14,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: -0.012,
    bevelSegments: 14,
  });
  g.deleteAttribute('uv');
  g = mergeVertices(g, 1e-3);
  g.computeVertexNormals();
  g.computeBoundingBox();
  glyphCache.set(ch, g);
  return g;
}

export interface Letter { geometry: THREE.BufferGeometry; x: number; ch: string }

// Lays a word out letter by letter with the font's own advances, centred on the origin.
export function layoutWord(font: Font, text: string) {
  const data = font.data as unknown as { resolution: number; glyphs: Record<string, { ha: number }>; boundingBox: { yMin: number; yMax: number } };
  const scale = SIZE / data.resolution;
  const letters: Letter[] = [];
  let x = 0, minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity;
  for (const ch of text) {
    const g = letterGeometry(font, ch);
    if (g?.boundingBox) {
      letters.push({ geometry: g, x, ch });
      minX = Math.min(minX, x + g.boundingBox.min.x); maxX = Math.max(maxX, x + g.boundingBox.max.x);
      minY = Math.min(minY, g.boundingBox.min.y); maxY = Math.max(maxY, g.boundingBox.max.y);
    }
    x += (data.glyphs[ch]?.ha ?? data.glyphs['n']?.ha ?? 500) * scale;
  }
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  for (const l of letters) l.x -= cx;
  return { letters, width: maxX - minX, height: maxY - minY, offsetY: -cy };
}

// The cursor arrow as a pillowy extruded shape.
export function arrowGeometry() {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.lineTo(1.0, -0.38);
  s.lineTo(0.52, -0.5);
  s.lineTo(0.36, -0.98);
  s.closePath();
  let g: THREE.BufferGeometry = new THREE.ExtrudeGeometry(s, {
    depth: 0.08, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.12, bevelSegments: 14, curveSegments: 8,
  });
  g = mergeVertices(g, 1e-3);
  g.computeVertexNormals();
  g.center();
  return g;
}

/* ---------- The material: glossy, clear-coated, glowing at its edges, and alive ---------- */
export interface LivelyUniforms {
  uTime: { value: number };
  uPoke: { value: THREE.Vector3 };
  uPokeAmt: { value: number };
  uWaveOrigin: { value: THREE.Vector3 };
  uWaveTime: { value: number };
  uWaveAmp: { value: number };
  uWobble: { value: number };
  uRim: { value: THREE.Color };
}

export function livelyMaterial(colour = '#2b44ff') {
  const uniforms: LivelyUniforms = {
    uTime: { value: 0 },
    uPoke: { value: new THREE.Vector3(999, 999, 999) },
    uPokeAmt: { value: 0 },
    uWaveOrigin: { value: new THREE.Vector3() },
    uWaveTime: { value: 99 },
    uWaveAmp: { value: 0 },
    uWobble: { value: 1 },
    uRim: { value: new THREE.Color('#5d7bff') },
  };
  const m = new THREE.MeshPhysicalMaterial({
    color: colour,
    roughness: 0.18,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    iridescence: 0.3,
    iridescenceIOR: 1.35,
    iridescenceThicknessRange: [180, 620],
    sheen: 0.15,
    sheenColor: new THREE.Color('#8fb4ff'),
    sheenRoughness: 0.4,
    envMapIntensity: 1.45,
  });
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform float uTime, uPokeAmt, uWaveTime, uWaveAmp, uWobble;
        uniform vec3 uPoke, uWaveOrigin;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        // Measured in world space so a poke or a ripple flows across separate letters.
        vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
        float wob = (sin(wp.x * 1.6 + uTime * 1.9) + sin(wp.y * 2.2 - uTime * 1.4)) * 0.012 * uWobble;
        float dp = distance(wp, uPoke);
        float bulge = uPokeAmt * 0.14 * exp(-dp * dp * 2.2);
        float dw = distance(wp, uWaveOrigin);
        float front = uWaveTime * 4.0;
        float ring = sin((dw - front) * 5.0) * exp(-abs(dw - front) * 1.6) * exp(-uWaveTime * 1.3);
        float wave = uWaveAmp * 0.08 * ring * step(dw, front + 0.6);
        transformed += objectNormal * (wob + bulge + wave);`
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform vec3 uRim;`)
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        // Light gathers at the edges, as in something soft and slightly translucent.
        float fres = pow(1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0), 2.6);
        totalEmissiveRadiance += uRim * fres * 0.85;`
      );
  };
  m.customProgramCacheKey = () => 'lively-v2';
  return { material: m, uniforms };
}
