/* Terminal Quest — Thai: Realm 10 (The Void Gate superboss) */
(function () {
  CLIQ.i18n.register('th', {
    'The Void Gate': 'ประตูสุญญตา',
    'the superboss: one cascading outage, every skill, hints cost hearts': 'สุดยอดบอส: เหตุล่มลูกโซ่ครั้งเดียว ใช้ทุกทักษะ และคำใบ้แลกด้วยหัวใจ',
    'The Amalgam': 'ดิ อมัลกัม',
    'THE AMALGAM': 'ดิ อมัลกัม',
    'Nine deaths made me. One hero ends here!': 'ความตายเก้าครั้งหลอมข้าขึ้นมา วีรบุรุษหนึ่งเดียวจะจบสิ้นที่นี่!',
    'Legend of the Nine Realms': 'ตำนานแห่งเก้าอาณาจักร',
    '🩸 The Void feeds on your hesitation — that hint cost a heart!': '🩸 สุญญตากลืนกินความลังเลของเจ้า — คำใบ้นั้นแลกด้วยหัวใจหนึ่งดวง!',

    '🌀 Beyond the Void Gate, the spirits of all nine bosses have fused into one horror: <b>THE AMALGAM</b>. It has struck every system you guard <i>at once</i> — names, servers, databases, clusters, containers, disks. This is the cascading outage of legend. Work the layers. Trust your training. <br><br>⚠️ <i>VOID RULES: wrong answers cost a heart — and in this dungeon, <b>every hint costs a heart too</b>. Lose all three and the whole incident resets.</i>':
      '🌀 เบื้องหลังประตูสุญญตา วิญญาณของบอสทั้งเก้าหลอมรวมเป็นความสยองหนึ่งเดียว: <b>ดิ อมัลกัม</b> มันโจมตีทุกระบบที่เจ้าปกปักษ์ <i>พร้อมกันทั้งหมด</i> — ชื่อ เซิร์ฟเวอร์ ฐานข้อมูล คลัสเตอร์ คอนเทนเนอร์ ดิสก์ นี่คือเหตุล่มลูกโซ่ในตำนาน จงไล่ทีละชั้น และเชื่อมั่นในการฝึกฝนของเจ้า <br><br>⚠️ <i>กฎสุญญตา: ตอบผิดเสียหัวใจ — และในดันเจียนนี้ <b>คำใบ้ทุกครั้งก็แลกด้วยหัวใจเช่นกัน</b> หมดสามดวงเมื่อไร เหตุการณ์ทั้งหมดเริ่มใหม่</i>',
    'The Amalgam shatters into nine fading echoes. Every system hums. You are the Legend of the Nine Realms. 🌀👑':
      'ดิ อมัลกัมแตกสลายเป็นเสียงสะท้อนเก้าสายที่เลือนหาย ทุกระบบครางเบา ๆ อย่างสงบ เจ้าคือตำนานแห่งเก้าอาณาจักร 🌀👑',

    'Every alarm is screaming at once. What is the FIRST move of an incident commander?': 'ทุกสัญญาณเตือนกรีดร้องพร้อมกัน — ก้าวแรกของผู้บัญชาการ incident คืออะไร?',
    'Verify one concrete symptom yourself, then work the layers from the bottom': 'พิสูจน์อาการที่จับต้องได้หนึ่งอย่างด้วยตนเอง แล้วไล่ทีละชั้นจากล่างขึ้นบน',
    'Reboot everything simultaneously': 'รีบูตทุกอย่างพร้อมกัน',
    'Announce it is fixed and hope': 'ประกาศว่าแก้แล้ว แล้วภาวนา',
    'Start with whichever system you like most': 'เริ่มจากระบบที่ชอบที่สุด',
    'One verified symptom beats ten rumors. Layers: name → host → port → service.': 'อาการที่พิสูจน์แล้วหนึ่งอย่างชนะข่าวลือสิบเรื่อง — ไล่ชั้น: ชื่อ → เครื่อง → พอร์ต → เซอร์วิส',
    "Panic is the Amalgam's weapon. What did every boss teach you about the FIRST step?": 'ความตื่นตระหนกคืออาวุธของดิ อมัลกัม — บอสทุกตนสอนอะไรเจ้าเกี่ยวกับก้าวแรก?',
    'The Amalgam speaks with nine voices at once:': 'ดิ อมัลกัมเอ่ยด้วยเก้าเสียงพร้อมกัน:',

    '<b>[NAMES]</b> Verify the public symptom: fetch <code>http://quest.dev</code> and read the error carefully.':
      '<b>[ชื่อ]</b> พิสูจน์อาการฝั่งสาธารณะ: ดึง <code>http://quest.dev</code> แล้วอ่านข้อผิดพลาดให้ละเอียด',
    'Could not resolve host — the NAME layer itself is severed.': 'Could not resolve host — ชั้น "ชื่อ" ถูกตัดขาดทั้งชั้น',
    'Confirm DNS is truly dead: query the name tersely.': 'ยืนยันว่า DNS ตายจริง: ถามชื่อแบบกระชับ',
    'Silence. The zone record is gone.': 'เงียบสนิท — record ของโซนหายไปแล้ว',
    'You cannot rebuild the DNS zone from here — but you CAN override locally. Append an emergency entry mapping <code>203.0.113.10</code> to <code>quest.dev</code> into <code>/etc/hosts</code>.':
      'เจ้าซ่อมโซน DNS จากตรงนี้ไม่ได้ — แต่ override ในเครื่องได้ จงต่อท้ายรายการฉุกเฉินจับคู่ <code>203.0.113.10</code> กับ <code>quest.dev</code> ลงใน <code>/etc/hosts</code>',
    'Type: <code>echo "203.0.113.10 quest.dev" &gt;&gt; /etc/hosts</code> — remember, /etc/hosts is checked before DNS!':
      'พิมพ์: <code>echo "203.0.113.10 quest.dev" &gt;&gt; /etc/hosts</code> — จำได้ไหม /etc/hosts ถูกเช็กก่อน DNS!',
    'The resolver will now find quest.dev locally. (Real fix later: repair the zone — note it for the runbook.)':
      'บัดนี้ resolver จะพบ quest.dev จากในเครื่อง (ทางแก้จริงไว้ทีหลัง: ซ่อมโซน — จดใส่ runbook ด้วย)',
    'Prove the override works: fetch <code>http://quest.dev</code> again.': 'พิสูจน์ว่า override ได้ผล: ดึง <code>http://quest.dev</code> อีกครั้ง',
    'The public page lives. One head down — the internal portal still bleeds.': 'หน้าเว็บสาธารณะฟื้นแล้ว หัวแรกร่วง — แต่พอร์ทัลภายในยังเลือดไหล',

    '<b>[SERVICES]</b> The internal portal is also dark: check <code>http://web-01</code>.': '<b>[เซอร์วิส]</b> พอร์ทัลภายในก็มืดเช่นกัน: ตรวจ <code>http://web-01</code>',
    'Connection refused — machine up, service down. Go inside.': 'Connection refused — เครื่องยังอยู่ เซอร์วิสล้ม เข้าไปข้างในเลย',
    'Enter web-01 and question its guardian.': 'เข้า web-01 แล้วสอบสวนผู้พิทักษ์ของมัน',
    'Type: <code>ssh hero@web-01</code> then <code>systemctl status nginx</code>': 'พิมพ์: <code>ssh hero@web-01</code> แล้วตามด้วย <code>systemctl status nginx</code>',
    'nginx is down. But WHY? A wise hero reads the logs before restarting.': 'nginx ล้มอยู่ แต่ "ทำไม"? วีรบุรุษที่ฉลาดอ่าน log ก่อนจะรีสตาร์ต',
    "Read nginx's dying words in <code>/var/log/nginx-error.log</code>.": 'อ่านคำพูดสุดท้ายของ nginx ใน <code>/var/log/nginx-error.log</code>',
    'Type: <code>cat /var/log/nginx-error.log</code> (or tail)': 'พิมพ์: <code>cat /var/log/nginx-error.log</code> (หรือ tail)',
    '"upstream timed out ... 10.0.2.5:5432" — nginx fell because the DATABASE is unreachable. The cascade goes deeper.':
      '"upstream timed out ... 10.0.2.5:5432" — nginx ล้มเพราะเข้าถึง "ฐานข้อมูล" ไม่ได้ ลูกโซ่ลึกลงไปอีก',
    'Verify the database gate from here: knock on db-01 port 5432.': 'พิสูจน์ประตูฐานข้อมูลจากตรงนี้: เคาะ db-01 พอร์ต 5432',
    'Refused. The root of this branch: postgres itself is down.': 'Refused — รากของกิ่งนี้: postgres เองที่ล้ม',
    'Hop deeper — ssh from web-01 into <code>db-01</code> and raise postgres.': 'กระโดดลึกลงไป — ssh จาก web-01 เข้า <code>db-01</code> แล้วปลุก postgres',
    'Type: <code>ssh hero@db-01</code> then <code>systemctl start postgres</code>': 'พิมพ์: <code>ssh hero@db-01</code> แล้วตามด้วย <code>systemctl start postgres</code>',
    'The database heart beats again.': 'หัวใจฐานข้อมูลเต้นอีกครั้ง',
    'Unwind the chain: return to web-01 (<code>exit</code>), revive nginx, and PROVE the portal serves.':
      'คลายลูกโซ่กลับ: กลับสู่ web-01 (<code>exit</code>) ชุบชีวิต nginx แล้ว "พิสูจน์" ว่าพอร์ทัลให้บริการ',
    'Type: <code>exit</code>, then <code>systemctl restart nginx</code>, then <code>curl http://web-01</code>': 'พิมพ์: <code>exit</code> แล้ว <code>systemctl restart nginx</code> แล้ว <code>curl http://web-01</code>',
    'Quest Portal restored, root cause fixed — not just the symptom. Two heads down.': 'Quest Portal ฟื้นคืน และแก้ที่ต้นเหตุ — ไม่ใช่แค่อาการ หัวที่สองร่วง',

    '<b>[CLUSTER]</b> The shop ward burns again. Diagnose the poisoned deployment — find the evidence in its Events or logs.':
      '<b>[คลัสเตอร์]</b> เขต shop ลุกไหม้อีกครั้ง จงวินิจฉัย deployment ที่ถูกวางยา — หาหลักฐานใน Events หรือ logs',
    'Type: <code>kubectl get pods -n shop</code>, then <code>kubectl describe pod payment-xxxx -n shop</code>':
      'พิมพ์: <code>kubectl get pods -n shop</code> แล้วตามด้วย <code>kubectl describe pod payment-xxxx -n shop</code>',
    'Image "shop-payment:2.0-void" does not exist. The Amalgam\'s poison, exposed.': 'อิมเมจ "shop-payment:2.0-void" ไม่มีอยู่จริง — ยาพิษของดิ อมัลกัมถูกเปิดโปง',
    'Cure it: the true image is <code>shop-payment:2.1</code>. Roll it out and verify.': 'รักษามัน: อิมเมจแท้จริงคือ <code>shop-payment:2.1</code> — roll out แล้วพิสูจน์',
    'Type: <code>kubectl set image deployment/payment payment=shop-payment:2.1 -n shop</code> then <code>kubectl rollout status deployment/payment -n shop</code>':
      'พิมพ์: <code>kubectl set image deployment/payment payment=shop-payment:2.1 -n shop</code> แล้วตามด้วย <code>kubectl rollout status deployment/payment -n shop</code>',
    'Payments flow. Three heads down.': 'เงินไหลอีกครั้ง หัวที่สามร่วง',

    '<b>[SYSTEM]</b> The Lab server chokes — find the CPU glutton and slay it.': '<b>[ระบบ]</b> เซิร์ฟเวอร์ห้องทดลองสำลัก — หาตัวตะกละ CPU แล้วสังหารมัน',
    'Type: <code>top</code>, spot voidspawn, then <code>kill 6666</code>': 'พิมพ์: <code>top</code> มองหา voidspawn แล้ว <code>kill 6666</code>',
    'voidspawn dissolves. But it left a parting gift on the disk...': 'voidspawn สลายไป... แต่มันทิ้งของขวัญอำลาไว้บนดิสก์',
    'The disk gauge glows red. Find what it dumped, destroy it, and verify the disk breathes (41%).':
      'มาตรวัดดิสก์เรืองแดง จงหาสิ่งที่มันทิ้งไว้ ทำลายทิ้ง แล้วพิสูจน์ว่าดิสก์หายใจได้ (41%)',
    'Type: <code>df -h</code>, <code>ls -l /var/log</code>, <code>rm /var/log/chaos.dump</code>, then <code>df -h</code> again':
      'พิมพ์: <code>df -h</code>, <code>ls -l /var/log</code>, <code>rm /var/log/chaos.dump</code> แล้ว <code>df -h</code> อีกครั้ง',
    'Four heads down. The Amalgam staggers.': 'หัวที่สี่ร่วง ดิ อมัลกัมเซถอยหลัง',

    '<b>[CONTAINERS]</b> A fallen container blocks the foundry. Find it, read its last words, clear it, and resummon it correctly on gate 8080.':
      '<b>[คอนเทนเนอร์]</b> คอนเทนเนอร์ที่ล้มขวางโรงหลอมอยู่ จงหามัน อ่านคำพูดสุดท้าย เก็บกวาด แล้วอัญเชิญใหม่ให้ถูกต้องที่ประตู 8080',
    'Type: <code>docker ps -a</code>, <code>docker logs void-portal</code>, <code>docker rm void-portal</code>, then <code>docker run -d --name void-portal -p 8080:80 quest/portal:2.0</code>':
      'พิมพ์: <code>docker ps -a</code>, <code>docker logs void-portal</code>, <code>docker rm void-portal</code> แล้ว <code>docker run -d --name void-portal -p 8080:80 quest/portal:2.0</code>',
    'The portal golem stands. Verify with curl localhost:8080 if you wish. Five heads down.': 'โกเลมพอร์ทัลยืนขึ้นแล้ว จะพิสูจน์ด้วย curl localhost:8080 ก็ได้ หัวที่ห้าร่วง',

    '<b>[CHRONICLE]</b> A hero documents. Come home first — <code>exit</code> until your prompt says <b>sanctum</b> (always watch your prompt!). Then enter <code>~/warroom</code>, write at least one line of runbook into <code>runbook.md</code>, open a repository, and commit it.':
      '<b>[พงศาวดาร]</b> วีรบุรุษต้องจดบันทึก กลับบ้านก่อน — <code>exit</code> จนกว่าพรอมต์จะบอกว่า <b>sanctum</b> (จับตาดูพรอมต์เสมอ!) แล้วเข้า <code>~/warroom</code> เขียน runbook อย่างน้อยหนึ่งบรรทัดลง <code>runbook.md</code> เปิด repository แล้ว commit',
    'Type: <code>exit</code> (until the prompt says sanctum), then <code>cd ~/warroom</code>, <code>echo "hosts override + db restart + image fix" &gt; runbook.md</code>, <code>git init</code>, <code>git add .</code>, <code>git commit -m "incident runbook"</code>':
      'พิมพ์: <code>exit</code> (จนพรอมต์บอก sanctum) แล้ว <code>cd ~/warroom</code>, <code>echo "hosts override + db restart + image fix" &gt; runbook.md</code>, <code>git init</code>, <code>git add .</code>, <code>git commit -m "incident runbook"</code>',
    'The runbook is history now — the next hero will not fight blind.': 'runbook เป็นประวัติศาสตร์แล้ว — วีรบุรุษคนถัดไปจะไม่ต้องสู้ทั้งที่ตาบอด',

    '<b>[CLOUD]</b> Preserve the evidence: claim a resource group <code>postmortem-rg</code> in <code>southeastasia</code> to host the incident archive.':
      '<b>[คลาวด์]</b> เก็บรักษาหลักฐาน: จับจอง resource group <code>postmortem-rg</code> ใน <code>southeastasia</code> ไว้เก็บจดหมายเหตุของเหตุการณ์',
    'Type: <code>az group create --name postmortem-rg --location southeastasia</code>': 'พิมพ์: <code>az group create --name postmortem-rg --location southeastasia</code>',
    'The archive has a home. The Amalgam is unraveling!': 'จดหมายเหตุมีบ้านแล้ว ดิ อมัลกัมกำลังคลายสลาย!',

    'FINAL BLOW — the postmortem meeting. What belongs in it?': 'หมัดสุดท้าย — การประชุม postmortem ควรมีอะไรอยู่ในนั้น?',
    'A blameless timeline, the root causes, and action items — like fixing the real DNS zone': 'ไทม์ไลน์แบบไม่กล่าวโทษใคร ต้นเหตุที่แท้จริง และรายการสิ่งที่ต้องทำ — เช่นซ่อมโซน DNS ตัวจริง',
    'A list of who to blame, ranked by seniority': 'รายชื่อคนที่ต้องโทษ เรียงตามอาวุโส',
    'Nothing; if it works now, move on': 'ไม่ต้องมีอะไร ใช้ได้แล้วก็ไปต่อ',
    'Only the parts that make the team look good': 'เฉพาะส่วนที่ทำให้ทีมดูดี',
    'Blameless truth turns one outage into permanent armor. The Amalgam detonates into nine dying echoes — LEGEND!':
      'ความจริงที่ไร้การกล่าวโทษเปลี่ยนเหตุล่มหนึ่งครั้งให้เป็นเกราะถาวร ดิ อมัลกัมระเบิดเป็นเสียงสะท้อนเก้าสายที่ดับสูญ — ตำนาน!',
    'The Amalgam FEEDS on blame and forgetting. What makes an incident never happen twice?': 'ดิ อมัลกัมกินคำกล่าวโทษและการหลงลืมเป็นอาหาร — อะไรทำให้เหตุการณ์ไม่เกิดซ้ำสอง?',
    "The Amalgam's nine voices falter into one whisper:": 'เก้าเสียงของดิ อมัลกัมแผ่วลงเหลือเพียงเสียงกระซิบเดียว:',
  });
})();
