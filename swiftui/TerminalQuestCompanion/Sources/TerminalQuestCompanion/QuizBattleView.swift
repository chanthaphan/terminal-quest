import SwiftUI

struct QuizBattleView: View {
    let realm: RealmData
    @EnvironmentObject var store: GameStore
    @Environment(\.dismiss) private var dismiss

    @State private var index = 0
    @State private var hearts = 3
    @State private var feedback: String?
    @State private var feedbackIsGood = false
    @State private var answered = false
    @State private var won = false
    @State private var bossShake = false
    @State private var heroFlash = false

    private var question: QuizQuestion? {
        index < realm.quiz.count ? realm.quiz[index] : nil
    }

    private var bossHP: Double {
        Double(realm.quiz.count - index) / Double(realm.quiz.count)
    }

    var body: some View {
        VStack(spacing: 16) {
            battleScene
            if won {
                victory
            } else if let q = question {
                questionCard(q)
            }
            Spacer(minLength: 0)
        }
        .padding(20)
        .frame(minWidth: 560, minHeight: 540)
        .background(
            LinearGradient(colors: [Color(red: 0.06, green: 0.09, blue: 0.2), Color(red: 0.12, green: 0.07, blue: 0.1)],
                           startPoint: .top, endPoint: .bottom)
        )
    }

    private var battleScene: some View {
        VStack(spacing: 10) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(realm.bossName.uppercased())
                        .font(.system(.caption, design: .monospaced)).bold()
                    ProgressView(value: bossHP).tint(.red).frame(width: 180)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 4) {
                    Text("HERO").font(.system(.caption, design: .monospaced)).bold()
                    Text(String(repeating: "❤️", count: hearts) + String(repeating: "🖤", count: 3 - hearts))
                        .font(.caption)
                }
            }
            HStack {
                Text(realm.bossEmoji)
                    .font(.system(size: 72))
                    .opacity(won ? 0.15 : 1)
                    .offset(x: bossShake ? -8 : 0)
                    .animation(.spring(response: 0.15, dampingFraction: 0.2), value: bossShake)
                Spacer()
                Text("🧙")
                    .font(.system(size: 56))
                    .opacity(heroFlash ? 0.3 : 1)
                    .animation(.easeInOut(duration: 0.15), value: heroFlash)
            }
            .padding(.horizontal, 24)
            if let feedback {
                Text(feedback)
                    .font(.system(.caption, design: .monospaced))
                    .foregroundStyle(feedbackIsGood ? .green : .red)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(10)
                    .background(RoundedRectangle(cornerRadius: 8).fill(Color.black.opacity(0.4)))
            }
        }
        .padding(14)
        .background(RoundedRectangle(cornerRadius: 12).fill(Color.black.opacity(0.35)))
        .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.white.opacity(0.2)))
    }

    private func questionCard(_ q: QuizQuestion) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("QUESTION \(index + 1) OF \(realm.quiz.count)")
                .font(.system(.caption2, design: .monospaced))
                .foregroundStyle(.orange)
                .kerning(2)
            Text(q.question)
                .font(.system(.body, design: .monospaced)).bold()
                .fixedSize(horizontal: false, vertical: true)
            ForEach(Array(q.choices.enumerated()), id: \.offset) { i, choice in
                Button {
                    answer(i, for: q)
                } label: {
                    Text(choice)
                        .font(.system(.callout, design: .monospaced))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(10)
                        .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .background(RoundedRectangle(cornerRadius: 8).fill(Color.white.opacity(0.06)))
                .overlay(RoundedRectangle(cornerRadius: 8).stroke(Color.white.opacity(0.15)))
                .disabled(answered)
            }
        }
        .padding(14)
        .background(RoundedRectangle(cornerRadius: 12).fill(Color.white.opacity(0.04)))
    }

    private var victory: some View {
        VStack(spacing: 12) {
            Text("🏆 VICTORY!")
                .font(.system(.title, design: .monospaced)).bold()
                .foregroundStyle(.yellow)
            Text("\(realm.bossName) dissolves into well-behaved processes.")
                .font(.system(.callout, design: .monospaced))
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
            Button("Return to the Realm Map") { dismiss() }
                .buttonStyle(.borderedProminent)
                .tint(.green)
        }
        .padding(.top, 10)
    }

    private func answer(_ i: Int, for q: QuizQuestion) {
        guard !answered else { return }
        if i == q.answer {
            answered = true
            feedbackIsGood = true
            feedback = "⚔️ A mighty blow! " + q.explain
            bossShake = true
            store.award(10)
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.9) {
                bossShake = false
                index += 1
                answered = false
                if index >= realm.quiz.count {
                    won = true
                    feedback = nil
                    store.award(40)
                    store.conquer(realm.id)
                }
            }
        } else {
            feedbackIsGood = false
            hearts -= 1
            heroFlash = true
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) { heroFlash = false }
            if hearts <= 0 {
                feedback = "☠️ You have fallen... the battle restarts!"
                hearts = 3
                index = 0
            } else {
                feedback = "💥 \(realm.bossName) counterattacks! Try another answer."
            }
        }
    }
}
