/* Terminal Quest — procedural texture factory for the WebGL stage.
   Everything is drawn to a <canvas> at runtime and wrapped in a THREE texture:
   no image files ship with the game. Stone/metal/etc. patterns are generated
   from a tint so themes stay declarative. Sprites reuse the existing char-matrix
   data (CLIQ.sprites) rasterized 1px-per-cell with NearestFilter for crisp pixels. */
import * as THREE from 'three';

// ---- tiny color helpers ----------------------------------------------------
function parseHex(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgb(c) { return `rgb(${c.r | 0},${c.g | 0},${c.b | 0})`; }
function shade(hex, amt) {
  // amt > 0 lightens toward white, amt < 0 darkens toward black
  const c = parseHex(hex);
  const t = amt < 0 ? 0 : 255;
  const p = Math.abs(amt);
  return rgb({ r: c.r + (t - c.r) * p, g: c.g + (t - c.g) * p, b: c.b + (t - c.b) * p });
}

function makeTexture(canvas, { repeat = false, nearest = false } = {}) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  if (nearest) { tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; }
  if (repeat) { tex.wrapS = tex.wrapT = THREE.RepeatWrapping; }
  return tex;
}

// A small seeded PRNG so textures are deterministic across context-loss rebuilds.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seedFrom(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

// ---- sky --------------------------------------------------------------------
export function skyTexture(stops, h = 512) {
  const cv = document.createElement('canvas');
  cv.width = 4; cv.height = h;
  const ctx = cv.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, h);
  for (const [pos, color] of stops) g.addColorStop(pos, color);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 4, h);
  return makeTexture(cv);
}

// ---- surface patterns -------------------------------------------------------
// kind ∈ flagstone|sandstone|dirt|rock|grass|sand|metalPlate|brick|plank|
//        container|lava  — tint sets the base color.
export function patternTexture(kind, tint, opts = {}) {
  const S = opts.size || 64;
  const cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const ctx = cv.getContext('2d');
  const rnd = mulberry32(seedFrom(kind + tint) ^ (opts.seed || 0));
  ctx.fillStyle = tint; ctx.fillRect(0, 0, S, S);

  const speckle = (density, lo, hi) => {
    for (let i = 0; i < density; i++) {
      const x = rnd() * S, y = rnd() * S, s = 1 + rnd() * 2;
      ctx.fillStyle = shade(tint, lo + rnd() * (hi - lo));
      ctx.fillRect(x, y, s, s);
    }
  };
  const grid = (cols, rows, mortar) => {
    ctx.strokeStyle = shade(tint, -0.4); ctx.lineWidth = mortar || 2;
    for (let i = 1; i < cols; i++) { ctx.beginPath(); ctx.moveTo((i / cols) * S, 0); ctx.lineTo((i / cols) * S, S); ctx.stroke(); }
    for (let j = 1; j < rows; j++) { ctx.beginPath(); ctx.moveTo(0, (j / rows) * S); ctx.lineTo(S, (j / rows) * S); ctx.stroke(); }
  };
  const brickRows = (rows, mortar) => {
    ctx.strokeStyle = shade(tint, -0.4); ctx.lineWidth = mortar || 2;
    const rh = S / rows;
    for (let j = 0; j <= rows; j++) {
      const y = j * rh; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(S, y); ctx.stroke();
      const off = (j % 2) * (S / 4);
      for (let x = off; x < S; x += S / 2) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + rh); ctx.stroke(); }
    }
  };

  switch (kind) {
    case 'flagstone': grid(3, 3, 3); speckle(120, -0.22, 0.12); break;
    case 'sandstone': for (let j = 0; j < 6; j++) { ctx.fillStyle = shade(tint, (j % 2 ? 0.06 : -0.08)); ctx.fillRect(0, (j / 6) * S, S, S / 6); } speckle(80, -0.15, 0.12); break;
    case 'brick': brickRows(5, 2); speckle(60, -0.15, 0.12); break;
    case 'dirt': speckle(300, -0.25, 0.15); break;
    case 'rock': speckle(220, -0.3, 0.2); grid(2, 2, 1); break;
    case 'grass': speckle(340, -0.2, 0.28); break;
    case 'sand': speckle(200, -0.1, 0.14); break;
    case 'metalPlate': grid(2, 2, 3); for (const [x, y] of [[6, 6], [S - 6, 6], [6, S - 6], [S - 6, S - 6], [S / 2, S / 2]]) { ctx.fillStyle = shade(tint, 0.25); ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill(); } speckle(40, -0.12, 0.12); break;
    case 'plank': for (let i = 0; i < 4; i++) { ctx.strokeStyle = shade(tint, -0.35); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo((i / 4) * S, 0); ctx.lineTo((i / 4) * S, S); ctx.stroke(); } speckle(90, -0.18, 0.1); break;
    case 'container': grid(1, 6, 3); speckle(40, -0.12, 0.1); break;
    case 'lava':
      ctx.fillStyle = shade(tint, -0.3); ctx.fillRect(0, 0, S, S);
      for (let i = 0; i < 26; i++) { ctx.fillStyle = shade(tint, 0.2 + rnd() * 0.5); const x = rnd() * S, y = rnd() * S, s = 2 + rnd() * 5; ctx.fillRect(x, y, s, s); }
      break;
    default: speckle(120, -0.2, 0.12);
  }
  return makeTexture(cv, { repeat: true });
}

// ---- sprite (char matrix → nearest texture) --------------------------------
export function spriteTexture(sprite) {
  const rows = sprite.px;
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  for (let y = 0; y < h; y++) {
    const row = rows[y];
    for (let x = 0; x < row.length; x++) {
      const c = sprite.palette[row[x]];
      if (!c) continue;
      ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1);
    }
  }
  const tex = makeTexture(cv, { nearest: true });
  tex.userData = { w, h };
  return tex;
}

// A hero "walk" variant: shift the bottom rows ±1px to fake a stride.
export function walkVariant(sprite) {
  const rows = sprite.px.slice();
  const h = rows.length;
  for (let y = h - 4; y < h; y++) {
    const r = rows[y];
    if (!r) continue;
    rows[y] = (y % 2 ? ' ' + r : r.slice(1) + ' ');
  }
  return spriteTexture({ px: rows, palette: sprite.palette });
}

// ---- glow disc (torch halos, particles, shadows) ---------------------------
export function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const S = 64;
  const cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, inner); g.addColorStop(1, outer);
  ctx.fillStyle = g; ctx.fillRect(0, 0, S, S);
  return makeTexture(cv);
}

// ---- shared value-noise (dissolve, M3) -------------------------------------
export function noiseTexture(size = 128) {
  const cv = document.createElement('canvas');
  cv.width = size; cv.height = size;
  const ctx = cv.getContext('2d');
  const img = ctx.createImageData(size, size);
  const rnd = mulberry32(0x9e3779b9);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (rnd() * 255) | 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const tex = makeTexture(cv, { repeat: true });
  return tex;
}

export { shade };
