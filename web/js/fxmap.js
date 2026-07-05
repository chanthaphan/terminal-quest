/* Terminal Quest — command→effect routing, shared by the DOM and WebGL stages.
   Pure function of a terminal event {cmd, raw, argv, code}; returns an effect kind:
   'scan' | 'read' | 'conjure' | 'write' | 'transform' | 'slash' | 'step' | 'portal'
   | 'proj:#rrggbb'  (projectile with a color). */
(function () {
  const CLIQ = (window.CLIQ = window.CLIQ || {});

  CLIQ.fxFor = function (e) {
    const sub = e.argv && e.argv[1];
    if (e.cmd === 'git')
      return { status: 'scan', log: 'scan', branch: 'scan', diff: 'scan', init: 'conjure', add: 'write', commit: 'write', merge: 'transform', checkout: 'step', switch: 'step' }[sub] || 'transform';
    if (e.cmd === 'docker')
      return { ps: 'scan', images: 'scan', pull: 'proj:#7dd3fc', run: 'conjure', start: 'transform', restart: 'transform', stop: 'transform', rm: 'slash', rmi: 'slash', logs: 'read', exec: 'transform', build: 'conjure' }[sub] || 'scan';
    if (e.cmd === 'kubectl')
      return { get: 'scan', describe: 'read', logs: 'read', scale: 'conjure', delete: 'slash', set: 'transform', apply: 'conjure', rollout: 'transform', config: 'scan' }[sub] || 'scan';
    if (e.cmd === 'az') {
      if (e.raw.includes(' delete')) return 'slash';
      if (e.raw.includes(' create')) return 'conjure';
      if (/ (list|show)\b/.test(e.raw)) return 'scan';
      if (sub === 'login') return 'write';
      return 'transform';
    }
    return {
      cd: 'step', ssh: 'portal', exit: 'portal',
      ls: 'scan', find: 'scan', grep: 'scan', ps: 'scan', top: 'scan', df: 'scan', du: 'scan', free: 'scan',
      ss: 'scan', netstat: 'scan', pwd: 'scan', whoami: 'scan', hostname: 'scan', history: 'scan',
      env: 'scan', which: 'scan', crontab: 'scan', ip: 'scan', ifconfig: 'scan',
      cat: 'read', head: 'read', tail: 'read', man: 'read', help: 'read', wc: 'read',
      mkdir: 'conjure', touch: 'conjure', cp: 'conjure', tar: 'conjure',
      echo: 'write',
      sed: 'transform', awk: 'transform', sort: 'transform', uniq: 'transform', cut: 'transform',
      chmod: 'transform', mv: 'transform', bash: 'transform', sh: 'transform', systemctl: 'transform',
      rm: 'slash', kill: 'slash',
      ping: 'proj:#22d3ee', traceroute: 'proj:#22d3ee', nc: 'proj:#22d3ee',
      dig: 'proj:#c084fc', nslookup: 'proj:#c084fc',
      curl: 'proj:#fb923c', scp: 'proj:#4ade80',
    }[e.cmd] || 'scan';
  };
})();
