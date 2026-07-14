/* Terminal Quest — virtual filesystem, tokenizer, world builder */
(function () {
  const CLIQ = (window.CLIQ = window.CLIQ || { commands: {}, modules: [] });

  function file(content, mode) {
    return { type: 'file', content: content || '', mode: mode == null ? 0o644 : mode };
  }
  function dir(children) {
    return { type: 'dir', children: children || {}, mode: 0o755 };
  }
  CLIQ.file = file;
  CLIQ.dir = dir;

  CLIQ.normalize = function (world, p) {
    if (!p || p === '~') p = world.home;
    if (p.startsWith('~/')) p = world.home + p.slice(1);
    if (!p.startsWith('/')) p = (world.cwd === '/' ? '' : world.cwd) + '/' + p;
    const out = [];
    for (const part of p.split('/')) {
      if (!part || part === '.') continue;
      if (part === '..') out.pop();
      else out.push(part);
    }
    return '/' + out.join('/');
  };

  CLIQ.getNode = function (world, p) {
    const abs = CLIQ.normalize(world, p);
    if (abs === '/') return world.fs;
    let node = world.fs;
    for (const part of abs.split('/').filter(Boolean)) {
      if (!node || node.type !== 'dir') return null;
      node = node.children[part];
    }
    return node || null;
  };

  CLIQ.getParent = function (world, p) {
    const abs = CLIQ.normalize(world, p);
    const parts = abs.split('/').filter(Boolean);
    const name = parts.pop() || '';
    const parent = parts.length ? CLIQ.getNode(world, '/' + parts.join('/')) : world.fs;
    return { parent, name, abs };
  };

  CLIQ.writeFile = function (world, p, content, append) {
    if (CLIQ.normalize(world, p) === '/dev/null') return true; // the abyss accepts everything
    const { parent, name } = CLIQ.getParent(world, p);
    if (!parent || parent.type !== 'dir') return false;
    const existing = parent.children[name];
    if (existing && existing.type === 'dir') return false;
    if (existing && append) existing.content += content;
    else parent.children[name] = file((existing && append ? existing.content : '') + (existing && append ? '' : content));
    if (!append && existing) existing.content = content;
    return true;
  };

  // Tokenizer: handles quotes, |, > and >> — and $VAR expansion (blocked by single quotes, like bash)
  CLIQ.tokenize = function (line, world) {
    const toks = [];
    let cur = '';
    let q = null;
    let has = false;
    const vars = world
      ? {
          USER: world.user, HOME: world.home, HOSTNAME: world.hostname,
          PWD: world.cwd, SHELL: '/bin/bash', PATH: '/usr/local/bin:/usr/bin:/bin',
        }
      : null;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '$' && q !== "'" && vars) {
        const m = line.slice(i + 1).match(/^[A-Za-z_][A-Za-z0-9_]*/);
        if (m) {
          cur += vars[m[0]] != null ? vars[m[0]] : '';
          i += m[0].length;
          continue;
        }
      }
      if (q) {
        if (c === q) q = null;
        else cur += c;
      } else if (c === '"' || c === "'") {
        q = c;
        has = true;
      } else if (c === ' ' || c === '\t') {
        if (cur || has) { toks.push(cur); cur = ''; has = false; }
      } else if (c === '|' || c === '>') {
        if (cur || has) { toks.push(cur); cur = ''; has = false; }
        if (c === '>' && line[i + 1] === '>') { toks.push('>>'); i++; }
        else toks.push(c);
      } else cur += c;
    }
    if (cur || has) toks.push(cur);
    return toks;
  };

  // ---- World builders ----------------------------------------------------

  function buildLocalFs() {
    return dir({
      home: dir({
        hero: dir({
          'welcome.txt': file(
            'Welcome, apprentice.\nThe Shell Sanctum lies open before you.\nType `help` at any time to see the spells (commands) you know.\n'
          ),
          '.secret_rune': file('The hidden rune reads: LUMOS_SHELL\n'),
          scrolls: dir({
            'chant1.txt': file('echo is the spell of speaking.\n'),
            'chant2.txt': file('cat is the spell of reading.\n'),
            'beasts.txt': file(
              'dragon fire mountain\ngoblin cave gold\ndragon sky storm\ntroll bridge stone\ndragon lake mist\nkraken sea deep\n'
            ),
          }),
          library: dir({
            'inventory.csv': file(
              'item,count,rarity\nsword,1,rare\npotion,7,common\npotion,3,common\nrune,2,epic\nmap,1,legendary\npotion,2,common\n'
            ),
            'ledger.log': file(
              'INFO quest started\nWARN low mana\nINFO found key\nERROR door locked\nINFO retried door\nERROR door locked\nINFO used key\nINFO door opened\n'
            ),
          }),
          crypt: dir({
            'locked.sh': file('#!/bin/bash\necho "The crypt gate creaks open..."\n', 0o644),
          }),
          project: dir({
            'app.py': file('print("hello quest")\n'),
            'README.md': file('# Quest Project\n'),
          }),
          lab: dir({
            'potions.txt': file('healing 12 gold\nmana 8 silver\nhaste 20 gold\ninvisibility 45 platinum\n'),
            'recipe.txt': file('transmute lead into lead\nstir the lead thrice\n'),
          }),
          foundry: dir({
            'Dockerfile': file('FROM alpine:3.20\nCOPY spell.txt /spell.txt\nCMD ["cat", "/spell.txt"]\n'),
            'spell.txt': file('By layer and cache, I conjure thee!\n'),
          }),
        }),
      }),
      etc: dir({
        hosts: file('127.0.0.1 localhost\n10.0.1.10 web-01\n10.0.2.5 db-01\n'),
        'hostname': file('sanctum\n'),
        'motd': file('Realm of the Terminal Quest\n'),
      }),
      var: dir({ log: dir({ 'syslog': file('system boot ok\n') }) }),
      tmp: dir({}),
      dev: dir({ 'null': file('') }),
    });
  }

  function hostFs(extra) {
    return dir(
      Object.assign(
        {
          home: dir({ hero: dir({}) }),
          etc: dir({}),
          var: dir({ log: dir({}) }),
          dev: dir({ 'null': file('') }),
        },
        extra || {}
      )
    );
  }

  function buildNetwork() {
    return {
      dns: {
        'quest.dev': '203.0.113.10',
        'www.quest.dev': '203.0.113.10',
        'api.quest.dev': '203.0.113.20',
        'web-01': '10.0.1.10',
        'web-01.quest.internal': '10.0.1.10',
        'db-01': '10.0.2.5',
        'db-01.quest.internal': '10.0.2.5',
        'localhost': '127.0.0.1',
      },
      localIp: '10.0.1.5',
      gateway: '10.0.1.1',
      hosts: {
        'web-01': {
          ip: '10.0.1.10',
          user: 'hero',
          latency: 12,
          hops: ['10.0.1.1 (gateway)', '10.0.1.10 (web-01)'],
          ports: { 22: 'sshd', 80: 'nginx' },
          services: { nginx: 'running', sshd: 'running' },
          fs: hostFs({
            etc: dir({
              nginx: dir({ 'nginx.conf': file('server {\n  listen 80;\n  root /var/www;\n}\n') }),
            }),
            var: dir({
              log: dir({
                'nginx-error.log': file('2026/07/04 upstream timed out while connecting to 10.0.2.5:5432\n'),
              }),
              www: dir({ 'index.html': file('<h1>Quest Portal</h1>\n') }),
            }),
            home: dir({
              hero: dir({
                'notes.txt': file('Remember: the database lives on db-01.\n'),
              }),
            }),
          }),
        },
        'db-01': {
          ip: '10.0.2.5',
          user: 'hero',
          latency: 23,
          hops: ['10.0.1.1 (gateway)', '10.0.2.1 (core-router)', '10.0.2.5 (db-01)'],
          ports: { 22: 'sshd', 5432: 'postgres' },
          services: { postgres: 'running', sshd: 'running' },
          fs: hostFs({
            home: dir({
              hero: dir({ 'db-key.txt': file('The vault key is: AQUA_SIGIL\n') }),
            }),
          }),
        },
        'quest.dev': {
          ip: '203.0.113.10',
          latency: 48,
          hops: ['10.0.1.1 (gateway)', '198.51.100.1 (isp-edge)', '203.0.113.1 (cdn-edge)', '203.0.113.10 (quest.dev)'],
          ports: { 80: 'http', 443: 'https' },
          services: {},
          fs: null, // not ssh-able
        },
        'api.quest.dev': {
          ip: '203.0.113.20',
          latency: 52,
          hops: ['10.0.1.1 (gateway)', '198.51.100.1 (isp-edge)', '203.0.113.20 (api.quest.dev)'],
          ports: { 443: 'https' },
          services: {},
          fs: null,
        },
      },
      http: {
        'http://quest.dev': { status: 200, headers: 'HTTP/1.1 200 OK\nServer: nginx/1.24\nContent-Type: text/html', body: '<html><h1>Welcome to Quest.dev</h1></html>' },
        'http://quest.dev/': { alias: 'http://quest.dev' },
        'https://quest.dev': { alias: 'http://quest.dev' },
        'https://api.quest.dev/health': { status: 200, headers: 'HTTP/1.1 200 OK\nContent-Type: application/json', body: '{"status":"ok","realm":"production"}' },
        'https://api.quest.dev/spells': { status: 200, headers: 'HTTP/1.1 200 OK\nContent-Type: application/json', body: '{"spells":["pwd","ls","grep","curl","dig"],"count":5}' },
        'https://api.quest.dev/secret': { status: 401, headers: 'HTTP/1.1 401 Unauthorized\nWWW-Authenticate: Bearer', body: '{"error":"a token is required, apprentice"}' },
        'http://web-01': { dynamic: 'web01', headers: 'HTTP/1.1 200 OK\nServer: nginx/1.24', body: '<h1>Quest Portal</h1>' },
        'http://10.0.1.10': { alias: 'http://web-01' },
      },
    };
  }

  function buildAzure() {
    return {
      loggedIn: false,
      sub: { id: 'aaaa1111-2222-3333-4444-555566667777', name: 'Quest-Subscription' },
      groups: {},
      vms: {},
      storage: {},
      aks: {},
    };
  }

  function makePods(deploy, ns) {
    const pods = [];
    for (let i = 0; i < deploy.replicas; i++) {
      deploy.serial = (deploy.serial || 0) + 1;
      pods.push({
        name: `${deploy.name}-7d9f${(1000 + deploy.serial).toString(16)}`,
        deploy: deploy.name,
        ns,
        status: deploy.broken ? 'CrashLoopBackOff' : 'Running',
        restarts: deploy.broken ? 4 : 0,
        image: deploy.image,
        node: 'aks-nodepool1-' + ((deploy.serial % 3) + 1),
      });
    }
    return pods;
  }
  CLIQ.makePods = makePods;

  function buildK8s() {
    const k = {
      context: 'quest-aks',
      nodes: [
        { name: 'aks-nodepool1-1', status: 'Ready', roles: 'agent', version: 'v1.30.3' },
        { name: 'aks-nodepool1-2', status: 'Ready', roles: 'agent', version: 'v1.30.3' },
        { name: 'aks-nodepool1-3', status: 'Ready', roles: 'agent', version: 'v1.30.3' },
      ],
      namespaces: {
        'default': { deployments: {}, services: {}, pods: [] },
        'kube-system': { deployments: {}, services: {}, pods: [] },
        'shop': { deployments: {}, services: {}, pods: [] },
      },
    };
    function addDeploy(ns, name, replicas, image, opts) {
      const d = Object.assign({ name, replicas, image, serial: 0, broken: false }, opts || {});
      k.namespaces[ns].deployments[name] = d;
      k.namespaces[ns].pods.push(...makePods(d, ns));
      return d;
    }
    addDeploy('default', 'guestbook', 2, 'guestbook:1.0');
    addDeploy('shop', 'frontend', 3, 'shop-frontend:2.1');
    addDeploy('shop', 'payment', 1, 'shop-payment:1.2.3-bad', { broken: true });
    addDeploy('kube-system', 'coredns', 2, 'coredns:1.11');
    k.namespaces['shop'].services['frontend-svc'] = { name: 'frontend-svc', type: 'LoadBalancer', clusterIP: '10.240.8.14', externalIP: '20.10.30.40', ports: '80:31544/TCP', selector: 'frontend' };
    k.namespaces['default'].services['kubernetes'] = { name: 'kubernetes', type: 'ClusterIP', clusterIP: '10.240.0.1', externalIP: '<none>', ports: '443/TCP', selector: '' };
    return k;
  }
  CLIQ.buildK8s = buildK8s;

  function buildProcs() {
    return [
      { pid: 1, user: 'root', cpu: 0.1, mem: 0.4, cmd: '/sbin/init' },
      { pid: 812, user: 'root', cpu: 0.0, mem: 0.6, cmd: 'sshd: listening on :22' },
      { pid: 901, user: 'www', cpu: 1.2, mem: 2.1, cmd: 'nginx: master process' },
      { pid: 902, user: 'www', cpu: 0.8, mem: 1.9, cmd: 'nginx: worker process' },
      { pid: 1201, user: 'postgres', cpu: 2.4, mem: 8.3, cmd: 'postgres -D /var/lib/pg' },
      { pid: 2001, user: 'hero', cpu: 0.3, mem: 0.9, cmd: '-bash' },
    ];
  }

  function buildGit() {
    return { initialized: false, branch: 'main', branches: {}, staged: [], tracked: {}, serial: 0 };
  }

  function buildDocker() {
    return { images: [], containers: [], serial: 0 };
  }

  CLIQ.makeWorld = function () {
    return {
      user: 'hero',
      hostname: 'sanctum',
      home: '/home/hero',
      cwd: '/home/hero',
      fs: buildLocalFs(),
      sshStack: [],
      net: buildNetwork(),
      azure: buildAzure(),
      k8s: buildK8s(),
      kubeConnected: false, // gated until az aks get-credentials or module unlock
      git: buildGit(),
      docker: buildDocker(),
      procs: buildProcs(),
      history: [],
      flags: {},
    };
  };
  CLIQ.buildGit = buildGit;
})();
