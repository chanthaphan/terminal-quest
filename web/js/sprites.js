/* Terminal Quest — pixel art sprites (drawn as character matrices, rendered to canvas) */
(function () {
  const CLIQ = window.CLIQ;

  // Each sprite: rows of characters ('.' = transparent) + a palette map.
  // `res` = art resolution multiplier: a res-2 sprite has twice the pixels but
  // renders at the same size (renderers divide the draw scale by res).
  CLIQ.sprites = {
    hero: {
      // Octopath Traveler-fidelity sprite: ~3.4 heads tall, warm dark-brown
      // outlines (not black), multi-tone shading per region (hair highlight
      // streak, 3-tone coat, shaded scarf), tiny 1px eyes. Muted earthy palette;
      // the hair stays class-tinted via H/h. res 2.6 sits the character small
      // in the scene like the reference.
      res: 2.6,
      blinkRows: [9],
      palette: {
        E: '#2e1e15',                             // warm dark outline + eyes
        H: '#7c5433', h: '#543821', j: '#caa06a', // hair mid/shadow/highlight (H,h class-tinted)
        F: '#e6b98e', f: '#c4906a',               // skin + shade
        R: '#a33b31', r: '#7c2a24',               // scarf
        U: '#3e5a45', u: '#2c4132', t: '#5d7a5e', // coat mid/dark/light
        W: '#d9c8a8',                             // gloves
        y: '#8a6a2e',                             // belt, guard & pommel
        L: '#5a4a38', l: '#40342a',               // trousers + shade
        G: '#3a2c20', g: '#2a2018',               // boots + shade
        S: '#cfd4d6', s: '#f2f4f4',               // blade + shine
      },
      px: [
        '..............EEEE..............',
        '............EEHHHHEE............',
        '...........EHHjHHHHHE...........',
        '..........EHjjHHHHHHhE..........',
        '..........EHjHHHHHHhhE..........',
        '..........EHHHHHHHHhhE..........',
        '..........EhHHHHHHHhhE..........',
        '..........EhFFFFFFFfhE..........',
        '...........EFFFFFFFfE...........',
        '...........EFEFFFFEfE...........',
        '...........EFFFFFFFfE...........',
        '...........EfFFFFFffE...........',
        '............EfFFFFfE............',
        '............ERRRRRRE............',
        '.......s..ERRRRRRRRRRE..........',
        '......Ss..EUUUUUUUUUUE..........',
        '......Ss.EUUtUUUUUUuUUE.........',
        '......Ss.EUtUUUUUUUUuUE.........',
        '......Ss.EUUUUUUUUUUuUE.........',
        '......Ss.EyyyyyyyyyyyyE.........',
        '......Ss.EUuUUUUUUUUuUE.........',
        '......Ss.EUuUUUUUUUUuUE.........',
        '......SsEWWuUUUUUUuUUE..........',
        '.....yyyy.EUuUUUUUUuUE..........',
        '......yy..EuuUUUUUUuuE..........',
        '..........EuuuuuuuuuuE..........',
        '...........ELlE..ELlE...........',
        '...........ELLE..ELLE...........',
        '...........ELlE..ELlE...........',
        '...........ELLE..ELLE...........',
        '...........ELlE..ELlE...........',
        '...........ELLE..ELLE...........',
        '...........ELlE..ELlE...........',
        '...........ELLE..ELLE...........',
        '...........ELlE..ELlE...........',
        '...........ELLE..ELLE...........',
        '..........EGGGE..EGGGE..........',
        '..........EGgGE..EGgGE..........',
        '..........EGGGE..EGGGE..........',
        '..........EGgGE..EGgGE..........',
        '..........EGGGE..EGGGE..........',
        '..........EGGGE..EGGGE..........',
        '..........EEEEE..EEEEE..........',
      ],
    },

    shade: {
      palette: {
        G: '#7c3aed', g: '#4c1d95', W: '#f8fafc', R: '#ef4444', M: '#1e1b4b',
      },
      px: [
        '.....GGGGGG.....',
        '...GGGGGGGGGG...',
        '..GGGGGGGGGGGG..',
        '..GGWWGGGGWWGG..',
        '..GWRRWGGWRRWG..',
        '..GGWWGGGGWWGG..',
        '.GGGGGGGGGGGGGG.',
        '.GGGGMMMMMMGGGG.',
        '.GGGGGGGGGGGGGG.',
        '.GGgGGgGGgGGgGG.',
        '.GgGGgGGgGGgGG..',
        '..G..G..G..G....',
      ],
    },

    server: {
      palette: {
        R: '#334155', r: '#1e293b', G: '#22c55e', X: '#ef4444',
        m: '#64748b', D: '#0ea5e9',
      },
      px: [
        '..RRRRRRRRRRRR..',
        '..RrrrrrrrrrrR..',
        '..RrXXrrrrXXrR..',
        '..RrXXrrrrXXrR..',
        '..RrrrrmmrrrrR..',
        '..RRRRRRRRRRRR..',
        '..RrGrGrXrGrrR..',
        '..RrrrrrrrrrrR..',
        '..RRRRRRRRRRRR..',
        '..RrXrrDDrrXrR..',
        '..RrrrrDDrrrrR..',
        '..RRRRRRRRRRRR..',
        '..mmm......mmm..',
        '..mm........mm..',
      ],
    },

    guardian: {
      palette: {
        C: '#0891b2', c: '#155e75', W: '#f8fafc', R: '#f59e0b', H: '#94a3b8',
      },
      px: [
        '...H........H...',
        '..HH.CCCCCC.HH..',
        '..HCCCCCCCCCCH..',
        '...CCCCCCCCCC...',
        '..CCCWWWWWWCCC..',
        '..CCWWRRRRWWCC..',
        '..CCCWWWWWWCCC..',
        '...CCCCCCCCCC...',
        '..CCcCCCCCCcCC..',
        '..CC.CCCCCC.CC..',
        '..CC.CCCCCC.CC..',
        '.....CC..CC.....',
        '....CCC..CCC....',
      ],
    },

    warden: {
      palette: {
        Y: '#eab308', y: '#a16207', A: '#e5e7eb', E: '#0f172a', B: '#3730a3',
      },
      px: [
        '.....BBBBBB.....',
        '....YYYYYYYY....',
        '....YyyyyyyY....',
        '....yEyyyyEy....',
        '....YyyyyyyY....',
        '...YYYYYYYYYY...',
        '..YAYYYYYYYYAY..',
        '..A.YYYYYYYY.A..',
        '..A.YYYYYYYY.A..',
        '..A..YYYYYY..A..',
        '.AAA.yy..yy.AAA.',
        '.....yy..yy.....',
        '....yyy..yyy....',
      ],
    },

    wyrm: {
      palette: {
        D: '#16a34a', d: '#166534', W: '#f0fdf4', R: '#ef4444',
        P: '#a855f7', p: '#7e22ce',
      },
      px: [
        '....PP..............',
        '...PPPP.....DDDD....',
        '..PPPPPP...DDDDDD...',
        '..PPPPPPP.DDDDDDDD..',
        '...PPpPPPDDDDRDDDD..',
        '....PPpDDDDDDDDDD...',
        '.....DDDDDDDDWWWW...',
        '....DDDDDDDDDDWW....',
        '...DDDDDDDDDDDD.....',
        '..DDDdDDDDDDDd......',
        '..DD..DDDDDDD.......',
        '.DD...DDDDDD........',
        '......DD..DD........',
        '.....WW....WW.......',
      ],
    },
  };

  // ---- new realm bosses ----

  CLIQ.sprites.wraith = {
    palette: { G: '#22c55e', g: '#14532d', W: '#f0fdf4', R: '#facc15', B: '#052e16' },
    px: [
      '....GGGG..GG....',
      '..GGGGGGGGGGG...',
      '.GGGGGGGGGGGGG..',
      '.GGWWGGGGGWWGG..',
      '.GWRRWGGGWRRWG..',
      '.GGWWGGGGGWWGG..',
      '.GGGGGBBGGGGGG..',
      '.GGGGBBBBGGGGG..',
      '..GGGGBBGGGGG...',
      '..GgGGGGGGgGG...',
      '.GGg.GGGG.gGGG..',
      '.Gg...GG...gG...',
      '.g.....G.....g..',
    ],
  };

  CLIQ.sprites.golem = {
    palette: { B: '#0ea5e9', b: '#075985', W: '#e0f2fe', R: '#f97316', S: '#38bdf8' },
    px: [
      '...BBBBBBBBBB...',
      '..BBSSBBBBSSBB..',
      '..BBWWBBBBWWBB..',
      '..BBWRBBBBRWBB..',
      '..BBBBBbbBBBBB..',
      '..BBBbbbbbbBBB..',
      '.BBBBBBBBBBBBBB.',
      '.BBbBBBBBBBBbBB.',
      '.BB.BBBBBBBB.BB.',
      '.BB.BBbbbbBB.BB.',
      '.bb.BBBBBBBB.bb.',
      '....BBB..BBB....',
      '...bBBB..BBBb...',
    ],
  };

  CLIQ.sprites.daemon = {
    palette: { R: '#ef4444', r: '#7f1d1d', Y: '#fbbf24', W: '#fff7ed', B: '#1c1917' },
    px: [
      '..r..........r..',
      '..rr........rr..',
      '...RRRRRRRRRR...',
      '..RRRRRRRRRRRR..',
      '..RRYYRRRRYYRR..',
      '..RYBBYRRYBBYR..',
      '..RRYYRRRRYYRR..',
      '..RRRRWWWWRRRR..',
      '..RRRWBWWBWRRR..',
      '...RRRRRRRRRR...',
      '..RRrRRRRRRrRR..',
      '..Rr.RRRRRR.rR..',
      '.....RR..RR.....',
      '....YRR..RRY....',
    ],
  };

  CLIQ.sprites.archlich = {
    palette: { P: '#a855f7', p: '#581c87', G: '#fcd34d', W: '#f8fafc', R: '#ef4444', B: '#18181b' },
    px: [
      '....GGGGGGGGGG....',
      '....G.G.GG.G.G....',
      '.....WWWWWWWW.....',
      '....WWWWWWWWWW....',
      '....WBBWWWWBBW....',
      '....WBRWWWWRBW....',
      '....WWWWWWWWWW....',
      '.....WWBBBBWW.....',
      '....PPPPPPPPPP....',
      '..GPPPPPPPPPPPPG..',
      '..G.PPPpppPPPP.G..',
      '..G.PPPPPPPPPP.G..',
      '..G.PPpPPPPpPP.G..',
      '..G.PP.PPPP.PP.G..',
      '.GGG.PPPPPPPP.GGG.',
      '.....pPPPPPPp.....',
      '......pp..pp......',
    ],
  };

  CLIQ.sprites.amalgam = {
    palette: {
      P: '#7c3aed', p: '#4c1d95', R: '#ef4444', Y: '#facc15', C: '#67e8f9',
      G: '#22c55e', W: '#f8fafc', B: '#0a0a0f', O: '#fb923c',
    },
    px: [
      '.....YY....YY.....',
      '....YPPPPPPPPY....',
      '...PPPPPPPPPPPP...',
      '..PPWRWPPPPWCWPP..',
      '..PPRRRPPPPCCCPP..',
      '..PPWRWPPPPWCWPP..',
      '..PPPPPWYWPPPPPP..',
      '..PPPPWYYYWPPPPP..',
      '.GPPPPPWYWPPPPPG..',
      '.GGPPBBBBBBBPPGG..',
      '..PPPBWBWBWBPPP...',
      '..PPPPBBBBBBPPPP..',
      '..OPpPPPPPPPPpO...',
      '..O.pPPPPPPPPp.O..',
      '..O..pp.PP.pp..O..',
      '.OO...G.PP.G...OO.',
      '......G....G......',
    ],
  };

  // ---- RPG character classes (hero palette tints) ----

  CLIQ.classDefs = [
    { id: 'warrior', name: 'Sys Warrior', icon: '⚔️', realms: ['bash', 'ops'], desc: 'Master of the shell and the machine. +10% XP in the Sanctum & the Lab.', tint: { H: '#dc2626', h: '#7f1d1d' } },
    { id: 'ranger', name: 'Net Ranger', icon: '🏹', realms: ['remote', 'concepts'], desc: 'Walker of bridges and reader of packets. +10% XP in the Bridge & the Labyrinth.', tint: { H: '#16a34a', h: '#14532d' } },
    { id: 'mage', name: 'Cloud Mage', icon: '✨', realms: ['azure', 'git'], desc: 'Summoner of clouds and keeper of chronicles. +10% XP in the Citadel & the Chronicle.', tint: { H: '#a855f7', h: '#581c87' } },
    { id: 'warden', name: 'Kube Warden', icon: '🛡️', realms: ['k8s', 'docker'], desc: 'Commander of container legions. +10% XP in the Keep & the Foundry.', tint: { H: '#eab308', h: '#a16207' } },
  ];

  CLIQ.heroSprite = function (classId) {
    const base = CLIQ.sprites.hero;
    const cls = CLIQ.classDefs.find((c) => c.id === classId);
    let sprite = cls ? { px: base.px, palette: Object.assign({}, base.palette, cls.tint), res: base.res, blinkRows: base.blinkRows } : base;
    // conquest gear (js/gear.js) is painted on top for every renderer
    if (CLIQ.applyGear) sprite = CLIQ.applyGear(sprite);
    return sprite;
  };

  CLIQ.drawSprite = function (canvas, sprite, scale) {
    const rows = sprite.px;
    const w = Math.max(...rows.map((r) => r.length));
    const h = rows.length;
    const res = sprite.res || 1; // hi-res art renders at the same on-screen size
    // rasterize 1px per cell, then scale with nearest-neighbor for crisp pixels
    const buf = document.createElement('canvas');
    buf.width = w;
    buf.height = h;
    const bctx = buf.getContext('2d');
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < rows[y].length; x++) {
        const c = sprite.palette[rows[y][x]];
        if (!c) continue;
        bctx.fillStyle = c;
        bctx.fillRect(x, y, 1, 1);
      }
    }
    canvas.width = Math.max(1, Math.round((w * scale) / res));
    canvas.height = Math.max(1, Math.round((h * scale) / res));
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(buf, 0, 0, canvas.width, canvas.height);
  };
})();
