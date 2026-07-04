/* Terminal Quest — boss battle metadata + action delegation to the HD-2D stage */
(function () {
  const CLIQ = window.CLIQ;

  CLIQ.battle = {
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

    // 'enemy' = our attack lands on the boss; 'hero' = the boss counterattacks.
    animate(side) {
      if (CLIQ.stage) CLIQ.stage.strike(side);
    },
  };
})();
