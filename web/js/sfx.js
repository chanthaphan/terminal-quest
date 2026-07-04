/* Terminal Quest — retro WebAudio sound effects (no audio files) */
(function () {
  const CLIQ = window.CLIQ;

  const S = (CLIQ.sfx = {
    ctx: null,

    ensure() {
      if (!this.ctx) {
        try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    },

    muted() {
      const G = CLIQ.game;
      return !!(G && G.state && G.state.muted);
    },

    tone(freq, dur, delay, type, vol, slideTo) {
      const ctx = this.ctx;
      const t0 = ctx.currentTime + (delay || 0);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type || 'square';
      osc.frequency.setValueAtTime(freq, t0);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
      gain.gain.setValueAtTime(vol || 0.06, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    },

    play(name) {
      if (this.muted()) return;
      if (!this.ensure()) return;
      switch (name) {
        case 'blip': // task complete
          this.tone(880, 0.09, 0, 'square');
          this.tone(1320, 0.12, 0.07, 'square');
          break;
        case 'hit': // your attack lands
          this.tone(220, 0.16, 0, 'sawtooth', 0.08, 90);
          this.tone(1100, 0.05, 0, 'square', 0.04);
          break;
        case 'hurt': // enemy counterattack
          this.tone(160, 0.28, 0, 'sawtooth', 0.09, 55);
          break;
        case 'error': // wrong answer / bad command
          this.tone(140, 0.18, 0, 'square', 0.05, 110);
          break;
        case 'levelup':
          [392, 494, 587, 784].forEach((f, i) => this.tone(f, 0.14, i * 0.09, 'triangle', 0.08));
          break;
        case 'fanfare': // quest complete / boss victory
          [523, 523, 523, 659, 784, 1047].forEach((f, i) => this.tone(f, i === 5 ? 0.5 : 0.13, i * 0.11, 'square', 0.07));
          break;
        case 'click':
          this.tone(660, 0.04, 0, 'square', 0.03);
          break;
        case 'defeat':
          [392, 330, 262, 196].forEach((f, i) => this.tone(f, 0.22, i * 0.16, 'triangle', 0.08));
          break;
      }
    },
  });
})();
