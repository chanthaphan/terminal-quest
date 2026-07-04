import Foundation

struct CommandCard: Identifiable {
    let id = UUID()
    let cmd: String
    let desc: String
}

struct QuizQuestion: Identifiable {
    let id = UUID()
    let question: String
    let choices: [String]
    let answer: Int
    let explain: String
}

struct RealmData: Identifiable {
    let id: String
    let icon: String
    let title: String
    let tagline: String
    let bossName: String
    let bossEmoji: String
    let cards: [CommandCard]
    let quiz: [QuizQuestion]
}

enum Curriculum {
    static let levelTitles: [(xp: Int, title: String)] = [
        (0, "Shell Novice"), (60, "Shell Apprentice"), (150, "File Wrangler"),
        (280, "Pipe Weaver"), (450, "Net Ranger"), (650, "Packet Sage"),
        (900, "Cloud Knight"), (1200, "Kube Warden"), (1500, "Cloud Archmage"),
    ]

    static let realms: [RealmData] = [
        RealmData(
            id: "bash", icon: "🏛️", title: "The Shell Sanctum",
            tagline: "unix/bash fundamentals",
            bossName: "Shade of the Sanctum", bossEmoji: "👻",
            cards: [
                CommandCard(cmd: "pwd", desc: "Print working directory — where am I?"),
                CommandCard(cmd: "ls -la", desc: "List files; -l long format, -a includes hidden dotfiles."),
                CommandCard(cmd: "cd ~", desc: "Change directory. .. goes up, ~ goes home."),
                CommandCard(cmd: "cat file", desc: "Print a file's contents to the terminal."),
                CommandCard(cmd: "mkdir / touch / rm", desc: "Create dirs, create empty files, delete (forever — no trash)."),
                CommandCard(cmd: "cp / mv", desc: "Copy and move/rename files. -r for directories."),
                CommandCard(cmd: "find . -name \"*.txt\"", desc: "Walk a tree finding files by name or type."),
                CommandCard(cmd: "grep -in pattern file", desc: "Search inside files. -i case-insensitive, -n line numbers, -c count."),
                CommandCard(cmd: "cmd1 | cmd2", desc: "The pipe: feed one command's output into the next."),
                CommandCard(cmd: "sort | uniq | wc -l", desc: "Classic chain: sort, dedupe adjacent lines, count."),
                CommandCard(cmd: "chmod 755 / +x", desc: "Permissions: rwx for owner/group/others; each digit = r4+w2+x1."),
                CommandCard(cmd: "echo text > file", desc: "> writes (replaces), >> appends output into a file."),
            ],
            quiz: [
                QuizQuestion(
                    question: "What does -rw-r--r-- mean for the file's OWNER?",
                    choices: ["read + write, not execute", "read only", "read + write + execute", "no access"],
                    answer: 0, explain: "First triplet rw- belongs to the owner: read yes, write yes, execute no."),
                QuizQuestion(
                    question: "chmod 755 grants…",
                    choices: ["owner rwx, group r-x, others r-x", "everyone rwx", "owner rw- only", "read-only for all"],
                    answer: 0, explain: "7=rwx, 5=r-x, 5=r-x. Digits are read(4)+write(2)+execute(1)."),
                QuizQuestion(
                    question: "Which finds a file NAMED shadow_key.txt under dungeon/?",
                    choices: ["find dungeon -name \"shadow_key.txt\"", "grep shadow_key.txt dungeon", "ls shadow_key.txt", "cat dungeon"],
                    answer: 0, explain: "find matches file names; grep searches inside file contents."),
                QuizQuestion(
                    question: "Why does `sort` come before `uniq` in a pipe?",
                    choices: ["uniq only removes ADJACENT duplicates", "sort is faster", "uniq requires alphabetical input by law", "It doesn't matter"],
                    answer: 0, explain: "uniq collapses neighbouring duplicates only — sorting brings duplicates together first."),
                QuizQuestion(
                    question: "Which chain counts ERROR lines in ledger.log?",
                    choices: ["grep ERROR ledger.log | wc -l", "wc -l ERROR | grep", "find ERROR | count", "cat wc -l ledger.log"],
                    answer: 0, explain: "grep filters the lines, wc -l counts them. Small tools, composed."),
            ]),
        RealmData(
            id: "remote", icon: "🌉", title: "The Bridge of Echoes",
            tagline: "remote machines: ssh, scp, curl, ping",
            bossName: "The Silent Server", bossEmoji: "🖥️",
            cards: [
                CommandCard(cmd: "ping -c 3 host", desc: "Is it alive? Sends ICMP echoes, reports latency and loss."),
                CommandCard(cmd: "traceroute host", desc: "Shows every router hop between you and the target."),
                CommandCard(cmd: "dig +short name", desc: "DNS lookup — turn a name into an IP."),
                CommandCard(cmd: "ssh user@host", desc: "Open a shell ON another machine. Watch your prompt change. exit to leave."),
                CommandCard(cmd: "scp file user@host:path", desc: "Copy files across machines over ssh."),
                CommandCard(cmd: "curl -I https://api/health", desc: "Speak HTTP: fetch pages/APIs. -I shows headers and status only."),
                CommandCard(cmd: "ss / netstat", desc: "List listening ports — which gates are open on this machine."),
                CommandCard(cmd: "nc -zv host 5432", desc: "Knock on one port from outside: open or refused?"),
                CommandCard(cmd: "ip addr / ip route", desc: "Your interfaces + IP, and the default gateway route."),
                CommandCard(cmd: "systemctl status/restart svc", desc: "Query and control services on a (remote) machine."),
            ],
            quiz: [
                QuizQuestion(
                    question: "curl says 'Connection refused' but the host pings fine. Most likely?",
                    choices: ["The service on that port is not running", "DNS is broken", "The server is powered off", "Your internet is down"],
                    answer: 0, explain: "Refused = host reachable, nothing listening. Machine up, service down — go inside and check it."),
                QuizQuestion(
                    question: "Match the classic ports:",
                    choices: ["22=ssh, 80=http, 443=https, 5432=postgres", "22=http, 80=ssh, 443=dns", "21=ssh, 8080=https", "53=ssh, 22=dns"],
                    answer: 0, explain: "Also handy: 53=DNS, 3306=MySQL, 6379=Redis."),
                QuizQuestion(
                    question: "An HTTP request returns 401. Meaning?",
                    choices: ["Unauthorized — credentials required", "Not found", "Server crashed", "Redirect"],
                    answer: 0, explain: "401 = who are you? 403 = no for you. 404 = no such thing. 500 = server broke."),
                QuizQuestion(
                    question: "'ping quest.dev: Name or service not known' — what failed?",
                    choices: ["DNS resolution", "The network cable", "The remote server", "ICMP is blocked"],
                    answer: 0, explain: "The name never became an IP; no packet was even sent. Check DNS first."),
                QuizQuestion(
                    question: "You must copy deploy.key to web-01's home. Which spell?",
                    choices: ["scp deploy.key hero@web-01:/home/hero/", "ssh deploy.key web-01", "curl deploy.key > web-01", "mv deploy.key web-01:"],
                    answer: 0, explain: "scp SRC user@host:DEST — copy over ssh."),
            ]),
        RealmData(
            id: "concepts", icon: "🧭", title: "The DNS Labyrinth",
            tagline: "IPs, subnets, DNS, ports, TCP — the theory",
            bossName: "Labyrinth Guardian", bossEmoji: "👁️",
            cards: [
                CommandCard(cmd: "IPv4", desc: "Four numbers 0–255 (10.0.1.5). The machine's street address."),
                CommandCard(cmd: "CIDR /24", desc: "First 24 bits = the network. 10.0.1.0/24 → 10.0.1.x are neighbours."),
                CommandCard(cmd: "Private ranges", desc: "10.x.x.x, 172.16–31.x.x, 192.168.x.x — never routed on the public internet."),
                CommandCard(cmd: "Gateway", desc: "The router that forwards your traffic toward networks you can't reach directly."),
                CommandCard(cmd: "DNS A record", desc: "name → IPv4. CNAME = alias to another name. MX = mail. TTL = cache lifetime."),
                CommandCard(cmd: "Port", desc: "IP gets you to the machine; the port number gets you to the program on it."),
                CommandCard(cmd: "TCP vs UDP", desc: "TCP: handshake, ordered, reliable (web, ssh). UDP: fire-and-forget (DNS, games, calls)."),
                CommandCard(cmd: "/etc/hosts", desc: "Local name table checked BEFORE DNS — great for testing, classic footgun."),
                CommandCard(cmd: "Packet layers", desc: "data → TCP envelope (port) → IP envelope (address) → wire. Routers read only IP."),
            ],
            quiz: [
                QuizQuestion(
                    question: "Your IP is 10.0.1.5/24. Which machine is in YOUR subnet?",
                    choices: ["10.0.1.99", "10.0.2.5", "192.168.1.5", "8.8.8.8"],
                    answer: 0, explain: "/24 fixes the first three octets — everything 10.0.1.x is local."),
                QuizQuestion(
                    question: "You changed a DNS record but users still hit the old IP for an hour. Why?",
                    choices: ["Resolvers cache records until the TTL expires", "DNS needs a reboot", "Browsers are broken", "Root servers must approve"],
                    answer: 0, explain: "Every record carries a TTL; caches serve the old answer until it dies."),
                QuizQuestion(
                    question: "TCP vs UDP — which is TRUE?",
                    choices: ["TCP guarantees ordered delivery; UDP is fire-and-forget", "UDP is always encrypted", "TCP is only for web pages", "UDP retransmits automatically"],
                    answer: 0, explain: "HTTP/SSH ride TCP; DNS queries and video calls ride UDP."),
                QuizQuestion(
                    question: "A user says 'the site is down!' What do you establish FIRST?",
                    choices: ["Whether the name resolves (dig)", "Reboot the server", "Clear their cache", "Check the firewall"],
                    answer: 0, explain: "Debug up the layers: name → reachability → port → service."),
                QuizQuestion(
                    question: "traceroute shows hops 1–2 then * * * forever. Best read?",
                    choices: ["Traffic dies at/after hop 3 — filtered or dead router", "Your machine has no network", "DNS failed", "traceroute is broken"],
                    answer: 0, explain: "You got two hops out — local side is fine; the path dies in the middle."),
            ]),
        RealmData(
            id: "azure", icon: "☁️", title: "The Azure Citadel",
            tagline: "az CLI: groups, VMs, storage, AKS",
            bossName: "Warden of the Citadel", bossEmoji: "🛡️",
            cards: [
                CommandCard(cmd: "az login / az account show", desc: "Authenticate, then confirm WHICH subscription you command."),
                CommandCard(cmd: "az group create -n rg -l region", desc: "Resource group = lifecycle boundary. Delete the group, delete everything in it."),
                CommandCard(cmd: "az vm create -g rg -n vm --image …", desc: "Summon a VM: CPU, disk, and a public IP in one incantation."),
                CommandCard(cmd: "az vm stop vs deallocate", desc: "stop keeps (and bills!) the hardware; deallocate releases it and stops compute billing."),
                CommandCard(cmd: "az storage account create", desc: "Names: 3–24 chars, lowercase+digits, globally unique (they become URLs)."),
                CommandCard(cmd: "az aks create --node-count 3", desc: "Managed Kubernetes: Azure runs the control plane, you command the fleet."),
                CommandCard(cmd: "az aks get-credentials", desc: "Writes cluster auth into ~/.kube/config so kubectl can connect."),
                CommandCard(cmd: "-o table", desc: "Human-readable output; default JSON is for scripts and machines."),
            ],
            quiz: [
                QuizQuestion(
                    question: "The Azure hierarchy, biggest to smallest:",
                    choices: ["Subscription → Resource Group → Resource", "Resource → Subscription → Group", "Group → Subscription → Resource", "All equal"],
                    answer: 0, explain: "Subscription (billing) holds resource groups (lifecycle) hold resources."),
                QuizQuestion(
                    question: "Why does a STOPPED VM still cost money?",
                    choices: ["It still reserves the hardware; deallocate releases it", "stop is premium", "It doesn't", "Deallocate deletes the VM"],
                    answer: 0, explain: "stop = OS off, hardware kept warm. deallocate = hardware returned. #1 bill surprise."),
                QuizQuestion(
                    question: "A legal storage account name:",
                    choices: ["queststore01", "Quest-Store", "qs", "quest_store_backup_v2"],
                    answer: 0, explain: "Lowercase + digits, 3–24 chars, no dashes/underscores — it becomes a DNS hostname."),
                QuizQuestion(
                    question: "What did `az aks get-credentials` actually do?",
                    choices: ["Wrote cluster address + auth into ~/.kube/config", "Created new nodes", "Downloaded k8s source", "Set a VM password"],
                    answer: 0, explain: "kubectl reads kubeconfig to know which cluster to talk to and how."),
                QuizQuestion(
                    question: "Cleanest way to remove EVERYTHING a project created?",
                    choices: ["az group delete --name project-rg", "Delete each resource by hand", "az vm stop — stopped is free", "Wait; unused resources auto-delete"],
                    answer: 0, explain: "Group deletion cascades — the reason to organize resources by lifecycle."),
            ]),
        RealmData(
            id: "k8s", icon: "⚙️", title: "The Kube Keep",
            tagline: "kubectl on AKS: pods, deployments, rollouts",
            bossName: "The Chaos Wyrm", bossEmoji: "🐉",
            cards: [
                CommandCard(cmd: "kubectl get nodes/pods/deploy/svc", desc: "Survey the fleet. -n namespace, -A all namespaces."),
                CommandCard(cmd: "kubectl describe pod NAME", desc: "The pod's full story — read the Events at the bottom for WHY."),
                CommandCard(cmd: "kubectl logs NAME", desc: "What the container itself printed — its last words when crashing."),
                CommandCard(cmd: "kubectl scale deploy/x --replicas=5", desc: "Declare desired count; controllers make reality match."),
                CommandCard(cmd: "kubectl delete pod NAME", desc: "Kill a pod — the ReplicaSet resurrects it in seconds. Self-healing."),
                CommandCard(cmd: "kubectl set image deploy/x c=img:tag", desc: "Change the image → rolling update, pod by pod, zero downtime."),
                CommandCard(cmd: "kubectl rollout status/restart", desc: "Watch a rollout land, or bounce a deployment."),
                CommandCard(cmd: "kubectl apply -f app.yaml", desc: "Declare state from a manifest. The YAML in git is the source of truth."),
                CommandCard(cmd: "CrashLoopBackOff", desc: "Container starts, dies, restarts with growing delays. Fix the cause, not the symptom."),
            ],
            quiz: [
                QuizQuestion(
                    question: "Deployment / Pod / Node — the relationship?",
                    choices: ["Deployment keeps N pods running; scheduler places pods on nodes", "Pods contain nodes", "Nodes create deployments", "Same thing, three names"],
                    answer: 0, explain: "Deployment = desired state, Pod = running instance, Node = machine."),
                QuizQuestion(
                    question: "Fastest way to learn WHY a pod is failing?",
                    choices: ["kubectl describe pod NAME — read Events", "Delete the namespace", "Restart every node", "ssh into the pod"],
                    answer: 0, explain: "Events carry the kubelet's own explanation: image pulls, probes, OOM kills."),
                QuizQuestion(
                    question: "You deleted a pod and it came back. Who did that?",
                    choices: ["The ReplicaSet enforcing desired state", "Azure support", "The pod refused to die", "kubectl undo"],
                    answer: 0, explain: "Observed 4, desired 5 → create 1. The reconciliation loop is Kubernetes' heart."),
                QuizQuestion(
                    question: "What does CrashLoopBackOff actually mean?",
                    choices: ["Container keeps crashing; k8s restarts it with growing delays", "The node crashed", "Pod awaits user input", "Cluster out of disk"],
                    answer: 0, explain: "Back-off = increasing wait between restarts. Read logs/events to find why it crashes."),
                QuizQuestion(
                    question: "Pods die and respawn with new IPs. How do clients reach them reliably?",
                    choices: ["Through a Service — stable IP/name load-balancing to matching pods", "Hardcode pod IPs", "Pods keep IPs forever", "You cannot"],
                    answer: 0, explain: "Service = stable front door; LoadBalancer type gets a public IP on AKS."),
            ]),
        RealmData(
            id: "git", icon: "📜", title: "The Chronicle of Branches",
            tagline: "git: commits, branches, merges",
            bossName: "The Merge Wraith", bossEmoji: "🌿",
            cards: [
                CommandCard(cmd: "git init / git status", desc: "Open a repository; ask what changed. status lies never."),
                CommandCard(cmd: "git add . / git add FILE", desc: "Stage changes — compose exactly what the next commit contains."),
                CommandCard(cmd: "git commit -m \"msg\"", desc: "Seal a snapshot into history with an id (hash) and a message."),
                CommandCard(cmd: "git log --oneline", desc: "Replay history compactly: hash + message per line."),
                CommandCard(cmd: "git branch / checkout -b name", desc: "List timelines; fork a new one and step into it."),
                CommandCard(cmd: "git merge branch", desc: "Weave a branch's commits into yours."),
                CommandCard(cmd: "Merge conflict", desc: "Both branches touched the same lines: edit, remove <<< === >>> markers, add, commit."),
                CommandCard(cmd: "HEAD", desc: "The 'you are here' bookmark — moves as you commit or switch branches."),
            ],
            quiz: [
                QuizQuestion(
                    question: "What exactly is a commit?",
                    choices: ["A recorded snapshot of staged changes, with message + id", "A full computer backup", "An upload to the internet", "A temporary save"],
                    answer: 0, explain: "Permanent, identified snapshot in history. Pushing to a server is separate."),
                QuizQuestion(
                    question: "Why does the staging area exist?",
                    choices: ["To compose a commit from exactly the changes that belong together", "Faster uploads", "Legacy bug", "Encryption"],
                    answer: 0, explain: "One logical change per commit — reviewers and future-you will thank you."),
                QuizQuestion(
                    question: "When does a merge CONFLICT happen?",
                    choices: ["Both branches changed the same lines differently", "Every merge", "Similar branch names", "Repos over 1GB"],
                    answer: 0, explain: "Different files/lines auto-merge. Same lines, different edits → a human chooses."),
                QuizQuestion(
                    question: "Why commit (or stash) BEFORE switching branches?",
                    choices: ["Uncommitted work isn't protected by history — commit first, travel safely", "Git requires 3 commits", "It makes the repo larger", "No reason"],
                    answer: 0, explain: "The Merge Wraith feeds on uncommitted work abandoned across timelines."),
                QuizQuestion(
                    question: "Why do teams branch instead of committing straight to main?",
                    choices: ["main stays always-releasable; work merges after review", "Branches are faster", "main is read-only by law", "To hide code"],
                    answer: 0, explain: "Branch → pull request → review → merge: the backbone of enterprise development."),
            ]),
        RealmData(
            id: "docker", icon: "🐳", title: "The Container Foundry",
            tagline: "docker: images, containers, builds, ports",
            bossName: "The Image Golem", bossEmoji: "🗿",
            cards: [
                CommandCard(cmd: "docker pull / docker images", desc: "Fetch an image (the immutable mold); list your local molds."),
                CommandCard(cmd: "docker run -d --name x image", desc: "Create a running container. -d detached, --name to address it."),
                CommandCard(cmd: "docker ps [-a]", desc: "Living containers; -a includes the Exited fallen."),
                CommandCard(cmd: "docker stop/start/rm", desc: "Pause, resume, delete. rm refuses on a running container (or -f)."),
                CommandCard(cmd: "docker logs NAME", desc: "Everything the app printed — a crashed container's last words."),
                CommandCard(cmd: "docker exec NAME cmd", desc: "Run a command INSIDE a running container (no ssh needed)."),
                CommandCard(cmd: "docker build -t name:tag .", desc: "Forge an image from a Dockerfile: FROM base, COPY files, CMD to run."),
                CommandCard(cmd: "-p 8080:80", desc: "Publish HOST:CONTAINER — your machine's 8080 tunnels to its 80."),
                CommandCard(cmd: "Exit codes", desc: "Exited (0) = clean stop. Exited (1) = it died screaming — read the logs."),
            ],
            quiz: [
                QuizQuestion(
                    question: "Image vs container:",
                    choices: ["Image = immutable template; container = running instance", "Same thing", "Containers are templates", "Images only exist in the cloud"],
                    answer: 0, explain: "Class vs object; mold vs golem. Many containers from one image."),
                QuizQuestion(
                    question: "In -p 8080:80, which side is which?",
                    choices: ["HOST 8080 : CONTAINER 80", "CONTAINER 8080 : HOST 80", "They must match", "First number = replicas"],
                    answer: 0, explain: "host:container, always. You stand outside — host comes first."),
                QuizQuestion(
                    question: "A container shows Exited (1). What does the 1 mean?",
                    choices: ["The process ended with an error (0 = success)", "Ran for 1 second", "Version 1", "One user connected"],
                    answer: 0, explain: "Unix exit codes: 0 clean, non-zero trouble. Next step: docker logs."),
                QuizQuestion(
                    question: "Why put dependency-install steps BEFORE the code COPY in a Dockerfile?",
                    choices: ["Layer caching: unchanged early layers are reused on rebuild", "Alphabetical order", "Runtime speed", "Smaller images by law"],
                    answer: 0, explain: "Change one code file → only the last layers rebuild. Order = cache strategy."),
                QuizQuestion(
                    question: "docker exec vs ssh:",
                    choices: ["exec enters a local container via the daemon; ssh crosses the network", "Identical", "exec is double-encrypted ssh", "ssh only works in containers"],
                    answer: 0, explain: "Same feeling, different doors. exec needs no sshd inside the container."),
            ]),
        RealmData(
            id: "ops", icon: "⚗️", title: "The Alchemist's Lab",
            tagline: "processes, disks, awk/sed, cron",
            bossName: "The Runaway Daemon", bossEmoji: "🔥",
            cards: [
                CommandCard(cmd: "ps aux / top", desc: "List processes; rank by CPU hunger. Every process has a PID."),
                CommandCard(cmd: "kill PID / kill -9 PID", desc: "SIGTERM asks politely (cleanup allowed); SIGKILL -9 is no-appeal."),
                CommandCard(cmd: "df -h", desc: "Disk free per filesystem — tells you THAT it's full."),
                CommandCard(cmd: "du -sh path", desc: "Disk usage of a directory — tells you WHAT filled it."),
                CommandCard(cmd: "awk '{print $1, $3}'", desc: "Field slicer: $1..$N are whitespace-split columns, $0 the whole line."),
                CommandCard(cmd: "sed 's/old/new/g'", desc: "Stream editor: substitute text; /g = every occurrence on the line."),
                CommandCard(cmd: "tar -czf out.tar.gz dir", desc: "Archive+compress. -tzf lists, -xzf extracts."),
                CommandCard(cmd: "crontab: 30 2 * * *", desc: "minute hour day month weekday → daily at 02:30."),
                CommandCard(cmd: "Backups", desc: "An untested backup is a hope, not a backup. Drill your restores."),
            ],
            quiz: [
                QuizQuestion(
                    question: "Why plain kill (SIGTERM) before kill -9 (SIGKILL)?",
                    choices: ["SIGTERM lets the process clean up; SIGKILL can leave corruption", "-9 is slower", "SIGKILL is Sundays only", "No difference"],
                    answer: 0, explain: "Ask politely, then insist. -9 is for processes that ignore the request."),
                QuizQuestion(
                    question: "df says 95% full. Correct NEXT step?",
                    choices: ["du on suspect dirs to find WHAT is eating space", "Delete random files", "Reboot", "Buy a server"],
                    answer: 0, explain: "df → du → decide. Usually logs, caches, or old artifacts. Never delete blind."),
                QuizQuestion(
                    question: "In awk, what is $0?",
                    choices: ["The entire line", "The first field", "The line number", "An error"],
                    answer: 0, explain: "$0 whole line, $1..$N fields, NF field count — 90% of daily awk."),
                QuizQuestion(
                    question: "Crontab '30 2 * * * backup.sh' runs…",
                    choices: ["Every day at 02:30", "Every 30 min past 2 days", "On Feb 30th", "At 2:30 and 3:00"],
                    answer: 0, explain: "Fields: minute(30) hour(2) day(*) month(*) weekday(*)."),
                QuizQuestion(
                    question: "The server crawls at 97% CPU. First strike?",
                    choices: ["top/ps to find the culprit PID, then kill it", "kill -9 1", "Reboot immediately", "Wait it out"],
                    answer: 0, explain: "Diagnose, target, verify. (Never kill PID 1 — that's init itself!)"),
            ]),
    ]
}
