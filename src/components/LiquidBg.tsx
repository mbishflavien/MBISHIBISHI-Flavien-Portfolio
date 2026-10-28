import { ShaderCanvas } from './ShaderCanvas';

// Slow liquid-chrome backdrop for the hero: deep blue folds with a pastel, iridescent sheen on the ridges.
// Soft folds hide a low resolution well, so it renders at 0.4x to keep weak GPUs cool.

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}
// Domain-warped field: long, folding ribbons like poured silk.
float field(vec2 p, float t) {
  vec2 q = vec2(fbm(p + vec2(0.0, t * 0.07)), fbm(p + vec2(5.2, 1.3) - t * 0.05));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 0.04), fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.06));
  return fbm(p + 2.6 * r);
}
vec3 iri(float t) { return 0.72 + 0.28 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67))); }

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // Stretch along a diagonal so the folds sweep, and let the pointer bend them a little.
  p = mat2(0.86, -0.5, 0.5, 0.86) * p * vec2(0.4, 0.95);
  vec2 d = p - uPtr;
  p += 0.06 * d * exp(-dot(d, d) * 3.0);
  float t = uTime;

  float e = 0.006;
  float h = field(p, t);
  float hx = field(p + vec2(e, 0.0), t);
  float hy = field(p + vec2(0.0, e), t);
  vec3 n = normalize(vec3((h - hx) / e * 0.24, (h - hy) / e * 0.24, 1.0));

  vec3 l = normalize(vec3(-0.4, 0.6, 0.7));
  float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 10.0);
  float rim = 1.0 - n.z;

  vec3 deep = vec3(0.039, 0.102, 0.525);   // #0a1a86
  vec3 mid = vec3(0.102, 0.184, 0.816);    // #1a2fd0
  vec3 col = mix(deep, mid, smoothstep(0.25, 0.8, h));
  col *= 0.85 + 0.3 * n.y;

  // Pastel chrome on the folds, kept soft so the hero stays blue.
  vec3 sheen = iri(h * 1.6 + rim * 2.0 + t * 0.03);
  col = mix(col, sheen, clamp(spec * 0.6 + rim * 1.5, 0.0, 0.5));

  // Darken the top and bottom bands where the text sits.
  float v = smoothstep(0.0, 0.32, uv.y) * smoothstep(1.0, 0.7, uv.y);
  col = mix(deep * 0.8, col, 0.45 + 0.55 * v);
  gl_FragColor = vec4(col, 1.0);
}`;

export function LiquidBg({ className }: { className?: string }) {
  return <ShaderCanvas frag={FRAG} scale={0.4} timeOffset={40} className={className} />;
}
