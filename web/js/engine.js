/* Terminal Quest — game engine: state, XP, quest runner, terminal + quiz UI */
(function () {
  const CLIQ = window.CLIQ;

  const LEVELS = [
    { xp: 0, title: 'Shell Novice' },
    { xp: 80, title: 'Shell Apprentice' },
    { xp: 200, title: 'File Wrangler' },
    { xp: 380, title: 'Pipe Weaver' },
    { xp: 600, title: 'Net Ranger' },
    { xp: 880, title: 'Packet Sage' },
    { xp: 1200, title: 'Cloud Knight' },
    { xp: 1600, title: 'Kube Warden' },
    { xp: 2100, title: 'Cloud Archmage' },
  ];

  const G = (CLIQ.game = {
    world: null,
    state: null,
    currentModule: null,
    currentQuest: null,
    taskIndex: 0,
    hearts: 3,
  });

  const SAVE_KEY = 'terminal-quest-save-v1';
  const SESSION_KEY = 'terminal-quest-session-v1';

  function defaultState() {
    return { xp: 0, done: {}, hintsUsed: 0, cmdCount: 0, class: null, achievements: {}, usedCmds: [], muted: false, certified: false };
  }

  G.save = function () {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(G.state));
    } catch (e) {}
  };
  G.load = function () {
    try {
      const s = localStorage.getItem(SAVE_KEY);
      G.state = s ? JSON.parse(s) : defaultState();
    } catch (e) {
      G.state = defaultState();
    }
    if (!G.state.done) G.state = defaultState();
    G.state = Object.assign(defaultState(), G.state); // fill fields added in later versions
  };

  // ---- session save: full world + quest position, survives reload ----------

  G.saveSession = function () {
    try {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          v: 1,
          savedAt: new Date().toISOString(),
          world: G.world,
          questId: G.currentQuest ? G.currentQuest.id : null,
          taskIndex: G.taskIndex,
          hearts: G.hearts,
          battleLog: G.battleLog || null,
          sandbox: !!G.sandbox,
        })
      );
      G.pulseSaveDot();
    } catch (e) {} // quota or serialization trouble — the profile save still works
  };

  let lastPulse = 0;
  G.pulseSaveDot = function () {
    const now = Date.now();
    if (now - lastPulse < 2500) return; // don't strobe on rapid commands
    lastPulse = now;
    const dot = $('#save-dot');
    if (!dot) return;
    dot.classList.remove('pulse');
    void dot.offsetWidth; // restart the animation
    dot.classList.add('pulse');
  };

  G.resumeSession = function () {
    let s;
    try {
      s = JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch (e) { return false; }
    if (!s || s.v !== 1 || !s.world || !s.world.fs) return false;
    const w = s.world;
    // A save taken mid-ssh holds fs copies that would diverge from net.hosts after
    // the JSON round-trip — normalize back to the local shell (bottom of the stack).
    let sshEnded = false;
    if (w.sshStack && w.sshStack.length) {
      const base = w.sshStack[0];
      w.user = base.user; w.hostname = base.hostname; w.home = base.home;
      w.cwd = base.cwd; w.fs = base.fs;
      w.sshStack = [];
      sshEnded = true;
    }
    G.world = w;
    G.sandbox = !!s.sandbox;
    G.currentModule = null;
    G.currentQuest = null;
    G.taskIndex = 0;
    G.hearts = 3;
    if (s.questId) {
      for (const mod of CLIQ.modules) {
        const q = mod.quests.find((x) => x.id === s.questId);
        if (q) {
          G.currentModule = mod;
          G.currentQuest = q;
          G.taskIndex = Math.min(s.taskIndex || 0, q.tasks.length);
          G.hearts = s.hearts == null ? 3 : s.hearts;
          G.battleLog = s.battleLog || null;
          break;
        }
      }
    }
    if (G.currentQuest) {
      term.print(`↻ Session restored — ${G.currentQuest.title}, task ${Math.min(G.taskIndex + 1, G.currentQuest.tasks.length)} of ${G.currentQuest.tasks.length}.`, 'term-success');
    } else if (G.sandbox) {
      term.print('↻ Session restored — Free Play.', 'term-success');
    }
    if (sshEnded) term.print('☞ Your ssh session ended when the realm was restored — you are back on sanctum.', 'term-nudge');
    return true;
  };

  // ---- save bundles, slots, export / import ---------------------------------

  G.bundle = function () {
    G.save();
    G.saveSession();
    return {
      game: 'terminal-quest',
      version: 1,
      exportedAt: new Date().toISOString(),
      state: G.state,
      session: JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'),
    };
  };

  G.describeBundle = function (obj) {
    const xp = obj.state.xp || 0;
    let lvl = 0;
    for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) lvl = i;
    const cls = CLIQ.classDefs && CLIQ.classDefs.find((c) => c.id === obj.state.class);
    const realms = Object.keys(obj.state.done || {}).filter((id) => id.endsWith('-boss')).length;
    const quest = obj.session && obj.session.questId ? obj.session.questId : null;
    const when = obj.exportedAt || (obj.session && obj.session.savedAt);
    return {
      line1: `Lv ${lvl + 1} ${LEVELS[lvl].title}` + (cls ? ` · ${cls.icon} ${cls.name}` : ''),
      line2: `${xp} XP · ${realms}/9 bosses` + (quest ? ` · at ${quest}` : ''),
      when: when ? new Date(when).toLocaleString() : 'unknown time',
    };
  };

  const slotKey = (n) => 'terminal-quest-slot-' + n;
  G.readSlot = function (n) {
    try {
      const obj = JSON.parse(localStorage.getItem(slotKey(n)));
      return obj && obj.game === 'terminal-quest' ? obj : null;
    } catch (e) { return null; }
  };
  G.writeSlot = function (n) {
    try {
      localStorage.setItem(slotKey(n), JSON.stringify(G.bundle()));
      if (CLIQ.sfx) CLIQ.sfx.play('blip');
      term.print(`💾 Saved to slot ${n}.`, 'term-success');
      return true;
    } catch (e) {
      term.print('✘ Could not write the save slot: ' + e.message, 'term-err');
      return false;
    }
  };
  G.deleteSlot = function (n) {
    localStorage.removeItem(slotKey(n));
  };

  G.exportSave = function () {
    const blob = new Blob([JSON.stringify(G.bundle(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'terminal-quest-save.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    term.print('💾 Save exported as terminal-quest-save.json — keep it somewhere safe.', 'term-success');
  };

  G.importSaveObject = function (obj, skipConfirm) {
    if (!obj || obj.game !== 'terminal-quest' || !obj.state || typeof obj.state.xp !== 'number') {
      term.print('✘ That file is not a Terminal Quest save.', 'term-err');
      return false;
    }
    if (!skipConfirm) {
      const d = G.describeBundle(obj);
      if (!confirm(`Load this save? Your current progress will be replaced.\n\n${d.line1}\n${d.line2}\nSaved: ${d.when}`)) return false;
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(obj.state));
    if (obj.session) localStorage.setItem(SESSION_KEY, JSON.stringify(obj.session));
    else localStorage.removeItem(SESSION_KEY);
    location.reload();
    return true;
  };

  G.importSaveFile = function (file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        G.importSaveObject(JSON.parse(reader.result));
      } catch (e) {
        term.print('✘ Could not read that save file: ' + e.message, 'term-err');
      }
    };
    reader.readAsText(file);
  };

  // ---- save & load menu ------------------------------------------------------

  G.toggleSaveMenu = function () {
    const ov = $('#save-overlay');
    if (!ov.hidden) { ov.hidden = true; return; }
    if (CLIQ.sfx) CLIQ.sfx.play('click');
    const cur = G.describeBundle({ game: 'terminal-quest', state: G.state, session: JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') });
    let html = '<div class="codex-box save-box"><button id="save-close">✕</button><div class="codex-title">💾 Save &amp; Load</div>';
    html += `<div class="save-current"><div class="save-slot-title">CURRENT ADVENTURE</div><div class="save-meta">${cur.line1}<br>${cur.line2}</div><div class="save-note">Auto-saved after every command.</div></div>`;
    html += '<div class="codex-section-title">SAVE SLOTS</div>';
    for (let n = 1; n <= 3; n++) {
      const slot = G.readSlot(n);
      if (slot) {
        const d = G.describeBundle(slot);
        html += `<div class="save-slot"><div><div class="save-slot-title">SLOT ${n}</div><div class="save-meta">${d.line1}<br>${d.line2}</div><div class="save-note">${d.when}</div></div>` +
          `<div class="save-actions"><button class="slot-btn" data-act="load" data-n="${n}">Load</button>` +
          `<button class="slot-btn" data-act="save" data-n="${n}">Overwrite</button>` +
          `<button class="slot-btn danger" data-act="del" data-n="${n}">✕</button></div></div>`;
      } else {
        html += `<div class="save-slot empty"><div><div class="save-slot-title">SLOT ${n}</div><div class="save-note">— empty —</div></div>` +
          `<div class="save-actions"><button class="slot-btn" data-act="save" data-n="${n}">Save here</button></div></div>`;
      }
    }
    html += '<div class="codex-section-title">SAVE FILES</div>';
    html += '<div class="save-actions file-actions"><button class="slot-btn" id="menu-export">⬇ Export file</button><button class="slot-btn" id="menu-import">⬆ Import file</button></div>';
    html += '</div>';
    ov.innerHTML = html;
    ov.hidden = false;
    $('#save-close').addEventListener('click', () => (ov.hidden = true));
    ov.addEventListener('click', (ev) => { if (ev.target === ov) ov.hidden = true; });
    $('#menu-export').addEventListener('click', () => { G.exportSave(); ov.hidden = true; });
    $('#menu-import').addEventListener('click', () => $('#import-file').click());
    ov.querySelectorAll('.slot-btn[data-act]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const n = +btn.dataset.n;
        const act = btn.dataset.act;
        if (act === 'save') {
          if (G.readSlot(n) && !confirm(`Overwrite slot ${n}?`)) return;
          G.writeSlot(n);
          ov.hidden = true; G.toggleSaveMenu(); // re-render with fresh metadata
        } else if (act === 'load') {
          G.importSaveObject(G.readSlot(n));
        } else if (act === 'del') {
          if (confirm(`Delete slot ${n}? This cannot be undone.`)) { G.deleteSlot(n); ov.hidden = true; G.toggleSaveMenu(); }
        }
      });
    });
  };

  G.levelInfo = function () {
    let lvl = 0;
    for (let i = 0; i < LEVELS.length; i++) if (G.state.xp >= LEVELS[i].xp) lvl = i;
    const cur = LEVELS[lvl];
    const next = LEVELS[lvl + 1];
    return {
      n: lvl + 1,
      title: cur.title,
      cur: G.state.xp - cur.xp,
      span: next ? next.xp - cur.xp : 1,
      max: !next,
      nextTitle: next ? next.title : null,
    };
  };

  // ---- DOM helpers ---------------------------------------------------------

  const $ = (sel) => document.querySelector(sel);
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---- Terminal --------------------------------------------------------------

  const term = {
    print(text, cls) {
      if (!text) return;
      const out = $('#term-output');
      const div = el('div', 'term-line ' + (cls || ''));
      div.innerHTML = esc(text).replace(/\n$/, '');
      out.appendChild(div);
      out.scrollTop = out.scrollHeight;
    },
    clear() {
      $('#term-output').innerHTML = '';
    },
    prompt() {
      const w = G.world;
      const path = w.cwd === w.home ? '~' : w.cwd.startsWith(w.home + '/') ? '~' + w.cwd.slice(w.home.length) : w.cwd;
      return `${w.user}@${w.hostname}:${path}$`;
    },
    updatePrompt() {
      $('#term-prompt').textContent = term.prompt();
    },
  };
  G.term = term;

  const cmdHistory = [];
  let histIdx = -1;

  G.initTerminal = function () {
    const input = $('#term-input');
    input.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        const line = input.value;
        input.value = '';
        histIdx = -1;
        if (line.trim()) cmdHistory.unshift(line);
        term.print(term.prompt() + ' ' + line, 'term-cmd');
        const e = CLIQ.run(G.world, line);
        if (e.clear) term.clear();
        else if (e.out) term.print(e.out, e.code === 0 ? '' : 'term-err');
        term.updatePrompt();
        G.state.cmdCount++;
        G.onCommand(e);
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        if (histIdx < cmdHistory.length - 1) input.value = cmdHistory[++histIdx];
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        if (histIdx > 0) input.value = cmdHistory[--histIdx];
        else { histIdx = -1; input.value = ''; }
      } else if (ev.key === 'Tab') {
        ev.preventDefault();
        // simple completion over commands and cwd entries
        const parts = input.value.split(' ');
        const last = parts[parts.length - 1];
        if (!last) return;
        let candidates;
        if (parts.length === 1) candidates = Object.keys(CLIQ.commands);
        else {
          const node = CLIQ.getNode(G.world, '.');
          candidates = node && node.type === 'dir' ? Object.keys(node.children) : [];
        }
        const matches = candidates.filter((c) => c.startsWith(last));
        if (matches.length === 1) {
          parts[parts.length - 1] = matches[0];
          input.value = parts.join(' ');
        } else if (matches.length > 1) {
          term.print(matches.join('  '));
        }
      }
    });
    $('#terminal').addEventListener('click', () => input.focus());
  };

  // ---- XP / progress ----------------------------------------------------------

  G.classDef = function () {
    return CLIQ.classDefs ? CLIQ.classDefs.find((c) => c.id === G.state.class) : null;
  };

  G.addXP = function (amount, label) {
    const before = G.levelInfo().n;
    const cls = G.classDef();
    if (cls && G.currentModule && cls.realms.includes(G.currentModule.id)) {
      amount = Math.round(amount * 1.1); // class home-realm bonus
    }
    G.state.xp += amount;
    G.save();
    G.renderHUD();
    const toast = el('div', 'xp-toast', `+${amount} XP${label ? ' — ' + label : ''}`);
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2200);
    const after = G.levelInfo();
    if (after.n > before) {
      if (CLIQ.sfx) CLIQ.sfx.play('levelup');
      const lv = el('div', 'levelup-toast', `⬆ LEVEL UP! You are now a ${after.title}`);
      document.body.appendChild(lv);
      setTimeout(() => lv.classList.add('show'), 10);
      setTimeout(() => { lv.classList.remove('show'); setTimeout(() => lv.remove(), 500); }, 3500);
    }
  };

  G.renderHUD = function () {
    const li = G.levelInfo();
    const cls = G.classDef();
    $('#hud-level').textContent = `Lv ${li.n} · ${li.title}` + (cls ? ` · ${cls.icon} ${cls.name}` : '');
    $('#sfx-btn').textContent = G.state.muted ? '🔇' : '🔊';
    $('#hud-xp').textContent = li.max ? `${G.state.xp} XP (MAX)` : `${G.state.xp} XP`;
    $('#hud-bar-fill').style.width = (li.max ? 100 : Math.min(100, (li.cur / li.span) * 100)) + '%';
  };

  // ---- Sidebar / module map ----------------------------------------------------

  G.moduleLocked = function (mod) {
    return !!(mod.requires && !mod.requires.every((id) => G.state.done[id]));
  };

  G.renderSidebar = function () {
    const nav = $('#quest-nav');
    nav.innerHTML = '';
    for (const mod of CLIQ.modules) {
      const done = mod.quests.filter((q) => G.state.done[q.id]).length;
      const modLocked = G.moduleLocked(mod);
      const mDiv = el('div', 'module' + (modLocked ? ' module-locked' : ''));
      const head = el('div', 'module-head');
      head.appendChild(el('span', 'module-icon', mod.icon));
      const t = el('div', 'module-title');
      t.appendChild(el('div', null, mod.title));
      t.appendChild(el('div', 'module-sub', modLocked ? '🔒 defeat all realm bosses first' : `${done}/${mod.quests.length} quests`));
      head.appendChild(t);
      mDiv.appendChild(head);
      const list = el('div', 'quest-list');
      mod.quests.forEach((q, qi) => {
        const isDone = !!G.state.done[q.id];
        const locked = modLocked || (qi > 0 && !G.state.done[mod.quests[qi - 1].id] && !isDone);
        const item = el('div', 'quest-item' + (isDone ? ' done' : '') + (locked ? ' locked' : '') + (G.currentQuest === q ? ' active' : ''));
        item.appendChild(el('span', 'quest-status', isDone ? '✦' : locked ? '🔒' : q.boss ? '👑' : '▸'));
        item.appendChild(el('span', null, q.title));
        if (!locked) item.addEventListener('click', () => G.startQuest(mod, q));
        list.appendChild(item);
      });
      mDiv.appendChild(list);
      head.addEventListener('click', () => list.classList.toggle('collapsed'));
      if (mod !== G.currentModule && done === mod.quests.length) list.classList.add('collapsed');
      nav.appendChild(mDiv);
    }
    // sandbox free-play entry
    const sb = el('div', 'module');
    const sbHead = el('div', 'module-head' + (G.sandbox ? ' active' : ''));
    sbHead.appendChild(el('span', 'module-icon', '🏖'));
    const sbT = el('div', 'module-title');
    sbT.appendChild(el('div', null, 'Free Play'));
    sbT.appendChild(el('div', 'module-sub', 'open terminal, everything unlocked'));
    sbHead.appendChild(sbT);
    sbHead.addEventListener('click', () => G.startSandbox());
    sb.appendChild(sbHead);
    nav.appendChild(sb);
  };

  // ---- Quest engine --------------------------------------------------------------

  G.startQuest = function (mod, quest) {
    if (G.moduleLocked(mod)) return;
    if (!G.state.class) return; // choose a class first
    G.sandbox = false;
    G.currentModule = mod;
    G.currentQuest = quest;
    G.taskIndex = 0;
    G.hearts = 3;
    G.questHints = 0;
    G.battleLog = null;
    $('#sidebar').classList.remove('open'); // close the map drawer on narrow screens
    while (G.world.sshStack.length) CLIQ.commands.exit([], G.world); // return to local shell
    if (quest.setup) quest.setup(G.world);
    term.updatePrompt();
    G.renderSidebar();
    G.renderStory();
    if (CLIQ.stage && !CLIQ.stage.traveling) CLIQ.stage.walkIn(); // arrive on foot, always
    G.saveSession();
    $('#term-input').focus();
  };

  G.currentTask = function () {
    const q = G.currentQuest;
    if (!q) return null;
    return q.tasks[G.taskIndex] || null;
  };

  G.renderStory = function () {
    const stage = CLIQ.stage;
    const q = G.currentQuest;
    let sceneId = 'menu';
    if (G.state.class) {
      if (G.sandbox) sceneId = 'sandbox';
      else sceneId = G.currentModule ? G.currentModule.id : 'world';
    }
    stage.setScene(sceneId, G.state.class);
    const panel = stage.dialogEl();
    panel.innerHTML = '';
    if (!G.state.class) { stage.endBattle(); return G.renderClassSelect(panel); }
    if (G.sandbox) { stage.endBattle(); return G.renderSandbox(panel); }
    if (!q) {
      stage.endBattle();
      panel.appendChild(el('div', 'story-title', '⚔ Terminal Quest'));
      const p = el('div', 'story-text');
      p.innerHTML =
        'You stand at the crossroads of nine realms, adventurer. ' +
        '<b>Click a landmark on the world above</b> to journey there — or pick a quest from the realm list. ' +
        'Type commands into the terminal below to cast your spells.';
      panel.appendChild(p);
      return;
    }
    if (CLIQ.battle && CLIQ.battle.isBattle(q)) {
      const m = CLIQ.battle.meta[q.id];
      const total = q.tasks.length;
      const left = Math.max(0, total - G.taskIndex);
      stage.battle(m, left / total, G.hearts, left === 0);
      const log = el('div', 'battle-log');
      log.innerHTML = G.battleLog || m.name + ' draws near! ' + m.taunt;
      panel.appendChild(log);
    } else {
      stage.endBattle();
    }
    panel.appendChild(el('div', 'story-crumb', `${G.currentModule.icon} ${G.currentModule.title}`));
    panel.appendChild(el('div', 'story-title', (q.boss ? '👑 BOSS: ' : '') + q.title));
    const story = el('div', 'story-text');
    story.innerHTML = q.story;
    panel.appendChild(story);

    if (q.boss && !(CLIQ.battle && CLIQ.battle.isBattle(q))) {
      const hearts = el('div', 'hearts', '❤'.repeat(G.hearts) + '♡'.repeat(3 - G.hearts));
      panel.appendChild(hearts);
    }

    // progress dots
    const dots = el('div', 'task-dots');
    q.tasks.forEach((t, i) => {
      dots.appendChild(el('span', 'dot' + (i < G.taskIndex ? ' filled' : i === G.taskIndex ? ' current' : '')));
    });
    panel.appendChild(dots);

    const task = G.currentTask();
    if (task) {
      const box = el('div', 'task-box');
      box.appendChild(el('div', 'task-label', q.boss ? 'BOSS CHALLENGE' : `Task ${G.taskIndex + 1} of ${q.tasks.length}`));
      const tt = el('div', 'task-text');
      tt.innerHTML = task.text;
      box.appendChild(tt);

      if (task.quiz) {
        const quizBox = el('div', 'quiz-box');
        task.quiz.choices.forEach((choice, i) => {
          const btn = el('button', 'quiz-btn', choice);
          btn.addEventListener('click', () => G.answerQuiz(i, btn));
          quizBox.appendChild(btn);
        });
        box.appendChild(quizBox);
      } else if (task.hint) {
        const hintBtn = el('button', 'hint-btn', '💡 Hint');
        const hintText = el('div', 'hint-text');
        hintText.style.display = 'none';
        hintText.innerHTML = task.hint;
        hintBtn.addEventListener('click', () => {
          hintText.style.display = 'block';
          hintBtn.remove();
          G.state.hintsUsed++;
          G.questHints = (G.questHints || 0) + 1;
          G.save();
        });
        box.appendChild(hintBtn);
        box.appendChild(hintText);
      }
      panel.appendChild(box);
    } else if (q.certificate) {
      panel.appendChild(G.renderCertificate());
    } else {
      const doneBox = el('div', 'task-box quest-complete');
      doneBox.innerHTML = `<div class="task-label">QUEST COMPLETE</div><div class="task-text">${q.outro || 'Well fought, adventurer.'}</div>`;
      panel.appendChild(doneBox);
      const next = G.nextQuest();
      if (next) {
        const btn = el('button', 'next-btn', `Next quest: ${next.quest.title} ▸`);
        btn.addEventListener('click', () => G.startQuest(next.mod, next.quest));
        doneBox.appendChild(btn);
      } else {
        doneBox.appendChild(el('div', 'task-text', '🏆 You have conquered every realm. The Archmage Trial awaits at the bottom of the map.'));
      }
    }
    panel.scrollTop = 0;
  };

  G.nextQuest = function () {
    const mods = CLIQ.modules;
    const mi = mods.indexOf(G.currentModule);
    const qi = G.currentModule.quests.indexOf(G.currentQuest);
    if (qi + 1 < G.currentModule.quests.length) return { mod: G.currentModule, quest: G.currentModule.quests[qi + 1] };
    if (mi + 1 < mods.length && !G.moduleLocked(mods[mi + 1])) return { mod: mods[mi + 1], quest: mods[mi + 1].quests[0] };
    return null;
  };

  // ---- class select / sandbox / certificate / codex ------------------------

  G.renderClassSelect = function (panel) {
    panel.appendChild(el('div', 'story-title', '⚔ Choose Your Class'));
    const p = el('div', 'story-text');
    p.innerHTML = 'Every hero walks their own path, adventurer. Your class grants <b>+10% XP</b> in its home realms — but all nine realms are yours to conquer.';
    panel.appendChild(p);
    const grid = el('div', 'class-grid');
    for (const cls of CLIQ.classDefs) {
      const card = el('div', 'class-card');
      const cv = document.createElement('canvas');
      cv.className = 'pixel-sprite';
      CLIQ.drawSprite(cv, CLIQ.heroSprite(cls.id), 5);
      card.appendChild(cv);
      card.appendChild(el('div', 'class-name', `${cls.icon} ${cls.name}`));
      card.appendChild(el('div', 'class-desc', cls.desc));
      card.addEventListener('click', () => {
        G.state.class = cls.id;
        G.save();
        if (CLIQ.sfx) CLIQ.sfx.play('fanfare');
        term.print(`✦ You are now a ${cls.name}. Your legend begins.`, 'term-success');
        G.renderHUD();
        G.renderSidebar();
        G.renderStory();
      });
      grid.appendChild(card);
    }
    panel.appendChild(grid);
  };

  G.startSandbox = function () {
    if (!G.state.class) return;
    G.sandbox = true;
    G.currentQuest = null;
    G.currentModule = null;
    const w = G.world;
    w.azure.loggedIn = true;
    w.kubeConnected = true;
    term.updatePrompt();
    G.renderSidebar();
    G.renderStory();
    G.saveSession();
    $('#term-input').focus();
  };

  G.renderSandbox = function (panel) {
    panel.appendChild(el('div', 'story-title', '🏖 Free Play — The Open Realm'));
    const p = el('div', 'story-text');
    p.innerHTML =
      'No quests, no judges — just you and the terminal. Everything is unlocked:<br><br>' +
      '· <code>az</code> is logged in and <code>kubectl</code> is connected to quest-aks<br>' +
      '· remote hosts <code>web-01</code> and <code>db-01</code> accept ssh<br>' +
      '· <code>git</code>, <code>docker</code>, and the whole spellbook (📖 in the top bar) are at your service<br><br>' +
      'Break things freely — the reset button below restores the world (your XP is safe).';
    panel.appendChild(p);
    const btn = el('button', 'next-btn', '♻ Reset the world');
    btn.addEventListener('click', () => {
      G.world = CLIQ.makeWorld();
      G.world.azure.loggedIn = true;
      G.world.kubeConnected = true;
      term.updatePrompt();
      term.print('♻ The world reforms around you, fresh and unbroken.', 'term-success');
    });
    panel.appendChild(btn);
  };

  G.renderCertificate = function () {
    const cls = G.classDef();
    const earned = Object.keys(G.state.achievements).length;
    G.state.certified = true;
    G.save();
    const cert = el('div', 'certificate');
    cert.innerHTML =
      '<div class="cert-inner">' +
      '<div class="cert-head">✦ ✦ ✦</div>' +
      '<div class="cert-title">CERTIFICATE OF ASCENSION</div>' +
      '<div class="cert-sub">Terminal Quest — Enterprise Edition</div>' +
      `<div class="cert-body">This scroll certifies that a <b>${cls ? cls.icon + ' ' + cls.name : 'Hero'}</b><br>` +
      'has conquered all nine realms — shell, network, cloud, chronicle, foundry, and keep —<br>' +
      'and is hereby proclaimed</div>' +
      '<div class="cert-rank">👑 CLOUD ARCHMAGE 👑</div>' +
      `<div class="cert-meta">${G.state.xp} XP · ${earned} achievements · ${new Date().toLocaleDateString()}</div>` +
      '<div class="cert-head">✦ ✦ ✦</div>' +
      '</div>';
    const print = el('button', 'next-btn', '🖨 Print certificate');
    print.addEventListener('click', () => window.print());
    cert.appendChild(print);
    for (let i = 0; i < 24; i++) {
      const c = el('span', 'confetti');
      c.style.left = (i * 4.2 + 2) + '%';
      c.style.animationDelay = (i % 8) * 0.35 + 's';
      c.style.background = ['#fcd34d', '#a855f7', '#4ade80', '#67e8f9', '#f87171'][i % 5];
      cert.appendChild(c);
    }
    return cert;
  };

  G.achievementToast = function (def) {
    if (CLIQ.sfx) CLIQ.sfx.play('levelup');
    const t = el('div', 'achievement-toast', `${def.icon} Achievement: ${def.title}`);
    t.title = def.desc;
    document.body.appendChild(t);
    setTimeout(() => t.classList.add('show'), 10);
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 500); }, 3200);
  };

  G.toggleCodex = function () {
    const ov = $('#codex-overlay');
    if (!ov.hidden) { ov.hidden = true; return; }
    if (CLIQ.sfx) CLIQ.sfx.play('click');
    const used = new Set(G.state.usedCmds || []);
    const ach = G.state.achievements || {};
    let html = '<div class="codex-box"><button id="codex-close">✕</button><div class="codex-title">📖 The Codex</div>';
    html += '<div class="codex-section-title">SPELLBOOK — commands you have cast are lit</div>';
    for (const grp of CLIQ.codex) {
      html += `<div class="codex-group"><div class="codex-group-name">${grp.group}</div>`;
      for (const [cmd, desc] of Object.entries(grp.cmds)) {
        const lit = used.has(cmd.split(' ')[0]);
        html += `<div class="codex-cmd${lit ? ' lit' : ''}"><code>${cmd}</code><span>${desc}</span></div>`;
      }
      html += '</div>';
    }
    html += '<div class="codex-section-title">ACHIEVEMENTS</div><div class="codex-ach-grid">';
    for (const def of CLIQ.achievementDefs) {
      const got = !!ach[def.id];
      html += `<div class="codex-ach${got ? ' got' : ''}" title="${def.desc}">${def.icon}<div>${def.title}</div></div>`;
    }
    html += '</div></div>';
    ov.innerHTML = html;
    ov.hidden = false;
    $('#codex-close').addEventListener('click', () => (ov.hidden = true));
    ov.addEventListener('click', (ev) => { if (ev.target === ov) ov.hidden = true; });
  };

  G.completeTask = function (feedbackHtml) {
    const q = G.currentQuest;
    const task = G.currentTask();
    const inBattle = CLIQ.battle && CLIQ.battle.isBattle(q);
    G.taskIndex++;
    G.addXP(task.xp || 10);
    if (feedbackHtml) {
      term.print('✔ ' + feedbackHtml, 'term-success');
    }
    const questJustDone = G.taskIndex >= q.tasks.length;
    if (questJustDone) {
      if (inBattle) G.battleLog = '🏆 VICTORY! The beast dissolves into well-behaved processes!';
      if (!G.state.done[q.id]) {
        G.state.done[q.id] = true;
        G.addXP(q.boss ? 60 : 25, q.boss ? 'boss defeated' : 'quest complete');
        G.save();
      }
      if (CLIQ.sfx) CLIQ.sfx.play('fanfare');
      if (!inBattle && CLIQ.stage) CLIQ.stage.cast();
    } else {
      if (CLIQ.sfx) CLIQ.sfx.play(inBattle ? 'hit' : 'blip');
      if (!inBattle && CLIQ.stage) CLIQ.stage.cast();
    }
    if (CLIQ.checkAchievements) {
      CLIQ.checkAchievements({ type: 'task', questId: q.id, moduleId: G.currentModule && G.currentModule.id });
      if (questJustDone)
        CLIQ.checkAchievements({
          type: 'quest', questId: q.id, boss: !!q.boss, hearts: G.hearts,
          taskCount: q.tasks.length, hintsThisQuest: G.questHints || 0,
          moduleId: G.currentModule && G.currentModule.id,
        });
    }
    G.renderSidebar();
    G.renderStory();
    G.saveSession();
  };

  G.answerQuiz = function (choiceIdx, btn) {
    const task = G.currentTask();
    if (!task || !task.quiz) return;
    const inBattle = CLIQ.battle && CLIQ.battle.isBattle(G.currentQuest);
    if (choiceIdx === task.quiz.answer) {
      btn.classList.add('correct');
      term.print('✔ ' + (task.quiz.explain || 'Correct!'), 'term-success');
      if (inBattle) G.battleLog = '✨ Your wisdom strikes true! The beast reels!';
      setTimeout(() => {
        G.completeTask();
        if (inBattle) CLIQ.battle.animate('enemy');
      }, 350);
    } else {
      btn.classList.add('wrong');
      btn.disabled = true;
      if (CLIQ.sfx) CLIQ.sfx.play(G.currentQuest.boss ? 'hurt' : 'error');
      if (G.currentQuest.boss) {
        G.hearts--;
        if (G.hearts <= 0) {
          term.print('☠ The boss overwhelms you! You gather your strength and the battle restarts...', 'term-err');
          if (inBattle) G.battleLog = '☠ You have fallen... but heroes rise again. The battle restarts!';
          G.hearts = 3;
          G.taskIndex = 0;
          if (G.currentQuest.setup) G.currentQuest.setup(G.world);
          setTimeout(() => {
            G.renderStory();
            if (inBattle) CLIQ.battle.animate('hero');
          }, 600);
          return;
        }
        if (inBattle) G.battleLog = '💥 The enemy counterattacks! You lose a heart!';
      }
      term.print('✘ Not quite. ' + (task.quiz.explainWrong || 'Think again and try another answer.'), 'term-err');
      G.renderStory(); // re-render to update hearts (keeps disabled state lost — acceptable)
      if (inBattle && G.currentQuest.boss) CLIQ.battle.animate('hero');
      G.saveSession();
    }
  };

  G.onCommand = function (e) {
    if (e.cmd && e.code !== 127 && CLIQ.commands[e.cmd] && !(G.state.usedCmds || []).includes(e.cmd)) {
      G.state.usedCmds.push(e.cmd);
      G.save();
      if (CLIQ.checkAchievements) CLIQ.checkAchievements({ type: 'cmd' });
    }
    G.saveSession(); // persist world changes from every command (incl. sandbox/quiz phases)
    const task = G.currentTask();
    if (!task || task.quiz) return;
    let result = false;
    try {
      result = task.check(e);
    } catch (err) {
      result = false;
    }
    if (result) {
      const inBattle = CLIQ.battle && CLIQ.battle.isBattle(G.currentQuest);
      if (inBattle) G.battleLog = '⚔ You cast `' + (e.cmd || 'a spell') + '` — a mighty blow!';
      G.completeTask(typeof result === 'string' ? result : task.success || 'Well done.');
      if (inBattle) CLIQ.battle.animate('enemy');
    } else if (task.nudge) {
      const n = task.nudge(e);
      if (n) term.print('☞ ' + n, 'term-nudge');
    }
  };

  // ---- boot ---------------------------------------------------------------------

  G.boot = function () {
    G.load();
    CLIQ.stage.init($('#stage'));
    G.initTerminal();
    term.print('Terminal Quest v1.1 — type `help` for your spellbook.');
    if (!G.resumeSession()) G.world = CLIQ.makeWorld();
    term.updatePrompt();
    G.renderHUD();
    G.renderSidebar();
    G.renderStory();
    $('#map-toggle').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
    $('#codex-btn').addEventListener('click', () => G.toggleCodex());
    $('#sfx-btn').addEventListener('click', () => {
      G.state.muted = !G.state.muted;
      G.save();
      G.renderHUD();
      if (CLIQ.sfx) CLIQ.sfx.play('click');
    });
    $('#save-btn').addEventListener('click', () => G.toggleSaveMenu());
    $('#import-file').addEventListener('change', (ev) => {
      if (ev.target.files && ev.target.files[0]) G.importSaveFile(ev.target.files[0]);
      ev.target.value = '';
    });
    $('#reset-btn').addEventListener('click', () => {
      if (confirm('Reset all progress and start a new adventure? (Export a save file first if in doubt.)')) {
        localStorage.removeItem(SAVE_KEY);
        localStorage.removeItem(SESSION_KEY);
        location.reload();
      }
    });
    $('#term-input').focus();
  };
})();
