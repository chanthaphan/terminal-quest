/* Terminal Quest — simulated docker CLI */
(function () {
  const CLIQ = window.CLIQ;
  const C = CLIQ.commands;
  const ok = (out) => ({ out: out || '', code: 0 });
  const err = (out) => ({ out: out || '', code: 1 });

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
      if (!findImage(d, ref)) d.images.push({ repo, tag, size: REGISTRY[repo].size, id: newId(d).slice(0, 12) });
      return ok(`${tag}: Pulling from ${repo}\nDigest: sha256:ab${(d.serial * 7919).toString(16)}\nStatus: Downloaded newer image for ${repo}:${tag}\n`);
    }

    if (sub === 'images') {
      let o = 'REPOSITORY      TAG       IMAGE ID       SIZE\n';
      for (const im of d.images) o += `${im.repo.padEnd(16)}${im.tag.padEnd(10)}${im.id.padEnd(15)}${im.size}\n`;
      return ok(o);
    }

    if (sub === 'run') {
      const args = a.slice(1);
      let detached = false, name = null, hostPort = null, ctrPort = null;
      const rest = [];
      for (let i = 0; i < args.length; i++) {
        const t = args[i];
        if (t === '-d' || t === '--detach') detached = true;
        else if (t === '--name') name = args[++i];
        else if (t === '-p' || t === '--publish') {
          const m = (args[++i] || '').match(/^(\d+):(\d+)$/);
          if (!m) return err('docker: invalid publish format, expected -p HOST:CONTAINER (e.g. -p 8080:80)\n');
          hostPort = +m[1]; ctrPort = +m[2];
        } else rest.push(t);
      }
      const image = rest[0];
      if (!image) return err('"docker run" requires at least 1 argument (the image).\n');
      const { repo, tag } = splitImage(image);
      let pullNote = '';
      if (!findImage(d, image)) {
        if (!REGISTRY[repo]) return err(`Unable to find image '${image}' locally\ndocker: Error response from daemon: pull access denied for ${repo}\n`);
        d.images.push({ repo, tag, size: REGISTRY[repo].size, id: newId(d).slice(0, 12) });
        pullNote = `Unable to find image '${image}' locally\n${tag}: Pulling from ${repo}... done\n`;
      }
      if (name && findContainer(d, name)) return err(`docker: Error response from daemon: Conflict. The container name "/${name}" is already in use.\n`);
      if (hostPort && d.containers.some((c) => c.status.startsWith('Up') && c.hostPort === hostPort))
        return err(`docker: Error response from daemon: port ${hostPort} is already allocated (another container is publishing it).\n`);
      d.serial++;
      if (!name) name = ['brave', 'clever', 'mystic', 'silent'][d.serial % 4] + '_' + ['tesla', 'lovelace', 'hopper', 'turing'][(d.serial >> 2) % 4];
      // quest/portal demands its port 80 be published, else it exits — the Image Golem's curse
      const portalBroken = repo === 'quest/portal' && ctrPort !== 80;
      const c = {
        id: newId(d), name, image: repo + ':' + tag,
        status: portalBroken ? 'Exited (1) 2 seconds ago' : 'Up 2 seconds',
        hostPort, ctrPort,
        logs: portalBroken
          ? 'Starting Quest Portal...\nFATAL: port 80 must be published to a host port (run with -p HOST:80)\nprocess exited with code 1\n'
          : repo === 'quest/echo'
            ? '[echo] The Foundry hears your voice.\n[echo] The Foundry hears your voice.\n'
            : repo === 'spellbook'
              ? 'By layer and cache, I conjure thee!\n'
              : `[${repo}] started, listening on ${ctrPort || 'default port'}\n`,
      };
      d.containers.push(c);
      return ok(pullNote + (detached ? c.id + '\n' : c.logs));
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

    if (sub === 'stop' || sub === 'start' || sub === 'restart') {
      const c = findContainer(d, a[1] || '');
      if (!c) return err(`Error response from daemon: No such container: ${a[1] || ''}\n`);
      c.status = sub === 'stop' ? 'Exited (0) 1 second ago' : 'Up 1 second';
      return ok((a[1]) + '\n');
    }

    if (sub === 'rm') {
      const force = a.includes('-f');
      const ref = a.filter((x) => !x.startsWith('-')).slice(1)[0];
      const c = findContainer(d, ref || '');
      if (!c) return err(`Error response from daemon: No such container: ${ref || ''}\n`);
      if (c.status.startsWith('Up') && !force) return err(`Error response from daemon: cannot remove a running container. Stop it first (or use -f).\n`);
      d.containers.splice(d.containers.indexOf(c), 1);
      return ok(ref + '\n');
    }

    if (sub === 'rmi') {
      const im = findImage(d, a[1] || '');
      if (!im) return err(`Error response from daemon: No such image: ${a[1] || ''}\n`);
      if (d.containers.find((c) => c.image === im.repo + ':' + im.tag)) return err('Error response from daemon: image is being used by a container\n');
      d.images.splice(d.images.indexOf(im), 1);
      return ok(`Untagged: ${im.repo}:${im.tag}\n`);
    }

    if (sub === 'logs') {
      const c = findContainer(d, a.filter((x) => !x.startsWith('-'))[1] || '');
      if (!c) return err(`Error response from daemon: No such container: ${a[1] || ''}\n`);
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
      const path = a[a.length - 1];
      if (!tagRef || !path || path === tagRef) return err('usage: docker build -t NAME:TAG PATH\n');
      const dirNode = CLIQ.getNode(w, path);
      const dockerfile = dirNode && dirNode.type === 'dir' ? dirNode.children['Dockerfile'] : null;
      if (!dockerfile) return err(`ERROR: failed to read Dockerfile: no Dockerfile found in ${path}\n`);
      const fromM = dockerfile.content.match(/FROM\s+(\S+)/);
      const { repo, tag } = splitImage(tagRef);
      if (!findImage(d, tagRef)) d.images.push({ repo, tag, size: '14MB', id: newId(d).slice(0, 12) });
      const steps = dockerfile.content.split('\n').filter((l) => l.trim() && !l.startsWith('#'));
      let o = `[+] Building 1.2s\n => [1/${steps.length}] FROM ${fromM ? fromM[1] : 'scratch'}\n`;
      steps.slice(1).forEach((s, i) => (o += ` => [${i + 2}/${steps.length}] ${s}\n`));
      o += ` => naming to docker.io/library/${repo}:${tag}\n`;
      return ok(o);
    }

    if (sub === '--version' || sub === 'version') return ok('Docker version 27.0 (Terminal Quest simulated)\n');

    return err(`docker: '${sub || ''}' is not supported here.\nSupported: pull, images, run, ps [-a], stop, start, rm, rmi, logs, exec, build -t\n`);
  };
})();
