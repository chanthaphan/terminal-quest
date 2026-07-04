/* Terminal Quest — Realm 1: The Shell Sanctum (unix/bash) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  CLIQ.modules.push({
    id: 'bash',
    icon: '🏛️',
    title: 'The Shell Sanctum',
    tagline: 'master the ancient bash incantations',
    quests: [
      {
        id: 'bash-1',
        title: 'Awakening',
        story:
          'You wake on cold stone. A terminal glows before you — the only light in the Sanctum. ' +
          'The shell speaks in <b>commands</b>: you type a spell, press Enter, and the realm answers. ' +
          'Every wizard first learns to <i>see where they stand</i>.',
        outro: 'You can now see, move, and read. The Sanctum acknowledges you.',
        setup(w) { w.cwd = w.home; },
        tasks: [
          {
            text: 'Reveal your current location in the filesystem with <code>pwd</code> (<b>p</b>rint <b>w</b>orking <b>d</b>irectory).',
            hint: 'Type: <code>pwd</code>',
            check: (e) => e.cmd === 'pwd' && e.ok,
            success: 'You stand in /home/hero — every user has a home directory.',
          },
          {
            text: 'Look around. List what lies in this chamber with <code>ls</code>.',
            hint: 'Type: <code>ls</code>',
            check: (e) => e.cmd === 'ls' && e.ok,
            success: 'Scrolls, a library, a crypt... and a welcome note.',
          },
          {
            text: 'Read the note: <code>cat welcome.txt</code>. <code>cat</code> prints a file\'s contents.',
            hint: 'Type: <code>cat welcome.txt</code>',
            check: (e) => e.cmd === 'cat' && e.out.includes('Welcome, apprentice'),
          },
          {
            text: 'Something is hidden here. Files starting with a dot are invisible to plain <code>ls</code>. Reveal them with <code>ls -a</code>.',
            hint: 'Type: <code>ls -a</code> — the <code>-a</code> flag means "all".',
            check: (e) => e.cmd === 'ls' && e.argv.includes('-a') && e.out.includes('.secret_rune'),
            success: 'A hidden rune appears: .secret_rune',
          },
          {
            text: 'Read the hidden rune with <code>cat</code>.',
            hint: 'Type: <code>cat .secret_rune</code>',
            check: (e) => e.cmd === 'cat' && e.out.includes('LUMOS_SHELL'),
          },
          {
            text: 'Walk into the <code>scrolls</code> chamber using <code>cd</code> (<b>c</b>hange <b>d</b>irectory).',
            hint: 'Type: <code>cd scrolls</code>',
            check: (e) => e.cmd === 'cd' && e.world.cwd.endsWith('/scrolls'),
            success: 'Notice your prompt changed — it always shows where you are.',
          },
          {
            text: 'Return home. <code>cd ..</code> goes up one level; <code>cd</code> or <code>cd ~</code> jumps straight home.',
            hint: 'Type: <code>cd ~</code> (or <code>cd ..</code>)',
            check: (e) => e.cmd === 'cd' && e.world.cwd === e.world.home,
          },
        ],
      },
      {
        id: 'bash-2',
        title: "The Scribe's Trial",
        story:
          'The Scribe of the Sanctum tests whether you can <b>create and destroy</b>. ' +
          'Directories are drawers, files are pages. You will forge them, copy them, rename them, and burn them.',
        outro: 'Creation and destruction obey your fingers now.',
        setup(w) {
          w.cwd = w.home;
        },
        tasks: [
          {
            text: 'Forge a new directory called <code>forge</code> in your home with <code>mkdir</code>.',
            hint: 'Type: <code>mkdir forge</code>',
            check: (e) => { const n = N(e.world, '/home/hero/forge'); return n && n.type === 'dir'; },
          },
          {
            text: 'Create an empty file inside it: <code>touch forge/hammer.txt</code>.',
            hint: 'Type: <code>touch forge/hammer.txt</code>',
            check: (e) => !!N(e.world, '/home/hero/forge/hammer.txt'),
          },
          {
            text: 'Write words into the file: <code>echo "iron and flame" &gt; forge/hammer.txt</code>. The <code>&gt;</code> arrow pours output into a file (replacing what was there).',
            hint: 'Type: <code>echo "iron and flame" &gt; forge/hammer.txt</code>',
            check: (e) => { const n = N(e.world, '/home/hero/forge/hammer.txt'); return n && n.content.includes('iron'); },
          },
          {
            text: 'Verify your inscription with <code>cat forge/hammer.txt</code>, then make a copy: <code>cp forge/hammer.txt forge/backup.txt</code>.',
            hint: 'Type: <code>cp forge/hammer.txt forge/backup.txt</code>',
            check: (e) => { const n = N(e.world, '/home/hero/forge/backup.txt'); return n && n.content.includes('iron'); },
          },
          {
            text: 'Rename the copy: <code>mv forge/backup.txt forge/anvil.txt</code>. (<code>mv</code> both moves and renames.)',
            hint: 'Type: <code>mv forge/backup.txt forge/anvil.txt</code>',
            check: (e) => !!N(e.world, '/home/hero/forge/anvil.txt') && !N(e.world, '/home/hero/forge/backup.txt'),
          },
          {
            text: 'Now destroy the anvil: <code>rm forge/anvil.txt</code>. ⚠️ In the real world <code>rm</code> is forever — there is no trash bin.',
            hint: 'Type: <code>rm forge/anvil.txt</code>',
            check: (e) => e.cmd === 'rm' && !N(e.world, '/home/hero/forge/anvil.txt'),
          },
        ],
      },
      {
        id: 'bash-3',
        title: 'The Seeker',
        story:
          'The library holds ten thousand pages, and somewhere in them, the words you need. ' +
          'A wizard never reads everything — they <b>search</b>. Learn <code>find</code> (find files) and <code>grep</code> (find text inside files).',
        outro: 'Nothing written can hide from you now.',
        setup(w) { w.cwd = w.home; },
        tasks: [
          {
            text: 'Find every <code>.txt</code> scroll under your home: <code>find ~ -name "*.txt"</code>.',
            hint: 'Type: <code>find ~ -name "*.txt"</code> — the quotes keep the shell from mangling the star.',
            check: (e) => e.cmd === 'find' && e.out.includes('chant1.txt'),
          },
          {
            text: 'The bestiary lists beasts and lairs. Find all <b>dragon</b> lines: <code>grep dragon scrolls/beasts.txt</code>.',
            hint: 'Type: <code>grep dragon scrolls/beasts.txt</code>',
            check: (e) => e.cmd === 'grep' && e.out.includes('dragon fire mountain'),
          },
          {
            text: 'How many dragons? Count matches with the <code>-c</code> flag.',
            hint: 'Type: <code>grep -c dragon scrolls/beasts.txt</code>',
            check: (e) => e.cmd === 'grep' && e.argv.includes('-c') && e.out.trim() === '3',
            success: 'Three dragons. -c counts matching lines.',
          },
          {
            text: 'The quest ledger logged failures. Show ERROR lines <i>with line numbers</i>: <code>grep -n ERROR library/ledger.log</code>.',
            hint: 'Type: <code>grep -n ERROR library/ledger.log</code>',
            check: (e) => e.cmd === 'grep' && e.argv.includes('-n') && e.out.includes('ERROR'),
          },
          {
            text: 'Peek at just the first 2 lines of the ledger with <code>head -n 2 library/ledger.log</code>. (<code>tail</code> shows the end.)',
            hint: 'Type: <code>head -n 2 library/ledger.log</code>',
            check: (e) => (e.cmd === 'head' || e.cmd === 'tail') && e.ok && e.argv.includes('-n'),
          },
          {
            text: 'Measure the bestiary: <code>wc -l scrolls/beasts.txt</code> counts its lines.',
            hint: 'Type: <code>wc -l scrolls/beasts.txt</code>',
            check: (e) => e.cmd === 'wc' && e.out.trim().startsWith('6'),
          },
        ],
      },
      {
        id: 'bash-4',
        title: 'The Pipe Weaver',
        story:
          'The deepest bash magic: the pipe <code>|</code>. It pours the output of one spell into the next, ' +
          'chaining small tools into mighty incantations. <i>cat | grep | sort | uniq | wc</i> — each does one thing well.',
        outro: 'You weave commands like threads. This is the true Unix way.',
        setup(w) { w.cwd = w.home; },
        tasks: [
          {
            text: 'Chain two spells: <code>cat scrolls/beasts.txt | grep dragon</code>. The pipe feeds cat\'s output into grep.',
            hint: 'Type: <code>cat scrolls/beasts.txt | grep dragon</code>',
            check: (e) => e.raw.includes('|') && e.out.includes('dragon') && e.ok,
          },
          {
            text: 'The inventory is a CSV (comma-separated). Extract just the item names (column 1): <code>cut -d, -f1 library/inventory.csv</code>.',
            hint: 'Type: <code>cut -d, -f1 library/inventory.csv</code> — <code>-d,</code> sets the delimiter, <code>-f1</code> picks field 1.',
            check: (e) => e.cmd === 'cut' && e.out.includes('sword') && e.out.includes('potion'),
          },
          {
            text: '"potion" appears three times. Weave a chain that lists each item <b>once</b>: cut the names, <code>sort</code> them, then <code>uniq</code> them.',
            hint: 'Type: <code>cut -d, -f1 library/inventory.csv | sort | uniq</code> — uniq only removes <i>adjacent</i> duplicates, so sort first!',
            check: (e) => e.raw.includes('|') && e.raw.includes('sort') && e.raw.includes('uniq') && (e.out.match(/potion/g) || []).length === 1,
          },
          {
            text: 'Count the ERROR lines in the ledger with one chain: grep them, then pipe into <code>wc -l</code>.',
            hint: 'Type: <code>grep ERROR library/ledger.log | wc -l</code>',
            check: (e) => e.raw.includes('|') && e.raw.includes('wc') && e.out.trim() === '2',
          },
          {
            text: 'Preserve your work: sort the bestiary and pour it into a new file with <code>&gt;</code>: <code>sort scrolls/beasts.txt &gt; sorted.txt</code>.',
            hint: 'Type: <code>sort scrolls/beasts.txt &gt; sorted.txt</code>',
            check: (e) => { const n = N(e.world, 'sorted.txt') || N(e.world, '/home/hero/sorted.txt'); return n && n.type === 'file' && n.content.startsWith('dragon'); },
          },
        ],
      },
      {
        id: 'bash-5',
        title: 'The Keymaster',
        story:
          'A locked crypt bars your way. In Unix, every file carries <b>permissions</b> — who may <b>r</b>ead, <b>w</b>rite, and e<b>x</b>ecute it, ' +
          'shown as three triplets: <code>rwx rwx rwx</code> for <i>owner / group / others</i>. The Keymaster teaches <code>chmod</code>.',
        outro: 'The crypt stands open. Permissions bend to your will.',
        setup(w) {
          w.cwd = w.home;
          const crypt = N(w, '/home/hero/crypt');
          if (crypt && crypt.children['locked.sh']) crypt.children['locked.sh'].mode = 0o644;
          else if (crypt) crypt.children['locked.sh'] = CLIQ.file('#!/bin/bash\necho "The crypt gate creaks open..."\n', 0o644);
        },
        tasks: [
          {
            text: 'Inspect the crypt script\'s permissions: <code>ls -l crypt/locked.sh</code>.',
            hint: 'Type: <code>ls -l crypt/locked.sh</code>',
            check: (e) => e.cmd === 'ls' && e.argv.includes('-l') && e.out.includes('locked.sh'),
            success: 'It shows -rw-r--r-- : the owner can read+write, everyone else read only. No one can execute it.',
          },
          {
            quiz: {
              question: 'What does <code>-rw-r--r--</code> mean for the OWNER of the file?',
              choices: ['read + write, but not execute', 'read only', 'read + write + execute', 'no access at all'],
              answer: 0,
              explain: 'The first triplet rw- is the owner: read yes, write yes, execute no.',
            },
            text: 'A question from the Keymaster:',
          },
          {
            text: 'Grant the execute permission so the script can run: <code>chmod +x crypt/locked.sh</code> (or <code>chmod 755</code>).',
            hint: 'Type: <code>chmod +x crypt/locked.sh</code>',
            check: (e) => { const n = N(e.world, '/home/hero/crypt/locked.sh'); return e.cmd === 'chmod' && n && (n.mode & 0o100) !== 0; },
          },
          {
            text: 'Now run it: <code>bash crypt/locked.sh</code>.',
            hint: 'Type: <code>bash crypt/locked.sh</code>',
            check: (e) => e.out.includes('crypt gate creaks open'),
          },
          {
            quiz: {
              question: 'chmod <code>755</code> gives a file which permissions?',
              choices: ['owner rwx, group r-x, others r-x', 'everyone rwx', 'owner rw-, others none', 'owner r--, group r--, others r--'],
              answer: 0,
              explain: '7=rwx, 5=r-x, 5=r-x. Each digit is read(4)+write(2)+execute(1).',
              explainWrong: 'Decode each digit: read=4, write=2, execute=1. 7=4+2+1, 5=4+1.',
            },
            text: 'One last question before the gate opens:',
          },
        ],
      },
      {
        id: 'bash-boss',
        title: 'Shade of the Sanctum',
        boss: true,
        story:
          'The torches gutter out. The <b>Shade of the Sanctum</b> rises — a creature of scattered files and misdirection. ' +
          'It has hidden its true name deep in a dungeon of decoys. Only your search-craft can unmask it. ' +
          '<br><br>⚠️ <i>Boss rules: wrong quiz answers cost a heart. Lose all three and the battle restarts.</i>',
        outro: 'The Shade dissolves into ordinary, well-organized files. Realm 1 is yours. 🏆',
        setup(w) {
          w.cwd = w.home;
          const home = N(w, '/home/hero');
          const D = CLIQ.dir, F = CLIQ.file;
          home.children['dungeon'] = D({
            'antechamber': D({ 'note.txt': F('The Shade scatters lies. Trust only what is marked TRUE.\n'), 'rune_a.txt': F('key: FALSE_MOONWISP\n') }),
            'hall_of_echoes': D({
              'rune_b.txt': F('key: FALSE_GLOOMTIDE\n'),
              'passage': D({ 'shadow_key.txt': F('key: FALSE_IRONVEIL\nkey: FALSE_DUSKMERE\nkey: TRUE_EMBERFALL\nkey: FALSE_NIGHTSHARD\n') }),
            }),
            'crypt_of_names': D({ 'rune_c.txt': F('key: FALSE_HOLLOWMIST\n') }),
          });
        },
        tasks: [
          {
            quiz: {
              question: 'The Shade hides a file named <code>shadow_key.txt</code> somewhere under <code>dungeon/</code>. Which spell locates a file <b>by name</b>?',
              choices: ['find dungeon -name "shadow_key.txt"', 'grep shadow_key.txt dungeon', 'ls shadow_key.txt', 'cat dungeon/shadow_key.txt'],
              answer: 0,
              explain: 'find walks a directory tree and matches names. grep searches inside file contents.',
              explainWrong: 'grep searches inside files; find searches for files.',
            },
            text: 'The Shade whispers a riddle:',
          },
          {
            text: 'Now do it — locate <code>shadow_key.txt</code> in the dungeon.',
            hint: 'Type: <code>find dungeon -name "shadow_key.txt"</code>',
            check: (e) => e.cmd === 'find' && e.out.includes('shadow_key.txt'),
            success: 'Found it, buried in the hall of echoes.',
          },
          {
            text: 'The key file lists many names, but only one is marked <b>TRUE</b>. Extract it with <code>grep</code>.',
            hint: 'Type: <code>grep TRUE dungeon/hall_of_echoes/passage/shadow_key.txt</code>',
            check: (e) => e.cmd === 'grep' && e.out.includes('EMBERFALL') && !e.out.includes('MOONWISP'),
            success: 'The true name: EMBERFALL.',
          },
          {
            text: 'Speak the name aloud to banish the Shade: <code>echo EMBERFALL</code>.',
            hint: 'Type: <code>echo EMBERFALL</code>',
            check: (e) => e.cmd === 'echo' && e.out.includes('EMBERFALL'),
          },
          {
            quiz: {
              question: 'Final strike! Which chain counts how many FALSE keys the Shade planted in shadow_key.txt?',
              choices: ['grep -c FALSE dungeon/hall_of_echoes/passage/shadow_key.txt', 'wc -l FALSE shadow_key.txt', 'find FALSE | wc', 'cat shadow_key.txt | sort FALSE'],
              answer: 0,
              explain: 'grep -c counts matching lines — the killing blow!',
              explainWrong: 'You need to count lines matching FALSE — which tool counts matches?',
            },
            text: 'The Shade staggers. Finish it:',
          },
        ],
      },
    ],
  });
})();
