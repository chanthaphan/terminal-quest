/* Terminal Quest — Realm 9: The Archmage Trial (final certification gauntlet) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  CLIQ.modules.push({
    id: 'final',
    icon: '👑',
    title: 'The Archmage Trial',
    tagline: 'one gauntlet, every realm — earn your certificate',
    requires: ['bash-boss', 'net-boss', 'con-boss', 'az-boss', 'k8s-boss', 'git-boss', 'docker-boss', 'ops-boss'],
    quests: [
      {
        id: 'final-boss',
        title: 'The Archlich of Legacy Systems',
        boss: true,
        certificate: true,
        story:
          '💀 Atop the highest tower waits the <b>Archlich of Legacy Systems</b> — keeper of every undocumented server, ' +
          'every 2 AM outage, every "it works on my machine". It has devoured a thousand juniors. ' +
          'It cannot devour you: you carry eight realms\' worth of scars. ' +
          'The Trial sweeps ALL your arts — shell, pipes, DNS, ports, cloud, cluster, chronicle, foundry, and lab. ' +
          '<br><br>⚠️ <i>Wrong answers cost a heart. Fall, and the Trial restarts. Win, and be certified <b>Cloud Archmage</b>.</i>',
        outro: 'The Archlich crumbles into well-documented dust.',
        setup(w) {
          w.cwd = w.home;
          const home = N(w, '/home/hero');
          home.children['trial'] = CLIQ.dir({
            'antechamber': CLIQ.dir({ 'note.txt': CLIQ.file('The sigils lie deeper. Only TRUE ones count.\n') }),
            'vault': CLIQ.dir({
              'sigils.txt': CLIQ.file('sigil: FALSE_ASHMARK\nsigil: TRUE_DAWNFIRE\nsigil: FALSE_NULLROOT\nsigil: TRUE_STARFALL\nsigil: FALSE_VOIDLOCK\n'),
            }),
          });
          w.azure.loggedIn = true;
          w.kubeConnected = true;
          w.git = CLIQ.buildGit();
          const d = w.k8s.namespaces.default.deployments.guestbook;
          if (d) d.replicas = 2;
          const tp = w.docker.containers.find((c) => c.name === 'trial-portal');
          if (tp) w.docker.containers.splice(w.docker.containers.indexOf(tp), 1);
        },
        tasks: [
          {
            text: '<b>Trial of the Shell.</b> The Archlich hid its sigils in the trial grounds. Locate <code>sigils.txt</code> somewhere under <code>trial/</code>.',
            hint: 'Type: <code>find trial -name "sigils.txt"</code>',
            check: (e) => e.cmd === 'find' && e.out.includes('sigils.txt'),
          },
          {
            text: '<b>Trial of the Pipe.</b> Count how many sigils are TRUE — one woven chain, one number.',
            hint: 'Type: <code>grep TRUE trial/vault/sigils.txt | wc -l</code>',
            check: (e) => e.raw.includes('|') && e.out.trim() === '2',
            success: 'Two true sigils. The Archlich hisses.',
          },
          {
            quiz: {
              question: 'The Archlich: "Explain your pipe sorcery or perish."',
              choices: [
                'The | feeds the output of one command into the next as input',
                'The | runs both commands at the same time independently',
                'The | saves the output to a file',
                'The | comments out the second command',
              ],
              answer: 0,
              explain: 'Output → input, chained. Small tools, composed.',
            },
            text: 'It speaks in riddles:',
          },
          {
            text: '<b>Trial of Names.</b> Prove the realm\'s name still resolves — tersely.',
            hint: 'Type: <code>dig +short quest.dev</code>',
            check: (e) => e.cmd === 'dig' && e.out.includes('203.0.113.10'),
          },
          {
            text: '<b>Trial of Gates.</b> Knock on quest.dev\'s secure gate (443) and prove it stands open.',
            hint: 'Type: <code>nc -zv quest.dev 443</code>',
            check: (e) => e.cmd === 'nc' && e.out.includes('succeeded'),
          },
          {
            quiz: {
              question: '"A visitor is REFUSED at a gate, though the machine pings. What died?"',
              choices: [
                'The service that should be listening on that port',
                'The DNS record',
                'The visitor\'s keyboard',
                'The entire network',
              ],
              answer: 0,
              explain: 'Ping proves the host; refused proves no listener. You learned this against the Silent Server.',
            },
            text: 'The Archlich tests your scars:',
          },
          {
            text: '<b>Trial of Clouds.</b> Claim a plot for the final battle: resource group <code>trial-rg</code> in <code>southeastasia</code>.',
            hint: 'Type: <code>az group create --name trial-rg --location southeastasia</code>',
            check: (e) => !!e.world.azure.groups['trial-rg'],
          },
          {
            quiz: {
              question: '"Your golems idle at night, yet gold drains. Why?"',
              choices: [
                'Stopped VMs still hold hardware — only deallocation stops compute billing',
                'Azure charges for moonlight',
                'VMs cannot be stopped',
                'Billing is random',
              ],
              answer: 0,
              explain: 'stop ≠ deallocate. The Warden of the Citadel taught you; the Archlich remembers.',
            },
            text: 'It probes your cloud-craft:',
          },
          {
            text: '<b>Trial of the Keep.</b> The guestbook legion must grow to four.',
            hint: 'Type: <code>kubectl scale deployment/guestbook --replicas=4</code>',
            check: (e) => { const d = e.world.k8s.namespaces.default.deployments.guestbook; return d && d.replicas === 4; },
          },
          {
            text: 'Prove the legion stands — four guestbook pods, Running.',
            hint: 'Type: <code>kubectl get pods</code>',
            check: (e) => e.cmd === 'kubectl' && (e.out.match(/guestbook-/g) || []).length >= 4,
          },
          {
            text: '<b>Trial of the Chronicle.</b> History must record this battle: enter <code>trial/</code>, open a repository, and commit everything with a message.',
            hint: 'Type: <code>cd trial</code> then <code>git init</code>, <code>git add .</code>, <code>git commit -m "the trial"</code>',
            check: (e) => {
              const g = e.world.git;
              return g.initialized && g.root && g.root.endsWith('/trial') && g.branches.main && g.branches.main.length >= 1;
            },
            success: 'The Trial is committed to history.',
          },
          {
            text: '<b>Trial of the Foundry.</b> Raise a witness: a detached nginx container named <code>trial-portal</code>, host gate 9090 to its port 80.',
            hint: 'Type: <code>docker run -d --name trial-portal -p 9090:80 nginx</code>',
            check: (e) => {
              const c = e.world.docker.containers.find((x) => x.name === 'trial-portal');
              return c && c.status.startsWith('Up') && c.hostPort === 9090;
            },
          },
          {
            quiz: {
              question: 'FINAL BLOW — the Archlich demands your creed. What IS the way of the Cloud Archmage?',
              choices: [
                'Observe the state, diagnose the cause, change with intent, verify the result',
                'Reboot first, ask questions later',
                'Memorize every command and never read output',
                'Blame the network',
              ],
              answer: 0,
              explain: 'The creed that slew nine bosses. The Archlich of Legacy Systems crumbles — CERTIFIED!',
              explainWrong: 'Think of every boss you have slain. What did every victory have in common?',
            },
            text: 'The Archlich raises its staff for the last exchange:',
          },
        ],
      },
    ],
  });
})();
