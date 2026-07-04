/* Terminal Quest — Thai translations (keys are the exact English source strings).
   Anything not in this dictionary falls back to English, so partially
   translated realms remain fully playable. Commands stay in English by design. */
(function () {
  CLIQ.i18n.register('th', {

    // ===== UI chrome =========================================================
    'REALM MAP': 'แผนที่อาณาจักร',
    '{d}/{t} quests': 'เควสต์ {d}/{t}',
    '🔒 defeat all realm bosses first': '🔒 ต้องปราบบอสทุกอาณาจักรก่อน',
    'Free Play': 'โหมดเล่นอิสระ',
    'open terminal, everything unlocked': 'เทอร์มินัลเปิดกว้าง ปลดล็อกทุกอย่าง',
    '⚔ Terminal Quest': '⚔ Terminal Quest',
    'You stand at the crossroads of nine realms, adventurer. <b>Click a landmark on the world above</b> to journey there — or pick a quest from the realm list. Type commands into the terminal below to cast your spells.':
      'นักผจญภัย เจ้ายืนอยู่ ณ ทางแยกแห่งเก้าอาณาจักร <b>คลิกหมุดหมายบนแผนที่ด้านบน</b> เพื่อออกเดินทาง — หรือเลือกเควสต์จากรายชื่ออาณาจักร แล้วพิมพ์คำสั่งลงในเทอร์มินัลด้านล่างเพื่อร่ายเวทมนตร์ของเจ้า',
    'Task {i} of {n}': 'ภารกิจที่ {i} จาก {n}',
    'BOSS CHALLENGE': 'บททดสอบบอส',
    '👑 BOSS: ': '👑 บอส: ',
    '💡 Hint': '💡 คำใบ้',
    'QUEST COMPLETE': 'เควสต์สำเร็จ',
    'Well fought, adventurer.': 'สู้ได้อย่างกล้าหาญ นักผจญภัย',
    'Next quest: {t} ▸': 'เควสต์ถัดไป: {t} ▸',
    '🏆 You have conquered every realm. The Archmage Trial awaits at the bottom of the map.':
      '🏆 เจ้าพิชิตครบทุกอาณาจักรแล้ว บททดสอบจอมเวทรออยู่ท้ายแผนที่',
    'Well done.': 'ทำได้ดีมาก',
    '✘ Not quite. ': '✘ ยังไม่ถูกนัก ',
    'Think again and try another answer.': 'ลองคิดใหม่แล้วเลือกคำตอบอื่นดู',
    '⬆ LEVEL UP! You are now a {t}': '⬆ เลเวลอัพ! ตอนนี้เจ้าคือ {t}',
    '↻ Session restored — {q}, task {i} of {n}.': '↻ กู้คืนเซสชันแล้ว — {q} ภารกิจที่ {i} จาก {n}',
    '↻ Session restored — Free Play.': '↻ กู้คืนเซสชันแล้ว — โหมดเล่นอิสระ',

    // battle strings
    '{name} draws near! {taunt}': '{name} ปรากฏตัว! {taunt}',
    '⚔ You cast `{cmd}` — a mighty blow!': '⚔ เจ้าร่าย `{cmd}` — โจมตีเข้าเต็มแรง!',
    '🏆 VICTORY! The beast dissolves into well-behaved processes!': '🏆 ชัยชนะ! อสูรสลายกลายเป็นโปรเซสแสนเชื่อง!',
    '✨ Your wisdom strikes true! The beast reels!': '✨ ปัญญาของเจ้าโจมตีเข้าเป้า! อสูรเซถอยหลัง!',
    '💥 The enemy counterattacks! You lose a heart!': '💥 ศัตรูสวนกลับ! เจ้าเสียหัวใจหนึ่งดวง!',
    '☠ You have fallen... but heroes rise again. The battle restarts!': '☠ เจ้าล้มลง... แต่วีรบุรุษย่อมลุกขึ้นใหม่ การต่อสู้เริ่มต้นอีกครั้ง!',
    '☠ The boss overwhelms you! You gather your strength and the battle restarts...': '☠ บอสโจมตีจนเจ้าตั้งตัวไม่ติด! รวบรวมพลังแล้วเริ่มการต่อสู้ใหม่...',

    // class select
    '⚔ Choose Your Class': '⚔ เลือกคลาสของเจ้า',
    'Every hero walks their own path, adventurer. Your class grants <b>+10% XP</b> in its home realms — but all nine realms are yours to conquer.':
      'วีรบุรุษทุกคนมีเส้นทางของตนเอง คลาสของเจ้าให้ <b>XP +10%</b> ในอาณาจักรบ้านเกิด — แต่ทั้งเก้าอาณาจักรล้วนรอให้เจ้าพิชิต',
    'Sys Warrior': 'นักรบระบบ',
    'Net Ranger': 'เรนเจอร์เครือข่าย',
    'Cloud Mage': 'จอมเวทคลาวด์',
    'Kube Warden': 'ผู้คุม Kube',
    'Master of the shell and the machine. +10% XP in the Sanctum & the Lab.': 'ปรมาจารย์แห่งเชลล์และเครื่องจักร XP +10% ในวิหารและห้องทดลอง',
    'Walker of bridges and reader of packets. +10% XP in the Bridge & the Labyrinth.': 'ผู้ข้ามสะพานและอ่านแพ็กเก็ต XP +10% ในสะพานและเขาวงกต',
    'Summoner of clouds and keeper of chronicles. +10% XP in the Citadel & the Chronicle.': 'ผู้อัญเชิญคลาวด์และผู้รักษาพงศาวดาร XP +10% ในป้อมปราการและพงศาวดาร',
    'Commander of container legions. +10% XP in the Keep & the Foundry.': 'ผู้บัญชากองทัพคอนเทนเนอร์ XP +10% ในปราสาทและโรงหลอม',

    // sandbox
    '🏖 Free Play — The Open Realm': '🏖 โหมดเล่นอิสระ — อาณาจักรเปิด',
    '♻ Reset the world': '♻ รีเซ็ตโลกใหม่',
    '♻ The world reforms around you, fresh and unbroken.': '♻ โลกก่อร่างขึ้นใหม่รอบตัวเจ้า สดใหม่ไร้รอยแตก',

    // level titles
    'Shell Novice': 'มือใหม่เชลล์',
    'Shell Apprentice': 'ศิษย์ฝึกเชลล์',
    'File Wrangler': 'นักจัดการไฟล์',
    'Pipe Weaver': 'ผู้ถักทอไปป์',
    'Packet Sage': 'ปราชญ์แพ็กเก็ต',
    'Cloud Knight': 'อัศวินคลาวด์',
    'Cloud Archmage': 'จอมเวทคลาวด์',

    // ===== realm & quest titles =============================================
    'The Shell Sanctum': 'วิหารแห่งเชลล์',
    'master the ancient bash incantations': 'ฝึกคาถา bash โบราณให้เชี่ยวชาญ',
    'Awakening': 'การตื่นรู้',
    "The Scribe's Trial": 'บททดสอบอาลักษณ์',
    'The Seeker': 'ผู้ตามหา',
    'The Pipe Weaver': 'ผู้ถักทอไปป์',
    'The Keymaster': 'ผู้ถือกุญแจ',
    'Shade of the Sanctum': 'เงามืดแห่งวิหาร',

    'The Bridge of Echoes': 'สะพานแห่งเสียงสะท้อน',
    'reach distant machines: ssh, scp, curl, ping': 'เชื่อมต่อเครื่องอันไกลโพ้น: ssh, scp, curl, ping',
    'Know Thyself': 'รู้จักตนเอง',
    'Echoes Across the Void': 'เสียงสะท้อนข้ามห้วงเหว',
    'The Spectral Door': 'ประตูวิญญาณ',
    "The Merchant's Parcel": 'พัสดุของพ่อค้า',
    'Gates and Guardians': 'ประตูและผู้พิทักษ์',
    'The Silent Server': 'เซิร์ฟเวอร์เงียบงัน',

    'The DNS Labyrinth': 'เขาวงกต DNS',
    'IPs, subnets, DNS, ports, TCP — the theory that makes tools make sense': 'IP, subnet, DNS, พอร์ต, TCP — ทฤษฎีที่ทำให้เครื่องมือมีความหมาย',
    'The Language of Addresses': 'ภาษาแห่งแอดเดรส',
    'The Name Weavers': 'ผู้ถักทอชื่อ',
    'Paths Through the Mist': 'เส้นทางกลางสายหมอก',
    'The Labyrinth Guardian': 'ผู้พิทักษ์เขาวงกต',

    'The Azure Citadel': 'ป้อมปราการ Azure',
    'command the cloud: az login, groups, VMs, AKS': 'บัญชาคลาวด์: az login, groups, VMs, AKS',
    'The Citadel Gates': 'ประตูป้อมปราการ',
    'Claiming Land': 'จับจองผืนดิน',
    'Summoning Golems': 'อัญเชิญโกเลม',
    'The Vault of Bytes': 'ห้องนิรภัยแห่งไบต์',
    'Forging the Sky Fortress': 'หลอมป้อมปราการลอยฟ้า',
    'Warden of the Citadel': 'ผู้คุมป้อมปราการ',

    'The Kube Keep': 'ปราสาท Kube',
    'command container legions with kubectl on AKS': 'บัญชากองทัพคอนเทนเนอร์ด้วย kubectl บน AKS',
    'The Fleet Muster': 'สำรวจกองทัพ',
    'Eyes of the Warden': 'ดวงตาแห่งผู้คุม',
    'Healing the Broken Golem': 'เยียวยาโกเลมที่แตกหัก',
    'Legion of Replicas': 'กองพันเรพลิกา',
    'Scrolls of Creation': 'คัมภีร์แห่งการสร้าง',
    'The Chaos Wyrm': 'มังกรแห่งความโกลาหล',

    'The Chronicle of Branches': 'พงศาวดารแห่งกิ่งสาขา',
    'record history and weave timelines with git': 'บันทึกประวัติศาสตร์และถักทอเส้นเวลาด้วย git',
    'The First Chronicle': 'พงศาวดารฉบับแรก',
    "The Scribe's Loop": 'วงจรของอาลักษณ์',
    'Reading the Chronicle': 'อ่านพงศาวดาร',
    'The Forked Path': 'เส้นทางที่แยกออก',
    'The Great Weaving': 'การถักทอครั้งใหญ่',
    'The Merge Wraith': 'ภูตแห่งการ Merge',

    'The Container Foundry': 'โรงหลอมคอนเทนเนอร์',
    'summon containers: docker run, ps, logs, build': 'อัญเชิญคอนเทนเนอร์: docker run, ps, logs, build',
    'First Summoning': 'การอัญเชิญครั้งแรก',
    'Lifecycle of Golems': 'วัฏจักรชีวิตของโกเลม',
    'Whispers in the Furnace': 'เสียงกระซิบในเตาหลอม',
    'The Forge of Molds': 'เตาหลอมแม่พิมพ์',
    'Gates of the Foundry': 'ประตูแห่งโรงหลอม',
    'The Image Golem': 'โกเลมอิมเมจ',

    "The Alchemist's Lab": 'ห้องทดลองนักแปรธาตุ',
    'processes, disks, awk/sed alchemy, and cron rites': 'โปรเซส ดิสก์ เวทมนตร์ awk/sed และพิธีกรรม cron',
    'Seeing the Unseen': 'มองเห็นสิ่งที่มองไม่เห็น',
    "The Slayer's Writ": 'หมายสังหาร',
    'The Overflowing Vault': 'ห้องนิรภัยที่เอ่อล้น',
    'Text Alchemy': 'เล่นแร่แปรอักษร',
    "The Keeper's Rites": 'พิธีกรรมของผู้เฝ้ารักษา',
    'The Runaway Daemon': 'เดมอนคลุ้มคลั่ง',

    'The Archmage Trial': 'บททดสอบจอมเวท',
    'one gauntlet, every realm — earn your certificate': 'ด่านเดียวครบทุกอาณาจักร — คว้าใบประกาศนียบัตร',
    'The Archlich of Legacy Systems': 'อาร์ชลิชแห่งระบบโบราณ',

    // battle names/taunts (Realm 1 boss)
    'SHADE OF THE SANCTUM': 'เงามืดแห่งวิหาร',
    'It whispers of scattered files...': 'มันกระซิบถึงไฟล์ที่กระจัดกระจาย...',

    // ===== Realm 1: The Shell Sanctum — full content ========================
    // --- bash-1 Awakening ---
    'You wake on cold stone. A terminal glows before you — the only light in the Sanctum. The shell speaks in <b>commands</b>: you type a spell, press Enter, and the realm answers. Every wizard first learns to <i>see where they stand</i>.':
      'เจ้าตื่นขึ้นบนพื้นหินเย็นเยียบ เทอร์มินัลเรืองแสงอยู่ตรงหน้า — แสงเดียวในวิหารแห่งนี้ เชลล์สื่อสารด้วย <b>คำสั่ง</b>: เจ้าพิมพ์คาถา กด Enter แล้วอาณาจักรจะขานตอบ พ่อมดทุกคนต้องเรียนรู้ที่จะ <i>มองเห็นว่าตนยืนอยู่ที่ใด</i> ก่อนสิ่งอื่นใด',
    'You can now see, move, and read. The Sanctum acknowledges you.': 'บัดนี้เจ้ามองเห็น เคลื่อนที่ และอ่านได้แล้ว วิหารยอมรับในตัวเจ้า',
    'Reveal your current location in the filesystem with <code>pwd</code> (<b>p</b>rint <b>w</b>orking <b>d</b>irectory).':
      'เปิดเผยตำแหน่งปัจจุบันของเจ้าในระบบไฟล์ด้วย <code>pwd</code> (<b>p</b>rint <b>w</b>orking <b>d</b>irectory)',
    'Type: <code>pwd</code>': 'พิมพ์: <code>pwd</code>',
    'You stand in /home/hero — every user has a home directory.': 'เจ้ายืนอยู่ใน /home/hero — ผู้ใช้ทุกคนมีโฮมไดเรกทอรีของตนเอง',
    'Look around. List what lies in this chamber with <code>ls</code>.': 'มองไปรอบ ๆ แสดงรายการสิ่งที่อยู่ในห้องนี้ด้วย <code>ls</code>',
    'Type: <code>ls</code>': 'พิมพ์: <code>ls</code>',
    'Scrolls, a library, a crypt... and a welcome note.': 'ม้วนคัมภีร์ ห้องสมุด ห้องใต้ดิน... และจดหมายต้อนรับ',
    "Read the note: <code>cat welcome.txt</code>. <code>cat</code> prints a file's contents.":
      'อ่านจดหมาย: <code>cat welcome.txt</code> — คำสั่ง <code>cat</code> แสดงเนื้อหาในไฟล์',
    'Type: <code>cat welcome.txt</code>': 'พิมพ์: <code>cat welcome.txt</code>',
    'Something is hidden here. Files starting with a dot are invisible to plain <code>ls</code>. Reveal them with <code>ls -a</code>.':
      'มีบางสิ่งซ่อนอยู่ที่นี่ ไฟล์ที่ขึ้นต้นด้วยจุดจะมองไม่เห็นด้วย <code>ls</code> ธรรมดา จงเปิดเผยมันด้วย <code>ls -a</code>',
    'Type: <code>ls -a</code> — the <code>-a</code> flag means "all".': 'พิมพ์: <code>ls -a</code> — แฟล็ก <code>-a</code> หมายถึง "all" (ทั้งหมด)',
    'A hidden rune appears: .secret_rune': 'อักขระลับปรากฏขึ้น: .secret_rune',
    'Read the hidden rune with <code>cat</code>.': 'อ่านอักขระลับด้วย <code>cat</code>',
    'Type: <code>cat .secret_rune</code>': 'พิมพ์: <code>cat .secret_rune</code>',
    'Walk into the <code>scrolls</code> chamber using <code>cd</code> (<b>c</b>hange <b>d</b>irectory).':
      'เดินเข้าไปในห้อง <code>scrolls</code> ด้วย <code>cd</code> (<b>c</b>hange <b>d</b>irectory)',
    'Type: <code>cd scrolls</code>': 'พิมพ์: <code>cd scrolls</code>',
    'Notice your prompt changed — it always shows where you are.': 'สังเกตว่าพรอมต์เปลี่ยนไป — มันบอกตำแหน่งของเจ้าเสมอ',
    'Return home. <code>cd ..</code> goes up one level; <code>cd</code> or <code>cd ~</code> jumps straight home.':
      'กลับบ้าน <code>cd ..</code> ขึ้นไปหนึ่งชั้น ส่วน <code>cd</code> หรือ <code>cd ~</code> พากลับบ้านทันที',
    'Type: <code>cd ~</code> (or <code>cd ..</code>)': 'พิมพ์: <code>cd ~</code> (หรือ <code>cd ..</code>)',

    // --- bash-2 The Scribe's Trial ---
    'The Scribe of the Sanctum tests whether you can <b>create and destroy</b>. Directories are drawers, files are pages. You will forge them, copy them, rename them, and burn them.':
      'อาลักษณ์แห่งวิหารจะทดสอบว่าเจ้า <b>สร้างและทำลาย</b> เป็นหรือไม่ ไดเรกทอรีคือลิ้นชัก ไฟล์คือหน้ากระดาษ เจ้าจะได้หลอมมัน คัดลอกมัน เปลี่ยนชื่อมัน และเผามันทิ้ง',
    'Creation and destruction obey your fingers now.': 'บัดนี้การสร้างและทำลายเชื่อฟังปลายนิ้วของเจ้าแล้ว',
    'Forge a new directory called <code>forge</code> in your home with <code>mkdir</code>.':
      'หลอมไดเรกทอรีใหม่ชื่อ <code>forge</code> ในโฮมของเจ้าด้วย <code>mkdir</code>',
    'Type: <code>mkdir forge</code>': 'พิมพ์: <code>mkdir forge</code>',
    'Create an empty file inside it: <code>touch forge/hammer.txt</code>.': 'สร้างไฟล์เปล่าข้างในนั้น: <code>touch forge/hammer.txt</code>',
    'Type: <code>touch forge/hammer.txt</code>': 'พิมพ์: <code>touch forge/hammer.txt</code>',
    'Write words into the file: <code>echo "iron and flame" &gt; forge/hammer.txt</code>. The <code>&gt;</code> arrow pours output into a file (replacing what was there).':
      'จารึกถ้อยคำลงไฟล์: <code>echo "iron and flame" &gt; forge/hammer.txt</code> — ลูกศร <code>&gt;</code> เทผลลัพธ์ลงไฟล์ (แทนที่ของเดิม)',
    'Type: <code>echo "iron and flame" &gt; forge/hammer.txt</code>': 'พิมพ์: <code>echo "iron and flame" &gt; forge/hammer.txt</code>',
    'Verify your inscription with <code>cat forge/hammer.txt</code>, then make a copy: <code>cp forge/hammer.txt forge/backup.txt</code>.':
      'ตรวจจารึกด้วย <code>cat forge/hammer.txt</code> แล้วทำสำเนา: <code>cp forge/hammer.txt forge/backup.txt</code>',
    'Type: <code>cp forge/hammer.txt forge/backup.txt</code>': 'พิมพ์: <code>cp forge/hammer.txt forge/backup.txt</code>',
    'Rename the copy: <code>mv forge/backup.txt forge/anvil.txt</code>. (<code>mv</code> both moves and renames.)':
      'เปลี่ยนชื่อสำเนา: <code>mv forge/backup.txt forge/anvil.txt</code> (<code>mv</code> ใช้ทั้งย้ายและเปลี่ยนชื่อ)',
    'Type: <code>mv forge/backup.txt forge/anvil.txt</code>': 'พิมพ์: <code>mv forge/backup.txt forge/anvil.txt</code>',
    'Now destroy the anvil: <code>rm forge/anvil.txt</code>. ⚠️ In the real world <code>rm</code> is forever — there is no trash bin.':
      'ทีนี้ทำลายทั่งเหล็ก: <code>rm forge/anvil.txt</code> ⚠️ ในโลกจริง <code>rm</code> คือการลบถาวร — ไม่มีถังขยะให้กู้คืน',
    'Type: <code>rm forge/anvil.txt</code>': 'พิมพ์: <code>rm forge/anvil.txt</code>',

    // --- bash-3 The Seeker ---
    'The library holds ten thousand pages, and somewhere in them, the words you need. A wizard never reads everything — they <b>search</b>. Learn <code>find</code> (find files) and <code>grep</code> (find text inside files).':
      'ห้องสมุดมีหนังสือนับหมื่นหน้า และถ้อยคำที่เจ้าต้องการซ่อนอยู่ในนั้น พ่อมดไม่อ่านทุกหน้า — พวกเขา <b>ค้นหา</b> จงเรียนรู้ <code>find</code> (หาไฟล์) และ <code>grep</code> (หาข้อความในไฟล์)',
    'Nothing written can hide from you now.': 'บัดนี้ไม่มีสิ่งใดที่ถูกจารึกจะซ่อนจากเจ้าได้อีก',
    'Find every <code>.txt</code> scroll under your home: <code>find ~ -name "*.txt"</code>.':
      'ตามหาม้วนคัมภีร์ <code>.txt</code> ทั้งหมดใต้โฮมของเจ้า: <code>find ~ -name "*.txt"</code>',
    'Type: <code>find ~ -name "*.txt"</code> — the quotes keep the shell from mangling the star.':
      'พิมพ์: <code>find ~ -name "*.txt"</code> — เครื่องหมายคำพูดกันไม่ให้เชลล์ตีความดอกจันไปเอง',
    'The bestiary lists beasts and lairs. Find all <b>dragon</b> lines: <code>grep dragon scrolls/beasts.txt</code>.':
      'ตำราอสูรบันทึกสัตว์ร้ายและรังของมัน จงหาบรรทัด <b>dragon</b> ทั้งหมด: <code>grep dragon scrolls/beasts.txt</code>',
    'Type: <code>grep dragon scrolls/beasts.txt</code>': 'พิมพ์: <code>grep dragon scrolls/beasts.txt</code>',
    'How many dragons? Count matches with the <code>-c</code> flag.': 'มีมังกรกี่ตัว? นับจำนวนที่พบด้วยแฟล็ก <code>-c</code>',
    'Type: <code>grep -c dragon scrolls/beasts.txt</code>': 'พิมพ์: <code>grep -c dragon scrolls/beasts.txt</code>',
    'Three dragons. -c counts matching lines.': 'มังกรสามตัว — แฟล็ก -c นับบรรทัดที่ตรงเงื่อนไข',
    'The quest ledger logged failures. Show ERROR lines <i>with line numbers</i>: <code>grep -n ERROR library/ledger.log</code>.':
      'สมุดบันทึกเควสต์จดความล้มเหลวไว้ จงแสดงบรรทัด ERROR <i>พร้อมเลขบรรทัด</i>: <code>grep -n ERROR library/ledger.log</code>',
    'Type: <code>grep -n ERROR library/ledger.log</code>': 'พิมพ์: <code>grep -n ERROR library/ledger.log</code>',
    'Peek at just the first 2 lines of the ledger with <code>head -n 2 library/ledger.log</code>. (<code>tail</code> shows the end.)':
      'แอบดูแค่ 2 บรรทัดแรกของสมุดบันทึกด้วย <code>head -n 2 library/ledger.log</code> (ส่วน <code>tail</code> แสดงท้ายไฟล์)',
    'Type: <code>head -n 2 library/ledger.log</code>': 'พิมพ์: <code>head -n 2 library/ledger.log</code>',
    'Measure the bestiary: <code>wc -l scrolls/beasts.txt</code> counts its lines.': 'วัดขนาดตำราอสูร: <code>wc -l scrolls/beasts.txt</code> นับจำนวนบรรทัด',
    'Type: <code>wc -l scrolls/beasts.txt</code>': 'พิมพ์: <code>wc -l scrolls/beasts.txt</code>',

    // --- bash-4 The Pipe Weaver ---
    'The deepest bash magic: the pipe <code>|</code>. It pours the output of one spell into the next, chaining small tools into mighty incantations. <i>cat | grep | sort | uniq | wc</i> — each does one thing well.':
      'เวทมนตร์ bash ขั้นลึกสุด: ไปป์ <code>|</code> — มันเทผลลัพธ์ของคาถาหนึ่งเข้าสู่คาถาถัดไป ร้อยเครื่องมือเล็ก ๆ เป็นมหาคาถา <i>cat | grep | sort | uniq | wc</i> — แต่ละตัวเก่งเพียงเรื่องเดียวแต่เก่งจริง',
    'You weave commands like threads. This is the true Unix way.': 'เจ้าถักทอคำสั่งดั่งเส้นด้าย นี่แหละคือวิถีแห่ง Unix ที่แท้จริง',
    "Chain two spells: <code>cat scrolls/beasts.txt | grep dragon</code>. The pipe feeds cat's output into grep.":
      'ร้อยสองคาถาเข้าด้วยกัน: <code>cat scrolls/beasts.txt | grep dragon</code> — ไปป์ป้อนผลลัพธ์ของ cat เข้าสู่ grep',
    'Type: <code>cat scrolls/beasts.txt | grep dragon</code>': 'พิมพ์: <code>cat scrolls/beasts.txt | grep dragon</code>',
    'The inventory is a CSV (comma-separated). Extract just the item names (column 1): <code>cut -d, -f1 library/inventory.csv</code>.':
      'บัญชีไอเทมเป็นไฟล์ CSV (คั่นด้วยจุลภาค) จงดึงเฉพาะชื่อไอเทม (คอลัมน์ 1): <code>cut -d, -f1 library/inventory.csv</code>',
    'Type: <code>cut -d, -f1 library/inventory.csv</code> — <code>-d,</code> sets the delimiter, <code>-f1</code> picks field 1.':
      'พิมพ์: <code>cut -d, -f1 library/inventory.csv</code> — <code>-d,</code> กำหนดตัวคั่น <code>-f1</code> เลือกฟิลด์ที่ 1',
    '"potion" appears three times. Weave a chain that lists each item <b>once</b>: cut the names, <code>sort</code> them, then <code>uniq</code> them.':
      '"potion" โผล่มาสามครั้ง จงถักทอสายคำสั่งที่แสดงไอเทมแต่ละชนิด <b>เพียงครั้งเดียว</b>: cut ชื่อออกมา <code>sort</code> เรียง แล้ว <code>uniq</code> ตัดซ้ำ',
    'Type: <code>cut -d, -f1 library/inventory.csv | sort | uniq</code> — uniq only removes <i>adjacent</i> duplicates, so sort first!':
      'พิมพ์: <code>cut -d, -f1 library/inventory.csv | sort | uniq</code> — uniq ตัดเฉพาะตัวซ้ำที่ <i>อยู่ติดกัน</i> จึงต้อง sort ก่อน!',
    'Count the ERROR lines in the ledger with one chain: grep them, then pipe into <code>wc -l</code>.':
      'นับบรรทัด ERROR ในสมุดบันทึกด้วยสายคำสั่งเดียว: grep ออกมา แล้วไปป์เข้า <code>wc -l</code>',
    'Type: <code>grep ERROR library/ledger.log | wc -l</code>': 'พิมพ์: <code>grep ERROR library/ledger.log | wc -l</code>',
    'Preserve your work: sort the bestiary and pour it into a new file with <code>&gt;</code>: <code>sort scrolls/beasts.txt &gt; sorted.txt</code>.':
      'เก็บรักษาผลงาน: เรียงตำราอสูรแล้วเทลงไฟล์ใหม่ด้วย <code>&gt;</code>: <code>sort scrolls/beasts.txt &gt; sorted.txt</code>',
    'Type: <code>sort scrolls/beasts.txt &gt; sorted.txt</code>': 'พิมพ์: <code>sort scrolls/beasts.txt &gt; sorted.txt</code>',

    // --- bash-5 The Keymaster ---
    'A locked crypt bars your way. In Unix, every file carries <b>permissions</b> — who may <b>r</b>ead, <b>w</b>rite, and e<b>x</b>ecute it, shown as three triplets: <code>rwx rwx rwx</code> for <i>owner / group / others</i>. The Keymaster teaches <code>chmod</code>.':
      'ห้องใต้ดินที่ล็อกไว้ขวางทางเจ้า ใน Unix ไฟล์ทุกไฟล์มี <b>สิทธิ์ (permissions)</b> — ใครอ่าน (<b>r</b>ead) เขียน (<b>w</b>rite) หรือรัน (e<b>x</b>ecute) ได้ แสดงเป็นสามชุด: <code>rwx rwx rwx</code> สำหรับ <i>เจ้าของ / กลุ่ม / คนอื่น</i> ผู้ถือกุญแจจะสอน <code>chmod</code> แก่เจ้า',
    'The crypt stands open. Permissions bend to your will.': 'ห้องใต้ดินเปิดออกแล้ว สิทธิ์ทั้งปวงน้อมรับเจตจำนงของเจ้า',
    "Inspect the crypt script's permissions: <code>ls -l crypt/locked.sh</code>.": 'ตรวจสิทธิ์ของสคริปต์ห้องใต้ดิน: <code>ls -l crypt/locked.sh</code>',
    'Type: <code>ls -l crypt/locked.sh</code>': 'พิมพ์: <code>ls -l crypt/locked.sh</code>',
    'It shows -rw-r--r-- : the owner can read+write, everyone else read only. No one can execute it.':
      'มันแสดง -rw-r--r-- : เจ้าของอ่าน+เขียนได้ คนอื่นอ่านได้อย่างเดียว และไม่มีใครรันได้เลย',
    'A question from the Keymaster:': 'คำถามจากผู้ถือกุญแจ:',
    'What does <code>-rw-r--r--</code> mean for the OWNER of the file?': '<code>-rw-r--r--</code> หมายความว่าอย่างไรสำหรับ "เจ้าของ" ไฟล์?',
    'read + write, but not execute': 'อ่าน + เขียนได้ แต่รันไม่ได้',
    'read only': 'อ่านได้อย่างเดียว',
    'read + write + execute': 'อ่าน + เขียน + รันได้',
    'no access at all': 'ไม่มีสิทธิ์ใด ๆ เลย',
    'The first triplet rw- is the owner: read yes, write yes, execute no.': 'ชุดแรก rw- คือของเจ้าของ: อ่านได้ เขียนได้ รันไม่ได้',
    'Grant the execute permission so the script can run: <code>chmod +x crypt/locked.sh</code> (or <code>chmod 755</code>).':
      'มอบสิทธิ์รันให้สคริปต์ทำงานได้: <code>chmod +x crypt/locked.sh</code> (หรือ <code>chmod 755</code>)',
    'Type: <code>chmod +x crypt/locked.sh</code>': 'พิมพ์: <code>chmod +x crypt/locked.sh</code>',
    'Now run it: <code>bash crypt/locked.sh</code>.': 'ทีนี้รันมัน: <code>bash crypt/locked.sh</code>',
    'Type: <code>bash crypt/locked.sh</code>': 'พิมพ์: <code>bash crypt/locked.sh</code>',
    'One last question before the gate opens:': 'คำถามสุดท้ายก่อนประตูจะเปิด:',
    'chmod <code>755</code> gives a file which permissions?': 'chmod <code>755</code> ให้สิทธิ์แบบใดแก่ไฟล์?',
    'owner rwx, group r-x, others r-x': 'เจ้าของ rwx, กลุ่ม r-x, คนอื่น r-x',
    'everyone rwx': 'ทุกคน rwx',
    'owner rw-, others none': 'เจ้าของ rw-, คนอื่นไม่มีสิทธิ์',
    'owner r--, group r--, others r--': 'เจ้าของ r--, กลุ่ม r--, คนอื่น r--',
    '7=rwx, 5=r-x, 5=r-x. Each digit is read(4)+write(2)+execute(1).': '7=rwx, 5=r-x, 5=r-x — แต่ละหลักคือ read(4)+write(2)+execute(1)',
    'Decode each digit: read=4, write=2, execute=1. 7=4+2+1, 5=4+1.': 'ถอดรหัสทีละหลัก: read=4, write=2, execute=1 ดังนั้น 7=4+2+1 และ 5=4+1',

    // --- bash-boss Shade of the Sanctum ---
    'The torches gutter out. The <b>Shade of the Sanctum</b> rises — a creature of scattered files and misdirection. It has hidden its true name deep in a dungeon of decoys. Only your search-craft can unmask it. <br><br>⚠️ <i>Boss rules: wrong quiz answers cost a heart. Lose all three and the battle restarts.</i>':
      'คบเพลิงดับวูบ <b>เงามืดแห่งวิหาร</b> ผงาดขึ้น — อสูรแห่งไฟล์กระจัดกระจายและการลวงหลอก มันซ่อนชื่อจริงไว้ลึกในดันเจียนเต็มไปด้วยตัวลวง มีเพียงศาสตร์การค้นหาของเจ้าเท่านั้นที่เปิดโปงมันได้ <br><br>⚠️ <i>กติกาบอส: ตอบคำถามผิดเสียหัวใจหนึ่งดวง หมดสามดวงการต่อสู้เริ่มใหม่</i>',
    'The Shade dissolves into ordinary, well-organized files. Realm 1 is yours. 🏆': 'เงามืดสลายกลายเป็นไฟล์ธรรมดาที่จัดเรียงเรียบร้อย อาณาจักรที่ 1 เป็นของเจ้าแล้ว 🏆',
    'The Shade whispers a riddle:': 'เงามืดกระซิบปริศนา:',
    'The Shade hides a file named <code>shadow_key.txt</code> somewhere under <code>dungeon/</code>. Which spell locates a file <b>by name</b>?':
      'เงามืดซ่อนไฟล์ชื่อ <code>shadow_key.txt</code> ไว้ที่ไหนสักแห่งใต้ <code>dungeon/</code> คาถาใดใช้ตามหาไฟล์ <b>จากชื่อ</b>?',
    'find walks a directory tree and matches names. grep searches inside file contents.': 'find เดินสำรวจต้นไม้ไดเรกทอรีแล้วจับคู่ชื่อ ส่วน grep ค้นหาข้างในเนื้อไฟล์',
    'grep searches inside files; find searches for files.': 'grep ค้นหา "ข้างใน" ไฟล์ ส่วน find ค้นหา "ตัวไฟล์"',
    'Now do it — locate <code>shadow_key.txt</code> in the dungeon.': 'ลงมือเลย — ตามหา <code>shadow_key.txt</code> ในดันเจียน',
    'Type: <code>find dungeon -name "shadow_key.txt"</code>': 'พิมพ์: <code>find dungeon -name "shadow_key.txt"</code>',
    'Found it, buried in the hall of echoes.': 'พบแล้ว ฝังอยู่ในห้องโถงเสียงสะท้อน',
    'The key file lists many names, but only one is marked <b>TRUE</b>. Extract it with <code>grep</code>.':
      'ไฟล์กุญแจมีหลายชื่อ แต่มีเพียงชื่อเดียวที่ถูกทำเครื่องหมาย <b>TRUE</b> จงสกัดมันออกมาด้วย <code>grep</code>',
    'Type: <code>grep TRUE dungeon/hall_of_echoes/passage/shadow_key.txt</code>': 'พิมพ์: <code>grep TRUE dungeon/hall_of_echoes/passage/shadow_key.txt</code>',
    'The true name: EMBERFALL.': 'ชื่อจริงคือ: EMBERFALL',
    'Speak the name aloud to banish the Shade: <code>echo EMBERFALL</code>.': 'เอ่ยชื่อนั้นออกมาดัง ๆ เพื่อขับไล่เงามืด: <code>echo EMBERFALL</code>',
    'Type: <code>echo EMBERFALL</code>': 'พิมพ์: <code>echo EMBERFALL</code>',
    'The Shade staggers. Finish it:': 'เงามืดเซถอยหลัง จัดการมันให้จบ:',
    'Final strike! Which chain counts how many FALSE keys the Shade planted in shadow_key.txt?':
      'หมัดสุดท้าย! สายคำสั่งใดนับจำนวนกุญแจ FALSE ที่เงามืดฝังไว้ใน shadow_key.txt?',
    'grep -c counts matching lines — the killing blow!': 'grep -c นับบรรทัดที่ตรงเงื่อนไข — หมัดสังหาร!',
    'You need to count lines matching FALSE — which tool counts matches?': 'เจ้าต้องนับบรรทัดที่มี FALSE — เครื่องมือใดใช้นับจำนวนที่พบ?',
  });
})();
