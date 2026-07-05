/* Terminal Quest — builds a THREE scene graph from a 3D theme (themes3d.js).
   Sky dome + fog + tiered ground + a library of chunky, textured prop primitives
   lit by torch/beacon point lights, plus an ambient particle system. Everything
   created here is tracked and freed by dispose() so scene switches don't leak. */
import * as THREE from 'three';
import { skyTexture, patternTexture, glowTexture, shade } from './texgen.js';

export class SceneBundle {
  constructor(theme) {
    this.theme = theme;
    this.group = new THREE.Group();
    this._geos = [];
    this._mats = [];
    this._texs = [];
    this._flickers = [];   // { light, base, phase }
    this._particles = null;
    this.build();
  }

  _track(obj) {
    if (obj.geometry) this._geos.push(obj.geometry);
    if (obj.material) this._mats.push(obj.material);
    return obj;
  }
  _tex(t) { this._texs.push(t); return t; }

  _lit(geo, tex, tint, opts = {}) {
    const mat = new THREE.MeshLambertMaterial({ map: tex, color: new THREE.Color(tint || '#ffffff') });
    if (opts.emissive) { mat.emissive = new THREE.Color(opts.emissive); mat.emissiveIntensity = opts.ei || 1; }
    const m = new THREE.Mesh(geo, mat);
    this._geos.push(geo); this._mats.push(mat);
    return m;
  }

  build() {
    const th = this.theme;
    // ---- sky dome ----
    const skyTex = this._tex(skyTexture(th.sky.stops));
    const skyGeo = new THREE.SphereGeometry(70, 24, 16);
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, depthWrite: false });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    this._geos.push(skyGeo); this._mats.push(skyMat);
    this.group.add(sky);

    // ---- celestial disc (sun/moon), feeds bloom later ----
    if (th.celestial) {
      const c = th.celestial;
      const g = this._tex(glowTexture(c.glow || '#ffffff', 'rgba(0,0,0,0)'));
      const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: g, color: new THREE.Color(c.color), transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
      spr.scale.set(c.size * 3, c.size * 3, 1);
      spr.position.set(c.x, c.y, c.z);
      this._mats.push(spr.material);
      this.group.add(spr);
    }

    // ---- lights ----
    const amb = new THREE.AmbientLight(new THREE.Color(th.ambient.color), th.ambient.i);
    this.group.add(amb);
    if (th.sun) {
      const sun = new THREE.DirectionalLight(new THREE.Color(th.sun.color), th.sun.i);
      sun.position.set(-th.sun.dir[0] * 10, -th.sun.dir[1] * 10, -th.sun.dir[2] * 10);
      this.group.add(sun);
    }

    // ---- ground tiers ----
    for (const t of th.ground) {
      const tex = this._tex(patternTexture(t.tex, t.tint));
      const rep = Math.max(1, Math.round(t.w / 4));
      tex.repeat.set(rep, Math.max(1, Math.round(t.d / 4)));
      const geo = new THREE.BoxGeometry(t.w, 0.6, t.d);
      const m = this._lit(geo, tex, '#ffffff', t.emissive ? { emissive: t.emissive, ei: t.ei } : {});
      m.position.set(0, t.y - 0.3, t.z);
      this.group.add(m);
    }

    // ---- props ----
    for (const p of th.props) {
      const node = this.prop(p);
      if (node) this.group.add(node);
    }

    // ---- particles ----
    if (th.particles) this.buildParticles(th.particles);
  }

  // ---------- prop primitives ----------
  prop(p) {
    switch (p.kind) {
      case 'pillar': return this.pillar(p);
      case 'arch': return this.arch(p);
      case 'ruinWall': return this.box(p, p.w, p.h, 0.8);
      case 'tower': return this.tower(p);
      case 'crate': return this.crate(p);
      case 'chimney': return this.chimney(p);
      case 'crystal': return this.crystal(p);
      case 'tree': return this.tree(p);
      case 'torch': return this.torch(p);
      case 'beacon': return this.beacon(p);
      default: return null;
    }
  }

  _surfaceTex(kind, tint) { const t = this._tex(patternTexture(kind || 'rock', tint || '#555555')); return t; }

  box(p, w, h, d) {
    const tex = this._surfaceTex(p.tex, p.tint);
    tex.repeat.set(Math.max(1, Math.round(w / 2)), Math.max(1, Math.round(h / 2)));
    const g = new THREE.BoxGeometry(w, h, d);
    const m = this._lit(g, tex, '#ffffff');
    m.position.set(p.x, h / 2, p.z);
    return m;
  }

  pillar(p) {
    const grp = new THREE.Group();
    const tex = this._surfaceTex(p.tex, p.tint);
    tex.repeat.set(2, Math.max(2, Math.round(p.h / 2)));
    const shaft = this._lit(new THREE.CylinderGeometry(p.r, p.r * 1.1, p.h, 10), tex, '#ffffff');
    shaft.position.y = p.h / 2;
    grp.add(shaft);
    // cap + base
    const capTex = this._surfaceTex(p.tex, shade(p.tint || '#666', 0.1));
    const cap = this._lit(new THREE.BoxGeometry(p.r * 2.6, 0.5, p.r * 2.6), capTex, '#ffffff');
    cap.position.y = p.h; grp.add(cap);
    const base = this._lit(new THREE.BoxGeometry(p.r * 2.8, 0.5, p.r * 2.8), capTex, '#ffffff');
    base.position.y = 0.25; grp.add(base);
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  arch(p) {
    const grp = new THREE.Group();
    const legW = p.w * 0.18;
    for (const sx of [-1, 1]) {
      const leg = this.box({ x: sx * (p.w / 2 - legW / 2), z: 0, tex: p.tex, tint: p.tint }, legW, p.h, 0.9);
      grp.add(leg);
    }
    const top = this.box({ x: 0, z: 0, tex: p.tex, tint: p.tint }, p.w + legW, legW * 1.4, 1.0);
    top.position.y = p.h - legW * 0.7;
    grp.add(top);
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  tower(p) {
    const grp = new THREE.Group();
    const tex = this._surfaceTex(p.tex, p.tint);
    tex.repeat.set(2, Math.max(2, Math.round(p.h / 2)));
    const body = this._lit(new THREE.BoxGeometry(p.w, p.h, p.w), tex, '#ffffff');
    body.position.y = p.h / 2; grp.add(body);
    // roof
    const roof = this._lit(new THREE.ConeGeometry(p.w * 0.9, p.w, 4), this._surfaceTex('plank', shade(p.tint || '#555', -0.2)), '#ffffff');
    roof.position.y = p.h + p.w * 0.5; roof.rotation.y = Math.PI / 4; grp.add(roof);
    // glowing windows
    if (p.windows) {
      const wmat = new THREE.MeshBasicMaterial({ color: new THREE.Color(p.windows), fog: true });
      this._mats.push(wmat);
      for (let j = 1; j < Math.floor(p.h / 1.6); j++) {
        for (const sx of [-0.22, 0.22]) {
          const wg = new THREE.PlaneGeometry(p.w * 0.16, p.w * 0.22);
          this._geos.push(wg);
          const win = new THREE.Mesh(wg, wmat);
          win.position.set(sx * p.w, j * 1.6, p.w / 2 + 0.02);
          grp.add(win);
        }
      }
    }
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  crate(p) {
    const grp = new THREE.Group();
    const tints = p.tints || ['#7a2418'];
    let y = 0;
    for (let i = 0; i < p.n; i++) {
      const tint = tints[i % tints.length];
      const jitter = (i % 2 ? 0.3 : -0.3);
      const c = this._lit(new THREE.BoxGeometry(p.s, p.s, p.s), this._surfaceTex(p.tex, tint), '#ffffff');
      c.position.set(jitter, y + p.s / 2, (i % 3 ? 0.2 : -0.2));
      grp.add(c);
      y += p.s;
    }
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  chimney(p) {
    const grp = new THREE.Group();
    const tex = this._surfaceTex(p.tex, p.tint);
    tex.repeat.set(2, Math.max(3, Math.round(p.h / 2)));
    const body = this._lit(new THREE.CylinderGeometry(1.1, 1.4, p.h, 8), tex, '#ffffff');
    body.position.y = p.h / 2; grp.add(body);
    if (p.emberTop) {
      const gTex = this._tex(glowTexture('rgba(255,140,60,0.9)', 'rgba(0,0,0,0)'));
      const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      spr.scale.set(4, 4, 1); spr.position.y = p.h + 0.5;
      this._mats.push(spr.material);
      grp.add(spr);
      const light = new THREE.PointLight(new THREE.Color('#ff7020'), 1.4, 12);
      light.position.y = p.h; grp.add(light);
      this._flickers.push({ light, base: 1.4, phase: Math.random() * 6.28 });
    }
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  crystal(p) {
    const grp = new THREE.Group();
    const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(p.color), emissive: new THREE.Color(p.color), emissiveIntensity: 0.7, transparent: true, opacity: 0.9 });
    this._mats.push(mat);
    const g = new THREE.OctahedronGeometry(p.h * 0.26);
    this._geos.push(g);
    const crys = new THREE.Mesh(g, mat);
    crys.scale.y = 1.6; crys.position.y = p.h * 0.55;
    grp.add(crys);
    const light = new THREE.PointLight(new THREE.Color(p.color), 1.0, 8);
    light.position.y = p.h * 0.55; grp.add(light);
    this._flickers.push({ light, base: 1.0, phase: Math.random() * 6.28, slow: true });
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  tree(p) {
    const grp = new THREE.Group();
    const trunk = this._lit(new THREE.CylinderGeometry(0.3, 0.45, p.h * 0.5, 6), this._surfaceTex('plank', '#3a2416'), '#ffffff');
    trunk.position.y = p.h * 0.25; grp.add(trunk);
    const leafMat = new THREE.MeshLambertMaterial({ color: new THREE.Color(p.color) });
    this._mats.push(leafMat);
    for (let i = 0; i < 3; i++) {
      const lg = new THREE.ConeGeometry(p.h * 0.4 - i * 0.3, p.h * 0.35, 7);
      this._geos.push(lg);
      const cone = new THREE.Mesh(lg, leafMat);
      cone.position.y = p.h * 0.5 + i * p.h * 0.2;
      grp.add(cone);
    }
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  torch(p) {
    const grp = new THREE.Group();
    const pole = this._lit(new THREE.CylinderGeometry(0.08, 0.08, p.h, 6), this._surfaceTex('plank', '#2a1c10'), '#ffffff');
    pole.position.y = p.h / 2; grp.add(pole);
    const flameMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(p.color), fog: false });
    this._mats.push(flameMat);
    const fg = new THREE.SphereGeometry(0.22, 8, 8);
    this._geos.push(fg);
    const flame = new THREE.Mesh(fg, flameMat);
    flame.position.y = p.h + 0.1; grp.add(flame);
    const gTex = this._tex(glowTexture('rgba(255,200,120,0.8)', 'rgba(0,0,0,0)'));
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, color: new THREE.Color(p.color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(2, 2, 1); halo.position.y = p.h + 0.1;
    this._mats.push(halo.material);
    grp.add(halo);
    const light = new THREE.PointLight(new THREE.Color(p.color), p.i, p.dist);
    light.position.y = p.h + 0.1; grp.add(light);
    if (p.flicker) this._flickers.push({ light, base: p.i, phase: Math.random() * 6.28, flame, halo });
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  beacon(p) {
    const grp = new THREE.Group();
    const gTex = this._tex(glowTexture('rgba(255,255,255,0.9)', 'rgba(0,0,0,0)'));
    const core = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, color: new THREE.Color(p.color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    core.scale.set(3.5, 3.5, 1); core.position.y = 1.2;
    this._mats.push(core.material);
    grp.add(core);
    const light = new THREE.PointLight(new THREE.Color(p.color), p.i, p.dist);
    light.position.y = 1.4; grp.add(light);
    if (p.flicker) this._flickers.push({ light, base: p.i, phase: Math.random() * 6.28, halo: core, slow: true });
    grp.position.set(p.x, 0, p.z);
    return grp;
  }

  // ---------- particles ----------
  buildParticles(cfg) {
    const n = cfg.n;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(n * 3);
    const [bw, bh, bd] = cfg.box;
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * bw;
      pos[i * 3 + 1] = Math.random() * bh;
      pos[i * 3 + 2] = -Math.random() * bd;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const sprite = this._tex(glowTexture('rgba(255,255,255,0.95)', 'rgba(0,0,0,0)'));
    const mat = new THREE.PointsMaterial({
      size: cfg.kind === 'mist' ? 3.2 : (cfg.kind === 'bits' ? 0.28 : 0.22),
      map: sprite, color: new THREE.Color(cfg.color), transparent: true, depthWrite: false,
      blending: cfg.kind === 'mist' ? THREE.NormalBlending : THREE.AdditiveBlending,
      opacity: cfg.kind === 'mist' ? 0.25 : 0.9, sizeAttenuation: true,
    });
    this._geos.push(geo); this._mats.push(mat);
    const pts = new THREE.Points(geo, mat);
    pts.frustumCulled = false;
    this.group.add(pts);
    this._particles = { pts, cfg, pos, bh, phase: new Float32Array(n).map(() => Math.random() * 6.28) };
  }

  update(dt, elapsed) {
    // flickering lights
    for (const f of this._flickers) {
      const speed = f.slow ? 1.5 : 9;
      const flick = f.base * (0.82 + 0.18 * (Math.sin(elapsed * speed + f.phase) * 0.5 + 0.5) + (f.slow ? 0 : (Math.random() - 0.5) * 0.08));
      f.light.intensity = flick;
      if (f.flame) f.flame.scale.setScalar(0.9 + 0.2 * Math.sin(elapsed * 12 + f.phase));
      if (f.halo) f.halo.material.opacity = 0.75 + 0.2 * Math.sin(elapsed * (f.slow ? 2 : 7) + f.phase);
    }
    // particles drift
    const P = this._particles;
    if (P) {
      const arr = P.pos, cfg = P.cfg, [vx, vy, vz] = cfg.vel, grav = cfg.gravity || 0;
      for (let i = 0; i < arr.length / 3; i++) {
        arr[i * 3] += (vx + Math.sin(elapsed + P.phase[i]) * 0.02) * dt * 6;
        arr[i * 3 + 1] += (vy + grav * (elapsed % 3)) * dt * 6;
        arr[i * 3 + 2] += vz * dt * 6;
        if (arr[i * 3 + 1] > P.bh) arr[i * 3 + 1] = 0;
        if (arr[i * 3 + 1] < 0) arr[i * 3 + 1] = P.bh;
      }
      P.pts.geometry.attributes.position.needsUpdate = true;
    }
  }

  dispose() {
    this._geos.forEach((g) => g.dispose());
    this._mats.forEach((m) => m.dispose());
    this._texs.forEach((t) => t.dispose());
    this._geos = []; this._mats = []; this._texs = []; this._flickers = []; this._particles = null;
  }
}
