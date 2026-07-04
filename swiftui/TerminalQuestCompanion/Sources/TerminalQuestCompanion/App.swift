import SwiftUI

@main
struct TerminalQuestApp: App {
    @StateObject private var store = GameStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(store)
                .preferredColorScheme(.dark)
                #if os(macOS)
                .frame(minWidth: 860, minHeight: 620)
                #endif
        }
    }
}
