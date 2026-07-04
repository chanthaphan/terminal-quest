import SwiftUI

struct RealmView: View {
    let realm: RealmData
    @EnvironmentObject var store: GameStore
    @State private var showBattle = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                header
                Text("COMMAND SCROLLS")
                    .font(.system(.caption, design: .monospaced))
                    .foregroundStyle(.secondary)
                    .kerning(2)
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 300), spacing: 10)], spacing: 10) {
                    ForEach(realm.cards) { card in
                        cardView(card)
                    }
                }
                battleButton
            }
            .padding(20)
        }
        .navigationTitle("\(realm.icon) \(realm.title)")
        .sheet(isPresented: $showBattle) {
            QuizBattleView(realm: realm)
                .environmentObject(store)
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(realm.tagline)
                .font(.system(.subheadline, design: .monospaced))
                .foregroundStyle(.secondary)
            if store.conquered.contains(realm.id) {
                Label("Boss defeated — realm conquered", systemImage: "crown.fill")
                    .font(.system(.caption, design: .monospaced))
                    .foregroundStyle(.green)
            }
        }
    }

    private func cardView(_ card: CommandCard) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(card.cmd)
                .font(.system(.callout, design: .monospaced)).bold()
                .foregroundStyle(.cyan)
            Text(card.desc)
                .font(.system(.caption, design: .monospaced))
                .foregroundStyle(.primary.opacity(0.85))
                .fixedSize(horizontal: false, vertical: true)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(12)
        .background(RoundedRectangle(cornerRadius: 10).fill(Color.white.opacity(0.05)))
        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.white.opacity(0.12)))
    }

    private var battleButton: some View {
        Button {
            showBattle = true
        } label: {
            HStack {
                Text(realm.bossEmoji)
                Text(store.conquered.contains(realm.id)
                     ? "Rematch: \(realm.bossName)"
                     : "BOSS BATTLE: \(realm.bossName)")
                    .font(.system(.body, design: .monospaced)).bold()
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 12)
        }
        .buttonStyle(.borderedProminent)
        .tint(store.conquered.contains(realm.id) ? .green : .orange)
        .padding(.top, 8)
    }
}
