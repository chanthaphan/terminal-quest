# ⚔️ Terminal Quest — CLI Learner (Enterprise Edition)

An RPG-style interactive learning game for the command line. Pick a class, then level
from **Shell Novice** to **Cloud Archmage** across nine realms, typing real commands
into a fully simulated terminal.

## The nine realms (curriculum)

| Realm | Teaches | Highlights |
|---|---|---|
| 🏛️ The Shell Sanctum | unix/bash basics | `pwd ls cd cat mkdir touch rm cp mv`, `find`/`grep`, pipes `\|`, redirects `>`, permissions/`chmod` |
| 🌉 The Bridge of Echoes | remote-machine CLI | `ping traceroute ssh scp curl ss/netstat nc systemctl` + a real incident-response boss fight |
| 🧭 The DNS Labyrinth | networking concepts | IPv4/CIDR/subnets, DNS records & TTL, TCP vs UDP, ports, layered debugging |
| ☁️ The Azure Citadel | Azure CLI | `az login/account/group/vm/storage/aks`, stop-vs-deallocate billing, resource-group lifecycle |
| ⚙️ The Kube Keep | AKS + kubectl | `get/describe/logs/scale/delete/rollout/set image/apply -f`, CrashLoopBackOff debugging, self-healing |
| 📜 The Chronicle of Branches | git | init/status/add/commit loop, log, branching & checkout, merge, conflict concepts |
| 🐳 The Container Foundry | docker | pull/run/ps/stop/rm lifecycle, logs/exec debugging, Dockerfile builds & layer caching, `-p` port publishing |
| ⚗️ The Alchemist's Lab | processes & ops | ps/top/kill + signals, df/du disk triage, awk/sed text alchemy, tar backups, cron |
| 👑 The Archmage Trial | final exam | a 13-task gauntlet across ALL realms, unlocked only after every boss falls — victory grants a printable **Certificate of Ascension** with confetti |

## Character classes

At first launch you choose a class — each gets its own tinted pixel hero and **+10% XP**
in its home realms:

- ⚔️ **Sys Warrior** — Sanctum + Lab
- 🏹 **Net Ranger** — Bridge + Labyrinth
- ✨ **Cloud Mage** — Citadel + Chronicle
- 🛡️ **Kube Warden** — Keep + Foundry

## HD-2D presentation 🎬

The whole game plays out on a persistent **HD-2D stage** (Octopath-Traveler style,
100% CSS/canvas — no image assets): every realm has its own parallax scene with
depth-blurred silhouette layers, bloom-lit pixel sprites, flickering light pools,
ambient particles (torch motes, foundry embers, labyrinth mist, night stars,
fireflies), a cinematic vignette and faint scanlines. Your hero stands in the scene at
all times — completing a task fires a casting animation with a spark burst, and bosses
walk into the same scene for battles. Story, tasks and quizzes live in a Final
Fantasy-style dialog box over the scene; the CLI terminal stays at the bottom.

**The journey is part of the game**: between quests you see a far **overworld view** —
rolling twilight hills with all nine realm landmarks along a winding path (clickable;
conquered realms show a ✦, locked ones a 🔒). Changing realms plays a travel sequence:
your hero walks the path to the pulsing landmark, the screen flash-zooms, and you
arrive inside the dungeon on foot. Bosses make their entrance only after you arrive.

**Every command acts out on stage.** Each command you type floats up as a spell chip
(`$ mkdir spellworks`) and plays its own effect: scan rings for `ls`/`grep`/`ps`/`get`,
an unfurling scroll for `cat`/`logs`, a conjured rune-cube for `mkdir`/`docker run`/
`kubectl apply`/`az create`, a red X-slash for `rm`/`kill`/`delete`, arcane swirls for
`sed`/`chmod`/`rollout`, glowing projectiles that fly out and echo for `ping`/`dig`/
`curl`/`scp`, a portal dash for `ssh`/`exit`, side-steps for `cd`/`checkout`, and a
gray fizzle with a ✗ when a command errors.

## Thai localization 🇹🇭

Toggle ภาษาไทย/English with the **ไทย** button in the top bar. Translations use an
English-keyed dictionary ([js/lang_th.js](web/js/lang_th.js)) with graceful fallback —
untranslated strings stay playable in English, and commands/terminal output stay in
English on purpose (the commands are the skill). **All nine realms are fully
translated** — every story, task, hint, and quiz across 47 quests (1,000+ strings in
[js/lang_th*.js](web/js/)) — plus all UI chrome, titles, level & class names, and
battle messages. Only command literals remain English, by design.

## Game mechanics

- **Quests** — each realm has 3–6 quests of hands-on terminal tasks with hints.
- **Boss battles** 👑 — Final Fantasy-style pixel-art battles: each boss is a hand-drawn
  pixel sprite with an HP bar. Typing the right command IS your attack (lunge, hit-flash,
  damage pop-up); wrong quiz answers trigger an enemy counterattack that costs a heart
  (3-heart system — lose all three and the battle restarts). Victory dissolves the boss
  FF-style. Nine bosses: the Shade, the Silent Server, the Labyrinth Guardian, the Warden
  of the Citadel, the Chaos Wyrm, the Merge Wraith, the Image Golem, the Runaway Daemon,
  and the Archlich of Legacy Systems.
- **XP & levels** — tasks award XP; 9 titles from Shell Novice to Cloud Archmage.
- **Achievements & Codex** 📖 — 16 achievements (Flawless Victory, Incident Commander,
  realm badges...) plus a spellbook listing every command, lighting up as you use them.
- **Retro sound effects** 🔊 — pure WebAudio chiptune blips, hits, level-up arpeggios and
  victory fanfares; toggle with the speaker button.
- **Sandbox** 🏖 — a Free Play mode with everything unlocked and a world-reset button.
- **Saving** — everything auto-saves after every command (a floppy icon pulses in the
  HUD): XP/achievements AND a full world snapshot (files you created, containers, repos,
  current quest + task + hearts), so a reload resumes exactly where you stood. The 💾
  **Save & Load menu** offers three save slots with metadata (level, class, bosses,
  timestamp) plus export/import of JSON save files for backup or another browser —
  imports show a summary and ask before replacing your progress. ↺ resets. (Saves taken
  mid-`ssh` resume back on your local shell.)
- The terminal simulates a virtual filesystem, remote hosts you can `ssh` between,
  a DNS zone, HTTP endpoints, an Azure subscription, a 3-node AKS cluster, git
  repositories, and a docker daemon — all in plain JavaScript, no backend.

## Run it

Any static file server works:

```bash
cd web
python3 -m http.server 4173
# open http://localhost:4173
```

(Or use the bundled `.claude/launch.json` → `terminal-quest` config.)

## Project layout

```
web/
  index.html            app shell
  css/style.css         RPG terminal theme + battle/codex/certificate styles
  js/vfs.js             virtual filesystem, tokenizer, world state
  js/commands.js        bash + network + process/system commands, pipeline runner
  js/cloud.js           simulated `az` and `kubectl`
  js/git.js             simulated git
  js/docker.js          simulated docker
  js/sprites.js         pixel-art sprites + class tints (matrices → canvas)
  js/battle.js          FF-style boss battle scenes + animations
  js/sfx.js             WebAudio retro sound effects
  js/achievements.js    achievement defs + codex command catalog
  js/engine.js          game engine: XP, quests, quizzes, classes, terminal UI
  js/content_bash.js    Realm 1 quests
  js/content_net.js     Realms 2–3 quests
  js/content_cloud.js   Realms 4–5 quests
  js/content_git.js     Realm 6 quests
  js/content_docker.js  Realm 7 quests
  js/content_ops.js     Realm 8 quests
  js/content_final.js   Realm 9 — the Archmage Trial + certificate
  js/main.js            bootstrap
```

## SwiftUI companion 📱

A native macOS/iOS study companion lives in
[swiftui/TerminalQuestCompanion](swiftui/TerminalQuestCompanion/README.md):
command-reference "scrolls" per realm plus quiz boss battles with hearts and XP
(`swift run` on macOS; open in Xcode for iOS).

## Roadmap

- [ ] More content: shell scripting quest line, git rebase/stash, docker compose
- [ ] Companion: sync XP with the web game
