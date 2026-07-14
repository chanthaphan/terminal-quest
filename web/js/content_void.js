/* Terminal Quest — Realm 10: The Void Gate (post-game superboss: every skill, one incident) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  CLIQ.modules.push({
    id: 'void',
    icon: '🌀',
    title: 'The Void Gate',
    tagline: 'the superboss: one cascading outage, every skill, hints cost hearts',
    requires: ['final-boss'],
    quests: [
      {
        id: 'void-boss',
        title: 'The Amalgam',
        boss: true,
        hardcore: true,
        story:
          '🌀 Beyond the Void Gate, the spirits of all nine bosses have fused into one horror: <b>THE AMALGAM</b>. ' +
          'It has struck every system you guard <i>at once</i> — names, servers, databases, clusters, containers, disks. ' +
          'This is the cascading outage of legend. Work the layers. Trust your training. ' +
          '<br><br>⚠️ <i>VOID RULES: wrong answers cost a heart — and in this dungeon, <b>every hint costs a heart too</b>. ' +
          'Lose all three and the whole incident resets.</i>',
        outro: 'The Amalgam shatters into nine fading echoes. Every system hums. You are the Legend of the Nine Realms. 🌀👑',
        certificate: false,
        setup(w) {
          w.cwd = w.home;
          w.azure.loggedIn = true;
          w.kubeConnected = true;
          // 1) names broken
          delete w.net.dns['quest.dev'];
          delete w.net.dns['www.quest.dev'];
          const hosts = N(w, '/etc/hosts');
          if (hosts) hosts.content = '127.0.0.1 localhost\n10.0.1.10 web-01\n10.0.2.5 db-01\n';
          // 2) web + db services down
          w.net.hosts['web-01'].services.nginx = 'stopped';
          w.net.hosts['db-01'].services.postgres = 'stopped';
          // 3) shop payment poisoned
          const shop = w.k8s.namespaces.shop;
          const d = shop.deployments.payment;
          if (d) {
            d.image = 'shop-payment:2.0-void';
            d.broken = true;
            shop.pods.filter((p) => p.deploy === 'payment').forEach((p) => { p.status = 'CrashLoopBackOff'; p.image = d.image; p.restarts = 6; });
          }
          // 4) runaway daemon + disk bomb
          if (!w.procs.find((p) => p.pid === 6666))
            w.procs.push({ pid: 6666, user: 'root', cpu: 98.6, mem: 31.2, cmd: 'voidspawn --consume-all' });
          const log = N(w, '/var/log');
          if (log) log.children['chaos.dump'] = CLIQ.file('VOID'.repeat(2500));
          // 5) dead container blocking port 8080
          w.docker.containers.filter((c) => c.hostPort === 8080).forEach((c) => { if (c.status.startsWith('Up')) c.status = 'Exited (0) 1 hour ago'; });
          const vg = w.docker.containers.find((c) => c.name === 'void-portal');
          if (vg) w.docker.containers.splice(w.docker.containers.indexOf(vg), 1);
          if (!w.docker.images.find((im) => im.repo === 'quest/portal')) {
            w.docker.serial++;
            w.docker.images.push({ repo: 'quest/portal', tag: '2.0', size: '95MB', id: 'c0ffee66' + w.docker.serial });
          }
          w.docker.serial++;
          w.docker.containers.push({
            id: 'c0ffee0666' + w.docker.serial, name: 'void-portal', image: 'quest/portal:2.0',
            status: 'Exited (1) 66 minutes ago', hostPort: null, ctrPort: null,
            logs: 'Starting Quest Portal...\nFATAL: PORTAL_KEY is not set — the portal cannot start (run with -e PORTAL_KEY=<key>)\nprocess exited with code 1\n',
          });
          // 6) war room for the runbook
          const home = N(w, '/home/hero');
          home.children['warroom'] = CLIQ.dir({});
          w.git = CLIQ.buildGit();
        },
        tasks: [
          {
            quiz: {
              question: 'Every alarm is screaming at once. What is the FIRST move of an incident commander?',
              choices: [
                'Verify one concrete symptom yourself, then work the layers from the bottom',
                'Reboot everything simultaneously',
                'Announce it is fixed and hope',
                'Start with whichever system you like most',
              ],
              answer: 0,
              explain: 'One verified symptom beats ten rumors. Layers: name → host → port → service.',
              explainWrong: 'Panic is the Amalgam\'s weapon. What did every boss teach you about the FIRST step?',
            },
            text: 'The Amalgam speaks with nine voices at once:',
          },
          {
            text: '<b>[NAMES]</b> Verify the public symptom: fetch <code>http://quest.dev</code> and read the error carefully.',
            hint: 'Type: <code>curl http://quest.dev</code>',
            check: (e) => e.cmd === 'curl' && !e.ok && e.out.includes('Could not resolve'),
            success: 'Could not resolve host — the NAME layer itself is severed.',
          },
          {
            text: 'Confirm DNS is truly dead: query the name tersely.',
            hint: 'Type: <code>dig +short quest.dev</code>',
            check: (e) => (e.cmd === 'dig' || e.cmd === 'nslookup') && e.raw.includes('quest.dev') && !e.out.includes('203.0.113.10'),
            success: 'Silence. The zone record is gone.',
          },
          {
            text: 'You cannot rebuild the DNS zone from here — but you CAN override locally. Append an emergency entry mapping <code>203.0.113.10</code> to <code>quest.dev</code> into <code>/etc/hosts</code>.',
            hint: 'Type: <code>echo "203.0.113.10 quest.dev" &gt;&gt; /etc/hosts</code> — checked before DNS! (On a real system this file is root-owned: you\'d write it with <code>echo "..." | sudo tee -a /etc/hosts</code>, since <code>sudo echo &gt;&gt;</code> redirects in YOUR unprivileged shell.)',
            check: (e) => { const h = N(e.world, '/etc/hosts'); return h && /203\.0\.113\.10\s+quest\.dev/.test(h.content); },
            success: 'The resolver will now find quest.dev locally. (Real fix later: repair the zone — note it for the runbook.)',
          },
          {
            text: 'Prove the override works: fetch <code>http://quest.dev</code> again.',
            hint: 'Type: <code>curl http://quest.dev</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('Welcome to Quest.dev'),
            success: 'The public page lives. One head down — the internal portal still bleeds.',
          },
          {
            text: '<b>[SERVICES]</b> The internal portal is also dark: check <code>http://web-01</code>.',
            hint: 'Type: <code>curl http://web-01</code>',
            check: (e) => e.cmd === 'curl' && !e.ok && e.raw.includes('web-01'),
            success: 'Connection refused — machine up, service down. Go inside.',
          },
          {
            text: 'Enter web-01 and question its guardian.',
            hint: 'Type: <code>ssh hero@web-01</code> then <code>systemctl status nginx</code>',
            check: (e) => e.world.hostname === 'web-01' && e.cmd === 'systemctl' && e.out.includes('failed'),
            success: 'nginx is down. But WHY? A wise hero reads the logs before restarting.',
          },
          {
            text: 'Read nginx\'s dying words in <code>/var/log/nginx-error.log</code>.',
            hint: 'Type: <code>cat /var/log/nginx-error.log</code> (or tail)',
            check: (e) => ['cat', 'head', 'tail', 'grep'].includes(e.cmd) && e.out.includes('5432'),
            success: '"upstream timed out ... 10.0.2.5:5432" — nginx fell because the DATABASE is unreachable. The cascade goes deeper.',
          },
          {
            text: 'Verify the database gate from here: knock on db-01 port 5432.',
            hint: 'Type: <code>nc -zv db-01 5432</code>',
            check: (e) => e.cmd === 'nc' && !e.ok && e.raw.includes('5432'),
            success: 'Refused. The root of this branch: postgres itself is down.',
          },
          {
            text: 'Hop deeper — ssh from web-01 into <code>db-01</code> and raise postgres.',
            hint: 'Type: <code>ssh hero@db-01</code> then <code>systemctl start postgres</code>',
            check: (e) => e.world.net.hosts['db-01'].services.postgres === 'running',
            success: 'The database heart beats again.',
          },
          {
            text: 'Unwind the chain: return to web-01 (<code>exit</code>), revive nginx, and PROVE the portal serves.',
            hint: 'Type: <code>exit</code>, then <code>systemctl restart nginx</code>, then <code>curl http://web-01</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('Quest Portal'),
            success: 'Quest Portal restored, root cause fixed — not just the symptom. Two heads down.',
          },
          {
            text: '<b>[CLUSTER]</b> The shop ward burns again. Diagnose the poisoned deployment — find the evidence in its Events or logs.',
            hint: 'Type: <code>kubectl get pods -n shop</code>, then <code>kubectl describe pod payment-xxxx -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && (e.argv.includes('describe') || e.argv.includes('logs')) && (e.out.includes('Back-off restarting') || e.out.includes('FATAL')),
            success: 'Release "shop-payment:2.0-void" crashes on startup. The Amalgam\'s poison, exposed.',
          },
          {
            text: 'Cure it: the true image is <code>shop-payment:2.1</code>. Roll it out and verify.',
            hint: 'Type: <code>kubectl set image deployment/payment payment=shop-payment:2.1 -n shop</code> then <code>kubectl rollout status deployment/payment -n shop</code>',
            check: (e) => { const d = e.world.k8s.namespaces.shop.deployments.payment; return d && !d.broken && e.cmd === 'kubectl' && ((e.raw.includes('rollout') && e.out.includes('successfully')) || (e.raw.includes('pods') && e.out.includes('Running') && !e.out.includes('CrashLoopBackOff'))); },
            success: 'Payments flow. Three heads down.',
          },
          {
            text: '<b>[SYSTEM]</b> The Lab server chokes — find the CPU glutton and slay it.',
            hint: 'Type: <code>top</code>, spot voidspawn, then <code>kill 6666</code>',
            check: (e) => e.cmd === 'kill' && !e.world.procs.find((p) => p.pid === 6666),
            success: 'voidspawn dissolves. But it left a parting gift on the disk...',
          },
          {
            text: 'The disk gauge glows red. Find what it dumped, destroy it, and verify the disk breathes (41%).',
            hint: 'Type: <code>df -h</code>, <code>ls -l /var/log</code>, <code>rm /var/log/chaos.dump</code>, then <code>df -h</code> again',
            check: (e) => e.cmd === 'df' && e.out.includes('41%') && !N(e.world, '/var/log/chaos.dump'),
            success: 'Four heads down. The Amalgam staggers.',
          },
          {
            text: '<b>[CONTAINERS]</b> A fallen container blocks the foundry. Find it, read its last words, clear it, and resummon it correctly on gate 8080.',
            hint: 'Type: <code>docker ps -a</code>, <code>docker logs void-portal</code>, <code>docker rm void-portal</code>, then <code>docker run -d --name void-portal -p 8080:80 -e PORTAL_KEY=void quest/portal:2.0</code>',
            check: (e) => { const c = e.world.docker.containers.find((x) => x.name === 'void-portal'); return c && c.status.startsWith('Up') && c.hostPort === 8080; },
            success: 'The portal golem stands. Verify with curl localhost:8080 if you wish. Five heads down.',
          },
          {
            text: '<b>[CHRONICLE]</b> A hero documents. Come home first — <code>exit</code> until your prompt says <b>sanctum</b> (always watch your prompt!). Then enter <code>~/warroom</code>, write at least one line of runbook into <code>runbook.md</code>, open a repository, and commit it.',
            hint: 'Type: <code>exit</code> (until the prompt says sanctum), then <code>cd ~/warroom</code>, <code>echo "hosts override + db restart + image fix" &gt; runbook.md</code>, <code>git init</code>, <code>git add .</code>, <code>git commit -m "incident runbook"</code>',
            check: (e) => {
              if (e.world.hostname !== 'sanctum') return false;
              const g = e.world.git;
              const rb = N(e.world, '/home/hero/warroom/runbook.md');
              return rb && rb.content.trim().length > 0 && g.initialized && g.root && g.root.endsWith('/warroom') && g.branches.main && g.branches.main.length >= 1;
            },
            success: 'The runbook is history now — the next hero will not fight blind.',
          },
          {
            text: '<b>[CLOUD]</b> Preserve the evidence: claim a resource group <code>postmortem-rg</code> in <code>southeastasia</code> to host the incident archive.',
            hint: 'Type: <code>az group create --name postmortem-rg --location southeastasia</code>',
            check: (e) => !!e.world.azure.groups['postmortem-rg'],
            success: 'The archive has a home. The Amalgam is unraveling!',
          },
          {
            quiz: {
              question: 'FINAL BLOW — the postmortem meeting. What belongs in it?',
              choices: [
                'A blameless timeline, the root causes, and action items — like fixing the real DNS zone',
                'A list of who to blame, ranked by seniority',
                'Nothing; if it works now, move on',
                'Only the parts that make the team look good',
              ],
              answer: 0,
              explain: 'Blameless truth turns one outage into permanent armor. The Amalgam detonates into nine dying echoes — LEGEND!',
              explainWrong: 'The Amalgam FEEDS on blame and forgetting. What makes an incident never happen twice?',
            },
            text: 'The Amalgam\'s nine voices falter into one whisper:',
          },
        ],
      },
    ],
  });
})();
