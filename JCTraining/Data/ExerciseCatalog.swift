import Foundation

struct ExerciseCatalogItem: Identifiable, Hashable {
    let id: String
    let name: String
    let group: String
    let equipment: String

    init(_ id: String, _ name: String, _ group: String, _ equipment: String) {
        self.id = id
        self.name = name
        self.group = group
        self.equipment = equipment
    }
}

enum ExerciseCatalog {
    static let all: [ExerciseCatalogItem] = [
        .init("ab-wheel", "Ab Wheel", "Core", "Ab wheel"),
        .init("arnold-press", "Arnold Press", "Axlar", "Hantlar"),
        .init("back-extension", "Back Extension", "Rygg", "Kroppsvikt"),
        .init("bench-press", "Bench Press", "Bröst", "Skivstång"),
        .init("bent-over-row", "Bent Over Row", "Rygg", "Skivstång"),
        .init("biceps-curl", "Biceps Curl", "Biceps", "Hantlar"),
        .init("cable-row", "Cable Row", "Rygg", "Kabel"),
        .init("chest-press", "Chest Press", "Bröst", "Maskin"),
        .init("face-pull", "Face Pull", "Axlar", "Kabel"),
        .init("hanging-leg-raise", "Hanging Leg Raise", "Core", "Kroppsvikt"),
        .init("lat-pulldown", "Lat Pulldown", "Rygg", "Kabel"),
        .init("lateral-raise", "Lateral Raise", "Axlar", "Hantlar"),
        .init("overhead-press", "Overhead Press", "Axlar", "Skivstång"),
        .init("reverse-fly", "Reverse Fly", "Axlar", "Hantlar"),
        .init("triceps-pushdown", "Triceps Pushdown", "Triceps", "Kabel")
    ]
}
