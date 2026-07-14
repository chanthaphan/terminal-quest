/* Terminal Quest — Realm 8: The Alchemist's Lab (processes, disk, awk/sed, cron) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  function ensureLab(w) {
    const home = N(w, '/home/hero');
    if (!home.children['lab']) {
      home.children['lab'] = CLIQ.dir({
        'potions.txt': CLIQ.file('healing 12 gold\nmana 8 silver\nhaste 20 gold\ninvisibility 45 platinum\n'),
        'recipe.txt': CLIQ.file('transmute lead into lead\nstir the lead thrice\n'),
      });
    }
  }

  CLIQ.modules.push({
    id: 'ops',
    icon: '⚗️',
    title: "The Alchemist's Lab",
    tagline: 'processes, disks, awk/sed alchemy, and cron rites',
    quests: [
      {
        id: 'ops-1',
        title: 'Seeing the Unseen',
        story:
          'Every running program is a <b>process</b> with a numbered soul — its <b>PID</b>. ' +
          'The Lab\'s first lesson: see them. <code>ps</code> lists them; <code>top</code> ranks them by hunger (CPU).',
        outro: 'The invisible machinery of the machine is visible to you.',
        setup(w) { ensureLab(w); w.cwd = w.home; },
        tasks: [
          {
            text: 'Reveal the processes: <code>ps aux</code>.',
            hint: 'Type: <code>ps aux</code>',
            check: (e) => e.cmd === 'ps' && e.out.includes('nginx'),
          },
          {
            text: 'Rank them by appetite: <code>top</code>.',
            hint: 'Type: <code>top</code>',
            check: (e) => e.cmd === 'top' && e.out.includes('load average'),
            success: 'Load average ≈ how many processes are running or waiting to run (on Linux it also counts those stuck in disk I/O). Under your core count = healthy.',
          },
          {
            text: 'Hunt a specific one with a pipe: <code>ps aux | grep postgres</code>.',
            hint: 'Type: <code>ps aux | grep postgres</code>',
            check: (e) => e.raw.includes('|') && e.out.includes('postgres'),
          },
          {
            quiz: {
              question: 'What is a <b>PID</b>?',
              choices: [
                'The unique id number of a running process — how you name it to commands like kill',
                'The program\'s version number',
                'The port a program listens on',
                'The user who started the program',
              ],
              answer: 0,
              explain: 'Every process gets a PID at birth. PID 1 is init/systemd — the ancestor of all.',
            },
            text: 'The alchemist asks:',
          },
        ],
      },
      {
        id: 'ops-2',
        title: "The Slayer's Writ",
        story:
          'Sometimes a process hangs — deaf to reason, holding resources hostage. The writ of last resort is ' +
          '<code>kill</code>. Plain <code>kill</code> sends SIGTERM ("please shut down cleanly"); ' +
          '<code>kill -9</code> sends SIGKILL — no cleanup, no appeal.',
        outro: 'Wield the writ with care. SIGTERM first, always.',
        setup(w) {
          ensureLab(w);
          if (!w.procs.find((p) => p.pid === 4242))
            w.procs.push({ pid: 4242, user: 'hero', cpu: 0.0, mem: 1.2, cmd: 'stuck_job --hanging-since-tuesday' });
        },
        tasks: [
          {
            text: 'A job has hung since Tuesday. Find it: <code>ps aux | grep stuck_job</code>.',
            hint: 'Type: <code>ps aux | grep stuck_job</code>',
            check: (e) => e.out.includes('stuck_job'),
            success: 'PID 4242. Mark it well.',
          },
          {
            text: 'Serve the writ: <code>kill 4242</code>.',
            hint: 'Type: <code>kill 4242</code>',
            check: (e) => e.cmd === 'kill' && !e.world.procs.find((p) => p.pid === 4242),
          },
          {
            text: 'Confirm the deed: <code>ps aux | grep stuck_job</code> — nothing should answer.',
            hint: 'Type: <code>ps aux | grep stuck_job</code>',
            check: (e) => e.raw.includes('grep') && e.raw.includes('stuck_job') && !e.out.includes('stuck_job'),
          },
          {
            quiz: {
              question: 'Why try plain <code>kill</code> (SIGTERM) before <code>kill -9</code> (SIGKILL)?',
              choices: [
                'SIGTERM lets the process save state and clean up; SIGKILL gives no chance and can leave corruption',
                'kill -9 is slower',
                'SIGKILL only works on Sundays',
                'There is no difference at all',
              ],
              answer: 0,
              explain: 'Ask politely, then insist. -9 is for processes that ignore the polite request.',
            },
            text: 'The slayer\'s oath:',
          },
        ],
      },
      {
        id: 'ops-3',
        title: 'The Overflowing Vault',
        story:
          '"Disk full" has killed more servers than any dragon. Two measuring spells: ' +
          '<code>df</code> (disk free) shows each filesystem\'s fullness; ' +
          '<code>du</code> (disk usage) weighs a specific directory. df tells you THAT it\'s full; du tells you WHAT filled it.',
        outro: 'You measure before you clean, and clean before you crash.',
        setup(w) { ensureLab(w); w.cwd = w.home; },
        tasks: [
          {
            text: 'Check the vault levels: <code>df -h</code> (-h = human-readable sizes).',
            hint: 'Type: <code>df -h</code>',
            check: (e) => e.cmd === 'df' && e.out.includes('Filesystem'),
          },
          {
            text: 'Weigh your lab: <code>du -sh lab</code>.',
            hint: 'Type: <code>du -sh lab</code> (-s = summary, -h = human)',
            check: (e) => e.cmd === 'du' && e.ok,
          },
          {
            quiz: {
              question: 'df says 95% full. What is the right NEXT step?',
              choices: [
                'Use du on suspect directories (like /var/log) to find WHAT is eating the space',
                'Immediately delete random files until it fits',
                'Reboot — disk space returns on restart',
                'Buy a new server',
              ],
              answer: 0,
              explain: 'df → du → decide. Usually the culprit is logs, caches, or old artifacts. Never delete blind.',
            },
            text: 'The vault-keeper asks:',
          },
        ],
      },
      {
        id: 'ops-4',
        title: 'Text Alchemy',
        story:
          'The Lab\'s twin transmuters: <code>awk</code> slices text into <b>fields</b> ' +
          '($1, $2... split on whitespace) and <code>sed</code> rewrites streams with ' +
          '<code>s/old/new/g</code>. Together with grep, they process logs faster than any spreadsheet.',
        outro: 'Raw text becomes refined data at your touch.',
        setup(w) { ensureLab(w); w.cwd = w.home; },
        tasks: [
          {
            text: 'The potion ledger has columns: name, price, currency. Extract just the names: <code>awk \'{print $1}\' lab/potions.txt</code>.',
            hint: "Type: <code>awk '{print $1}' lab/potions.txt</code>",
            check: (e) => e.cmd === 'awk' && e.out.includes('healing') && !e.out.includes('gold'),
          },
          {
            text: 'Now names AND currencies (fields 1 and 3): <code>awk \'{print $1, $3}\' lab/potions.txt</code>.',
            hint: "Type: <code>awk '{print $1, $3}' lab/potions.txt</code>",
            check: (e) => e.cmd === 'awk' && e.out.includes('healing gold'),
          },
          {
            text: 'A recipe was written with a typo — it calls for lead! Transmute it: <code>sed \'s/lead/gold/g\' lab/recipe.txt</code>.',
            hint: "Type: <code>sed 's/lead/gold/g' lab/recipe.txt</code>",
            check: (e) => e.cmd === 'sed' && e.out.includes('transmute gold into gold'),
            success: 'The /g flag transmuted EVERY lead on each line, not just the first.',
          },
          {
            quiz: {
              question: 'In awk, what is <code>$0</code>?',
              choices: [
                'The entire line (while $1, $2... are its fields)',
                'The first field',
                'The line number',
                'An error',
              ],
              answer: 0,
              explain: '$0 = whole line, $1..$N = fields, NF = number of fields. That vocabulary covers 90% of daily awk.',
            },
            text: 'The transmuter asks:',
          },
        ],
      },
      {
        id: 'ops-5',
        title: "The Keeper's Rites",
        story:
          'Two rites keep enterprise systems alive at 3 AM: <b>archives</b> (<code>tar</code> bundles ' +
          'directories into a single compressed file) and <b>cron</b> (the clockwork daemon that runs ' +
          'commands on schedule: <code>minute hour day month weekday</code>).',
        outro: 'Your systems will survive the night without you. That is the point.',
        setup(w) { ensureLab(w); w.cwd = w.home; },
        tasks: [
          {
            text: 'Bundle the lab into an archive: <code>tar -czf backup.tar.gz lab</code> (c=create, z=compress, f=filename).',
            hint: 'Type: <code>tar -czf backup.tar.gz lab</code>',
            check: (e) => !!N(e.world, '/home/hero/backup.tar.gz'),
          },
          {
            text: 'Trust, but verify — list what the archive holds: <code>tar -tzf backup.tar.gz</code>.',
            hint: 'Type: <code>tar -tzf backup.tar.gz</code> (t=table of contents)',
            check: (e) => e.cmd === 'tar' && e.out.includes('lab'),
          },
          {
            text: 'Inspect the clockwork daemon\'s orders: <code>crontab -l</code>.',
            hint: 'Type: <code>crontab -l</code>',
            check: (e) => e.cmd === 'crontab' && e.out.includes('backup.sh'),
          },
          {
            quiz: {
              question: 'The crontab reads <code>30 2 * * *  backup.sh</code>. When does it run?',
              choices: [
                'Every day at 02:30',
                'Every 30 minutes past 2 days',
                'On the 30th of February',
                'Twice at 2:30 and 3:00',
              ],
              answer: 0,
              explain: 'Fields: minute(30) hour(2) day(*) month(*) weekday(*) — daily at 02:30.',
            },
            text: 'The keeper asks:',
          },
          {
            quiz: {
              question: 'The keeper\'s hardest lesson: when is a backup REAL?',
              choices: [
                'Only after you have tested restoring from it',
                'As soon as tar exits with code 0',
                'When the file is larger than 1MB',
                'When it is stored on the same disk',
              ],
              answer: 0,
              explain: 'An untested backup is a hope, not a backup. Restore drills are the rite that matters.',
            },
            text: 'And the final rite:',
          },
        ],
      },
      {
        id: 'ops-boss',
        title: 'The Runaway Daemon',
        boss: true,
        story:
          '🔥 The Lab\'s server crawls — every spell takes seconds, and the disk gauge glows red. ' +
          'Somewhere a <b>Runaway Daemon</b> devours CPU and vomits garbage into the logs. ' +
          'This is a classic 3 AM page. Work it calmly: <b>find the hog, slay it, find what filled the disk, clean it, verify.</b> ' +
          '<br><br>⚠️ <i>Wrong answers cost a heart.</i>',
        outro: 'CPU idle, disk breathing, logs quiet. Go back to sleep, hero — the pager is silent. 🏆',
        setup(w) {
          ensureLab(w);
          w.cwd = w.home;
          if (!w.procs.find((p) => p.pid === 1337))
            w.procs.push({ pid: 1337, user: 'root', cpu: 97.3, mem: 22.5, cmd: 'chaosd --devour-everything' });
          const log = N(w, '/var/log');
          if (log && !log.children['chaos.dump']) log.children['chaos.dump'] = CLIQ.file('CHAOS'.repeat(2000));
        },
        tasks: [
          {
            text: 'The machine crawls. Find the CPU glutton.',
            hint: 'Type: <code>top</code> (or <code>ps aux</code>) and read the top of the list',
            check: (e) => (e.cmd === 'top' || e.cmd === 'ps') && e.out.includes('chaosd'),
            success: 'chaosd — PID 1337 — 97.3% CPU. There is your daemon.',
          },
          {
            quiz: {
              question: 'The Daemon shrieks: "You would not DARE!" What is the correct first strike?',
              choices: [
                'kill 1337 — polite SIGTERM first; escalate to -9 only if it ignores you',
                'kill -9 1 — take out the ancestor',
                'Reboot the whole server immediately',
                'Wait for it to finish devouring',
              ],
              answer: 0,
              explain: 'Target the culprit PID, politely first. (Never aim at PID 1 — that is init; the kernel refuses to SIGKILL it anyway.)',
              explainWrong: 'Never strike PID 1, and never reboot before diagnosing. Target the culprit.',
            },
            text: 'The Daemon\'s challenge:',
          },
          {
            text: 'Strike it down.',
            hint: 'Type: <code>kill 1337</code>',
            check: (e) => e.cmd === 'kill' && !e.world.procs.find((p) => p.pid === 1337),
            success: 'The Daemon\'s process dissolves. But the disk still groans...',
          },
          {
            text: 'Check the damage to the vaults.',
            hint: 'Type: <code>df -h</code>',
            check: (e) => e.cmd === 'df' && e.out.includes('92%'),
            success: '92% full! The daemon dumped something huge. Hunt in /var/log.',
          },
          {
            text: 'Find and destroy its dump (look in <code>/var/log</code>, weigh things with du or ls -l, then remove the culprit).',
            hint: 'Type: <code>ls -l /var/log</code> then <code>rm /var/log/chaos.dump</code>',
            check: (e) => e.cmd === 'rm' && !N(e.world, '/var/log/chaos.dump'),
          },
          {
            text: 'Verify the vault breathes again.',
            hint: 'Type: <code>df -h</code>',
            check: (e) => e.cmd === 'df' && e.out.includes('41%'),
            success: '41% — healthy. Evidence beats hope.',
          },
          {
            quiz: {
              question: 'FINAL BLOW — to catch this daemon automatically next time, you schedule a nightly cleanup at 02:30. Which crontab line?',
              choices: [
                '30 2 * * * /usr/local/bin/cleanup.sh',
                '2 30 * * * /usr/local/bin/cleanup.sh',
                '* * 2 30 * /usr/local/bin/cleanup.sh',
                '02:30 daily /usr/local/bin/cleanup.sh',
              ],
              answer: 0,
              explain: 'minute hour day month weekday → 30 2 * * *. The Daemon is banished by clockwork!',
              explainWrong: 'Cron fields are: minute FIRST, then hour. Re-read the writ.',
            },
            text: 'The Daemon\'s ashes whisper:',
          },
        ],
      },
    ],
  });
})();
