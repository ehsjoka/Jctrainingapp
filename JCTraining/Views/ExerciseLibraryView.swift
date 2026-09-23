import SwiftUI

struct ExerciseLibraryView: View {
    @State private var searchText = ""

    private var filtered: [ExerciseCatalogItem] {
        guard !searchText.isEmpty else { return ExerciseCatalog.all }
        return ExerciseCatalog.all.filter {
            $0.name.localizedCaseInsensitiveContains(searchText) ||
            $0.group.localizedCaseInsensitiveContains(searchText) ||
            $0.equipment.localizedCaseInsensitiveContains(searchText)
        }
    }

    var body: some View {
        NavigationStack {
            List(filtered) { exercise in
                VStack(alignment: .leading, spacing: 3) {
                    Text(exercise.name)
                    Text("\(exercise.group) · \(exercise.equipment)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            .navigationTitle("Övningar")
            .searchable(text: $searchText, prompt: "Sök övning")
        }
    }
}
