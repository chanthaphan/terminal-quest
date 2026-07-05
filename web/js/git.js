/* Terminal Quest — simulated git (repo lives in the directory where `git init` ran) */
(function () {
  const CLIQ = window.CLIQ;
  const C = CLIQ.commands;
  const ok = (out) => ({ out: out || '', code: 0 });
  const err = (out) => ({ out: out || '', code: 1 });

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
    const untracked = [], modified = [];
    for (const name of Object.keys(files)) {
      if (stagedNames.includes(name)) continue;
      if (!(name in g.tracked)) untracked.push(name);
      else if (g.tracked[name] !== files[name]) modified.push(name);
    }
    return { untracked, modified, staged: stagedNames };
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
      const { untracked, modified, staged } = statusSets(w);
      let o = `On branch ${g.branch}\n`;
      if (staged.length) o += '\nChanges to be committed:\n' + staged.map((f) => `\tnew/modified: ${f}`).join('\n') + '\n';
      if (modified.length) o += '\nChanges not staged for commit:\n' + modified.map((f) => `\tmodified:   ${f}`).join('\n') + '\n';
      if (untracked.length) o += '\nUntracked files:\n' + untracked.map((f) => `\t${f}`).join('\n') + '\n';
      if (!staged.length && !modified.length && !untracked.length) o += 'nothing to commit, working tree clean\n';
      return ok(o);
    }

    if (sub === 'add') {
      const targets = a.slice(1);
      if (!targets.length) return err("Nothing specified, nothing added.\nhint: try 'git add .' or 'git add FILE'\n");
      const files = repoFiles(w);
      const { untracked, modified } = statusSets(w);
      if (targets.includes('.') || targets.includes('-A') || targets.includes('--all')) {
        for (const name of [...untracked, ...modified]) g.staged.push({ name, content: files[name] });
        return ok('');
      }
      for (const t of targets) {
        if (!(t in files)) return err(`fatal: pathspec '${t}' did not match any files\n`);
        if (!g.staged.find((s) => s.name === t)) g.staged.push({ name: t, content: files[t] });
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
      g.branches[g.branch].push({ id, msg, files: names });
      for (const s of g.staged) g.tracked[s.name] = s.content;
      g.staged = [];
      return ok(`[${g.branch} ${id}] ${msg}\n ${names.length} file(s) changed\n`);
    }

    if (sub === 'log') {
      const commits = g.branches[g.branch] || [];
      if (!commits.length) return err(`fatal: your current branch '${g.branch}' does not have any commits yet\n`);
      const oneline = a.includes('--oneline');
      const list = [...commits].reverse();
      if (oneline) return ok(list.map((c) => `${c.id} ${c.msg}`).join('\n') + '\n');
      return ok(list.map((c) => `commit ${c.id}${c === list[0] ? ' (HEAD -> ' + g.branch + ')' : ''}\nAuthor: hero <hero@quest.dev>\nDate:   Fri Jul 4 2026\n\n    ${c.msg}\n`).join('\n'));
    }

    if (sub === 'branch') {
      const name = a[1];
      if (!name) return ok(Object.keys(g.branches).map((b) => (b === g.branch ? '* ' + b : '  ' + b)).join('\n') + '\n');
      if (g.branches[name]) return err(`fatal: a branch named '${name}' already exists\n`);
      g.branches[name] = [...g.branches[g.branch]];
      return ok('');
    }

    if (sub === 'checkout' || sub === 'switch') {
      let name = a[1];
      if (name === '-b' || name === '-c') {
        name = a[2];
        if (!name) return err('usage: git checkout -b NAME\n');
        if (g.branches[name]) return err(`fatal: a branch named '${name}' already exists\n`);
        g.branches[name] = [...g.branches[g.branch]];
      }
      if (!name) return err('usage: git checkout [-b] BRANCH\n');
      if (!g.branches[name]) return err(`error: pathspec '${name}' did not match any branch known to git\n`);
      const { modified } = statusSets(w);
      g.branch = name;
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
      // merged files become tracked at incoming content (simplified: no conflicts in the simulator)
      return ok(`Updating ${cur[cur.length - incoming.length - 1] ? cur[cur.length - incoming.length - 1].id : 'root'}..${incoming[incoming.length - 1].id}\nFast-forward (simulated)\n ${incoming.length} commit(s) merged from '${other}'\n`);
    }

    if (sub === 'diff') {
      const { modified } = statusSets(w);
      if (!modified.length) return ok('');
      const files = repoFiles(w);
      return ok(modified.map((f) => `--- a/${f}\n+++ b/${f}\n- ${(g.tracked[f] || '').split('\n')[0]}\n+ ${(files[f] || '').split('\n')[0]}`).join('\n') + '\n');
    }

    return err(`git: '${sub || ''}' is not supported here.\nSupported: init, status, add, commit -m, log [--oneline], branch, checkout [-b], merge, diff\n`);
  };
})();
