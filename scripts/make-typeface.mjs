// Converts the Damion script font into three.js typeface JSON, keeping only the glyphs the 3D words use.
// Run: node scripts/make-typeface.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

const KEEP = new Set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'’-!. ");
const buf = readFileSync('scripts/fonts/Damion-Regular.ttf');
const json = new TTFLoader().parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
for (const ch of Object.keys(json.glyphs)) if (!KEEP.has(ch)) delete json.glyphs[ch];
writeFileSync('public/fonts/damion.typeface.json', JSON.stringify(json));
console.log('glyphs:', Object.keys(json.glyphs).length, 'resolution:', json.resolution);
