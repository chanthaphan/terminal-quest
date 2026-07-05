/* Terminal Quest — bash core + network commands + pipeline runner */
(function () {
  const CLIQ = window.CLIQ;
  const C = CLIQ.commands;
  const { getNode, getParent, normalize, file, dir } = CLIQ;

  const ok = (out) => ({ out: out || '', code: 0 });
  const err = (out) => ({ out: out || '', code: 1 });

  function flags(argv) {
    const f = new Set();
    const rest = [];
    for (const a of argv) {
      if (a.startsWith('-') && a.length > 1 && !/^-?\d+$/.test(a) && !a.startsWith('--')) {
        for (const ch of a.slice(1)) f.add(ch);
      } else if (a.startsWith('--')) f.add(a);
      else rest.push(a);
    }
    return { f, rest };
  }
  CLIQ.flags = flags;

  function modeStr(node) {
    const m = node.mode == null ? (node.type === 'dir' ? 0o755 : 0o644) : node.mode;
    const bits = 'rwxrwxrwx';
    let s = node.type === 'dir' ? 'd' : '-';
    for (let i = 8; i >= 0; i--) s += m & (1 << i) ? bits[8 - i] : '-';
    return s;
  }

  // ---- Core bash ----------------------------------------------------------

  C.pwd = (a, w) => ok(w.cwd + '\n');

  C.whoami = (a, w) => ok(w.user + '\n');
  C.hostname = (a, w) => {
    if (a.includes('-I') || a.includes('-i')) return ok((w.sshStack.length ? w.net.hosts[w.hostname].ip : w.net.localIp) + '\n');
    return ok(w.hostname + '\n');
  };

  C.echo = (a, w) => {
    const { f, rest } = flags(a);
    let s = rest.join(' ');
    s = s.replace(/\$USER\b/g, w.user).replace(/\$HOME\b/g, w.home).replace(/\$HOSTNAME\b/g, w.hostname);
    return ok(s + (f.has('n') ? '' : '\n'));
  };

  C.ls = (a, w) => {
    const { f, rest } = flags(a);
    const target = rest[0] || '.';
    const node = getNode(w, target);
    if (!node) return err(`ls: cannot access '${target}': No such file or directory\n`);
    if (node.type === 'file') return ok(target + '\n');
    let names = Object.keys(node.children).sort();
    if (!f.has('a')) names = names.filter((n) => !n.startsWith('.'));
    else names = ['.', '..', ...names];
    if (f.has('l')) {
      const lines = names
        .filter((n) => n !== '.' && n !== '..')
        .map((n) => {
          const c = node.children[n];
          const size = c.type === 'file' ? c.content.length : 4096;
          return `${modeStr(c)} 1 ${w.user} ${w.user} ${String(size).padStart(6)} Jul  4 09:00 ${n}`;
        });
      return ok(lines.join('\n') + (lines.length ? '\n' : ''));
    }
    return ok(names.join('  ') + (names.length ? '\n' : ''));
  };

  C.cd = (a, w) => {
    const target = a[0] || '~';
    const node = getNode(w, target);
    if (!node) return err(`cd: no such file or directory: ${target}\n`);
    if (node.type !== 'dir') return err(`cd: not a directory: ${target}\n`);
    w.cwd = normalize(w, target);
    return ok('');
  };

  C.cat = (a, w, stdin) => {
    const { rest } = flags(a);
    if (!rest.length) return ok(stdin || '');
    let out = '';
    for (const p of rest) {
      const n = getNode(w, p);
      if (!n) return err(`cat: ${p}: No such file or directory\n`);
      if (n.type === 'dir') return err(`cat: ${p}: Is a directory\n`);
      out += n.content;
    }
    return ok(out);
  };

  C.mkdir = (a, w) => {
    const { f, rest } = flags(a);
    for (const p of rest) {
      const abs = normalize(w, p);
      const parts = abs.split('/').filter(Boolean);
      let node = w.fs;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!node.children[part]) {
          if (i < parts.length - 1 && !f.has('p')) return err(`mkdir: cannot create directory '${p}': No such file or directory\n`);
          node.children[part] = dir();
        } else if (i === parts.length - 1 && !f.has('p')) {
          return err(`mkdir: cannot create directory '${p}': File exists\n`);
        }
        node = node.children[part];
        if (node.type !== 'dir') return err(`mkdir: cannot create directory '${p}': Not a directory\n`);
      }
    }
    return rest.length ? ok('') : err('mkdir: missing operand\n');
  };

  C.touch = (a, w) => {
    const { rest } = flags(a);
    if (!rest.length) return err('touch: missing file operand\n');
    for (const p of rest) {
      const { parent, name } = getParent(w, p);
      if (!parent || parent.type !== 'dir') return err(`touch: cannot touch '${p}': No such file or directory\n`);
      if (!parent.children[name]) parent.children[name] = file('');
    }
    return ok('');
  };

  C.rm = (a, w) => {
    const { f, rest } = flags(a);
    if (!rest.length) return err('rm: missing operand\n');
    for (const p of rest) {
      const { parent, name } = getParent(w, p);
      const node = parent && parent.children[name];
      if (!node) {
        if (f.has('f')) continue;
        return err(`rm: cannot remove '${p}': No such file or directory\n`);
      }
      if (node.type === 'dir' && !f.has('r')) return err(`rm: cannot remove '${p}': Is a directory\n`);
      delete parent.children[name];
    }
    return ok('');
  };

  function cloneNode(n) {
    if (n.type === 'file') return file(n.content, n.mode);
    const d2 = dir();
    for (const k of Object.keys(n.children)) d2.children[k] = cloneNode(n.children[k]);
    return d2;
  }

  C.cp = (a, w) => {
    const { f, rest } = flags(a);
    if (rest.length < 2) return err('cp: missing file operand\n');
    const src = getNode(w, rest[0]);
    if (!src) return err(`cp: cannot stat '${rest[0]}': No such file or directory\n`);
    if (src.type === 'dir' && !f.has('r')) return err(`cp: -r not specified; omitting directory '${rest[0]}'\n`);
    const dst = getNode(w, rest[1]);
    if (dst && dst.type === 'dir') {
      const srcName = normalize(w, rest[0]).split('/').filter(Boolean).pop();
      dst.children[srcName] = cloneNode(src);
    } else {
      const { parent, name } = getParent(w, rest[1]);
      if (!parent) return err(`cp: cannot create '${rest[1]}': No such file or directory\n`);
      parent.children[name] = cloneNode(src);
    }
    return ok('');
  };

  C.mv = (a, w) => {
    const { rest } = flags(a);
    if (rest.length < 2) return err('mv: missing file operand\n');
    const { parent: sp, name: sn } = getParent(w, rest[0]);
    const src = sp && sp.children[sn];
    if (!src) return err(`mv: cannot stat '${rest[0]}': No such file or directory\n`);
    const dst = getNode(w, rest[1]);
    if (dst && dst.type === 'dir') dst.children[sn] = src;
    else {
      const { parent: dp, name: dn } = getParent(w, rest[1]);
      if (!dp) return err(`mv: cannot move to '${rest[1]}': No such file or directory\n`);
      dp.children[dn] = src;
    }
    delete sp.children[sn];
    return ok('');
  };

  C.grep = (a, w, stdin) => {
    const { f, rest } = flags(a);
    const pattern = rest[0];
    if (pattern == null) return err('usage: grep [-ivncr] PATTERN [FILE...]\n');
    let re;
    try { re = new RegExp(pattern, f.has('i') ? 'i' : ''); } catch (e) { return err('grep: invalid pattern\n'); }
    const results = [];
    function scanText(text, label) {
      const lines = text.split('\n');
      lines.forEach((line, i) => {
        if (i === lines.length - 1 && line === '') return;
        const m = re.test(line);
        if (f.has('v') ? !m : m) results.push({ label, num: i + 1, line });
      });
    }
    function scanDir(node, path) {
      for (const k of Object.keys(node.children)) {
        const c = node.children[k];
        const p = path + '/' + k;
        if (c.type === 'file') scanText(c.content, p);
        else scanDir(c, p);
      }
    }
    if (rest.length > 1) {
      for (const p of rest.slice(1)) {
        const n = getNode(w, p);
        if (!n) return err(`grep: ${p}: No such file or directory\n`);
        if (n.type === 'dir') {
          if (!f.has('r')) return err(`grep: ${p}: Is a directory\n`);
          scanDir(n, normalize(w, p));
        } else scanText(n.content, rest.length > 2 || f.has('r') ? p : null);
      }
    } else scanText(stdin || '', null);
    if (f.has('c')) return ok(results.length + '\n');
    const out = results
      .map((r) => (r.label ? r.label + ':' : '') + (f.has('n') ? r.num + ':' : '') + r.line)
      .join('\n');
    return { out: out + (results.length ? '\n' : ''), code: results.length ? 0 : 1 };
  };

  C.find = (a, w) => {
    const args = a.slice();
    let start = '.';
    if (args[0] && !args[0].startsWith('-')) start = args.shift();
    let namePat = null, typeFilter = null;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '-name') namePat = args[++i];
      else if (args[i] === '-type') typeFilter = args[++i];
    }
    const startNode = getNode(w, start);
    if (!startNode) return err(`find: '${start}': No such file or directory\n`);
    const re = namePat ? new RegExp('^' + namePat.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$') : null;
    const out = [];
    function walk(node, path) {
      const t = node.type === 'dir' ? 'd' : 'f';
      const base = path.split('/').filter(Boolean).pop() || path;
      if ((!re || re.test(base)) && (!typeFilter || typeFilter === t)) out.push(path);
      if (node.type === 'dir') for (const k of Object.keys(node.children).sort()) walk(node.children[k], (path === '/' ? '' : path) + '/' + k);
    }
    walk(startNode, start === '.' ? '.' : normalize(w, start));
    return ok(out.join('\n') + (out.length ? '\n' : ''));
  };

  function lastLinesArg(a) {
    const { rest } = flags(a);
    let n = 10;
    const ni = a.indexOf('-n');
    if (ni >= 0 && a[ni + 1]) { n = parseInt(a[ni + 1], 10) || 10; rest.splice(rest.indexOf(a[ni + 1]), 1); }
    return { n, rest };
  }
  C.head = (a, w, stdin) => {
    const { n, rest } = lastLinesArg(a);
    let text = stdin || '';
    if (rest[0]) { const f = getNode(w, rest[0]); if (!f) return err(`head: cannot open '${rest[0]}'\n`); text = f.content; }
    const lines = text.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    return ok(lines.slice(0, n).join('\n') + '\n');
  };
  C.tail = (a, w, stdin) => {
    const { n, rest } = lastLinesArg(a);
    let text = stdin || '';
    if (rest[0]) { const f = getNode(w, rest[0]); if (!f) return err(`tail: cannot open '${rest[0]}'\n`); text = f.content; }
    const lines = text.split('\n');
    if (lines[lines.length - 1] === '') lines.pop();
    return ok(lines.slice(-n).join('\n') + '\n');
  };

  C.wc = (a, w, stdin) => {
    const { f, rest } = flags(a);
    let text = stdin || '';
    let label = '';
    if (rest[0]) { const n = getNode(w, rest[0]); if (!n) return err(`wc: ${rest[0]}: No such file or directory\n`); text = n.content; label = ' ' + rest[0]; }
    const l = (text.match(/\n/g) || []).length;
    const words = text.split(/\s+/).filter(Boolean).length;
    const c = text.length;
    if (f.has('l')) return ok(l + label + '\n');
    if (f.has('w')) return ok(words + label + '\n');
    if (f.has('c')) return ok(c + label + '\n');
    return ok(`${l} ${words} ${c}${label}\n`);
  };

  C.sort = (a, w, stdin) => {
    const { f, rest } = flags(a);
    let text = stdin || '';
    if (rest[0]) { const n = getNode(w, rest[0]); if (!n) return err(`sort: cannot read: ${rest[0]}\n`); text = n.content; }
    let lines = text.split('\n').filter((l, i, arr) => !(i === arr.length - 1 && l === ''));
    lines.sort(f.has('n') ? (x, y) => parseFloat(x) - parseFloat(y) : undefined);
    if (f.has('r')) lines.reverse();
    if (f.has('u')) lines = lines.filter((l, i) => i === 0 || l !== lines[i - 1]);
    return ok(lines.join('\n') + '\n');
  };

  C.uniq = (a, w, stdin) => {
    const { f, rest } = flags(a);
    let text = stdin || '';
    if (rest[0]) { const n = getNode(w, rest[0]); if (!n) return err(`uniq: ${rest[0]}: No such file\n`); text = n.content; }
    const lines = text.split('\n').filter((l, i, arr) => !(i === arr.length - 1 && l === ''));
    const out = [];
    let prev = null, count = 0;
    function flush() { if (prev !== null) out.push(f.has('c') ? String(count).padStart(7) + ' ' + prev : prev); }
    for (const l of lines) {
      if (l === prev) count++;
      else { flush(); prev = l; count = 1; }
    }
    flush();
    return ok(out.join('\n') + (out.length ? '\n' : ''));
  };

  C.cut = (a, w, stdin) => {
    let delim = '\t', fieldsSpec = null;
    const rest = [];
    for (let i = 0; i < a.length; i++) {
      if (a[i] === '-d') delim = a[++i];
      else if (a[i].startsWith('-d') && a[i].length > 2) delim = a[i].slice(2);
      else if (a[i] === '-f') fieldsSpec = a[++i];
      else if (a[i].startsWith('-f') && a[i].length > 2) fieldsSpec = a[i].slice(2);
      else rest.push(a[i]);
    }
    if (!fieldsSpec) return err('cut: you must specify fields with -f\n');
    let text = stdin || '';
    if (rest[0]) { const n = getNode(w, rest[0]); if (!n) return err(`cut: ${rest[0]}: No such file\n`); text = n.content; }
    const wanted = new Set();
    for (const part of fieldsSpec.split(',')) {
      if (part.includes('-')) { const [s, e] = part.split('-').map(Number); for (let i = s; i <= e; i++) wanted.add(i); }
      else wanted.add(Number(part));
    }
    const lines = text.split('\n').filter((l, i, arr) => !(i === arr.length - 1 && l === ''));
    const out = lines.map((l) => l.split(delim).filter((_, i) => wanted.has(i + 1)).join(delim));
    return ok(out.join('\n') + '\n');
  };

  C.chmod = (a, w) => {
    const { rest } = flags(a);
    if (rest.length < 2) return err('chmod: missing operand\n');
    const spec = rest[0];
    const node = getNode(w, rest[1]);
    if (!node) return err(`chmod: cannot access '${rest[1]}': No such file or directory\n`);
    if (/^[0-7]{3}$/.test(spec)) node.mode = parseInt(spec, 8);
    else if (spec === '+x' || spec === 'u+x' || spec === 'a+x') node.mode = (node.mode == null ? 0o644 : node.mode) | 0o111;
    else if (spec === '-x') node.mode = (node.mode == null ? 0o644 : node.mode) & ~0o111;
    else return err(`chmod: invalid mode: '${spec}'\n`);
    return ok('');
  };

  C.bash = C.sh = (a, w) => {
    const { rest } = flags(a);
    if (!rest[0]) return err('usage: bash SCRIPT\n');
    const n = getNode(w, rest[0]);
    if (!n || n.type !== 'file') return err(`bash: ${rest[0]}: No such file\n`);
    return runScript(n, w);
  };

  function runScript(n, w) {
    const lines = n.content.split('\n').filter((l) => l.trim() && !l.startsWith('#'));
    let out = '';
    for (const line of lines) {
      const r = CLIQ.run(w, line);
      out += r.out;
    }
    return ok(out);
  }

  C.history = (a, w) => ok(w.history.map((h, i) => `  ${i + 1}  ${h}`).join('\n') + '\n');

  C.env = (a, w) => ok(`USER=${w.user}\nHOME=${w.home}\nHOSTNAME=${w.hostname}\nSHELL=/bin/bash\nPATH=/usr/local/bin:/usr/bin:/bin\n`);

  C.which = (a, w) => {
    if (!a[0]) return err('usage: which COMMAND\n');
    return C[a[0]] ? ok(`/usr/bin/${a[0]}\n`) : err(`${a[0]} not found\n`);
  };

  C.man = (a, w) => {
    const pages = {
      ls: 'ls — list directory contents.\n  -l  long format (permissions, size)\n  -a  include hidden files (dotfiles)',
      cd: 'cd — change directory. `cd ..` goes up, `cd ~` or `cd` goes home.',
      cat: 'cat — print file contents to the terminal.',
      grep: 'grep — search text for a pattern.\n  -i ignore case  -n line numbers  -v invert  -c count  -r recursive',
      find: 'find — walk a directory tree.\n  find PATH -name "PATTERN"  -type f|d',
      chmod: 'chmod — change file permissions. e.g. chmod 755 file, chmod +x script.sh',
      ssh: 'ssh — open a shell on a remote host: ssh user@host. Type `exit` to leave.',
      scp: 'scp — copy files over ssh: scp src user@host:dest (or the reverse).',
      curl: 'curl — make an HTTP request.\n  -I headers only  -s silent  -o FILE save to file',
      dig: 'dig — query DNS. `dig name` or `dig +short name`.',
      ping: 'ping — send ICMP echo requests: ping -c 3 host',
      kubectl: 'kubectl — control a Kubernetes cluster: kubectl get|describe|logs|scale|delete ...',
      az: 'az — Azure CLI: az login, az group ..., az vm ..., az aks ...',
    };
    if (!a[0]) return err('What manual page do you want?\n');
    return pages[a[0]] ? ok(pages[a[0]] + '\n') : err(`No manual entry for ${a[0]}\n`);
  };

  C.help = () => ok(
    'Spells you may know (unlocked by quests):\n' +
    '  Files    : pwd ls cd cat mkdir touch rm cp mv chmod find\n' +
    '  Text     : echo grep head tail wc sort uniq cut\n' +
    '  Network  : ping traceroute dig nslookup curl ssh scp exit netstat ss ip nc systemctl\n' +
    '  Azure    : az login | az group | az vm | az storage | az aks\n' +
    '  K8s      : kubectl get|describe|logs|scale|delete|rollout|set|config\n' +
    '  Misc     : whoami hostname history man clear help\n'
  );

  // ---- Network / remote ---------------------------------------------------

  function resolveName(w, name) {
    if (/^\d+\.\d+\.\d+\.\d+$/.test(name)) return name;
    // /etc/hosts is consulted BEFORE DNS — just like the real resolver
    const hosts = getNode(w, '/etc/hosts');
    if (hosts && hosts.type === 'file') {
      for (const line of hosts.content.split('\n')) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2 && parts.slice(1).includes(name) && /^\d+\.\d+\.\d+\.\d+$/.test(parts[0])) return parts[0];
      }
    }
    return w.net.dns[name] || null;
  }
  function hostByName(w, name) {
    if (w.net.hosts[name]) return w.net.hosts[name];
    const ip = resolveName(w, name);
    for (const k of Object.keys(w.net.hosts)) if (w.net.hosts[k].ip === ip) return w.net.hosts[k];
    return null;
  }
  CLIQ.hostByName = hostByName;

  C.ping = (a, w) => {
    const { rest } = flags(a);
    let count = 3;
    const ci = a.indexOf('-c');
    if (ci >= 0) { count = Math.min(parseInt(a[ci + 1], 10) || 3, 5); rest.splice(rest.indexOf(a[ci + 1]), 1); }
    const target = rest[0];
    if (!target) return err('usage: ping [-c N] HOST\n');
    const ip = resolveName(w, target);
    if (!ip) return err(`ping: ${target}: Name or service not known\n`);
    const host = hostByName(w, target);
    const lat = host ? host.latency : 30;
    if (host && host.down) {
      let o = `PING ${target} (${ip}) 56(84) bytes of data.\n`;
      o += `\n--- ${target} ping statistics ---\n${count} packets transmitted, 0 received, 100% packet loss\n`;
      return err(o);
    }
    let o = `PING ${target} (${ip}) 56(84) bytes of data.\n`;
    for (let i = 1; i <= count; i++) o += `64 bytes from ${ip}: icmp_seq=${i} ttl=63 time=${(lat + i * 0.3).toFixed(1)} ms\n`;
    o += `\n--- ${target} ping statistics ---\n${count} packets transmitted, ${count} received, 0% packet loss\n`;
    return ok(o);
  };

  C.traceroute = (a, w) => {
    const target = flags(a).rest[0];
    if (!target) return err('usage: traceroute HOST\n');
    const host = hostByName(w, target);
    const ip = resolveName(w, target);
    if (!ip) return err(`traceroute: unknown host ${target}\n`);
    const hops = host ? host.hops : ['10.0.1.1 (gateway)', '198.51.100.1 (isp-edge)', ip];
    let o = `traceroute to ${target} (${ip}), 30 hops max\n`;
    hops.forEach((h, i) => { o += ` ${i + 1}  ${h}  ${(4 * (i + 1)).toFixed(1)} ms\n`; });
    return ok(o);
  };

  C.dig = (a, w) => {
    const short = a.includes('+short');
    const name = a.filter((x) => !x.startsWith('+') && !x.startsWith('-'))[0];
    if (!name) return err('usage: dig [+short] NAME\n');
    const ip = w.net.dns[name];
    if (short) return ip ? ok(ip + '\n') : ok('');
    let o = `; <<>> TerminalQuest DiG <<>> ${name}\n;; ANSWER SECTION:\n`;
    o += ip ? `${name}.\t300\tIN\tA\t${ip}\n` : `;; no answer — NXDOMAIN\n`;
    o += `;; Query time: 12 msec\n;; SERVER: 10.0.1.1#53\n`;
    return ip ? ok(o) : { out: o, code: 1 };
  };

  C.nslookup = (a, w) => {
    const name = flags(a).rest[0];
    if (!name) return err('usage: nslookup NAME\n');
    const ip = w.net.dns[name];
    if (!ip) return err(`Server: 10.0.1.1\n** server can't find ${name}: NXDOMAIN\n`);
    return ok(`Server:  10.0.1.1\nAddress: 10.0.1.1#53\n\nName:    ${name}\nAddress: ${ip}\n`);
  };

  C.curl = (a, w) => {
    const { f, rest } = flags(a);
    let saveTo = null;
    const oi = a.indexOf('-o');
    if (oi >= 0) { saveTo = a[oi + 1]; const idx = rest.indexOf(saveTo); if (idx >= 0) rest.splice(idx, 1); }
    let url = rest[0];
    if (!url) return err('curl: no URL specified\n');
    if (!/^https?:\/\//.test(url)) url = 'http://' + url;
    url = url.replace(/\/$/, '') || url;
    // localhost:PORT → published docker container ports
    const lm = url.match(/^https?:\/\/(?:localhost|127\.0\.0\.1):(\d+)/);
    if (lm) {
      const port = parseInt(lm[1], 10);
      const c = (w.docker.containers || []).find((x) => x.status.startsWith('Up') && x.hostPort === port);
      if (!c) return err(`curl: (7) Failed to connect to localhost port ${port}: Connection refused\n`);
      const body = /nginx/.test(c.image) ? '<html><h1>Welcome to nginx!</h1></html>' : /portal/.test(c.image) ? '<h1>Quest Portal Online</h1>' : `<h1>${c.image} says hello</h1>`;
      if (f.has('I')) return ok('HTTP/1.1 200 OK\nServer: ' + c.image + '\n');
      return ok(body + '\n');
    }
    // resolution happens before any HTTP conversation — a broken name fails here
    const hostPart = url.replace(/^https?:\/\//, '').split('/')[0].split(':')[0];
    if (!resolveName(w, hostPart)) return err(`curl: (6) Could not resolve host: ${hostPart}\n`);
    let entry = w.net.http[url] || w.net.http[url + '/'];
    while (entry && entry.alias) entry = w.net.http[entry.alias];
    if (!entry) {
      return err(`curl: (7) Failed to connect to ${hostPart}: Connection refused\n`);
    }
    if (entry.dynamic === 'web01') {
      const web = w.net.hosts['web-01'];
      if (web.services.nginx !== 'running') return err(`curl: (7) Failed to connect to web-01 port 80: Connection refused\n`);
    }
    if (f.has('I')) return ok(entry.headers + '\n');
    if (saveTo) {
      CLIQ.writeFile(w, saveTo, entry.body + '\n');
      return ok(f.has('s') ? '' : `  % Saved to ${saveTo}\n`);
    }
    return { out: entry.body + '\n', code: entry.status >= 400 ? 0 : 0, status: entry.status };
  };

  C.ssh = (a, w) => {
    const { rest } = flags(a);
    const target = rest[0];
    if (!target) return err('usage: ssh [user@]host\n');
    const [maybeUser, maybeHost] = target.includes('@') ? target.split('@') : [w.user, target];
    const host = hostByName(w, maybeHost);
    const hostName = Object.keys(w.net.hosts).find((k) => w.net.hosts[k] === host);
    if (!host) return err(`ssh: Could not resolve hostname ${maybeHost}\n`);
    if (!host.fs || !host.ports[22]) return err(`ssh: connect to host ${maybeHost} port 22: Connection refused\n`);
    w.sshStack.push({ user: w.user, hostname: w.hostname, home: w.home, cwd: w.cwd, fs: w.fs });
    w.user = maybeUser;
    w.hostname = hostName;
    w.home = '/home/' + maybeUser;
    w.cwd = w.home;
    w.fs = host.fs;
    if (!CLIQ.getNode(w, w.home)) {
      // ensure home exists
      const homeDir = CLIQ.getNode(w, '/home');
      if (homeDir) homeDir.children[maybeUser] = dir();
    }
    return ok(`Welcome to ${hostName} (${host.ip})\nLast login: Fri Jul  4 from 10.0.1.5\n`);
  };

  C.exit = (a, w) => {
    if (!w.sshStack.length) return ok('There is no escape from the Quest. (You are not in an ssh session.)\n');
    const prev = w.sshStack.pop();
    Object.assign(w, prev);
    return ok('logout\nConnection closed.\n');
  };

  C.scp = (a, w) => {
    const { rest } = flags(a);
    if (rest.length < 2) return err('usage: scp SRC DEST  (remote side: user@host:path)\n');
    function parseSide(s) {
      const m = s.match(/^(?:([^@]+)@)?([^:]+):(.*)$/);
      if (m && hostByName(w, m[2])) return { remote: true, host: hostByName(w, m[2]), path: m[3] || '~' };
      return { remote: false, path: s };
    }
    const src = parseSide(rest[0]);
    const dst = parseSide(rest[1]);
    function ctxFor(side) {
      if (!side.remote) return w;
      return { fs: side.host.fs, cwd: '/home/hero', home: '/home/hero', user: 'hero' };
    }
    const srcCtx = ctxFor(src), dstCtx = ctxFor(dst);
    const node = CLIQ.getNode(srcCtx, src.path);
    if (!node || node.type !== 'file') return err(`scp: ${src.path}: No such file or directory\n`);
    let dpath = dst.path === '~' || dst.path === '' ? '/home/hero' : dst.path;
    const dnode = CLIQ.getNode(dstCtx, dpath);
    if (dnode && dnode.type === 'dir') dpath = dpath.replace(/\/$/, '') + '/' + src.path.split('/').pop();
    const { parent, name } = CLIQ.getParent(dstCtx, dpath);
    if (!parent) return err(`scp: ${dst.path}: No such file or directory\n`);
    parent.children[name] = file(node.content, node.mode);
    const base = src.path.split('/').pop();
    return ok(`${base}                        100%  ${node.content.length}B   1.2MB/s   00:00\n`);
  };

  function portTable(w) {
    const local = !w.sshStack.length;
    const rows = [];
    if (local) {
      rows.push(['tcp', '0.0.0.0:22', 'LISTEN', 'sshd']);
    } else {
      const host = w.net.hosts[w.hostname];
      for (const p of Object.keys(host.ports)) {
        const svc = host.ports[p];
        if (host.services[svc] && host.services[svc] !== 'running') continue;
        rows.push(['tcp', `0.0.0.0:${p}`, 'LISTEN', svc]);
      }
    }
    let o = 'Proto Local Address          State      Process\n';
    for (const r of rows) o += `${r[0]}   ${r[1].padEnd(22)} ${r[2].padEnd(10)} ${r[3]}\n`;
    return o;
  }
  C.netstat = (a, w) => ok(portTable(w));
  C.ss = (a, w) => ok(portTable(w));

  C.ip = (a, w) => {
    const sub = a[0];
    const myIp = w.sshStack.length ? w.net.hosts[w.hostname].ip : w.net.localIp;
    if (sub === 'addr' || sub === 'a' || sub === 'address') {
      return ok(
        `1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,UP> mtu 1500\n    inet ${myIp}/24 brd 10.0.1.255 scope global eth0\n`
      );
    }
    if (sub === 'route' || sub === 'r') {
      return ok(`default via ${w.net.gateway} dev eth0\n10.0.1.0/24 dev eth0 proto kernel scope link src ${myIp}\n`);
    }
    return err('usage: ip addr | ip route\n');
  };
  C.ifconfig = (a, w) => C.ip(['addr'], w);

  C.nc = (a, w) => {
    const { f, rest } = flags(a);
    const [target, portStr] = rest;
    if (!target || !portStr) return err('usage: nc -zv HOST PORT\n');
    const host = hostByName(w, target);
    const port = parseInt(portStr, 10);
    if (!host) return err(`nc: getaddrinfo for host "${target}": Name or service not known\n`);
    const svc = host.ports[port];
    const svcDown = svc && host.services[svc] && host.services[svc] !== 'running';
    if (svc && !svcDown) return ok(`Connection to ${target} ${port} port [tcp/${svc}] succeeded!\n`);
    return err(`nc: connect to ${target} port ${port} (tcp) failed: Connection refused\n`);
  };

  C.systemctl = (a, w) => {
    if (!w.sshStack.length && w.hostname === 'sanctum') return err('systemctl: no services run in the Sanctum. Try this on a remote host (ssh first).\n');
    const host = w.net.hosts[w.hostname];
    const [action, svc] = flags(a).rest;
    if (!action || !svc) return err('usage: systemctl status|start|stop|restart SERVICE\n');
    if (!(svc in host.services)) return err(`Unit ${svc}.service could not be found.\n`);
    if (action === 'status') {
      const st = host.services[svc];
      const dot = st === 'running' ? '●' : '○';
      return { out: `${dot} ${svc}.service - ${svc}\n   Active: ${st === 'running' ? 'active (running)' : 'failed (Result: exit-code)'} since Fri 2026-07-04\n${st !== 'running' ? '   Process: exited, code=1\n   Jul 04 nginx[812]: bind() to 0.0.0.0:80 ok, upstream check failed\n' : ''}`, code: st === 'running' ? 0 : 3 };
    }
    if (action === 'start' || action === 'restart') { host.services[svc] = 'running'; return ok(''); }
    if (action === 'stop') { host.services[svc] = 'stopped'; return ok(''); }
    return err(`Unknown operation ${action}.\n`);
  };

  C.clear = () => ({ out: '', code: 0, clear: true });

  // ---- Processes / system (The Alchemist's Lab) ----------------------------

  function procTable(w, sortCpu) {
    const procs = sortCpu ? [...w.procs].sort((a, b) => b.cpu - a.cpu) : w.procs;
    let o = 'USER       PID  %CPU  %MEM  COMMAND\n';
    for (const p of procs)
      o += `${p.user.padEnd(9)}${String(p.pid).padStart(5)}  ${p.cpu.toFixed(1).padStart(4)}  ${p.mem.toFixed(1).padStart(4)}  ${p.cmd}\n`;
    return o;
  }

  C.ps = (a, w) => ok(procTable(w, false));

  C.top = (a, w) => {
    const totalCpu = w.procs.reduce((s, p) => s + p.cpu, 0);
    const load = (totalCpu / 100 * 4).toFixed(2);
    return ok(
      `top - up 7 days, load average: ${load}, ${load}, ${(load * 0.8).toFixed(2)}\n` +
      `%Cpu(s): ${totalCpu.toFixed(1)} us  MiB Mem: 7822 total, ${(7822 - w.procs.reduce((s, p) => s + p.mem * 78, 0)).toFixed(0)} free\n\n` +
      procTable(w, true)
    );
  };

  C.kill = (a, w) => {
    const { rest } = flags(a);
    const pid = parseInt(rest[0], 10);
    if (!pid) return err('usage: kill [-9] PID\n');
    if (pid === 1) return err('kill: (1): Operation not permitted\n');
    const idx = w.procs.findIndex((p) => p.pid === pid);
    if (idx < 0) return err(`kill: (${pid}): No such process\n`);
    w.procs.splice(idx, 1);
    return ok('');
  };

  C.df = (a, w) => {
    const bloated = !!getNode(w, '/var/log/chaos.dump');
    const usePct = bloated ? 92 : 41;
    const used = bloated ? '46G' : '20G';
    return ok(
      'Filesystem      Size  Used Avail Use% Mounted on\n' +
      `/dev/sda1        50G  ${used}  ${bloated ? '4.0G' : '30G'}  ${usePct}% /\n` +
      'tmpfs           3.9G     0  3.9G   0% /dev/shm\n'
    );
  };

  function nodeSize(n) {
    if (n.type === 'file') return n.content.length;
    return Object.values(n.children).reduce((s, c) => s + nodeSize(c), 0);
  }
  C.du = (a, w) => {
    const { rest } = flags(a);
    const target = rest[0] || '.';
    const n = getNode(w, target);
    if (!n) return err(`du: cannot access '${target}': No such file or directory\n`);
    const bytes = nodeSize(n);
    const disp = bytes > 4000 ? (bytes / 1000).toFixed(1) + 'M' : bytes > 0 ? Math.max(1, Math.round(bytes / 100)) + 'K' : '0';
    return ok(`${disp}\t${target}\n`);
  };

  C.free = (a, w) => ok(
    '               total        used        free\n' +
    'Mem:           7822Mi      2410Mi      5412Mi\n' +
    'Swap:          2048Mi         0Mi      2048Mi\n'
  );

  C.awk = (a, w, stdin) => {
    let sep = null;
    const rest = [];
    for (let i = 0; i < a.length; i++) {
      if (a[i] === '-F') sep = a[++i];
      else if (a[i].startsWith('-F') && a[i].length > 2) sep = a[i].slice(2);
      else rest.push(a[i]);
    }
    const prog = rest[0] || '';
    const m = prog.match(/^\{?\s*print\s+(.+?)\s*\}?$/);
    if (!m) return err("awk: this trainer supports '{print $N}' programs (e.g. awk '{print $1, $3}')\n");
    const fields = m[1].split(',').map((s) => s.trim());
    let text = stdin || '';
    if (rest[1]) { const n = getNode(w, rest[1]); if (!n) return err(`awk: can't open file ${rest[1]}\n`); text = n.content; }
    const lines = text.split('\n').filter((l, i, arr) => !(i === arr.length - 1 && l === ''));
    const out = lines.map((line) => {
      const parts = sep ? line.split(sep) : line.split(/\s+/).filter(Boolean);
      return fields.map((f) => {
        const fm = f.match(/^\$(\d+)$/);
        if (!fm) return f.replace(/^"|"$/g, '');
        const idx = parseInt(fm[1], 10);
        return idx === 0 ? line : parts[idx - 1] || '';
      }).join(' ');
    });
    return ok(out.join('\n') + '\n');
  };

  C.sed = (a, w, stdin) => {
    const { f, rest } = flags(a);
    const expr = rest[0] || '';
    const m = expr.match(/^s([/|#])(.+?)\1(.*?)\1(g?)$/);
    if (!m) return err("sed: this trainer supports 's/old/new/g' expressions\n");
    let re;
    try { re = new RegExp(m[2].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), m[4] ? 'g' : ''); } catch (e) { return err('sed: bad pattern\n'); }
    let text = stdin || '';
    let node = null;
    if (rest[1]) { node = getNode(w, rest[1]); if (!node) return err(`sed: can't read ${rest[1]}: No such file or directory\n`); text = node.content; }
    const result = text.split('\n').map((l) => l.replace(re, m[3])).join('\n');
    if (f.has('i') && node) { node.content = result; return ok(''); }
    return ok(result);
  };

  C.tar = (a, w) => {
    const flagArg = a[0] || '';
    if (flagArg.includes('c')) {
      const fi = a.indexOf(a.find((x) => x.includes('f')));
      const archive = a[fi + 1];
      const paths = a.slice(fi + 2);
      if (!archive || !paths.length) return err('usage: tar -czf ARCHIVE.tar.gz PATH...\n');
      for (const p of paths) if (!getNode(w, p)) return err(`tar: ${p}: Cannot stat: No such file or directory\n`);
      CLIQ.writeFile(w, archive, 'TARBALL\n' + paths.join('\n') + '\n');
      return ok('');
    }
    if (flagArg.includes('t')) {
      const archive = a[a.indexOf(a.find((x) => x.includes('f'))) + 1];
      const n = archive && getNode(w, archive);
      if (!n) return err(`tar: ${archive || ''}: Cannot open\n`);
      return ok(n.content.split('\n').slice(1).filter(Boolean).join('\n') + '\n');
    }
    if (flagArg.includes('x')) return ok('');
    return err('usage: tar -czf|-tzf|-xzf ARCHIVE [PATH...]\n');
  };

  C.crontab = (a, w) => {
    if (a[0] === '-l') return ok(
      '# m h dom mon dow  command\n' +
      '30 2 * * *  /usr/local/bin/backup.sh\n' +
      '0 */6 * * *  /usr/local/bin/health-check.sh\n'
    );
    return err('usage: crontab -l   (editing is a quiz matter in this realm)\n');
  };

  // ---- Pipeline runner ----------------------------------------------------

  CLIQ.run = function (world, line) {
    const raw = line.trim();
    if (!raw) return { raw, cmd: '', argv: [], out: '', code: 0 };
    world.history.push(raw);
    const toks = CLIQ.tokenize(raw);

    // split into pipeline stages + redirect
    const stages = [];
    let cur = [];
    let redirect = null; // {mode:'>'|'>>', target}
    for (let i = 0; i < toks.length; i++) {
      const t = toks[i];
      if (t === '|') { stages.push(cur); cur = []; }
      else if (t === '>' || t === '>>') { redirect = { mode: t, target: toks[i + 1] }; i++; }
      else cur.push(t);
    }
    stages.push(cur);

    let stdin = '';
    let result = { out: '', code: 0 };
    for (const stage of stages) {
      if (!stage.length) { result = { out: 'bash: syntax error near unexpected token `|`\n', code: 2 }; break; }
      const name = stage[0];
      const fn = CLIQ.commands[name];
      if (!fn) { result = { out: `bash: ${name}: command not found\nHint: type \`help\` to see available commands.\n`, code: 127 }; break; }
      try {
        result = fn(stage.slice(1), world, stdin) || { out: '', code: 0 };
      } catch (e) {
        result = { out: name + ': internal error: ' + e.message + '\n', code: 1 };
      }
      stdin = result.out;
    }

    if (redirect && redirect.target && result.code !== 127) {
      const okw = CLIQ.writeFile(world, redirect.target, result.out, redirect.mode === '>>');
      result = okw ? { out: '', code: 0 } : { out: `bash: ${redirect.target}: No such file or directory\n`, code: 1 };
    }

    return {
      raw,
      cmd: toks[0] || '',
      argv: toks,
      out: result.out,
      code: result.code,
      ok: result.code === 0,
      clear: !!result.clear,
      world,
    };
  };
})();
