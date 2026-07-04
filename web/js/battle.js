/* Terminal Quest — Final Fantasy style boss battles */
(function () {
  const CLIQ = window.CLIQ;

  const B = (CLIQ.battle = {
    // boss quest id -> battle presentation
    meta: {
      'bash-boss': { sprite: 'shade', name: 'SHADE OF THE SANCTUM', scale: 9, taunt: 'It whispers of scattered files...' },
      'net-boss': { sprite: 'server', name: 'THE SILENT SERVER', scale: 9, taunt: 'Port 80 answers to no one!' },
      'con-boss': { sprite: 'guardian', name: 'LABYRINTH GUARDIAN', scale: 9, taunt: 'Name the layer, or be lost!' },
      'az-boss': { sprite: 'warden', name: 'WARDEN OF THE CITADEL', scale: 9, taunt: 'Your gold drains by the hour!' },
      'k8s-boss': { sprite: 'wyrm', name: 'THE CHAOS WYRM', scale: 8, taunt: 'Your pods shall crash forever!' },
      'git-boss': { sprite: 'wraith', name: 'THE MERGE WRAITH', scale: 9, taunt: 'Your history is MINE to tangle!' },
      'docker-boss': { sprite: 'golem', name: 'THE IMAGE GOLEM', scale: 9, taunt: 'Exit code 1! Forever 1!' },
      'ops-boss': { sprite: 'daemon', name: 'THE RUNAWAY DAEMON', scale: 9, taunt: '97% CPU and climbing!' },
      'final-boss': { sprite: 'archlich', name: 'ARCHLICH OF LEGACY SYSTEMS', scale: 8, taunt: 'None have ever passed my Trial!' },
    },

    isBattle(quest) {
      return !!(quest && quest.boss && this.meta[quest.id]);
    },

    // Build the battle scene DOM for the current quest state.
    scene(quest) {
      const G = CLIQ.game;
      const m = this.meta[quest.id];
      const total = quest.tasks.length;
      const left = Math.max(0, total - G.taskIndex);
      const enemyPct = Math.round((left / total) * 100);
      const heroPct = Math.round((G.hearts / 3) * 100);
      const won = left === 0;

      const root = document.createElement('div');
      root.className = 'battle-scene' + (won ? ' battle-won' : '');
      root.innerHTML =
        '<div class="battle-sky"></div>' +
        '<div class="battle-row">' +
        '  <div class="combatant enemy">' +
        '    <div class="hp-plate">' +
        '      <div class="hp-name">' + m.name + '</div>' +
        '      <div class="hp-bar"><div class="hp-fill enemy-fill" style="width:' + enemyPct + '%"></div></div>' +
        '    </div>' +
        '    <div class="sprite-wrap enemy-wrap"><canvas class="pixel-sprite enemy-sprite"></canvas><div class="ground-shadow"></div></div>' +
        '  </div>' +
        '  <div class="combatant hero">' +
        '    <div class="hp-plate">' +
        '      <div class="hp-name">HERO</div>' +
        '      <div class="hp-bar"><div class="hp-fill hero-fill" style="width:' + heroPct + '%"></div></div>' +
        '      <div class="hp-hearts">' + '❤'.repeat(G.hearts) + '♡'.repeat(3 - G.hearts) + '</div>' +
        '    </div>' +
        '    <div class="sprite-wrap hero-wrap"><canvas class="pixel-sprite hero-sprite"></canvas><div class="ground-shadow"></div></div>' +
        '  </div>' +
        '</div>' +
        '<div class="battle-log">' + (G.battleLog || m.name + ' draws near! ' + m.taunt) + '</div>';

      CLIQ.drawSprite(root.querySelector('.enemy-sprite'), CLIQ.sprites[m.sprite], m.scale || 9);
      CLIQ.drawSprite(root.querySelector('.hero-sprite'), CLIQ.heroSprite(G.state.class), 6);
      return root;
    },

    // Trigger a hit animation on the freshly rendered scene.
    animate(side) {
      const scene = document.querySelector('.battle-scene');
      if (!scene) return;
      const wrap = scene.querySelector(side === 'enemy' ? '.enemy-wrap' : '.hero-wrap');
      const attacker = scene.querySelector(side === 'enemy' ? '.hero-wrap' : '.enemy-wrap');
      if (attacker) {
        attacker.classList.add(side === 'enemy' ? 'lunge-left' : 'lunge-right');
        setTimeout(() => attacker.classList.remove('lunge-left', 'lunge-right'), 450);
      }
      if (wrap) {
        setTimeout(() => {
          wrap.classList.add('hit-flash');
          const dmg = document.createElement('div');
          dmg.className = 'dmg-pop' + (side === 'hero' ? ' dmg-hero' : '');
          dmg.textContent = side === 'enemy' ? String(200 + Math.floor(Math.random() * 300)) : '-1 ♥';
          wrap.appendChild(dmg);
          setTimeout(() => dmg.remove(), 900);
          setTimeout(() => wrap.classList.remove('hit-flash'), 500);
        }, 180);
      }
      if (side === 'hero') {
        scene.classList.add('screen-shake');
        setTimeout(() => scene.classList.remove('screen-shake'), 500);
      }
    },
  });
})();
