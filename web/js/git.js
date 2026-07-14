/* Terminal Quest — simulated git (repo lives in the directory where `git init` ran) */
(function () {
  const CLIQ = window.CLIQ;
  const C = CLIQ.commands;
  const ok = (out) => ({ out: out || '', code: 0 });
  const err = (out) => ({ out: out || '', code: 1, isErr: true });

  function repoFiles(w) {
    // All files in the repo root (the dir where git init ran), non-recursive keeps it teachable.
    const root = CLIQ.getNode(w, w.git.root || w.cwd);
    if (!root || root.type !== 'dir') return {};
    const files = {};
    (function walk(node, prefix) {
      for (const k of Object.keys(node.children)) {
        const c = node.children[k];
        const p = prefix ? prefix + '/' + k : k;
        if (c.type === 'file') files[p] = c.content;
        else walk(c, p);
      }
    })(root, '');
    return files;
  }

  function inRepo(w) {
    return w.git.initialized && CLIQ.normalize(w, w.cwd).startsWith(w.git.root);
  }

  function statusSets(w) {
    const g = w.git;
    const files = repoFiles(w);
    const stagedNames = g.staged.map((s) => s.name);
    const untracked = [], modified = [], deleted = [];
    for (const name of Object.keys(files)) {
      const st = g.staged.find((s) => s.name === name);
      if (st) {
        // staged then edited again → the newer edits show as not-staged, like real git
        if (st.content !== files[name]) modified.push(name);
        continue;
      }
      if (!(name in g.tracked)) untracked.push(name);
      else if (g.tracked[name] !== files[name]) modified.push(name);
    }
    for (const name of Object.keys(g.tracked)) {
      if (!(name in files) && !g.staged.find((s) => s.name === name)) deleted.push(name);
    }
    return { untracked, modified, deleted, staged: stagedNames };
  }

  // Replay a branch's commit snapshots into {path: content} — the branch's file state.
  function branchSnapshot(g, branch) {
    const snap = {};
    for (const c of g.branches[branch] || []) {
      if (!c.snap) continue;
      for (const k of Object.keys(c.snap)) {
        if (c.snap[k] == null) delete snap[k];
        else snap[k] = c.snap[k];
      }
    }
    return snap;
  }

  function setPath(root, rel, content) {
    const parts = rel.split('/');
    const name = parts.pop();
    let node = root;
    for (const p of parts) {
      if (!node.children[p]) node.children[p] = CLIQ.dir();
      node = node.children[p];
      if (node.type !== 'dir') return;
    }
    if (content == null) delete node.children[name];
    else if (node.children[name]) node.children[name].content = content;
    else node.children[name] = CLIQ.file(content);
  }

  // Rewrite the working tree to a branch snapshot. Dirty (modified/staged) files ride along untouched;
  // clean tracked files are updated or removed — the real "the file is gone on main!" moment.
  function applyCheckout(w, g, targetSnap) {
    const root = CLIQ.getNode(w, g.root);
    if (!root || root.type !== 'dir') { g.tracked = { ...targetSnap }; return; }
    const { modified } = statusSets(w);
    const riding = new Set([...modified, ...g.staged.map((s) => s.name)]);
    for (const name of Object.keys(g.tracked)) {
      if (riding.has(name)) continue;
      if (!(name in targetSnap)) setPath(root, name, null);
    }
    for (const name of Object.keys(targetSnap)) {
      if (riding.has(name)) continue;
      setPath(root, name, targetSnap[name]);
    }
    g.tracked = { ...targetSnap };
  }

  function commitId(g) {
    g.serial++;
    return ('a1f' + (4096 + g.serial * 273).toString(16)).slice(0, 7);
  }

  C.git = (a, w) => {
    const g = w.git;
    const sub = a[0];

    if (sub === 'init') {
      if (g.initialized && CLIQ.normalize(w, w.cwd) === g.root) return ok(`Reinitialized existing Git repository in ${g.root}/.git/\n`);
      // initializing in a different directory starts a fresh repository there
      g.initialized = true;
      g.root = CLIQ.normalize(w, w.cwd);
      g.branch = 'main';
      g.branches = { main: [] };
      g.staged = [];
      g.tracked = {};
      return ok(`Initialized empty Git repository in ${g.root}/.git/\n`);
    }

    if (!g.initialized || !inRepo(w))
      return err('fatal: not a git repository (or any of the parent directories): .git\n');

    if (sub === 'status') {
      const { untracked, modified, deleted, staged } = statusSets(w);
      let o = `On branch ${g.branch}\n`;
      if (!(g.branches[g.branch] || []).length) o += '\nNo commits yet\n';
      if (staged.length) {
        o += '\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n' +
          g.staged.map((s) => `\t${s.content == null ? 'deleted:    ' : s.name in g.tracked ? 'modified:   ' : 'new file:   '}${s.name}`).join('\n') + '\n';
      }
      if (modified.length || deleted.length) {
        o += '\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n' +
          [...modified.map((f) => `\tmodified:   ${f}`), ...deleted.map((f) => `\tdeleted:    ${f}`)].join('\n') + '\n';
      }
      if (untracked.length) o += '\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n' + untracked.map((f) => `\t${f}`).join('\n') + '\n';
      if (!staged.length && !modified.length && !deleted.length && !untracked.length) o += 'nothing to commit, working tree clean\n';
      return ok(o);
    }

    if (sub === 'add') {
      const targets = a.slice(1);
      if (!targets.length) return err("Nothing specified, nothing added.\nhint: try 'git add .' or 'git add FILE'\n");
      const files = repoFiles(w);
      const { untracked, modified, deleted } = statusSets(w);
      const stage = (name) => {
        const content = name in files ? files[name] : null; // null stages a deletion
        const s = g.staged.find((x) => x.name === name);
        if (s) s.content = content; // re-add refreshes the index snapshot, like real git
        else g.staged.push({ name, content });
      };
      if (targets.includes('.') || targets.includes('-A') || targets.includes('--all')) {
        for (const name of [...untracked, ...modified, ...deleted]) stage(name);
        return ok('');
      }
      for (const t of targets) {
        if (!(t in files) && !(t in g.tracked)) return err(`fatal: pathspec '${t}' did not match any files\n`);
        stage(t);
      }
      return ok('');
    }

    if (sub === 'commit') {
      const mi = a.indexOf('-m');
      const msg = mi >= 0 ? a[mi + 1] : null;
      if (!msg) return err('error: a commit message is required here: git commit -m "message"\n');
      if (!g.staged.length) return err(`On branch ${g.branch}\nnothing to commit (stage files with git add first)\n`);
      const id = commitId(g);
      const names = g.staged.map((s) => s.name);
      const snap = {};
      for (const s of g.staged) snap[s.name] = s.content; // null = deletion
      const root = !g.branches[g.branch].length;
      g.branches[g.branch].push({ id, msg, files: names, snap });
      for (const s of g.staged) {
        if (s.content == null) delete g.tracked[s.name];
        else g.tracked[s.name] = s.content;
      }
      g.staged = [];
      return ok(`[${g.branch}${root ? ' (root-commit)' : ''} ${id}] ${msg}\n ${names.length} file${names.length === 1 ? '' : 's'} changed\n`);
    }

    if (sub === 'log') {
      const commits = g.branches[g.branch] || [];
      if (!commits.length) return err(`fatal: your current branch '${g.branch}' does not have any commits yet\n`);
      const oneline = a.includes('--oneline');
      const list = [...commits].reverse();
      if (oneline) return ok(list.map((c) => `${c.id}${c === list[0] ? ' (HEAD -> ' + g.branch + ')' : ''} ${c.msg}`).join('\n') + '\n');
      // the full view shows the complete 40-char hash; only --oneline abbreviates
      const full = (id) => (id + id.split('').reverse().join('') + id).repeat(3).slice(0, 40);
      return ok(list.map((c) => `commit ${full(c.id)}${c === list[0] ? ' (HEAD -> ' + g.branch + ')' : ''}\nAuthor: hero <hero@quest.dev>\nDate:   Fri Jul 4 10:12:34 2026 +0700\n\n    ${c.msg}\n`).join('\n'));
    }

    if (sub === 'branch') {
      const name = a[1];
      if (!name) {
        // an unborn branch has no commits — real git lists nothing until the first commit
        if (!(g.branches[g.branch] || []).length) return ok('');
        return ok(Object.keys(g.branches).map((b) => (b === g.branch ? '* ' + b : '  ' + b)).join('\n') + '\n');
      }
      if (g.branches[name]) return err(`fatal: a branch named '${name}' already exists\n`);
      if (!(g.branches[g.branch] || []).length) return err(`fatal: not a valid object name: '${g.branch}'\n(a branch must point at a commit — make your first commit before branching)\n`);
      g.branches[name] = [...g.branches[g.branch]];
      return ok('');
    }

    if (sub === 'checkout' || sub === 'switch') {
      let name = a[1];
      if (name === '-b' || name === '-c') {
        // real git: create-and-switch is `checkout -b` or `switch -c` — never the other pairing
        const valid = sub === 'checkout' ? '-b' : '-c';
        if (name !== valid) return err(`error: unknown switch \`${name.slice(1)}'\nhint: create-and-switch is \`git checkout -b NAME\` or \`git switch -c NAME\`\n`);
        name = a[2];
        if (!name) return err(`usage: git ${sub} ${valid} NAME\n`);
        if (g.branches[name]) return err(`fatal: a branch named '${name}' already exists\n`);
        if (!(g.branches[g.branch] || []).length) return err(`fatal: not a valid object name: '${g.branch}'\n(a branch must point at a commit — make your first commit before branching)\n`);
        g.branches[name] = [...g.branches[g.branch]];
      }
      if (!name) return err('usage: git checkout [-b] BRANCH\n');
      if (!g.branches[name]) return err(`error: pathspec '${name}' did not match any branch known to git\n`);
      const { modified } = statusSets(w);
      g.branch = name;
      applyCheckout(w, g, branchSnapshot(g, name)); // the working tree becomes the branch's snapshot
      return ok(`Switched to ${a[1] === '-b' || a[1] === '-c' ? 'a new branch' : 'branch'} '${name}'\n` + (modified.length ? '(your uncommitted changes ride along — commit them soon)\n' : ''));
    }

    if (sub === 'merge') {
      const other = a[1];
      if (!other || !g.branches[other]) return err(`merge: ${other || ''} - not something we can merge\n`);
      const cur = g.branches[g.branch];
      const curIds = new Set(cur.map((c) => c.id));
      const incoming = g.branches[other].filter((c) => !curIds.has(c.id));
      if (!incoming.length) return ok('Already up to date.\n');
      cur.push(...incoming);
      // merged content lands in the index AND the working tree, like real git
      const root = CLIQ.getNode(w, g.root);
      for (const c of incoming) {
        if (!c.snap) continue;
        for (const k of Object.keys(c.snap)) {
          if (c.snap[k] == null) { delete g.tracked[k]; if (root) setPath(root, k, null); }
          else { g.tracked[k] = c.snap[k]; if (root) setPath(root, k, c.snap[k]); }
        }
      }
      return ok(`Updating ${cur[cur.length - incoming.length - 1] ? cur[cur.length - incoming.length - 1].id : 'root'}..${incoming[incoming.length - 1].id}\nFast-forward (simulated)\n ${incoming.length} commit(s) merged from '${other}'\n`);
    }

    if (sub === 'diff') {
      const files = repoFiles(w);
      const firstLine = (s) => (s || '').split('\n')[0];
      if (a.includes('--staged') || a.includes('--cached')) {
        // index vs last commit
        const entries = g.staged.filter((s) => (s.content || '') !== (g.tracked[s.name] || ''));
        if (!entries.length) return ok('');
        return ok(entries.map((s) => s.content == null
          ? `--- a/${s.name}\n+++ /dev/null\n-${firstLine(g.tracked[s.name])}`
          : `--- a/${s.name}\n+++ b/${s.name}\n-${firstLine(g.tracked[s.name])}\n+${firstLine(s.content)}`).join('\n') + '\n');
      }
      // working tree vs index (staged content if present, else last commit)
      const { modified, deleted } = statusSets(w);
      if (!modified.length && !deleted.length) return ok('');
      const base = (f) => { const s = g.staged.find((x) => x.name === f); return s ? s.content : g.tracked[f]; };
      const lines = [
        ...modified.map((f) => `--- a/${f}\n+++ b/${f}\n-${firstLine(base(f))}\n+${firstLine(files[f])}`),
        ...deleted.map((f) => `--- a/${f}\n+++ /dev/null\n-${firstLine(base(f))}`),
      ];
      return ok(lines.join('\n') + '\n');
    }

    return err(`git: '${sub || ''}' is not supported here.\nSupported: init, status, add, commit -m, log [--oneline], branch, checkout [-b], switch [-c], merge, diff [--staged]\n`);
  };
})();
