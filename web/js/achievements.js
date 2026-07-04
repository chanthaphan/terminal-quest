/* Terminal Quest — achievements + codex catalog */
(function () {
  const CLIQ = window.CLIQ;

  // event = { type: 'task'|'quest', questId, moduleId, boss, hearts, hintsThisQuest }
  CLIQ.achievementDefs = [
    { id: 'first-blood', icon: '🩸', title: 'First Blood', desc: 'Complete your first task', test: (s, e) => e.type === 'task' },
    { id: 'pipe-weaver', icon: '🪄', title: 'Pipe Weaver', desc: 'Master the pipe (finish The Pipe Weaver)', test: (s, e) => e.type === 'quest' && e.questId === 'bash-4' },
    { id: 'flawless', icon: '💎', title: 'Flawless Victory', desc: 'Defeat a boss without losing a heart', test: (s, e) => e.type === 'quest' && e.boss && e.hearts === 3 },
    { id: 'unaided', icon: '🧠', title: 'Unaided Mind', desc: 'Finish a 4+ task quest without hints', test: (s, e) => e.type === 'quest' && e.taskCount >= 4 && e.hintsThisQuest === 0 },
    { id: 'incident', icon: '🚨', title: 'Incident Commander', desc: 'Resolve the Silent Server outage', test: (s, e) => e.type === 'quest' && e.questId === 'net-boss' },
    { id: 'self-healer', icon: '♻️', title: 'Self-Healer', desc: 'Watch Kubernetes resurrect a pod (Legion of Replicas)', test: (s, e) => e.type === 'quest' && e.questId === 'k8s-4' },
    { id: 'spell-collector', icon: '📖', title: 'Spell Collector', desc: 'Use 30 different commands', test: (s) => (s.usedCmds || []).length >= 30 },
    { id: 'realm-bash', icon: '🏛️', title: 'Sanctum Conqueror', desc: 'Defeat the Shade of the Sanctum', test: (s, e) => e.type === 'quest' && e.questId === 'bash-boss' },
    { id: 'realm-remote', icon: '🌉', title: 'Bridge Warden', desc: 'Defeat the Silent Server', test: (s, e) => e.type === 'quest' && e.questId === 'net-boss' },
    { id: 'realm-concepts', icon: '🧭', title: 'Labyrinth Walker', desc: 'Defeat the Labyrinth Guardian', test: (s, e) => e.type === 'quest' && e.questId === 'con-boss' },
    { id: 'realm-azure', icon: '☁️', title: 'Citadel Champion', desc: 'Defeat the Warden of the Citadel', test: (s, e) => e.type === 'quest' && e.questId === 'az-boss' },
    { id: 'realm-k8s', icon: '⚙️', title: 'Wyrmslayer', desc: 'Defeat the Chaos Wyrm', test: (s, e) => e.type === 'quest' && e.questId === 'k8s-boss' },
    { id: 'realm-git', icon: '📜', title: 'Chronicle Keeper', desc: 'Defeat the Merge Wraith', test: (s, e) => e.type === 'quest' && e.questId === 'git-boss' },
    { id: 'realm-docker', icon: '🐳', title: 'Foundry Master', desc: 'Defeat the Image Golem', test: (s, e) => e.type === 'quest' && e.questId === 'docker-boss' },
    { id: 'realm-ops', icon: '⚗️', title: 'Daemon Slayer', desc: 'Defeat the Runaway Daemon', test: (s, e) => e.type === 'quest' && e.questId === 'ops-boss' },
    { id: 'archmage', icon: '👑', title: 'Cloud Archmage', desc: 'Pass the Archmage Trial', test: (s, e) => e.type === 'quest' && e.questId === 'final-boss' },
  ];

  CLIQ.checkAchievements = function (event) {
    const G = CLIQ.game;
    const earned = [];
    for (const def of CLIQ.achievementDefs) {
      if (G.state.achievements[def.id]) continue;
      let hit = false;
      try { hit = def.test(G.state, event); } catch (e) {}
      if (hit) {
        G.state.achievements[def.id] = true;
        earned.push(def);
      }
    }
    if (earned.length) {
      G.save();
      earned.forEach((def, i) => setTimeout(() => G.achievementToast(def), i * 900));
    }
  };

  // ---- codex: every teachable command, grouped ----
  CLIQ.codex = [
    { group: '🏛️ Files & Navigation', cmds: { pwd: 'print working directory', ls: 'list files (-l long, -a hidden)', cd: 'change directory', cat: 'print file contents', mkdir: 'create directory (-p parents)', touch: 'create empty file', rm: 'delete (-r recursive) — forever!', cp: 'copy files (-r for dirs)', mv: 'move / rename', chmod: 'change permissions (+x, 755)', find: 'find files by name/type' } },
    { group: '📝 Text Wrangling', cmds: { echo: 'print text (> redirects to file)', grep: 'search text (-i -n -v -c -r)', head: 'first lines (-n N)', tail: 'last lines (-n N)', wc: 'count lines/words/chars', sort: 'sort lines (-n -r -u)', uniq: 'dedupe adjacent lines (-c counts)', cut: 'extract columns (-d delim -f N)', awk: 'field processor {print $N}', sed: 'stream editor s/old/new/g' } },
    { group: '🌉 Network & Remote', cmds: { ping: 'is it alive? (-c count)', traceroute: 'path of routers to a host', dig: 'DNS lookup (+short)', nslookup: 'DNS lookup, classic flavor', curl: 'HTTP requests (-I headers)', ssh: 'shell on a remote machine', scp: 'copy files over ssh', netstat: 'listening ports', ss: 'listening ports (modern)', nc: 'probe a port (-zv host port)', ip: 'addresses (addr) & routes (route)', hostname: 'machine name (-I for IP)', systemctl: 'service status/start/restart' } },
    { group: '📜 Git', cmds: { 'git init': 'create a repository', 'git status': 'what changed?', 'git add': 'stage changes', 'git commit': 'record a snapshot (-m msg)', 'git log': 'history (--oneline)', 'git branch': 'list / create branches', 'git checkout': 'switch branches (-b new)', 'git merge': 'weave a branch into yours', 'git diff': 'unstaged changes' } },
    { group: '🐳 Docker', cmds: { 'docker pull': 'download an image', 'docker images': 'list local images', 'docker run': 'start a container (-d --name -p)', 'docker ps': 'list containers (-a for all)', 'docker stop': 'stop a container', 'docker start': 'start it again', 'docker rm': 'remove a container', 'docker logs': 'container output', 'docker exec': 'run a command inside', 'docker build': 'image from a Dockerfile (-t)' } },
    { group: '⚗️ Processes & System', cmds: { ps: 'process list', top: 'live process view (by CPU)', kill: 'terminate by PID', df: 'disk free by filesystem (-h)', du: 'disk usage of a path (-sh)', free: 'memory usage (-h)', tar: 'archive files (-czf) / list (-tzf)', crontab: 'scheduled jobs (-l)' } },
    { group: '☁️ Azure CLI', cmds: { 'az login': 'authenticate', 'az account': 'subscription info', 'az group': 'resource groups (create/list/delete)', 'az vm': 'virtual machines (create/stop/deallocate)', 'az storage': 'storage accounts', 'az aks': 'AKS clusters (create/get-credentials)' } },
    { group: '⚙️ Kubernetes', cmds: { 'kubectl get': 'list resources (pods/nodes/deploy/svc, -n, -A)', 'kubectl describe': 'full story + Events', 'kubectl logs': 'container output', 'kubectl scale': 'set replica count', 'kubectl delete pod': 'kill a pod (it comes back!)', 'kubectl rollout': 'status/restart of a rollout', 'kubectl set image': 'change a deployment image', 'kubectl apply': 'declare state from YAML (-f)' } },
  ];
})();
