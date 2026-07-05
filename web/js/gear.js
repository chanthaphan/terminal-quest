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

  // px overlay helpers: build [row, col, paletteChar] lists on the 32×34 hero.
  const colRun = (c, r0, r1, ch) => { const a = []; for (let r = r0; r <= r1; r++) a.push([r, c, ch]); return a; };
  const rowRun = (r, c0, c1, ch) => { const a = []; for (let c = c0; c <= c1; c++) a.push([r, c, ch]); return a; };
  const rect = (r0, r1, c0, c1, ch) => { const a = []; for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) a.push([r, c, ch]); return a; };

  CLIQ.gearDefs = {
    bash: {
      name: '🗡 Gilded Blade', perk: 'xp',
      desc: 'Your blade gleams gold. +5% XP from every deed.',
      px: [...colRun(6, 15, 24, 'B'), ...colRun(7, 14, 24, 'B')],
    },
    remote: {
      name: '🛡 Echo Shield', perk: 'shield',
      desc: 'Forged from a silent server\'s hull. Blocks the first heart you would lose in each boss fight.',
      px: [...colRun(23, 15, 21, 'D'), ...colRun(24, 16, 20, 'D')],
    },
    concepts: {
      name: '🧭 Wayfinder Charm', perk: 'heart',
      desc: 'You always know the way home. +1 heart in every boss fight.',
      px: [[16, 15, 'N'], [16, 16, 'N'], [17, 15, 'N'], [17, 16, 'N']],
    },
    azure: {
      name: '☁️ Skyforged Pauldrons', perk: 'xp',
      desc: 'Cloud-metal shoulders. +5% XP from every deed.',
      px: [...rowRun(15, 11, 13, 'P'), ...rowRun(15, 18, 20, 'P'), [16, 11, 'P'], [16, 20, 'P']],
    },
    k8s: {
      name: '⚙️ Warden\'s Greaves', perk: 'regen',
      desc: 'Self-healing boots. Clear 3 boss tasks without losing a heart to regain one.',
      px: [...rect(37, 42, 11, 13, 'K'), ...rect(37, 42, 18, 20, 'K')],
    },
    git: {
      name: '📜 Chronicler\'s Quill', perk: 'streak',
      desc: 'It writes your legend as you go. Every 5th task in a row without a mistake pays +10 bonus XP.',
      px: [[8, 23, 'Q'], [9, 23, 'Q'], [10, 23, 'Q'], [11, 23, 'Q'], [12, 24, 'Q']],
    },
    docker: {
      name: '🔥 Emberforged Gauntlets', perk: 'xp',
      desc: 'Still warm from the foundry. +5% XP from every deed.',
      px: [[21, 9, 'O'], [21, 10, 'O'], [22, 9, 'O'], [22, 10, 'O'], [21, 19, 'O'], [21, 20, 'O'], [22, 19, 'O'], [22, 20, 'O']],
    },
    ops: {
      name: '⚗️ Alchemist\'s Talisman', perk: 'voidhints',
      desc: 'Distilled understanding. Hints in the Void no longer cost hearts.',
      px: rowRun(19, 14, 17, 'M'),
    },
    final: {
      name: '👑 Archmage\'s Crown', perk: 'crown',
      desc: 'The Nine Realms kneel. +10% XP from every deed.',
      px: [[0, 13, 'C'], [0, 16, 'C'], [0, 19, 'C'], ...rowRun(1, 12, 19, 'C')],
    },
    void: {
      name: '🌀 Aura of the Nine', perk: 'aura',
      desc: 'The Void itself bows. Your legend is complete.',
      px: [[5, 3, 'V'], [11, 27, 'V'], [18, 2, 'V'], [27, 28, 'V'], [34, 3, 'V'], [39, 26, 'V']],
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
    return { palette: Object.assign({}, sprite.palette, GEAR_PALETTE), px: px.map((r) => r.join('')), res: sprite.res, blinkRows: sprite.blinkRows };
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
