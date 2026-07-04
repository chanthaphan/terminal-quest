# 📱 Terminal Quest — Companion (SwiftUI)

A native SwiftUI study companion for the Terminal Quest web game. Browse each realm's
**command scrolls** (reference cards), then fight its boss in a **quiz battle** —
hearts, XP, levels, and boss-shake animations included. Progress persists via
`@AppStorage` and is independent of the web game's save.

All 8 study realms are included: Shell Sanctum, Bridge of Echoes, DNS Labyrinth,
Azure Citadel, Kube Keep, Chronicle of Branches (git), Container Foundry (docker),
and the Alchemist's Lab (ops).

## Run it (macOS)

```bash
cd swiftui/TerminalQuestCompanion
swift run
# If you only have Command Line Tools selected, point at Xcode:
DEVELOPER_DIR=/Applications/Xcode-beta.app/Contents/Developer swift run
```

> Note: building SwiftUI requires the full Xcode toolchain (the SwiftUI property-wrapper
> macros aren't shipped with Command Line Tools).

## Run it (iOS)

The sources are iOS-portable (`platforms: [.macOS(.v14), .iOS(.v17)]`). Open the
package folder in Xcode, select an iOS target/simulator, and run.

## Layout

```
Sources/TerminalQuestCompanion/
  App.swift            @main entry, dark-mode window
  Models.swift         curriculum data: 8 realms × (cards + quiz)
  GameStore.swift      XP, levels, conquered realms (@AppStorage persistence)
  ContentView.swift    realm map sidebar + HUD (level bar, XP)
  RealmView.swift      command-scroll cards + boss battle button
  QuizBattleView.swift FF-style quiz battle: boss HP, hearts, feedback, victory
```
