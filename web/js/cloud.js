/* Terminal Quest — simulated Azure CLI (az) and kubectl */
(function () {
  const CLIQ = window.CLIQ;
  const C = CLIQ.commands;
  const ok = (out) => ({ out: out || '', code: 0 });
  const err = (out) => ({ out: out || '', code: 1 });

  function opt(argv, name) {
    const i = argv.indexOf(name);
    if (i >= 0) return argv[i + 1];
    const eq = argv.find((x) => x.startsWith(name + '='));
    return eq ? eq.slice(name.length + 1) : null;
  }
  function jsonOut(obj) {
    return ok(JSON.stringify(obj, null, 2) + '\n');
  }

  // ---- az -----------------------------------------------------------------

  C.az = (a, w) => {
    const az = w.azure;
    const [g1, g2] = a;

    if (g1 === 'login') {
      az.loggedIn = true;
      return ok(
        'Opening a portal rift in your browser... (simulated)\nYou have logged in.\n' +
        JSON.stringify([{ cloudName: 'AzureCloud', id: az.sub.id, name: az.sub.name, state: 'Enabled', user: { name: 'hero@quest.dev' } }], null, 2) + '\n'
      );
    }
    if (!az.loggedIn) return err("Please run 'az login' to setup account.\n");

    if (g1 === 'account') {
      if (g2 === 'show') return jsonOut({ id: az.sub.id, name: az.sub.name, state: 'Enabled', tenantId: 'tttt-1111', user: { name: 'hero@quest.dev' } });
      if (g2 === 'list') return jsonOut([{ id: az.sub.id, name: az.sub.name, isDefault: true }]);
      return err("az account: try 'show' or 'list'\n");
    }

    if (g1 === 'group') {
      if (g2 === 'create') {
        const name = opt(a, '--name') || opt(a, '-n');
        const loc = opt(a, '--location') || opt(a, '-l');
        if (!name || !loc) return err('az group create: --name and --location are required\n');
        az.groups[name] = { name, location: loc };
        return jsonOut({ id: `/subscriptions/${az.sub.id}/resourceGroups/${name}`, location: loc, name, properties: { provisioningState: 'Succeeded' } });
      }
      if (g2 === 'list') {
        const gs = Object.values(az.groups);
        if (a.includes('table')) {
          let o = 'Name          Location       Status\n------------  -------------  ---------\n';
          gs.forEach((g) => (o += `${g.name.padEnd(14)}${g.location.padEnd(15)}Succeeded\n`));
          return ok(gs.length ? o : 'Name    Location    Status\n(no resource groups yet)\n');
        }
        return jsonOut(gs.map((g) => ({ name: g.name, location: g.location, properties: { provisioningState: 'Succeeded' } })));
      }
      if (g2 === 'delete') {
        const name = opt(a, '--name') || opt(a, '-n');
        if (!name || !az.groups[name]) return err(`Resource group '${name}' could not be found.\n`);
        delete az.groups[name];
        for (const k of Object.keys(az.vms)) if (az.vms[k].rg === name) delete az.vms[k];
        return ok('');
      }
      return err("az group: try 'create', 'list' or 'delete'\n");
    }

    if (g1 === 'vm') {
      if (g2 === 'create') {
        const name = opt(a, '--name') || opt(a, '-n');
        const rg = opt(a, '--resource-group') || opt(a, '-g');
        const image = opt(a, '--image') || 'Ubuntu2204';
        if (!name || !rg) return err('az vm create: --name and --resource-group are required\n');
        if (!az.groups[rg]) return err(`Resource group '${rg}' could not be found. Create it first with az group create.\n`);
        az.vms[name] = { name, rg, image, power: 'VM running', ip: '20.30.40.' + (10 + Object.keys(az.vms).length) };
        return jsonOut({ fqdns: '', id: `/subscriptions/${az.sub.id}/resourceGroups/${rg}/providers/Microsoft.Compute/virtualMachines/${name}`, location: az.groups[rg].location, name, powerState: 'VM running', publicIpAddress: az.vms[name].ip, resourceGroup: rg });
      }
      if (g2 === 'list') {
        const vms = Object.values(az.vms);
        if (a.includes('table')) {
          let o = 'Name       ResourceGroup    Location\n---------  ---------------  ----------\n';
          vms.forEach((v) => (o += `${v.name.padEnd(11)}${v.rg.padEnd(17)}${az.groups[v.rg] ? az.groups[v.rg].location : '?'}\n`));
          return ok(o);
        }
        return jsonOut(vms.map((v) => ({ name: v.name, resourceGroup: v.rg, powerState: v.power, publicIps: v.ip })));
      }
      if (g2 === 'show' || g2 === 'stop' || g2 === 'start' || g2 === 'deallocate') {
        const name = opt(a, '--name') || opt(a, '-n');
        const vm = az.vms[name];
        if (!vm) return err(`The VM '${name}' was not found.\n`);
        if (g2 === 'stop') { vm.power = 'VM stopped'; return ok('VM stopped. (Note: stopped VMs still incur compute charges — use deallocate to stop billing.)\n'); }
        if (g2 === 'deallocate') { vm.power = 'VM deallocated'; return ok(''); }
        if (g2 === 'start') { vm.power = 'VM running'; return ok(''); }
        return jsonOut({ name: vm.name, resourceGroup: vm.rg, powerState: vm.power, publicIpAddress: vm.ip, image: vm.image });
      }
      return err("az vm: try 'create', 'list', 'show', 'start', 'stop', 'deallocate'\n");
    }

    if (g1 === 'storage') {
      if (g2 === 'account' && a[2] === 'create') {
        const name = opt(a, '--name') || opt(a, '-n');
        const rg = opt(a, '--resource-group') || opt(a, '-g');
        if (!name || !rg) return err('az storage account create: --name and --resource-group are required\n');
        if (!/^[a-z0-9]{3,24}$/.test(name)) return err(`${name} is not a valid storage account name. Names must be 3-24 chars, lowercase letters and numbers only (globally unique).\n`);
        if (!az.groups[rg]) return err(`Resource group '${rg}' could not be found.\n`);
        az.storage[name] = { name, rg };
        return jsonOut({ name, resourceGroup: rg, primaryEndpoints: { blob: `https://${name}.blob.core.windows.net/` }, provisioningState: 'Succeeded' });
      }
      if (g2 === 'account' && a[2] === 'list') return jsonOut(Object.values(az.storage).map((s) => ({ name: s.name, resourceGroup: s.rg })));
      return err("az storage: try 'account create' or 'account list'\n");
    }

    if (g1 === 'aks') {
      if (g2 === 'create') {
        const name = opt(a, '--name') || opt(a, '-n');
        const rg = opt(a, '--resource-group') || opt(a, '-g');
        const count = parseInt(opt(a, '--node-count') || '3', 10);
        if (!name || !rg) return err('az aks create: --name and --resource-group are required\n');
        if (!az.groups[rg]) return err(`Resource group '${rg}' could not be found.\n`);
        az.aks[name] = { name, rg, count, version: '1.30.3' };
        return jsonOut({ name, resourceGroup: rg, agentPoolProfiles: [{ count, name: 'nodepool1', vmSize: 'Standard_DS2_v2' }], kubernetesVersion: '1.30.3', provisioningState: 'Succeeded', fqdn: `${name}-dns.hcp.southeastasia.azmk8s.io` });
      }
      if (g2 === 'list') {
        if (a.includes('table')) {
          let o = 'Name       ResourceGroup    KubernetesVersion    NodeCount\n---------  ---------------  -------------------  ---------\n';
          Object.values(az.aks).forEach((c) => (o += `${c.name.padEnd(11)}${c.rg.padEnd(17)}${c.version.padEnd(21)}${c.count}\n`));
          return ok(o);
        }
        return jsonOut(Object.values(az.aks).map((c) => ({ name: c.name, resourceGroup: c.rg, kubernetesVersion: c.version, nodeCount: c.count })));
      }
      if (g2 === 'get-credentials') {
        const name = opt(a, '--name') || opt(a, '-n');
        if (!az.aks[name]) return err(`The cluster '${name}' was not found. Create it with az aks create.\n`);
        w.kubeConnected = true;
        w.k8s.context = name;
        return ok(`Merged "${name}" as current context in /home/hero/.kube/config\n`);
      }
      if (g2 === 'scale') {
        const name = opt(a, '--name') || opt(a, '-n');
        const count = parseInt(opt(a, '--node-count') || '0', 10);
        if (!az.aks[name]) return err(`The cluster '${name}' was not found.\n`);
        if (!count) return err('az aks scale: --node-count is required\n');
        az.aks[name].count = count;
        return jsonOut({ name, agentPoolProfiles: [{ count, name: 'nodepool1' }], provisioningState: 'Succeeded' });
      }
      return err("az aks: try 'create', 'list', 'get-credentials', 'scale'\n");
    }

    if (g1 === '--version') return ok('azure-cli    2.62.0 (Terminal Quest simulated)\n');
    return err(`az: '${g1 || ''}' is not a recognized command group here.\nSupported: login, account, group, vm, storage, aks\n`);
  };

  // ---- kubectl --------------------------------------------------------------

  function pad(s, n) { return String(s).padEnd(n); }

  C.kubectl = (a, w) => {
    const k = w.k8s;
    if (!w.kubeConnected) {
      return err('The connection to the server localhost:8080 was refused.\nHint: connect to a cluster first (az aks get-credentials --resource-group <rg> --name <cluster>).\n');
    }
    const sub = a[0];
    const nsFlag = opt(a, '-n') || opt(a, '--namespace') || (a.includes('-A') || a.includes('--all-namespaces') ? '*' : 'default');

    function podsIn(ns) {
      if (ns === '*') return Object.values(k.namespaces).flatMap((n) => n.pods);
      return (k.namespaces[ns] || { pods: [] }).pods;
    }
    function findPod(name, ns) {
      for (const nsName of ns === '*' ? Object.keys(k.namespaces) : [ns]) {
        const p = (k.namespaces[nsName] || { pods: [] }).pods.find((x) => x.name === name);
        if (p) return p;
      }
      return null;
    }
    function findDeploy(name, ns) {
      const nsObj = k.namespaces[ns];
      return nsObj ? nsObj.deployments[name] : null;
    }
    function syncPods(d) {
      const nsObj = k.namespaces[d.nsName || findNsOf(d)];
    }
    function findNsOf(d) {
      for (const nsName of Object.keys(k.namespaces)) if (k.namespaces[nsName].deployments[d.name] === d) return nsName;
      return 'default';
    }
    function reconcile(ns) {
      const nsObj = k.namespaces[ns];
      for (const dName of Object.keys(nsObj.deployments)) {
        const d = nsObj.deployments[dName];
        let pods = nsObj.pods.filter((p) => p.deploy === dName);
        while (pods.length < d.replicas) {
          const newPods = CLIQ.makePods({ ...d, replicas: 1, serial: (d.serial = (d.serial || 0) + 1) - 1 }, ns);
          newPods.forEach((p) => { p.deploy = dName; p.status = d.broken ? 'CrashLoopBackOff' : 'Running'; p.image = d.image; p.restarts = d.broken ? 1 : 0; });
          nsObj.pods.push(...newPods);
          pods = nsObj.pods.filter((p) => p.deploy === dName);
        }
        while (pods.length > d.replicas) {
          const victim = pods.pop();
          nsObj.pods.splice(nsObj.pods.indexOf(victim), 1);
        }
        pods.forEach((p) => { p.status = d.broken ? 'CrashLoopBackOff' : 'Running'; p.image = d.image; if (!d.broken && p.status === 'Running' && p.wasBroken) { p.restarts++; p.wasBroken = false; } });
      }
    }

    if (sub === 'config') {
      if (a[1] === 'current-context') return ok(k.context + '\n');
      if (a[1] === 'get-contexts') return ok(`CURRENT   NAME        CLUSTER\n*         ${pad(k.context, 11)}${k.context}\n`);
      return err('kubectl config: try current-context | get-contexts\n');
    }

    if (sub === 'get') {
      const kind = (a[1] || '').replace(/s$/, '');
      if (!a[1]) return err('kubectl get: you must specify a resource (nodes, pods, deployments, services, namespaces)\n');
      if (kind === 'node' || a[1] === 'no') {
        let o = `${pad('NAME', 20)}${pad('STATUS', 9)}${pad('ROLES', 8)}${pad('AGE', 6)}VERSION\n`;
        k.nodes.forEach((n) => (o += `${pad(n.name, 20)}${pad(n.status, 9)}${pad(n.roles, 8)}${pad('7d', 6)}${n.version}\n`));
        return ok(o);
      }
      if (kind === 'namespace' || a[1] === 'ns') {
        let o = `${pad('NAME', 16)}${pad('STATUS', 9)}AGE\n`;
        Object.keys(k.namespaces).forEach((n) => (o += `${pad(n, 16)}${pad('Active', 9)}7d\n`));
        return ok(o);
      }
      if (kind === 'pod' || a[1] === 'po') {
        const pods = podsIn(nsFlag);
        if (!pods.length) return ok(`No resources found in ${nsFlag} namespace.\n`);
        const showNs = nsFlag === '*';
        let o = (showNs ? pad('NAMESPACE', 14) : '') + `${pad('NAME', 26)}${pad('READY', 7)}${pad('STATUS', 19)}${pad('RESTARTS', 10)}AGE\n`;
        pods.forEach((p) => {
          const ready = p.status === 'Running' ? '1/1' : '0/1';
          o += (showNs ? pad(p.ns, 14) : '') + `${pad(p.name, 26)}${pad(ready, 7)}${pad(p.status, 19)}${pad(p.restarts, 10)}2h\n`;
        });
        return ok(o);
      }
      if (kind === 'deployment' || a[1] === 'deploy') {
        const nss = nsFlag === '*' ? Object.keys(k.namespaces) : [nsFlag];
        let o = (nsFlag === '*' ? pad('NAMESPACE', 14) : '') + `${pad('NAME', 14)}${pad('READY', 8)}${pad('UP-TO-DATE', 12)}${pad('AVAILABLE', 11)}AGE\n`;
        let count = 0;
        for (const ns of nss) {
          const nsObj = k.namespaces[ns];
          if (!nsObj) return err(`Error from server (NotFound): namespaces "${ns}" not found\n`);
          for (const d of Object.values(nsObj.deployments)) {
            const ready = d.broken ? 0 : d.replicas;
            o += (nsFlag === '*' ? pad(ns, 14) : '') + `${pad(d.name, 14)}${pad(ready + '/' + d.replicas, 8)}${pad(d.replicas, 12)}${pad(ready, 11)}2h\n`;
            count++;
          }
        }
        return ok(count ? o : `No resources found in ${nsFlag} namespace.\n`);
      }
      if (kind === 'service' || a[1] === 'svc') {
        const nss = nsFlag === '*' ? Object.keys(k.namespaces) : [nsFlag];
        let o = `${pad('NAME', 16)}${pad('TYPE', 14)}${pad('CLUSTER-IP', 14)}${pad('EXTERNAL-IP', 14)}PORT(S)\n`;
        let count = 0;
        for (const ns of nss) {
          const nsObj = k.namespaces[ns];
          if (!nsObj) continue;
          for (const s of Object.values(nsObj.services)) {
            o += `${pad(s.name, 16)}${pad(s.type, 14)}${pad(s.clusterIP, 14)}${pad(s.externalIP, 14)}${s.ports}\n`;
            count++;
          }
        }
        return ok(count ? o : `No resources found in ${nsFlag} namespace.\n`);
      }
      return err(`error: the server doesn't have a resource type "${a[1]}"\n`);
    }

    if (sub === 'describe') {
      const kind = (a[1] || '').replace(/s$/, '');
      const name = a[2];
      if (kind === 'pod') {
        const p = findPod(name, nsFlag);
        if (!p) return err(`Error from server (NotFound): pods "${name}" not found in namespace "${nsFlag}"\n`);
        const d = findDeploy(p.deploy, p.ns);
        let events = '  Normal   Scheduled  Successfully assigned to ' + p.node + '\n';
        if (p.status !== 'Running') {
          events += `  Normal   Pulling    Pulling image "${p.image}"\n`;
          events += `  Warning  Failed     Failed to pull image "${p.image}": manifest unknown: tag not found\n`;
          events += `  Warning  BackOff    Back-off restarting failed container\n`;
        } else {
          events += `  Normal   Pulled     Container image "${p.image}" already present\n  Normal   Started    Started container\n`;
        }
        return ok(
          `Name:         ${p.name}\nNamespace:    ${p.ns}\nNode:         ${p.node}\nStatus:       ${p.status === 'Running' ? 'Running' : 'Pending'}\nControlled By: Deployment/${p.deploy}\nContainers:\n  ${p.deploy}:\n    Image:   ${p.image}\n    State:   ${p.status === 'Running' ? 'Running' : 'Waiting (CrashLoopBackOff)'}\n    Restarts: ${p.restarts}\nEvents:\n  Type     Reason     Message\n  ----     ------     -------\n${events}`
        );
      }
      if (kind === 'deployment') {
        const d = findDeploy(name, nsFlag);
        if (!d) return err(`Error from server (NotFound): deployments "${name}" not found in namespace "${nsFlag}"\n`);
        return ok(`Name:      ${name}\nNamespace: ${nsFlag}\nReplicas:  ${d.replicas} desired | ${d.broken ? 0 : d.replicas} available\nImage:     ${d.image}\nStrategy:  RollingUpdate\n`);
      }
      return err('kubectl describe: try `describe pod NAME` or `describe deployment NAME`\n');
    }

    if (sub === 'logs') {
      const name = a[1];
      const p = name && findPod(name, nsFlag === 'default' ? '*' : nsFlag);
      if (!p) return err(`error from server (NotFound): pods "${name || ''}" not found\n`);
      if (p.status !== 'Running')
        return ok(`Starting shop-payment 1.2.3...\nFATAL: config key PAYMENT_GATEWAY_URL missing — image tag "${p.image.split(':')[1]}" was never published\nprocess exited with code 1\n`);
      return ok(`[info] ${p.deploy} listening on :8080\n[info] readiness probe ok\n[info] serving requests for realm "${p.ns}"\n`);
    }

    if (sub === 'scale') {
      const target = (a[1] || '').includes('/') ? a[1] : a[1] === 'deployment' ? 'deployment/' + a[2] : a[1];
      const m = (target || '').match(/^deployment\/(.+)$/);
      const replicas = parseInt(opt(a, '--replicas') || 'x', 10);
      if (!m || isNaN(replicas)) return err('usage: kubectl scale deployment/NAME --replicas=N  (or --replicas N)\n');
      const d = findDeploy(m[1], nsFlag);
      if (!d) return err(`Error from server (NotFound): deployments "${m[1]}" not found in namespace "${nsFlag}"\n`);
      d.replicas = replicas;
      reconcile(nsFlag);
      return ok(`deployment.apps/${m[1]} scaled\n`);
    }

    if (sub === 'delete') {
      if ((a[1] || '').replace(/s$/, '') === 'pod') {
        const name = a[2];
        const p = findPod(name, nsFlag);
        if (!p) return err(`Error from server (NotFound): pods "${name}" not found\n`);
        const nsObj = k.namespaces[p.ns];
        nsObj.pods.splice(nsObj.pods.indexOf(p), 1);
        reconcile(p.ns); // deployment recreates it
        return ok(`pod "${name}" deleted\n`);
      }
      return err('kubectl delete: only `delete pod NAME` is needed on this quest\n');
    }

    if (sub === 'rollout') {
      const action = a[1];
      const m = (a[2] || '').match(/^deployment\/(.+)$/) || (a[2] === 'deployment' ? { 1: a[3] } : null);
      const dName = m && m[1];
      const d = dName && findDeploy(dName, nsFlag);
      if (!d) return err('usage: kubectl rollout status|restart|history deployment/NAME\n');
      if (action === 'status') {
        if (d.broken) return err(`Waiting for deployment "${dName}" rollout to finish: 0 of ${d.replicas} updated replicas are available...\nerror: deployment "${dName}" exceeded its progress deadline\n`);
        return ok(`deployment "${dName}" successfully rolled out\n`);
      }
      if (action === 'restart') {
        reconcile(nsFlag);
        return ok(`deployment.apps/${dName} restarted\n`);
      }
      if (action === 'history') return ok(`deployment.apps/${dName}\nREVISION  CHANGE-CAUSE\n1         <none>\n2         kubectl set image\n`);
      return err('kubectl rollout: try status | restart | history\n');
    }

    if (sub === 'set' && a[1] === 'image') {
      const m = (a[2] || '').match(/^deployment\/(.+)$/);
      const assign = a[3] || '';
      const [container, image] = assign.split('=');
      if (!m || !image) return err('usage: kubectl set image deployment/NAME CONTAINER=IMAGE:TAG\n');
      const d = findDeploy(m[1], nsFlag);
      if (!d) return err(`Error from server (NotFound): deployments "${m[1]}" not found in namespace "${nsFlag}"\n`);
      d.image = image;
      d.broken = /bad|broken|unknown/.test(image);
      k.namespaces[nsFlag].pods.filter((p) => p.deploy === d.name).forEach((p) => (p.wasBroken = p.status !== 'Running'));
      reconcile(nsFlag);
      return ok(`deployment.apps/${m[1]} image updated\n`);
    }

    if (sub === 'apply') {
      const f = opt(a, '-f');
      if (!f) return err('kubectl apply: -f FILE is required\n');
      const node = CLIQ.getNode(w, f);
      if (!node) return err(`error: the path "${f}" does not exist\n`);
      const nameM = node.content.match(/name:\s*(\S+)/);
      const kindM = node.content.match(/kind:\s*(\S+)/);
      const replM = node.content.match(/replicas:\s*(\d+)/);
      const imgM = node.content.match(/image:\s*(\S+)/);
      if (!nameM || !kindM) return err('error: unable to decode manifest: missing kind or metadata.name\n');
      const name = nameM[1];
      if (kindM[1] === 'Deployment') {
        const nsObj = k.namespaces[nsFlag] || k.namespaces['default'];
        let d = nsObj.deployments[name];
        if (!d) {
          d = { name, replicas: replM ? +replM[1] : 1, image: imgM ? imgM[1] : name + ':latest', serial: 0, broken: false };
          nsObj.deployments[name] = d;
        } else {
          if (replM) d.replicas = +replM[1];
          if (imgM) { d.image = imgM[1]; d.broken = /bad|broken|unknown/.test(d.image); }
        }
        reconcile(nsFlag === '*' ? 'default' : nsFlag);
        return ok(`deployment.apps/${name} ${d.serial ? 'configured' : 'created'}\n`);
      }
      return ok(`${kindM[1].toLowerCase()}/${name} created\n`);
    }

    if (sub === 'cluster-info') return ok(`Kubernetes control plane is running at https://${k.context}-dns.hcp.southeastasia.azmk8s.io:443\nCoreDNS is running at .../kube-dns\n`);

    if (sub === 'version') return ok('Client Version: v1.30.3\nServer Version: v1.30.3 (Terminal Quest simulated)\n');

    return err(`kubectl: unknown or unsupported command "${sub || ''}"\nSupported here: get, describe, logs, scale, delete pod, rollout, set image, apply -f, config, cluster-info\n`);
  };
})();
