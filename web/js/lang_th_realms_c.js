/* Terminal Quest — Thai: Realm 4 (Azure Citadel), Realm 5 (Kube Keep), Realm 9 (Archmage Trial) */
(function () {
  CLIQ.i18n.register('th', {

    // ===== Realm 4: The Azure Citadel =======================================
    // --- az-1 ---
    'Above the realms floats the <b>Azure Citadel</b> — machines you summon with words alone. Its language is the <code>az</code> CLI. Everything you own lives inside a <b>subscription</b> (the billing boundary), and nothing answers until you prove who you are.':
      'เหนืออาณาจักรทั้งปวงลอยอยู่ <b>ป้อมปราการ Azure</b> — เครื่องจักรที่เจ้าอัญเชิญได้ด้วยถ้อยคำเพียงอย่างเดียว ภาษาของมันคือ <code>az</code> CLI ทุกสิ่งที่เจ้าครอบครองอาศัยอยู่ใน <b>subscription</b> (เขตแดนการเรียกเก็บเงิน) และจะไม่มีสิ่งใดขานตอบจนกว่าเจ้าจะพิสูจน์ตัวตน',
    'The gates know your name. The cloud awaits your commands.': 'ประตูรู้จักชื่อเจ้าแล้ว คลาวด์รอคำบัญชาของเจ้าอยู่',
    'Present yourself at the gates: <code>az login</code>.': 'แสดงตัวที่ประตู: <code>az login</code>',
    'Type: <code>az login</code>': 'พิมพ์: <code>az login</code>',
    'Authenticated as hero@quest.dev. Real az opens a browser for this.': 'ยืนยันตัวตนเป็น hero@quest.dev แล้ว — az ตัวจริงจะเปิดเบราว์เซอร์ให้ทำขั้นตอนนี้',
    'Inspect which subscription you are commanding: <code>az account show</code>.': 'ตรวจดูว่ากำลังบัญชา subscription ใดอยู่: <code>az account show</code>',
    'Type: <code>az account show</code>': 'พิมพ์: <code>az account show</code>',
    'az answers in JSON by default — machines and scripts love it.': 'az ตอบเป็น JSON โดยปริยาย — เครื่องจักรและสคริปต์ชอบมาก',
    'What is an Azure <b>subscription</b>?': '<b>subscription</b> ของ Azure คืออะไร?',
    'A billing + access boundary that contains all your resources': 'เขตแดนการเรียกเก็บเงิน + สิทธิ์เข้าถึง ที่บรรจุทรัพยากรทั้งหมดของเจ้า',
    'A monthly email newsletter from Microsoft': 'จดหมายข่าวรายเดือนจาก Microsoft',
    'A single virtual machine': 'เครื่องเสมือนหนึ่งเครื่อง',
    'A copy of your local files in the cloud': 'สำเนาไฟล์ในเครื่องของเจ้าบนคลาวด์',
    'Hierarchy: Tenant → Subscription(s) → Resource Groups → Resources. The subscription is where the bill lands.':
      'ลำดับชั้น: Tenant → Subscription → Resource Group → Resource — บิลจะไปตกที่ subscription',

    // --- az-2 ---
    'Nothing in Azure floats free: every resource must live in a <b>resource group</b> — a labeled plot of land. Delete the plot, and everything on it vanishes with it. Choose a <b>region</b> (location) wisely; that is where your machines physically live.':
      'ไม่มีสิ่งใดใน Azure ลอยอยู่อย่างอิสระ: ทุกทรัพยากรต้องอาศัยใน <b>resource group</b> — ผืนดินติดป้ายชื่อ ลบผืนดินเมื่อไร ทุกอย่างบนนั้นหายวับไปด้วย จงเลือก <b>region</b> (ตำแหน่งที่ตั้ง) ให้ดี เพราะนั่นคือที่ที่เครื่องของเจ้าอาศัยอยู่จริง ๆ',
    'You hold land in the cloud.': 'เจ้าถือครองผืนดินบนคลาวด์แล้ว',
    'Claim a plot named <code>quest-rg</code> in <code>southeastasia</code>: <code>az group create --name quest-rg --location southeastasia</code>.':
      'จับจองผืนดินชื่อ <code>quest-rg</code> ใน <code>southeastasia</code>: <code>az group create --name quest-rg --location southeastasia</code>',
    'Type: <code>az group create --name quest-rg --location southeastasia</code>': 'พิมพ์: <code>az group create --name quest-rg --location southeastasia</code>',
    'provisioningState: Succeeded — the land is yours.': 'provisioningState: Succeeded — ผืนดินเป็นของเจ้าแล้ว',
    'Survey your holdings, human-readably: <code>az group list -o table</code>. (<code>-o table</code> beats raw JSON for eyeballs.)':
      'สำรวจสมบัติแบบอ่านง่าย: <code>az group list -o table</code> (<code>-o table</code> ถนอมสายตากว่า JSON ดิบ)',
    'Type: <code>az group list -o table</code>': 'พิมพ์: <code>az group list -o table</code>',
    'The land registrar asks:': 'นายทะเบียนที่ดินถาม:',
    'Why put related resources (VM + disk + network) in ONE resource group?': 'ทำไมจึงเอาทรัพยากรที่เกี่ยวข้องกัน (VM + ดิสก์ + เครือข่าย) ไว้ใน resource group เดียว?',
    'Shared lifecycle: manage, tag, and delete them together': 'วงจรชีวิตร่วมกัน: จัดการ ติดแท็ก และลบไปพร้อมกัน',
    'It makes the VMs run faster': 'ทำให้ VM รันเร็วขึ้น',
    'Azure requires exactly one group per subscription': 'Azure บังคับหนึ่ง group ต่อหนึ่ง subscription',
    'It encrypts them automatically': 'เข้ารหัสให้อัตโนมัติ',
    'A resource group is a lifecycle boundary — "everything for project X" lives and dies together.':
      'resource group คือเขตแดนวงจรชีวิต — "ทุกอย่างของโปรเจกต์ X" เกิดและตายไปด้วยกัน',

    // --- az-3 ---
    'Now summon a <b>golem</b> — a virtual machine. One incantation conjures CPU, memory, disk, and a public IP. But beware: golems <i>cost gold every hour they exist</i>, and a "stopped" golem still holds its hardware.':
      'ทีนี้อัญเชิญ <b>โกเลม</b> — เครื่องเสมือน (VM) คาถาเดียวเสก CPU หน่วยความจำ ดิสก์ และ public IP ออกมาครบ แต่ระวัง: โกเลม <i>กินทองทุกชั่วโมงที่มันมีตัวตน</i> และโกเลมที่ "stopped" ก็ยังกอดฮาร์ดแวร์ไว้อยู่ดี',
    'You summon and dismiss compute at will — and you know what it costs.': 'เจ้าอัญเชิญและปลดคอมพิวต์ได้ตามใจ — และรู้ด้วยว่ามันมีราคาเท่าไร',
    'Summon a VM named <code>golem-01</code> on your land: <code>az vm create --resource-group quest-rg --name golem-01 --image Ubuntu2204 --generate-ssh-keys</code>.':
      'อัญเชิญ VM ชื่อ <code>golem-01</code> บนผืนดินของเจ้า: <code>az vm create --resource-group quest-rg --name golem-01 --image Ubuntu2204 --generate-ssh-keys</code>',
    'Type: <code>az vm create --resource-group quest-rg --name golem-01 --image Ubuntu2204 --generate-ssh-keys</code> (real Azure needs SSH keys for a Linux VM — this flag makes them for you)':
      'พิมพ์: <code>az vm create --resource-group quest-rg --name golem-01 --image Ubuntu2204 --generate-ssh-keys</code> (Azure จริงต้องมีกุญแจ SSH สำหรับ VM Linux — แฟล็กนี้สร้างให้เจ้าเอง)',
    'The golem lives, with a public IP. In real Azure this takes a minute or two.': 'โกเลมมีชีวิตพร้อม public IP — ใน Azure จริงขั้นนี้ใช้เวลาราวหนึ่งถึงสองนาที',
    'Muster your golems: <code>az vm list -o table</code>.': 'เรียกแถวโกเลมของเจ้า: <code>az vm list -o table</code>',
    'Type: <code>az vm list -o table</code>': 'พิมพ์: <code>az vm list -o table</code>',
    'Halt it: <code>az vm stop -g quest-rg --name golem-01</code>. Read the warning it gives you. (Nearly every az vm command needs the resource group.)':
      'หยุดมัน: <code>az vm stop -g quest-rg --name golem-01</code> แล้วอ่านคำเตือนที่มันบอกเจ้า (คำสั่ง az vm แทบทุกตัวต้องระบุ resource group)',
    'Type: <code>az vm stop -g quest-rg --name golem-01</code>': 'พิมพ์: <code>az vm stop -g quest-rg --name golem-01</code>',
    'Release its hardware so the gold stops draining: <code>az vm deallocate -g quest-rg --name golem-01</code>.':
      'ปลดฮาร์ดแวร์คืนไปเพื่อหยุดทองรั่วไหล: <code>az vm deallocate -g quest-rg --name golem-01</code>',
    'Type: <code>az vm deallocate -g quest-rg --name golem-01</code>': 'พิมพ์: <code>az vm deallocate -g quest-rg --name golem-01</code>',
    'Deallocated — compute billing stops (the disk still costs a little).': 'deallocate แล้ว — ค่าคอมพิวต์หยุดเดิน (ดิสก์ยังคิดเงินนิดหน่อย)',
    'The bursar of the Citadel asks:': 'เหรัญญิกป้อมปราการถาม:',
    'Why does <code>az vm stop</code> still cost money while <code>deallocate</code> does not?': 'ทำไม <code>az vm stop</code> ยังเสียเงิน แต่ <code>deallocate</code> ไม่เสีย?',
    'Stopped VMs still reserve the physical hardware; deallocated ones release it': 'VM ที่ stopped ยังจองฮาร์ดแวร์จริงอยู่ ส่วน deallocated คืนฮาร์ดแวร์ไปแล้ว',
    'stop is a paid premium command': 'stop เป็นคำสั่งพรีเมียมเสียเงิน',
    'It does not — they are identical': 'ไม่จริง — เหมือนกันทุกอย่าง',
    'Deallocate deletes the VM entirely': 'deallocate ลบ VM ทิ้งถาวร',
    'stop = OS shutdown, hardware kept warm. deallocate = give the hardware back. The #1 Azure bill surprise.':
      'stop = ปิด OS แต่ฮาร์ดแวร์ยังอุ่นอยู่, deallocate = คืนฮาร์ดแวร์ — เซอร์ไพรส์บิล Azure อันดับหนึ่ง',

    // --- az-4 ---
    'Every realm needs a <b>vault</b> for its treasures: blobs, files, queues, tables. In Azure that is a <b>storage account</b>. Its name becomes a public URL (<code>NAME.blob.core.windows.net</code>) — so names must be <i>globally unique</i>, lowercase, 3–24 letters and numbers.':
      'ทุกอาณาจักรต้องมี <b>ห้องนิรภัย</b> เก็บสมบัติ: blob ไฟล์ คิว ตาราง ใน Azure นั่นคือ <b>storage account</b> ชื่อของมันจะกลายเป็น URL สาธารณะ (<code>NAME.blob.core.windows.net</code>) — ชื่อจึงต้อง <i>ไม่ซ้ำใครทั้งโลก</i> ตัวพิมพ์เล็ก 3–24 ตัวอักษรและตัวเลขเท่านั้น',
    'Your bytes have a home with a worldwide address.': 'ไบต์ของเจ้ามีบ้านพร้อมที่อยู่ระดับโลกแล้ว',
    'The vault-keeper tests you before you build:': 'ผู้เฝ้าห้องนิรภัยทดสอบเจ้าก่อนสร้าง:',
    'Which is a LEGAL storage account name?': 'ชื่อ storage account ใด "ถูกกติกา"?',
    'Lowercase + digits only, 3–24 chars, no dashes/underscores — because it becomes a DNS hostname.':
      'พิมพ์เล็ก + ตัวเลขเท่านั้น 3–24 ตัว ห้ามขีดกลาง/ขีดล่าง — เพราะมันจะกลายเป็นชื่อโฮสต์ DNS',
    'Remember: the name becomes part of a URL. No capitals, no dashes, 3–24 chars.': 'จำไว้: ชื่อจะกลายเป็นส่วนหนึ่งของ URL — ห้ามพิมพ์ใหญ่ ห้ามขีด 3–24 ตัว',
    'Forge the vault: <code>az storage account create --name queststore01 --resource-group quest-rg</code>.':
      'หลอมห้องนิรภัย: <code>az storage account create --name queststore01 --resource-group quest-rg</code>',
    'Type: <code>az storage account create --name queststore01 --resource-group quest-rg</code>': 'พิมพ์: <code>az storage account create --name queststore01 --resource-group quest-rg</code>',
    'Endpoint minted: https://queststore01.blob.core.windows.net/': 'ผลิต endpoint เรียบร้อย: https://queststore01.blob.core.windows.net/',
    'Confirm it stands: <code>az storage account list</code>.': 'ยืนยันว่ามันตั้งอยู่จริง: <code>az storage account list</code>',
    'Type: <code>az storage account list</code>': 'พิมพ์: <code>az storage account list</code>',

    // --- az-5 ---
    "The Citadel's greatest work: <b>AKS</b>, the Azure Kubernetes Service — a fortress that runs armies of containers for you. Azure builds and babysits the control plane; you command the fleet. One spell creates it, one spell hands you the keys (<code>kubeconfig</code>), and then <code>kubectl</code> becomes your voice.":
      'ผลงานชิ้นเอกของป้อมปราการ: <b>AKS</b> — Azure Kubernetes Service — ป้อมที่รันกองทัพคอนเทนเนอร์แทนเจ้า Azure สร้างและเลี้ยงดู control plane ส่วนเจ้าบัญชากองเรือ คาถาหนึ่งสร้างมัน อีกคาถาส่งกุญแจให้เจ้า (<code>kubeconfig</code>) จากนั้น <code>kubectl</code> ก็กลายเป็นเสียงของเจ้า',
    'The Sky Fortress floats above your land. Realm 5 awaits inside it.': 'ป้อมลอยฟ้าลอยอยู่เหนือผืนดินของเจ้า อาณาจักรที่ 5 รออยู่ข้างในนั้น',
    'Raise the fortress: <code>az aks create --resource-group quest-rg --name quest-aks --node-count 3</code>.':
      'สถาปนาป้อม: <code>az aks create --resource-group quest-rg --name quest-aks --node-count 3</code>',
    'Type: <code>az aks create --resource-group quest-rg --name quest-aks --node-count 3</code>': 'พิมพ์: <code>az aks create --resource-group quest-rg --name quest-aks --node-count 3</code>',
    '3 worker nodes provisioning. (Real AKS takes ~5 minutes here.)': 'กำลังจัดเตรียม worker node 3 ตัว (AKS จริงใช้เวลาราว 5 นาที)',
    'Behold it: <code>az aks list -o table</code>.': 'จงชมมัน: <code>az aks list -o table</code>',
    'Type: <code>az aks list -o table</code>': 'พิมพ์: <code>az aks list -o table</code>',
    'Claim the keys — merge the cluster credentials into your kubeconfig: <code>az aks get-credentials --resource-group quest-rg --name quest-aks</code>.':
      'รับกุญแจ — ผสาน credentials ของคลัสเตอร์เข้า kubeconfig ของเจ้า: <code>az aks get-credentials --resource-group quest-rg --name quest-aks</code>',
    'Type: <code>az aks get-credentials --resource-group quest-rg --name quest-aks</code>': 'พิมพ์: <code>az aks get-credentials --resource-group quest-rg --name quest-aks</code>',
    'kubectl now knows how to reach quest-aks. This wrote ~/.kube/config.': 'บัดนี้ kubectl รู้ทางไป quest-aks แล้ว — ขั้นนี้เขียนลง ~/.kube/config',
    'Speak your first word to the fortress: <code>kubectl get nodes</code>.': 'เอ่ยคำแรกกับป้อม: <code>kubectl get nodes</code>',
    'Type: <code>kubectl get nodes</code>': 'พิมพ์: <code>kubectl get nodes</code>',
    'Three nodes, Ready. The fortress answers.': 'สามโหนด สถานะ Ready — ป้อมขานตอบแล้ว',
    'Before you enter:': 'ก่อนจะก้าวเข้าไป:',
    'What did <code>az aks get-credentials</code> actually do?': '<code>az aks get-credentials</code> ทำอะไรกันแน่?',
    'Wrote cluster address + auth into ~/.kube/config so kubectl can connect': 'เขียนที่อยู่คลัสเตอร์ + ข้อมูลยืนยันตัวตนลง ~/.kube/config เพื่อให้ kubectl เชื่อมต่อได้',
    'Created three new nodes': 'สร้างโหนดใหม่สามตัว',
    'Downloaded Kubernetes source code': 'ดาวน์โหลดซอร์สโค้ด Kubernetes',
    'Gave your VM a password': 'ตั้งรหัสผ่านให้ VM',
    'kubectl reads ~/.kube/config to know WHICH cluster to talk to and HOW to authenticate.': 'kubectl อ่าน ~/.kube/config เพื่อรู้ว่าจะคุยกับคลัสเตอร์ "ไหน" และยืนยันตัวตน "อย่างไร"',

    // --- az-boss ---
    'The <b>Warden</b> blocks the bridge to the Sky Fortress. It respects only those who wield the whole <code>az</code> arsenal — creation, inspection, and the discipline to <b>clean up after themselves</b> (the true mark of a cloud professional). <br><br>⚠️ <i>Wrong answers cost a heart.</i>':
      '<b>ผู้คุม</b> ขวางสะพานสู่ป้อมลอยฟ้า มันนับถือเฉพาะผู้ที่ใช้คลัง <code>az</code> ได้ครบมือ — สร้าง ตรวจสอบ และมีวินัยพอที่จะ <b>เก็บกวาดหลังตนเอง</b> (เครื่องหมายแท้จริงของมืออาชีพคลาวด์) <br><br>⚠️ <i>ตอบผิดเสียหัวใจหนึ่งดวง</i>',
    'The Warden steps aside. The cloud bends to your budget as well as your will. 🏆': 'ผู้คุมหลีกทางให้ คลาวด์น้อมรับทั้งเจตจำนงและงบประมาณของเจ้า 🏆',
    "The Warden's first demand:": 'ข้อเรียกร้องแรกของผู้คุม:',
    'Order the Azure hierarchy, biggest to smallest:': 'เรียงลำดับชั้นของ Azure จากใหญ่ไปเล็ก:',
    'Subscription → Resource Group → Resource': 'Subscription → Resource Group → Resource',
    'Resource → Subscription → Resource Group': 'Resource → Subscription → Resource Group',
    'Resource Group → Subscription → Resource': 'Resource Group → Subscription → Resource',
    'They are all the same level': 'อยู่ระดับเดียวกันหมด',
    'Subscription (billing) contains resource groups (lifecycle) contain resources (things).': 'Subscription (บิล) บรรจุ resource group (วงจรชีวิต) ซึ่งบรรจุ resource (ตัวของ)',
    'Prove creation: claim a plot named <code>boss-rg</code> in <code>eastus</code>.': 'พิสูจน์การสร้าง: จับจองผืนดินชื่อ <code>boss-rg</code> ใน <code>eastus</code>',
    'Type: <code>az group create --name boss-rg --location eastus</code>': 'พิมพ์: <code>az group create --name boss-rg --location eastus</code>',
    'Summon a golem named <code>guardian</code> onto <code>boss-rg</code>.': 'อัญเชิญโกเลมชื่อ <code>guardian</code> ลงบน <code>boss-rg</code>',
    'Type: <code>az vm create -g boss-rg -n guardian --image Ubuntu2204 --generate-ssh-keys</code>': 'พิมพ์: <code>az vm create -g boss-rg -n guardian --image Ubuntu2204 --generate-ssh-keys</code>',
    'The Warden grins:': 'ผู้คุมยิ้มเยาะ:',
    "The battle is over and boss-rg's golems must not haunt your bill. The cleanest way to remove EVERYTHING in it?":
      'ศึกจบแล้ว และโกเลมของ boss-rg ต้องไม่ตามหลอกหลอนบิลของเจ้า วิธีที่สะอาดที่สุดในการลบ "ทุกอย่าง" ในนั้นคือ?',
    'az group delete --name boss-rg --yes  (deleting the group deletes all resources in it)': 'az group delete --name boss-rg --yes  (ลบ group เท่ากับลบทรัพยากรทั้งหมดในนั้น)',
    'Delete each resource one by one, then keep the empty group forever': 'ลบทีละทรัพยากร แล้วเก็บ group เปล่าไว้ตลอดกาล',
    'az vm stop — stopped means free': 'az vm stop — หยุดแล้วคือฟรี',
    'Wait: unused resources auto-delete after a week': 'รอ: ของที่ไม่ใช้จะลบตัวเองในหนึ่งสัปดาห์',
    'Group deletion cascades — the reason to organize by lifecycle. And no, nothing auto-deletes; the cloud bills the forgetful.':
      'การลบ group ลามถึงทุกอย่างข้างใน — นี่คือเหตุผลที่จัดกลุ่มตามวงจรชีวิต และไม่มีอะไรลบตัวเองทั้งนั้น คลาวด์เก็บเงินคนขี้ลืมเสมอ',
    'Remember what a resource group IS: a lifecycle boundary.': 'จำให้ได้ว่า resource group คืออะไร: เขตแดนวงจรชีวิต',
    'Do the deed: <code>az group delete --name boss-rg --yes</code> (deletion is destructive — the CLI demands explicit consent), then verify with <code>az vm list -o table</code> that the guardian is gone.':
      'ลงมือ: <code>az group delete --name boss-rg --yes</code> (การลบคือการทำลาย — CLI จึงเรียกร้องคำยืนยันชัดเจน) แล้วพิสูจน์ด้วย <code>az vm list -o table</code> ว่า guardian หายไปแล้ว',
    'Type: <code>az group delete --name boss-rg --yes</code>': 'พิมพ์: <code>az group delete --name boss-rg --yes</code>',
    'Clean battlefield, clean bill.': 'สนามรบสะอาด บิลก็สะอาด',

    // ===== Realm 5: The Kube Keep ============================================
    // --- k8s-1 ---
    'Inside the Sky Fortress, everything follows one hierarchy: <b>Nodes</b> (machines) host <b>Pods</b> (the smallest fighting unit — one or more containers). <b>Deployments</b> declare "I want N copies of this pod" and Kubernetes forever fights to make it true. <b>Namespaces</b> divide the keep into wards.':
      'ภายในป้อมลอยฟ้า ทุกอย่างเดินตามลำดับชั้นเดียว: <b>Node</b> (เครื่อง) เป็นที่อยู่ของ <b>Pod</b> (หน่วยรบเล็กสุด — หนึ่งหรือหลายคอนเทนเนอร์) <b>Deployment</b> ประกาศว่า "ข้าต้องการพ็อดนี้ N ชุด" แล้ว Kubernetes จะสู้ตลอดกาลเพื่อให้เป็นจริง ส่วน <b>Namespace</b> แบ่งปราสาทเป็นเขต ๆ',
    'You can survey the whole fleet at a glance.': 'เจ้ากวาดตาดูทั้งกองทัพได้ในพริบตาเดียว',
    'Muster the machines: <code>kubectl get nodes</code>.': 'เรียกแถวเครื่องจักร: <code>kubectl get nodes</code>',
    'Muster the pods in the default ward: <code>kubectl get pods</code>.': 'เรียกแถวพ็อดในเขต default: <code>kubectl get pods</code>',
    'Type: <code>kubectl get pods</code>': 'พิมพ์: <code>kubectl get pods</code>',
    'See the wards themselves: <code>kubectl get namespaces</code>.': 'ดูตัวเขตทั้งหลาย: <code>kubectl get namespaces</code>',
    'Type: <code>kubectl get namespaces</code> (or <code>kubectl get ns</code>)': 'พิมพ์: <code>kubectl get namespaces</code> (หรือ <code>kubectl get ns</code>)',
    'Muster EVERYTHING across all wards: <code>kubectl get pods -A</code>.': 'เรียกแถว "ทุกอย่าง" ข้ามทุกเขต: <code>kubectl get pods -A</code>',
    'Type: <code>kubectl get pods -A</code> (-A = --all-namespaces)': 'พิมพ์: <code>kubectl get pods -A</code> (-A = --all-namespaces)',
    'Note the shop ward: something there is NOT Running... we will return to it.': 'สังเกตเขต shop: มีบางอย่าง "ไม่" Running อยู่... เดี๋ยวเราจะกลับมาที่นี่',
    "The keep's quartermaster asks:": 'พลาธิการของปราสาทถาม:',
    'What is the relationship between a Deployment, a Pod, and a Node?': 'Deployment, Pod และ Node สัมพันธ์กันอย่างไร?',
    'A Deployment keeps N Pods running; the scheduler places Pods onto Nodes': 'Deployment คอยให้มี Pod รันครบ N ชุด ส่วน scheduler จัดวาง Pod ลงบน Node',
    'A Pod contains many Nodes, managed by a Deployment': 'Pod บรรจุหลาย Node โดยมี Deployment ดูแล',
    'Nodes create Deployments which become Pods': 'Node สร้าง Deployment ที่กลายเป็น Pod',
    'They are three names for the same thing': 'สามชื่อของสิ่งเดียวกัน',
    'Deployment = desired state ("3 replicas of this"). Pod = running instance. Node = machine it lands on.':
      'Deployment = สถานะที่ต้องการ ("อันนี้ 3 replica") Pod = อินสแตนซ์ที่รันจริง Node = เครื่องที่มันไปลง',

    // --- k8s-2 ---
    'Something rots in the <b>shop</b> ward. A wise warden has three eyes: <code>get</code> (what is there), <code>describe</code> (its full story and <b>Events</b>), and <code>logs</code> (what the container itself said). Use all three and no failure can hide.':
      'มีบางอย่างเน่าอยู่ในเขต <b>shop</b> ผู้คุมที่ชาญฉลาดมีสามดวงตา: <code>get</code> (มีอะไรอยู่) <code>describe</code> (เรื่องราวทั้งหมดและ <b>Events</b>) และ <code>logs</code> (สิ่งที่คอนเทนเนอร์พูดเอง) ใช้ครบสามตาแล้วไม่มีความล้มเหลวใดซ่อนได้',
    'You saw the fault without guessing: events told you WHY, logs told you WHAT.': 'เจ้าเห็นข้อบกพร่องโดยไม่ต้องเดา: events บอก "ทำไม" ส่วน logs บอก "อะไร"',
    'Look at the shop ward: <code>kubectl get pods -n shop</code>. Something is wrong — find the status.':
      'มองไปที่เขต shop: <code>kubectl get pods -n shop</code> มีบางอย่างผิดปกติ — หาสถานะให้เจอ',
    'Type: <code>kubectl get pods -n shop</code>': 'พิมพ์: <code>kubectl get pods -n shop</code>',
    'CrashLoopBackOff — the pod starts, dies, and Kubernetes keeps trying with growing delays.': 'CrashLoopBackOff — พ็อดสตาร์ท ตาย แล้ว Kubernetes พยายามใหม่ด้วยช่วงรอที่ยาวขึ้นเรื่อย ๆ',
    'Check the deployments: <code>kubectl get deployments -n shop</code> — which one shows 0 ready?':
      'ตรวจ deployment: <code>kubectl get deployments -n shop</code> — ตัวไหน ready 0?',
    'Type: <code>kubectl get deployments -n shop</code>': 'พิมพ์: <code>kubectl get deployments -n shop</code>',
    'Interrogate the sick pod: <code>kubectl describe pod &lt;payment-pod-name&gt; -n shop</code> (copy the exact name from get pods). Read the <b>Events</b> at the bottom.':
      'สอบสวนพ็อดที่ป่วย: <code>kubectl describe pod &lt;ชื่อพ็อด-payment&gt; -n shop</code> (คัดลอกชื่อเป๊ะ ๆ จาก get pods) แล้วอ่าน <b>Events</b> ท้ายผลลัพธ์',
    'Run <code>kubectl get pods -n shop</code>, copy the payment-xxxx name, then <code>kubectl describe pod payment-xxxx -n shop</code>':
      'รัน <code>kubectl get pods -n shop</code> คัดลอกชื่อ payment-xxxx แล้วพิมพ์ <code>kubectl describe pod payment-xxxx -n shop</code>',
    'Events reveal: "Back-off restarting failed container" — it starts, crashes, and kubelet keeps retrying. Someone shipped a broken release.':
      'Events เปิดโปง: "Back-off restarting failed container" — มันสตาร์ท แครช แล้ว kubelet ก็พยายามใหม่ซ้ำ ๆ ใครบางคนส่งรีลีสที่พังมา',
    "Hear the container's last words: <code>kubectl logs &lt;payment-pod-name&gt; -n shop</code>.": 'ฟังคำพูดสุดท้ายของคอนเทนเนอร์: <code>kubectl logs &lt;ชื่อพ็อด-payment&gt; -n shop</code>',
    'Type: <code>kubectl logs payment-xxxx -n shop</code> (same pod name)': 'พิมพ์: <code>kubectl logs payment-xxxx -n shop</code> (ชื่อพ็อดเดิม)',
    "The Warden's eye turns to you:": 'ดวงตาผู้คุมหันมาที่เจ้า:',
    'What does <b>CrashLoopBackOff</b> actually mean?': 'แท้จริงแล้ว <b>CrashLoopBackOff</b> หมายความว่าอะไร?',
    'The container keeps crashing; k8s restarts it with increasing wait times': 'คอนเทนเนอร์แครชซ้ำ ๆ และ k8s รีสตาร์ตให้โดยเว้นช่วงนานขึ้นเรื่อย ๆ',
    'The node has crashed permanently': 'โหนดแครชถาวร',
    'The pod is paused waiting for user input': 'พ็อดหยุดรอผู้ใช้พิมพ์ข้อมูล',
    'The cluster is out of disk': 'คลัสเตอร์ดิสก์เต็ม',
    'Back-off = exponentially growing delay between restart attempts. The fix is never "wait" — find why it crashes.':
      'back-off = ช่วงรอที่โตแบบทวีคูณระหว่างการรีสตาร์ต ทางแก้ไม่ใช่ "รอ" — จงหาสาเหตุที่มันแครช',

    // --- k8s-3 ---
    'Diagnosis: the <code>payment</code> deployment points at image <code>shop-payment:1.2.3-bad</code> — a tag that was never published. The cure: point the deployment at the good tag <code>shop-payment:1.2.4</code>. Kubernetes will roll the change out pod by pod — <b>zero downtime</b> if you have replicas.':
      'ผลวินิจฉัย: deployment <code>payment</code> ชี้ไปที่อิมเมจ <code>shop-payment:1.2.3-bad</code> — แท็กที่ไม่เคยถูกเผยแพร่ ทางรักษา: ชี้ไปที่แท็กดี <code>shop-payment:1.2.4</code> แล้ว Kubernetes จะทยอยเปลี่ยนทีละพ็อด — <b>ดาวน์ไทม์เป็นศูนย์</b> ถ้ามี replica',
    'The shop takes payment again. You fixed production without touching a single machine by hand.':
      'ร้านรับเงินได้อีกครั้ง เจ้าแก้โปรดักชันโดยไม่แตะเครื่องไหนด้วยมือเลยแม้แต่เครื่องเดียว',
    'Cast the cure: <code>kubectl set image deployment/payment payment=shop-payment:1.2.4 -n shop</code>.':
      'ร่ายยารักษา: <code>kubectl set image deployment/payment payment=shop-payment:1.2.4 -n shop</code>',
    'Type: <code>kubectl set image deployment/payment payment=shop-payment:1.2.4 -n shop</code>': 'พิมพ์: <code>kubectl set image deployment/payment payment=shop-payment:1.2.4 -n shop</code>',
    'Watch the rollout land: <code>kubectl rollout status deployment/payment -n shop</code>.': 'เฝ้าดู rollout ลงจอด: <code>kubectl rollout status deployment/payment -n shop</code>',
    'Type: <code>kubectl rollout status deployment/payment -n shop</code>': 'พิมพ์: <code>kubectl rollout status deployment/payment -n shop</code>',
    'Trust, but verify: <code>kubectl get pods -n shop</code> — all Running?': 'เชื่อได้ แต่ต้องพิสูจน์: <code>kubectl get pods -n shop</code> — Running ครบทุกตัวไหม?',
    'Every pod Running. Incident closed with evidence, not hope.': 'ทุกพ็อด Running — ปิด incident ด้วยหลักฐาน ไม่ใช่ความหวัง',
    'A final lesson from the healer:': 'บทเรียนสุดท้ายจากผู้เยียวยา:',
    'During a rolling update with 3 replicas, what does Kubernetes do?': 'ระหว่าง rolling update ที่มี 3 replica, Kubernetes ทำอะไร?',
    'Replaces pods gradually — new one Ready before an old one dies': 'ทยอยเปลี่ยนพ็อด — ตัวใหม่ Ready ก่อนตัวเก่าจะตาย',
    'Kills all 3 pods, then starts 3 new ones (downtime)': 'ฆ่าทั้ง 3 พ็อดแล้วค่อยสตาร์ทใหม่ 3 ตัว (ดาวน์ไทม์)',
    'Requires you to ssh into each node': 'ต้อง ssh เข้าไปทีละโหนด',
    'Reboots the whole cluster': 'รีบูตทั้งคลัสเตอร์',
    'RollingUpdate is the default strategy: surge up, drain down, service never empty.': 'RollingUpdate คือกลยุทธ์ปริยาย: เพิ่มตัวใหม่ก่อน ค่อยระบายตัวเก่า เซอร์วิสไม่มีวันว่างเปล่า',

    // --- k8s-4 ---
    "A horde of customers approaches! The <code>frontend</code> holds with 3 pods, but you need 5. And here is Kubernetes' deepest magic: you never command pods directly — you declare a <b>desired state</b> and controllers fight reality until it matches. Kill a pod and watch it resurrect.":
      'ฝูงลูกค้ากำลังบุกเข้ามา! <code>frontend</code> ยันไว้ด้วย 3 พ็อด แต่เจ้าต้องการ 5 และนี่คือเวทมนตร์ลึกสุดของ Kubernetes: เจ้าไม่เคยบัญชาพ็อดโดยตรง — เจ้าประกาศ <b>สถานะที่ต้องการ</b> แล้ว controller จะสู้กับความจริงจนกว่ามันจะตรงกัน ลองฆ่าพ็อดสักตัวแล้วดูมันฟื้นคืนชีพ',
    'Desired state > manual labor. The legion maintains itself.': 'สถานะที่ต้องการ > แรงงานมือ กองพันดูแลตัวเองได้',
    'Grow the legion: <code>kubectl scale deployment/frontend --replicas=5 -n shop</code>.': 'ขยายกองพัน: <code>kubectl scale deployment/frontend --replicas=5 -n shop</code>',
    'Type: <code>kubectl scale deployment/frontend --replicas=5 -n shop</code>': 'พิมพ์: <code>kubectl scale deployment/frontend --replicas=5 -n shop</code>',
    'Count your soldiers: <code>kubectl get pods -n shop</code> — five frontends?': 'นับพลทหาร: <code>kubectl get pods -n shop</code> — frontend ครบห้าตัวไหม?',
    'Now the magic trick: <b>kill one</b>. <code>kubectl delete pod &lt;any-frontend-pod&gt; -n shop</code>.':
      'ทีนี้กลเวทมนตร์: <b>ฆ่าไปหนึ่งตัว</b> <code>kubectl delete pod &lt;พ็อด-frontend-ตัวใดก็ได้&gt; -n shop</code>',
    'Copy any frontend-xxxx name from get pods, then: <code>kubectl delete pod frontend-xxxx -n shop</code>':
      'คัดลอกชื่อ frontend-xxxx ตัวใดก็ได้จาก get pods แล้ว: <code>kubectl delete pod frontend-xxxx -n shop</code>',
    'Pod destroyed. Or... was it?': 'พ็อดถูกทำลายแล้ว... หรือเปล่านะ?',
    'Look again: <code>kubectl get pods -n shop</code>. Count the frontends.': 'มองอีกครั้ง: <code>kubectl get pods -n shop</code> แล้วนับ frontend ดู',
    'Still five — one has a brand-new name. The controller resurrected it within seconds.': 'ยังห้าตัวเท่าเดิม — ตัวหนึ่งได้ชื่อใหม่เอี่ยม controller ชุบชีวิตมันภายในไม่กี่วินาที',
    'The legion commander asks:': 'ผู้บัญชากองพันถาม:',
    'You deleted a pod but it came back. WHO brought it back?': 'เจ้าลบพ็อดแล้วมันกลับมา — "ใคร" พามันกลับมา?',
    "The Deployment's controller (ReplicaSet) enforcing desired state: 5 replicas": 'controller ของ Deployment (ReplicaSet) ที่บังคับใช้สถานะที่ต้องการ: 5 replica',
    'Azure support staff restarted it manually': 'ทีมซัพพอร์ต Azure รีสตาร์ตให้ด้วยมือ',
    'The pod refused to die': 'พ็อดไม่ยอมตาย',
    'kubectl has an undo feature': 'kubectl มีปุ่ม undo',
    'The reconciliation loop: observed 4, desired 5 → create 1. This is the heart of Kubernetes.': 'ลูป reconciliation: เห็น 4 ต้องการ 5 → สร้างเพิ่ม 1 — นี่คือหัวใจของ Kubernetes',

    // --- k8s-5 ---
    'True wardens do not click or type resources into being — they write <b>manifests</b> (YAML scrolls) that declare what should exist, and cast <code>kubectl apply -f</code>. The scroll is the source of truth; keep it in git and the cluster becomes reproducible. And to let the world reach your pods, you raise a <b>Service</b>.':
      'ผู้คุมตัวจริงไม่คลิกหรือพิมพ์เสกทรัพยากรทีละตัว — พวกเขาเขียน <b>manifest</b> (คัมภีร์ YAML) ประกาศว่าอะไรควรมีอยู่ แล้วร่าย <code>kubectl apply -f</code> คัมภีร์คือแหล่งความจริง เก็บไว้ใน git แล้วคลัสเตอร์จะสร้างซ้ำได้เสมอ และเพื่อให้โลกเข้าถึงพ็อดของเจ้า เจ้าต้องสถาปนา <b>Service</b>',
    "You create by declaration now. The Keep's final trial awaits.": 'บัดนี้เจ้าสร้างด้วยการประกาศแล้ว บททดสอบสุดท้ายของปราสาทรออยู่',
    'A scroll awaits in <code>manifests/</code>. Read it: <code>cat manifests/mage.yaml</code>. Note the kind, replicas, and image.':
      'คัมภีร์รออยู่ใน <code>manifests/</code> อ่านมัน: <code>cat manifests/mage.yaml</code> สังเกต kind, replicas และ image',
    'Type: <code>cat manifests/mage.yaml</code>': 'พิมพ์: <code>cat manifests/mage.yaml</code>',
    'Cast it into reality: <code>kubectl apply -f manifests/mage.yaml</code>.': 'ร่ายมันสู่ความจริง: <code>kubectl apply -f manifests/mage.yaml</code>',
    'Type: <code>kubectl apply -f manifests/mage.yaml</code>': 'พิมพ์: <code>kubectl apply -f manifests/mage.yaml</code>',
    'deployment.apps/mage created — from words to running pods.': 'deployment.apps/mage created — จากถ้อยคำสู่พ็อดที่รันจริง',
    'Verify the summoning: <code>kubectl get deployments</code> — is mage 2/2?': 'พิสูจน์การอัญเชิญ: <code>kubectl get deployments</code> — mage เป็น 2/2 ไหม?',
    'Type: <code>kubectl get deployments</code>': 'พิมพ์: <code>kubectl get deployments</code>',
    "Now see how the shop reaches the outside world: <code>kubectl get services -n shop</code>. Find the LoadBalancer's EXTERNAL-IP.":
      'ทีนี้ดูว่าร้านเข้าถึงโลกภายนอกได้อย่างไร: <code>kubectl get services -n shop</code> — หา EXTERNAL-IP ของ LoadBalancer',
    'Type: <code>kubectl get services -n shop</code> (or svc)': 'พิมพ์: <code>kubectl get services -n shop</code> (หรือ svc)',
    'On AKS, a LoadBalancer Service conjures a real Azure load balancer with a public IP.': 'บน AKS, Service แบบ LoadBalancer เสก load balancer ของ Azure จริง ๆ พร้อม public IP',
    'One question before the throne room:': 'อีกหนึ่งคำถามก่อนเข้าท้องพระโรง:',
    'Pods die and respawn with new IPs constantly. How do clients reliably reach them?': 'พ็อดตายและเกิดใหม่พร้อม IP ใหม่ตลอดเวลา — ไคลเอนต์เข้าถึงพวกมันอย่างมั่นคงได้อย่างไร?',
    'Through a Service — a stable name/IP that load-balances to whatever pods match its selector': 'ผ่าน Service — ชื่อ/IP ที่เสถียร คอยกระจายโหลดไปยังพ็อดที่ตรงกับ selector ของมัน',
    'By hardcoding pod IPs and updating them hourly': 'ฮาร์ดโค้ด IP พ็อดแล้วอัปเดตทุกชั่วโมง',
    'Pods keep their IP forever': 'พ็อดเก็บ IP เดิมตลอดกาล',
    'You cannot reach pods, ever': 'เข้าถึงพ็อดไม่ได้เลยตลอดกาล',
    'Service = stable front door. ClusterIP inside, LoadBalancer for the public world.': 'Service = ประตูหน้าที่มั่นคง — ClusterIP สำหรับข้างใน LoadBalancer สำหรับโลกสาธารณะ',

    // --- k8s-boss ---
    "🐉 The <b>Chaos Wyrm</b> slams into the Keep and corrupts the shop ward's <code>frontend</code> — it now runs a poisoned release that crashes on startup, and customers see nothing but errors. No hints will save you now, warden. Diagnose it (get → describe/logs), cure it (the good image is <code>shop-frontend:2.1</code>), and prove the cure. <br><br>⚠️ <i>Wrong quiz answers cost a heart.</i>":
      '🐉 <b>มังกรแห่งความโกลาหล</b> พุ่งชนปราสาทและทำ <code>frontend</code> ของเขต shop ให้เสื่อมทราม — ตอนนี้มันรันรีลีสอาบยาพิษที่แครชตั้งแต่สตาร์ท และลูกค้าเห็นแต่ข้อผิดพลาด ไม่มีคำใบ้ช่วยเจ้าแล้วผู้คุม จงวินิจฉัย (get → describe/logs) รักษา (อิมเมจดีคือ <code>shop-frontend:2.1</code>) แล้วพิสูจน์การรักษา <br><br>⚠️ <i>ตอบคำถามผิดเสียหัวใจหนึ่งดวง</i>',
    'The Wyrm flees. You are the Cloud Archmage — bash, network, cloud, and cluster all answer to you. 🏆👑':
      'มังกรเผ่นหนี เจ้าคือจอมเวทคลาวด์ — bash เครือข่าย คลาวด์ และคลัสเตอร์ล้วนน้อมรับคำสั่งเจ้า 🏆👑',
    'The alarm sounds. Survey the damage in the shop ward.': 'สัญญาณเตือนดังขึ้น สำรวจความเสียหายในเขต shop',
    'The frontends are down. The Wyrm cackles.': 'เหล่า frontend ล้มหมด มังกรหัวเราะก้อง',
    'The Wyrm taunts: "You will never know why!"': 'มังกรเยาะเย้ย: "เจ้าไม่มีวันรู้สาเหตุหรอก!"',
    'Fastest way to learn WHY those pods are failing?': 'วิธีเร็วที่สุดที่จะรู้ว่า "ทำไม" พ็อดพวกนั้นล้ม?',
    'kubectl describe pod NAME -n shop — and read the Events': 'kubectl describe pod NAME -n shop — แล้วอ่าน Events',
    'Delete the namespace and hope': 'ลบ namespace แล้วภาวนา',
    'Restart every node in the cluster': 'รีสตาร์ตทุกโหนดในคลัสเตอร์',
    'ssh into the pod': 'ssh เข้าไปในพ็อด',
    "Events carry the scheduler's and kubelet's own explanation — image pulls, probes, OOM kills.":
      'Events บรรจุคำอธิบายจากปากของ scheduler และ kubelet เอง — การดึงอิมเมจ probe และ OOM kill',
    "Destruction is not diagnosis. Which command shows a pod's Events?": 'การทำลายไม่ใช่การวินิจฉัย — คำสั่งใดแสดง Events ของพ็อด?',
    'Do it — interrogate a broken frontend pod (describe or logs) and find the evidence.': 'ลงมือ — สอบสวนพ็อด frontend ที่พัง (describe หรือ logs) แล้วหาหลักฐาน',
    'Type: <code>kubectl describe pod frontend-xxxx -n shop</code> (get the name from get pods)': 'พิมพ์: <code>kubectl describe pod frontend-xxxx -n shop</code> (เอาชื่อจาก get pods)',
    "Evidence: release \"shop-frontend:3.0-broken\" crashes at startup — Events show the back-off, logs show the FATAL. The Wyrm's corruption is exposed.":
      'หลักฐาน: รีลีส "shop-frontend:3.0-broken" แครชตั้งแต่สตาร์ท — Events แสดง back-off ส่วน logs แสดง FATAL ความเสื่อมทรามของมังกรถูกเปิดโปง',
    'Strike! Point the frontend back at the true image, <code>shop-frontend:2.1</code>.': 'จู่โจม! ชี้ frontend กลับไปที่อิมเมจแท้จริง <code>shop-frontend:2.1</code>',
    'Type: <code>kubectl set image deployment/frontend frontend=shop-frontend:2.1 -n shop</code>': 'พิมพ์: <code>kubectl set image deployment/frontend frontend=shop-frontend:2.1 -n shop</code>',
    'Direct hit! The rollout begins.': 'โดนเต็ม ๆ! rollout เริ่มขึ้นแล้ว',
    'Prove the kill: confirm the rollout finished AND the pods are Running.': 'พิสูจน์การสังหาร: ยืนยันว่า rollout จบ "และ" พ็อดทั้งหมด Running',
    'Type: <code>kubectl rollout status deployment/frontend -n shop</code>, then <code>kubectl get pods -n shop</code>':
      'พิมพ์: <code>kubectl rollout status deployment/frontend -n shop</code> แล้วตามด้วย <code>kubectl get pods -n shop</code>',
    'All frontends Running.': 'frontend ทุกตัว Running แล้ว',
    'The Wyrm gasps its last:': 'มังกรหอบเฮือกสุดท้าย:',
    'FINAL BLOW — a teammate asks how you fixed production so fast. The honest answer:': 'หมัดสุดท้าย — เพื่อนร่วมทีมถามว่าแก้โปรดักชันเร็วขนาดนี้ได้ไง คำตอบที่ซื่อสัตย์:',
    'Observed state with get, read Events/logs for the cause, changed desired state, verified the rollout':
      'สังเกตสถานะด้วย get อ่าน Events/logs หาสาเหตุ แก้สถานะที่ต้องการ แล้วพิสูจน์ rollout',
    'Rebooted things until it worked': 'รีบูตไปเรื่อย ๆ จนกว่าจะเวิร์ก',
    'Deleted and recreated the whole cluster': 'ลบแล้วสร้างคลัสเตอร์ใหม่ทั้งอัน',
    'Edited files inside the running container by hand': 'แก้ไฟล์ในคอนเทนเนอร์ที่รันอยู่ด้วยมือ',
    'Observe → diagnose → declare → verify. That loop IS Kubernetes operations. The Wyrm is slain.':
      'สังเกต → วินิจฉัย → ประกาศ → พิสูจน์ ลูปนี้แหละคืองานปฏิบัติการ Kubernetes — มังกรถูกสังหารแล้ว',

    // ===== Realm 9: The Archmage Trial ======================================
    "💀 Atop the highest tower waits the <b>Archlich of Legacy Systems</b> — keeper of every undocumented server, every 2 AM outage, every \"it works on my machine\". It has devoured a thousand juniors. It cannot devour you: you carry eight realms' worth of scars. The Trial sweeps ALL your arts — shell, pipes, DNS, ports, cloud, cluster, chronicle, foundry, and lab. <br><br>⚠️ <i>Wrong answers cost a heart. Fall, and the Trial restarts. Win, and be certified <b>Cloud Archmage</b>.</i>":
      '💀 บนยอดหอคอยสูงสุด <b>อาร์ชลิชแห่งระบบโบราณ</b> รออยู่ — ผู้เก็บรักษาเซิร์ฟเวอร์ไร้เอกสารทุกเครื่อง เหตุล่มตีสองทุกครั้ง และทุกประโยค "เครื่องผมมันเวิร์กนะ" มันกลืนกินจูเนียร์มาแล้วนับพัน แต่กลืนเจ้าไม่ได้: เจ้าแบกรอยแผลจากแปดอาณาจักรมาแล้ว บททดสอบกวาดครบทุกศาสตร์ — เชลล์ ไปป์ DNS พอร์ต คลาวด์ คลัสเตอร์ พงศาวดาร โรงหลอม และห้องทดลอง <br><br>⚠️ <i>ตอบผิดเสียหัวใจหนึ่งดวง ล้มเมื่อไรบททดสอบเริ่มใหม่ ชนะแล้วรับใบประกาศ <b>จอมเวทคลาวด์</b></i>',
    'The Archlich crumbles into well-documented dust.': 'อาร์ชลิชแหลกสลายกลายเป็นฝุ่นที่มีเอกสารครบถ้วน',
    '<b>Trial of the Shell.</b> The Archlich hid its sigils in the trial grounds. Locate <code>sigils.txt</code> somewhere under <code>trial/</code>.':
      '<b>บททดสอบแห่งเชลล์</b> อาร์ชลิชซ่อนตราสัญลักษณ์ไว้ในสนามทดสอบ จงหา <code>sigils.txt</code> ที่ไหนสักแห่งใต้ <code>trial/</code>',
    'Type: <code>find trial -name "sigils.txt"</code>': 'พิมพ์: <code>find trial -name "sigils.txt"</code>',
    '<b>Trial of the Pipe.</b> Count how many sigils are TRUE — one woven chain, one number.': '<b>บททดสอบแห่งไปป์</b> นับว่าตราใดเป็น TRUE กี่ตรา — สายคำสั่งเดียว ตัวเลขเดียว',
    'Type: <code>grep TRUE trial/vault/sigils.txt | wc -l</code>': 'พิมพ์: <code>grep TRUE trial/vault/sigils.txt | wc -l</code>',
    'Two true sigils. The Archlich hisses.': 'ตราจริงสองดวง อาร์ชลิชขู่ฟ่อ',
    'It speaks in riddles:': 'มันพูดเป็นปริศนา:',
    'The Archlich: "Explain your pipe sorcery or perish."': 'อาร์ชลิช: "จงอธิบายเวทไปป์ของเจ้า มิฉะนั้นก็ตายซะ"',
    'The | feeds the output of one command into the next as input': 'เครื่องหมาย | ป้อนผลลัพธ์ของคำสั่งหนึ่งเป็นอินพุตของคำสั่งถัดไป',
    'The | runs both commands at the same time independently': 'เครื่องหมาย | รันสองคำสั่งพร้อมกันแบบแยกอิสระ',
    'The | saves the output to a file': 'เครื่องหมาย | บันทึกผลลัพธ์ลงไฟล์',
    'The | comments out the second command': 'เครื่องหมาย | คอมเมนต์คำสั่งที่สองทิ้ง',
    'Output → input, chained. Small tools, composed.': 'ผลลัพธ์ → อินพุต ต่อเป็นสาย — เครื่องมือเล็ก ๆ ประกอบร่างกัน',
    "<b>Trial of Names.</b> Prove the realm's name still resolves — tersely.": '<b>บททดสอบแห่งชื่อ</b> พิสูจน์ว่าชื่อของอาณาจักรยังแปลงได้ — แบบกระชับ',
    "<b>Trial of Gates.</b> Knock on quest.dev's secure gate (443) and prove it stands open.": '<b>บททดสอบแห่งประตู</b> เคาะประตูปลอดภัยของ quest.dev (443) แล้วพิสูจน์ว่ามันเปิดอยู่',
    'Type: <code>nc -zv quest.dev 443</code>': 'พิมพ์: <code>nc -zv quest.dev 443</code>',
    'The Archlich tests your scars:': 'อาร์ชลิชทดสอบรอยแผลของเจ้า:',
    '"A visitor is REFUSED at a gate, though the machine pings. What died?"': '"ผู้มาเยือนถูก REFUSED ที่ประตู ทั้งที่เครื่องยัง ping ติด — อะไรตาย?"',
    'The service that should be listening on that port': 'เซอร์วิสที่ควรจะฟังอยู่ที่พอร์ตนั้น',
    'The DNS record': 'DNS record',
    "The visitor's keyboard": 'คีย์บอร์ดของผู้มาเยือน',
    'The entire network': 'เครือข่ายทั้งหมด',
    'Ping proves the host; refused proves no listener. You learned this against the Silent Server.':
      'ping พิสูจน์ตัวเครื่อง refused พิสูจน์ว่าไม่มีผู้ฟัง — เจ้าเรียนบทนี้มาจากศึกเซิร์ฟเวอร์เงียบงัน',
    '<b>Trial of Clouds.</b> Claim a plot for the final battle: resource group <code>trial-rg</code> in <code>southeastasia</code>.':
      '<b>บททดสอบแห่งคลาวด์</b> จับจองผืนดินสำหรับศึกสุดท้าย: resource group <code>trial-rg</code> ใน <code>southeastasia</code>',
    'Type: <code>az group create --name trial-rg --location southeastasia</code>': 'พิมพ์: <code>az group create --name trial-rg --location southeastasia</code>',
    'It probes your cloud-craft:': 'มันหยั่งเชิงวิชาคลาวด์ของเจ้า:',
    '"Your golems idle at night, yet gold drains. Why?"': '"โกเลมของเจ้านิ่งเฉยยามค่ำคืน แต่ทองยังรั่วไหล — เพราะเหตุใด?"',
    'Stopped VMs still hold hardware — only deallocation stops compute billing': 'VM ที่ stopped ยังกอดฮาร์ดแวร์อยู่ — มีแต่ deallocate เท่านั้นที่หยุดค่าคอมพิวต์',
    'Azure charges for moonlight': 'Azure คิดค่าแสงจันทร์',
    'VMs cannot be stopped': 'VM หยุดไม่ได้',
    'Billing is random': 'บิลสุ่มเอา',
    'stop ≠ deallocate. The Warden of the Citadel taught you; the Archlich remembers.': 'stop ≠ deallocate — ผู้คุมป้อมปราการเคยสอนเจ้า และอาร์ชลิชจำได้',
    '<b>Trial of the Keep.</b> The guestbook legion must grow to four.': '<b>บททดสอบแห่งปราสาท</b> กองพัน guestbook ต้องขยายเป็นสี่',
    'Type: <code>kubectl scale deployment/guestbook --replicas=4</code>': 'พิมพ์: <code>kubectl scale deployment/guestbook --replicas=4</code>',
    'Prove the legion stands — four guestbook pods, Running.': 'พิสูจน์ว่ากองพันยืนหยัด — พ็อด guestbook สี่ตัว สถานะ Running',
    '<b>Trial of the Chronicle.</b> History must record this battle: enter <code>trial/</code>, open a repository, and commit everything with a message.':
      '<b>บททดสอบแห่งพงศาวดาร</b> ประวัติศาสตร์ต้องบันทึกศึกนี้: เข้าไปใน <code>trial/</code> เปิด repository แล้ว commit ทุกอย่างพร้อมข้อความ',
    'Type: <code>cd trial</code> then <code>git init</code>, <code>git add .</code>, <code>git commit -m "the trial"</code>':
      'พิมพ์: <code>cd trial</code> แล้วตามด้วย <code>git init</code>, <code>git add .</code>, <code>git commit -m "the trial"</code>',
    'The Trial is committed to history.': 'บททดสอบถูก commit ลงประวัติศาสตร์แล้ว',
    '<b>Trial of the Foundry.</b> Raise a witness: a detached nginx container named <code>trial-portal</code>, host gate 9090 to its port 80.':
      '<b>บททดสอบแห่งโรงหลอม</b> สถาปนาสักขีพยาน: คอนเทนเนอร์ nginx แบบเบื้องหลังชื่อ <code>trial-portal</code> ประตูโฮสต์ 9090 สู่พอร์ต 80 ของมัน',
    'Type: <code>docker run -d --name trial-portal -p 9090:80 nginx</code>': 'พิมพ์: <code>docker run -d --name trial-portal -p 9090:80 nginx</code>',
    'The Archlich raises its staff for the last exchange:': 'อาร์ชลิชชูคทาสำหรับการปะทะครั้งสุดท้าย:',
    'FINAL BLOW — the Archlich demands your creed. What IS the way of the Cloud Archmage?': 'หมัดสุดท้าย — อาร์ชลิชเรียกร้องหลักธรรมของเจ้า วิถีแห่งจอมเวทคลาวด์คืออะไร?',
    'Observe the state, diagnose the cause, change with intent, verify the result': 'สังเกตสถานะ วินิจฉัยสาเหตุ แก้ไขอย่างมีเจตนา แล้วพิสูจน์ผลลัพธ์',
    'Reboot first, ask questions later': 'รีบูตก่อน ค่อยถามทีหลัง',
    'Memorize every command and never read output': 'ท่องทุกคำสั่งแต่ไม่เคยอ่านผลลัพธ์',
    'Blame the network': 'โทษเครือข่ายไว้ก่อน',
    'The creed that slew nine bosses. The Archlich of Legacy Systems crumbles — CERTIFIED!': 'หลักธรรมที่สังหารบอสมาแล้วเก้าตน อาร์ชลิชแห่งระบบโบราณแหลกสลาย — ได้รับการรับรอง!',
    'Think of every boss you have slain. What did every victory have in common?': 'นึกถึงบอสทุกตนที่เจ้าเคยสังหาร — ชัยชนะทุกครั้งมีอะไรเหมือนกัน?',
  });
})();
