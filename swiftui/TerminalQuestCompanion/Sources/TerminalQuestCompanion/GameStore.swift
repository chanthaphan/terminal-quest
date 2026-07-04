import SwiftUI

@MainActor
final class GameStore: ObservableObject {
    @AppStorage("tq.xp") var xp: Int = 0
    @AppStorage("tq.conquered") private var conqueredCSV: String = ""

    var conquered: Set<String> {
        Set(conqueredCSV.split(separator: ",").map(String.init))
    }

    func award(_ amount: Int) {
        xp += amount
        objectWillChange.send()
    }

    func conquer(_ realmID: String) {
        var set = conquered
        guard !set.contains(realmID) else { return }
        set.insert(realmID)
        conqueredCSV = set.sorted().joined(separator: ",")
        objectWillChange.send()
    }

    func reset() {
        xp = 0
        conqueredCSV = ""
        objectWillChange.send()
    }

    var levelIndex: Int {
        var idx = 0
        for (i, lvl) in Curriculum.levelTitles.enumerated() where xp >= lvl.xp { idx = i }
        return idx
    }

    var levelTitle: String { Curriculum.levelTitles[levelIndex].title }

    var levelProgress: Double {
        let cur = Curriculum.levelTitles[levelIndex]
        guard levelIndex + 1 < Curriculum.levelTitles.count else { return 1 }
        let next = Curriculum.levelTitles[levelIndex + 1]
        return Double(xp - cur.xp) / Double(next.xp - cur.xp)
    }
}
