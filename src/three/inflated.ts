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

const geometryCache = new Map<string, THREE.BufferGeometry>();

// A puffy word: extruded glyphs with a deep rounded bevel and smoothed normals so it reads as inflated.
export function inflatedTextGeometry(font: Font, text: string) {
  const key = text;
  const cached = geometryCache.get(key);
  if (cached) return cached;
  let g: THREE.BufferGeometry = new TextGeometry(text, {
    font,
    size: 1,
    depth: 0.02,
    curveSegments: 12,
    bevelEnabled: true,
    // a small flat face and a deep, many-step bevel read as a smooth round tube
    bevelThickness: 0.2,
    bevelSize: 0.1,
    bevelOffset: -0.012,
    bevelSegments: 14,
  });
  g.deleteAttribute('uv');
  g = mergeVertices(g, 1e-3);
  g.computeVertexNormals();
  g.center();
  g.computeBoundingBox();
  geometryCache.set(key, g);
  return g;
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
    depth: 0.08, bevelEnabled: true, bevelThickness: 0.16, bevelSize: 0.1, bevelSegments: 12, curveSegments: 8,
  });
  g = mergeVertices(g, 1e-3);
  g.computeVertexNormals();
  g.center();
  return g;
}

/* ---------- The material: glossy, clear-coated, a little iridescent, and alive ---------- */
export interface LivelyUniforms {
  uTime: { value: number };
  uPoke: { value: THREE.Vector3 };
  uPokeAmt: { value: number };
  uWaveOrigin: { value: THREE.Vector3 };
  uWaveTime: { value: number };
  uWaveAmp: { value: number };
  uWobble: { value: number };
}

export function livelyMaterial(colour = '#2a40ff') {
  const uniforms: LivelyUniforms = {
    uTime: { value: 0 },
    uPoke: { value: new THREE.Vector3(999, 999, 999) },
    uPokeAmt: { value: 0 },
    uWaveOrigin: { value: new THREE.Vector3() },
    uWaveTime: { value: 99 },
    uWaveAmp: { value: 0 },
    uWobble: { value: 1 },
  };
  const m = new THREE.MeshPhysicalMaterial({
    color: colour,
    roughness: 0.2,
    metalness: 0.0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
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
        // slow jelly wobble
        float wob = (sin(position.x * 3.1 + uTime * 1.9) + sin(position.y * 4.3 - uTime * 1.4)) * 0.012 * uWobble;
        // the pointer presses a soft bulge into the surface
        float dp = distance(position, uPoke);
        float bulge = uPokeAmt * 0.09 * exp(-dp * dp * 7.0);
        // a click sends a ripple outward
        float dw = distance(position, uWaveOrigin);
        float front = uWaveTime * 3.2;
        float ring = sin((dw - front) * 9.0) * exp(-abs(dw - front) * 3.0) * exp(-uWaveTime * 1.4);
        float wave = uWaveAmp * 0.07 * ring * step(dw, front + 0.4);
        transformed += objectNormal * (wob + bulge + wave);`
      );
  };
  m.customProgramCacheKey = () => 'lively-v1';
  return { material: m, uniforms };
}
