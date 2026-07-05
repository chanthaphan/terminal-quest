/* Terminal Quest — declarative 3D theme data (Octopath-style dioramas).
   Mirrors the DOM stage's `T` config, translated to a 3D scene description:
     sky.stops   vertical gradient for the sky dome
     fog         { color, near, far } depth haze (THREE.Fog)
     ambient     { color, i } fill light
     sun         { dir:[x,y,z], color, i } directional key light
     ground      [ { z, y, w, d, tex, tint, emissive?, ei? } ] stacked tiers
     props       [ { kind, ...params } ] prop-primitive instances
     particles   { kind, color, n, box:[w,h,d], vel:[x,y,z], gravity? }
     grade       { lift:[r,g,b], gain:[r,g,b] } per-theme color grade (post, M5)

   M1: `bash` is fully authored; the other realms carry sky/fog/ambient/ground and
   a light or two so each reads distinctly. M2 fills in their full prop sets. */

const flag = (z, y, w, d, tint) => ({ z, y, w, d, tex: 'flagstone', tint });

export const T3 = {
  menu: {
    sky: { stops: [[0, '#0a0d2a'], [0.55, '#1a1f4d'], [1, '#2a2154']] },
    fog: { color: '#0a0d2a', near: 12, far: 46 },
    ambient: { color: '#8890c0', i: 0.6 },
    sun: { dir: [-0.3, -1, -0.3], color: '#c8d0ff', i: 0.4 },
    celestial: { x: 8, y: 9, z: -22, size: 3.2, color: '#e8ecff', glow: '#bec8ff' },
    ground: [{ z: 0, y: 0, w: 34, d: 12, tex: 'rock', tint: '#221c3a' }, { z: -9, y: 0.6, w: 40, d: 8, tex: 'rock', tint: '#171128' }],
    props: [{ kind: 'tower', x: -8, z: -10, h: 8, w: 2.4, tex: 'brick', tint: '#1c2250' }],
    particles: { kind: 'stars', color: '#f0f4ff', n: 60, box: [40, 16, 20], vel: [0, 0, 0] },
    grade: { lift: [0, 0, 0.02], gain: [0.95, 0.98, 1.1] },
  },

  bash: {
    sky: { stops: [[0, '#241809'], [0.55, '#4a3116'], [1, '#6b4820']] },
    fog: { color: '#2a1c0c', near: 10, far: 40 },
    ambient: { color: '#8a5a2a', i: 0.55 },
    sun: { dir: [-0.35, -1, -0.25], color: '#ffd9a0', i: 0.4 },
    ground: [flag(1.5, 0, 30, 9, '#4a341a'), flag(-7, 0.7, 34, 8, '#39260f'), { z: -14, y: 1.6, w: 40, d: 10, tex: 'dirt', tint: '#2a1c0b' }],
    props: [
      { kind: 'pillar', x: -7.5, z: -6, h: 7.5, r: 0.8, tex: 'sandstone', tint: '#6b5330' },
      { kind: 'pillar', x: -3.6, z: -7, h: 7.5, r: 0.8, tex: 'sandstone', tint: '#6b5330' },
      { kind: 'pillar', x: 4.6, z: -7, h: 8.2, r: 0.9, tex: 'sandstone', tint: '#6b5330' },
      { kind: 'pillar', x: 8.4, z: -6, h: 7.5, r: 0.8, tex: 'sandstone', tint: '#6b5330' },
      { kind: 'arch', x: 0.5, z: -10.5, w: 6, h: 6.4, tex: 'sandstone', tint: '#5c4626' },
      { kind: 'ruinWall', x: 12, z: -4, w: 4, h: 2.6, tex: 'flagstone', tint: '#3a2a14' },
      { kind: 'ruinWall', x: -12.5, z: -4, w: 4, h: 2.2, tex: 'flagstone', tint: '#3a2a14' },
      { kind: 'torch', x: -5.5, z: -3.2, h: 2.3, color: '#ffa032', i: 2.4, dist: 9, flicker: true },
      { kind: 'torch', x: 3.8, z: -3.6, h: 2.3, color: '#ffa032', i: 2.2, dist: 9, flicker: true },
      { kind: 'torch', x: 9.2, z: -8.5, h: 2.6, color: '#ffbe5a', i: 1.6, dist: 8, flicker: true },
    ],
    particles: { kind: 'motes', color: '#fcd34d', n: 48, box: [22, 7, 14], vel: [0, 0.12, 0] },
    grade: { lift: [0.02, 0.01, 0], gain: [1.07, 1.0, 0.9] },
  },

  remote: {
    sky: { stops: [[0, '#050a1e'], [0.6, '#0b1638'], [1, '#14224e']] },
    fog: { color: '#080e1e', near: 11, far: 44 },
    ambient: { color: '#4a5a80', i: 0.5 },
    sun: { dir: [0.4, -1, -0.2], color: '#aac2ff', i: 0.35 },
    celestial: { x: -9, y: 9, z: -22, size: 2.6, color: '#dfe8ff', glow: '#aac3ff' },
    ground: [{ z: 1, y: 0, w: 32, d: 10, tex: 'metalPlate', tint: '#101c36' }, { z: -8, y: 0.5, w: 38, d: 8, tex: 'metalPlate', tint: '#0c1428' }],
    props: [
      { kind: 'tower', x: -9, z: -9, h: 7, w: 1.6, tex: 'metalPlate', tint: '#1e3260', windows: '#4a90d0' },
      { kind: 'tower', x: 9, z: -10, h: 8, w: 1.6, tex: 'metalPlate', tint: '#1e3260', windows: '#4a90d0' },
      { kind: 'torch', x: 0, z: -7, h: 2.4, color: '#3aa0d0', i: 1.6, dist: 10, flicker: false },
    ],
    particles: { kind: 'stars', color: '#dfe8ff', n: 50, box: [40, 16, 20], vel: [0, 0, 0] },
    grade: { lift: [0, 0, 0.03], gain: [0.9, 0.96, 1.12] },
  },

  concepts: {
    sky: { stops: [[0, '#08251c'], [0.6, '#124a38'], [1, '#1a6a4e']] },
    fog: { color: '#092418', near: 10, far: 40 },
    ambient: { color: '#3a8060', i: 0.55 },
    sun: { dir: [-0.2, -1, -0.3], color: '#8affc0', i: 0.4 },
    ground: [{ z: 1.5, y: 0, w: 30, d: 10, tex: 'grass', tint: '#14452f' }, { z: -8, y: 0.6, w: 36, d: 8, tex: 'grass', tint: '#0d3222' }],
    props: [
      { kind: 'ruinWall', x: -10, z: -6, w: 6, h: 4, tex: 'brick', tint: '#0d382a' },
      { kind: 'ruinWall', x: 10, z: -6, w: 5, h: 3.4, tex: 'brick', tint: '#0d382a' },
      { kind: 'crystal', x: 0, z: -7, h: 3, color: '#50e6a0' },
      { kind: 'torch', x: 0, z: -5, h: 2.2, color: '#50e6a0', i: 1.8, dist: 10, flicker: true },
    ],
    particles: { kind: 'mist', color: '#8affc0', n: 10, box: [24, 5, 14], vel: [0.05, 0, 0] },
    grade: { lift: [0, 0.02, 0], gain: [0.95, 1.08, 0.98] },
  },

  azure: {
    sky: { stops: [[0, '#0b2b57'], [0.55, '#155a9e'], [1, '#3f8fd0']] },
    fog: { color: '#123a63', near: 12, far: 48 },
    ambient: { color: '#6a9ad0', i: 0.6 },
    sun: { dir: [0.4, -1, -0.2], color: '#fff4d6', i: 0.55 },
    celestial: { x: 10, y: 9, z: -24, size: 3.4, color: '#fff4d6', glow: '#ffebaa' },
    ground: [{ z: 1.5, y: 0, w: 30, d: 10, tex: 'sandstone', tint: '#1c4a7a' }, { z: -8, y: 0.6, w: 36, d: 8, tex: 'sandstone', tint: '#123256' }],
    props: [
      { kind: 'tower', x: -7, z: -8, h: 8, w: 2, tex: 'sandstone', tint: '#0e3560', windows: '#ffe089' },
      { kind: 'tower', x: 7, z: -9, h: 6.5, w: 1.8, tex: 'sandstone', tint: '#12406e', windows: '#ffe089' },
    ],
    particles: { kind: 'motes', color: '#f0f4ff', n: 30, box: [22, 8, 14], vel: [0, 0.1, 0] },
    grade: { lift: [0.02, 0.02, 0.02], gain: [1.05, 1.02, 0.98] },
  },

  k8s: {
    sky: { stops: [[0, '#10102e'], [0.6, '#221e58'], [1, '#2e2578']] },
    fog: { color: '#100c30', near: 11, far: 44 },
    ambient: { color: '#5a5aa0', i: 0.55 },
    sun: { dir: [-0.3, -1, -0.25], color: '#b0a0ff', i: 0.4 },
    ground: [{ z: 1.5, y: 0, w: 30, d: 10, tex: 'metalPlate', tint: '#241e60' }, { z: -8, y: 0.6, w: 36, d: 8, tex: 'metalPlate', tint: '#161042' }],
    props: [
      { kind: 'tower', x: -8, z: -9, h: 7, w: 2, tex: 'metalPlate', tint: '#1c1748', windows: '#6a9aff' },
      { kind: 'crystal', x: 5, z: -7, h: 2.6, color: '#7a6aff' },
      { kind: 'crystal', x: 8, z: -8, h: 2, color: '#8c7aff' },
      { kind: 'torch', x: -6, z: -5, h: 2.2, color: '#5a96ff', i: 1.8, dist: 10, flicker: true },
    ],
    particles: { kind: 'bits', color: '#67e8f9', n: 40, box: [22, 8, 14], vel: [0, 0.2, 0] },
    grade: { lift: [0.01, 0, 0.03], gain: [0.96, 0.96, 1.1] },
  },

  git: {
    sky: { stops: [[0, '#241028'], [0.55, '#4d1e33'], [1, '#7a3524']] },
    fog: { color: '#160d12', near: 10, far: 42 },
    ambient: { color: '#8a5a4a', i: 0.55 },
    sun: { dir: [0.35, -1, -0.25], color: '#ffcf9e', i: 0.45 },
    celestial: { x: 8, y: 8, z: -22, size: 3.8, color: '#ffcf9e', glow: '#ffaa5a' },
    ground: [{ z: 1.5, y: 0, w: 30, d: 10, tex: 'dirt', tint: '#33202a' }, { z: -8, y: 0.6, w: 36, d: 8, tex: 'dirt', tint: '#1e1219' }],
    props: [
      { kind: 'tree', x: -9, z: -7, h: 6, color: '#361c30' },
      { kind: 'tree', x: 9, z: -8, h: 5, color: '#2e1828' },
      { kind: 'crystal', x: 4, z: -6, h: 2.2, color: '#ff9a6a' },
    ],
    particles: { kind: 'fireflies', color: '#d9ff6e', n: 16, box: [22, 7, 14], vel: [0.03, 0.05, 0] },
    grade: { lift: [0.03, 0.01, 0], gain: [1.08, 0.98, 0.92] },
  },

  docker: {
    sky: { stops: [[0, '#1e0a10'], [0.55, '#48141a'], [1, '#7a2418']] },
    fog: { color: '#240c05', near: 8, far: 38 },
    ambient: { color: '#5a1e14', i: 0.45 },
    sun: { dir: [-0.3, -1, -0.2], color: '#ff9060', i: 0.4 },
    ground: [{ z: 1.5, y: 0, w: 30, d: 9, tex: 'metalPlate', tint: '#54200e' }, { z: -6, y: 0.5, w: 34, d: 8, tex: 'metalPlate', tint: '#3a1510' }, { z: -8, y: 0.5, w: 5, d: 5, tex: 'lava', tint: '#ff7823', emissive: '#ff7823', ei: 1.2 }],
    props: [
      { kind: 'crate', x: -9, z: -5, n: 4, s: 1.3, tex: 'container', tints: ['#7a2418', '#8a4a1a', '#5a3a6a'] },
      { kind: 'crate', x: 9, z: -6, n: 5, s: 1.3, tex: 'container', tints: ['#7a2418', '#1a4a6a', '#8a4a1a'] },
      { kind: 'chimney', x: -12, z: -9, h: 9, tex: 'brick', tint: '#331010', emberTop: true },
      { kind: 'tower', x: 5, z: -11, h: 8, w: 3, tex: 'metalPlate', tint: '#421512', windows: '#ff8c3a' },
      { kind: 'torch', x: -4, z: -3.6, h: 2.2, color: '#ff7823', i: 2.6, dist: 10, flicker: true },
      { kind: 'beacon', x: 0, z: -8, color: '#ff5a19', i: 2.2, dist: 13, flicker: true },
    ],
    particles: { kind: 'embers', color: '#ff8c3a', n: 70, box: [22, 8, 14], vel: [0, 0.55, 0], gravity: -0.1 },
    grade: { lift: [0.03, 0, 0], gain: [1.1, 0.96, 0.9] },
  },

  ops: {
    sky: { stops: [[0, '#0a2410'], [0.55, '#14481e'], [1, '#1e662a']] },
    fog: { color: '#0a240e', near: 10, far: 42 },
    ambient: { color: '#3a8040', i: 0.55 },
    sun: { dir: [0.3, -1, -0.25], color: '#8aff9a', i: 0.4 },
    ground: [{ z: 1.5, y: 0, w: 30, d: 10, tex: 'grass', tint: '#164a20' }, { z: -8, y: 0.6, w: 36, d: 8, tex: 'grass', tint: '#0e3316' }],
    props: [
      { kind: 'tower', x: -9, z: -8, h: 6.5, w: 2, tex: 'brick', tint: '#103a16', windows: '#6dff9e' },
      { kind: 'crystal', x: 7, z: -7, h: 2.6, color: '#64ff82' },
      { kind: 'torch', x: 0, z: -5, h: 2.2, color: '#64ff82', i: 1.8, dist: 10, flicker: true },
    ],
    particles: { kind: 'motes', color: '#6dff9e', n: 34, box: [22, 8, 14], vel: [0, 0.12, 0] },
    grade: { lift: [0, 0.02, 0], gain: [0.95, 1.08, 0.96] },
  },

  final: {
    sky: { stops: [[0, '#160a26'], [0.55, '#3c1c68'], [1, '#5c2c96']] },
    fog: { color: '#1a1030', near: 11, far: 46 },
    ambient: { color: '#7a5aa0', i: 0.55 },
    sun: { dir: [0, -1, -0.3], color: '#d8a0ff', i: 0.45 },
    ground: [{ z: 1.5, y: 0, w: 32, d: 11, tex: 'flagstone', tint: '#3a2458' }, { z: -9, y: 0.7, w: 38, d: 9, tex: 'flagstone', tint: '#241640' }],
    props: [
      { kind: 'pillar', x: -8, z: -7, h: 8.5, r: 0.8, tex: 'flagstone', tint: '#2a1548' },
      { kind: 'pillar', x: 8, z: -7, h: 8.5, r: 0.8, tex: 'flagstone', tint: '#2a1548' },
      { kind: 'arch', x: 0, z: -10, w: 6, h: 6.4, tex: 'flagstone', tint: '#341d58' },
      { kind: 'beacon', x: 0, z: -6, color: '#c882ff', i: 2.2, dist: 14, flicker: true },
    ],
    particles: { kind: 'motes', color: '#e0b0ff', n: 40, box: [24, 9, 14], vel: [0, 0.14, 0] },
    grade: { lift: [0.02, 0, 0.03], gain: [1.04, 0.96, 1.1] },
  },

  void: {
    sky: { stops: [[0, '#020208'], [0.55, '#12061e'], [1, '#2a0a2e']] },
    fog: { color: '#08030c', near: 9, far: 40 },
    ambient: { color: '#4a2a5a', i: 0.5 },
    sun: { dir: [0, -1, -0.2], color: '#c060ff', i: 0.35 },
    celestial: { x: 0, y: 10, z: -24, size: 4, color: '#2a0a2e', glow: '#be3cff' },
    ground: [{ z: 1.5, y: 0, w: 32, d: 11, tex: 'rock', tint: '#1c0a24' }, { z: -9, y: 0.7, w: 38, d: 9, tex: 'rock', tint: '#0e0514' }],
    props: [
      { kind: 'crystal', x: -9, z: -9, h: 3.4, color: '#be3cff' },
      { kind: 'crystal', x: 9, z: -10, h: 3, color: '#ff3c6a' },
      { kind: 'crystal', x: -6, z: -11, h: 2.4, color: '#3cdca0' },
      { kind: 'crystal', x: 6, z: -12, h: 2.6, color: '#8c60ff' },
      { kind: 'beacon', x: 0, z: -11, color: '#be3cff', i: 2.4, dist: 15, flicker: true },
    ],
    particles: { kind: 'fireflies', color: '#d060ff', n: 18, box: [24, 9, 14], vel: [0.03, 0.05, 0] },
    grade: { lift: [0.02, 0, 0.03], gain: [1.05, 0.92, 1.12] },
  },

  sandbox: {
    sky: { stops: [[0, '#12295e'], [0.45, '#2e5f9e'], [0.85, '#e8955e'], [1, '#f0b06a']] },
    fog: { color: '#1d4668', near: 12, far: 50 },
    ambient: { color: '#c08a6a', i: 0.65 },
    sun: { dir: [0, -0.7, -0.3], color: '#ffdf9e', i: 0.6 },
    celestial: { x: 0, y: 4, z: -26, size: 4.4, color: '#ffdf9e', glow: '#ffc86e' },
    ground: [{ z: 1.5, y: 0, w: 32, d: 11, tex: 'sand', tint: '#1d4668' }, { z: -9, y: 0.6, w: 38, d: 9, tex: 'sand', tint: '#123048' }],
    props: [{ kind: 'tower', x: -8, z: -9, h: 5, w: 2, tex: 'sandstone', tint: '#123048', windows: '#ffdf9e' }],
    particles: { kind: 'motes', color: '#ffe0b0', n: 26, box: [24, 8, 14], vel: [0.04, 0.08, 0] },
    grade: { lift: [0.03, 0.01, 0], gain: [1.08, 1.0, 0.94] },
  },
};

export function themeFor(id) { return T3[id] || T3.menu; }
