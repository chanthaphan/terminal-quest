/* Terminal Quest — HD-2D stage: parallax scenes, lighting, particles, actors */
(function () {
  const CLIQ = window.CLIQ;

  // ---- scene themes ---------------------------------------------------------

  const T = {
    menu: {
      sky: 'linear-gradient(180deg,#0a0d2a 0%,#1a1f4d 55%,#2a2154 100%)',
      ground: 'linear-gradient(180deg,#221c3a,#120e22)',
      celestial: { x: '76%', y: '16%', size: 54, color: '#e8ecff', glow: 'rgba(190,200,255,0.5)' },
      props: [
        { layer: 'far', css: 'left:6%;bottom:0;width:26%;height:70%;background:#1c2250;clip-path:polygon(0 100%,0 42%,12% 42%,12% 30%,20% 30%,20% 42%,34% 42%,34% 16%,42% 8%,50% 16%,50% 42%,66% 42%,66% 30%,74% 30%,74% 42%,88% 42%,88% 55%,100% 55%,100% 100%)' },
        { layer: 'mid', css: 'right:4%;bottom:0;width:12%;height:54%;background:#262c66;clip-path:polygon(20% 100%,20% 22%,50% 0,80% 22%,80% 100%)' },
      ],
      glows: [{ x: '76%', y: '16%', size: 260, color: 'rgba(160,175,255,0.28)' }],
      particles: 'stars+motes',
    },
    bash: {
      sky: 'linear-gradient(180deg,#241809 0%,#4a3116 55%,#6b4820 100%)',
      ground: 'linear-gradient(180deg,#4a341a,#241809)',
      props: [
        { layer: 'far', css: 'left:4%;bottom:0;width:9%;height:82%;background:#39260f;clip-path:polygon(10% 100%,10% 8%,0 8%,15% 0,85% 0,100% 8%,90% 8%,90% 100%)' },
        { layer: 'far', css: 'left:26%;bottom:0;width:9%;height:82%;background:#39260f;clip-path:polygon(10% 100%,10% 8%,0 8%,15% 0,85% 0,100% 8%,90% 8%,90% 100%)' },
        { layer: 'mid', css: 'left:52%;bottom:0;width:11%;height:88%;background:#2a1c0b;clip-path:polygon(10% 100%,10% 8%,0 8%,15% 0,85% 0,100% 8%,90% 8%,90% 100%)' },
        { layer: 'mid', css: 'right:2%;bottom:50%;width:14%;height:24%;background:#2a1c0b;clip-path:polygon(0 100%,0 20%,8% 20%,8% 0,92% 0,92% 20%,100% 20%,100% 100%)' },
      ],
      glows: [
        { x: '30%', y: '34%', size: 260, color: 'rgba(255,160,50,0.5)', flicker: true },
        { x: '57%', y: '26%', size: 280, color: 'rgba(255,160,50,0.42)', flicker: true },
        { x: '82%', y: '44%', size: 200, color: 'rgba(255,190,90,0.3)', flicker: true },
      ],
      particles: 'motes',
    },
    remote: {
      sky: 'linear-gradient(180deg,#050a1e 0%,#0b1638 60%,#14224e 100%)',
      ground: 'linear-gradient(180deg,#101c36,#080e1e)',
      celestial: { x: '18%', y: '14%', size: 46, color: '#dfe8ff', glow: 'rgba(170,195,255,0.55)' },
      props: [
        { layer: 'far', css: 'left:0;bottom:24%;width:100%;height:3%;background:#0a1330' },
        { layer: 'mid', css: 'left:12%;bottom:0;width:4%;height:52%;background:#1e3260;clip-path:polygon(20% 100%,20% 10%,0 10%,50% 0,100% 10%,80% 10%,80% 100%)' },
        { layer: 'mid', css: 'left:44%;bottom:0;width:4%;height:52%;background:#1e3260;clip-path:polygon(20% 100%,20% 10%,0 10%,50% 0,100% 10%,80% 10%,80% 100%)' },
        { layer: 'mid', css: 'left:76%;bottom:0;width:4%;height:52%;background:#1e3260;clip-path:polygon(20% 100%,20% 10%,0 10%,50% 0,100% 10%,80% 10%,80% 100%)' },
        { layer: 'mid', css: 'left:0;bottom:44%;width:100%;height:1.6%;background:#132048;border-radius:50%' },
      ],
      glows: [{ x: '18%', y: '14%', size: 240, color: 'rgba(150,180,255,0.3)' }, { x: '60%', y: '58%', size: 260, color: 'rgba(60,160,220,0.18)' }],
      particles: 'stars',
    },
    concepts: {
      sky: 'linear-gradient(180deg,#08251c 0%,#124a38 60%,#1a6a4e 100%)',
      ground: 'linear-gradient(180deg,#14452f,#092418)',
      props: [
        { layer: 'far', css: 'left:0;bottom:0;width:34%;height:62%;background:#0d382a;clip-path:polygon(0 100%,0 0,86% 0,86% 34%,60% 34%,60% 62%,100% 62%,100% 100%)' },
        { layer: 'far', css: 'right:0;bottom:0;width:30%;height:56%;background:#0d382a;clip-path:polygon(100% 100%,100% 0,14% 0,14% 40%,42% 40%,42% 68%,0 68%,0 100%)' },
        { layer: 'mid', css: 'left:40%;bottom:0;width:8%;height:52%;background:#0a2c20' },
      ],
      glows: [{ x: '50%', y: '40%', size: 340, color: 'rgba(80,230,160,0.3)', flicker: true }],
      particles: 'mist',
    },
    azure: {
      sky: 'linear-gradient(180deg,#0b2b57 0%,#155a9e 55%,#3f8fd0 100%)',
      ground: 'linear-gradient(180deg,#1c4a7a,#0d2947)',
      celestial: { x: '80%', y: '14%', size: 58, color: '#fff4d6', glow: 'rgba(255,235,170,0.6)' },
      props: [
        { layer: 'far', css: 'left:8%;bottom:30%;width:22%;height:8%;background:rgba(255,255,255,0.5);border-radius:50%;filter:blur(8px)' },
        { layer: 'far', css: 'right:20%;bottom:48%;width:18%;height:7%;background:rgba(255,255,255,0.4);border-radius:50%;filter:blur(8px)' },
        { layer: 'mid', css: 'left:30%;bottom:0;width:14%;height:64%;background:#0e3560;clip-path:polygon(20% 100%,20% 18%,8% 18%,50% 0,92% 18%,80% 18%,80% 100%)' },
        { layer: 'mid', css: 'left:52%;bottom:0;width:10%;height:46%;background:#12406e;clip-path:polygon(15% 100%,15% 14%,0 14%,50% 0,100% 14%,85% 14%,85% 100%)' },
      ],
      glows: [{ x: '80%', y: '14%', size: 300, color: 'rgba(255,240,180,0.4)' }],
      particles: 'motes-white',
    },
    k8s: {
      sky: 'linear-gradient(180deg,#10102e 0%,#221e58 60%,#2e2578 100%)',
      ground: 'linear-gradient(180deg,#241e60,#100c30)',
      props: [
        { layer: 'far', css: 'left:6%;bottom:0;width:12%;height:64%;background:#1c1748;clip-path:polygon(0 100%,0 6%,100% 0,100% 100%)' },
        { layer: 'far', css: 'left:22%;bottom:0;width:12%;height:76%;background:#171240;clip-path:polygon(0 100%,0 0,100% 6%,100% 100%)' },
        { layer: 'mid', css: 'right:8%;bottom:0;width:16%;height:58%;background:#221c68;clip-path:polygon(0 100%,0 12%,50% 0,100% 12%,100% 100%)' },
        { layer: 'mid', css: 'left:48%;bottom:56%;width:7%;height:12%;background:#332b8e;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)' },
        { layer: 'mid', css: 'left:58%;bottom:68%;width:5%;height:9%;background:#3d34a4;clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)' },
      ],
      glows: [{ x: '28%', y: '38%', size: 300, color: 'rgba(90,150,255,0.35)', flicker: true }, { x: '86%', y: '52%', size: 240, color: 'rgba(140,100,255,0.3)' }],
      particles: 'bits',
    },
    git: {
      sky: 'linear-gradient(180deg,#241028 0%,#4d1e33 55%,#7a3524 100%)',
      ground: 'linear-gradient(180deg,#33202a,#160d12)',
      celestial: { x: '70%', y: '22%', size: 64, color: '#ffcf9e', glow: 'rgba(255,170,90,0.55)' },
      props: [
        { layer: 'far', css: 'left:4%;bottom:0;width:30%;height:86%;background:#361c30;clip-path:polygon(42% 100%,42% 44%,20% 40%,6% 26%,16% 26%,4% 12%,26% 18%,22% 4%,38% 14%,50% 0,62% 14%,78% 4%,74% 18%,96% 12%,84% 26%,94% 26%,80% 40%,58% 44%,58% 100%)' },
        { layer: 'mid', css: 'right:12%;bottom:48%;width:6%;height:30%;background:#4a2438;clip-path:polygon(0 0,100% 0,100% 82%,50% 100%,0 82%)' },
        { layer: 'mid', css: 'right:22%;bottom:52%;width:5%;height:24%;background:#4a2438;clip-path:polygon(0 0,100% 0,100% 82%,50% 100%,0 82%)' },
      ],
      glows: [{ x: '70%', y: '22%', size: 320, color: 'rgba(255,180,90,0.45)' }],
      particles: 'fireflies',
    },
    docker: {
      sky: 'linear-gradient(180deg,#1e0a10 0%,#48141a 55%,#7a2418 100%)',
      ground: 'linear-gradient(180deg,#54200e,#240c05)',
      props: [
        { layer: 'far', css: 'left:8%;bottom:0;width:20%;height:72%;background:#331010;clip-path:polygon(0 100%,0 30%,20% 30%,20% 0,32% 0,32% 30%,70% 30%,70% 12%,82% 12%,82% 30%,100% 30%,100% 100%)' },
        { layer: 'mid', css: 'right:8%;bottom:0;width:26%;height:60%;background:#421512;clip-path:polygon(0 100%,0 34%,14% 34%,14% 10%,26% 10%,26% 34%,100% 34%,100% 100%)' },
        { layer: 'mid', css: 'left:38%;bottom:0;width:16%;height:52%;background:#521a10;clip-path:polygon(0 100%,10% 0,90% 0,100% 100%)' },
      ],
      glows: [
        { x: '46%', y: '58%', size: 360, color: 'rgba(255,120,35,0.55)', flicker: true },
        { x: '80%', y: '50%', size: 240, color: 'rgba(255,90,25,0.4)', flicker: true },
      ],
      particles: 'embers',
    },
    ops: {
      sky: 'linear-gradient(180deg,#0a2410 0%,#14481e 55%,#1e662a 100%)',
      ground: 'linear-gradient(180deg,#164a20,#0a240e)',
      props: [
        { layer: 'far', css: 'left:4%;bottom:0;width:26%;height:78%;background:#103a16;clip-path:polygon(0 100%,0 0,100% 0,100% 18%,10% 18%,10% 40%,100% 40%,100% 62%,10% 62%,10% 100%)' },
        { layer: 'mid', css: 'right:8%;bottom:44%;width:8%;height:30%;background:#1a5222;clip-path:polygon(30% 0,70% 0,70% 40%,100% 70%,100% 100%,0 100%,0 70%,30% 40%)' },
        { layer: 'mid', css: 'right:18%;bottom:46%;width:6%;height:24%;background:#1a5222;clip-path:polygon(30% 0,70% 0,70% 40%,100% 70%,100% 100%,0 100%,0 70%,30% 40%)' },
      ],
      glows: [{ x: '78%', y: '52%', size: 260, color: 'rgba(100,255,130,0.42)', flicker: true }, { x: '16%', y: '36%', size: 220, color: 'rgba(70,230,110,0.3)' }],
      particles: 'motes-green',
    },
    final: {
      sky: 'linear-gradient(180deg,#160a26 0%,#3c1c68 55%,#5c2c96 100%)',
      ground: 'linear-gradient(180deg,#3a2458,#1a1030)',
      props: [
        { layer: 'far', css: 'left:6%;bottom:0;width:7%;height:86%;background:#2a1548;clip-path:polygon(15% 100%,15% 6%,0 6%,20% 0,80% 0,100% 6%,85% 6%,85% 100%)' },
        { layer: 'far', css: 'right:6%;bottom:0;width:7%;height:86%;background:#2a1548;clip-path:polygon(15% 100%,15% 6%,0 6%,20% 0,80% 0,100% 6%,85% 6%,85% 100%)' },
        { layer: 'mid', css: 'left:41%;bottom:44%;width:18%;height:44%;background:#341d58;clip-path:polygon(10% 100%,10% 40%,0 40%,0 22%,26% 22%,26% 0,74% 0,74% 22%,100% 22%,100% 40%,90% 40%,90% 100%)' },
      ],
      glows: [{ x: '50%', y: '30%', size: 340, color: 'rgba(200,130,255,0.45)', flicker: true }, { x: '50%', y: '70%', size: 300, color: 'rgba(255,215,100,0.28)' }],
      particles: 'motes',
    },
    void: {
      sky: 'linear-gradient(180deg,#020208 0%,#12061e 55%,#2a0a2e 100%)',
      ground: 'linear-gradient(180deg,#1c0a24,#08030c)',
      celestial: { x: '50%', y: '18%', size: 66, color: '#12061e', glow: 'rgba(190,60,255,0.55)' },
      props: [
        { layer: 'far', css: 'left:8%;bottom:38%;width:16%;height:9%;background:#1a0c2a;clip-path:polygon(0 40%,15% 0,85% 0,100% 40%,70% 100%,30% 100%)' },
        { layer: 'far', css: 'right:14%;bottom:52%;width:12%;height:7%;background:#160a24;clip-path:polygon(0 40%,15% 0,85% 0,100% 40%,70% 100%,30% 100%)' },
        { layer: 'mid', css: 'left:34%;bottom:46%;width:9%;height:6%;background:#241038;clip-path:polygon(0 40%,15% 0,85% 0,100% 40%,70% 100%,30% 100%)' },
        { layer: 'mid', css: 'left:4%;bottom:0;width:8%;height:64%;background:#1c0c30;clip-path:polygon(20% 100%,35% 0,65% 0,80% 100%)' },
        { layer: 'mid', css: 'right:4%;bottom:0;width:8%;height:64%;background:#1c0c30;clip-path:polygon(20% 100%,35% 0,65% 0,80% 100%)' },
      ],
      glows: [
        { x: '50%', y: '18%', size: 320, color: 'rgba(190,60,255,0.35)', flicker: true },
        { x: '20%', y: '70%', size: 220, color: 'rgba(255,60,60,0.22)', flicker: true },
        { x: '80%', y: '70%', size: 220, color: 'rgba(60,220,160,0.18)', flicker: true },
      ],
      particles: 'fireflies',
    },
    sandbox: {
      sky: 'linear-gradient(180deg,#12295e 0%,#2e5f9e 45%,#e8955e 85%,#f0b06a 100%)',
      ground: 'linear-gradient(180deg,#1d4668,#0d2438)',
      celestial: { x: '50%', y: '58%', size: 70, color: '#ffdf9e', glow: 'rgba(255,200,110,0.65)' },
      props: [
        { layer: 'far', css: 'left:0;bottom:26%;width:100%;height:2%;background:rgba(255,190,120,0.35);filter:blur(2px)' },
        { layer: 'mid', css: 'left:10%;bottom:0;width:10%;height:30%;background:#123048;clip-path:polygon(0 100%,30% 0,70% 0,100% 100%)' },
      ],
      glows: [{ x: '50%', y: '58%', size: 340, color: 'rgba(255,190,110,0.4)' }],
      particles: 'motes-white',
    },
  };

  // ---- particle recipes -------------------------------------------------------

  const PARTICLES = {
    'motes': { n: 14, mk: () => ({ cls: 'p-mote', style: `background:#fcd34d;width:3px;height:3px` }) },
    'motes-white': { n: 12, mk: () => ({ cls: 'p-mote', style: `background:#f0f4ff;width:3px;height:3px` }) },
    'motes-green': { n: 14, mk: () => ({ cls: 'p-mote', style: `background:#6dff9e;width:3px;height:3px` }) },
    'embers': { n: 20, mk: () => ({ cls: 'p-ember', style: `background:${Math.random() > 0.5 ? '#ff8c3a' : '#ffb347'};width:${2 + Math.random() * 2}px;height:${2 + Math.random() * 2}px` }) },
    'mist': { n: 7, mk: () => ({ cls: 'p-mist', style: `width:${140 + Math.random() * 120}px;height:${30 + Math.random() * 20}px` }) },
    'stars': { n: 22, mk: () => ({ cls: 'p-star', style: `width:2px;height:2px;top:${3 + Math.random() * 42}%` }) },
    'fireflies': { n: 12, mk: () => ({ cls: 'p-firefly', style: `background:#d9ff6e;width:3px;height:3px` }) },
    'bits': { n: 14, mk: () => ({ cls: 'p-mote', style: `background:#67e8f9;width:2px;height:5px;border-radius:1px` }) },
    'stars+motes': { n: 0, combo: ['stars', 'motes'] },
  };

  // ---- overworld landmark positions (left %, in module order) ----------------

  const LANDMARK_X = { bash: 7, remote: 16, concepts: 25, azure: 34, k8s: 43, git: 52, docker: 61, ops: 70, final: 81, void: 92 };

  // ---- stage ------------------------------------------------------------------

  const S = (CLIQ.stage = {
    root: null,
    els: {},
    sceneId: null,
    heroClass: null,
    heroScale: 0,
    enemyName: null,
    dissolved: false,
    traveling: false,
    _timers: [],
    _pendingBattle: null,

    init(root) {
      this.root = root;
      root.innerHTML =
        '<div class="stage-viewport">' +
        '  <div class="scene-layers"></div>' +
        '  <div class="stage-fx"></div>' +
        '  <div class="stage-plates" hidden>' +
        '    <div class="hp-plate plate-enemy"><div class="hp-name"></div><div class="hp-bar"><div class="hp-fill enemy-fill"></div></div></div>' +
        '    <div class="hp-plate plate-hero"><div class="hp-name">HERO</div><div class="hp-bar"><div class="hp-fill hero-fill"></div></div><div class="hp-hearts"></div></div>' +
        '  </div>' +
        '  <div class="actor actor-enemy" hidden><canvas class="sprite-bloom"></canvas><canvas class="sprite-main"></canvas><div class="ground-shadow"></div></div>' +
        '  <div class="actor actor-hero"><canvas class="sprite-bloom"></canvas><canvas class="sprite-main"></canvas><div class="ground-shadow"></div></div>' +
        '  <div class="stage-flash"></div>' +
        '  <div class="stage-vignette"></div>' +
        '  <div class="stage-scanlines"></div>' +
        '</div>' +
        '<div class="dialog-box"><div class="dialog-content"></div></div>';
      this.els = {
        viewport: root.querySelector('.stage-viewport'),
        layers: root.querySelector('.scene-layers'),
        fx: root.querySelector('.stage-fx'),
        plates: root.querySelector('.stage-plates'),
        hero: root.querySelector('.actor-hero'),
        enemy: root.querySelector('.actor-enemy'),
        flash: root.querySelector('.stage-flash'),
        dialog: root.querySelector('.dialog-content'),
      };
    },

    dialogEl() {
      return this.els.dialog;
    },

    reduced() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    drawActor(actorEl, sprite, scale) {
      CLIQ.drawSprite(actorEl.querySelector('.sprite-main'), sprite, scale);
      CLIQ.drawSprite(actorEl.querySelector('.sprite-bloom'), sprite, scale);
    },

    drawHero(scale) {
      if (this.heroScale === scale && this._heroDrawnClass === this.heroClass) return;
      this.heroScale = scale;
      this._heroDrawnClass = this.heroClass;
      this.drawActor(this.els.hero, CLIQ.heroSprite(this.heroClass), scale);
    },

    _t(ms, fn) {
      this._timers.push(setTimeout(fn, ms));
    },

    cancelTravel() {
      this._timers.forEach(clearTimeout);
      this._timers = [];
      if (this.traveling) {
        this.traveling = false;
        this.root.classList.remove('traveling');
        this.els.viewport.classList.remove('zoom-arrive');
        this.els.flash.classList.remove('flash-on');
        const hero = this.els.hero;
        hero.classList.remove('walking');
        hero.style.transition = '';
        if (this._pendingBattle) { const p = this._pendingBattle; this._pendingBattle = null; this.battle(p[0], p[1], p[2], p[3]); }
      }
    },

    setScene(id, heroClass) {
      this.heroClass = heroClass;
      if (this.sceneId === id) { this.drawHero(id === 'world' ? 4 : 7); return; }
      const from = this.sceneId;
      this.cancelTravel();
      const travel = from && from !== 'menu' && id !== 'menu' && id !== 'world' && !this.reduced();
      this.sceneId = id;
      if (travel) this.runTravel(id);
      else this.buildScene(id);
    },

    // Journey: far overworld view → hero walks to the landmark → flash-zoom → realm.
    runTravel(target) {
      this.traveling = true;
      this.root.classList.add('traveling');
      this.buildScene('world');
      const hero = this.els.hero;
      const lmx = LANDMARK_X[target] != null ? LANDMARK_X[target] : 50;
      hero.classList.add('walking');
      hero.style.transition = 'none';
      hero.style.right = '90%';
      void hero.offsetWidth;
      hero.style.transition = 'right 1.9s linear';
      hero.style.right = Math.max(2, 100 - lmx - 3) + '%';
      const targetLm = this.els.layers.querySelector(`.landmark[data-realm="${target}"]`);
      if (targetLm) targetLm.classList.add('lm-target');
      this._t(1950, () => {
        this.els.flash.classList.add('flash-on');
        this.els.viewport.classList.add('zoom-arrive');
        this._t(420, () => {
          hero.classList.remove('walking');
          hero.style.transition = '';
          this.els.viewport.classList.remove('zoom-arrive');
          this.buildScene(target);
          this.els.flash.classList.remove('flash-on');
          this.walkIn();
          this._t(700, () => {
            this.traveling = false;
            this.root.classList.remove('traveling');
            if (this._pendingBattle) { const p = this._pendingBattle; this._pendingBattle = null; this.battle(p[0], p[1], p[2], p[3]); }
          });
        });
      });
    },

    walkIn() {
      this.animOnce(this.els.hero, 'walk-in', 750);
    },

    buildScene(id) {
      const theme = T[id] || T.menu;
      const hero = this.els.hero;
      if (id === 'world') {
        this.drawHero(4);
        hero.style.right = '90%';
        hero.style.bottom = '26%';
      } else {
        this.drawHero(7);
        hero.style.right = '';
        hero.style.bottom = '';
        hero.style.transition = '';
      }
      if (id === 'world') return this.buildWorld();
      const L = this.els.layers;
      let html = `<div class="layer sky" style="background:${theme.sky}"></div>`;
      if (theme.celestial) {
        const c = theme.celestial;
        html += `<div class="layer celestial" style="left:${c.x};top:${c.y};width:${c.size}px;height:${c.size}px;background:${c.color};box-shadow:0 0 ${c.size}px ${c.size / 2}px ${c.glow}"></div>`;
      }
      html += '<div class="layer plane-far">';
      for (const p of theme.props.filter((x) => x.layer === 'far')) html += `<div class="prop" style="${p.css}"></div>`;
      html += '</div><div class="layer plane-mid">';
      for (const p of theme.props.filter((x) => x.layer === 'mid')) html += `<div class="prop" style="${p.css}"></div>`;
      html += '</div>';
      html += `<div class="layer stage-ground" style="background:${theme.ground}"></div>`;
      for (const g of theme.glows || []) {
        html += `<div class="glow${g.flicker ? ' flicker' : ''}" style="left:${g.x};top:${g.y};width:${g.size}px;height:${g.size}px;background:radial-gradient(circle,${g.color},transparent 70%)"></div>`;
      }
      html += `<div class="layer particles">${this.particleHTML(theme.particles)}</div>`;
      L.innerHTML = html;
      L.classList.remove('scene-enter');
      void L.offsetWidth;
      L.classList.add('scene-enter');
    },

    // Far view: rolling hills, a winding path, one landmark per realm (clickable).
    buildWorld() {
      const G = CLIQ.game;
      const L = this.els.layers;
      let html =
        '<div class="layer sky" style="background:linear-gradient(180deg,#1a1440 0%,#3c2a6e 45%,#8a4a6e 78%,#c97a5a 100%)"></div>' +
        '<div class="layer celestial" style="left:74%;top:12%;width:52px;height:52px;background:#ffe9c4;box-shadow:0 0 60px 26px rgba(255,215,150,0.5);border-radius:50%"></div>' +
        '<div class="layer plane-far">' +
        '  <div class="prop" style="left:-10%;bottom:26%;width:60%;height:34%;background:#241a52;border-radius:50% 50% 0 0"></div>' +
        '  <div class="prop" style="left:38%;bottom:26%;width:52%;height:28%;background:#2c2060;border-radius:50% 50% 0 0"></div>' +
        '  <div class="prop" style="left:76%;bottom:26%;width:46%;height:38%;background:#1e164a;border-radius:50% 50% 0 0"></div>' +
        '</div>';
      html += '<div class="layer plane-mid">';
      for (const mod of CLIQ.modules) {
        const x = LANDMARK_X[mod.id] != null ? LANDMARK_X[mod.id] : 50;
        const y = 27 + (Object.keys(LANDMARK_X).indexOf(mod.id) % 2) * 5;
        const done = G && mod.quests.every((q) => G.state.done[q.id]);
        const locked = G && G.moduleLocked(mod);
        html +=
          `<div class="landmark${done ? ' lm-done' : ''}${locked ? ' lm-locked' : ''}" data-realm="${mod.id}" style="left:${x}%;bottom:${y}%" title="${mod.title}">` +
          `<span class="lm-flag">${done ? '✦' : locked ? '🔒' : ''}</span>` +
          `<span class="lm-icon">${mod.icon}</span><span class="lm-base"></span></div>`;
      }
      html += '</div>';
      html +=
        '<div class="layer stage-ground" style="background:linear-gradient(180deg,#3a2a54,#1a1230);height:27%"></div>' +
        '<div class="layer world-path"></div>' +
        '<div class="glow" style="left:74%;top:12%;width:280px;height:280px;background:radial-gradient(circle,rgba(255,215,150,0.35),transparent 70%)"></div>' +
        `<div class="layer particles">${this.particleHTML('stars+motes')}</div>`;
      L.innerHTML = html;
      L.classList.remove('scene-enter');
      void L.offsetWidth;
      L.classList.add('scene-enter');
      // landmarks travel you there
      L.querySelectorAll('.landmark').forEach((lm) => {
        lm.addEventListener('click', () => {
          const g = CLIQ.game;
          if (!g || !g.state.class) return;
          const mod = CLIQ.modules.find((m) => m.id === lm.dataset.realm);
          if (!mod || g.moduleLocked(mod)) return;
          const quest = mod.quests.find((q) => !g.state.done[q.id]) || mod.quests[0];
          g.startQuest(mod, quest);
        });
      });
    },

    particleHTML(type) {
      if (!type) return '';
      const recipe = PARTICLES[type];
      if (!recipe) return '';
      if (recipe.combo) return recipe.combo.map((t) => this.particleHTML(t)).join('');
      let html = '';
      for (let i = 0; i < recipe.n; i++) {
        const p = recipe.mk();
        const left = (Math.random() * 96 + 2).toFixed(1);
        const dur = (6 + Math.random() * 10).toFixed(1);
        const delay = (-Math.random() * 16).toFixed(1);
        html += `<span class="particle ${p.cls}" style="left:${left}%;animation-duration:${dur}s;animation-delay:${delay}s;${p.style}"></span>`;
      }
      return html;
    },

    // ---- battle presentation ----

    battle(meta, enemyPct, hearts, won) {
      if (this.traveling) { this._pendingBattle = [meta, enemyPct, hearts, won]; return; }
      const E = this.els;
      if (this.enemyName !== meta.name) {
        this.enemyName = meta.name;
        this.dissolved = false;
        this.drawActor(E.enemy, CLIQ.sprites[meta.sprite], (meta.scale || 9) - 1);
        E.enemy.hidden = false;
        E.enemy.classList.remove('dissolve');
        E.enemy.classList.remove('enemy-enter');
        void E.enemy.offsetWidth;
        E.enemy.classList.add('enemy-enter');
        E.plates.querySelector('.plate-enemy .hp-name').textContent = meta.name;
      }
      E.plates.hidden = false;
      E.plates.querySelector('.enemy-fill').style.width = Math.round(enemyPct * 100) + '%';
      E.plates.querySelector('.hero-fill').style.width = Math.round((hearts / 3) * 100) + '%';
      E.plates.querySelector('.hp-hearts').textContent = '❤'.repeat(hearts) + '♡'.repeat(3 - hearts);
      if (won && !this.dissolved) {
        this.dissolved = true;
        E.enemy.classList.add('dissolve');
      }
    },

    endBattle() {
      if (this.enemyName === null) return;
      this.enemyName = null;
      this.dissolved = false;
      this.els.enemy.hidden = true;
      this.els.enemy.classList.remove('dissolve', 'enemy-enter');
      this.els.plates.hidden = true;
    },

    // ---- action effects ----

    burst(overEl, color, count) {
      const rect = overEl.getBoundingClientRect();
      const vrect = this.els.viewport.getBoundingClientRect();
      const cx = rect.left - vrect.left + rect.width / 2;
      const cy = rect.top - vrect.top + rect.height / 2;
      for (let i = 0; i < count; i++) {
        const s = document.createElement('span');
        s.className = 'spark';
        const ang = Math.random() * Math.PI * 2;
        const dist = 24 + Math.random() * 46;
        s.style.cssText = `left:${cx}px;top:${cy}px;background:${color};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 20}px`;
        this.els.fx.appendChild(s);
        setTimeout(() => s.remove(), 700);
      }
    },

    pop(overEl, text, cls) {
      const rect = overEl.getBoundingClientRect();
      const vrect = this.els.viewport.getBoundingClientRect();
      const d = document.createElement('div');
      d.className = 'dmg-pop-hd ' + (cls || '');
      d.textContent = text;
      d.style.left = rect.left - vrect.left + rect.width / 2 + 'px';
      d.style.top = rect.top - vrect.top + 'px';
      this.els.fx.appendChild(d);
      setTimeout(() => d.remove(), 950);
    },

    animOnce(el, cls, ms) {
      el.classList.remove(cls);
      void el.offsetWidth;
      el.classList.add(cls);
      setTimeout(() => el.classList.remove(cls), ms);
    },

    cast() {
      // non-battle task completion: hero casts, gold sparks
      this.animOnce(this.els.hero, 'cast', 450);
      this.burst(this.els.hero, '#fcd34d', 10);
    },

    // ---- per-command action FX -------------------------------------------------

    heroPoint(dx, dy) {
      const r = this.els.hero.getBoundingClientRect();
      const v = this.els.viewport.getBoundingClientRect();
      return { x: r.left - v.left + r.width / 2 + (dx || 0), y: r.top - v.top + r.height / 2 + (dy || 0) };
    },

    spawn(cls, x, y, css, ttl) {
      const d = document.createElement('div');
      d.className = cls;
      d.style.cssText = `left:${x}px;top:${y}px;` + (css || '');
      this.els.fx.appendChild(d);
      setTimeout(() => d.remove(), ttl || 1200);
      return d;
    },

    chip(text, isErr) {
      const p = this.heroPoint(0, -this.els.hero.offsetHeight / 2 - 14);
      this.spawn('fx-label' + (isErr ? ' fx-label-err' : ''), p.x, p.y, '', 1200).textContent = text;
    },

    fxFor(e) {
      const sub = e.argv && e.argv[1];
      if (e.cmd === 'git')
        return { status: 'scan', log: 'scan', branch: 'scan', diff: 'scan', init: 'conjure', add: 'write', commit: 'write', merge: 'transform', checkout: 'step', switch: 'step' }[sub] || 'transform';
      if (e.cmd === 'docker')
        return { ps: 'scan', images: 'scan', pull: 'proj:#7dd3fc', run: 'conjure', start: 'transform', restart: 'transform', stop: 'transform', rm: 'slash', rmi: 'slash', logs: 'read', exec: 'transform', build: 'conjure' }[sub] || 'scan';
      if (e.cmd === 'kubectl')
        return { get: 'scan', describe: 'read', logs: 'read', scale: 'conjure', delete: 'slash', set: 'transform', apply: 'conjure', rollout: 'transform', config: 'scan' }[sub] || 'scan';
      if (e.cmd === 'az') {
        if (e.raw.includes(' delete')) return 'slash';
        if (e.raw.includes(' create')) return 'conjure';
        if (/ (list|show)\b/.test(e.raw)) return 'scan';
        if (sub === 'login') return 'write';
        return 'transform';
      }
      return {
        cd: 'step', ssh: 'portal', exit: 'portal',
        ls: 'scan', find: 'scan', grep: 'scan', ps: 'scan', top: 'scan', df: 'scan', du: 'scan', free: 'scan',
        ss: 'scan', netstat: 'scan', pwd: 'scan', whoami: 'scan', hostname: 'scan', history: 'scan',
        env: 'scan', which: 'scan', crontab: 'scan', ip: 'scan', ifconfig: 'scan',
        cat: 'read', head: 'read', tail: 'read', man: 'read', help: 'read', wc: 'read',
        mkdir: 'conjure', touch: 'conjure', cp: 'conjure', tar: 'conjure',
        echo: 'write',
        sed: 'transform', awk: 'transform', sort: 'transform', uniq: 'transform', cut: 'transform',
        chmod: 'transform', mv: 'transform', bash: 'transform', sh: 'transform', systemctl: 'transform',
        rm: 'slash', kill: 'slash',
        ping: 'proj:#22d3ee', traceroute: 'proj:#22d3ee', nc: 'proj:#22d3ee',
        dig: 'proj:#c084fc', nslookup: 'proj:#c084fc',
        curl: 'proj:#fb923c', scp: 'proj:#4ade80',
      }[e.cmd] || 'scan';
    },

    // Every terminal command acts out in the scene.
    action(e) {
      if (this.traveling || !e.cmd || e.cmd === 'clear' || !this.els.fx) return;
      if (this.els.fx.children.length > 12) return; // don't flood on rapid input
      const failed = e.code !== 0;
      this.chip('$ ' + (e.raw.length > 26 ? e.raw.slice(0, 24) + '…' : e.raw), failed);
      const hero = this.els.hero;
      if (failed) {
        const p = this.heroPoint(-46, 0);
        this.spawn('fx-puff', p.x, p.y, '', 750);
        this.pop(hero, '✗', 'dmg-hero');
        if (CLIQ.sfx) CLIQ.sfx.play('error');
        return;
      }
      const kind = this.fxFor(e);
      const side = this.heroPoint(-56, 4);
      if (kind === 'scan') {
        this.spawn('fx-ring', side.x, side.y, 'width:60px;height:60px', 950);
        this.spawn('fx-ring', side.x, side.y, 'width:60px;height:60px;animation-delay:.18s', 1150);
      } else if (kind === 'read') {
        const p = this.heroPoint(-44, -30);
        this.spawn('fx-scroll', p.x, p.y, '', 1250);
      } else if (kind === 'conjure') {
        const p = this.heroPoint(-58, 14);
        this.spawn('fx-conjure', p.x, p.y, '', 1350);
        this.burst(hero, '#8ab4ff', 6);
      } else if (kind === 'write') {
        this.animOnce(hero, 'cast', 400);
        this.burst(hero, '#fcd34d', 7);
      } else if (kind === 'transform') {
        const p = this.heroPoint(-48, 0);
        this.spawn('fx-swirl', p.x, p.y, '', 950);
      } else if (kind === 'slash') {
        const p = this.heroPoint(-54, 0);
        this.animOnce(hero, 'cast', 400);
        this.spawn('fx-slash', p.x, p.y, '', 650);
        this.burst(hero, '#ff5a5a', 8);
      } else if (kind === 'step') {
        this.animOnce(hero, 'step-anim', 620);
      } else if (kind === 'portal') {
        const p = this.heroPoint(-72, -6);
        this.spawn('fx-portal', p.x, p.y, '', 1150);
        this.animOnce(hero, e.cmd === 'exit' ? 'dash-right' : 'dash-left', 700);
      } else if (kind && kind.startsWith('proj:')) {
        const color = kind.slice(5);
        this.animOnce(hero, 'cast', 400);
        const p = this.heroPoint(-34, -10);
        const dist = -Math.max(120, this.els.viewport.clientWidth * 0.42);
        this.spawn('fx-orb', p.x, p.y, `color:${color};--dist:${dist}px`, 850);
        this._t(760, () => {
          if (!this.els.fx) return;
          this.spawn('fx-echo', p.x + dist, p.y - 30, `color:${color}`, 750);
        });
      }
    },

    strike(side) {
      const E = this.els;
      if (side === 'enemy') {
        this.animOnce(E.hero, 'cast', 450);
        setTimeout(() => {
          if (E.enemy.hidden) return;
          this.animOnce(E.enemy, 'hit', 480);
          this.burst(E.enemy, '#67e8f9', 14);
          this.pop(E.enemy, String(200 + Math.floor(Math.random() * 300)));
        }, 170);
      } else {
        this.animOnce(E.enemy, 'lunge', 420);
        setTimeout(() => {
          this.animOnce(E.hero, 'flinch', 480);
          this.animOnce(E.viewport, 'screen-shake', 450);
          this.burst(E.hero, '#f87171', 10);
          this.pop(E.hero, '-1 ♥', 'dmg-hero');
        }, 160);
      }
    },
  });
})();
