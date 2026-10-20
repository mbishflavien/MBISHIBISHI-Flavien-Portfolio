import * as THREE from 'three';

// Die-cut stickers drawn for this site. Each is 256x256; the white border comes from the filter.
const ART: string[] = [
  // code tag
  `<rect x="38" y="70" width="180" height="116" rx="26" fill="#111318"/>
   <path d="M98 100 L70 128 L98 156 M158 100 L186 128 L158 156" stroke="#d4ff3a" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M138 92 L118 164" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>`,
  // heart with a pulse
  `<path d="M128 214 C 60 168 30 132 30 96 C 30 64 54 42 84 42 C 104 42 120 54 128 70 C 136 54 152 42 172 42 C 202 42 226 64 226 96 C 226 132 196 168 128 214 Z" fill="#ff4d6d"/>
   <path d="M44 120 H92 L106 92 L124 150 L140 106 L150 120 H210" stroke="#fff" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  // pill capsule
  `<g transform="rotate(-35 128 128)">
     <path d="M128 78 H178 A50 50 0 0 1 178 178 H128 Z" fill="#ffffff"/>
     <path d="M128 78 H78 A50 50 0 0 0 78 178 H128 Z" fill="#ff7a1a"/>
     <path d="M70 100 A30 30 0 0 0 64 128" stroke="#ffd2ad" stroke-width="10" fill="none" stroke-linecap="round"/>
     <path d="M128 78 V178" stroke="#e8e8ee" stroke-width="4"/>
   </g>`,
  // GPU chip
  `<g fill="#9aa3b2">${[0, 1, 2, 3, 4].map((i) => `<rect x="${68 + i * 26}" y="34" width="12" height="28" rx="4"/><rect x="${68 + i * 26}" y="194" width="12" height="28" rx="4"/><rect x="34" y="${68 + i * 26}" width="28" height="12" rx="4"/><rect x="194" y="${68 + i * 26}" width="28" height="12" rx="4"/>`).join('')}</g>
   <rect x="56" y="56" width="144" height="144" rx="22" fill="#2b2f38"/>
   <rect x="80" y="80" width="96" height="96" rx="12" fill="#76b900"/>
   <text x="128" y="140" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="34" fill="#111">GPU</text>`,
  // robot face
  `<path d="M128 30 V54" stroke="#111" stroke-width="10" stroke-linecap="round"/><circle cx="128" cy="28" r="12" fill="#ff4d6d"/>
   <rect x="42" y="56" width="172" height="150" rx="40" fill="#ffd23f"/>
   <rect x="66" y="88" width="124" height="70" rx="26" fill="#111318"/>
   <circle cx="100" cy="122" r="13" fill="#d4ff3a"/><circle cx="156" cy="122" r="13" fill="#d4ff3a"/>
   <path d="M104 180 Q128 196 152 180" stroke="#111" stroke-width="9" fill="none" stroke-linecap="round"/>`,
  // speech bubble
  `<path d="M40 60 Q40 40 60 40 H196 Q216 40 216 60 V146 Q216 166 196 166 H112 L70 206 L80 166 H60 Q40 166 40 146 Z" fill="#2a40ff"/>
   <text x="128" y="118" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-weight="700" font-size="42" fill="#fff">muraho!</text>`,
  // coffee
  `<path d="M96 40 Q86 56 96 70 Q106 84 96 98 M132 40 Q122 56 132 70 Q142 84 132 98" stroke="#c9ccd4" stroke-width="9" fill="none" stroke-linecap="round"/>
   <path d="M52 108 H188 L176 206 Q174 220 160 220 H80 Q66 220 64 206 Z" fill="#ff7a1a"/>
   <path d="M186 128 Q226 128 222 160 Q218 188 180 186" stroke="#ff7a1a" stroke-width="16" fill="none"/>
   <rect x="52" y="104" width="136" height="16" rx="8" fill="#7a3b12"/>`,
  // bug
  `<g stroke="#111" stroke-width="9" stroke-linecap="round"><path d="M70 110 L40 96 M66 146 L34 146 M70 182 L42 200 M186 110 L216 96 M190 146 L222 146 M186 182 L214 200 M108 62 L92 38 M148 62 L164 38"/></g>
   <ellipse cx="128" cy="146" rx="64" ry="78" fill="#ff3b3b"/>
   <path d="M128 70 V222" stroke="#111" stroke-width="8"/>
   <circle cx="100" cy="128" r="12" fill="#111"/><circle cx="156" cy="160" r="12" fill="#111"/><circle cx="104" cy="186" r="10" fill="#111"/>
   <circle cx="128" cy="72" r="30" fill="#111"/>`,
  // 200 OK
  `<circle cx="128" cy="128" r="96" fill="#2a40ff"/>
   <circle cx="128" cy="128" r="80" fill="none" stroke="#d4ff3a" stroke-width="6" stroke-dasharray="10 9"/>
   <text x="128" y="128" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="52" fill="#fff">200</text>
   <text x="128" y="168" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="30" fill="#d4ff3a">OK</text>`,
  // terminal
  `<rect x="34" y="54" width="188" height="148" rx="20" fill="#e9ecf2"/>
   <rect x="34" y="54" width="188" height="34" rx="16" fill="#c9ced8"/>
   <circle cx="58" cy="71" r="7" fill="#ff5f57"/><circle cx="80" cy="71" r="7" fill="#febc2e"/><circle cx="102" cy="71" r="7" fill="#28c840"/>
   <path d="M64 122 L92 144 L64 166" stroke="#111" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
   <rect x="108" y="158" width="52" height="12" rx="6" fill="#2a40ff"/>`,
  // 400+ solved
  `<path d="M128 22 L152 48 L186 40 L190 74 L222 90 L206 120 L222 150 L190 166 L186 200 L152 192 L128 218 L104 192 L70 200 L66 166 L34 150 L50 120 L34 90 L66 74 L70 40 L104 48 Z" fill="#d4ff3a"/>
   <text x="128" y="130" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="54" fill="#111">400+</text>
   <text x="128" y="164" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="22" fill="#111">SOLVED</text>`,
  // clap sound wave
  `<rect x="30" y="58" width="196" height="140" rx="70" fill="#111318"/>
   ${[18, 44, 70, 34, 86, 52, 24].map((h, i) => `<rect x="${62 + i * 20}" y="${128 - h / 2}" width="12" height="${h}" rx="6" fill="${i % 2 ? '#d4ff3a' : '#36e1ff'}"/>`).join('')}`,
];

const SIZE = 256;
const COLS = 4;

function stickerSvg(art: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="-16 -16 288 288">
    <defs><filter id="cut" x="-10%" y="-10%" width="120%" height="120%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="11" result="d"/>
      <feFlood flood-color="#ffffff"/><feComposite in2="d" operator="in" result="border"/>
      <feGaussianBlur in="d" stdDeviation="3" result="sb"/><feOffset in="sb" dy="4" result="so"/>
      <feFlood flood-color="#000" flood-opacity="0.28"/><feComposite in2="so" operator="in" result="shadow"/>
      <feMerge><feMergeNode in="shadow"/><feMergeNode in="border"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter></defs>
    <g filter="url(#cut)">${art}</g></svg>`;
}

// Packs every sticker into one canvas texture; returns it with each sticker's UV rectangle.
export async function stickerAtlas() {
  const rows = Math.ceil(ART.length / COLS);
  const canvas = document.createElement('canvas');
  canvas.width = SIZE * COLS;
  canvas.height = SIZE * rows;
  const ctx = canvas.getContext('2d')!;
  await Promise.all(ART.map((art, i) => new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, (i % COLS) * SIZE, Math.floor(i / COLS) * SIZE, SIZE, SIZE);
      resolve();
    };
    img.onerror = () => resolve();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(stickerSvg(art))}`;
  })));
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const rects = ART.map((_, i) => new THREE.Vector4(
    (i % COLS) / COLS,
    1 - (Math.floor(i / COLS) + 1) / rows,
    1 / COLS,
    1 / rows,
  ));
  return { texture, rects, count: ART.length };
}
