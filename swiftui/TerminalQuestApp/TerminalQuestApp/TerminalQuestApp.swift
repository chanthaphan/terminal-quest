import SwiftUI

@main
struct TerminalQuestApp: App {
    var body: some Scene {
        WindowGroup {
            GameWebView()
                // The game handles notch/home-indicator insets itself via
                // env(safe-area-inset-*) CSS, so take the whole screen.
                .ignoresSafeArea()
                .preferredColorScheme(.dark) // light status-bar text over the dark topbar
                .background(Color.black)
                .persistentSystemOverlays(.hidden) // dim the home indicator during play
        }
    }
}
