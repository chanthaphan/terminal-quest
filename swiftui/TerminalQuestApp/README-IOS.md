# Terminal Quest — iOS wrapper (personal-device install)

A minimal SwiftUI app that runs the bundled `web/` game full-screen in a
`WKWebView`. The Swift sources in `TerminalQuestApp/` are ready; you create the
Xcode project around them once, in about 10 minutes.

> Alternative that needs no Xcode at all: open the GitHub Pages URL in Safari on
> the iPhone → Share → **Add to Home Screen**. The game is a PWA (offline-capable,
> custom icon). The wrapper below is for a "real app" install instead.

## 1. Create the project

1. Xcode → **File → New → Project… → iOS → App**.
2. Product Name: `TerminalQuestApp` · Interface: **SwiftUI** · Language: Swift.
3. Save it **into this `swiftui/` folder**, so Xcode creates
   `swiftui/TerminalQuestApp/TerminalQuestApp.xcodeproj` next to the pre-written
   `TerminalQuestApp/` sources. Let it replace nothing — if Xcode complains the
   folder exists, save elsewhere and drag the two `.swift` files in afterwards.
4. Bundle identifier: something unique to you, e.g. `com.chanthaphan.terminalquest`.

## 2. Use the pre-written sources

1. Delete the template `ContentView.swift`.
2. Replace the template `TerminalQuestApp.swift` with the one in this folder, and
   add `GameWebView.swift` (File → Add Files…, target: TerminalQuestApp).

## 3. Bundle the game as a folder reference

1. **File → Add Files to "TerminalQuestApp"…** → select the repo's `web/` folder
   (two levels up: `../../web`).
2. In the dialog choose **"Create folder references"** (it must appear as a **blue**
   folder, not a yellow group) and **uncheck "Copy items if needed"**.
3. Target membership: TerminalQuestApp.

Every later edit to `web/` is picked up on the next build — no file-list
maintenance. (`sw.js` and the manifest ride along; they're inert under `file://`.)

Optional hygiene — strip `.DS_Store` from the bundle: target → Build Phases →
New Run Script Phase:

```sh
find "$CODESIGNING_FOLDER_PATH/web" -name .DS_Store -delete
```

## 4. App icon

Drag `web/icons/icon-1024.png` into **Assets.xcassets → AppIcon** (1024×1024 slot —
with "Single Size" enabled that's the only one needed).

## 5. Signing & device install (free Apple ID)

1. Xcode → Settings → Accounts → add your Apple ID (no paid program needed).
2. Target → Signing & Capabilities → Team: *Your Name (Personal Team)*,
   Automatically manage signing.
3. iPhone: Settings → Privacy & Security → **Developer Mode** → on (reboots).
4. Connect the iPhone, pick it as the run destination, **⌘R**.
5. First launch is blocked until you trust the cert: Settings → General →
   **VPN & Device Management** → your Apple ID → Trust.

Free-Apple-ID limits to know:
- The provisioning profile **expires after 7 days** — the app stops launching
  until you plug in and Run from Xcode again. **Saves are kept**; only deleting
  the app wipes them (they live in localStorage in the app container).
- Max 3 sideloaded apps at once, 10 app IDs per week.
- No push/iCloud entitlements — the game needs none.

## Known, accepted limitations (wrapper only)

- **Keyboard needs one tap** on the terminal to appear — WKWebView blocks
  programmatic focus without a gesture; the game already focuses on tap.
- **Export save** (blob download) silently does nothing in the wrapper; **import**
  works. To back up progress, use export from Safari/the PWA version.
- If WebGL context loss ever leaves an odd state under memory pressure, the game
  auto-recovers or falls back to the CSS renderer; relaunching also fixes it.
