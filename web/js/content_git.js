/* Terminal Quest — Realm 6: The Chronicle of Branches (git) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  function ensureProject(w) {
    const home = N(w, '/home/hero');
    if (!home.children['project']) {
      home.children['project'] = CLIQ.dir({
        'app.py': CLIQ.file('print("hello quest")\n'),
        'README.md': CLIQ.file('# Quest Project\n'),
      });
    }
    return home.children['project'];
  }

  function freshRepo(w) {
    ensureProject(w);
    w.git = CLIQ.buildGit();
    w.cwd = '/home/hero/project';
  }

  // Simulate history directly so later quests work even if started out of order.
  function repoWithCommits(w, count) {
    freshRepo(w);
    const g = w.git;
    const proj = ensureProject(w);
    g.initialized = true;
    g.root = '/home/hero/project';
    g.branches = { main: [] };
    g.tracked = { 'app.py': proj.children['app.py'].content, 'README.md': proj.children['README.md'].content };
    const msgs = ['scaffold the quest project', 'inscribe the README lore'];
    for (let i = 0; i < count; i++) {
      g.serial++;
      g.branches.main.push({
        id: ('a1f' + (4096 + g.serial * 273).toString(16)).slice(0, 7),
        msg: msgs[i] || 'chronicle entry ' + (i + 1),
        files: ['app.py'],
        // first commit snapshots the whole project so branch replay matches the working tree
        snap: i === 0 ? { ...g.tracked } : { 'app.py': proj.children['app.py'].content },
      });
    }
  }

  CLIQ.modules.push({
    id: 'git',
    icon: '📜',
    title: 'The Chronicle of Branches',
    tagline: 'record history and weave timelines with git',
    quests: [
      {
        id: 'git-1',
        title: 'The First Chronicle',
        story:
          'In the enterprise realms, no spell is cast alone — dozens of wizards work the same scrolls. ' +
          '<b>git</b> is the Chronicle: it records every change, who made it, and why. ' +
          'A recorded snapshot is a <b>commit</b>; the Chronicle lives in a <b>repository</b>.',
        outro: 'Your first entry is inked into history — forever.',
        setup: freshRepo,
        tasks: [
          {
            text: 'Your project awaits. Enter it: <code>cd ~/project</code>.',
            hint: 'Type: <code>cd ~/project</code>',
            check: (e) => e.world.cwd.endsWith('/project'),
          },
          {
            text: 'Open a Chronicle here: <code>git init</code>.',
            hint: 'Type: <code>git init</code>',
            check: (e) => e.world.git.initialized && e.out.includes('Initialized'),
            success: 'A hidden .git ledger now watches this directory.',
          },
          {
            text: 'Ask the Chronicle what it sees: <code>git status</code>.',
            hint: 'Type: <code>git status</code>',
            check: (e) => e.cmd === 'git' && e.out.includes('Untracked'),
            success: 'Untracked files — the Chronicle sees them but does not yet protect them.',
          },
          {
            text: 'Stage everything for recording: <code>git add .</code>',
            hint: 'Type: <code>git add .</code>',
            check: (e) => e.world.git.staged.length >= 2,
          },
          {
            text: 'Seal the record: <code>git commit -m "first commit"</code>.',
            hint: 'Type: <code>git commit -m "first commit"</code>',
            check: (e) => e.world.git.branches.main && e.world.git.branches.main.length >= 1 && e.world.git.staged.length === 0,
          },
          {
            quiz: {
              question: 'What exactly is a <b>commit</b>?',
              choices: [
                'A recorded snapshot of your staged changes, with a message and an id',
                'A backup of your whole computer',
                'A command that uploads code to the internet',
                'A temporary save that disappears on reboot',
              ],
              answer: 0,
              explain: 'A commit is a permanent, identified snapshot in the repo history. (Pushing to a server is a separate act.)',
            },
            text: 'The Chronicler asks:',
          },
        ],
      },
      {
        id: 'git-2',
        title: "The Scribe's Loop",
        story:
          'The daily rhythm of every enterprise wizard: <b>edit → status → add → commit</b>. ' +
          'The <b>staging area</b> (git add) is your drafting table — you choose exactly which changes ' +
          'make it into the next commit.',
        outro: 'Edit, stage, commit — the loop is in your bones now.',
        setup(w) {
          if (!w.git.initialized) repoWithCommits(w, 1);
          w.cwd = '/home/hero/project';
        },
        tasks: [
          {
            text: 'Change something. Append lore to the README: <code>echo "The lore grows." &gt;&gt; README.md</code>',
            hint: 'Type: <code>echo "The lore grows." &gt;&gt; README.md</code> (note &gt;&gt; appends)',
            check: (e) => {
              const n = N(e.world, '/home/hero/project/README.md');
              return n && n.content !== e.world.git.tracked['README.md'];
            },
          },
          {
            text: 'See what the Chronicle noticed: <code>git status</code>.',
            hint: 'Type: <code>git status</code>',
            check: (e) => e.cmd === 'git' && e.out.includes('modified'),
            success: '"modified" — it knows the file drifted from the last commit.',
          },
          {
            text: 'Peek at the actual difference: <code>git diff</code>, then stage it: <code>git add README.md</code>.',
            hint: 'Type: <code>git add README.md</code>',
            check: (e) => e.world.git.staged.some((s) => s.name === 'README.md'),
          },
          {
            text: 'Seal it with a meaningful message: <code>git commit -m "expand the lore"</code>.',
            hint: 'Type: <code>git commit -m "expand the lore"</code>',
            check: (e) => e.world.git.branches[e.world.git.branch].length >= 2,
          },
          {
            quiz: {
              question: 'Why does git have a <b>staging area</b> instead of committing everything at once?',
              choices: [
                'So you can compose a commit from exactly the changes that belong together',
                'To upload files faster',
                'It is a bug kept for compatibility',
                'To encrypt your changes',
              ],
              answer: 0,
              explain: 'Staging lets you commit one logical change at a time — reviewers (and future you) will thank you.',
            },
            text: 'The Scribe tests you:',
          },
        ],
      },
      {
        id: 'git-3',
        title: 'Reading the Chronicle',
        story:
          'A Chronicle no one reads is just a diary. <code>git log</code> replays history: ' +
          'every commit has a <b>hash</b> (its true name), an author, and a message. ' +
          '<b>HEAD</b> is the bookmark — where in history you currently stand.',
        outro: 'History speaks to you now. Listen before you change it.',
        setup(w) {
          if (!w.git.initialized || !w.git.branches.main || w.git.branches.main.length < 2) repoWithCommits(w, 2);
          w.cwd = '/home/hero/project';
        },
        tasks: [
          {
            text: 'Unroll the full history: <code>git log</code>.',
            hint: 'Type: <code>git log</code>',
            check: (e) => e.cmd === 'git' && e.out.includes('Author'),
          },
          {
            text: 'Too verbose for daily use. Get the compact view: <code>git log --oneline</code>.',
            hint: 'Type: <code>git log --oneline</code>',
            check: (e) => e.cmd === 'git' && e.argv.includes('--oneline') && e.ok,
            success: 'One line per commit: hash + message. This is the view you will live in.',
          },
          {
            quiz: {
              question: 'What is the commit <b>hash</b> (e.g. a1f4d2c) for?',
              choices: [
                'A unique id you can use to reference, compare, or return to that exact snapshot',
                'A password protecting the commit',
                'The number of files changed',
                'A random decoration',
              ],
              answer: 0,
              explain: 'Hashes let you name any point in history precisely: git checkout a1f4d2c, git diff a1f4d2c..main, etc.',
            },
            text: 'The archivist asks:',
          },
          {
            quiz: {
              question: 'And what is <b>HEAD</b>?',
              choices: [
                'A pointer to where you currently are in history (usually the tip of your branch)',
                'The first commit ever made',
                'The main office of GitHub',
                'The largest file in the repo',
              ],
              answer: 0,
              explain: 'HEAD moves as you commit or switch branches — it is the "you are here" marker.',
            },
            text: 'One more:',
          },
        ],
      },
      {
        id: 'git-4',
        title: 'The Forked Path',
        story:
          'Here is git\'s deepest magic: <b>branches</b>. A branch is a parallel timeline — ' +
          'you experiment freely on <code>feature-potion</code> while <code>main</code> stays pristine for your guild. ' +
          'Creating one is instant and free.',
        outro: 'You walk between timelines without fear.',
        setup(w) {
          if (!w.git.initialized || !w.git.branches.main || w.git.branches.main.length < 2) repoWithCommits(w, 2);
          w.git.branch = 'main';
          w.cwd = '/home/hero/project';
        },
        tasks: [
          {
            text: 'Fork a new timeline and step into it: <code>git checkout -b feature-potion</code>.',
            hint: 'Type: <code>git checkout -b feature-potion</code> (-b creates and switches in one move)',
            check: (e) => e.world.git.branch === 'feature-potion',
          },
          {
            text: 'Brew something new here: <code>echo "brew of haste" &gt; potion.txt</code>.',
            hint: 'Type: <code>echo "brew of haste" &gt; potion.txt</code>',
            check: (e) => !!N(e.world, '/home/hero/project/potion.txt'),
          },
          {
            text: 'Record it on THIS timeline: <code>git add .</code> then <code>git commit -m "add haste potion"</code>.',
            hint: 'Type: <code>git add .</code> then <code>git commit -m "add haste potion"</code>',
            check: (e) => {
              const g = e.world.git;
              return g.branches['feature-potion'] && g.branches['feature-potion'].length > g.branches.main.length;
            },
            success: 'The potion exists only in feature-potion. main knows nothing of it.',
          },
          {
            text: 'Step back to the main timeline: <code>git checkout main</code>. Run <code>git log --oneline</code> — no potion commit!',
            hint: 'Type: <code>git checkout main</code>',
            check: (e) => e.world.git.branch === 'main',
            success: 'And run <code>ls</code> — potion.txt itself is GONE from the working tree. It exists only in the other timeline.',
          },
          {
            quiz: {
              question: 'Why do teams do all work on branches instead of committing straight to main?',
              choices: [
                'main stays always-releasable; work is reviewed and merged only when ready',
                'Branches make git run faster',
                'main is read-only by law',
                'To hide code from teammates',
              ],
              answer: 0,
              explain: 'Branch → review (pull request) → merge. That flow is the backbone of enterprise development.',
            },
            text: 'The keeper of timelines asks:',
          },
        ],
      },
      {
        id: 'git-5',
        title: 'The Great Weaving',
        story:
          'Timelines must eventually reunite: <code>git merge</code> weaves a branch\'s commits back into yours. ' +
          'When both timelines touched the <i>same lines</i>, git stops and asks a human to resolve the <b>conflict</b> — ' +
          'that is not an error, it is a question.',
        outro: 'You weave timelines together. The Wraith stirs...',
        setup(w) {
          const g = w.git;
          if (!g.initialized || !g.branches['feature-potion']) {
            repoWithCommits(w, 2);
            w.git.branches['feature-potion'] = [...w.git.branches.main, { id: 'a1fbeef', msg: 'add haste potion', files: ['potion.txt'], snap: { 'potion.txt': 'brew of haste\n' } }];
            w.git.serial += 1;
          }
          w.git.branch = 'main';
          w.cwd = '/home/hero/project';
        },
        tasks: [
          {
            text: 'From main, weave the potion timeline in: <code>git merge feature-potion</code>.',
            hint: 'Type: <code>git merge feature-potion</code>',
            check: (e) => {
              const g = e.world.git;
              return e.argv.includes('merge') && g.branches.main.length >= g.branches['feature-potion'].length;
            },
          },
          {
            text: 'Confirm the weave: <code>git log --oneline</code> — the potion commit now lives in main.',
            hint: 'Type: <code>git log --oneline</code>',
            check: (e) => e.cmd === 'git' && e.argv.includes('--oneline') && e.out.split('\n').filter(Boolean).length >= 3,
          },
          {
            quiz: {
              question: 'When does a <b>merge conflict</b> happen?',
              choices: [
                'When both branches changed the same lines of the same file differently',
                'Every time you merge anything',
                'When branch names are too similar',
                'When the repo is larger than 1GB',
              ],
              answer: 0,
              explain: 'Git auto-merges different files and different lines. Same lines, different edits → a human must choose.',
            },
            text: 'The weaver asks:',
          },
          {
            quiz: {
              question: 'You hit a conflict. What is the correct ritual?',
              choices: [
                'Open the file, choose/combine the conflicting parts, remove the <<<< ==== >>>> markers, add, commit',
                'Delete the repository and clone it again',
                'Run the merge repeatedly until it works',
                'Always take your own version without reading',
              ],
              answer: 0,
              explain: 'Conflicts are resolved by editing, then staging and committing the resolution. Read both sides first!',
            },
            text: 'And the final thread:',
          },
        ],
      },
      {
        id: 'git-boss',
        title: 'The Merge Wraith',
        boss: true,
        story:
          '👻 A scream echoes through the repo <code>~/wraith-repo</code>: the <b>Merge Wraith</b> has scattered the timelines! ' +
          'You awaken on a strange branch with uncommitted work, while the fix your guild needs sits stranded on the ' +
          '<code>rescue</code> branch. Recover the situation like a senior engineer: <b>look first, commit your work, ' +
          'return to main, weave in the rescue.</b> <br><br>⚠️ <i>Wrong answers cost a heart.</i>',
        outro: 'The timelines converge and the Wraith unravels. History is safe with you. 🏆',
        setup(w) {
          const home = N(w, '/home/hero');
          home.children['wraith-repo'] = CLIQ.dir({
            'spellbook.md': CLIQ.file('# Guild Spellbook\n'),
            'omen.txt': CLIQ.file('a half-finished prophecy\n'),
          });
          const mk = (id, msg, snap) => ({ id, msg, files: Object.keys(snap), snap });
          const book = '# Guild Spellbook\n';
          const mainCommits = [mk('a1f1000', 'found the guild spellbook', { 'spellbook.md': book }), mk('a1f2000', 'add fireball chapter', { 'spellbook.md': book })];
          w.git = {
            initialized: true, root: '/home/hero/wraith-repo', serial: 9,
            branch: 'lost-timeline',
            branches: {
              main: [...mainCommits],
              rescue: [...mainCommits, mk('a1f3000', 'FIX: seal the wraith breach', { 'spellbook.md': book + '\n## Seal of Binding\nThe wraith breach is closed.\n' })],
              'lost-timeline': [...mainCommits],
            },
            staged: [],
            tracked: { 'spellbook.md': '# Guild Spellbook\n' },
          };
          w.cwd = '/home/hero/wraith-repo';
        },
        tasks: [
          {
            text: 'First rule of incidents: <b>look before you touch</b>. Where are you and what is dirty?',
            hint: 'Type: <code>git status</code>',
            check: (e) => e.cmd === 'git' && e.out.includes('lost-timeline'),
            success: 'You are on branch lost-timeline, with untracked work (omen.txt).',
          },
          {
            quiz: {
              question: 'The Wraith cackles: "You do not even know your timelines!" Which command lists ALL branches?',
              choices: ['git branch', 'git log', 'git status -b', 'git timelines'],
              answer: 0,
              explain: 'git branch lists them; the * marks where you stand.',
              explainWrong: 'log shows commits, status shows changes. Which one lists branches?',
            },
            text: 'The Wraith\'s first taunt:',
          },
          {
            text: 'Do it — survey the timelines.',
            hint: 'Type: <code>git branch</code>',
            check: (e) => e.cmd === 'git' && e.out.includes('rescue'),
            success: 'main, rescue, and your lost-timeline. The fix waits on rescue.',
          },
          {
            text: 'Never abandon uncommitted work. Record the prophecy on THIS branch: stage everything and commit it.',
            hint: 'Type: <code>git add .</code> then <code>git commit -m "save the prophecy"</code>',
            check: (e) => {
              const g = e.world.git;
              return g.branches['lost-timeline'].length >= 3 && g.staged.length === 0;
            },
            success: 'Your work is safe in history. Now you can move freely.',
          },
          {
            text: 'Return to the true timeline.',
            hint: 'Type: <code>git checkout main</code>',
            check: (e) => e.world.git.branch === 'main',
          },
          {
            text: 'Weave the guild\'s fix into main and banish the Wraith!',
            hint: 'Type: <code>git merge rescue</code>',
            check: (e) => e.world.git.branches.main.some((c) => c.msg.includes('FIX')),
            success: 'The breach is sealed. The Wraith howls!',
          },
          {
            quiz: {
              question: 'FINAL BLOW — why did you commit your stray work BEFORE switching branches?',
              choices: [
                'Uncommitted changes are not protected by history — committing first makes switching and merging safe',
                'Because git refuses to work with less than 3 commits',
                'To make the repository larger',
                'No reason; it was decorative',
              ],
              answer: 0,
              explain: 'Commit (or stash) before you travel timelines. The Wraith dissolves into a well-ordered git log!',
            },
            text: 'The Wraith gasps:',
          },
        ],
      },
    ],
  });
})();
