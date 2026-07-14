/* Terminal Quest — Thai: Realm 7 (Container Foundry) + Realm 8 (Alchemist's Lab) */
(function () {
  CLIQ.i18n.register('th', {

    // ===== Realm 7: The Container Foundry ===================================
    // --- docker-1 ---
    'In the Foundry, software ships as <b>images</b> — sealed molds holding an app and everything it needs. Pour an image into the furnace and out steps a <b>container</b>: a living, isolated instance. One mold, as many golems as you like.':
      'ในโรงหลอม ซอฟต์แวร์ถูกส่งมอบในรูป <b>image</b> — แม่พิมพ์ผนึกที่บรรจุแอปพร้อมทุกสิ่งที่มันต้องใช้ เทอิมเมจลงเตาหลอมแล้ว <b>container</b> จะก้าวออกมา: อินสแตนซ์ที่มีชีวิตและแยกขาดจากกัน แม่พิมพ์เดียว เสกโกเลมได้กี่ตัวก็ได้',
    'Your first golem breathes. The Foundry hums.': 'โกเลมตัวแรกของเจ้าหายใจแล้ว โรงหลอมครางหึ่งอย่างพอใจ',
    'Fetch the nginx mold from the registry: <code>docker pull nginx</code>.': 'ไปเอาแม่พิมพ์ nginx จาก registry: <code>docker pull nginx</code>',
    'Type: <code>docker pull nginx</code>': 'พิมพ์: <code>docker pull nginx</code>',
    'Inspect your molds: <code>docker images</code>.': 'ตรวจดูแม่พิมพ์ของเจ้า: <code>docker images</code>',
    'Type: <code>docker images</code>': 'พิมพ์: <code>docker images</code>',
    'Bring one to life, detached and named: <code>docker run -d --name web nginx</code>.': 'ปลุกชีวิตหนึ่งตัวแบบเบื้องหลังพร้อมตั้งชื่อ: <code>docker run -d --name web nginx</code>',
    'Type: <code>docker run -d --name web nginx</code> (-d = run in background)': 'พิมพ์: <code>docker run -d --name web nginx</code> (-d = รันเบื้องหลัง)',
    "It answered with a container id — the golem's true name.": 'มันตอบกลับด้วย container id — ชื่อจริงของโกเลม',
    'See it standing: <code>docker ps</code>.': 'ดูมันยืนตระหง่าน: <code>docker ps</code>',
    'Type: <code>docker ps</code>': 'พิมพ์: <code>docker ps</code>',
    'The Foundry master asks:': 'นายช่างโรงหลอมถาม:',
    'Image vs container — which is true?': 'image กับ container — ข้อใดถูกต้อง?',
    'An image is the immutable template; a container is a running instance of it': 'image คือแม่แบบที่แก้ไขไม่ได้ ส่วน container คืออินสแตนซ์ที่กำลังรันของมัน',
    'They are two words for the same thing': 'เป็นสองคำของสิ่งเดียวกัน',
    'Containers are templates; images run': 'container คือแม่แบบ ส่วน image คือตัวรัน',
    'Images only exist in the cloud': 'image มีอยู่แค่ในคลาวด์เท่านั้น',
    'Like class vs object, or mold vs golem. Many containers can run from one image.': 'เหมือน class กับ object หรือแม่พิมพ์กับโกเลม — อิมเมจเดียวรันเป็นหลาย container ได้',

    // --- docker-2 ---
    'Golems are cheap and disposable — that is their power. Stop them, start them, destroy them without ceremony. But know your rolls: <code>docker ps</code> shows only the <i>living</i>; add <code>-a</code> to see the fallen too.':
      'โกเลมนั้นถูกและใช้แล้วทิ้งได้ — นั่นคือพลังของมัน หยุด สตาร์ท ทำลาย ได้โดยไม่ต้องมีพิธีรีตอง แต่จงรู้จักบัญชีรายชื่อ: <code>docker ps</code> แสดงเฉพาะตัวที่ <i>ยังมีชีวิต</i> เติม <code>-a</code> เพื่อเห็นตัวที่ล้มแล้วด้วย',
    'Start, stop, remove — the lifecycle bows to you.': 'สตาร์ท หยุด ลบ — วัฏจักรชีวิตน้อมคำนับเจ้า',
    'Put the web golem to sleep: <code>docker stop web</code>.': 'พาโกเลม web เข้านอน: <code>docker stop web</code>',
    'Type: <code>docker stop web</code>': 'พิมพ์: <code>docker stop web</code>',
    'Now <code>docker ps</code> — it has vanished from the living!': 'ทีนี้ <code>docker ps</code> — มันหายไปจากบัญชีผู้มีชีวิตแล้ว!',
    'Reveal the fallen as well: <code>docker ps -a</code>.': 'เปิดเผยตัวที่ล้มแล้วด้วย: <code>docker ps -a</code>',
    'Type: <code>docker ps -a</code>': 'พิมพ์: <code>docker ps -a</code>',
    'There it lies: Exited (0). Stopped, not gone.': 'นอนอยู่นั่นไง: Exited (0) — หยุดแล้ว แต่ยังไม่หายไปไหน',
    'Wake it again: <code>docker start web</code>.': 'ปลุกมันอีกครั้ง: <code>docker start web</code>',
    'Type: <code>docker start web</code>': 'พิมพ์: <code>docker start web</code>',
    'The lifecycle keeper asks:': 'ผู้รักษาวัฏจักรถาม:',
    'What is the difference between <code>docker stop</code> and <code>docker rm</code>?': '<code>docker stop</code> ต่างจาก <code>docker rm</code> อย่างไร?',
    'stop halts the container but keeps it (restartable); rm deletes it entirely': 'stop หยุด container แต่ยังเก็บไว้ (สตาร์ทใหม่ได้) ส่วน rm ลบทิ้งถาวร',
    'They are identical': 'เหมือนกันทุกประการ',
    'rm is just a faster stop': 'rm ก็แค่ stop ที่เร็วกว่า',
    'stop deletes the image too': 'stop ลบ image ไปด้วย',
    'stop = pause the golem. rm = melt it down. (And rm refuses while it runs, unless you force with -f.)':
      'stop = พักโกเลม, rm = หลอมทิ้ง (และ rm จะปฏิเสธถ้ายังรันอยู่ เว้นแต่บังคับด้วย -f)',

    // --- docker-3 ---
    'A container is a sealed box — so how do you debug one? Two spells: <code>docker logs</code> replays everything the app printed, and <code>docker exec</code> reaches <i>inside</i> the running box to run a command there.':
      'container คือกล่องผนึก — แล้วจะดีบักมันอย่างไร? สองคาถา: <code>docker logs</code> ฉายทุกอย่างที่แอปเคยพิมพ์ และ <code>docker exec</code> ยื่นมือเข้าไป <i>ข้างใน</i> กล่องที่กำลังรันเพื่อสั่งคำสั่งในนั้น',
    'No box is sealed to you now.': 'บัดนี้ไม่มีกล่องใดผนึกใส่เจ้าได้อีก',
    'Summon a chatty golem: <code>docker run -d --name whisper quest/echo</code>.': 'อัญเชิญโกเลมช่างพูด: <code>docker run -d --name whisper quest/echo</code>',
    'Type: <code>docker run -d --name whisper quest/echo</code>': 'พิมพ์: <code>docker run -d --name whisper quest/echo</code>',
    'Hear what it has been saying: <code>docker logs whisper</code>.': 'ฟังสิ่งที่มันพร่ำพูดมาตลอด: <code>docker logs whisper</code>',
    'Type: <code>docker logs whisper</code>': 'พิมพ์: <code>docker logs whisper</code>',
    'Reach inside it: <code>docker exec whisper hostname</code>.': 'ยื่นมือเข้าไปข้างใน: <code>docker exec whisper hostname</code>',
    'Type: <code>docker exec whisper hostname</code>': 'พิมพ์: <code>docker exec whisper hostname</code>',
    "The container's hostname IS its id — you were truly inside.": 'hostname ของ container ก็คือ id ของมันนั่นเอง — เจ้าเข้าไปข้างในจริง ๆ แล้ว',
    'A whisper from the furnace:': 'เสียงกระซิบจากเตาหลอม:',
    'How is <code>docker exec</code> different from <code>ssh</code>?': '<code>docker exec</code> ต่างจาก <code>ssh</code> อย่างไร?',
    'exec enters a container on THIS machine via the docker daemon; ssh crosses the network to another machine':
      'exec เข้า container บน "เครื่องนี้" ผ่าน docker daemon ส่วน ssh ข้ามเครือข่ายไปอีกเครื่องหนึ่ง',
    'They are the same protocol': 'เป็นโปรโตคอลเดียวกัน',
    'exec is ssh but encrypted twice': 'exec คือ ssh ที่เข้ารหัสสองชั้น',
    'ssh only works inside containers': 'ssh ใช้ได้เฉพาะใน container',
    'Same feeling — a shell somewhere else — different doors. exec needs no network or sshd in the container.':
      'ความรู้สึกเหมือนกัน — เชลล์ที่อื่น — แต่คนละประตู exec ไม่ต้องใช้เครือข่ายหรือ sshd ใน container เลย',

    // --- docker-4 ---
    "Pulling other wizards' molds is fine — but a true Foundry master <b>forges their own</b>. A <code>Dockerfile</code> is the recipe: each instruction adds a <b>layer</b>, and unchanged layers are cached, making rebuilds lightning fast.":
      'ดึงแม่พิมพ์ของพ่อมดคนอื่นมาใช้ก็ดีอยู่ — แต่นายช่างตัวจริง <b>หลอมแม่พิมพ์เอง</b> <code>Dockerfile</code> คือสูตร: แต่ละคำสั่งเพิ่มหนึ่ง <b>layer</b> และเลเยอร์ที่ไม่เปลี่ยนจะถูกแคช ทำให้ build ซ้ำเร็วปานสายฟ้า',
    'You forge your own molds now. The Foundry recognizes a master.': 'บัดนี้เจ้าหลอมแม่พิมพ์เองได้แล้ว โรงหลอมยอมรับนายช่างคนใหม่',
    'A recipe waits in <code>foundry/</code>. Read it: <code>cat foundry/Dockerfile</code>.': 'สูตรรออยู่ใน <code>foundry/</code> อ่านมัน: <code>cat foundry/Dockerfile</code>',
    'Type: <code>cat foundry/Dockerfile</code>': 'พิมพ์: <code>cat foundry/Dockerfile</code>',
    'FROM = the base mold. COPY adds your files. CMD is what runs at birth.': 'FROM = แม่พิมพ์ฐาน, COPY เพิ่มไฟล์ของเจ้า, CMD คือสิ่งที่รันตอนเกิด',
    'Forge it: <code>docker build -t spellbook:1.0 foundry</code>.': 'หลอมเลย: <code>docker build -t spellbook:1.0 foundry</code>',
    'Type: <code>docker build -t spellbook:1.0 foundry</code> (-t names the mold)': 'พิมพ์: <code>docker build -t spellbook:1.0 foundry</code> (-t ตั้งชื่อแม่พิมพ์)',
    'Admire your mold among the others: <code>docker images</code>.': 'ชื่นชมแม่พิมพ์ของเจ้าท่ามกลางแม่พิมพ์อื่น: <code>docker images</code>',
    'Give it life and hear it speak: <code>docker run --name reader spellbook:1.0</code>.': 'มอบชีวิตแล้วฟังมันพูด: <code>docker run --name reader spellbook:1.0</code>',
    'Type: <code>docker run --name reader spellbook:1.0</code>': 'พิมพ์: <code>docker run --name reader spellbook:1.0</code>',
    'It ran its CMD, spoke the spell, and finished — check <code>docker ps -a</code>: Exited (0). Not every container is a server.': 'มันรัน CMD เอ่ยคาถา แล้วจบการทำงาน — ลองดู <code>docker ps -a</code>: Exited (0) — ไม่ใช่ทุก container จะเป็นเซิร์ฟเวอร์',
    'The forge master asks:': 'นายช่างเตาหลอมถาม:',
    'Why do Dockerfiles put rarely-changing steps (like installing dependencies) BEFORE the app code COPY?':
      'ทำไม Dockerfile จึงวางขั้นตอนที่นาน ๆ เปลี่ยนที (เช่นติดตั้ง dependencies) ไว้ "ก่อน" COPY โค้ดแอป?',
    'Layer caching: unchanged early layers are reused, so rebuilds only redo the code layer': 'layer caching: เลเยอร์ต้น ๆ ที่ไม่เปลี่ยนถูกใช้ซ้ำ build ใหม่จึงทำแค่เลเยอร์โค้ด',
    'Alphabetical order is required': 'ต้องเรียงตามตัวอักษร',
    'Later layers run faster at runtime': 'เลเยอร์ท้าย ๆ รันเร็วกว่าตอนใช้งาน',
    'It makes the image smaller by law': 'กฎบังคับให้อิมเมจเล็กลง',
    'Order = cache strategy. Change one code file and only the last layers rebuild — seconds instead of minutes.':
      'ลำดับ = กลยุทธ์แคช แก้โค้ดไฟล์เดียว ก็ rebuild แค่เลเยอร์ท้าย — ใช้เวลาวินาทีแทนที่จะเป็นนาที',

    // --- docker-5 ---
    'A container has its own private network — its port 80 is <i>not</i> your port 80. To let the outside world in, you <b>publish</b> a port: <code>-p 8080:80</code> means "my machine\'s gate 8080 leads to the container\'s gate 80".':
      'container มีเครือข่ายส่วนตัวของมันเอง — พอร์ต 80 ของมัน <i>ไม่ใช่</i> พอร์ต 80 ของเจ้า จะเปิดให้โลกภายนอกเข้าได้ต้อง <b>publish</b> พอร์ต: <code>-p 8080:80</code> แปลว่า "ประตู 8080 ของเครื่องข้า นำไปสู่ประตู 80 ของ container"',
    'The gates align. The Image Golem stirs in the deep...': 'ประตูเรียงตัวตรงกันแล้ว... โกเลมอิมเมจกำลังขยับตัวอยู่ในห้วงลึก',
    'Summon a web golem with its gate published: <code>docker run -d --name portal -p 8080:80 nginx</code>.':
      'อัญเชิญโกเลมเว็บพร้อมเปิดประตู: <code>docker run -d --name portal -p 8080:80 nginx</code>',
    'Type: <code>docker run -d --name portal -p 8080:80 nginx</code>': 'พิมพ์: <code>docker run -d --name portal -p 8080:80 nginx</code>',
    'Knock on your own gate 8080: <code>curl localhost:8080</code>.': 'เคาะประตู 8080 ของเจ้าเอง: <code>curl localhost:8080</code>',
    'Type: <code>curl localhost:8080</code>': 'พิมพ์: <code>curl localhost:8080</code>',
    "Your machine's 8080 → container's 80. The tunnel works.": '8080 ของเครื่องเจ้า → 80 ของ container — อุโมงค์ใช้งานได้',
    'See the mapping in the muster roll: <code>docker ps</code>.': 'ดูการจับคู่พอร์ตในบัญชีรายชื่อ: <code>docker ps</code>',
    'Type: <code>docker ps</code> — look at the PORTS column': 'พิมพ์: <code>docker ps</code> — ดูคอลัมน์ PORTS',
    'The gatekeeper asks:': 'ผู้เฝ้าประตูถาม:',
    'In <code>-p 8080:80</code>, which side is which?': 'ใน <code>-p 8080:80</code> ฝั่งไหนคืออะไร?',
    'HOST port 8080 : CONTAINER port 80': 'พอร์ต HOST 8080 : พอร์ต CONTAINER 80',
    'CONTAINER port 8080 : HOST port 80': 'พอร์ต CONTAINER 8080 : พอร์ต HOST 80',
    'Both numbers must always match': 'เลขสองตัวต้องเท่ากันเสมอ',
    'The first number is the number of replicas': 'เลขแรกคือจำนวน replica',
    'host:container, always. Mnemonic: you stand outside (host side comes first).': 'host:container เสมอ — วิธีจำ: เจ้ายืนอยู่ข้างนอก (ฝั่ง host มาก่อน)',

    // --- docker-boss ---
    '🗿 The Foundry shakes! The <b>Image Golem</b> — a botched summoning — lies collapsed in the corner, and the Quest Portal it should serve is dark. It was summoned without its key, and its gate was never published. Diagnose it the professional way: <b>find the corpse, read its last words, clear it, resummon it correctly, prove it lives.</b> <br><br>⚠️ <i>Wrong answers cost a heart.</i>':
      '🗿 โรงหลอมสั่นสะเทือน! <b>โกเลมอิมเมจ</b> — การอัญเชิญที่ล้มเหลว — นอนพังอยู่มุมห้อง และ Quest Portal ที่มันควรให้บริการก็มืดสนิท มันถูกอัญเชิญโดยไม่มีกุญแจ แถมประตูของมันก็ไม่เคยถูก publish จงวินิจฉัยอย่างมืออาชีพ: <b>หาศพ อ่านคำพูดสุดท้าย เก็บกวาด อัญเชิญใหม่ให้ถูกต้อง แล้วพิสูจน์ว่ามันมีชีวิต</b> <br><br>⚠️ <i>ตอบผิดเสียหัวใจหนึ่งดวง</i>',
    'The Golem stands tall, serving on gate 8080. The Foundry is yours. 🏆': 'โกเลมยืนตระหง่าน ให้บริการที่ประตู 8080 โรงหลอมเป็นของเจ้าแล้ว 🏆',
    'Something died here. Find the fallen container.': 'มีบางอย่างตายที่นี่ จงหา container ที่ล้ม',
    "Type: <code>docker ps -a</code> — the living-only roll won't show it": 'พิมพ์: <code>docker ps -a</code> — บัญชีเฉพาะผู้มีชีวิตจะไม่แสดงมัน',
    'golem — Exited (1). Exit code 1 means it died screaming.': 'golem — Exited (1) — exit code 1 แปลว่ามันตายทั้งที่กรีดร้อง',
    'Read its last words.': 'อ่านคำพูดสุดท้ายของมัน',
    'Type: <code>docker logs golem</code>': 'พิมพ์: <code>docker logs golem</code>',
    'FATAL: PORTAL_KEY is not set. The summoner forgot its key — and forgot to publish the gate, too.': 'FATAL: ไม่ได้ตั้ง PORTAL_KEY — คนอัญเชิญลืมกุญแจ แถมยังลืม publish ประตูอีกด้วย!',
    "The Golem's riddle:": 'ปริศนาของโกเลม:',
    'The Golem rumbles: "What does my exit code (1) MEAN?"': 'โกเลมคำราม: "exit code (1) ของข้าหมายความว่าอะไร?"',
    'The process ended with an error — 0 means success, non-zero means failure': 'โปรเซสจบด้วยข้อผิดพลาด — 0 คือสำเร็จ ไม่ใช่ศูนย์คือล้มเหลว',
    'It ran for exactly 1 second': 'มันรันไป 1 วินาทีพอดี',
    'It is version 1': 'มันคือเวอร์ชัน 1',
    'One user was connected': 'มีผู้ใช้เชื่อมต่ออยู่หนึ่งคน',
    'Unix exit codes: 0 = clean, anything else = trouble. Exited (0) after docker stop is normal; Exited (1) is a crash.':
      'exit code ของ Unix: 0 = จบสวย อื่น ๆ = มีปัญหา — Exited (0) หลัง docker stop คือปกติ ส่วน Exited (1) คือแครช',
    'Think of every command you have run — what did code 0 mean in this very terminal?': 'นึกถึงทุกคำสั่งที่เจ้าเคยรัน — code 0 หมายถึงอะไรในเทอร์มินัลนี้แหละ?',
    'Clear the wreckage — remove the dead container (its name must be freed).': 'เก็บกวาดซาก — ลบ container ที่ตายแล้ว (ต้องปลดปล่อยชื่อของมัน)',
    'Type: <code>docker rm golem</code>': 'พิมพ์: <code>docker rm golem</code>',
    'Resummon it CORRECTLY: detached, named golem, gate 8080 leading to its port 80, with its key <code>-e PORTAL_KEY=quest</code>, from image <code>quest/portal:2.0</code>.':
      'อัญเชิญใหม่ให้ "ถูกต้อง": แบบเบื้องหลัง ชื่อ golem ประตู 8080 นำสู่พอร์ต 80 พร้อมกุญแจ <code>-e PORTAL_KEY=quest</code> จากอิมเมจ <code>quest/portal:2.0</code>',
    'Type: <code>docker run -d --name golem -p 8080:80 -e PORTAL_KEY=quest quest/portal:2.0</code>': 'พิมพ์: <code>docker run -d --name golem -p 8080:80 -e PORTAL_KEY=quest quest/portal:2.0</code>',
    'It stands! The furnace light turns green.': 'มันยืนขึ้นแล้ว! ไฟเตาหลอมเปลี่ยนเป็นสีเขียว',
    'Never trust — verify. Prove the Portal serves.': 'อย่าเชื่อ — จงพิสูจน์ ยืนยันว่า Portal ให้บริการจริง',
    'Quest Portal Online. Incident closed with evidence.': 'Quest Portal Online — ปิด incident ด้วยหลักฐาน',
    'The Golem cracks:': 'โกเลมเริ่มแตกร้าว:',
    'FINAL BLOW — a junior asks how you fixed it so fast. Your honest answer:': 'หมัดสุดท้าย — จูเนียร์ถามว่าเจ้าแก้ได้เร็วขนาดนี้ได้อย่างไร คำตอบที่ซื่อสัตย์คือ:',
    'ps -a to find it, logs to learn why, rm + run with the right flags, curl to verify': 'ps -a เพื่อหามัน, logs เพื่อรู้สาเหตุ, rm + run ด้วยแฟล็กที่ถูก, curl เพื่อพิสูจน์',
    'I restarted Docker until it worked': 'รีสตาร์ต Docker ไปเรื่อย ๆ จนกว่าจะได้',
    'I deleted all images and started over': 'ลบอิมเมจทั้งหมดแล้วเริ่มใหม่',
    'Containers fix themselves eventually': 'เดี๋ยว container ก็ซ่อมตัวเองแหละ',
    'Observe → diagnose → fix → verify. The Golem kneels before the method!': 'สังเกต → วินิจฉัย → แก้ไข → พิสูจน์ โกเลมคุกเข่าให้กับกระบวนท่านี้!',

    // ===== Realm 8: The Alchemist's Lab =====================================
    // --- ops-1 ---
    "Every running program is a <b>process</b> with a numbered soul — its <b>PID</b>. The Lab's first lesson: see them. <code>ps</code> lists them; <code>top</code> ranks them by hunger (CPU).":
      'โปรแกรมที่รันอยู่ทุกตัวคือ <b>โปรเซส</b> ที่มีวิญญาณเลขประจำตัว — <b>PID</b> ของมัน บทเรียนแรกของห้องทดลอง: จงมองเห็นพวกมัน <code>ps</code> แสดงรายชื่อ ส่วน <code>top</code> จัดอันดับตามความหิว (CPU)',
    'The invisible machinery of the machine is visible to you.': 'กลไกล่องหนของเครื่องจักรปรากฏต่อสายตาเจ้าแล้ว',
    'Reveal the processes: <code>ps aux</code>.': 'เปิดเผยเหล่าโปรเซส: <code>ps aux</code>',
    'Type: <code>ps aux</code>': 'พิมพ์: <code>ps aux</code>',
    'Rank them by appetite: <code>top</code>.': 'จัดอันดับตามความตะกละ: <code>top</code>',
    'Type: <code>top</code>': 'พิมพ์: <code>top</code>',
    'Load average ≈ how many processes are running or waiting to run (on Linux it also counts those stuck in disk I/O). Under your core count = healthy.': 'load average ≈ จำนวนโปรเซสที่กำลังรันหรือรอคิวรัน (บน Linux นับรวมตัวที่ค้างรอดิสก์ I/O ด้วย) — ต่ำกว่าจำนวนคอร์ = สุขภาพดี',
    'Hunt a specific one with a pipe: <code>ps aux | grep postgres</code>.': 'ล่าตัวที่ต้องการด้วยไปป์: <code>ps aux | grep postgres</code>',
    'Type: <code>ps aux | grep postgres</code>': 'พิมพ์: <code>ps aux | grep postgres</code>',
    'The alchemist asks:': 'นักแปรธาตุถาม:',
    'What is a <b>PID</b>?': '<b>PID</b> คืออะไร?',
    'The unique id number of a running process — how you name it to commands like kill': 'เลขประจำตัวเฉพาะของโปรเซสที่รันอยู่ — ใช้เรียกชื่อมันกับคำสั่งอย่าง kill',
    "The program's version number": 'เลขเวอร์ชันของโปรแกรม',
    'The port a program listens on': 'พอร์ตที่โปรแกรมฟังอยู่',
    'The user who started the program': 'ผู้ใช้ที่สตาร์ทโปรแกรม',
    'Every process gets a PID at birth. PID 1 is init/systemd — the ancestor of all.': 'ทุกโปรเซสได้ PID ตั้งแต่เกิด — PID 1 คือ init/systemd บรรพบุรุษของทุกสิ่ง',

    // --- ops-2 ---
    'Sometimes a process hangs — deaf to reason, holding resources hostage. The writ of last resort is <code>kill</code>. Plain <code>kill</code> sends SIGTERM ("please shut down cleanly"); <code>kill -9</code> sends SIGKILL — no cleanup, no appeal.':
      'บางครั้งโปรเซสก็ค้าง — หูหนวกต่อเหตุผล จับทรัพยากรเป็นตัวประกัน หมายศาลทางเลือกสุดท้ายคือ <code>kill</code> — <code>kill</code> เฉย ๆ ส่ง SIGTERM ("กรุณาปิดตัวอย่างเรียบร้อย") ส่วน <code>kill -9</code> ส่ง SIGKILL — ไม่มีเก็บกวาด ไม่มีอุทธรณ์',
    'Wield the writ with care. SIGTERM first, always.': 'ใช้หมายศาลอย่างระวัง — SIGTERM ก่อนเสมอ',
    'A job has hung since Tuesday. Find it: <code>ps aux | grep stuck_job</code>.': 'มีงานค้างมาตั้งแต่วันอังคาร ตามหามัน: <code>ps aux | grep stuck_job</code>',
    'Type: <code>ps aux | grep stuck_job</code>': 'พิมพ์: <code>ps aux | grep stuck_job</code>',
    'PID 4242. Mark it well.': 'PID 4242 — จำให้ขึ้นใจ',
    'Serve the writ: <code>kill 4242</code>.': 'ยื่นหมายศาล: <code>kill 4242</code>',
    'Type: <code>kill 4242</code>': 'พิมพ์: <code>kill 4242</code>',
    'Confirm the deed: <code>ps aux | grep stuck_job</code> — nothing should answer.': 'ยืนยันผลงาน: <code>ps aux | grep stuck_job</code> — ต้องไม่มีอะไรขานตอบ',
    "The slayer's oath:": 'คำสาบานของนักสังหาร:',
    'Why try plain <code>kill</code> (SIGTERM) before <code>kill -9</code> (SIGKILL)?': 'ทำไมต้องลอง <code>kill</code> ธรรมดา (SIGTERM) ก่อน <code>kill -9</code> (SIGKILL)?',
    'SIGTERM lets the process save state and clean up; SIGKILL gives no chance and can leave corruption':
      'SIGTERM ให้โปรเซสได้เซฟสถานะและเก็บกวาด ส่วน SIGKILL ไม่ให้โอกาสเลยและอาจทิ้งความเสียหายไว้',
    'kill -9 is slower': 'kill -9 ช้ากว่า',
    'SIGKILL only works on Sundays': 'SIGKILL ใช้ได้เฉพาะวันอาทิตย์',
    'There is no difference at all': 'ไม่ต่างกันเลย',
    'Ask politely, then insist. -9 is for processes that ignore the polite request.': 'ขอร้องอย่างสุภาพก่อน แล้วค่อยบังคับ — -9 มีไว้สำหรับโปรเซสที่ไม่ฟังคำขอดี ๆ',

    // --- ops-3 ---
    '"Disk full" has killed more servers than any dragon. Two measuring spells: <code>df</code> (disk free) shows each filesystem\'s fullness; <code>du</code> (disk usage) weighs a specific directory. df tells you THAT it\'s full; du tells you WHAT filled it.':
      '"ดิสก์เต็ม" ฆ่าเซิร์ฟเวอร์มามากกว่ามังกรตัวไหน ๆ สองคาถาชั่งตวง: <code>df</code> (disk free) แสดงความเต็มของแต่ละ filesystem ส่วน <code>du</code> (disk usage) ชั่งน้ำหนักไดเรกทอรีที่ระบุ — df บอกว่า "มันเต็ม" du บอกว่า "อะไรทำให้เต็ม"',
    'You measure before you clean, and clean before you crash.': 'วัดก่อนกวาด และกวาดก่อนเครื่องล่ม',
    'Check the vault levels: <code>df -h</code> (-h = human-readable sizes).': 'เช็กระดับห้องนิรภัย: <code>df -h</code> (-h = ขนาดที่มนุษย์อ่านง่าย)',
    'Type: <code>df -h</code>': 'พิมพ์: <code>df -h</code>',
    'Weigh your lab: <code>du -sh lab</code>.': 'ชั่งน้ำหนักห้องทดลองของเจ้า: <code>du -sh lab</code>',
    'Type: <code>du -sh lab</code> (-s = summary, -h = human)': 'พิมพ์: <code>du -sh lab</code> (-s = สรุปรวม, -h = อ่านง่าย)',
    'The vault-keeper asks:': 'ผู้เฝ้าห้องนิรภัยถาม:',
    'df says 95% full. What is the right NEXT step?': 'df บอกว่าเต็ม 95% แล้ว — ก้าวถัดไปที่ถูกต้องคืออะไร?',
    'Use du on suspect directories (like /var/log) to find WHAT is eating the space': 'ใช้ du กับไดเรกทอรีต้องสงสัย (เช่น /var/log) เพื่อหาว่า "อะไร" กินพื้นที่',
    'Immediately delete random files until it fits': 'ลบไฟล์มั่ว ๆ ทันทีจนกว่าจะพอ',
    'Reboot — disk space returns on restart': 'รีบูต — พื้นที่ดิสก์จะกลับมาเอง',
    'Buy a new server': 'ซื้อเซิร์ฟเวอร์ใหม่',
    'df → du → decide. Usually the culprit is logs, caches, or old artifacts. Never delete blind.':
      'df → du → ตัดสินใจ ตัวการมักเป็น log แคช หรือของเก่า — อย่าลบสุ่มสี่สุ่มห้าเด็ดขาด',

    // --- ops-4 ---
    "The Lab's twin transmuters: <code>awk</code> slices text into <b>fields</b> ($1, $2... split on whitespace) and <code>sed</code> rewrites streams with <code>s/old/new/g</code>. Together with grep, they process logs faster than any spreadsheet.":
      'เครื่องแปรธาตุแฝดของห้องทดลอง: <code>awk</code> หั่นข้อความเป็น <b>ฟิลด์</b> ($1, $2... แบ่งด้วยช่องว่าง) และ <code>sed</code> เขียนสตรีมใหม่ด้วย <code>s/old/new/g</code> — จับคู่กับ grep แล้วประมวลผล log ได้เร็วกว่าสเปรดชีตใด ๆ',
    'Raw text becomes refined data at your touch.': 'ข้อความดิบกลายเป็นข้อมูลบริสุทธิ์ด้วยสัมผัสของเจ้า',
    "The potion ledger has columns: name, price, currency. Extract just the names: <code>awk '{print $1}' lab/potions.txt</code>.":
      'บัญชียามีคอลัมน์: ชื่อ ราคา สกุลเงิน จงสกัดเฉพาะชื่อ: <code>awk \'{print $1}\' lab/potions.txt</code>',
    "Type: <code>awk '{print $1}' lab/potions.txt</code>": 'พิมพ์: <code>awk \'{print $1}\' lab/potions.txt</code>',
    "Now names AND currencies (fields 1 and 3): <code>awk '{print $1, $3}' lab/potions.txt</code>.":
      'ทีนี้เอาทั้งชื่อและสกุลเงิน (ฟิลด์ 1 กับ 3): <code>awk \'{print $1, $3}\' lab/potions.txt</code>',
    "Type: <code>awk '{print $1, $3}' lab/potions.txt</code>": 'พิมพ์: <code>awk \'{print $1, $3}\' lab/potions.txt</code>',
    "A recipe was written with a typo — it calls for lead! Transmute it: <code>sed 's/lead/gold/g' lab/recipe.txt</code>.":
      'สูตรถูกเขียนผิด — มันเรียกหาตะกั่ว! จงแปรธาตุ: <code>sed \'s/lead/gold/g\' lab/recipe.txt</code>',
    "Type: <code>sed 's/lead/gold/g' lab/recipe.txt</code>": 'พิมพ์: <code>sed \'s/lead/gold/g\' lab/recipe.txt</code>',
    'The /g flag transmuted EVERY lead on each line, not just the first.': 'แฟล็ก /g แปรธาตุตะกั่ว "ทุกตัว" ในแต่ละบรรทัด ไม่ใช่แค่ตัวแรก',
    'The transmuter asks:': 'เครื่องแปรธาตุถาม:',
    'In awk, what is <code>$0</code>?': 'ใน awk, <code>$0</code> คืออะไร?',
    'The entire line (while $1, $2... are its fields)': 'ทั้งบรรทัด (ส่วน $1, $2... คือฟิลด์ของมัน)',
    'The first field': 'ฟิลด์แรก',
    'The line number': 'เลขบรรทัด',
    'An error': 'ข้อผิดพลาด',
    '$0 = whole line, $1..$N = fields, NF = number of fields. That vocabulary covers 90% of daily awk.':
      '$0 = ทั้งบรรทัด, $1..$N = ฟิลด์, NF = จำนวนฟิลด์ — ศัพท์ชุดนี้ครอบคลุม awk ที่ใช้จริง 90%',

    // --- ops-5 ---
    'Two rites keep enterprise systems alive at 3 AM: <b>archives</b> (<code>tar</code> bundles directories into a single compressed file) and <b>cron</b> (the clockwork daemon that runs commands on schedule: <code>minute hour day month weekday</code>).':
      'สองพิธีกรรมที่ทำให้ระบบองค์กรรอดชีวิตตอนตีสาม: <b>อาร์ไคฟ์</b> (<code>tar</code> มัดไดเรกทอรีเป็นไฟล์บีบอัดไฟล์เดียว) และ <b>cron</b> (เดมอนกลไกนาฬิกาที่รันคำสั่งตามเวลา: <code>นาที ชั่วโมง วัน เดือน วันในสัปดาห์</code>)',
    'Your systems will survive the night without you. That is the point.': 'ระบบของเจ้าจะรอดข้ามคืนได้โดยไม่ต้องมีเจ้า — นั่นแหละคือประเด็น',
    'Bundle the lab into an archive: <code>tar -czf backup.tar.gz lab</code> (c=create, z=compress, f=filename).':
      'มัดห้องทดลองเป็นอาร์ไคฟ์: <code>tar -czf backup.tar.gz lab</code> (c=สร้าง, z=บีบอัด, f=ชื่อไฟล์)',
    'Type: <code>tar -czf backup.tar.gz lab</code>': 'พิมพ์: <code>tar -czf backup.tar.gz lab</code>',
    'Trust, but verify — list what the archive holds: <code>tar -tzf backup.tar.gz</code>.': 'เชื่อได้ แต่ต้องพิสูจน์ — ดูว่าในอาร์ไคฟ์มีอะไร: <code>tar -tzf backup.tar.gz</code>',
    'Type: <code>tar -tzf backup.tar.gz</code> (t=table of contents)': 'พิมพ์: <code>tar -tzf backup.tar.gz</code> (t=สารบัญ)',
    "Inspect the clockwork daemon's orders: <code>crontab -l</code>.": 'ตรวจคำสั่งของเดมอนกลไกนาฬิกา: <code>crontab -l</code>',
    'Type: <code>crontab -l</code>': 'พิมพ์: <code>crontab -l</code>',
    'The keeper asks:': 'ผู้เฝ้ารักษาถาม:',
    'The crontab reads <code>30 2 * * *  backup.sh</code>. When does it run?': 'crontab เขียนว่า <code>30 2 * * *  backup.sh</code> — มันรันเมื่อไร?',
    'Every day at 02:30': 'ทุกวัน เวลา 02:30',
    'Every 30 minutes past 2 days': 'ทุก 30 นาทีหลังผ่านไป 2 วัน',
    'On the 30th of February': 'วันที่ 30 กุมภาพันธ์',
    'Twice at 2:30 and 3:00': 'สองครั้ง เวลา 2:30 และ 3:00',
    'Fields: minute(30) hour(2) day(*) month(*) weekday(*) — daily at 02:30.': 'ช่องเรียงเป็น: นาที(30) ชั่วโมง(2) วัน(*) เดือน(*) วันในสัปดาห์(*) — ทุกวันตอน 02:30',
    'And the final rite:': 'และพิธีกรรมสุดท้าย:',
    "The keeper's hardest lesson: when is a backup REAL?": 'บทเรียนที่ยากที่สุดของผู้เฝ้ารักษา: backup จะ "จริง" เมื่อไร?',
    'Only after you have tested restoring from it': 'ต่อเมื่อเจ้าได้ทดสอบกู้คืนจากมันแล้วเท่านั้น',
    'As soon as tar exits with code 0': 'ทันทีที่ tar จบด้วย code 0',
    'When the file is larger than 1MB': 'เมื่อไฟล์ใหญ่กว่า 1MB',
    'When it is stored on the same disk': 'เมื่อเก็บไว้บนดิสก์เดียวกัน',
    'An untested backup is a hope, not a backup. Restore drills are the rite that matters.': 'backup ที่ไม่เคยทดสอบคือ "ความหวัง" ไม่ใช่ backup — การซ้อมกู้คืนคือพิธีที่สำคัญจริง',

    // --- ops-boss ---
    "🔥 The Lab's server crawls — every spell takes seconds, and the disk gauge glows red. Somewhere a <b>Runaway Daemon</b> devours CPU and vomits garbage into the logs. This is a classic 3 AM page. Work it calmly: <b>find the hog, slay it, find what filled the disk, clean it, verify.</b> <br><br>⚠️ <i>Wrong answers cost a heart.</i>":
      '🔥 เซิร์ฟเวอร์ห้องทดลองอืดเป็นเต่า — ทุกคาถาใช้เวลาหลายวินาที และมาตรวัดดิสก์เรืองแสงสีแดง ที่ไหนสักแห่ง <b>เดมอนคลุ้มคลั่ง</b> กำลังสวาปาม CPU และอาเจียนขยะลง log นี่คือเพจตีสามสุดคลาสสิก จงจัดการอย่างใจเย็น: <b>หาตัวตะกละ สังหารมัน หาสิ่งที่ทำดิสก์เต็ม กวาดทิ้ง แล้วพิสูจน์</b> <br><br>⚠️ <i>ตอบผิดเสียหัวใจหนึ่งดวง</i>',
    'CPU idle, disk breathing, logs quiet. Go back to sleep, hero — the pager is silent. 🏆': 'CPU ว่าง ดิสก์หายใจได้ log เงียบสงบ กลับไปนอนเถอะวีรบุรุษ — เพจเจอร์เงียบแล้ว 🏆',
    'The machine crawls. Find the CPU glutton.': 'เครื่องอืดมาก จงหาตัวตะกละ CPU',
    'Type: <code>top</code> (or <code>ps aux</code>) and read the top of the list': 'พิมพ์: <code>top</code> (หรือ <code>ps aux</code>) แล้วอ่านหัวตาราง',
    'chaosd — PID 1337 — 97.3% CPU. There is your daemon.': 'chaosd — PID 1337 — CPU 97.3% นั่นไงเดมอนของเจ้า',
    "The Daemon's challenge:": 'คำท้าของเดมอน:',
    'The Daemon shrieks: "You would not DARE!" What is the correct first strike?': 'เดมอนกรีดร้อง: "เจ้าไม่กล้าหรอก!" การโจมตีแรกที่ถูกต้องคืออะไร?',
    'kill 1337 — polite SIGTERM first; escalate to -9 only if it ignores you': 'kill 1337 — SIGTERM สุภาพก่อน ค่อยยกระดับเป็น -9 ถ้ามันไม่ฟัง',
    'kill -9 1 — take out the ancestor': 'kill -9 1 — จัดการบรรพบุรุษเลย',
    'Reboot the whole server immediately': 'รีบูตทั้งเซิร์ฟเวอร์ทันที',
    'Wait for it to finish devouring': 'รอให้มันกินเสร็จ',
    'Target the culprit PID, politely first. (Never aim at PID 1 — that is init; the kernel refuses to SIGKILL it anyway.)': 'เล็ง PID ตัวการ อย่างสุภาพก่อน (อย่าเล็ง PID 1 เด็ดขาด — นั่นคือ init และเคอร์เนลก็ปฏิเสธ SIGKILL ให้มันอยู่แล้ว)',
    'Never strike PID 1, and never reboot before diagnosing. Target the culprit.': 'ห้ามโจมตี PID 1 และห้ามรีบูตก่อนวินิจฉัย — เล็งที่ตัวการ',
    'Strike it down.': 'ฟาดฟันมันลง',
    'Type: <code>kill 1337</code>': 'พิมพ์: <code>kill 1337</code>',
    "The Daemon's process dissolves. But the disk still groans...": 'โปรเซสของเดมอนสลายไป... แต่ดิสก์ยังครวญคราง',
    'Check the damage to the vaults.': 'ตรวจความเสียหายของห้องนิรภัย',
    '92% full! The daemon dumped something huge. Hunt in /var/log.': 'เต็ม 92%! เดมอนทิ้งอะไรมหึมาไว้ ตามล่าใน /var/log',
    'Find and destroy its dump (look in <code>/var/log</code>, weigh things with du or ls -l, then remove the culprit).':
      'หาและทำลายกองขยะของมัน (ส่องใน <code>/var/log</code> ชั่งด้วย du หรือ ls -l แล้วลบตัวการ)',
    'Type: <code>ls -l /var/log</code> then <code>rm /var/log/chaos.dump</code>': 'พิมพ์: <code>ls -l /var/log</code> แล้วตามด้วย <code>rm /var/log/chaos.dump</code>',
    'Verify the vault breathes again.': 'พิสูจน์ว่าห้องนิรภัยหายใจได้อีกครั้ง',
    '41% — healthy. Evidence beats hope.': '41% — สุขภาพดี หลักฐานชนะความหวังเสมอ',
    "The Daemon's ashes whisper:": 'เถ้าถ่านของเดมอนกระซิบ:',
    'FINAL BLOW — to catch this daemon automatically next time, you schedule a nightly cleanup at 02:30. Which crontab line?':
      'หมัดสุดท้าย — เพื่อดักเดมอนตัวนี้อัตโนมัติในครั้งหน้า เจ้าตั้งเวลากวาดล้างทุกคืนตอน 02:30 — บรรทัด crontab ใดถูกต้อง?',
    'minute hour day month weekday → 30 2 * * *. The Daemon is banished by clockwork!': 'นาที ชั่วโมง วัน เดือน วันในสัปดาห์ → 30 2 * * * — เดมอนถูกเนรเทศด้วยกลไกนาฬิกา!',
    'Cron fields are: minute FIRST, then hour. Re-read the writ.': 'ช่องของ cron คือ: นาที "ก่อน" แล้วค่อยชั่วโมง — อ่านหมายศาลอีกรอบ',
  });
})();
