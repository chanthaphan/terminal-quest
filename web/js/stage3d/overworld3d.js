/* Terminal Quest — 3D overworld map for the WebGL stage.
   A dusk vista of rolling hills with a winding path; each realm is a small lit
   landmark cluster along it. Clickable icon/flag markers are DOM elements the
   stage reprojects each frame (keeps emoji + native clicks). Used both as the
   'world' scene and as the backdrop for the walk-to-realm travel sequence. */
import * as THREE from 'three';
import { skyTexture, patternTexture, glowTexture } from './texgen.js';

// left-% of each realm along the path (matches the DOM stage's LANDMARK_X)
const LANDMARK_X = { bash: 7, remote: 16, concepts: 25, azure: 34, k8s: 43, git: 52, docker: 61, ops: 70, final: 81, void: 92 };
let SPREAD = 30; // world width the landmarks span; compressed on narrow screens

export function setSpread(v) { SPREAD = v; }
export function pathStartX() { return -SPREAD / 2 - 1; }

// per-realm accent color for the landmark beacon
const REALM_COLOR = {
  bash: '#ffa032', remote: '#3aa0d0', concepts: '#50e6a0', azure: '#ffe089', k8s: '#7a6aff',
  git: '#ff9a6a', docker: '#ff7823', ops: '#64ff82', final: '#c882ff', void: '#be3cff',
};

export function landmarkX(id) { return ((LANDMARK_X[id] != null ? LANDMARK_X[id] : 50) / 100 - 0.5) * SPREAD; }
export function landmarkZ(i) { return -5 - (i % 3) * 2.2; }

export class WorldScene {
  constructor() {
    this.group = new THREE.Group();
    this._geos = []; this._mats = []; this._texs = [];
    this._flickers = [];
    this.landmarks = []; // { id, pos:THREE.Vector3, mod, locked, done }
    this.build();
  }
  _tex(t) { this._texs.push(t); return t; }
  _lit(geo, tex, tint) { const m = new THREE.MeshLambertMaterial({ map: tex, color: new THREE.Color(tint || '#fff') }); this._geos.push(geo); this._mats.push(m); return new THREE.Mesh(geo, m); }

  build() {
    // sky
    const skyTex = this._tex(skyTexture([[0, '#1a1440'], [0.45, '#3c2a6e'], [0.78, '#8a4a6e'], [1, '#c97a5a']]));
    const skyGeo = new THREE.SphereGeometry(80, 24, 16);
    const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, depthWrite: false });
    this._geos.push(skyGeo); this._mats.push(skyMat);
    this.group.add(new THREE.Mesh(skyGeo, skyMat));

    // sun
    const sunTex = this._tex(glowTexture('rgba(255,233,196,0.95)', 'rgba(0,0,0,0)'));
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: sunTex, transparent: true, depthWrite: false, fog: false, blending: THREE.AdditiveBlending }));
    sun.scale.set(14, 14, 1); sun.position.set(12, 9, -30);
    this._mats.push(sun.material);
    this.group.add(sun);

    // lights
    this.group.add(new THREE.AmbientLight(new THREE.Color('#6a5a8a'), 0.7));
    const key = new THREE.DirectionalLight(new THREE.Color('#ffd0a0'), 0.5);
    key.position.set(10, 12, 4); this.group.add(key);

    // rolling terrain
    const terrTex = this._tex(patternTexture('grass', '#2c2450'));
    terrTex.repeat.set(10, 6);
    const terrGeo = new THREE.PlaneGeometry(80, 44, 48, 28);
    const pos = terrGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.18) * 0.7 + Math.cos(y * 0.22) * 0.5 - 0.6);
    }
    terrGeo.computeVertexNormals();
    const terr = this._lit(terrGeo, terrTex, '#3a2a54');
    terr.rotation.x = -Math.PI / 2; terr.position.y = 0;
    this.group.add(terr);

    // far hill ridges
    for (let k = 0; k < 3; k++) {
      const hg = new THREE.PlaneGeometry(90, 10, 30, 1);
      const hp = hg.attributes.position;
      for (let i = 0; i < hp.count; i++) hp.setY(i, hp.getY(i) + Math.sin(hp.getX(i) * 0.3 + k) * 1.6);
      hg.computeVertexNormals();
      const hue = ['#241a52', '#2c2060', '#1e164a'][k];
      const hm = new THREE.MeshBasicMaterial({ color: new THREE.Color(hue), side: THREE.DoubleSide, fog: true });
      this._geos.push(hg); this._mats.push(hm);
      const hill = new THREE.Mesh(hg, hm);
      hill.position.set(0, 2 + k * 0.6, -26 + k * 3);
      this.group.add(hill);
    }

    // winding path + landmarks
    const mods = (window.CLIQ && window.CLIQ.modules) ? window.CLIQ.modules.filter((m) => LANDMARK_X[m.id] != null) : [];
    const G = window.CLIQ && window.CLIQ.game;
    const pts = [];
    mods.forEach((mod, i) => {
      const x = landmarkX(mod.id), z = landmarkZ(i);
      pts.push(new THREE.Vector3(x, 0.05, z));
      const done = G && mod.quests.every((q) => G.state.done[q.id]);
      const locked = G && G.moduleLocked(mod);
      this.landmarks.push({ id: mod.id, pos: new THREE.Vector3(x, 1.4, z), mod, locked, done });
      this.landmarkCluster(x, z, mod.id, locked);
    });

    if (pts.length > 1) {
      pts.sort((a, b) => a.x - b.x);
      const curve = new THREE.CatmullRomCurve3(pts);
      const tube = new THREE.TubeGeometry(curve, 80, 0.5, 6, false);
      const pathTex = this._tex(patternTexture('sand', '#6a5a3a'));
      pathTex.repeat.set(24, 1);
      const path = this._lit(tube, pathTex, '#8a7a5a');
      path.scale.y = 0.12; path.position.y = 0.05;
      this.group.add(path);
    }
  }

  landmarkCluster(x, z, id, locked) {
    const color = REALM_COLOR[id] || '#ffd9a0';
    // a small stone plinth
    const plTex = this._tex(patternTexture('rock', locked ? '#2a2440' : '#4a3a60'));
    const plinth = this._lit(new THREE.CylinderGeometry(1.1, 1.4, 1.2, 8), plTex, '#fff');
    plinth.position.set(x, 0.6, z);
    this.group.add(plinth);
    // a marker spire
    const spTex = this._tex(patternTexture('sandstone', locked ? '#33304a' : '#6a5a80'));
    const spire = this._lit(new THREE.ConeGeometry(0.5, 1.8, 6), spTex, '#fff');
    spire.position.set(x, 2.0, z);
    this.group.add(spire);
    if (!locked) {
      const gTex = this._tex(glowTexture('rgba(255,255,255,0.9)', 'rgba(0,0,0,0)'));
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: gTex, color: new THREE.Color(color), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
      glow.scale.set(3, 3, 1); glow.position.set(x, 2.6, z);
      this._mats.push(glow.material);
      this.group.add(glow);
      const light = new THREE.PointLight(new THREE.Color(color), 1.4, 8);
      light.position.set(x, 2.4, z);
      this.group.add(light);
      this._flickers.push({ light, base: 1.4, phase: x, halo: glow });
    }
  }

  update(dt, elapsed) {
    for (const f of this._flickers) {
      f.light.intensity = f.base * (0.85 + 0.15 * Math.sin(elapsed * 2 + f.phase));
      if (f.halo) f.halo.material.opacity = 0.7 + 0.25 * Math.sin(elapsed * 2.4 + f.phase);
    }
  }

  dispose() {
    this._geos.forEach((g) => g.dispose());
    this._mats.forEach((m) => m.dispose());
    this._texs.forEach((t) => t.dispose());
    this._geos = []; this._mats = []; this._texs = []; this._flickers = [];
  }
}
