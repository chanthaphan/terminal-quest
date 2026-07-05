/* Terminal Quest — WebGL HD-2D stage (Octopath-style diorama renderer).
   Implements the CLIQ.stage API and swaps in ahead of main.js's boot (module
   scripts run after all classic scripts but before DOMContentLoaded). The DOM
   renderer (CLIQ.stageDOM) stays available as an automatic fallback.

   It reuses the DOM stage's overlay markup (dialog box, HP plates, fx layer) by
   calling stageDOM.init() first, then hides the DOM scene/actors and draws a
   WebGL diorama underneath. Text (chips, damage pops, dialog) stays DOM and is
   positioned by projecting 3D anchors to screen space.

   Milestone status: M1 — renderer core + full bash diorama + hero billboard.
   Other realms render sky+ground+lights (props filled in M2); battle/VFX/overworld
   land in M3/M4; post-processing + adaptive quality in M5. Opt in with ?stage=3d;
   default stays on the DOM stage until M3. */
import * as THREE from 'three';
import { themeFor } from './themes3d.js';
import { SceneBundle } from './scenebuilder.js';
import { Actor, disposeSharedSpriteAssets } from './sprites3d.js';
import { WorldScene, landmarkX } from './overworld3d.js';
import { PostPipeline } from './post.js';

const qs = new URLSearchParams(location.search);

function webglOK() {
  if (qs.get('stage') === 'dom') return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch { return false; }
}
function reducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Diorama framing: camera pulled back and tilted down so actors stand in the
// upper band of the stage, above the dialog box (which covers the lower ~46%).
const CAM = { x: 0, y: 3.2, z: 11, lookX: 0, lookY: -0.6, lookZ: -2.5 };
// Overworld framing: higher and wider to take in the winding path of landmarks.
const WORLD_CAM = { x: 0, y: 7.5, z: 18, lookX: 0, lookY: 0.5, lookZ: -5 };
const HERO_POS = [1.8, 0, -2.0];
const ENEMY_POS = [-1.9, 0, -2.0];

class Stage3D {
  constructor(domStage) {
    this.dom = domStage;
    this.sceneId = null;
    this.heroClass = null;
    this._heroDrawnClass = null;
    this.heroScale = 0;
    this.enemyName = null;
    this.dissolved = false;
    this.traveling = false;
    this.bundle = null;
    this.world = null;
    this.hero = null;
    this.enemy = null;
    this._raf = null;
    this._alive = false;
    this._v3 = new THREE.Vector3();
    this._view = CAM;
    this._timers = [];
    this._pendingBattle = null;
    this._worldMarkers = [];
  }

  // ---- lifecycle -----------------------------------------------------------
  init(root) {
    this.root = root;
    this.dom.init(root); // build overlay DOM (dialog, fx, plates, flash) + fallback target
    this.els = this.dom.els;
    // If WebGL setup fails for any reason, silently keep the already-built DOM
    // stage rather than breaking boot (this path is default-on).
    try {
      root.classList.add('stage-3d');
      const canvas = document.createElement('canvas');
      canvas.className = 'stage3d-canvas';
      this.els.viewport.insertBefore(canvas, this.els.viewport.firstChild);
      this.canvas = canvas;

      // clickable overworld landmark markers (reprojected each frame)
      this.markerLayer = document.createElement('div');
      this.markerLayer.className = 'world-markers';
      this.els.viewport.appendChild(this.markerLayer);

      // Adaptive baseline: weaker devices start at a lower DPR + lite post.
      const weak = (navigator.hardwareConcurrency || 8) <= 6 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      this._dprCap = weak ? 1.5 : 2;
      // preserveDrawingBuffer keeps the last frame on the canvas when the browser
      // throttles the animation loop (e.g. in an inactive preview panel), instead
      // of clearing it to black.
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._dprCap));
      this.renderer.setClearColor(0x05070c, 1);

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 200);
      this.camera.position.set(CAM.x, CAM.y, CAM.z);
      this.camera.lookAt(CAM.lookX, CAM.lookY, CAM.lookZ);
      this.clock = new THREE.Clock();

      // post-processing (bloom + tilt-shift + grade); ?post=off disables it
      this._postOn = qs.get('post') !== 'off';
      if (this._postOn) {
        this.post = new PostPipeline(this.renderer);
        this.post.quality = weak ? 0.5 : 1;
      }
      this._fps = { acc: 0, n: 0, t: 0, cooldown: 0 };

      this._resize();
      this._ro = new ResizeObserver(() => this._resize());
      this._ro.observe(root);

      this._onVis = () => { document.hidden ? this._stop() : this._start(); };
      document.addEventListener('visibilitychange', this._onVis);
      canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); this._stop(); this._contextLost = true; });
      canvas.addEventListener('webglcontextrestored', () => this._restore());

      this._start();
    } catch (err) {
      console.warn('[stage3d] WebGL init failed, using DOM stage', err);
      root.classList.remove('stage-3d');
      if (this.canvas) this.canvas.remove();
      window.CLIQ.stage = this.dom; // hand off; DOM stage is already initialized on this root
    }
  }

  _resize() {
    const w = this.els.viewport.clientWidth || 1;
    const h = this.els.viewport.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.post) this.post.setSize();
  }

  _start() {
    if (this._alive) return;
    this._alive = true;
    this.clock.getDelta();
    const loop = () => {
      if (!this._alive) return;
      this._raf = requestAnimationFrame(loop);
      this._frame();
    };
    this._raf = requestAnimationFrame(loop);
  }
  _stop() {
    this._alive = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  _restore() {
    // GL objects are gone; rebuild renderer + current scene from logical state.
    this._contextLost = false;
    try {
      this.renderer.dispose();
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, alpha: false, powerPreference: 'high-performance', preserveDrawingBuffer: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this._dprCap || 2));
      this.renderer.setClearColor(0x05070c, 1);
      if (this._postOn) { const q = this.post ? this.post.quality : 1; this.post = new PostPipeline(this.renderer); this.post.quality = q; }
      this._resize();
      const id = this.sceneId; this.sceneId = null; this.hero = null; this.enemy = null;
      this._disposeScenery();
      if (id === 'world') { this._buildWorld(); this._buildMarkers(); }
      else if (id) this._build(id);
      this._start();
    } catch (err) {
      console.warn('[stage3d] restore failed, falling back to DOM stage', err);
      this._demote();
    }
  }

  _demote() {
    this._stop();
    if (this._ro) this._ro.disconnect();
    document.removeEventListener('visibilitychange', this._onVis);
    this._disposeScenery();
    if (this.post) { this.post.dispose(); this.post = null; }
    try { this.renderer.dispose(); } catch (e) { /* ignore */ }
    this.root.classList.remove('stage-3d'); // un-hide the DOM scene
    window.CLIQ.stage = this.dom;
    this.dom.init(this.root); // rebuilds DOM markup, dropping the canvas + markers
    if (window.CLIQ.game && window.CLIQ.game.renderStory) window.CLIQ.game.renderStory();
  }

  _frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    if (this.bundle) this.bundle.update(dt, t);
    if (this.world) this.world.update(dt, t);
    if (this.hero) this.hero.update(dt, this.camera);
    if (this.enemy && this.enemy.group.visible) this.enemy.update(dt, this.camera);
    // gentle sway around the active camera framing (realm or overworld)
    const V = this._view;
    if (!reducedMotion()) {
      this.camera.position.set(V.x + Math.sin(t * 0.18) * 0.22, V.y + Math.sin(t * 0.13) * 0.07 + this._shake(), V.z);
    } else {
      this.camera.position.set(V.x, V.y + this._shake(), V.z);
    }
    this.camera.lookAt(V.lookX, V.lookY, V.lookZ);
    if (this._worldMarkers.length) this._updateMarkers();
    this._renderNow();
    this._watchdog(dt);
  }

  // Draws the current scene to the screen (through post if enabled). Safe to call
  // directly so the canvas has a fresh frame even when the animation loop is
  // throttled (e.g. an inactive preview panel).
  _renderNow() {
    if (!this.renderer) return;
    if (this.post && this.post.quality >= 0 && this.post.rtScene) {
      try {
        this.renderer.setRenderTarget(this.post.sceneTarget);
        this.renderer.render(this.scene, this.camera);
        this.post.present();
        return;
      } catch (err) {
        console.warn('[stage3d] post-processing failed, disabling it', err);
        this.post.dispose(); this.post = null;
      }
    }
    this.renderer.setRenderTarget(null);
    this.renderer.render(this.scene, this.camera);
  }

  // Drop post quality if the frame rate stays low; never promotes mid-session.
  _watchdog(dt) {
    if (!this.post) return;
    const f = this._fps;
    f.acc += dt; f.n++;
    if (f.cooldown > 0) f.cooldown -= dt;
    if (f.acc < 2) return;
    const fps = f.n / f.acc;
    f.acc = 0; f.n = 0;
    if (fps < 40 && f.cooldown <= 0) {
      if (this.post.quality >= 1) { this.post.quality = 0.5; f.cooldown = 8; console.info('[stage3d] low FPS → lite post'); }
      else if (this.post.quality > 0) { this.post.quality = 0; f.cooldown = 8; console.info('[stage3d] low FPS → post off'); }
      else if (fps < 20) { console.warn('[stage3d] sustained low FPS → DOM stage'); this._demote(); }
    }
  }

  _shake() {
    if (!this._shakeUntil || this.clock.elapsedTime > this._shakeUntil) return 0;
    return (Math.random() - 0.5) * 0.12;
  }
  cameraShake(ms) { this._shakeUntil = this.clock.elapsedTime + ms / 1000; }

  // ---- scene ---------------------------------------------------------------
  _ensureHero() {
    if (this.hero) return;
    this.hero = new Actor(window.CLIQ.heroSprite(this.heroClass), this.heroScale || 7, true);
    this.hero.setPosition(HERO_POS[0], HERO_POS[1], HERO_POS[2]);
    this.scene.add(this.hero.group);
  }

  _disposeScenery() {
    if (this.bundle) { this.scene.remove(this.bundle.group); this.bundle.dispose(); this.bundle = null; }
    if (this.world) { this.scene.remove(this.world.group); this.world.dispose(); this.world = null; }
    this._clearMarkers();
  }

  _build(id) { // realm diorama
    this._disposeScenery();
    const theme = themeFor(id);
    this.scene.fog = new THREE.Fog(new THREE.Color(theme.fog.color), theme.fog.near, theme.fog.far);
    this.bundle = new SceneBundle(theme);
    this.scene.add(this.bundle.group);
    if (this.post) this.post.setGrade(theme.grade);
    this._view = CAM;
    this.sceneId = id;
    this._ensureHero();
    this.hero.setScale(7);
    this.hero.setPosition(HERO_POS[0], 0, HERO_POS[2]);
    this.scene.add(this.hero.group);
    this._renderNow();
  }

  _buildWorld() { // overworld vista (also the travel backdrop)
    this._disposeScenery();
    this.scene.fog = new THREE.Fog(new THREE.Color('#2a2060'), 26, 74);
    this.world = new WorldScene();
    this.scene.add(this.world.group);
    if (this.post) this.post.setGrade({ lift: [0.02, 0.0, 0.03], gain: [1.05, 0.98, 1.08] });
    this._view = WORLD_CAM;
    this.sceneId = 'world';
    this._ensureHero();
    this.hero.setScale(4);
    this.hero.setPosition(0, 0, -1);
    this.scene.add(this.hero.group);
    this._renderNow();
  }

  setScene(id, heroClass) {
    this.heroClass = heroClass;
    if (this.hero && this._heroDrawnClass !== heroClass) {
      this.scene.remove(this.hero.group); this.hero.dispose(); this.hero = null;
    }
    this._heroDrawnClass = heroClass;
    if (this.sceneId === id && !this.traveling) { this.drawHero(id === 'world' ? 4 : 7); return; }
    const from = this.sceneId;
    this.cancelTravel();
    const travel = from && from !== 'menu' && id !== 'menu' && id !== 'world' && !reducedMotion();
    if (id === 'world') { this._buildWorld(); this._buildMarkers(); return; }
    if (travel) this.runTravel(id);
    else this._build(id);
  }

  // ---- travel: walk the overworld path to the target realm ------------------
  _t(ms, fn) { this._timers.push(setTimeout(fn, ms)); }

  runTravel(target) {
    this.traveling = true;
    this._buildWorld(); // markers intentionally omitted during travel
    const hero = this.hero;
    const startX = -14, endX = landmarkX(target);
    hero.setPosition(startX, 0, -1);
    hero.setWalking(true);
    const t0 = this.clock.elapsedTime, dur = 1.7;
    const step = () => {
      if (!this.traveling || !this.hero) return;
      const k = Math.min(1, (this.clock.elapsedTime - t0) / dur);
      this.hero.group.position.x = startX + (endX - startX) * k;
      if (k < 1 && this._alive) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    this._t(1750, () => {
      if (this.els.flash) this.els.flash.classList.add('flash-on');
      this._t(420, () => {
        if (this.hero) this.hero.setWalking(false);
        this._build(target);
        this.walkIn();
        if (this.els.flash) this.els.flash.classList.remove('flash-on');
        this._t(700, () => {
          this.traveling = false;
          if (this._pendingBattle) { const p = this._pendingBattle; this._pendingBattle = null; this.battle(p[0], p[1], p[2], p[3]); }
        });
      });
    });
  }

  cancelTravel() {
    this._timers.forEach(clearTimeout);
    this._timers = [];
    if (this.traveling) {
      this.traveling = false;
      if (this.hero) this.hero.setWalking(false);
      if (this.els.flash) this.els.flash.classList.remove('flash-on');
      if (this._pendingBattle) { const p = this._pendingBattle; this._pendingBattle = null; this.battle(p[0], p[1], p[2], p[3]); }
    }
  }

  // ---- overworld landmark markers (DOM, reprojected each frame) -------------
  _buildMarkers() {
    this._clearMarkers();
    if (!this.world || !this.markerLayer) return;
    const G = window.CLIQ.game;
    this.world.landmarks.forEach((lm) => {
      const el = document.createElement('div');
      el.className = 'world-mark' + (lm.done ? ' wm-done' : '') + (lm.locked ? ' wm-locked' : '');
      el.innerHTML = `<span class="wm-flag">${lm.done ? '✦' : lm.locked ? '🔒' : ''}</span><span class="wm-icon">${lm.mod.icon}</span>`;
      el.title = lm.mod.title;
      el.addEventListener('click', () => {
        if (!G || (G.moduleLocked && G.moduleLocked(lm.mod))) return;
        const quest = lm.mod.quests.find((q) => !G.state.done[q.id]) || lm.mod.quests[0];
        G.startQuest(lm.mod, quest);
      });
      this.markerLayer.appendChild(el);
      this._worldMarkers.push({ el, pos: lm.pos });
    });
  }

  _updateMarkers() {
    const w = this.els.viewport.clientWidth, h = this.els.viewport.clientHeight;
    for (const m of this._worldMarkers) {
      const p = m.pos.clone().project(this.camera);
      if (p.z > 1) { m.el.style.display = 'none'; continue; }
      m.el.style.display = '';
      m.el.style.left = (p.x * 0.5 + 0.5) * w + 'px';
      m.el.style.top = (-p.y * 0.5 + 0.5) * h + 'px';
    }
  }

  _clearMarkers() {
    this._worldMarkers.forEach((m) => m.el.remove());
    this._worldMarkers = [];
  }

  drawHero(scale) {
    this.heroScale = scale;
    this._ensureHero();
    this.hero.setScale(scale);
  }

  walkIn() { this._ensureHero(); this.hero.play('walk-in', 0.75); }
  dialogEl() { return this.els.dialog; }

  // ---- battle (basic in M1; full choreography + WebGL HP in M3) -------------
  battle(meta, enemyPct, hearts, won) {
    if (this.enemyName !== meta.name) {
      this.enemyName = meta.name;
      this.dissolved = false;
      if (this.enemy) { this.scene.remove(this.enemy.group); this.enemy.dispose(); }
      this.enemy = new Actor(window.CLIQ.sprites[meta.sprite], (meta.scale || 9) - 1, false);
      this.enemy.setPosition(ENEMY_POS[0], 0, ENEMY_POS[2]);
      this.enemy.play('walk-in', 0.9);
      this.scene.add(this.enemy.group);
      const pe = this.els.plates.querySelector('.plate-enemy .hp-name');
      if (pe) pe.textContent = meta.name;
    }
    if (this.enemy) this.enemy.setVisible(true);
    this.els.plates.hidden = false;
    this.els.plates.querySelector('.enemy-fill').style.width = Math.round(enemyPct * 100) + '%';
    this.els.plates.querySelector('.hero-fill').style.width = Math.round((hearts / 3) * 100) + '%';
    this.els.plates.querySelector('.hp-hearts').textContent = '❤'.repeat(hearts) + '♡'.repeat(3 - hearts);
    if (won && !this.dissolved) {
      this.dissolved = true;
      if (this.enemy) this._dissolveEnemy();
    }
  }

  _dissolveEnemy() {
    const enemy = this.enemy;
    const start = this.clock.elapsedTime;
    const step = () => {
      if (this.enemy !== enemy) return;
      const k = (this.clock.elapsedTime - start) / 0.9;
      enemy.setDissolve(Math.min(1, k));
      if (k < 1 && this._alive) requestAnimationFrame(step);
      else enemy.setVisible(false);
    };
    requestAnimationFrame(step);
  }

  endBattle() {
    if (this.enemyName === null) return;
    this.enemyName = null;
    this.dissolved = false;
    if (this.enemy) { this.enemy.setVisible(false); this.enemy.setDissolve(0); }
    this.els.plates.hidden = true;
  }

  strike(side) {
    if (side === 'enemy') {
      this._ensureHero();
      this.hero.play('cast', 0.45);
      setTimeout(() => {
        if (!this.enemy || !this.enemy.group.visible) return;
        this.enemy.play('hit', 0.48);
        this.burst(this.enemy, '#67e8f9', 12);
        this.pop(this.enemy, String(200 + Math.floor(Math.random() * 300)));
      }, 170);
    } else {
      if (this.enemy) this.enemy.play('lunge', 0.42);
      setTimeout(() => {
        this._ensureHero();
        this.hero.play('flinch', 0.48);
        this.cameraShake(450);
        this.burst(this.hero, '#f87171', 10);
        this.pop(this.hero, '-1 ♥', 'dmg-hero');
      }, 160);
    }
  }

  // ---- per-command action FX -----------------------------------------------
  // Ports the DOM stage's full effect vocabulary, spawned into the DOM fx overlay
  // at positions projected from the hero's 3D anchor so effects track the actor.
  action(e) {
    if (this.traveling || !e.cmd || e.cmd === 'clear' || !this.els.fx) return;
    if (this.els.fx.children.length > 12) return; // don't flood on rapid input
    const failed = e.code !== 0;
    this.chip('$ ' + (e.raw.length > 26 ? e.raw.slice(0, 24) + '…' : e.raw), failed);
    this._ensureHero();
    const hero = this.hero;
    if (failed) {
      const p = this.heroFxPoint(-46, 0);
      this.spawn('fx-puff', p.x, p.y, '', 750);
      this.pop(hero, '✗', 'dmg-hero');
      if (window.CLIQ.sfx) window.CLIQ.sfx.play('error');
      return;
    }
    const kind = window.CLIQ.fxFor(e);
    const side = this.heroFxPoint(-56, 4);
    if (kind === 'scan') {
      this.spawn('fx-ring', side.x, side.y, 'width:60px;height:60px', 950);
      this.spawn('fx-ring', side.x, side.y, 'width:60px;height:60px;animation-delay:.18s', 1150);
    } else if (kind === 'read') {
      const p = this.heroFxPoint(-44, -30);
      this.spawn('fx-scroll', p.x, p.y, '', 1250);
    } else if (kind === 'conjure') {
      const p = this.heroFxPoint(-58, 14);
      this.spawn('fx-conjure', p.x, p.y, '', 1350);
      hero.play('cast', 0.4);
      this.burst(hero, '#8ab4ff', 6);
    } else if (kind === 'write') {
      hero.play('cast', 0.4);
      this.burst(hero, '#fcd34d', 7);
    } else if (kind === 'transform') {
      const p = this.heroFxPoint(-48, 0);
      this.spawn('fx-swirl', p.x, p.y, '', 950);
    } else if (kind === 'slash') {
      const p = this.heroFxPoint(-54, 0);
      hero.play('cast', 0.4);
      this.spawn('fx-slash', p.x, p.y, '', 650);
      this.burst(hero, '#ff5a5a', 8);
    } else if (kind === 'step') {
      hero.play('step', 0.5);
    } else if (kind === 'portal') {
      const p = this.heroFxPoint(-72, -6);
      this.spawn('fx-portal', p.x, p.y, '', 1150);
      hero.play(e.cmd === 'exit' ? 'dash-right' : 'dash-left', 0.6);
    } else if (kind && kind.startsWith('proj:')) {
      const color = kind.slice(5);
      hero.play('cast', 0.4);
      const p = this.heroFxPoint(-34, -10);
      const dist = -Math.max(120, this.els.viewport.clientWidth * 0.42);
      this.spawn('fx-orb', p.x, p.y, `color:${color};--dist:${dist}px`, 850);
      setTimeout(() => { if (this.els.fx) this.spawn('fx-echo', p.x + dist, p.y - 30, `color:${color}`, 750); }, 760);
    }
  }

  cast() { this._ensureHero(); this.hero.play('cast', 0.45); this.burst(this.hero, '#fcd34d', 10); }

  // ---- DOM overlay helpers (projected from 3D anchors) ---------------------
  _project(v) {
    const w = this.els.viewport.clientWidth, h = this.els.viewport.clientHeight;
    const p = v.clone().project(this.camera);
    return { x: (p.x * 0.5 + 0.5) * w, y: (-p.y * 0.5 + 0.5) * h };
  }
  _screenOf(actor, kind) {
    if (kind === 'head') actor.headAnchor(this._v3); else actor.midAnchor(this._v3);
    return this._project(this._v3);
  }
  heroFxPoint(dx, dy) {
    this._ensureHero();
    const p = this._screenOf(this.hero, 'mid');
    return { x: p.x + (dx || 0), y: p.y + (dy || 0) };
  }
  spawn(cls, x, y, css, ttl) {
    const d = document.createElement('div');
    d.className = cls;
    d.style.cssText = `left:${x}px;top:${y}px;` + (css || '');
    this.els.fx.appendChild(d);
    setTimeout(() => d.remove(), ttl || 1200);
    return d;
  }

  chip(text, isErr) {
    this._ensureHero();
    const p = this._screenOf(this.hero, 'head');
    const d = document.createElement('div');
    d.className = 'fx-label' + (isErr ? ' fx-label-err' : '');
    d.style.cssText = `left:${p.x}px;top:${p.y}px`;
    d.textContent = text;
    this.els.fx.appendChild(d);
    setTimeout(() => d.remove(), 1200);
  }

  pop(actor, text, cls) {
    const p = this._screenOf(actor, 'mid');
    const d = document.createElement('div');
    d.className = 'dmg-pop-hd ' + (cls || '');
    d.textContent = text;
    d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
    this.els.fx.appendChild(d);
    setTimeout(() => d.remove(), 950);
  }

  burst(actor, color, count) {
    const p = this._screenOf(actor, 'mid');
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      const ang = Math.random() * Math.PI * 2, dist = 24 + Math.random() * 46;
      s.style.cssText = `left:${p.x}px;top:${p.y}px;background:${color};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 20}px`;
      this.els.fx.appendChild(s);
      setTimeout(() => s.remove(), 700);
    }
  }
}

function activate() {
  const CLIQ = window.CLIQ;
  const s3d = new Stage3D(CLIQ.stageDOM);
  CLIQ.stage = s3d;
  // Order-independent swap: normally this module runs before main.js's boot, so
  // boot() will call CLIQ.stage.init(). But if the DOM stage already booted (its
  // root is set — e.g. the module executed late), take over that root now.
  if (CLIQ.stageDOM.root) {
    s3d.init(CLIQ.stageDOM.root);
    if (CLIQ.game && CLIQ.game.renderStory) CLIQ.game.renderStory();
  }
  console.info('[stage3d] WebGL HD-2D stage active (use ?stage=dom to force the DOM stage).');
}

if (webglOK() && window.CLIQ && window.CLIQ.stageDOM) {
  try {
    // Default-on: the WebGL stage takes over whenever WebGL is available.
    // webglOK() returns false for ?stage=dom (or unsupported browsers), which
    // leaves the DOM stage in place.
    activate();
  } catch (err) {
    console.warn('[stage3d] init failed, using DOM stage', err);
  }
}

export { Stage3D, disposeSharedSpriteAssets };
