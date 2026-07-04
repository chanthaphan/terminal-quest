/* Terminal Quest — Realm 7: The Container Foundry (docker) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  function ctr(w, name) {
    return w.docker.containers.find((c) => c.name === name);
  }

  function ensureContainer(w, name, image, opts) {
    if (ctr(w, name)) return;
    w.docker.serial++;
    if (!w.docker.images.find((im) => im.repo === image.split(':')[0])) {
      w.docker.images.push({ repo: image.split(':')[0], tag: image.split(':')[1] || 'latest', size: '95MB', id: 'c0ffee' + w.docker.serial });
    }
    w.docker.containers.push(Object.assign({
      id: 'c0ffee10' + (1000 + w.docker.serial * 7).toString(16),
      name, image, status: 'Up 2 hours', hostPort: null, ctrPort: null,
      logs: `[${image}] started\n`,
    }, opts || {}));
  }

  CLIQ.modules.push({
    id: 'docker',
    icon: '🐳',
    title: 'The Container Foundry',
    tagline: 'summon containers: docker run, ps, logs, build',
    quests: [
      {
        id: 'docker-1',
        title: 'First Summoning',
        story:
          'In the Foundry, software ships as <b>images</b> — sealed molds holding an app and everything it needs. ' +
          'Pour an image into the furnace and out steps a <b>container</b>: a living, isolated instance. ' +
          'One mold, as many golems as you like.',
        outro: 'Your first golem breathes. The Foundry hums.',
        setup(w) { w.docker = { images: [], containers: [], serial: 0 }; },
        tasks: [
          {
            text: 'Fetch the nginx mold from the registry: <code>docker pull nginx</code>.',
            hint: 'Type: <code>docker pull nginx</code>',
            check: (e) => e.world.docker.images.some((im) => im.repo === 'nginx'),
          },
          {
            text: 'Inspect your molds: <code>docker images</code>.',
            hint: 'Type: <code>docker images</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('images') && e.out.includes('nginx'),
          },
          {
            text: 'Bring one to life, detached and named: <code>docker run -d --name web nginx</code>.',
            hint: 'Type: <code>docker run -d --name web nginx</code> (-d = run in background)',
            check: (e) => { const c = ctr(e.world, 'web'); return c && c.status.startsWith('Up'); },
            success: 'It answered with a container id — the golem\'s true name.',
          },
          {
            text: 'See it standing: <code>docker ps</code>.',
            hint: 'Type: <code>docker ps</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('ps') && e.out.includes('web'),
          },
          {
            quiz: {
              question: 'Image vs container — which is true?',
              choices: [
                'An image is the immutable template; a container is a running instance of it',
                'They are two words for the same thing',
                'Containers are templates; images run',
                'Images only exist in the cloud',
              ],
              answer: 0,
              explain: 'Like class vs object, or mold vs golem. Many containers can run from one image.',
            },
            text: 'The Foundry master asks:',
          },
        ],
      },
      {
        id: 'docker-2',
        title: 'Lifecycle of Golems',
        story:
          'Golems are cheap and disposable — that is their power. Stop them, start them, destroy them ' +
          'without ceremony. But know your rolls: <code>docker ps</code> shows only the <i>living</i>; ' +
          'add <code>-a</code> to see the fallen too.',
        outro: 'Start, stop, remove — the lifecycle bows to you.',
        setup(w) { ensureContainer(w, 'web', 'nginx:latest'); },
        tasks: [
          {
            text: 'Put the web golem to sleep: <code>docker stop web</code>.',
            hint: 'Type: <code>docker stop web</code>',
            check: (e) => { const c = ctr(e.world, 'web'); return c && c.status.startsWith('Exited'); },
          },
          {
            text: 'Now <code>docker ps</code> — it has vanished from the living!',
            hint: 'Type: <code>docker ps</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('ps') && !e.argv.includes('-a') && !e.out.includes('web'),
          },
          {
            text: 'Reveal the fallen as well: <code>docker ps -a</code>.',
            hint: 'Type: <code>docker ps -a</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('-a') && e.out.includes('Exited'),
            success: 'There it lies: Exited (0). Stopped, not gone.',
          },
          {
            text: 'Wake it again: <code>docker start web</code>.',
            hint: 'Type: <code>docker start web</code>',
            check: (e) => { const c = ctr(e.world, 'web'); return c && c.status.startsWith('Up'); },
          },
          {
            quiz: {
              question: 'What is the difference between <code>docker stop</code> and <code>docker rm</code>?',
              choices: [
                'stop halts the container but keeps it (restartable); rm deletes it entirely',
                'They are identical',
                'rm is just a faster stop',
                'stop deletes the image too',
              ],
              answer: 0,
              explain: 'stop = pause the golem. rm = melt it down. (And rm refuses while it runs, unless you force with -f.)',
            },
            text: 'The lifecycle keeper asks:',
          },
        ],
      },
      {
        id: 'docker-3',
        title: 'Whispers in the Furnace',
        story:
          'A container is a sealed box — so how do you debug one? Two spells: ' +
          '<code>docker logs</code> replays everything the app printed, and ' +
          '<code>docker exec</code> reaches <i>inside</i> the running box to run a command there.',
        outro: 'No box is sealed to you now.',
        setup(w) { w.docker.serial = w.docker.serial || 0; },
        tasks: [
          {
            text: 'Summon a chatty golem: <code>docker run -d --name whisper quest/echo</code>.',
            hint: 'Type: <code>docker run -d --name whisper quest/echo</code>',
            check: (e) => { const c = ctr(e.world, 'whisper'); return c && c.status.startsWith('Up'); },
          },
          {
            text: 'Hear what it has been saying: <code>docker logs whisper</code>.',
            hint: 'Type: <code>docker logs whisper</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('logs') && e.out.includes('Foundry hears'),
          },
          {
            text: 'Reach inside it: <code>docker exec whisper hostname</code>.',
            hint: 'Type: <code>docker exec whisper hostname</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('exec') && e.ok,
            success: 'The container\'s hostname IS its id — you were truly inside.',
          },
          {
            quiz: {
              question: 'How is <code>docker exec</code> different from <code>ssh</code>?',
              choices: [
                'exec enters a container on THIS machine via the docker daemon; ssh crosses the network to another machine',
                'They are the same protocol',
                'exec is ssh but encrypted twice',
                'ssh only works inside containers',
              ],
              answer: 0,
              explain: 'Same feeling — a shell somewhere else — different doors. exec needs no network or sshd in the container.',
            },
            text: 'A whisper from the furnace:',
          },
        ],
      },
      {
        id: 'docker-4',
        title: 'The Forge of Molds',
        story:
          'Pulling other wizards\' molds is fine — but a true Foundry master <b>forges their own</b>. ' +
          'A <code>Dockerfile</code> is the recipe: each instruction adds a <b>layer</b>, and unchanged layers ' +
          'are cached, making rebuilds lightning fast.',
        outro: 'You forge your own molds now. The Foundry recognizes a master.',
        setup(w) {
          w.cwd = w.home;
          const home = N(w, '/home/hero');
          if (!home.children['foundry']) {
            home.children['foundry'] = CLIQ.dir({
              'Dockerfile': CLIQ.file('FROM alpine:3.20\nCOPY spell.txt /spell.txt\nCMD ["cat", "/spell.txt"]\n'),
              'spell.txt': CLIQ.file('By layer and cache, I conjure thee!\n'),
            });
          }
        },
        tasks: [
          {
            text: 'A recipe waits in <code>foundry/</code>. Read it: <code>cat foundry/Dockerfile</code>.',
            hint: 'Type: <code>cat foundry/Dockerfile</code>',
            check: (e) => e.cmd === 'cat' && e.out.includes('FROM'),
            success: 'FROM = the base mold. COPY adds your files. CMD is what runs at birth.',
          },
          {
            text: 'Forge it: <code>docker build -t spellbook:1.0 foundry</code>.',
            hint: 'Type: <code>docker build -t spellbook:1.0 foundry</code> (-t names the mold)',
            check: (e) => e.world.docker.images.some((im) => im.repo === 'spellbook'),
          },
          {
            text: 'Admire your mold among the others: <code>docker images</code>.',
            hint: 'Type: <code>docker images</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('images') && e.out.includes('spellbook'),
          },
          {
            text: 'Give it life and hear it speak: <code>docker run --name reader spellbook:1.0</code>.',
            hint: 'Type: <code>docker run --name reader spellbook:1.0</code>',
            check: (e) => e.cmd === 'docker' && e.out.includes('conjure'),
            success: 'It ran its CMD, spoke the spell, and finished. Not every container is a server.',
          },
          {
            quiz: {
              question: 'Why do Dockerfiles put rarely-changing steps (like installing dependencies) BEFORE the app code COPY?',
              choices: [
                'Layer caching: unchanged early layers are reused, so rebuilds only redo the code layer',
                'Alphabetical order is required',
                'Later layers run faster at runtime',
                'It makes the image smaller by law',
              ],
              answer: 0,
              explain: 'Order = cache strategy. Change one code file and only the last layers rebuild — seconds instead of minutes.',
            },
            text: 'The forge master asks:',
          },
        ],
      },
      {
        id: 'docker-5',
        title: 'Gates of the Foundry',
        story:
          'A container has its own private network — its port 80 is <i>not</i> your port 80. ' +
          'To let the outside world in, you <b>publish</b> a port: <code>-p 8080:80</code> means ' +
          '"my machine\'s gate 8080 leads to the container\'s gate 80".',
        outro: 'The gates align. The Image Golem stirs in the deep...',
        setup(w) {
          const p = ctr(w, 'portal');
          if (p) { w.docker.containers.splice(w.docker.containers.indexOf(p), 1); }
        },
        tasks: [
          {
            text: 'Summon a web golem with its gate published: <code>docker run -d --name portal -p 8080:80 nginx</code>.',
            hint: 'Type: <code>docker run -d --name portal -p 8080:80 nginx</code>',
            check: (e) => { const c = ctr(e.world, 'portal'); return c && c.status.startsWith('Up') && c.hostPort === 8080; },
          },
          {
            text: 'Knock on your own gate 8080: <code>curl localhost:8080</code>.',
            hint: 'Type: <code>curl localhost:8080</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('Welcome to nginx'),
            success: 'Your machine\'s 8080 → container\'s 80. The tunnel works.',
          },
          {
            text: 'See the mapping in the muster roll: <code>docker ps</code>.',
            hint: 'Type: <code>docker ps</code> — look at the PORTS column',
            check: (e) => e.cmd === 'docker' && e.argv.includes('ps') && e.out.includes('8080->80'),
          },
          {
            quiz: {
              question: 'In <code>-p 8080:80</code>, which side is which?',
              choices: [
                'HOST port 8080 : CONTAINER port 80',
                'CONTAINER port 8080 : HOST port 80',
                'Both numbers must always match',
                'The first number is the number of replicas',
              ],
              answer: 0,
              explain: 'host:container, always. Mnemonic: you stand outside (host side comes first).',
            },
            text: 'The gatekeeper asks:',
          },
        ],
      },
      {
        id: 'docker-boss',
        title: 'The Image Golem',
        boss: true,
        story:
          '🗿 The Foundry shakes! The <b>Image Golem</b> — a botched summoning — lies collapsed in the corner, ' +
          'and the Quest Portal it should serve is dark. It was run with the wrong incantation. ' +
          'Diagnose it the professional way: <b>find the corpse, read its last words, clear it, resummon it correctly, prove it lives.</b> ' +
          '<br><br>⚠️ <i>Wrong answers cost a heart.</i>',
        outro: 'The Golem stands tall, serving on gate 8080. The Foundry is yours. 🏆',
        setup(w) {
          const g = ctr(w, 'golem');
          if (g) w.docker.containers.splice(w.docker.containers.indexOf(g), 1);
          const portal = ctr(w, 'portal'); // free host port 8080 for the battle
          if (portal && portal.status.startsWith('Up')) portal.status = 'Exited (0) 1 minute ago';
          if (!w.docker.images.find((im) => im.repo === 'quest/portal')) {
            w.docker.serial++;
            w.docker.images.push({ repo: 'quest/portal', tag: '2.0', size: '95MB', id: 'c0ffeeb0' + w.docker.serial });
          }
          w.docker.serial++;
          w.docker.containers.push({
            id: 'c0ffeedead' + w.docker.serial, name: 'golem', image: 'quest/portal:2.0',
            status: 'Exited (1) 5 minutes ago', hostPort: null, ctrPort: null,
            logs: 'Starting Quest Portal...\nFATAL: port 80 must be published to a host port (run with -p HOST:80)\nprocess exited with code 1\n',
          });
        },
        tasks: [
          {
            text: 'Something died here. Find the fallen container.',
            hint: 'Type: <code>docker ps -a</code> — the living-only roll won\'t show it',
            check: (e) => e.cmd === 'docker' && e.argv.includes('-a') && e.out.includes('Exited (1)'),
            success: 'golem — Exited (1). Exit code 1 means it died screaming.',
          },
          {
            text: 'Read its last words.',
            hint: 'Type: <code>docker logs golem</code>',
            check: (e) => e.cmd === 'docker' && e.argv.includes('logs') && e.out.includes('FATAL'),
            success: 'FATAL: port 80 must be published. The summoner forgot -p!',
          },
          {
            quiz: {
              question: 'The Golem rumbles: "What does my exit code (1) MEAN?"',
              choices: [
                'The process ended with an error — 0 means success, non-zero means failure',
                'It ran for exactly 1 second',
                'It is version 1',
                'One user was connected',
              ],
              answer: 0,
              explain: 'Unix exit codes: 0 = clean, anything else = trouble. Exited (0) after docker stop is normal; Exited (1) is a crash.',
              explainWrong: 'Think of every command you have run — what did code 0 mean in this very terminal?',
            },
            text: 'The Golem\'s riddle:',
          },
          {
            text: 'Clear the wreckage — remove the dead container (its name must be freed).',
            hint: 'Type: <code>docker rm golem</code>',
            check: (e) => e.cmd === 'docker' && !ctr(e.world, 'golem'),
          },
          {
            text: 'Resummon it CORRECTLY: detached, named golem, gate 8080 leading to its port 80, from image <code>quest/portal:2.0</code>.',
            hint: 'Type: <code>docker run -d --name golem -p 8080:80 quest/portal:2.0</code>',
            check: (e) => { const c = ctr(e.world, 'golem'); return c && c.status.startsWith('Up') && c.hostPort === 8080; },
            success: 'It stands! The furnace light turns green.',
          },
          {
            text: 'Never trust — verify. Prove the Portal serves.',
            hint: 'Type: <code>curl localhost:8080</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('Quest Portal Online'),
            success: 'Quest Portal Online. Incident closed with evidence.',
          },
          {
            quiz: {
              question: 'FINAL BLOW — a junior asks how you fixed it so fast. Your honest answer:',
              choices: [
                'ps -a to find it, logs to learn why, rm + run with the right flags, curl to verify',
                'I restarted Docker until it worked',
                'I deleted all images and started over',
                'Containers fix themselves eventually',
              ],
              answer: 0,
              explain: 'Observe → diagnose → fix → verify. The Golem kneels before the method!',
            },
            text: 'The Golem cracks:',
          },
        ],
      },
    ],
  });
})();
