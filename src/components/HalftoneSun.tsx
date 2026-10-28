import { ShaderCanvas } from './ShaderCanvas';

// Halftone sunset for the contact section: a lime sun made of dots rises over a horizon as the section
// scrolls in, with retro cut lines sliding through its lower half and a rippling reflection below,
// where the footer sits. The glow thins into a faint dot grid; dots near the pointer swell a little.

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPtr;
uniform float uView;

void main() {
  float cell = max(uRes.y / 95.0, 5.0);
  vec2 c = (floor(gl_FragCoord.xy / cell) + 0.5) * cell;   // centre of this pixel's dot
  vec2 f = gl_FragCoord.xy - c;
  vec2 q = vec2((c.x - 0.5 * uRes.x) / uRes.y, c.y / uRes.y); // height units, origin at bottom centre

  float rise = smoothstep(0.05, 0.95, uView);
  // The sun sits on a horizon above the footer; below it lies a calm, darker reflection.
  float H = 0.3;
  float R = 0.3 * min(1.0, uRes.x / uRes.y * 1.15);
  vec2 sun = vec2(0.0, H + mix(-R, 0.04, rise) + 0.008 * sin(uTime * 0.35));
  float sky = step(H, q.y);
  vec2 s = q;
  s.y = sky > 0.5 ? q.y : 2.0 * H - q.y;                        // mirror below the horizon
  s.x += (1.0 - sky) * 0.012 * sin(q.y * 140.0 + uTime * 1.4);  // ripple in the reflection
  float d = length(s - sun);

  float disc = 1.0 - smoothstep(R - 0.01, R, d);
  // Retro cut lines: none at the top of the sun, widening toward the horizon, drifting down.
  float yIn = (s.y - sun.y) / R;
  float band = fract(s.y / R * 6.0 + uTime * 0.1);
  float gap = clamp((1.0 - yIn) * 0.5, 0.0, 0.62);
  disc *= step(gap, band);

  float glow = exp(-max(d - R, 0.0) * 6.0) * 0.4;
  float line = exp(-abs(q.y - H) * 90.0) * 0.5 * rise;           // a thin glowing horizon
  float I = max(disc * 0.85, glow);
  I *= sky > 0.5 ? 1.0 : 0.45 * smoothstep(H - 0.22, H, q.y);       // reflection fades into the dark
  I = max(I, line);
  I *= 0.94 + 0.06 * sin(d * 40.0 - uTime * 1.1);                  // slow heat shimmer
  vec2 ptr = vec2(uPtr.x, uPtr.y + 0.5);
  vec2 dp = q - ptr;
  I += 0.2 * exp(-dot(dp, dp) * 70.0);
  I *= 0.4 + 0.6 * rise;
  I = clamp(max(I, 0.045), 0.0, 1.0);
  disc *= sky;

  float r = 0.5 * cell * sqrt(I) * 0.96;
  float a = 1.0 - smoothstep(r - 0.8, r + 0.8, length(f));

  vec3 bg = vec3(0.039, 0.102, 0.525);     // #0a1a86
  vec3 dim = vec3(0.165, 0.267, 0.902);    // #2a44e6
  vec3 pale = vec3(0.62, 0.69, 1.0);
  vec3 lime = vec3(0.831, 1.0, 0.227);     // #d4ff3a
  vec3 col = mix(dim, pale, smoothstep(0.2, 0.55, I));
  col = mix(col, lime, max(disc, smoothstep(0.45, 0.8, I)));
  gl_FragColor = vec4(mix(bg, col, a), 1.0);
}`;

export function HalftoneSun({ className }: { className?: string }) {
  // Crisp dots need real pixels, capped so big screens stay cheap.
  const scale = Math.min(window.devicePixelRatio || 1, 1.5);
  return <ShaderCanvas frag={FRAG} scale={scale} timeOffset={10} className={className} />;
}
