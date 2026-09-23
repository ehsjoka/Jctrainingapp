import SwiftUI

struct ExerciseLibraryView: View {
    @State private var searchText = ""

    private let exercises = [
        ExerciseLibraryItem("Ab Wheel", "Core"),
        ExerciseLibraryItem("Arnold Press", "Axlar"),
        ExerciseLibraryItem("Bench Press", "Bröst"),
        ExerciseLibraryItem("Bent Over Row", "Rygg"),
        ExerciseLibraryItem("Lat Pulldown", "Rygg"),
        ExerciseLibraryItem("Lateral Raise", "Axlar"),
        ExerciseLibraryItem("Overhead Press", "Axlar"),
        ExerciseLibraryItem("Reverse Fly", "Axlar"),
        ExerciseLibraryItem("Triceps Pushdown", "Triceps")
    ]

    var filtered: [ExerciseLibraryItem] {
        guard !searchText.isEmpty else { return exercises }
        return exercises.filter {
            $0.name.localizedCaseInsensitiveContains(searchText) ||
            $0.group.localizedCaseInsensitiveContains(searchText)
        }
    }

    var body: some View {
        NavigationStack {
            List(filtered) { exercise in
                HStack {
                    VStack(alignment: .leading) {
                        Text(exercise.name)
                        Text(exercise.group)
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                    Spacer()
                    Image(systemName: "chevron.right")
                        .font(.caption)
                        .foregroundStyle(.tertiary)
                }
            }
            .navigationTitle("Övningar")
            .searchable(text: $searchText, prompt: "Sök övning")
        }
    }
}

struct ExerciseLibraryItem: Identifiable {
    let id = UUID()
    let name: String
    let group: String

    init(_ name: String, _ group: String) {
        self.name = name
        self.group = group
    }
}
