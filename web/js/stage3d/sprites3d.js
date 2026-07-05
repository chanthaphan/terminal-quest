/* Terminal Quest — billboarded pixel-sprite actors for the WebGL stage.
   A sprite's char-matrix becomes a NearestFilter texture on a plane that yaws to
   face the camera (Y axis only, so feet stay planted). A small shader adds a
   white cast-flash, a tint pulse, and a noise dissolve. Idle bob / cast / walk /
   hit / lunge / flinch / dissolve are a time-driven state machine updated each
   frame, replacing the DOM stage's CSS keyframes. */
import * as THREE from 'three';
import { spriteTexture, walkVariant, blinkVariant, glowTexture, noiseTexture } from './texgen.js';

const PX = 0.0165; // world units per (sprite pixel × old `scale` unit)

const SPRITE_VS = `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;
const SPRITE_FS = `
  uniform sampler2D map;
  uniform sampler2D uNoise;
  uniform vec3 uTint;
  uniform float uFlash;
  uniform float uDissolve;
  varying vec2 vUv;
  void main() {
    vec4 tex = texture2D(map, vUv);
    if (tex.a < 0.5) discard;
    if (uDissolve > 0.0) {
      float n = texture2D(uNoise, vUv * 1.5).r;
      if (n < uDissolve) discard;
      // ember edge just above the dissolve threshold
      if (n < uDissolve + 0.12) { gl_FragColor = vec4(1.0, 0.55, 0.15, 1.0); return; }
    }
    vec3 col = tex.rgb * uTint;
    col = mix(col, vec3(1.0), uFlash);
    gl_FragColor = vec4(col, 1.0);
  }
`;

let _noiseTex = null;
let _shadowTex = null;
function shared() {
  if (!_noiseTex) _noiseTex = noiseTexture(128);
  if (!_shadowTex) _shadowTex = glowTexture('rgba(0,0,0,0.55)', 'rgba(0,0,0,0)');
  return { noise: _noiseTex, shadow: _shadowTex };
}

export class Actor {
  constructor(sprite, oldScale, isHero) {
    const sh = shared();
    this.isHero = isHero;
    this.tex = spriteTexture(sprite);
    this.walkTex = isHero ? walkVariant(sprite) : null;
    this.blinkTex = blinkVariant(sprite); // null unless the sprite has eyes defined
    const w = this.tex.userData.w, h = this.tex.userData.h;
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        map: { value: this.tex },
        uNoise: { value: sh.noise },
        uTint: { value: new THREE.Color(1, 1, 1) },
        uFlash: { value: 0 },
        uDissolve: { value: 0 },
      },
      vertexShader: SPRITE_VS, fragmentShader: SPRITE_FS, transparent: true, depthWrite: true,
    });
    const res = sprite.res || 1; // hi-res art keeps the same world size
    this._sizeFor = (scale) => ({ w: (w * scale * PX) / res, h: (h * scale * PX) / res });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.mat);
    this.mesh.renderOrder = 2;

    // soft contact shadow
    this.shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: sh.shadow, transparent: true, depthWrite: false, opacity: 0.6 })
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = 0.02;
    this.shadow.renderOrder = 1;

    this.group = new THREE.Group();
    this.group.add(this.shadow, this.mesh);
    this.scale = 0;
    this.setScale(oldScale);

    this.baseY = 0;
    this.t = 0;                 // global clock accumulator
    this.anim = null;           // { name, t0, dur }
    this.walking = false;
    this._phase = Math.random() * 6.28;
    // aliveness: blink + idle fidget scheduling
    this._nextBlink = 1.5 + Math.random() * 3;
    this._blinkUntil = 0;
    this._nextFidget = 5 + Math.random() * 5;
  }

  setScale(oldScale) {
    if (this.scale === oldScale) return;
    this.scale = oldScale;
    const s = this._sizeFor(oldScale);
    this.mesh.scale.set(s.w, s.h, 1);
    this.mesh.position.y = s.h / 2;
    this.shadow.scale.set(s.w * 1.15, s.w * 0.5, 1);
    this._w = s.w;
    this._h = s.h;
  }

  // world-space top-of-head anchor (for projecting DOM labels)
  headAnchor(out) { out.set(this.group.position.x, this.group.position.y + this._h + 0.15, this.group.position.z); return out; }
  midAnchor(out) { out.set(this.group.position.x, this.group.position.y + this._h * 0.55, this.group.position.z); return out; }

  setPosition(x, y, z) { this.group.position.set(x, y, z); this.baseY = y; }
  setVisible(v) { this.group.visible = v; }

  play(name, dur) { this.anim = { name, t0: this.t, dur: dur || 0.45 }; }
  setWalking(on) { this.walking = on; }
  setDissolve(v) { this.mat.uniforms.uDissolve.value = v; }
  setTint(r, g, b) { this.mat.uniforms.uTint.value.setRGB(r, g, b); }

  update(dt, cam) {
    this.t += dt;
    // face camera on Y only
    const p = this.group.position;
    this.group.rotation.y = Math.atan2(cam.position.x - p.x, cam.position.z - p.z);

    let dx = 0, dy = 0, flash = 0, rot = 0, flip = false;
    // breathing replaces most of the old up-down bob: the body itself swells
    const breathe = 1 + Math.sin(this.t * 1.8 + this._phase) * 0.013;
    dy += Math.sin(this.t * 2.4 + this._phase) * 0.012 * (this.isHero ? 1 : 0.8);

    // walking: swap to stride texture + hop
    if (this.walking && this.walkTex) {
      const frame = Math.floor(this.t * 8) % 2;
      this.mat.uniforms.map.value = frame ? this.walkTex : this.tex;
      dy += Math.abs(Math.sin(this.t * 10)) * 0.04;
    } else {
      // blink every few seconds while idle
      if (this.blinkTex) {
        if (this.t > this._nextBlink) {
          this._blinkUntil = this.t + 0.13;
          this._nextBlink = this.t + 2.2 + Math.random() * 3.4;
        }
        const want = this.t < this._blinkUntil ? this.blinkTex : this.tex;
        if (this.mat.uniforms.map.value !== want) this.mat.uniforms.map.value = want;
      } else if (this.mat.uniforms.map.value !== this.tex) {
        this.mat.uniforms.map.value = this.tex;
      }
      // occasional idle fidgets: a glance to the side, a lean, a tiny hop
      if (!this.anim && this.isHero && this.t > this._nextFidget) {
        const pick = ['fidget-turn', 'fidget-lean', 'fidget-hop'][Math.floor(Math.random() * 3)];
        this.play(pick, pick === 'fidget-turn' ? 1.1 : 0.6);
        this._nextFidget = this.t + 5 + Math.random() * 6;
      }
    }

    if (this.anim) {
      const k = (this.t - this.anim.t0) / this.anim.dur; // 0..1
      if (k >= 1) {
        this.anim = null;
        this.mat.uniforms.uFlash.value = 0;
      } else {
        const ease = Math.sin(k * Math.PI); // 0→1→0
        switch (this.anim.name) {
          case 'cast': dx += ease * -0.18 * (this.isHero ? 1 : -1); flash = ease * 0.5; break;
          case 'walk-in': dx += (1 - k) * 1.4; break;
          case 'hit': dx += Math.sin(k * 40) * 0.06; flash = (1 - k) * 0.7; break;
          case 'lunge': dx += ease * 0.6; break;
          case 'flinch': dx += Math.sin(k * 46) * 0.05; this.setTint(1, 1 - ease * 0.5, 1 - ease * 0.5); break;
          case 'step': dx += ease * 0.12; dy += ease * 0.08; break;
          case 'dash-left': dx += ease * -0.5; break;
          case 'dash-right': dx += ease * 0.5; break;
          case 'fidget-turn': flip = k > 0.15 && k < 0.85; break;           // glance the other way
          case 'fidget-lean': rot = Math.sin(k * Math.PI) * 0.09; break;    // shift weight
          case 'fidget-hop': dy += Math.sin(k * Math.PI) * 0.07; break;     // small bounce
        }
        if (this.anim.name !== 'flinch') this.setTint(1, 1, 1);
      }
    } else {
      this.mat.uniforms.uFlash.value = 0;
      this.setTint(1, 1, 1);
    }
    this.mat.uniforms.uFlash.value = flash;
    this.group.position.x = p.x; // (rotation applied around group origin)
    this.mesh.position.x = dx;
    this.mesh.position.y = this._h / 2 + dy;
    this.mesh.rotation.z = rot;
    // breathing + mirrored glance applied through scale each frame
    this.mesh.scale.set(this._w * (flip ? -1 : 1), this._h * breathe, 1);
  }

  dispose() {
    this.mesh.geometry.dispose();
    this.mat.dispose();
    this.tex.dispose();
    if (this.walkTex) this.walkTex.dispose();
    if (this.blinkTex) this.blinkTex.dispose();
    this.shadow.geometry.dispose();
    this.shadow.material.dispose();
  }
}

export function disposeSharedSpriteAssets() {
  if (_noiseTex) { _noiseTex.dispose(); _noiseTex = null; }
  if (_shadowTex) { _shadowTex.dispose(); _shadowTex = null; }
}
