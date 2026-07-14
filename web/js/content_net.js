/* Terminal Quest — Realm 2: Bridge of Echoes (remote CLI) + Realm 3: DNS Labyrinth (network concepts) */
(function () {
  const CLIQ = window.CLIQ;
  const N = (w, p) => CLIQ.getNode(w, p);

  // ---- Realm 2: remote / network CLI tools --------------------------------

  CLIQ.modules.push({
    id: 'remote',
    icon: '🌉',
    title: 'The Bridge of Echoes',
    tagline: 'reach distant machines: ssh, scp, curl, ping',
    quests: [
      {
        id: 'net-1',
        title: 'Know Thyself',
        story:
          'Before you cross the Bridge to other machines, know your own. Every machine on a network has an ' +
          '<b>IP address</b> (its street address) and routes traffic to the wider world through a <b>gateway</b>.',
        outro: 'You know your name, your address, and your road out.',
        tasks: [
          {
            text: 'Ask the machine its name: <code>hostname</code>.',
            hint: 'Type: <code>hostname</code>',
            check: (e) => e.cmd === 'hostname' && e.ok,
          },
          {
            text: 'Reveal your network interfaces and IP address: <code>ip addr</code>.',
            hint: 'Type: <code>ip addr</code> (old-timers use <code>ifconfig</code> — both work here)',
            check: (e) => (e.cmd === 'ip' || e.cmd === 'ifconfig') && e.out.includes('10.0.1.5'),
            success: 'eth0 carries 10.0.1.5/24 — that is you. (lo 127.0.0.1 is the loopback: the machine talking to itself.)',
          },
          {
            text: 'Find the road out — your default gateway: <code>ip route</code>.',
            hint: 'Type: <code>ip route</code>',
            check: (e) => e.cmd === 'ip' && e.out.includes('default via'),
            success: 'Traffic to anywhere unknown goes "default via 10.0.1.1" — the gateway.',
          },
          {
            quiz: {
              question: 'What does the <b>default gateway</b> do?',
              choices: [
                'Forwards your traffic toward networks you are not directly connected to',
                'Stores your files remotely',
                'Assigns names to IP addresses',
                'Blocks all incoming traffic',
              ],
              answer: 0,
              explain: 'The gateway (router) is the exit door of your local network.',
            },
            text: 'The Bridge keeper asks:',
          },
        ],
      },
      {
        id: 'net-2',
        title: 'Echoes Across the Void',
        story:
          'Two questions rule all network debugging: <b>"is it alive?"</b> (<code>ping</code>) and ' +
          '<b>"what is its address?"</b> (<code>dig</code>/<code>nslookup</code> for DNS). ' +
          '<code>traceroute</code> shows the stepping stones between you and it.',
        outro: 'You can now sound the void and hear what answers.',
        tasks: [
          {
            text: 'Send three echoes to the web server: <code>ping -c 3 web-01</code>.',
            hint: 'Type: <code>ping -c 3 web-01</code> — without <code>-c</code>, real ping runs forever until Ctrl-C.',
            check: (e) => e.cmd === 'ping' && e.out.includes('10.0.1.10') && e.ok,
            success: '0% packet loss, ~12ms — alive and close.',
          },
          {
            text: 'Trace the stepping stones to the outside world: <code>traceroute quest.dev</code>.',
            hint: 'Type: <code>traceroute quest.dev</code>',
            check: (e) => e.cmd === 'traceroute' && e.out.includes('gateway'),
            success: 'Each hop is a router your packets pass through.',
          },
          {
            text: 'Ask DNS for quest.dev\'s address, tersely: <code>dig +short quest.dev</code>.',
            hint: 'Type: <code>dig +short quest.dev</code>',
            check: (e) => e.cmd === 'dig' && e.out.includes('203.0.113.10'),
          },
          {
            text: 'Try the other oracle: <code>nslookup api.quest.dev</code>.',
            hint: 'Type: <code>nslookup api.quest.dev</code>',
            check: (e) => e.cmd === 'nslookup' && e.out.includes('203.0.113.20'),
          },
          {
            quiz: {
              question: '<code>ping web-01</code> works but <code>ping quest.dev</code> says "Name or service not known". What is broken?',
              choices: ['DNS resolution — the name cannot be turned into an IP', 'The network cable', 'The remote server is off', 'Your firewall blocks ICMP'],
              answer: 0,
              explain: '"Name or service not known" = the name never resolved. The network might be fine — DNS is not.',
              explainWrong: 'Read the error: it complains about the NAME, before any packet was ever sent.',
            },
            text: 'A riddle from the void:',
          },
        ],
      },
      {
        id: 'net-3',
        title: 'The Spectral Door',
        story:
          '<code>ssh</code> opens a spectral door: your terminal steps <i>inside another machine</i>. ' +
          'The syntax is <code>ssh user@host</code>. Watch your prompt — it always tells you where your commands land. ' +
          '<code>exit</code> steps back out.',
        outro: 'Distant machines are now rooms you can walk into.',
        tasks: [
          {
            text: 'Step through to the web server: <code>ssh hero@web-01</code>.',
            hint: 'Type: <code>ssh hero@web-01</code>',
            check: (e) => e.cmd === 'ssh' && e.world.hostname === 'web-01',
            success: 'Look at the prompt: hero@web-01. Everything you type now runs THERE.',
          },
          {
            text: 'You are on web-01 now. Read the note someone left: <code>cat notes.txt</code>.',
            hint: 'Type: <code>cat notes.txt</code> (you land in /home/hero on the remote machine)',
            check: (e) => e.cmd === 'cat' && e.out.includes('db-01'),
          },
          {
            text: 'Step back out with <code>exit</code>.',
            hint: 'Type: <code>exit</code>',
            check: (e) => e.cmd === 'exit' && e.world.hostname === 'sanctum',
            success: 'Home again. The prompt confirms it.',
          },
          {
            text: 'The note pointed to the database server. Enter it: <code>ssh hero@db-01</code>.',
            hint: 'Type: <code>ssh hero@db-01</code>',
            check: (e) => e.cmd === 'ssh' && e.world.hostname === 'db-01',
          },
          {
            text: 'Find and read the vault key file waiting in your remote home.',
            hint: 'Type: <code>ls</code> then <code>cat db-key.txt</code>',
            check: (e) => e.out.includes('AQUA_SIGIL'),
            success: 'AQUA_SIGIL — carry it well. Now type exit to come home (or stay and explore).',
          },
        ],
      },
      {
        id: 'net-4',
        title: "The Merchant's Parcel",
        story:
          'Two more bridge-spells: <code>scp</code> carries <b>files</b> across ssh (<code>scp file user@host:path</code>), ' +
          'and <code>curl</code> speaks <b>HTTP</b> — asking web servers for pages and APIs for answers.',
        outro: 'You can ship cargo and question any web service.',
        setup(w) { w.cwd = w.home; },
        tasks: [
          {
            text: 'Write a parcel to ship: <code>echo "greetings from sanctum" &gt; parcel.txt</code>.',
            hint: 'Type: <code>echo "greetings from sanctum" &gt; parcel.txt</code>',
            check: (e) => { const n = N(e.world, '/home/hero/parcel.txt'); return n && n.content.includes('greetings'); },
          },
          {
            text: 'Ship it to web-01\'s home directory: <code>scp parcel.txt hero@web-01:/home/hero/</code>.',
            hint: 'Type: <code>scp parcel.txt hero@web-01:/home/hero/</code>',
            check: (e) => {
              const host = e.world.net.hosts['web-01'];
              const hh = host.fs.children.home && host.fs.children.home.children.hero;
              return e.cmd === 'scp' && hh && hh.children['parcel.txt'];
            },
            success: '100% transferred. scp = "secure copy over ssh".',
          },
          {
            text: 'Now speak HTTP. Fetch the quest homepage: <code>curl http://quest.dev</code>.',
            hint: 'Type: <code>curl http://quest.dev</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('Welcome to Quest.dev'),
          },
          {
            text: 'Sometimes you only want the <b>headers</b> (status code, server, content type): <code>curl -I http://quest.dev</code>.',
            hint: 'Type: <code>curl -I http://quest.dev</code>',
            check: (e) => e.cmd === 'curl' && e.argv.includes('-I') && e.out.includes('200 OK'),
            success: 'HTTP/1.1 200 OK — the universal "all is well".',
          },
          {
            text: 'Query a JSON API: <code>curl https://api.quest.dev/health</code>. APIs answer in JSON instead of HTML.',
            hint: 'Type: <code>curl https://api.quest.dev/health</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('"status":"ok"'),
          },
          {
            quiz: {
              question: '<code>curl https://api.quest.dev/secret</code> returns status <b>401</b>. What does that mean?',
              choices: ['Unauthorized — you need credentials', 'Not Found — wrong URL', 'Server crashed', 'Redirect somewhere else'],
              answer: 0,
              explain: '401 = who are you? 403 = I know you, and no. 404 = no such thing. 500 = the server broke.',
              explainWrong: 'The 4xx family means the CLIENT did something wrong. 401 is specifically about missing auth.',
            },
            text: 'Try it if you like (<code>curl https://api.quest.dev/secret</code>), then answer:',
          },
        ],
      },
      {
        id: 'net-5',
        title: 'Gates and Guardians',
        story:
          'A machine has one address but many <b>ports</b> — numbered gates, each guarded by a service. ' +
          'ssh waits at gate 22, HTTP at 80, HTTPS at 443, PostgreSQL at 5432. ' +
          '<code>ss</code>/<code>netstat</code> list the open gates; <code>nc</code> knocks on one from outside.',
        outro: 'You see every gate, and know who guards it.',
        tasks: [
          {
            text: 'Enter the web server: <code>ssh hero@web-01</code>.',
            hint: 'Type: <code>ssh hero@web-01</code>',
            check: (e) => e.world.hostname === 'web-01',
          },
          {
            text: 'List its LISTENING gates: <code>ss -tln</code> (or <code>netstat -tln</code>). The <code>-l</code> is the key — without it, real ss shows only established connections, not listeners.',
            hint: 'Type: <code>ss -tln</code> (-t TCP, -l listening, -n numeric ports)',
            check: (e) => (e.cmd === 'ss' || e.cmd === 'netstat') && e.argv.some((x) => /^-[a-z]*l/.test(x)) && e.out.includes(':80'),
            success: 'Gate 22 (sshd) and gate 80 (nginx) stand open, LISTENing.',
          },
          {
            text: 'From here, knock on the database\'s gate: <code>nc -zv db-01 5432</code>.',
            hint: 'Type: <code>nc -zv db-01 5432</code> — -z just checks, -v reports.',
            check: (e) => e.cmd === 'nc' && e.out.includes('succeeded'),
            success: 'Connection succeeded — postgres is listening on 5432.',
          },
          {
            text: 'Return home: <code>exit</code>.',
            hint: 'Type: <code>exit</code>',
            check: (e) => e.world.hostname === 'sanctum',
          },
          {
            quiz: {
              question: 'Match the guardian to its gate: which set is correct?',
              choices: ['22=ssh, 80=http, 443=https, 5432=postgres', '22=http, 80=ssh, 443=dns, 5432=redis', '21=ssh, 8080=https, 443=ftp, 3306=postgres', '53=ssh, 22=dns, 80=https, 443=http'],
              answer: 0,
              explain: 'Also worth memorizing: 53=DNS, 3306=MySQL, 6379=Redis.',
              explainWrong: 'The classics: 22 ssh, 80 http, 443 https. Databases live higher: 5432 postgres.',
            },
            text: 'The gatekeeper\'s test:',
          },
        ],
      },
      {
        id: 'net-boss',
        title: 'The Silent Server',
        boss: true,
        story:
          '🔥 <b>ALARM!</b> The Quest Portal (on web-01) has gone silent — visitors see only errors. ' +
          'You are the on-call wizard. Diagnose it like a professional: check the symptom, verify the machine lives, ' +
          'go inside, find the fallen guardian, raise it, and verify the cure. ' +
          '<br><br>⚠️ <i>Wrong quiz answers cost a heart.</i>',
        outro: 'The Portal shines again. You have completed your first real incident. 🏆',
        setup(w) {
          w.net.hosts['web-01'].services.nginx = 'stopped';
          w.cwd = w.home;
        },
        tasks: [
          {
            text: 'First, confirm the symptom yourself: <code>curl http://web-01</code>.',
            hint: 'Type: <code>curl http://web-01</code>',
            check: (e) => e.cmd === 'curl' && !e.ok && e.raw.includes('web-01'),
            success: 'Connection refused — the machine answered, but nothing is listening on port 80.',
          },
          {
            text: 'Is the machine itself alive? <code>ping -c 2 web-01</code>.',
            hint: 'Type: <code>ping -c 2 web-01</code>',
            check: (e) => e.cmd === 'ping' && e.ok && e.raw.includes('web-01'),
            success: 'It pings. So: machine up, service down. The problem is INSIDE.',
          },
          {
            quiz: {
              question: '"Connection refused" + host pings fine. Most likely cause?',
              choices: ['The service on that port is not running', 'DNS is broken', 'The whole server is powered off', 'Your internet is down'],
              answer: 0,
              explain: 'Refused = the OS actively said "no one is listening here". The host is reachable; the service is dead.',
              explainWrong: 'If DNS or the host were dead, curl would say "could not resolve" or time out — not "refused".',
            },
            text: 'The Silent Server hisses. Reason through it:',
          },
          {
            text: 'Go inside: <code>ssh hero@web-01</code>.',
            hint: 'Type: <code>ssh hero@web-01</code>',
            check: (e) => e.world.hostname === 'web-01',
          },
          {
            text: 'Question the guardian: <code>systemctl status nginx</code>.',
            hint: 'Type: <code>systemctl status nginx</code>',
            check: (e) => e.cmd === 'systemctl' && e.out.includes('failed'),
            success: 'Active: failed. There is the corpse.',
          },
          {
            text: 'Raise it: <code>systemctl restart nginx</code>, then verify with <code>systemctl status nginx</code> if you wish.',
            hint: 'Type: <code>systemctl restart nginx</code>',
            check: (e) => e.cmd === 'systemctl' && e.world.net.hosts['web-01'].services.nginx === 'running',
          },
          {
            text: 'Never declare victory without verifying: <code>curl http://web-01</code> (from here or after <code>exit</code>).',
            hint: 'Type: <code>curl http://web-01</code>',
            check: (e) => e.cmd === 'curl' && e.out.includes('Quest Portal'),
            success: '200 OK. Incident resolved — and you verified the fix.',
          },
        ],
      },
    ],
  });

  // ---- Realm 3: networking concepts ---------------------------------------

  CLIQ.modules.push({
    id: 'concepts',
    icon: '🧭',
    title: 'The DNS Labyrinth',
    tagline: 'IPs, subnets, DNS, ports, TCP — the theory that makes tools make sense',
    quests: [
      {
        id: 'con-1',
        title: 'The Language of Addresses',
        story:
          'Every machine speaks in numbers. An <b>IPv4 address</b> is four numbers 0–255 (e.g. <code>10.0.1.5</code>). ' +
          'The <b>/24</b> suffix (CIDR) says how much of the address names the <i>network</i> vs the <i>machine</i>: ' +
          '/24 means the first 3 numbers are the neighborhood, the last one is the house.',
        outro: 'Addresses are no longer noise — they are maps.',
        tasks: [
          {
            quiz: {
              question: 'Which of these is a valid IPv4 address?',
              choices: ['192.168.1.42', '192.168.1.300', '10.0.0', '300.1.1.1'],
              answer: 0,
              explain: 'Four octets, each 0–255. 300 is out of range; three octets is too few.',
            },
            text: 'The Labyrinth speaks:',
          },
          {
            quiz: {
              question: 'Your IP is <code>10.0.1.5/24</code>. Which machine is in YOUR local subnet?',
              choices: ['10.0.1.99', '10.0.2.5', '192.168.1.5', '8.8.8.8'],
              answer: 0,
              explain: '/24 fixes the first three octets: everything 10.0.1.x is local. 10.0.2.5 needs the gateway.',
              explainWrong: '/24 means "first three numbers must match" — compare 10.0.1.* against each choice.',
            },
            text: 'Second riddle:',
          },
          {
            text: 'Confirm it empirically: run <code>ip addr</code> and find your address + prefix, then declare your subnet: <code>echo 10.0.1.0/24</code>.',
            hint: 'Run <code>ip addr</code>, note "10.0.1.5/24", then type: <code>echo 10.0.1.0/24</code>',
            check: (e) => e.raw.includes('10.0.1.0/24'),
            success: '10.0.1.0/24 — 256 addresses, .0 the network name, .255 the broadcast, 254 usable houses.',
          },
          {
            quiz: {
              question: 'Which address ranges are <b>private</b> (never routed on the public internet)?',
              choices: ['10.x.x.x, 172.16–31.x.x, 192.168.x.x', '8.8.x.x and 1.1.x.x', 'Anything starting with 203', 'All addresses ending in .1'],
              answer: 0,
              explain: 'RFC1918. Your home and office use these; a NAT gateway translates them to a public IP.',
            },
            text: 'Third riddle:',
          },
        ],
      },
      {
        id: 'con-2',
        title: 'The Name Weavers',
        story:
          'Humans speak names; networks speak numbers. <b>DNS</b> is the translator. ' +
          'When you ask for <code>quest.dev</code>, your resolver checks its cache, then walks the chain: ' +
          'root servers → <code>.dev</code> servers → quest.dev\'s own nameserver → an <b>A record</b>: the IP.',
        outro: 'You have walked the labyrinth of names and returned.',
        tasks: [
          {
            text: 'Resolve a name yourself: <code>dig www.quest.dev</code> — find the A record in the ANSWER SECTION.',
            hint: 'Type: <code>dig www.quest.dev</code>',
            check: (e) => e.cmd === 'dig' && e.out.includes('203.0.113.10'),
          },
          {
            quiz: {
              question: 'An <b>A record</b> maps a name to an IPv4 address. What does a <b>CNAME</b> record do?',
              choices: ['Maps a name to ANOTHER name (an alias)', 'Maps a name to an email server', 'Encrypts DNS queries', 'Stores the domain owner\'s name'],
              answer: 0,
              explain: 'CNAME = canonical name = alias. (MX = mail, AAAA = IPv6, TXT = arbitrary text.)',
            },
            text: 'A name-weaver\'s question:',
          },
          {
            text: 'Companies run <i>internal</i> DNS too. Resolve the internal name: <code>dig +short db-01.quest.internal</code>.',
            hint: 'Type: <code>dig +short db-01.quest.internal</code>',
            check: (e) => e.cmd === 'dig' && e.out.includes('10.0.2.5'),
            success: 'A private IP from internal DNS — invisible to the outside world.',
          },
          {
            quiz: {
              question: 'You change a DNS record but users still reach the OLD address for an hour. Why?',
              choices: ['Resolvers cache records until the TTL expires', 'DNS changes need a server reboot', 'The users\' browsers are broken', 'Old records must be deleted by the root servers'],
              answer: 0,
              explain: 'Every record carries a TTL (time-to-live). Caches serve the old answer until it expires — that is "DNS propagation".',
              explainWrong: 'Think about the TTL field you saw in the dig output.',
            },
            text: 'The final weave:',
          },
        ],
      },
      {
        id: 'con-3',
        title: 'Paths Through the Mist',
        story:
          'A message crossing the network is wrapped in layers, like a letter in envelopes: ' +
          'your data → <b>TCP/UDP</b> (which app? which port? reliable or fast?) → <b>IP</b> (which machine?) → the wire. ' +
          '<b>TCP</b> shakes hands and guarantees delivery; <b>UDP</b> just throws and hopes — perfect for DNS lookups and games.',
        outro: 'The mist parts. You see the layers beneath every packet.',
        tasks: [
          {
            text: 'Watch a packet\'s path across networks: <code>traceroute api.quest.dev</code>.',
            hint: 'Type: <code>traceroute api.quest.dev</code>',
            check: (e) => e.cmd === 'traceroute' && e.out.includes('isp-edge'),
            success: 'Each hop is a router unwrapping the IP envelope to decide the next step.',
          },
          {
            quiz: {
              question: 'Which statement about <b>TCP vs UDP</b> is true?',
              choices: [
                'TCP guarantees ordered delivery via handshake+acks; UDP is fire-and-forget',
                'UDP is always encrypted; TCP is not',
                'TCP is only for web pages; UDP only for email',
                'UDP retransmits lost packets automatically',
              ],
              answer: 0,
              explain: 'HTTP/SSH ride on TCP (must not lose bytes). DNS queries and video calls ride on UDP (speed over perfection).',
            },
            text: 'The mist asks:',
          },
          {
            quiz: {
              question: 'An IP address gets you to the right <i>machine</i>. What gets you to the right <i>program</i> on it?',
              choices: ['The port number', 'The MAC address', 'The hostname', 'The TTL'],
              answer: 0,
              explain: 'IP:port — 10.0.1.10:80 means "machine 10.0.1.10, program listening at gate 80".',
            },
            text: 'Deeper in:',
          },
          {
            text: 'Before DNS, there was a simple file. Read your machine\'s local name table: <code>cat /etc/hosts</code>.',
            hint: 'Type: <code>cat /etc/hosts</code>',
            check: (e) => e.cmd === 'cat' && e.out.includes('web-01'),
            success: '/etc/hosts is checked BEFORE DNS — handy for testing, dangerous when forgotten.',
          },
          {
            quiz: {
              question: 'You add <code>1.2.3.4 quest.dev</code> to /etc/hosts. What happens when you ping quest.dev?',
              choices: ['It pings 1.2.3.4 — /etc/hosts wins over DNS', 'It pings the real DNS answer', 'An error — you cannot override DNS', 'Both addresses are pinged'],
              answer: 0,
              explain: 'The resolver checks /etc/hosts first. A classic source of "works on my machine".',
            },
            text: 'The mist tests your memory:',
          },
        ],
      },
      {
        id: 'con-boss',
        title: 'The Labyrinth Guardian',
        boss: true,
        story:
          'At the Labyrinth\'s heart waits the Guardian, who speaks only in <b>broken networks</b>. ' +
          'It will describe failures; you must name the layer and cast the right diagnostic. ' +
          'This is the real skill: turning a vague "it doesn\'t work!" into a precise chain of checks.' +
          '<br><br>⚠️ <i>Wrong answers cost a heart.</i>',
        outro: 'The Guardian bows. You debug networks by layers now, not by luck. 🏆',
        tasks: [
          {
            quiz: {
              question: 'A user cries: "quest.dev is down!" What is the FIRST thing to establish?',
              choices: [
                'Whether the name even resolves: dig +short quest.dev',
                'Reboot the server immediately',
                'Clear the user\'s browser cache',
                'Check your firewall rules',
              ],
              answer: 0,
              explain: 'Work up the layers: name → reachability → port → service. Resolution comes first.',
              explainWrong: 'Never act before diagnosing. Start at the bottom: does the NAME resolve?',
            },
            text: 'The Guardian\'s first trial:',
          },
          {
            text: 'Cast it: <code>dig +short quest.dev</code>.',
            hint: 'Type: <code>dig +short quest.dev</code>',
            check: (e) => e.cmd === 'dig' && e.out.includes('203.0.113.10'),
            success: 'Resolves fine. DNS is innocent — this time.',
          },
          {
            quiz: {
              question: 'The name resolves and the host pings, but the page won\'t load. What do you probe NEXT?',
              choices: ['Whether the service port (80/443) is open — nc -zv host 443', 'The DNS root servers', 'The user\'s keyboard', 'Whether the IP is IPv6'],
              answer: 0,
              explain: 'Layer by layer: name ✓, machine ✓ — now the port/service.',
            },
            text: 'The second trial:',
          },
          {
            text: 'Knock on the gate: <code>nc -zv quest.dev 80</code>.',
            hint: 'Type: <code>nc -zv quest.dev 80</code>',
            check: (e) => e.cmd === 'nc' && e.out.includes('succeeded'),
            success: 'Port open. Full chain verified: DNS → ping → port → service.',
          },
          {
            quiz: {
              question: 'traceroute shows hops 1 and 2 fine, then <code>* * *</code> forever at hop 3. Best interpretation?',
              choices: [
                'Traffic is dropped or filtered at/after hop 3 — likely a firewall or dead router',
                'Your machine has no network at all',
                'DNS failed',
                'traceroute is broken and needs reinstalling',
              ],
              answer: 0,
              explain: 'Stars mean "no reply". You got 2 hops out, so the path dies in the middle — beyond your control, time to call the provider.',
              explainWrong: 'You DID reach hops 1-2, so local network and DNS are fine. Where do the replies stop?',
            },
            text: 'The third trial:',
          },
          {
            quiz: {
              question: 'Final trial — order these correctly, bottom to top, as a packet is built:',
              choices: [
                'Your data → TCP (port) → IP (address) → wire',
                'IP → data → wire → TCP',
                'Wire → data → IP → TCP',
                'TCP → wire → IP → data',
              ],
              answer: 0,
              explain: 'App data gets a TCP envelope (which program), then an IP envelope (which machine), then hits the wire. Routers read only the IP envelope.',
            },
            text: 'The Guardian raises its final riddle:',
          },
        ],
      },
    ],
  });
})();
