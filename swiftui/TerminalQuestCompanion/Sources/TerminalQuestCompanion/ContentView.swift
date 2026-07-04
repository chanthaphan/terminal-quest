import SwiftUI

struct ContentView: View {
    @EnvironmentObject var store: GameStore
    @State private var selection: RealmData.ID?

    var body: some View {
        NavigationSplitView {
            List(Curriculum.realms, selection: $selection) { realm in
                HStack(spacing: 10) {
                    Text(realm.icon).font(.title3)
                    VStack(alignment: .leading, spacing: 2) {
                        Text(realm.title).font(.system(.subheadline, design: .monospaced)).bold()
                        Text(realm.tagline)
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                            .lineLimit(1)
                    }
                    Spacer()
                    if store.conquered.contains(realm.id) {
                        Text("✦").foregroundStyle(.green)
                    }
                }
                .padding(.vertical, 3)
                .tag(realm.id)
            }
            .navigationTitle("Realm Map")
            .safeAreaInset(edge: .bottom) { hudBar }
        } detail: {
            if let id = selection, let realm = Curriculum.realms.first(where: { $0.id == id }) {
                RealmView(realm: realm)
            } else {
                welcome
            }
        }
    }

    private var hudBar: some View {
        VStack(alignment: .leading, spacing: 5) {
            Text("Lv \(store.levelIndex + 1) · \(store.levelTitle)")
                .font(.system(.caption, design: .monospaced)).bold()
                .foregroundStyle(.purple)
            ProgressView(value: store.levelProgress)
                .tint(.purple)
            Text("\(store.xp) XP · \(store.conquered.count)/\(Curriculum.realms.count) realms")
                .font(.system(.caption2, design: .monospaced))
                .foregroundStyle(.secondary)
        }
        .padding(10)
        .background(.ultraThinMaterial)
    }

    private var welcome: some View {
        VStack(spacing: 14) {
            Text("⚔️").font(.system(size: 56))
            Text("TERMINAL QUEST — COMPANION")
                .font(.system(.title2, design: .monospaced)).bold()
                .foregroundStyle(.yellow)
            Text("Study the command scrolls of each realm,\nthen challenge its boss in a quiz battle.\nYour XP is saved between sessions.")
                .multilineTextAlignment(.center)
                .font(.system(.body, design: .monospaced))
                .foregroundStyle(.secondary)
            Text("Pick a realm from the map to begin.")
                .font(.system(.callout, design: .monospaced))
                .foregroundStyle(.cyan)
        }
        .padding()
    }
}
