/* Terminal Quest — simulated docker CLI */
(function () {
  const CLIQ = window.CLIQ;
  const C = CLIQ.commands;
  const ok = (out) => ({ out: out || '', code: 0 });
  const err = (out) => ({ out: out || '', code: 1, isErr: true });

  const REGISTRY = {
    'nginx': { size: '187MB' },
    'redis': { size: '117MB' },
    'alpine': { size: '7.8MB' },
    'ubuntu': { size: '78MB' },
    'quest/echo': { size: '12MB' },
    'quest/portal': { size: '95MB' },
  };

  function splitImage(ref) {
    const i = ref.lastIndexOf(':');
    if (i > 0 && !ref.slice(i + 1).includes('/')) return { repo: ref.slice(0, i), tag: ref.slice(i + 1) };
    return { repo: ref, tag: 'latest' };
  }

  function findImage(d, ref) {
    const { repo, tag } = splitImage(ref);
    return d.images.find((im) => im.repo === repo && im.tag === tag);
  }

  function findContainer(d, ref) {
    return d.containers.find((c) => c.name === ref || c.id.startsWith(ref));
  }

  function newId(d) {
    d.serial++;
    return ('c0ffee' + (69632 + d.serial * 4919).toString(16)).slice(0, 12);
  }

  C.docker = (a, w) => {
    const d = w.docker;
    const sub = a[0];

    if (sub === 'pull') {
      const ref = a[1];
      if (!ref) return err('"docker pull" requires exactly 1 argument.\n');
      const { repo, tag } = splitImage(ref);
      if (!REGISTRY[repo]) return err(`Error response from daemon: pull access denied for ${repo}, repository does not exist\n`);
      const already = !!findImage(d, ref);
      if (!already) d.images.push({ repo, tag, size: REGISTRY[repo].size, id: newId(d).slice(0, 12) });
      return ok(`${tag}: Pulling from ${repo}\nDigest: sha256:ab${(d.serial * 7919).toString(16)}\nStatus: ${already ? 'Image is up to date' : 'Downloaded newer image'} for ${repo}:${tag}\n`);
    }

    if (sub === 'images') {
      let o = 'REPOSITORY      TAG       IMAGE ID       SIZE\n';
      for (const im of d.images) o += `${im.repo.padEnd(16)}${im.tag.padEnd(10)}${im.id.padEnd(15)}${im.size}\n`;
      return ok(o);
    }

    if (sub === 'run') {
      const args = a.slice(1);
      let detached = false, name = null, hostPort = null, ctrPort = null;
      const env = {};
      const rest = [];
      const pubArg = (v) => {
        const m = (v || '').match(/^(\d+):(\d+)(\/(tcp|udp))?$/);
        if (!m) return false;
        hostPort = +m[1]; ctrPort = +m[2];
        return true;
      };
      for (let i = 0; i < args.length; i++) {
        const t = args[i];
        if (rest.length) { rest.push(t); continue; } // after the image, everything is the container's command
        if (t === '-d' || t === '--detach') detached = true;
        else if (/^-(i|t|it|ti)$/.test(t) || t === '--rm' || t === '--interactive' || t === '--tty') { /* accepted, no-op in the simulator */ }
        else if (t === '--name') name = args[++i];
        else if (t.startsWith('--name=')) name = t.slice(7);
        else if (t === '-e' || t === '--env') { const kv = (args[++i] || '').split('='); if (kv[0]) env[kv[0]] = kv.slice(1).join('='); }
        else if (t.startsWith('--env=')) { const kv = t.slice(6).split('='); if (kv[0]) env[kv[0]] = kv.slice(1).join('='); }
        else if (t === '-p' || t === '--publish') { if (!pubArg(args[++i])) return err('docker: invalid publish format, expected -p HOST:CONTAINER (e.g. -p 8080:80)\n'); }
        else if (t.startsWith('-p') && t.length > 2) { if (!pubArg(t.slice(2))) return err('docker: invalid publish format, expected -p HOST:CONTAINER (e.g. -p 8080:80)\n'); }
        else if (t.startsWith('-')) return err(`docker: unknown flag '${t}' (this simulator supports -d, --name, -p, -e, -it, --rm)\n`);
        else rest.push(t);
      }
      const image = rest[0];
      if (!image) return err('"docker run" requires at least 1 argument (the image).\n');
      const { repo, tag } = splitImage(image);
      let pullNote = '';
      const im = findImage(d, image);
      if (!im) {
        if (!REGISTRY[repo]) return err(`Unable to find image '${image}' locally\ndocker: Error response from daemon: pull access denied for ${repo}\n`);
        d.images.push({ repo, tag, size: REGISTRY[repo].size, id: newId(d).slice(0, 12) });
        pullNote = `Unable to find image '${image}' locally\n${tag}: Pulling from ${repo}... done\n`;
      }
      if (name && findContainer(d, name)) return err(`docker: Error response from daemon: Conflict. The container name "/${name}" is already in use.\n`);
      if (hostPort && d.containers.some((c) => c.status.startsWith('Up') && c.hostPort === hostPort))
        return err(`docker: Error response from daemon: port ${hostPort} is already allocated (another container is publishing it).\n`);
      d.serial++;
      if (!name) name = ['brave', 'clever', 'mystic', 'silent'][d.serial % 4] + '_' + ['tesla', 'lovelace', 'hopper', 'turing'][(d.serial >> 2) % 4];
      // quest/portal needs its key at startup — a failure a container can actually detect.
      // (Forgetting -p never crashes a container: it just runs unreachable from the host.)
      const portalBroken = repo === 'quest/portal' && !env.PORTAL_KEY;
      const oneShot = !!(im && im.oneShot); // CMD prints and exits — not a server
      const c = {
        id: newId(d), name, image: repo + ':' + tag,
        status: portalBroken ? 'Exited (1) 2 seconds ago' : oneShot ? 'Exited (0) 2 seconds ago' : 'Up 2 seconds',
        hostPort, ctrPort, env,
        logs: portalBroken
          ? 'Starting Quest Portal...\nFATAL: PORTAL_KEY is not set — the portal cannot start (run with -e PORTAL_KEY=<key>)\nprocess exited with code 1\n'
          : repo === 'quest/portal'
            ? 'Starting Quest Portal...\nQuest Portal listening on :80\n'
            : repo === 'quest/echo'
              ? '[echo] The Foundry hears your voice.\n[echo] The Foundry hears your voice.\n'
              : repo === 'spellbook'
                ? 'By layer and cache, I conjure thee!\n'
                : `[${repo}] started, listening on ${ctrPort || 'default port'}\n`,
      };
      d.containers.push(c);
      const attachNote = !detached && !oneShot && c.status.startsWith('Up')
        ? '(attached to the foreground — in real docker Ctrl+C stops it; use -d to run detached)\n'
        : '';
      return ok(pullNote + (detached ? c.id + '\n' : c.logs + attachNote));
    }

    if (sub === 'ps') {
      const all = a.includes('-a') || a.includes('--all');
      const list = d.containers.filter((c) => all || c.status.startsWith('Up'));
      let o = 'CONTAINER ID   IMAGE              STATUS                  PORTS                  NAMES\n';
      for (const c of list) {
        const ports = c.hostPort ? `0.0.0.0:${c.hostPort}->${c.ctrPort}/tcp` : '';
        o += `${c.id.slice(0, 12).padEnd(15)}${c.image.padEnd(19)}${c.status.padEnd(24)}${ports.padEnd(23)}${c.name}\n`;
      }
      return ok(o);
    }

    // strip flags AND their values (--tail 5, -t 10, ...) so the positional is really the container/image
    function positionals(args, flagsWithValue) {
      const out = [];
      for (let i = 0; i < args.length; i++) {
        const t = args[i];
        if (flagsWithValue.includes(t)) { i++; continue; }
        if (t.startsWith('-')) continue;
        out.push(t);
      }
      return out;
    }

    if (sub === 'stop' || sub === 'start' || sub === 'restart') {
      const ref = positionals(a.slice(1), ['-t', '--time'])[0];
      const c = findContainer(d, ref || '');
      if (!c) return err(`Error response from daemon: No such container: ${ref || ''}\n`);
      c.status = sub === 'stop' ? 'Exited (0) 1 second ago' : 'Up 1 second';
      return ok(ref + '\n');
    }

    if (sub === 'rm') {
      const force = a.includes('-f') || a.includes('--force');
      const ref = positionals(a.slice(1), [])[0];
      const c = findContainer(d, ref || '');
      if (!c) return err(`Error response from daemon: No such container: ${ref || ''}\n`);
      if (c.status.startsWith('Up') && !force) return err(`Error response from daemon: cannot remove a running container. Stop it first (or use -f).\n`);
      d.containers.splice(d.containers.indexOf(c), 1);
      return ok(ref + '\n');
    }

    if (sub === 'rmi') {
      const ref = positionals(a.slice(1), [])[0];
      const im = findImage(d, ref || '');
      if (!im) return err(`Error response from daemon: No such image: ${ref || ''}\n`);
      if (d.containers.find((c) => c.image === im.repo + ':' + im.tag)) return err('Error response from daemon: image is being used by a container\n');
      d.images.splice(d.images.indexOf(im), 1);
      return ok(`Untagged: ${im.repo}:${im.tag}\n`);
    }

    if (sub === 'logs') {
      const ref = positionals(a.slice(1), ['--tail', '-n', '--since'])[0];
      const c = findContainer(d, ref || '');
      if (!c) return err(`Error response from daemon: No such container: ${ref || ''}\n`);
      return ok(c.logs);
    }

    if (sub === 'exec') {
      const rest = a.filter((x) => !x.startsWith('-')).slice(1);
      const c = findContainer(d, rest[0] || '');
      if (!c) return err(`Error response from daemon: No such container: ${rest[0] || ''}\n`);
      if (!c.status.startsWith('Up')) return err(`Error response from daemon: container ${c.name} is not running\n`);
      const cmd = rest.slice(1).join(' ');
      if (!cmd) return err('usage: docker exec CONTAINER COMMAND\n');
      if (cmd === 'ls' || cmd === 'ls /') return ok('bin\netc\nspell.txt\nusr\nvar\n');
      if (cmd.startsWith('cat')) return ok('By layer and cache, I conjure thee!\n');
      if (cmd === 'hostname') return ok(c.id.slice(0, 12) + '\n');
      return ok(`(${cmd} ran inside ${c.name})\n`);
    }

    if (sub === 'build') {
      const ti = a.indexOf('-t');
      const tagRef = ti >= 0 ? a[ti + 1] : null;
      const path = a.slice(1).filter((x, i, arr) => !x.startsWith('-') && arr[i - 1] !== '-t')[0]; // flags may come in any order
      if (!tagRef || !path) return err('usage: docker build -t NAME:TAG PATH\n');
      const dirNode = CLIQ.getNode(w, path);
      const dockerfile = dirNode && dirNode.type === 'dir' ? dirNode.children['Dockerfile'] : null;
      if (!dockerfile) return err(`ERROR: failed to read Dockerfile: no Dockerfile found in ${path}\n`);
      const fromM = dockerfile.content.match(/FROM\s+(\S+)/);
      const { repo, tag } = splitImage(tagRef);
      // a CMD that just prints (cat/echo) makes a one-shot image: its containers exit when done
      const oneShot = /CMD\s+\[?\s*"?(cat|echo)\b/.test(dockerfile.content);
      const existing = findImage(d, tagRef);
      if (!existing) d.images.push({ repo, tag, size: '14MB', id: newId(d).slice(0, 12), oneShot });
      else existing.oneShot = oneShot;
      const steps = dockerfile.content.split('\n').filter((l) => l.trim() && !l.startsWith('#'));
      let o = `[+] Building 1.2s\n => [1/${steps.length}] FROM ${fromM ? fromM[1] : 'scratch'}\n`;
      steps.slice(1).forEach((s, i) => (o += ` => [${i + 2}/${steps.length}] ${s}\n`));
      o += ` => naming to docker.io/library/${repo}:${tag}\n`;
      return ok(o);
    }

    if (sub === '--version' || sub === 'version') return ok('Docker version 27.0 (Terminal Quest simulated)\n');

    return err(`docker: '${sub || ''}' is not supported here.\nSupported: pull, images, run, ps [-a], stop, start, restart, rm, rmi, logs, exec, build -t\n`);
  };
})();
