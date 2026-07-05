/* Terminal Quest — Thai: Realms 2 (Bridge of Echoes), 3 (DNS Labyrinth), 6 (Chronicle of Branches) */
(function () {
  CLIQ.i18n.register('th', {

    // ===== boss names & taunts (all realms) =================================
    'THE SILENT SERVER': 'เซิร์ฟเวอร์เงียบงัน',
    'Port 80 answers to no one!': 'พอร์ต 80 ไม่ขานรับผู้ใด!',
    'LABYRINTH GUARDIAN': 'ผู้พิทักษ์เขาวงกต',
    'Name the layer, or be lost!': 'จงบอกชื่อเลเยอร์ มิฉะนั้นจะหลงทาง!',
    'WARDEN OF THE CITADEL': 'ผู้คุมป้อมปราการ',
    'Your gold drains by the hour!': 'ทองของเจ้ารั่วไหลทุกชั่วโมง!',
    'THE CHAOS WYRM': 'มังกรแห่งความโกลาหล',
    'Your pods shall crash forever!': 'พ็อดของเจ้าจะแครชตลอดกาล!',
    'THE MERGE WRAITH': 'ภูตแห่งการ MERGE',
    'Your history is MINE to tangle!': 'ประวัติศาสตร์ของเจ้าเป็นของข้า จะพันให้ยุ่งเหยิง!',
    'THE IMAGE GOLEM': 'โกเลมอิมเมจ',
    'Exit code 1! Forever 1!': 'Exit code 1! ตลอดไป 1!',
    'THE RUNAWAY DAEMON': 'เดมอนคลุ้มคลั่ง',
    '97% CPU and climbing!': 'CPU 97% และกำลังพุ่งขึ้น!',
    'ARCHLICH OF LEGACY SYSTEMS': 'อาร์ชลิชแห่งระบบโบราณ',
    'None have ever passed my Trial!': 'ไม่เคยมีผู้ใดผ่านบททดสอบของข้า!',

    // ===== Realm 2: The Bridge of Echoes ====================================
    // --- net-1 Know Thyself ---
    'Before you cross the Bridge to other machines, know your own. Every machine on a network has an <b>IP address</b> (its street address) and routes traffic to the wider world through a <b>gateway</b>.':
      'ก่อนจะข้ามสะพานไปยังเครื่องอื่น จงรู้จักเครื่องของตนเอง ทุกเครื่องบนเครือข่ายมี <b>IP address</b> (ที่อยู่บ้านของมัน) และส่งทราฟฟิกออกสู่โลกกว้างผ่าน <b>gateway</b>',
    'You know your name, your address, and your road out.': 'เจ้ารู้ชื่อ รู้ที่อยู่ และรู้เส้นทางออกของตนเองแล้ว',
    'Ask the machine its name: <code>hostname</code>.': 'ถามชื่อเครื่อง: <code>hostname</code>',
    'Type: <code>hostname</code>': 'พิมพ์: <code>hostname</code>',
    'Reveal your network interfaces and IP address: <code>ip addr</code>.': 'เปิดเผยอินเทอร์เฟซเครือข่ายและ IP address ของเจ้า: <code>ip addr</code>',
    'Type: <code>ip addr</code> (old-timers use <code>ifconfig</code> — both work here)': 'พิมพ์: <code>ip addr</code> (รุ่นเก๋าใช้ <code>ifconfig</code> — ใช้ได้ทั้งคู่)',
    'eth0 carries 10.0.1.5/24 — that is you. (lo 127.0.0.1 is the loopback: the machine talking to itself.)':
      'eth0 ถือ 10.0.1.5/24 — นั่นคือเจ้า (ส่วน lo 127.0.0.1 คือ loopback: เครื่องคุยกับตัวเอง)',
    'Find the road out — your default gateway: <code>ip route</code>.': 'หาเส้นทางออก — default gateway ของเจ้า: <code>ip route</code>',
    'Type: <code>ip route</code>': 'พิมพ์: <code>ip route</code>',
    'Traffic to anywhere unknown goes "default via 10.0.1.1" — the gateway.': 'ทราฟฟิกไปยังที่ที่ไม่รู้จักจะวิ่งผ่าน "default via 10.0.1.1" — นั่นคือ gateway',
    'The Bridge keeper asks:': 'ผู้เฝ้าสะพานถาม:',
    'What does the <b>default gateway</b> do?': '<b>default gateway</b> ทำหน้าที่อะไร?',
    'Forwards your traffic toward networks you are not directly connected to': 'ส่งต่อทราฟฟิกไปยังเครือข่ายที่เจ้าไม่ได้เชื่อมต่อโดยตรง',
    'Stores your files remotely': 'เก็บไฟล์ของเจ้าไว้ที่อื่น',
    'Assigns names to IP addresses': 'ตั้งชื่อให้ IP address',
    'Blocks all incoming traffic': 'บล็อกทราฟฟิกขาเข้าทั้งหมด',
    'The gateway (router) is the exit door of your local network.': 'gateway (เราเตอร์) คือประตูทางออกของเครือข่ายท้องถิ่นของเจ้า',

    // --- net-2 Echoes Across the Void ---
    'Two questions rule all network debugging: <b>"is it alive?"</b> (<code>ping</code>) and <b>"what is its address?"</b> (<code>dig</code>/<code>nslookup</code> for DNS). <code>traceroute</code> shows the stepping stones between you and it.':
      'สองคำถามครองการดีบักเครือข่ายทั้งปวง: <b>"มันยังมีชีวิตไหม?"</b> (<code>ping</code>) และ <b>"ที่อยู่ของมันคืออะไร?"</b> (<code>dig</code>/<code>nslookup</code> สำหรับ DNS) ส่วน <code>traceroute</code> แสดงหินทุกก้อนที่ใช้ข้ามระหว่างเจ้ากับมัน',
    'You can now sound the void and hear what answers.': 'บัดนี้เจ้าส่งเสียงเข้าห้วงเหวและฟังสิ่งที่ขานตอบได้แล้ว',
    'Send three echoes to the web server: <code>ping -c 3 web-01</code>.': 'ส่งเสียงสะท้อนสามครั้งไปยังเว็บเซิร์ฟเวอร์: <code>ping -c 3 web-01</code>',
    'Type: <code>ping -c 3 web-01</code> — without <code>-c</code>, real ping runs forever until Ctrl-C.':
      'พิมพ์: <code>ping -c 3 web-01</code> — ถ้าไม่มี <code>-c</code> ping ตัวจริงจะวิ่งตลอดไปจนกด Ctrl-C',
    '0% packet loss, ~12ms — alive and close.': 'แพ็กเก็ตหาย 0%, ~12ms — ยังมีชีวิตและอยู่ใกล้',
    'Trace the stepping stones to the outside world: <code>traceroute quest.dev</code>.': 'ไล่รอยหินข้ามน้ำสู่โลกภายนอก: <code>traceroute quest.dev</code>',
    'Type: <code>traceroute quest.dev</code>': 'พิมพ์: <code>traceroute quest.dev</code>',
    'Each hop is a router your packets pass through.': 'แต่ละ hop คือเราเตอร์ที่แพ็กเก็ตของเจ้าวิ่งผ่าน',
    "Ask DNS for quest.dev's address, tersely: <code>dig +short quest.dev</code>.": 'ถาม DNS หาที่อยู่ของ quest.dev แบบกระชับ: <code>dig +short quest.dev</code>',
    'Type: <code>dig +short quest.dev</code>': 'พิมพ์: <code>dig +short quest.dev</code>',
    'Try the other oracle: <code>nslookup api.quest.dev</code>.': 'ลองถามนักพยากรณ์อีกตน: <code>nslookup api.quest.dev</code>',
    'Type: <code>nslookup api.quest.dev</code>': 'พิมพ์: <code>nslookup api.quest.dev</code>',
    'A riddle from the void:': 'ปริศนาจากห้วงเหว:',
    '<code>ping web-01</code> works but <code>ping quest.dev</code> says "Name or service not known". What is broken?':
      '<code>ping web-01</code> ใช้ได้ แต่ <code>ping quest.dev</code> บอกว่า "Name or service not known" — อะไรพัง?',
    'DNS resolution — the name cannot be turned into an IP': 'การแปลงชื่อ DNS — ชื่อแปลงเป็น IP ไม่ได้',
    'The network cable': 'สายแลน',
    'The remote server is off': 'เซิร์ฟเวอร์ปลายทางปิดอยู่',
    'Your firewall blocks ICMP': 'ไฟร์วอลล์ของเจ้าบล็อก ICMP',
    '"Name or service not known" = the name never resolved. The network might be fine — DNS is not.':
      '"Name or service not known" = ชื่อไม่เคยถูกแปลงเลย เครือข่ายอาจปกติดี — แต่ DNS ไม่ปกติ',
    'Read the error: it complains about the NAME, before any packet was ever sent.': 'อ่านข้อความผิดพลาดดี ๆ: มันบ่นเรื่อง "ชื่อ" ก่อนจะส่งแพ็กเก็ตใด ๆ เสียอีก',

    // --- net-3 The Spectral Door ---
    '<code>ssh</code> opens a spectral door: your terminal steps <i>inside another machine</i>. The syntax is <code>ssh user@host</code>. Watch your prompt — it always tells you where your commands land. <code>exit</code> steps back out.':
      '<code>ssh</code> เปิดประตูวิญญาณ: เทอร์มินัลของเจ้าก้าวเข้าไป <i>อยู่ในเครื่องอื่น</i> ไวยากรณ์คือ <code>ssh user@host</code> จับตาดูพรอมต์ — มันบอกเสมอว่าคำสั่งของเจ้าไปลงที่เครื่องไหน ส่วน <code>exit</code> ใช้ก้าวกลับออกมา',
    'Distant machines are now rooms you can walk into.': 'เครื่องอันไกลโพ้นกลายเป็นห้องที่เจ้าเดินเข้าไปได้แล้ว',
    'Step through to the web server: <code>ssh hero@web-01</code>.': 'ก้าวผ่านประตูไปยังเว็บเซิร์ฟเวอร์: <code>ssh hero@web-01</code>',
    'Type: <code>ssh hero@web-01</code>': 'พิมพ์: <code>ssh hero@web-01</code>',
    'Look at the prompt: hero@web-01. Everything you type now runs THERE.': 'ดูพรอมต์สิ: hero@web-01 — ทุกอย่างที่พิมพ์ตอนนี้จะรัน "ที่นั่น"',
    'You are on web-01 now. Read the note someone left: <code>cat notes.txt</code>.': 'ตอนนี้เจ้าอยู่บน web-01 แล้ว อ่านโน้ตที่ใครบางคนทิ้งไว้: <code>cat notes.txt</code>',
    'Type: <code>cat notes.txt</code> (you land in /home/hero on the remote machine)': 'พิมพ์: <code>cat notes.txt</code> (เจ้าลงจอดที่ /home/hero บนเครื่องปลายทาง)',
    'Step back out with <code>exit</code>.': 'ก้าวกลับออกมาด้วย <code>exit</code>',
    'Type: <code>exit</code>': 'พิมพ์: <code>exit</code>',
    'Home again. The prompt confirms it.': 'กลับถึงบ้านแล้ว พรอมต์ยืนยัน',
    'The note pointed to the database server. Enter it: <code>ssh hero@db-01</code>.': 'โน้ตชี้ไปยังเซิร์ฟเวอร์ฐานข้อมูล เข้าไปเลย: <code>ssh hero@db-01</code>',
    'Type: <code>ssh hero@db-01</code>': 'พิมพ์: <code>ssh hero@db-01</code>',
    'Find and read the vault key file waiting in your remote home.': 'ค้นหาและอ่านไฟล์กุญแจห้องนิรภัยที่รออยู่ในโฮมของเครื่องปลายทาง',
    'Type: <code>ls</code> then <code>cat db-key.txt</code>': 'พิมพ์: <code>ls</code> แล้วตามด้วย <code>cat db-key.txt</code>',
    'AQUA_SIGIL — carry it well. Now type exit to come home (or stay and explore).': 'AQUA_SIGIL — เก็บไว้ให้ดี ทีนี้พิมพ์ exit เพื่อกลับบ้าน (หรือจะอยู่สำรวจต่อก็ได้)',

    // --- net-4 The Merchant's Parcel ---
    'Two more bridge-spells: <code>scp</code> carries <b>files</b> across ssh (<code>scp file user@host:path</code>), and <code>curl</code> speaks <b>HTTP</b> — asking web servers for pages and APIs for answers.':
      'อีกสองคาถาแห่งสะพาน: <code>scp</code> ขน <b>ไฟล์</b> ข้าม ssh (<code>scp file user@host:path</code>) และ <code>curl</code> พูดภาษา <b>HTTP</b> — ขอหน้าเว็บจากเซิร์ฟเวอร์และขอคำตอบจาก API',
    'You can ship cargo and question any web service.': 'เจ้าส่งสินค้าและซักถามเว็บเซอร์วิสใด ๆ ได้แล้ว',
    'Write a parcel to ship: <code>echo "greetings from sanctum" &gt; parcel.txt</code>.': 'เขียนพัสดุเตรียมส่ง: <code>echo "greetings from sanctum" &gt; parcel.txt</code>',
    'Type: <code>echo "greetings from sanctum" &gt; parcel.txt</code>': 'พิมพ์: <code>echo "greetings from sanctum" &gt; parcel.txt</code>',
    "Ship it to web-01's home directory: <code>scp parcel.txt hero@web-01:/home/hero/</code>.": 'ส่งไปยังโฮมของ web-01: <code>scp parcel.txt hero@web-01:/home/hero/</code>',
    'Type: <code>scp parcel.txt hero@web-01:/home/hero/</code>': 'พิมพ์: <code>scp parcel.txt hero@web-01:/home/hero/</code>',
    '100% transferred. scp = "secure copy over ssh".': 'ส่งครบ 100% — scp ก็คือ "secure copy ผ่าน ssh"',
    'Now speak HTTP. Fetch the quest homepage: <code>curl http://quest.dev</code>.': 'ทีนี้พูดภาษา HTTP ดึงหน้าแรกของเควสต์: <code>curl http://quest.dev</code>',
    'Type: <code>curl http://quest.dev</code>': 'พิมพ์: <code>curl http://quest.dev</code>',
    'Sometimes you only want the <b>headers</b> (status code, server, content type): <code>curl -I http://quest.dev</code>.':
      'บางครั้งเจ้าต้องการแค่ <b>headers</b> (status code, เซิร์ฟเวอร์, content type): <code>curl -I http://quest.dev</code>',
    'Type: <code>curl -I http://quest.dev</code>': 'พิมพ์: <code>curl -I http://quest.dev</code>',
    'HTTP/1.1 200 OK — the universal "all is well".': 'HTTP/1.1 200 OK — สัญญาณสากลว่า "ทุกอย่างเรียบร้อยดี"',
    'Query a JSON API: <code>curl https://api.quest.dev/health</code>. APIs answer in JSON instead of HTML.':
      'ถาม JSON API: <code>curl https://api.quest.dev/health</code> — API ตอบเป็น JSON แทน HTML',
    'Type: <code>curl https://api.quest.dev/health</code>': 'พิมพ์: <code>curl https://api.quest.dev/health</code>',
    'Try it if you like (<code>curl https://api.quest.dev/secret</code>), then answer:': 'ลองดูก็ได้ (<code>curl https://api.quest.dev/secret</code>) แล้วตอบ:',
    '<code>curl https://api.quest.dev/secret</code> returns status <b>401</b>. What does that mean?':
      '<code>curl https://api.quest.dev/secret</code> ตอบกลับด้วยสถานะ <b>401</b> — หมายความว่าอะไร?',
    'Unauthorized — you need credentials': 'Unauthorized — ต้องมีข้อมูลยืนยันตัวตน',
    'Not Found — wrong URL': 'Not Found — URL ผิด',
    'Server crashed': 'เซิร์ฟเวอร์พัง',
    'Redirect somewhere else': 'ถูกเปลี่ยนเส้นทางไปที่อื่น',
    '401 = who are you? 403 = I know you, and no. 404 = no such thing. 500 = the server broke.':
      '401 = เจ้าเป็นใคร? 403 = รู้จักเจ้า แต่ไม่ให้ 404 = ไม่มีของสิ่งนั้น 500 = เซิร์ฟเวอร์พังเอง',
    'The 4xx family means the CLIENT did something wrong. 401 is specifically about missing auth.':
      'ตระกูล 4xx แปลว่า "ฝั่งไคลเอนต์" ทำอะไรผิด และ 401 เจาะจงเรื่องขาดการยืนยันตัวตน',

    // --- net-5 Gates and Guardians ---
    'A machine has one address but many <b>ports</b> — numbered gates, each guarded by a service. ssh waits at gate 22, HTTP at 80, HTTPS at 443, PostgreSQL at 5432. <code>ss</code>/<code>netstat</code> list the open gates; <code>nc</code> knocks on one from outside.':
      'เครื่องหนึ่งมีที่อยู่เดียวแต่มีหลาย <b>พอร์ต</b> — ประตูติดหมายเลข แต่ละบานมีเซอร์วิสเฝ้าอยู่ ssh รอที่ประตู 22, HTTP ที่ 80, HTTPS ที่ 443, PostgreSQL ที่ 5432 คำสั่ง <code>ss</code>/<code>netstat</code> แสดงประตูที่เปิดอยู่ ส่วน <code>nc</code> ใช้เคาะประตูจากภายนอก',
    'You see every gate, and know who guards it.': 'เจ้ามองเห็นทุกประตู และรู้ว่าใครเฝ้าอยู่',
    'Enter the web server: <code>ssh hero@web-01</code>.': 'เข้าไปในเว็บเซิร์ฟเวอร์: <code>ssh hero@web-01</code>',
    'List its open gates: <code>ss</code> (or <code>netstat</code>).': 'แสดงประตูที่เปิดอยู่: <code>ss</code> (หรือ <code>netstat</code>)',
    'Type: <code>ss</code>': 'พิมพ์: <code>ss</code>',
    'Gate 22 (sshd) and gate 80 (nginx) stand open, LISTENing.': 'ประตู 22 (sshd) และประตู 80 (nginx) เปิดรออยู่ในสถานะ LISTEN',
    "From here, knock on the database's gate: <code>nc -zv db-01 5432</code>.": 'จากตรงนี้ ลองเคาะประตูฐานข้อมูล: <code>nc -zv db-01 5432</code>',
    'Type: <code>nc -zv db-01 5432</code> — -z just checks, -v reports.': 'พิมพ์: <code>nc -zv db-01 5432</code> — -z แค่ตรวจ, -v รายงานผล',
    'Connection succeeded — postgres is listening on 5432.': 'เชื่อมต่อสำเร็จ — postgres ฟังอยู่ที่ 5432',
    'Return home: <code>exit</code>.': 'กลับบ้าน: <code>exit</code>',
    "The gatekeeper's test:": 'บททดสอบของผู้เฝ้าประตู:',
    'Match the guardian to its gate: which set is correct?': 'จับคู่ผู้พิทักษ์กับประตูของมัน: ชุดใดถูกต้อง?',
    'Also worth memorizing: 53=DNS, 3306=MySQL, 6379=Redis.': 'ควรจำเพิ่ม: 53=DNS, 3306=MySQL, 6379=Redis',
    'The classics: 22 ssh, 80 http, 443 https. Databases live higher: 5432 postgres.': 'สูตรคลาสสิก: 22 ssh, 80 http, 443 https ส่วนฐานข้อมูลอยู่เลขสูงกว่า: 5432 postgres',

    // --- net-boss The Silent Server ---
    '🔥 <b>ALARM!</b> The Quest Portal (on web-01) has gone silent — visitors see only errors. You are the on-call wizard. Diagnose it like a professional: check the symptom, verify the machine lives, go inside, find the fallen guardian, raise it, and verify the cure. <br><br>⚠️ <i>Wrong quiz answers cost a heart.</i>':
      '🔥 <b>สัญญาณเตือน!</b> Quest Portal (บน web-01) เงียบไป — ผู้ใช้เห็นแต่ข้อผิดพลาด เจ้าคือพ่อมดเวรออนคอล จงวินิจฉัยอย่างมืออาชีพ: ตรวจอาการ ยืนยันว่าเครื่องยังอยู่ เข้าไปข้างใน หาผู้พิทักษ์ที่ล้ม ปลุกมันขึ้น และพิสูจน์ว่าหายจริง <br><br>⚠️ <i>ตอบคำถามผิดเสียหัวใจหนึ่งดวง</i>',
    'The Portal shines again. You have completed your first real incident. 🏆': 'Portal ส่องแสงอีกครั้ง เจ้าเพิ่งปิด incident จริงครั้งแรกได้สำเร็จ 🏆',
    'First, confirm the symptom yourself: <code>curl http://web-01</code>.': 'ขั้นแรก ยืนยันอาการด้วยตนเอง: <code>curl http://web-01</code>',
    'Type: <code>curl http://web-01</code>': 'พิมพ์: <code>curl http://web-01</code>',
    'Connection refused — the machine answered, but nothing is listening on port 80.': 'Connection refused — เครื่องขานรับ แต่ไม่มีอะไรฟังอยู่ที่พอร์ต 80',
    'Is the machine itself alive? <code>ping -c 2 web-01</code>.': 'ตัวเครื่องยังมีชีวิตไหม? <code>ping -c 2 web-01</code>',
    'Type: <code>ping -c 2 web-01</code>': 'พิมพ์: <code>ping -c 2 web-01</code>',
    'It pings. So: machine up, service down. The problem is INSIDE.': 'ping ติด สรุป: เครื่องยังอยู่ เซอร์วิสล้ม ปัญหาอยู่ "ข้างใน"',
    'The Silent Server hisses. Reason through it:': 'เซิร์ฟเวอร์เงียบงันขู่ฟ่อ จงใช้เหตุผล:',
    '"Connection refused" + host pings fine. Most likely cause?': '"Connection refused" แต่ host ยัง ping ติด — สาเหตุที่เป็นไปได้ที่สุด?',
    'The service on that port is not running': 'เซอร์วิสที่พอร์ตนั้นไม่ได้ทำงานอยู่',
    'DNS is broken': 'DNS พัง',
    'The whole server is powered off': 'เซิร์ฟเวอร์ทั้งเครื่องปิดอยู่',
    'Your internet is down': 'อินเทอร์เน็ตของเจ้าล่ม',
    'Refused = the OS actively said "no one is listening here". The host is reachable; the service is dead.':
      'Refused = ระบบปฏิบัติการตอบชัดว่า "ไม่มีใครฟังอยู่ตรงนี้" เครื่องยังเข้าถึงได้ แต่เซอร์วิสตายแล้ว',
    'If DNS or the host were dead, curl would say "could not resolve" or time out — not "refused".':
      'ถ้า DNS หรือเครื่องตาย curl จะบอก "could not resolve" หรือ timeout — ไม่ใช่ "refused"',
    'Go inside: <code>ssh hero@web-01</code>.': 'เข้าไปข้างใน: <code>ssh hero@web-01</code>',
    'Question the guardian: <code>systemctl status nginx</code>.': 'สอบสวนผู้พิทักษ์: <code>systemctl status nginx</code>',
    'Type: <code>systemctl status nginx</code>': 'พิมพ์: <code>systemctl status nginx</code>',
    'Active: failed. There is the corpse.': 'Active: failed — นั่นไงศพ',
    'Raise it: <code>systemctl restart nginx</code>, then verify with <code>systemctl status nginx</code> if you wish.':
      'ปลุกมันขึ้นมา: <code>systemctl restart nginx</code> แล้วจะตรวจซ้ำด้วย <code>systemctl status nginx</code> ก็ได้',
    'Type: <code>systemctl restart nginx</code>': 'พิมพ์: <code>systemctl restart nginx</code>',
    'Never declare victory without verifying: <code>curl http://web-01</code> (from here or after <code>exit</code>).':
      'อย่าประกาศชัยชนะโดยไม่พิสูจน์: <code>curl http://web-01</code> (จากตรงนี้ หรือหลัง <code>exit</code> ก็ได้)',
    '200 OK. Incident resolved — and you verified the fix.': '200 OK — ปิด incident เรียบร้อย และเจ้าได้พิสูจน์การแก้ไขแล้ว',

    // ===== Realm 3: The DNS Labyrinth =======================================
    // --- con-1 The Language of Addresses ---
    'Every machine speaks in numbers. An <b>IPv4 address</b> is four numbers 0–255 (e.g. <code>10.0.1.5</code>). The <b>/24</b> suffix (CIDR) says how much of the address names the <i>network</i> vs the <i>machine</i>: /24 means the first 3 numbers are the neighborhood, the last one is the house.':
      'ทุกเครื่องพูดภาษาตัวเลข <b>IPv4 address</b> คือเลขสี่ชุด 0–255 (เช่น <code>10.0.1.5</code>) ส่วนต่อท้าย <b>/24</b> (CIDR) บอกว่าที่อยู่ส่วนใดคือ <i>เครือข่าย</i> ส่วนใดคือ <i>เครื่อง</i>: /24 แปลว่าเลขสามชุดแรกคือ "หมู่บ้าน" ชุดสุดท้ายคือ "บ้านเลขที่"',
    'Addresses are no longer noise — they are maps.': 'ที่อยู่ไม่ใช่ตัวเลขมั่ว ๆ อีกต่อไป — มันคือแผนที่',
    'The Labyrinth speaks:': 'เขาวงกตเอ่ยขึ้น:',
    'Which of these is a valid IPv4 address?': 'ข้อใดคือ IPv4 address ที่ถูกต้อง?',
    'Four octets, each 0–255. 300 is out of range; three octets is too few.': 'สี่ octet แต่ละชุด 0–255 — เลข 300 เกินช่วง และสามชุดก็น้อยเกินไป',
    'Second riddle:': 'ปริศนาที่สอง:',
    'Your IP is <code>10.0.1.5/24</code>. Which machine is in YOUR local subnet?': 'IP ของเจ้าคือ <code>10.0.1.5/24</code> — เครื่องใดอยู่ใน subnet เดียวกับเจ้า?',
    '/24 fixes the first three octets: everything 10.0.1.x is local. 10.0.2.5 needs the gateway.':
      '/24 ตรึงสาม octet แรก: ทุกอย่างที่เป็น 10.0.1.x คือวงเดียวกัน ส่วน 10.0.2.5 ต้องอาศัย gateway',
    '/24 means "first three numbers must match" — compare 10.0.1.* against each choice.': '/24 แปลว่า "สามชุดแรกต้องตรงกัน" — เทียบ 10.0.1.* กับแต่ละตัวเลือกดู',
    'Confirm it empirically: run <code>ip addr</code> and find your address + prefix, then declare your subnet: <code>echo 10.0.1.0/24</code>.':
      'พิสูจน์ด้วยตาตนเอง: รัน <code>ip addr</code> ดูที่อยู่และ prefix ของเจ้า แล้วประกาศ subnet: <code>echo 10.0.1.0/24</code>',
    'Run <code>ip addr</code>, note "10.0.1.5/24", then type: <code>echo 10.0.1.0/24</code>': 'รัน <code>ip addr</code> สังเกต "10.0.1.5/24" แล้วพิมพ์: <code>echo 10.0.1.0/24</code>',
    '10.0.1.0/24 — 256 addresses, .0 the network name, .255 the broadcast, 254 usable houses.':
      '10.0.1.0/24 — มี 256 ที่อยู่: .0 คือชื่อเครือข่าย .255 คือ broadcast เหลือบ้านใช้ได้จริง 254 หลัง',
    'Third riddle:': 'ปริศนาที่สาม:',
    'Which address ranges are <b>private</b> (never routed on the public internet)?': 'ช่วงที่อยู่ใดคือ <b>private</b> (ไม่ถูก route บนอินเทอร์เน็ตสาธารณะ)?',
    '10.x.x.x, 172.16–31.x.x, 192.168.x.x': '10.x.x.x, 172.16–31.x.x, 192.168.x.x',
    '8.8.x.x and 1.1.x.x': '8.8.x.x และ 1.1.x.x',
    'Anything starting with 203': 'อะไรก็ตามที่ขึ้นต้นด้วย 203',
    'All addresses ending in .1': 'ที่อยู่ทุกตัวที่ลงท้ายด้วย .1',
    'RFC1918. Your home and office use these; a NAT gateway translates them to a public IP.':
      'ตามมาตรฐาน RFC1918 — บ้านและออฟฟิศของเจ้าใช้ช่วงเหล่านี้ โดย NAT gateway แปลงเป็น public IP ให้',

    // --- con-2 The Name Weavers ---
    'Humans speak names; networks speak numbers. <b>DNS</b> is the translator. When you ask for <code>quest.dev</code>, your resolver checks its cache, then walks the chain: root servers → <code>.dev</code> servers → quest.dev\'s own nameserver → an <b>A record</b>: the IP.':
      'มนุษย์พูดชื่อ เครือข่ายพูดตัวเลข <b>DNS</b> คือล่ามแปล เมื่อเจ้าถามหา <code>quest.dev</code> ตัว resolver จะเช็กแคชก่อน แล้วเดินตามสาย: root servers → เซิร์ฟเวอร์ <code>.dev</code> → nameserver ของ quest.dev เอง → ได้ <b>A record</b>: ตัว IP',
    'You have walked the labyrinth of names and returned.': 'เจ้าเดินผ่านเขาวงกตแห่งชื่อและกลับออกมาได้แล้ว',
    'Resolve a name yourself: <code>dig www.quest.dev</code> — find the A record in the ANSWER SECTION.':
      'ลองแปลงชื่อด้วยตนเอง: <code>dig www.quest.dev</code> — หา A record ใน ANSWER SECTION',
    'Type: <code>dig www.quest.dev</code>': 'พิมพ์: <code>dig www.quest.dev</code>',
    "A name-weaver's question:": 'คำถามจากผู้ถักทอชื่อ:',
    'An <b>A record</b> maps a name to an IPv4 address. What does a <b>CNAME</b> record do?': '<b>A record</b> จับคู่ชื่อกับ IPv4 แล้ว <b>CNAME</b> ทำอะไร?',
    'Maps a name to ANOTHER name (an alias)': 'จับคู่ชื่อกับ "อีกชื่อหนึ่ง" (นามแฝง)',
    'Maps a name to an email server': 'จับคู่ชื่อกับเมลเซิร์ฟเวอร์',
    'Encrypts DNS queries': 'เข้ารหัสคำถาม DNS',
    "Stores the domain owner's name": 'เก็บชื่อเจ้าของโดเมน',
    'CNAME = canonical name = alias. (MX = mail, AAAA = IPv6, TXT = arbitrary text.)': 'CNAME = canonical name = นามแฝง (MX = เมล, AAAA = IPv6, TXT = ข้อความอิสระ)',
    'Companies run <i>internal</i> DNS too. Resolve the internal name: <code>dig +short db-01.quest.internal</code>.':
      'องค์กรก็มี DNS <i>ภายใน</i> เช่นกัน จงแปลงชื่อภายใน: <code>dig +short db-01.quest.internal</code>',
    'Type: <code>dig +short db-01.quest.internal</code>': 'พิมพ์: <code>dig +short db-01.quest.internal</code>',
    'A private IP from internal DNS — invisible to the outside world.': 'ได้ private IP จาก DNS ภายใน — โลกภายนอกมองไม่เห็น',
    'The final weave:': 'เส้นด้ายสุดท้าย:',
    'You change a DNS record but users still reach the OLD address for an hour. Why?': 'เจ้าแก้ DNS record แล้ว แต่ผู้ใช้ยังวิ่งไปที่อยู่เดิมอีกเป็นชั่วโมง — เพราะอะไร?',
    'Resolvers cache records until the TTL expires': 'resolver แคช record ไว้จนกว่า TTL จะหมดอายุ',
    'DNS changes need a server reboot': 'การแก้ DNS ต้องรีบูตเซิร์ฟเวอร์',
    "The users' browsers are broken": 'เบราว์เซอร์ของผู้ใช้พัง',
    'Old records must be deleted by the root servers': 'root servers ต้องลบ record เก่าก่อน',
    'Every record carries a TTL (time-to-live). Caches serve the old answer until it expires — that is "DNS propagation".':
      'ทุก record มี TTL (time-to-live) แคชจะเสิร์ฟคำตอบเก่าจนหมดอายุ — นี่แหละ "DNS propagation"',
    'Think about the TTL field you saw in the dig output.': 'นึกถึงช่อง TTL ที่เจ้าเห็นในผลลัพธ์ dig',

    // --- con-3 Paths Through the Mist ---
    'A message crossing the network is wrapped in layers, like a letter in envelopes: your data → <b>TCP/UDP</b> (which app? which port? reliable or fast?) → <b>IP</b> (which machine?) → the wire. <b>TCP</b> shakes hands and guarantees delivery; <b>UDP</b> just throws and hopes — perfect for DNS lookups and games.':
      'ข้อความที่ข้ามเครือข่ายถูกห่อเป็นชั้น ๆ เหมือนจดหมายในซองซ้อนซอง: ข้อมูลของเจ้า → <b>TCP/UDP</b> (แอปไหน? พอร์ตไหน? เน้นชัวร์หรือเน้นเร็ว?) → <b>IP</b> (เครื่องไหน?) → สายสัญญาณ <b>TCP</b> จับมือทักทายและรับประกันการส่งถึง ส่วน <b>UDP</b> โยนแล้วภาวนา — เหมาะกับ DNS และเกม',
    'The mist parts. You see the layers beneath every packet.': 'หมอกจางลง เจ้ามองเห็นชั้นต่าง ๆ ใต้แพ็กเก็ตทุกใบ',
    "Watch a packet's path across networks: <code>traceroute api.quest.dev</code>.": 'เฝ้าดูเส้นทางแพ็กเก็ตข้ามเครือข่าย: <code>traceroute api.quest.dev</code>',
    'Type: <code>traceroute api.quest.dev</code>': 'พิมพ์: <code>traceroute api.quest.dev</code>',
    'Each hop is a router unwrapping the IP envelope to decide the next step.': 'แต่ละ hop คือเราเตอร์ที่แกะซอง IP เพื่อเลือกก้าวถัดไป',
    'The mist asks:': 'สายหมอกถาม:',
    'Which statement about <b>TCP vs UDP</b> is true?': 'ข้อใดเกี่ยวกับ <b>TCP กับ UDP</b> ที่ถูกต้อง?',
    'TCP guarantees ordered delivery via handshake+acks; UDP is fire-and-forget': 'TCP รับประกันการส่งถึงตามลำดับด้วย handshake+ack ส่วน UDP ยิงแล้วลืม',
    'UDP is always encrypted; TCP is not': 'UDP เข้ารหัสเสมอ ส่วน TCP ไม่',
    'TCP is only for web pages; UDP only for email': 'TCP ใช้กับหน้าเว็บเท่านั้น UDP ใช้กับอีเมลเท่านั้น',
    'UDP retransmits lost packets automatically': 'UDP ส่งแพ็กเก็ตที่หายซ้ำให้อัตโนมัติ',
    'HTTP/SSH ride on TCP (must not lose bytes). DNS queries and video calls ride on UDP (speed over perfection).':
      'HTTP/SSH ขี่ TCP (ห้ามทำไบต์หาย) ส่วนคำถาม DNS และวิดีโอคอลขี่ UDP (เร็วสำคัญกว่าเป๊ะ)',
    'Deeper in:': 'ลึกเข้าไปอีก:',
    'An IP address gets you to the right <i>machine</i>. What gets you to the right <i>program</i> on it?': 'IP address พาไปถึง <i>เครื่อง</i> ที่ถูกต้อง แล้วอะไรพาไปถึง <i>โปรแกรม</i> ที่ถูกตัวบนเครื่องนั้น?',
    'The port number': 'หมายเลขพอร์ต',
    'The MAC address': 'MAC address',
    'The hostname': 'hostname',
    'The TTL': 'TTL',
    'IP:port — 10.0.1.10:80 means "machine 10.0.1.10, program listening at gate 80".': 'IP:port — 10.0.1.10:80 แปลว่า "เครื่อง 10.0.1.10 โปรแกรมที่ฟังอยู่ประตู 80"',
    'Before DNS, there was a simple file. Read your machine\'s local name table: <code>cat /etc/hosts</code>.':
      'ก่อนจะมี DNS มีเพียงไฟล์ธรรมดาไฟล์เดียว อ่านตารางชื่อประจำเครื่องของเจ้า: <code>cat /etc/hosts</code>',
    'Type: <code>cat /etc/hosts</code>': 'พิมพ์: <code>cat /etc/hosts</code>',
    '/etc/hosts is checked BEFORE DNS — handy for testing, dangerous when forgotten.': '/etc/hosts ถูกเช็ก "ก่อน" DNS — สะดวกตอนทดสอบ แต่อันตรายถ้าลืมลบ',
    'The mist tests your memory:': 'สายหมอกทดสอบความจำของเจ้า:',
    'You add <code>1.2.3.4 quest.dev</code> to /etc/hosts. What happens when you ping quest.dev?': 'เจ้าเพิ่ม <code>1.2.3.4 quest.dev</code> ลง /etc/hosts แล้วถ้า ping quest.dev จะเกิดอะไรขึ้น?',
    'It pings 1.2.3.4 — /etc/hosts wins over DNS': 'มันจะ ping 1.2.3.4 — /etc/hosts ชนะ DNS',
    'It pings the real DNS answer': 'มันจะ ping ตามคำตอบ DNS จริง',
    'An error — you cannot override DNS': 'ขึ้นข้อผิดพลาด — เพราะ override DNS ไม่ได้',
    'Both addresses are pinged': 'ping ทั้งสองที่อยู่',
    'The resolver checks /etc/hosts first. A classic source of "works on my machine".': 'resolver เช็ก /etc/hosts ก่อนเสมอ — ต้นตอคลาสสิกของอาการ "เครื่องผมมันเวิร์กนะ"',

    // --- con-boss The Labyrinth Guardian ---
    'At the Labyrinth\'s heart waits the Guardian, who speaks only in <b>broken networks</b>. It will describe failures; you must name the layer and cast the right diagnostic. This is the real skill: turning a vague "it doesn\'t work!" into a precise chain of checks.<br><br>⚠️ <i>Wrong answers cost a heart.</i>':
      'ใจกลางเขาวงกตมีผู้พิทักษ์รออยู่ มันพูดแต่ภาษา <b>เครือข่ายที่พัง</b> มันจะบรรยายอาการ แล้วเจ้าต้องระบุเลเยอร์และร่ายคาถาวินิจฉัยที่ถูกต้อง นี่คือทักษะของจริง: เปลี่ยนคำบ่นคลุมเครือ "มันใช้ไม่ได้!" ให้เป็นสายการตรวจสอบที่แม่นยำ<br><br>⚠️ <i>ตอบผิดเสียหัวใจหนึ่งดวง</i>',
    'The Guardian bows. You debug networks by layers now, not by luck. 🏆': 'ผู้พิทักษ์โค้งคำนับ บัดนี้เจ้าดีบักเครือข่ายเป็นชั้น ๆ ไม่ใช่ด้วยดวง 🏆',
    "The Guardian's first trial:": 'บททดสอบแรกของผู้พิทักษ์:',
    'A user cries: "quest.dev is down!" What is the FIRST thing to establish?': 'ผู้ใช้โวยวาย: "quest.dev ล่ม!" สิ่งแรกที่ต้องพิสูจน์คืออะไร?',
    'Whether the name even resolves: dig +short quest.dev': 'ชื่อยังแปลงเป็น IP ได้หรือไม่: dig +short quest.dev',
    'Reboot the server immediately': 'รีบูตเซิร์ฟเวอร์ทันที',
    "Clear the user's browser cache": 'ล้างแคชเบราว์เซอร์ของผู้ใช้',
    'Check your firewall rules': 'ตรวจกฎไฟร์วอลล์',
    'Work up the layers: name → reachability → port → service. Resolution comes first.': 'ไต่ทีละชั้น: ชื่อ → การเข้าถึง → พอร์ต → เซอร์วิส เริ่มจากการแปลงชื่อก่อน',
    'Never act before diagnosing. Start at the bottom: does the NAME resolve?': 'อย่าลงมือก่อนวินิจฉัย เริ่มจากชั้นล่างสุด: "ชื่อ" ยังแปลงได้ไหม?',
    'Cast it: <code>dig +short quest.dev</code>.': 'ร่ายเลย: <code>dig +short quest.dev</code>',
    'Resolves fine. DNS is innocent — this time.': 'แปลงได้ปกติ DNS บริสุทธิ์ — อย่างน้อยก็ครั้งนี้',
    'The second trial:': 'บททดสอบที่สอง:',
    "The name resolves and the host pings, but the page won't load. What do you probe NEXT?": 'ชื่อแปลงได้ เครื่องก็ ping ติด แต่หน้าเว็บไม่โหลด — ตรวจอะไรต่อ?',
    'Whether the service port (80/443) is open — nc -zv host 443': 'พอร์ตเซอร์วิส (80/443) เปิดหรือไม่ — nc -zv host 443',
    'The DNS root servers': 'root servers ของ DNS',
    "The user's keyboard": 'คีย์บอร์ดของผู้ใช้',
    'Whether the IP is IPv6': 'IP เป็น IPv6 หรือไม่',
    'Layer by layer: name ✓, machine ✓ — now the port/service.': 'ทีละชั้น: ชื่อ ✓ เครื่อง ✓ — ต่อไปคือพอร์ต/เซอร์วิส',
    'Knock on the gate: <code>nc -zv quest.dev 80</code>.': 'เคาะประตู: <code>nc -zv quest.dev 80</code>',
    'Type: <code>nc -zv quest.dev 80</code>': 'พิมพ์: <code>nc -zv quest.dev 80</code>',
    'Port open. Full chain verified: DNS → ping → port → service.': 'พอร์ตเปิด พิสูจน์ครบสาย: DNS → ping → พอร์ต → เซอร์วิส',
    'The third trial:': 'บททดสอบที่สาม:',
    'traceroute shows hops 1 and 2 fine, then <code>* * *</code> forever at hop 3. Best interpretation?': 'traceroute เห็น hop 1 กับ 2 ปกติ แล้วเจอ <code>* * *</code> ตลอดตั้งแต่ hop 3 — ตีความอย่างไรดีที่สุด?',
    'Traffic is dropped or filtered at/after hop 3 — likely a firewall or dead router': 'ทราฟฟิกถูกทิ้งหรือถูกกรองที่/หลัง hop 3 — น่าจะเป็นไฟร์วอลล์หรือเราเตอร์ตาย',
    'Your machine has no network at all': 'เครื่องของเจ้าไม่มีเครือข่ายเลย',
    'DNS failed': 'DNS ล้มเหลว',
    'traceroute is broken and needs reinstalling': 'traceroute พัง ต้องติดตั้งใหม่',
    'Stars mean "no reply". You got 2 hops out, so the path dies in the middle — beyond your control, time to call the provider.':
      'ดาวหมายถึง "ไม่มีคำตอบ" เจ้าออกไปได้ 2 hop แสดงว่าเส้นทางตายกลางทาง — เกินมือเจ้าแล้ว ได้เวลาโทรหาผู้ให้บริการ',
    'You DID reach hops 1-2, so local network and DNS are fine. Where do the replies stop?': 'เจ้าไปถึง hop 1-2 ได้ แปลว่าเครือข่ายท้องถิ่นกับ DNS ปกติ — แล้วคำตอบหยุดตรงไหนล่ะ?',
    "The Guardian raises its final riddle:": 'ผู้พิทักษ์ชูปริศนาสุดท้าย:',
    'Final trial — order these correctly, bottom to top, as a packet is built:': 'บทสุดท้าย — เรียงลำดับการห่อแพ็กเก็ตให้ถูกต้อง:',
    'Your data → TCP (port) → IP (address) → wire': 'ข้อมูลของเจ้า → TCP (พอร์ต) → IP (ที่อยู่) → สายสัญญาณ',
    'IP → data → wire → TCP': 'IP → ข้อมูล → สายสัญญาณ → TCP',
    'Wire → data → IP → TCP': 'สายสัญญาณ → ข้อมูล → IP → TCP',
    'TCP → wire → IP → data': 'TCP → สายสัญญาณ → IP → ข้อมูล',
    'App data gets a TCP envelope (which program), then an IP envelope (which machine), then hits the wire. Routers read only the IP envelope.':
      'ข้อมูลแอปถูกใส่ซอง TCP (บอกว่าโปรแกรมไหน) แล้วใส่ซอง IP (บอกว่าเครื่องไหน) แล้วจึงลงสาย เราเตอร์อ่านเฉพาะซอง IP เท่านั้น',

    // ===== Realm 6: The Chronicle of Branches ===============================
    // --- git-1 ---
    'In the enterprise realms, no spell is cast alone — dozens of wizards work the same scrolls. <b>git</b> is the Chronicle: it records every change, who made it, and why. A recorded snapshot is a <b>commit</b>; the Chronicle lives in a <b>repository</b>.':
      'ในอาณาจักรระดับองค์กร ไม่มีคาถาใดถูกร่ายเพียงลำพัง — พ่อมดหลายสิบคนทำงานบนคัมภีร์เดียวกัน <b>git</b> คือพงศาวดาร: บันทึกทุกการเปลี่ยนแปลง ใครทำ และทำไม ภาพบันทึกหนึ่งครั้งเรียกว่า <b>commit</b> และพงศาวดารทั้งเล่มอาศัยอยู่ใน <b>repository</b>',
    'Your first entry is inked into history — forever.': 'บันทึกแรกของเจ้าถูกจารลงประวัติศาสตร์ — ตลอดกาล',
    'Your project awaits. Enter it: <code>cd ~/project</code>.': 'โปรเจกต์ของเจ้ารออยู่ เข้าไปเลย: <code>cd ~/project</code>',
    'Type: <code>cd ~/project</code>': 'พิมพ์: <code>cd ~/project</code>',
    'Open a Chronicle here: <code>git init</code>.': 'เปิดพงศาวดารที่นี่: <code>git init</code>',
    'Type: <code>git init</code>': 'พิมพ์: <code>git init</code>',
    'A hidden .git ledger now watches this directory.': 'บัดนี้สมุดบัญชีลับ .git เฝ้ามองไดเรกทอรีนี้อยู่',
    'Ask the Chronicle what it sees: <code>git status</code>.': 'ถามพงศาวดารว่าเห็นอะไร: <code>git status</code>',
    'Type: <code>git status</code>': 'พิมพ์: <code>git status</code>',
    'Untracked files — the Chronicle sees them but does not yet protect them.': 'Untracked files — พงศาวดารมองเห็นแต่ยังไม่คุ้มครองพวกมัน',
    'Stage everything for recording: <code>git add .</code>': 'จัดทุกอย่างขึ้นแท่นเตรียมบันทึก: <code>git add .</code>',
    'Type: <code>git add .</code>': 'พิมพ์: <code>git add .</code>',
    'Seal the record: <code>git commit -m "first commit"</code>.': 'ประทับตราบันทึก: <code>git commit -m "first commit"</code>',
    'Type: <code>git commit -m "first commit"</code>': 'พิมพ์: <code>git commit -m "first commit"</code>',
    'The Chronicler asks:': 'นักพงศาวดารถาม:',
    'What exactly is a <b>commit</b>?': 'แท้จริงแล้ว <b>commit</b> คืออะไร?',
    'A recorded snapshot of your staged changes, with a message and an id': 'ภาพบันทึกของการเปลี่ยนแปลงที่ stage ไว้ พร้อมข้อความและรหัสประจำตัว',
    'A backup of your whole computer': 'ข้อมูลสำรองของคอมพิวเตอร์ทั้งเครื่อง',
    'A command that uploads code to the internet': 'คำสั่งอัปโหลดโค้ดขึ้นอินเทอร์เน็ต',
    'A temporary save that disappears on reboot': 'เซฟชั่วคราวที่หายเมื่อรีบูต',
    'A commit is a permanent, identified snapshot in the repo history. (Pushing to a server is a separate act.)':
      'commit คือภาพบันทึกถาวรที่มีรหัสระบุตัวในประวัติของ repo (ส่วนการ push ขึ้นเซิร์ฟเวอร์เป็นอีกขั้นตอนหนึ่ง)',
    // --- git-2 ---
    'The daily rhythm of every enterprise wizard: <b>edit → status → add → commit</b>. The <b>staging area</b> (git add) is your drafting table — you choose exactly which changes make it into the next commit.':
      'จังหวะประจำวันของพ่อมดองค์กรทุกคน: <b>แก้ไข → status → add → commit</b> พื้นที่ <b>staging</b> (git add) คือโต๊ะร่างงานของเจ้า — เลือกได้เป๊ะ ๆ ว่าการเปลี่ยนแปลงใดจะเข้า commit ถัดไป',
    'Edit, stage, commit — the loop is in your bones now.': 'แก้ไข, stage, commit — วงจรนี้ซึมเข้ากระดูกของเจ้าแล้ว',
    'Change something. Append lore to the README: <code>echo "The lore grows." &gt;&gt; README.md</code>':
      'แก้อะไรสักอย่าง เติมตำนานลง README: <code>echo "The lore grows." &gt;&gt; README.md</code>',
    'Type: <code>echo "The lore grows." &gt;&gt; README.md</code> (note &gt;&gt; appends)': 'พิมพ์: <code>echo "The lore grows." &gt;&gt; README.md</code> (สังเกต &gt;&gt; คือต่อท้าย)',
    'See what the Chronicle noticed: <code>git status</code>.': 'ดูว่าพงศาวดารสังเกตเห็นอะไร: <code>git status</code>',
    '"modified" — it knows the file drifted from the last commit.': '"modified" — มันรู้ว่าไฟล์เพี้ยนไปจาก commit ล่าสุด',
    'Peek at the actual difference: <code>git diff</code>, then stage it: <code>git add README.md</code>.':
      'ส่องความต่างของจริง: <code>git diff</code> แล้ว stage มัน: <code>git add README.md</code>',
    'Type: <code>git add README.md</code>': 'พิมพ์: <code>git add README.md</code>',
    'Seal it with a meaningful message: <code>git commit -m "expand the lore"</code>.': 'ประทับตราด้วยข้อความที่มีความหมาย: <code>git commit -m "expand the lore"</code>',
    'Type: <code>git commit -m "expand the lore"</code>': 'พิมพ์: <code>git commit -m "expand the lore"</code>',
    'The Scribe tests you:': 'อาลักษณ์ทดสอบเจ้า:',
    'Why does git have a <b>staging area</b> instead of committing everything at once?': 'ทำไม git ต้องมี <b>staging area</b> แทนที่จะ commit ทุกอย่างทีเดียว?',
    'So you can compose a commit from exactly the changes that belong together': 'เพื่อให้ประกอบ commit จากการเปลี่ยนแปลงที่ควรอยู่ด้วยกันได้เป๊ะ ๆ',
    'To upload files faster': 'เพื่ออัปโหลดไฟล์เร็วขึ้น',
    'It is a bug kept for compatibility': 'เป็นบั๊กที่เก็บไว้เพื่อความเข้ากันได้',
    'To encrypt your changes': 'เพื่อเข้ารหัสการเปลี่ยนแปลง',
    'Staging lets you commit one logical change at a time — reviewers (and future you) will thank you.':
      'staging ช่วยให้ commit ทีละหนึ่งเรื่องอย่างมีเหตุผล — คนรีวิว (และตัวเจ้าในอนาคต) จะขอบคุณ',
    // --- git-3 ---
    'A Chronicle no one reads is just a diary. <code>git log</code> replays history: every commit has a <b>hash</b> (its true name), an author, and a message. <b>HEAD</b> is the bookmark — where in history you currently stand.':
      'พงศาวดารที่ไม่มีใครอ่านก็แค่ไดอารี่ <code>git log</code> ฉายประวัติศาสตร์ซ้ำ: ทุก commit มี <b>hash</b> (ชื่อจริงของมัน) ผู้เขียน และข้อความ ส่วน <b>HEAD</b> คือที่คั่นหนังสือ — จุดที่เจ้ายืนอยู่ในประวัติศาสตร์ตอนนี้',
    'History speaks to you now. Listen before you change it.': 'ประวัติศาสตร์พูดกับเจ้าแล้ว จงฟังก่อนจะแก้ไขมัน',
    'Unroll the full history: <code>git log</code>.': 'คลี่ประวัติศาสตร์ฉบับเต็ม: <code>git log</code>',
    'Type: <code>git log</code>': 'พิมพ์: <code>git log</code>',
    'Too verbose for daily use. Get the compact view: <code>git log --oneline</code>.': 'ยาวเกินไปสำหรับใช้ประจำวัน ดูฉบับย่อ: <code>git log --oneline</code>',
    'Type: <code>git log --oneline</code>': 'พิมพ์: <code>git log --oneline</code>',
    'One line per commit: hash + message. This is the view you will live in.': 'หนึ่งบรรทัดต่อหนึ่ง commit: hash + ข้อความ — นี่คือมุมมองที่เจ้าจะใช้ชีวิตอยู่กับมัน',
    'The archivist asks:': 'นักจดหมายเหตุถาม:',
    'What is the commit <b>hash</b> (e.g. a1f4d2c) for?': '<b>hash</b> ของ commit (เช่น a1f4d2c) มีไว้ทำอะไร?',
    'A unique id you can use to reference, compare, or return to that exact snapshot': 'รหัสเฉพาะตัวไว้อ้างอิง เปรียบเทียบ หรือย้อนกลับไปยังภาพบันทึกนั้นเป๊ะ ๆ',
    'A password protecting the commit': 'รหัสผ่านที่ปกป้อง commit',
    'The number of files changed': 'จำนวนไฟล์ที่เปลี่ยน',
    'A random decoration': 'ของตกแต่งสุ่ม ๆ',
    'Hashes let you name any point in history precisely: git checkout a1f4d2c, git diff a1f4d2c..main, etc.':
      'hash ทำให้เจ้าเรียกชื่อจุดใดในประวัติศาสตร์ได้แม่นยำ: git checkout a1f4d2c, git diff a1f4d2c..main ฯลฯ',
    'One more:': 'อีกข้อหนึ่ง:',
    'And what is <b>HEAD</b>?': 'แล้ว <b>HEAD</b> คืออะไร?',
    'A pointer to where you currently are in history (usually the tip of your branch)': 'ตัวชี้ตำแหน่งปัจจุบันของเจ้าในประวัติศาสตร์ (มักเป็นปลายสุดของ branch)',
    'The first commit ever made': 'commit แรกสุดที่เคยสร้าง',
    'The main office of GitHub': 'สำนักงานใหญ่ของ GitHub',
    'The largest file in the repo': 'ไฟล์ใหญ่สุดใน repo',
    'HEAD moves as you commit or switch branches — it is the "you are here" marker.': 'HEAD ขยับตามเมื่อเจ้า commit หรือสลับ branch — มันคือป้าย "คุณอยู่ตรงนี้"',
    // --- git-4 ---
    "Here is git's deepest magic: <b>branches</b>. A branch is a parallel timeline — you experiment freely on <code>feature-potion</code> while <code>main</code> stays pristine for your guild. Creating one is instant and free.":
      'นี่คือเวทมนตร์ลึกสุดของ git: <b>branch</b> — เส้นเวลาคู่ขนาน เจ้าทดลองอย่างอิสระบน <code>feature-potion</code> ขณะที่ <code>main</code> ยังบริสุทธิ์ไว้ให้กิลด์ การสร้าง branch ทั้งเร็วและฟรี',
    'You walk between timelines without fear.': 'เจ้าเดินข้ามเส้นเวลาได้โดยไร้ความกลัว',
    'Fork a new timeline and step into it: <code>git checkout -b feature-potion</code>.': 'แตกเส้นเวลาใหม่แล้วก้าวเข้าไป: <code>git checkout -b feature-potion</code>',
    'Type: <code>git checkout -b feature-potion</code> (-b creates and switches in one move)': 'พิมพ์: <code>git checkout -b feature-potion</code> (-b คือสร้างและสลับในทีเดียว)',
    'Brew something new here: <code>echo "brew of haste" &gt; potion.txt</code>.': 'ปรุงของใหม่ตรงนี้: <code>echo "brew of haste" &gt; potion.txt</code>',
    'Type: <code>echo "brew of haste" &gt; potion.txt</code>': 'พิมพ์: <code>echo "brew of haste" &gt; potion.txt</code>',
    'Record it on THIS timeline: <code>git add .</code> then <code>git commit -m "add haste potion"</code>.':
      'บันทึกลง "เส้นเวลานี้": <code>git add .</code> แล้ว <code>git commit -m "add haste potion"</code>',
    'Type: <code>git add .</code> then <code>git commit -m "add haste potion"</code>': 'พิมพ์: <code>git add .</code> แล้วตามด้วย <code>git commit -m "add haste potion"</code>',
    'The potion exists only in feature-potion. main knows nothing of it.': 'ยานี้มีอยู่เฉพาะใน feature-potion — main ไม่รู้เรื่องเลย',
    'Step back to the main timeline: <code>git checkout main</code>. Run <code>git log --oneline</code> — no potion commit!':
      'ก้าวกลับสู่เส้นเวลาหลัก: <code>git checkout main</code> แล้วรัน <code>git log --oneline</code> — ไม่มี commit ยาเลย!',
    'Type: <code>git checkout main</code>': 'พิมพ์: <code>git checkout main</code>',
    'The keeper of timelines asks:': 'ผู้รักษาเส้นเวลาถาม:',
    'Why do teams do all work on branches instead of committing straight to main?': 'ทำไมทีมจึงทำงานบน branch แทนที่จะ commit ตรงเข้า main?',
    'main stays always-releasable; work is reviewed and merged only when ready': 'main จะพร้อมปล่อยเสมอ งานถูกรีวิวและ merge เมื่อพร้อมเท่านั้น',
    'Branches make git run faster': 'branch ทำให้ git เร็วขึ้น',
    'main is read-only by law': 'main อ่านได้อย่างเดียวตามกฎหมาย',
    'To hide code from teammates': 'เพื่อซ่อนโค้ดจากเพื่อนร่วมทีม',
    'Branch → review (pull request) → merge. That flow is the backbone of enterprise development.': 'Branch → รีวิว (pull request) → merge — โฟลว์นี้คือกระดูกสันหลังของการพัฒนาระดับองค์กร',
    // --- git-5 ---
    'Timelines must eventually reunite: <code>git merge</code> weaves a branch\'s commits back into yours. When both timelines touched the <i>same lines</i>, git stops and asks a human to resolve the <b>conflict</b> — that is not an error, it is a question.':
      'สุดท้ายเส้นเวลาต้องกลับมารวมกัน: <code>git merge</code> ถักทอ commit ของ branch หนึ่งกลับเข้าเส้นของเจ้า เมื่อทั้งสองเส้นแตะ <i>บรรทัดเดียวกัน</i> git จะหยุดแล้วถามมนุษย์ให้ตัดสิน <b>conflict</b> — นั่นไม่ใช่ข้อผิดพลาด แต่คือคำถาม',
    'You weave timelines together. The Wraith stirs...': 'เจ้าถักทอเส้นเวลาเข้าด้วยกันแล้ว... ภูตกำลังขยับตัว',
    'From main, weave the potion timeline in: <code>git merge feature-potion</code>.': 'จาก main ถักทอเส้นเวลายาเข้ามา: <code>git merge feature-potion</code>',
    'Type: <code>git merge feature-potion</code>': 'พิมพ์: <code>git merge feature-potion</code>',
    'Confirm the weave: <code>git log --oneline</code> — the potion commit now lives in main.': 'ยืนยันการถักทอ: <code>git log --oneline</code> — commit ยาอยู่ใน main แล้ว',
    'The weaver asks:': 'ผู้ถักทอถาม:',
    'When does a <b>merge conflict</b> happen?': '<b>merge conflict</b> เกิดขึ้นเมื่อใด?',
    'When both branches changed the same lines of the same file differently': 'เมื่อทั้งสอง branch แก้บรรทัดเดียวกันของไฟล์เดียวกันไปคนละทาง',
    'Every time you merge anything': 'ทุกครั้งที่ merge อะไรก็ตาม',
    'When branch names are too similar': 'เมื่อชื่อ branch คล้ายกันเกินไป',
    'When the repo is larger than 1GB': 'เมื่อ repo ใหญ่เกิน 1GB',
    'Git auto-merges different files and different lines. Same lines, different edits → a human must choose.':
      'git รวมให้อัตโนมัติเมื่อเป็นคนละไฟล์คนละบรรทัด แต่บรรทัดเดียวกันแก้ต่างกัน → มนุษย์ต้องเลือก',
    'And the final thread:': 'และเส้นด้ายสุดท้าย:',
    'You hit a conflict. What is the correct ritual?': 'เจ้าเจอ conflict — พิธีกรรมที่ถูกต้องคืออะไร?',
    'Open the file, choose/combine the conflicting parts, remove the <<<< ==== >>>> markers, add, commit':
      'เปิดไฟล์ เลือก/ผสานส่วนที่ขัดกัน ลบเครื่องหมาย <<<< ==== >>>> แล้ว add และ commit',
    'Delete the repository and clone it again': 'ลบ repository แล้ว clone ใหม่',
    'Run the merge repeatedly until it works': 'รัน merge ซ้ำ ๆ จนกว่าจะผ่าน',
    'Always take your own version without reading': 'เลือกฉบับของตัวเองเสมอโดยไม่ต้องอ่าน',
    'Conflicts are resolved by editing, then staging and committing the resolution. Read both sides first!':
      'conflict แก้ด้วยการลงมือแก้ไฟล์ แล้ว stage และ commit ผลลัพธ์ — อ่านทั้งสองฝั่งก่อนเสมอ!',
    // --- git-boss ---
    '👻 A scream echoes through the repo <code>~/wraith-repo</code>: the <b>Merge Wraith</b> has scattered the timelines! You awaken on a strange branch with uncommitted work, while the fix your guild needs sits stranded on the <code>rescue</code> branch. Recover the situation like a senior engineer: <b>look first, commit your work, return to main, weave in the rescue.</b> <br><br>⚠️ <i>Wrong answers cost a heart.</i>':
      '👻 เสียงกรีดร้องก้องไปทั่ว repo <code>~/wraith-repo</code>: <b>ภูตแห่งการ Merge</b> ทำเส้นเวลากระจัดกระจาย! เจ้าตื่นบน branch ประหลาดพร้อมงานที่ยังไม่ commit ขณะที่ตัวแก้ที่กิลด์ต้องการติดค้างอยู่บน branch <code>rescue</code> จงกู้สถานการณ์อย่างวิศวกรอาวุโส: <b>ดูก่อน commit งานตัวเอง กลับ main แล้วถักทอ rescue เข้ามา</b> <br><br>⚠️ <i>ตอบผิดเสียหัวใจหนึ่งดวง</i>',
    'The timelines converge and the Wraith unravels. History is safe with you. 🏆': 'เส้นเวลาบรรจบกันและภูตก็คลี่คลายสลายไป ประวัติศาสตร์ปลอดภัยในมือเจ้า 🏆',
    'First rule of incidents: <b>look before you touch</b>. Where are you and what is dirty?': 'กฎข้อแรกของ incident: <b>มองก่อนแตะ</b> — เจ้าอยู่ที่ไหน และอะไรค้างอยู่บ้าง?',
    'You are on branch lost-timeline, with untracked work (omen.txt).': 'เจ้าอยู่บน branch lost-timeline พร้อมงานที่ยังไม่ถูกติดตาม (omen.txt)',
    'The Wraith cackles: "You do not even know your timelines!" Which command lists ALL branches?':
      'ภูตหัวเราะเยาะ: "เจ้าไม่รู้จักเส้นเวลาของตัวเองด้วยซ้ำ!" คำสั่งใดแสดง branch ทั้งหมด?',
    'git branch lists them; the * marks where you stand.': 'git branch แสดงทั้งหมด และเครื่องหมาย * บอกจุดที่เจ้ายืน',
    'log shows commits, status shows changes. Which one lists branches?': 'log แสดง commit, status แสดงการเปลี่ยนแปลง — แล้วตัวไหนแสดง branch ล่ะ?',
    "The Wraith's first taunt:": 'คำเยาะเย้ยแรกของภูต:',
    'Do it — survey the timelines.': 'ลงมือเลย — สำรวจเส้นเวลาทั้งหมด',
    'Type: <code>git branch</code>': 'พิมพ์: <code>git branch</code>',
    'main, rescue, and your lost-timeline. The fix waits on rescue.': 'main, rescue และ lost-timeline ของเจ้า — ตัวแก้รออยู่บน rescue',
    'Never abandon uncommitted work. Record the prophecy on THIS branch: stage everything and commit it.':
      'อย่าทิ้งงานที่ยังไม่ commit เด็ดขาด บันทึกคำพยากรณ์ลง branch "นี้": stage ทุกอย่างแล้ว commit',
    'Type: <code>git add .</code> then <code>git commit -m "save the prophecy"</code>': 'พิมพ์: <code>git add .</code> แล้วตามด้วย <code>git commit -m "save the prophecy"</code>',
    'Your work is safe in history. Now you can move freely.': 'งานของเจ้าปลอดภัยในประวัติศาสตร์แล้ว บัดนี้เคลื่อนที่ได้อย่างอิสระ',
    'Return to the true timeline.': 'กลับสู่เส้นเวลาที่แท้จริง',
    "Weave the guild's fix into main and banish the Wraith!": 'ถักทอตัวแก้ของกิลด์เข้าสู่ main แล้วขับไล่ภูต!',
    'Type: <code>git merge rescue</code>': 'พิมพ์: <code>git merge rescue</code>',
    'The breach is sealed. The Wraith howls!': 'รอยรั่วถูกผนึกแล้ว ภูตแผดเสียงโหยหวน!',
    'FINAL BLOW — why did you commit your stray work BEFORE switching branches?': 'หมัดสุดท้าย — ทำไมต้อง commit งานค้างก่อนสลับ branch?',
    'Uncommitted changes are not protected by history — committing first makes switching and merging safe':
      'การเปลี่ยนแปลงที่ยังไม่ commit ไม่ได้รับการคุ้มครองจากประวัติศาสตร์ — commit ก่อนจึงสลับและ merge ได้อย่างปลอดภัย',
    'Because git refuses to work with less than 3 commits': 'เพราะ git ไม่ยอมทำงานถ้ามีน้อยกว่า 3 commit',
    'To make the repository larger': 'เพื่อให้ repository ใหญ่ขึ้น',
    'No reason; it was decorative': 'ไม่มีเหตุผล แค่ประดับเฉย ๆ',
    'Commit (or stash) before you travel timelines. The Wraith dissolves into a well-ordered git log!':
      'commit (หรือ stash) ก่อนเดินทางข้ามเส้นเวลาเสมอ — ภูตสลายกลายเป็น git log ที่เรียบร้อยงดงาม!',
    'The Wraith gasps:': 'ภูตหอบเฮือกสุดท้าย:',
  });
})();
