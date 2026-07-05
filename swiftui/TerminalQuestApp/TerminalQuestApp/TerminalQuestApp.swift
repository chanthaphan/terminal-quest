import SwiftUI

@main
struct TerminalQuestApp: App {
    var body: some Scene {
        WindowGroup {
            GameWebView()
                // The game handles notch/home-indicator insets itself via
                // env(safe-area-inset-*) CSS, so take the whole screen — but
                // DO respect the keyboard: SwiftUI then shrinks the WKWebView
                // when the keyboard opens, so the scene/dialog/terminal always
                // compress and stay visible while typing.
                .ignoresSafeArea(.container)
                .preferredColorScheme(.dark) // light status-bar text over the dark topbar
                .background(Color.black)
                .persistentSystemOverlays(.hidden) // dim the home indicator during play
        }
    }
}
