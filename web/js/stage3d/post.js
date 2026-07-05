/* Terminal Quest — hand-written post-processing for the WebGL stage.
   The Octopath HD-2D signatures: bloom (bright light bleed) and tilt-shift
   depth-of-field (miniature blur at the top/bottom of frame), finished with a
   vignette, faint scanlines and a per-theme colour grade — all in one composite
   pass. No three/addons: a fullscreen-triangle pass runs custom shaders between a
   handful of render targets. Quality scales via `quality` (1 full, 0.5 lite, 0 off). */
import * as THREE from 'three';

const VS = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const BRIGHT_FS = `
  uniform sampler2D tDiffuse; uniform float uThreshold; varying vec2 vUv;
  void main(){
    vec3 c = texture2D(tDiffuse, vUv).rgb;
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    float k = smoothstep(uThreshold, uThreshold + 0.25, l);
    gl_FragColor = vec4(c * k, 1.0);
  }`;

const BLUR_FS = `
  uniform sampler2D tDiffuse; uniform vec2 uDir; varying vec2 vUv;
  void main(){
    vec3 s = texture2D(tDiffuse, vUv).rgb * 0.227027;
    s += texture2D(tDiffuse, vUv + uDir * 1.3846).rgb * 0.316216;
    s += texture2D(tDiffuse, vUv - uDir * 1.3846).rgb * 0.316216;
    s += texture2D(tDiffuse, vUv + uDir * 3.2307).rgb * 0.070270;
    s += texture2D(tDiffuse, vUv - uDir * 3.2307).rgb * 0.070270;
    gl_FragColor = vec4(s, 1.0);
  }`;

const COMPOSITE_FS = `
  uniform sampler2D tScene; uniform sampler2D tBlur; uniform sampler2D tBloom;
  uniform float uFocusY, uFocusHalf, uFocusFeather, uTilt, uBloom, uVignette, uScan, uScanLines;
  uniform vec3 uLift, uGain; uniform float uAspect;
  varying vec2 vUv;
  void main(){
    vec3 sharp = texture2D(tScene, vUv).rgb;
    vec3 blur  = texture2D(tBlur, vUv).rgb;
    float band = smoothstep(0.0, uFocusFeather, abs(vUv.y - uFocusY) - uFocusHalf);
    vec3 col = mix(sharp, blur, clamp(band * uTilt, 0.0, 1.0));
    col += texture2D(tBloom, vUv).rgb * uBloom;
    col = col * uGain + uLift;                                  // colour grade
    float d = length((vUv - 0.5) * vec2(uAspect, 1.0));         // vignette
    col *= 1.0 - smoothstep(0.5, 0.95, d) * uVignette;
    col *= 1.0 - uScan * (0.5 + 0.5 * sin(vUv.y * uScanLines)); // scanlines
    // The scene was lit in linear space into an off-screen target, which skips
    // three's automatic output conversion — encode to sRGB here or everything
    // dark crushes to black (torches and sprites were the only visible things).
    col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
    gl_FragColor = vec4(col, 1.0);
  }`;

export class PostPipeline {
  constructor(renderer) {
    this.renderer = renderer;
    this.quality = 1;
    this.grade = { lift: [0, 0, 0], gain: [1, 1, 1] };

    // fullscreen triangle
    this.fsScene = new THREE.Scene();
    this.fsCam = new THREE.Camera();
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
    this.quad = new THREE.Mesh(geo, null);
    this.quad.frustumCulled = false;
    this.fsScene.add(this.quad);
    this._geo = geo;

    const mk = (fs, uniforms) => new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: fs, uniforms, depthTest: false, depthWrite: false });
    this.mBright = mk(BRIGHT_FS, { tDiffuse: { value: null }, uThreshold: { value: 0.7 } });
    this.mBlur = mk(BLUR_FS, { tDiffuse: { value: null }, uDir: { value: new THREE.Vector2() } });
    this.mComposite = mk(COMPOSITE_FS, {
      tScene: { value: null }, tBlur: { value: null }, tBloom: { value: null },
      uFocusY: { value: 0.66 }, uFocusHalf: { value: 0.22 }, uFocusFeather: { value: 0.24 }, uTilt: { value: 0.85 },
      uBloom: { value: 0.72 }, uVignette: { value: 0.36 }, uScan: { value: 0.04 }, uScanLines: { value: 900 },
      uLift: { value: new THREE.Vector3() }, uGain: { value: new THREE.Vector3(1, 1, 1) }, uAspect: { value: 1 },
    });

    this._targets = null;
  }

  setGrade(g) { if (g) this.grade = g; }

  setSize() {
    const s = this.renderer.getDrawingBufferSize(new THREE.Vector2());
    const w = Math.max(2, s.x | 0), h = Math.max(2, s.y | 0);
    this._w = w; this._h = h;
    this._dispose();
    const opt = { type: THREE.UnsignedByteType, depthBuffer: false };
    const hw = Math.max(1, w >> 1), hh = Math.max(1, h >> 1);
    this.rtScene = new THREE.WebGLRenderTarget(w, h, { depthBuffer: true });
    this.rtA = new THREE.WebGLRenderTarget(hw, hh, opt);
    this.rtB = new THREE.WebGLRenderTarget(hw, hh, opt);
    this.rtC = new THREE.WebGLRenderTarget(hw, hh, opt);
    this.mComposite.uniforms.uAspect.value = w / h;
    this._hw = hw; this._hh = hh;
  }

  get sceneTarget() { return this.rtScene; }

  _pass(mat, target) {
    this.quad.material = mat;
    this.renderer.setRenderTarget(target);
    this.renderer.render(this.fsScene, this.fsCam);
  }
  _blur(src, tmp, dst, radius) {
    this.mBlur.uniforms.tDiffuse.value = src.texture;
    this.mBlur.uniforms.uDir.value.set(radius / this._hw, 0);
    this._pass(this.mBlur, tmp);
    this.mBlur.uniforms.tDiffuse.value = tmp.texture;
    this.mBlur.uniforms.uDir.value.set(0, radius / this._hh);
    this._pass(this.mBlur, dst);
  }

  // Renders the already-populated rtScene through the post chain to the screen.
  present() {
    const U = this.mComposite.uniforms;
    U.uLift.value.set(...this.grade.lift);
    U.uGain.value.set(...this.grade.gain);

    if (this.quality >= 1) {
      // bloom: bright-pass → blur (rtA holds bloom)
      this.mBright.uniforms.tDiffuse.value = this.rtScene.texture;
      this._pass(this.mBright, this.rtA);
      this._blur(this.rtA, this.rtB, this.rtA, 1.0);
      this._blur(this.rtA, this.rtB, this.rtA, 2.0);
      // tilt-shift source: blurred full scene (rtC)
      this._blur(this.rtScene, this.rtB, this.rtC, 1.5);
      U.tBloom.value = this.rtA.texture;
      U.tBlur.value = this.rtC.texture;
      U.uTilt.value = 0.85; U.uBloom.value = 0.72;
    } else if (this.quality > 0) {
      // lite: bloom only, softer tilt
      this.mBright.uniforms.tDiffuse.value = this.rtScene.texture;
      this._pass(this.mBright, this.rtA);
      this._blur(this.rtA, this.rtB, this.rtA, 1.5);
      this._blur(this.rtScene, this.rtB, this.rtC, 1.0);
      U.tBloom.value = this.rtA.texture;
      U.tBlur.value = this.rtC.texture;
      U.uTilt.value = 0.5; U.uBloom.value = 0.6;
    } else {
      // off: composite grade+vignette+scanlines only (no bloom/tilt)
      U.tBloom.value = this.rtScene.texture; U.uBloom.value = 0.0;
      U.tBlur.value = this.rtScene.texture; U.uTilt.value = 0.0;
    }
    U.tScene.value = this.rtScene.texture;
    this._pass(this.mComposite, null);
    this.renderer.setRenderTarget(null);
  }

  _dispose() {
    for (const rt of [this.rtScene, this.rtA, this.rtB, this.rtC]) if (rt) rt.dispose();
  }
  dispose() {
    this._dispose();
    this._geo.dispose();
    this.mBright.dispose(); this.mBlur.dispose(); this.mComposite.dispose();
  }
}
