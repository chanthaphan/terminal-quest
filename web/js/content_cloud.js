/* Terminal Quest — Realm 4: Azure Citadel (az) + Realm 5: Kube Keep (kubectl) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  // ---- Realm 4: Azure CLI ---------------------------------------------------

  CLIQ.modules.push({
    id: 'azure',
    icon: '☁️',
    title: 'The Azure Citadel',
    tagline: 'command the cloud: az login, groups, VMs, AKS',
    quests: [
      {
        id: 'az-1',
        title: 'The Citadel Gates',
        story:
          'Above the realms floats the <b>Azure Citadel</b> — machines you summon with words alone. ' +
          'Its language is the <code>az</code> CLI. Everything you own lives inside a <b>subscription</b> (the billing boundary), ' +
          'and nothing answers until you prove who you are.',
        outro: 'The gates know your name. The cloud awaits your commands.',
        tasks: [
          {
            text: 'Present yourself at the gates: <code>az login</code>.',
            hint: 'Type: <code>az login</code>',
            check: (e) => e.cmd === 'az' && e.world.azure.loggedIn,
            success: 'Authenticated as hero@quest.dev. Real az opens a browser for this.',
          },
          {
            text: 'Inspect which subscription you are commanding: <code>az account show</code>.',
            hint: 'Type: <code>az account show</code>',
            check: (e) => e.cmd === 'az' && e.out.includes('Quest-Subscription'),
            success: 'az answers in JSON by default — machines and scripts love it.',
          },
          {
            quiz: {
              question: 'What is an Azure <b>subscription</b>?',
              choices: [
                'A billing + access boundary that contains all your resources',
                'A monthly email newsletter from Microsoft',
                'A single virtual machine',
                'A copy of your local files in the cloud',
              ],
              answer: 0,
              explain: 'Hierarchy: Tenant → Subscription(s) → Resource Groups → Resources. The subscription is where the bill lands.',
            },
            text: 'The gatekeeper asks:',
          },
        ],
      },
      {
        id: 'az-2',
        title: 'Claiming Land',
        story:
          'Nothing in Azure floats free: every resource must live in a <b>resource group</b> — a labeled plot of land. ' +
          'Delete the plot, and everything on it vanishes with it. Choose a <b>region</b> (location) wisely; that is where your machines physically live.',
        outro: 'You hold land in the cloud.',
        tasks: [
          {
            text: 'Claim a plot named <code>quest-rg</code> in <code>southeastasia</code>: <code>az group create --name quest-rg --location southeastasia</code>.',
            hint: 'Type: <code>az group create --name quest-rg --location southeastasia</code>',
            check: (e) => !!e.world.azure.groups['quest-rg'],
            success: 'provisioningState: Succeeded — the land is yours.',
          },
          {
            text: 'Survey your holdings, human-readably: <code>az group list -o table</code>. (<code>-o table</code> beats raw JSON for eyeballs.)',
            hint: 'Type: <code>az group list -o table</code>',
            check: (e) => e.cmd === 'az' && e.raw.includes('list') && e.out.includes('quest-rg'),
          },
          {
            quiz: {
              question: 'Why put related resources (VM + disk + network) in ONE resource group?',
              choices: [
                'Shared lifecycle: manage, tag, and delete them together',
                'It makes the VMs run faster',
                'Azure requires exactly one group per subscription',
                'It encrypts them automatically',
              ],
              answer: 0,
              explain: 'A resource group is a lifecycle boundary — "everything for project X" lives and dies together.',
            },
            text: 'The land registrar asks:',
          },
        ],
      },
      {
        id: 'az-3',
        title: 'Summoning Golems',
        story:
          'Now summon a <b>golem</b> — a virtual machine. One incantation conjures CPU, memory, disk, and a public IP. ' +
          'But beware: golems <i>cost gold every hour they exist</i>, and a "stopped" golem still holds its hardware.',
        outro: 'You summon and dismiss compute at will — and you know what it costs.',
        tasks: [
          {
            text: 'Summon a VM named <code>golem-01</code> on your land: <code>az vm create --resource-group quest-rg --name golem-01 --image Ubuntu2204 --generate-ssh-keys</code>.',
            hint: 'Type: <code>az vm create --resource-group quest-rg --name golem-01 --image Ubuntu2204 --generate-ssh-keys</code> (real Azure needs SSH keys for a Linux VM — this flag makes them for you)',
            check: (e) => !!e.world.azure.vms['golem-01'],
            success: 'The golem lives, with a public IP. In real Azure this takes a minute or two.',
          },
          {
            text: 'Muster your golems: <code>az vm list -o table</code>.',
            hint: 'Type: <code>az vm list -o table</code>',
            check: (e) => e.cmd === 'az' && e.out.includes('golem-01'),
          },
          {
            text: 'Halt it: <code>az vm stop -g quest-rg --name golem-01</code>. Read the warning it gives you. (Nearly every az vm command needs the resource group.)',
            hint: 'Type: <code>az vm stop -g quest-rg --name golem-01</code>',
            check: (e) => e.world.azure.vms['golem-01'] && e.world.azure.vms['golem-01'].power === 'VM stopped',
          },
          {
            text: 'Release its hardware so the gold stops draining: <code>az vm deallocate -g quest-rg --name golem-01</code>.',
            hint: 'Type: <code>az vm deallocate -g quest-rg --name golem-01</code>',
            check: (e) => e.world.azure.vms['golem-01'] && e.world.azure.vms['golem-01'].power === 'VM deallocated',
            success: 'Deallocated — compute billing stops (the disk still costs a little).',
          },
          {
            quiz: {
              question: 'Why does <code>az vm stop</code> still cost money while <code>deallocate</code> does not?',
              choices: [
                'Stopped VMs still reserve the physical hardware; deallocated ones release it',
                'stop is a paid premium command',
                'It does not — they are identical',
                'Deallocate deletes the VM entirely',
              ],
              answer: 0,
              explain: 'stop = OS shutdown, hardware kept warm. deallocate = give the hardware back. The #1 Azure bill surprise.',
            },
            text: 'The bursar of the Citadel asks:',
          },
        ],
      },
      {
        id: 'az-4',
        title: 'The Vault of Bytes',
        story:
          'Every realm needs a <b>vault</b> for its treasures: blobs, files, queues, tables. In Azure that is a ' +
          '<b>storage account</b>. Its name becomes a public URL (<code>NAME.blob.core.windows.net</code>) — ' +
          'so names must be <i>globally unique</i>, lowercase, 3–24 letters and numbers.',
        outro: 'Your bytes have a home with a worldwide address.',
        tasks: [
          {
            quiz: {
              question: 'Which is a LEGAL storage account name?',
              choices: ['queststore01', 'Quest-Store', 'qs', 'quest_store_official_backup_v2'],
              answer: 0,
              explain: 'Lowercase + digits only, 3–24 chars, no dashes/underscores — because it becomes a DNS hostname.',
              explainWrong: 'Remember: the name becomes part of a URL. No capitals, no dashes, 3–24 chars.',
            },
            text: 'The vault-keeper tests you before you build:',
          },
          {
            text: 'Forge the vault: <code>az storage account create --name queststore01 --resource-group quest-rg</code>.',
            hint: 'Type: <code>az storage account create --name queststore01 --resource-group quest-rg</code>',
            check: (e) => !!e.world.azure.storage['queststore01'],
            success: 'Endpoint minted: https://queststore01.blob.core.windows.net/',
          },
          {
            text: 'Confirm it stands: <code>az storage account list</code>.',
            hint: 'Type: <code>az storage account list</code>',
            check: (e) => e.cmd === 'az' && e.out.includes('queststore01'),
          },
        ],
      },
      {
        id: 'az-5',
        title: 'Forging the Sky Fortress',
        story:
          'The Citadel\'s greatest work: <b>AKS</b>, the Azure Kubernetes Service — a fortress that runs armies of containers for you. ' +
          'Azure builds and babysits the control plane; you command the fleet. ' +
          'One spell creates it, one spell hands you the keys (<code>kubeconfig</code>), and then <code>kubectl</code> becomes your voice.',
        outro: 'The Sky Fortress floats above your land. Realm 5 awaits inside it.',
        tasks: [
          {
            text: 'Raise the fortress: <code>az aks create --resource-group quest-rg --name quest-aks --node-count 3</code>.',
            hint: 'Type: <code>az aks create --resource-group quest-rg --name quest-aks --node-count 3</code>',
            check: (e) => !!e.world.azure.aks['quest-aks'],
            success: '3 worker nodes provisioning. (Real AKS takes ~5 minutes here.)',
          },
          {
            text: 'Behold it: <code>az aks list -o table</code>.',
            hint: 'Type: <code>az aks list -o table</code>',
            check: (e) => e.cmd === 'az' && e.out.includes('quest-aks'),
          },
          {
            text: 'Claim the keys — merge the cluster credentials into your kubeconfig: <code>az aks get-credentials --resource-group quest-rg --name quest-aks</code>.',
            hint: 'Type: <code>az aks get-credentials --resource-group quest-rg --name quest-aks</code>',
            check: (e) => e.world.kubeConnected,
            success: 'kubectl now knows how to reach quest-aks. This wrote ~/.kube/config.',
          },
          {
            text: 'Speak your first word to the fortress: <code>kubectl get nodes</code>.',
            hint: 'Type: <code>kubectl get nodes</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('aks-nodepool1-1'),
            success: 'Three nodes, Ready. The fortress answers.',
          },
          {
            quiz: {
              question: 'What did <code>az aks get-credentials</code> actually do?',
              choices: [
                'Wrote cluster address + auth into ~/.kube/config so kubectl can connect',
                'Created three new nodes',
                'Downloaded Kubernetes source code',
                'Gave your VM a password',
              ],
              answer: 0,
              explain: 'kubectl reads ~/.kube/config to know WHICH cluster to talk to and HOW to authenticate.',
            },
            text: 'Before you enter:',
          },
        ],
      },
      {
        id: 'az-boss',
        title: 'Warden of the Citadel',
        boss: true,
        story:
          'The <b>Warden</b> blocks the bridge to the Sky Fortress. It respects only those who wield the whole <code>az</code> arsenal — ' +
          'creation, inspection, and the discipline to <b>clean up after themselves</b> (the true mark of a cloud professional). ' +
          '<br><br>⚠️ <i>Wrong answers cost a heart.</i>',
        outro: 'The Warden steps aside. The cloud bends to your budget as well as your will. 🏆',
        setup(w) {
          if (!w.azure.loggedIn) w.azure.loggedIn = true;
        },
        tasks: [
          {
            quiz: {
              question: 'Order the Azure hierarchy, biggest to smallest:',
              choices: [
                'Subscription → Resource Group → Resource',
                'Resource → Subscription → Resource Group',
                'Resource Group → Subscription → Resource',
                'They are all the same level',
              ],
              answer: 0,
              explain: 'Subscription (billing) contains resource groups (lifecycle) contain resources (things).',
            },
            text: 'The Warden\'s first demand:',
          },
          {
            text: 'Prove creation: claim a plot named <code>boss-rg</code> in <code>eastus</code>.',
            hint: 'Type: <code>az group create --name boss-rg --location eastus</code>',
            check: (e) => !!e.world.azure.groups['boss-rg'],
          },
          {
            text: 'Summon a golem named <code>guardian</code> onto <code>boss-rg</code>.',
            hint: 'Type: <code>az vm create -g boss-rg -n guardian --image Ubuntu2204 --generate-ssh-keys</code>',
            check: (e) => !!e.world.azure.vms['guardian'],
          },
          {
            quiz: {
              question: 'The battle is over and boss-rg\'s golems must not haunt your bill. The cleanest way to remove EVERYTHING in it?',
              choices: [
                'az group delete --name boss-rg --yes  (deleting the group deletes all resources in it)',
                'Delete each resource one by one, then keep the empty group forever',
                'az vm stop — stopped means free',
                'Wait: unused resources auto-delete after a week',
              ],
              answer: 0,
              explain: 'Group deletion cascades — the reason to organize by lifecycle. And no, nothing auto-deletes; the cloud bills the forgetful.',
              explainWrong: 'Remember what a resource group IS: a lifecycle boundary.',
            },
            text: 'The Warden grins:',
          },
          {
            text: 'Do the deed: <code>az group delete --name boss-rg --yes</code> (deletion is destructive — the CLI demands explicit consent), then verify with <code>az vm list -o table</code> that the guardian is gone.',
            hint: 'Type: <code>az group delete --name boss-rg --yes</code>',
            check: (e) => e.cmd === 'az' && !e.world.azure.groups['boss-rg'] && !e.world.azure.vms['guardian'],
            success: 'Clean battlefield, clean bill.',
          },
        ],
      },
    ],
  });

  // ---- Realm 5: kubectl / AKS -------------------------------------------------

  function ensureKube(w) {
    // If the player jumped straight to Realm 5, hand them a connected cluster.
    if (!w.kubeConnected) {
      w.kubeConnected = true;
      w.k8s.context = 'quest-aks';
    }
  }

  CLIQ.modules.push({
    id: 'k8s',
    icon: '⚙️',
    title: 'The Kube Keep',
    tagline: 'command container legions with kubectl on AKS',
    quests: [
      {
        id: 'k8s-1',
        title: 'The Fleet Muster',
        story:
          'Inside the Sky Fortress, everything follows one hierarchy: <b>Nodes</b> (machines) host <b>Pods</b> ' +
          '(the smallest fighting unit — one or more containers). <b>Deployments</b> declare "I want N copies of this pod" ' +
          'and Kubernetes forever fights to make it true. <b>Namespaces</b> divide the keep into wards.',
        outro: 'You can survey the whole fleet at a glance.',
        setup: ensureKube,
        tasks: [
          {
            text: 'Muster the machines: <code>kubectl get nodes</code>.',
            hint: 'Type: <code>kubectl get nodes</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('aks-nodepool1-2'),
          },
          {
            text: 'Muster the pods in the default ward: <code>kubectl get pods</code>.',
            hint: 'Type: <code>kubectl get pods</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('guestbook'),
          },
          {
            text: 'See the wards themselves: <code>kubectl get namespaces</code>.',
            hint: 'Type: <code>kubectl get namespaces</code> (or <code>kubectl get ns</code>)',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('shop'),
          },
          {
            text: 'Muster EVERYTHING across all wards: <code>kubectl get pods -A</code>.',
            hint: 'Type: <code>kubectl get pods -A</code> (-A = --all-namespaces)',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('coredns') && e.out.includes('frontend'),
            success: 'Note the shop ward: something there is NOT Running... we will return to it.',
          },
          {
            quiz: {
              question: 'What is the relationship between a Deployment, a Pod, and a Node?',
              choices: [
                'A Deployment keeps N Pods running; the scheduler places Pods onto Nodes',
                'A Pod contains many Nodes, managed by a Deployment',
                'Nodes create Deployments which become Pods',
                'They are three names for the same thing',
              ],
              answer: 0,
              explain: 'Deployment = desired state ("3 replicas of this"). Pod = running instance. Node = machine it lands on.',
            },
            text: 'The keep\'s quartermaster asks:',
          },
        ],
      },
      {
        id: 'k8s-2',
        title: 'Eyes of the Warden',
        story:
          'Something rots in the <b>shop</b> ward. A wise warden has three eyes: ' +
          '<code>get</code> (what is there), <code>describe</code> (its full story and <b>Events</b>), ' +
          'and <code>logs</code> (what the container itself said). Use all three and no failure can hide.',
        outro: 'You saw the fault without guessing: events told you WHY, logs told you WHAT.',
        setup: ensureKube,
        tasks: [
          {
            text: 'Look at the shop ward: <code>kubectl get pods -n shop</code>. Something is wrong — find the status.',
            hint: 'Type: <code>kubectl get pods -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('CrashLoopBackOff'),
            success: 'CrashLoopBackOff — the pod starts, dies, and Kubernetes keeps trying with growing delays.',
          },
          {
            text: 'Check the deployments: <code>kubectl get deployments -n shop</code> — which one shows 0 ready?',
            hint: 'Type: <code>kubectl get deployments -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('payment') && e.out.includes('0/1'),
          },
          {
            text: 'Interrogate the sick pod: <code>kubectl describe pod &lt;payment-pod-name&gt; -n shop</code> (copy the exact name from get pods). Read the <b>Events</b> at the bottom.',
            hint: 'Run <code>kubectl get pods -n shop</code>, copy the payment-xxxx name, then <code>kubectl describe pod payment-xxxx -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.argv.includes('describe') && e.out.includes('Back-off restarting'),
            success: 'Events reveal: "Back-off restarting failed container" — it starts, crashes, and kubelet keeps retrying. Someone shipped a broken release.',
          },
          {
            text: 'Hear the container\'s last words: <code>kubectl logs &lt;payment-pod-name&gt; -n shop</code>.',
            hint: 'Type: <code>kubectl logs payment-xxxx -n shop</code> (same pod name)',
            check: (e) => e.cmd === 'kubectl' && e.argv.includes('logs') && e.out.includes('FATAL'),
          },
          {
            quiz: {
              question: 'What does <b>CrashLoopBackOff</b> actually mean?',
              choices: [
                'The container keeps crashing; k8s restarts it with increasing wait times',
                'The node has crashed permanently',
                'The pod is paused waiting for user input',
                'The cluster is out of disk',
              ],
              answer: 0,
              explain: 'Back-off = exponentially growing delay between restart attempts. The fix is never "wait" — find why it crashes.',
            },
            text: 'The Warden\'s eye turns to you:',
          },
        ],
      },
      {
        id: 'k8s-3',
        title: 'Healing the Broken Golem',
        story:
          'Diagnosis: the <code>payment</code> deployment points at image <code>shop-payment:1.2.3-bad</code> — a tag that was never published. ' +
          'The cure: point the deployment at the good tag <code>shop-payment:1.2.4</code>. ' +
          'Kubernetes will roll the change out pod by pod — <b>zero downtime</b> if you have replicas.',
        outro: 'The shop takes payment again. You fixed production without touching a single machine by hand.',
        setup: ensureKube,
        tasks: [
          {
            text: 'Cast the cure: <code>kubectl set image deployment/payment payment=shop-payment:1.2.4 -n shop</code>.',
            hint: 'Type: <code>kubectl set image deployment/payment payment=shop-payment:1.2.4 -n shop</code>',
            check: (e) => { const d = e.world.k8s.namespaces.shop.deployments.payment; return d && !d.broken && d.image === 'shop-payment:1.2.4'; },
          },
          {
            text: 'Watch the rollout land: <code>kubectl rollout status deployment/payment -n shop</code>.',
            hint: 'Type: <code>kubectl rollout status deployment/payment -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('successfully rolled out'),
          },
          {
            text: 'Trust, but verify: <code>kubectl get pods -n shop</code> — all Running?',
            hint: 'Type: <code>kubectl get pods -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.raw.includes('pods') && e.out.includes('Running') && !e.out.includes('CrashLoopBackOff'),
            success: 'Every pod Running. Incident closed with evidence, not hope.',
          },
          {
            quiz: {
              question: 'During a rolling update with 3 replicas, what does Kubernetes do?',
              choices: [
                'Replaces pods gradually — new one Ready before an old one dies',
                'Kills all 3 pods, then starts 3 new ones (downtime)',
                'Requires you to ssh into each node',
                'Reboots the whole cluster',
              ],
              answer: 0,
              explain: 'RollingUpdate is the default strategy: surge up, drain down, service never empty.',
            },
            text: 'A final lesson from the healer:',
          },
        ],
      },
      {
        id: 'k8s-4',
        title: 'Legion of Replicas',
        story:
          'A horde of customers approaches! The <code>frontend</code> holds with 3 pods, but you need 5. ' +
          'And here is Kubernetes\' deepest magic: you never command pods directly — you declare a <b>desired state</b> ' +
          'and controllers fight reality until it matches. Kill a pod and watch it resurrect.',
        outro: 'Desired state > manual labor. The legion maintains itself.',
        setup: ensureKube,
        tasks: [
          {
            text: 'Grow the legion: <code>kubectl scale deployment/frontend --replicas=5 -n shop</code>.',
            hint: 'Type: <code>kubectl scale deployment/frontend --replicas=5 -n shop</code>',
            check: (e) => { const d = e.world.k8s.namespaces.shop.deployments.frontend; return d && d.replicas === 5; },
          },
          {
            text: 'Count your soldiers: <code>kubectl get pods -n shop</code> — five frontends?',
            hint: 'Type: <code>kubectl get pods -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && (e.out.match(/frontend-/g) || []).length >= 5,
          },
          {
            text: 'Now the magic trick: <b>kill one</b>. <code>kubectl delete pod &lt;any-frontend-pod&gt; -n shop</code>.',
            hint: 'Copy any frontend-xxxx name from get pods, then: <code>kubectl delete pod frontend-xxxx -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.argv.includes('delete') && e.out.includes('deleted'),
            success: 'Pod destroyed. Or... was it?',
          },
          {
            text: 'Look again: <code>kubectl get pods -n shop</code>. Count the frontends.',
            hint: 'Type: <code>kubectl get pods -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.raw.includes('pods') && (e.out.match(/frontend-/g) || []).length >= 5,
            success: 'Still five — one has a brand-new name. The controller resurrected it within seconds.',
          },
          {
            quiz: {
              question: 'You deleted a pod but it came back. WHO brought it back?',
              choices: [
                'The Deployment\'s controller (ReplicaSet) enforcing desired state: 5 replicas',
                'Azure support staff restarted it manually',
                'The pod refused to die',
                'kubectl has an undo feature',
              ],
              answer: 0,
              explain: 'The reconciliation loop: observed 4, desired 5 → create 1. This is the heart of Kubernetes.',
            },
            text: 'The legion commander asks:',
          },
        ],
      },
      {
        id: 'k8s-5',
        title: 'Scrolls of Creation',
        story:
          'True wardens do not click or type resources into being — they write <b>manifests</b> (YAML scrolls) that declare ' +
          'what should exist, and cast <code>kubectl apply -f</code>. The scroll is the source of truth; keep it in git and the ' +
          'cluster becomes reproducible. And to let the world reach your pods, you raise a <b>Service</b>.',
        outro: 'You create by declaration now. The Keep\'s final trial awaits.',
        setup(w) {
          ensureKube(w);
          w.cwd = w.home;
          const home = N(w, '/home/hero');
          if (!home.children['manifests']) home.children['manifests'] = CLIQ.dir();
          home.children['manifests'].children['mage.yaml'] = CLIQ.file(
            'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: mage\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: mage\n  template:\n    metadata:\n      labels:\n        app: mage\n    spec:\n      containers:\n      - name: mage\n        image: mage:1.0\n'
          );
        },
        tasks: [
          {
            text: 'A scroll awaits in <code>manifests/</code>. Read it: <code>cat manifests/mage.yaml</code>. Note the kind, replicas, and image.',
            hint: 'Type: <code>cat manifests/mage.yaml</code>',
            check: (e) => e.cmd === 'cat' && e.out.includes('kind: Deployment'),
          },
          {
            text: 'Cast it into reality: <code>kubectl apply -f manifests/mage.yaml</code>.',
            hint: 'Type: <code>kubectl apply -f manifests/mage.yaml</code>',
            check: (e) => !!e.world.k8s.namespaces.default.deployments.mage,
            success: 'deployment.apps/mage created — from words to running pods.',
          },
          {
            text: 'Verify the summoning: <code>kubectl get deployments</code> — is mage 2/2?',
            hint: 'Type: <code>kubectl get deployments</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('mage') && e.out.includes('2/2'),
          },
          {
            text: 'Now see how the shop reaches the outside world: <code>kubectl get services -n shop</code>. Find the LoadBalancer\'s EXTERNAL-IP.',
            hint: 'Type: <code>kubectl get services -n shop</code> (or svc)',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('LoadBalancer') && e.out.includes('20.10.30.40'),
            success: 'On AKS, a LoadBalancer Service conjures a real Azure load balancer with a public IP.',
          },
          {
            quiz: {
              question: 'Pods die and respawn with new IPs constantly. How do clients reliably reach them?',
              choices: [
                'Through a Service — a stable name/IP that load-balances to whatever pods match its selector',
                'By hardcoding pod IPs and updating them hourly',
                'Pods keep their IP forever',
                'You cannot reach pods, ever',
              ],
              answer: 0,
              explain: 'Service = stable front door. ClusterIP inside, LoadBalancer for the public world.',
            },
            text: 'One question before the throne room:',
          },
        ],
      },
      {
        id: 'k8s-boss',
        title: 'The Chaos Wyrm',
        boss: true,
        story:
          '🐉 The <b>Chaos Wyrm</b> slams into the Keep and corrupts the shop ward\'s <code>frontend</code> — ' +
          'it now runs a poisoned release that crashes on startup, and customers see nothing but errors. ' +
          'No hints will save you now, warden. Diagnose it (get → describe/logs), cure it ' +
          '(the good image is <code>shop-frontend:2.1</code>), and prove the cure. ' +
          '<br><br>⚠️ <i>Wrong quiz answers cost a heart.</i>',
        outro: 'The Wyrm flees. You are the Cloud Archmage — bash, network, cloud, and cluster all answer to you. 🏆👑',
        setup(w) {
          ensureKube(w);
          const d = w.k8s.namespaces.shop.deployments.frontend;
          d.image = 'shop-frontend:3.0-broken';
          d.broken = true;
          w.k8s.namespaces.shop.pods.filter((p) => p.deploy === 'frontend').forEach((p) => { p.status = 'CrashLoopBackOff'; p.image = d.image; p.restarts = 2; });
        },
        tasks: [
          {
            text: 'The alarm sounds. Survey the damage in the shop ward.',
            hint: 'Type: <code>kubectl get pods -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && e.out.includes('CrashLoopBackOff') && e.out.includes('frontend'),
            success: 'The frontends are down. The Wyrm cackles.',
          },
          {
            quiz: {
              question: 'Fastest way to learn WHY those pods are failing?',
              choices: [
                'kubectl describe pod NAME -n shop — and read the Events',
                'Delete the namespace and hope',
                'Restart every node in the cluster',
                'ssh into the pod',
              ],
              answer: 0,
              explain: 'Events carry the scheduler\'s and kubelet\'s own explanation — image pulls, probes, OOM kills.',
              explainWrong: 'Destruction is not diagnosis. Which command shows a pod\'s Events?',
            },
            text: 'The Wyrm taunts: "You will never know why!"',
          },
          {
            text: 'Do it — interrogate a broken frontend pod (describe or logs) and find the evidence.',
            hint: 'Type: <code>kubectl describe pod frontend-xxxx -n shop</code> (get the name from get pods)',
            check: (e) => e.cmd === 'kubectl' && (e.argv.includes('describe') || e.argv.includes('logs')) && (e.out.includes('Back-off restarting') || e.out.includes('FATAL')),
            success: 'Evidence: release "shop-frontend:3.0-broken" crashes at startup — Events show the back-off, logs show the FATAL. The Wyrm\'s corruption is exposed.',
          },
          {
            text: 'Strike! Point the frontend back at the true image, <code>shop-frontend:2.1</code>.',
            hint: 'Type: <code>kubectl set image deployment/frontend frontend=shop-frontend:2.1 -n shop</code>',
            check: (e) => { const d = e.world.k8s.namespaces.shop.deployments.frontend; return d && !d.broken && d.image === 'shop-frontend:2.1'; },
            success: 'Direct hit! The rollout begins.',
          },
          {
            text: 'Prove the kill: confirm the rollout finished AND the pods are Running.',
            hint: 'Type: <code>kubectl rollout status deployment/frontend -n shop</code>, then <code>kubectl get pods -n shop</code>',
            check: (e) => e.cmd === 'kubectl' && ((e.raw.includes('rollout') && e.out.includes('successfully')) || (e.raw.includes('pods') && e.out.includes('frontend') && !e.out.includes('CrashLoopBackOff') && e.out.includes('Running'))),
            success: 'All frontends Running.',
          },
          {
            quiz: {
              question: 'FINAL BLOW — a teammate asks how you fixed production so fast. The honest answer:',
              choices: [
                'Observed state with get, read Events/logs for the cause, changed desired state, verified the rollout',
                'Rebooted things until it worked',
                'Deleted and recreated the whole cluster',
                'Edited files inside the running container by hand',
              ],
              answer: 0,
              explain: 'Observe → diagnose → declare → verify. That loop IS Kubernetes operations. The Wyrm is slain.',
            },
            text: 'The Wyrm gasps its last:',
          },
        ],
      },
    ],
  });
})();
