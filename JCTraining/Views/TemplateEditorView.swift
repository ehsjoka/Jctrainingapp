import SwiftUI
import SwiftData

struct TemplateEditorView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss

    @Bindable var template: WorkoutTemplate
    @State private var showingExercisePicker = false

    var sortedExercises: [TemplateExercise] {
        template.exercises.sorted { $0.order < $1.order }
    }

    var body: some View {
        Form {
            Section("Template") {
                TextField("Namn", text: $template.name)
            }

            Section {
                ForEach(sortedExercises) { exercise in
                    TemplateExerciseEditorRow(exercise: exercise)
                }
                .onDelete(perform: deleteExercises)
                .onMove(perform: moveExercises)

                Button {
                    showingExercisePicker = true
                } label: {
                    Label("Lägg till övning", systemImage: "plus.circle.fill")
                }
            } header: {
                Text("Övningar")
            } footer: {
                Text("Svep åt vänster för att ta bort. Tryck på Ändra för att flytta övningar.")
            }
        }
        .navigationTitle(template.name)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                EditButton()
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button("Klar") {
                    normalizeOrder()
                    try? modelContext.save()
                    dismiss()
                }
            }
        }
        .sheet(isPresented: $showingExercisePicker) {
            ExercisePickerView { item in
                addExercise(item)
            }
        }
    }

    private func addExercise(_ item: ExerciseCatalogItem) {
        let nextOrder = (template.exercises.map(\.order).max() ?? -1) + 1
        let exercise = TemplateExercise(
            exerciseID: item.id,
            name: item.name,
            order: nextOrder,
            defaultSets: 3,
            defaultWeight: 0,
            defaultReps: 10,
            restSeconds: 90
        )
        exercise.template = template
        template.exercises.append(exercise)
        try? modelContext.save()
    }

    private func deleteExercises(at offsets: IndexSet) {
        let current = sortedExercises
        for index in offsets {
            let exercise = current[index]
            template.exercises.removeAll { $0.id == exercise.id }
            modelContext.delete(exercise)
        }
        normalizeOrder()
        try? modelContext.save()
    }

    private func moveExercises(from source: IndexSet, to destination: Int) {
        var current = sortedExercises
        current.move(fromOffsets: source, toOffset: destination)
        for (index, exercise) in current.enumerated() {
            exercise.order = index
        }
        try? modelContext.save()
    }

    private func normalizeOrder() {
        for (index, exercise) in sortedExercises.enumerated() {
            exercise.order = index
        }
    }
}

private struct TemplateExerciseEditorRow: View {
    @Bindable var exercise: TemplateExercise

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(exercise.name)
                .font(.headline)

            HStack(spacing: 10) {
                IntEditorField(label: "Set", value: $exercise.defaultSets)
                DoubleEditorField(label: "Kg", value: $exercise.defaultWeight)
                IntEditorField(label: "Reps", value: $exercise.defaultReps)
                IntEditorField(label: "Vila", value: $exercise.restSeconds, suffix: "s")
            }
        }
        .padding(.vertical, 4)
    }
}

private struct IntEditorField: View {
    let label: String
    @Binding var value: Int
    var suffix: String = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.caption2)
                .foregroundStyle(.secondary)

            HStack(spacing: 2) {
                TextField("0", value: $value, format: .number)
                    .keyboardType(.numberPad)
                    .multilineTextAlignment(.center)
                if !suffix.isEmpty {
                    Text(suffix)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            .frame(minWidth: 54)
            .padding(.horizontal, 8)
            .padding(.vertical, 7)
            .background(.secondary.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))
        }
    }
}

private struct DoubleEditorField: View {
    let label: String
    @Binding var value: Double

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(label)
                .font(.caption2)
                .foregroundStyle(.secondary)

            TextField("0", value: $value, format: .number.precision(.fractionLength(0...1)))
                .keyboardType(.decimalPad)
                .multilineTextAlignment(.center)
                .frame(minWidth: 54)
                .padding(.horizontal, 8)
                .padding(.vertical, 7)
                .background(.secondary.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))
        }
    }
}

private struct ExercisePickerView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var searchText = ""
    let onSelect: (ExerciseCatalogItem) -> Void

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
            List(filtered) { item in
                Button {
                    onSelect(item)
                    dismiss()
                } label: {
                    VStack(alignment: .leading, spacing: 3) {
                        Text(item.name)
                            .foregroundStyle(.primary)
                        Text("\(item.group) · \(item.equipment)")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }
            .navigationTitle("Lägg till övning")
            .searchable(text: $searchText, prompt: "Sök")
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Stäng") { dismiss() }
                }
            }
        }
    }
}
