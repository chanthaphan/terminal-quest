/* Terminal Quest — conquest gear: each conquered realm awards a piece of
   equipment that is painted onto the hero sprite (both renderers read the hero
   through CLIQ.heroSprite, so the overlay applies everywhere) and carries a
   gameplay perk. Ownership is derived from completed quests — no new save state
   beyond a "seen" flag used for the award announcement. */
(function () {
  const CLIQ = window.CLIQ;

  // Extra palette letters used by the overlays (merged into the hero palette).
  const GEAR_PALETTE = {
    B: '#fcd34d', // gilded blade
    D: '#67e8f9', // echo shield
    N: '#4ade80', // wayfinder charm
    P: '#ffd166', // skyforged pauldrons
    K: '#818cf8', // warden greaves
    Q: '#f8fafc', // chronicler quill
    O: '#fb923c', // emberforged gauntlets
    M: '#c084fc', // alchemist talisman
    C: '#fcd34d', // archmage crown
    V: '#c084fc', // aura of the nine
  };

  // px overlays: [row, col, paletteChar] on the 16×17 hero matrix.
  CLIQ.gearDefs = {
    bash: {
      name: '🗡 Gilded Blade', perk: 'xp',
      desc: 'Your blade gleams gold. +5% XP from every deed.',
      px: [[8, 2, 'B'], [9, 2, 'B'], [10, 2, 'B'], [11, 2, 'B'], [12, 2, 'B'], [13, 2, 'B']],
    },
    remote: {
      name: '🛡 Echo Shield', perk: 'shield',
      desc: 'Forged from a silent server\'s hull. Blocks the first heart you would lose in each boss fight.',
      px: [[9, 13, 'D'], [10, 13, 'D'], [11, 13, 'D'], [12, 13, 'D'], [10, 12, 'D'], [11, 12, 'D']],
    },
    concepts: {
      name: '🧭 Wayfinder Charm', perk: 'heart',
      desc: 'You always know the way home. +1 heart in every boss fight.',
      px: [[8, 7, 'N'], [8, 8, 'N']],
    },
    azure: {
      name: '☁️ Skyforged Pauldrons', perk: 'xp',
      desc: 'Cloud-metal shoulders. +5% XP from every deed.',
      px: [[7, 4, 'P'], [7, 5, 'P'], [8, 3, 'P'], [7, 10, 'P'], [7, 11, 'P'], [8, 12, 'P']],
    },
    k8s: {
      name: '⚙️ Warden\'s Greaves', perk: 'regen',
      desc: 'Self-healing boots. Clear 3 boss tasks without losing a heart to regain one.',
      px: [[14, 6, 'K'], [14, 7, 'K'], [14, 9, 'K'], [14, 10, 'K'], [15, 6, 'K'], [15, 7, 'K'], [15, 9, 'K'], [15, 10, 'K']],
    },
    git: {
      name: '📜 Chronicler\'s Quill', perk: 'streak',
      desc: 'It writes your legend as you go. Every 5th task in a row without a mistake pays +10 bonus XP.',
      px: [[5, 12, 'Q'], [6, 12, 'Q'], [7, 12, 'Q']],
    },
    docker: {
      name: '🔥 Emberforged Gauntlets', perk: 'xp',
      desc: 'Still warm from the foundry. +5% XP from every deed.',
      px: [[10, 3, 'O'], [11, 3, 'O'], [10, 11, 'O'], [11, 11, 'O']],
    },
    ops: {
      name: '⚗️ Alchemist\'s Talisman', perk: 'voidhints',
      desc: 'Distilled understanding. Hints in the Void no longer cost hearts.',
      px: [[13, 7, 'M'], [13, 8, 'M']],
    },
    final: {
      name: '👑 Archmage\'s Crown', perk: 'crown',
      desc: 'The Nine Realms kneel. +10% XP from every deed.',
      px: [[0, 5, 'C'], [0, 7, 'C'], [0, 8, 'C'], [0, 10, 'C'], [1, 5, 'C'], [1, 6, 'C'], [1, 7, 'C'], [1, 8, 'C'], [1, 9, 'C'], [1, 10, 'C']],
    },
    void: {
      name: '🌀 Aura of the Nine', perk: 'aura',
      desc: 'The Void itself bows. Your legend is complete.',
      px: [[2, 3, 'V'], [4, 13, 'V'], [9, 0, 'V'], [12, 15, 'V'], [16, 3, 'V'], [6, 1, 'V']],
    },
  };

  // Realms conquered = every quest in the module done.
  CLIQ.gearOwned = function () {
    const G = CLIQ.game;
    if (!G || !G.state || !CLIQ.modules) return [];
    const owned = [];
    for (const mod of CLIQ.modules) {
      if (CLIQ.gearDefs[mod.id] && mod.quests.every((q) => G.state.done[q.id])) owned.push(mod.id);
    }
    return owned;
  };

  // Cache-bust signature for hero sprite textures/canvases.
  CLIQ.gearSig = function () { return CLIQ.gearOwned().join(','); };

  // Paint owned gear onto a hero sprite ({palette, px}) — returns a new sprite.
  CLIQ.applyGear = function (sprite) {
    const owned = CLIQ.gearOwned();
    if (!owned.length) return sprite;
    const px = sprite.px.map((row) => row.split(''));
    for (const id of owned) {
      for (const [r, c, ch] of CLIQ.gearDefs[id].px) {
        if (px[r] && c < px[r].length) px[r][c] = ch;
      }
    }
    return { palette: Object.assign({}, sprite.palette, GEAR_PALETTE), px: px.map((r) => r.join('')) };
  };

  // Aggregated perks for the engine.
  CLIQ.gearPerks = function () {
    const owned = CLIQ.gearOwned();
    const has = (id) => owned.includes(id);
    let xpMult = 1;
    for (const id of owned) if (CLIQ.gearDefs[id].perk === 'xp') xpMult += 0.05;
    if (has('final')) xpMult += 0.10;
    return {
      xpMult,
      maxHearts: 3 + (has('concepts') ? 1 : 0),
      shield: has('remote'),
      regen: has('k8s'),
      streak: has('git'),
      voidhints: has('ops'),
    };
  };
})();
