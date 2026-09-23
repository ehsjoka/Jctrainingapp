import SwiftUI
import SwiftData

struct WorkoutView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    let template: WorkoutTemplate?

    @State private var startedAt = Date()
    @State private var items: [WorkoutDraftExercise] = []
    @State private var restUntil: Date?

    var body: some View {
        List {
            Section {
                HStack {
                    Text(template?.name ?? "Tomt pass")
                        .font(.title2.bold())
                    Spacer()
                    TimelineView(.periodic(from: .now, by: 1)) { context in
                        Text(durationString(from: startedAt, to: context.date))
                            .monospacedDigit()
                            .foregroundStyle(.secondary)
                    }
                }
            }

            ForEach($items) { $item in
                Section {
                    VStack(alignment: .leading, spacing: 10) {
                        Text(item.name).font(.headline)

                        HStack {
                            Text("SET").frame(width: 34)
                            Text("FÖRRA").frame(maxWidth: .infinity, alignment: .leading)
                            Text("KG").frame(width: 70)
                            Text("REPS").frame(width: 58)
                            Image(systemName: "checkmark").frame(width: 32)
                        }
                        .font(.caption.bold())
                        .foregroundStyle(.secondary)

                        ForEach($item.sets) { $set in
                            HStack {
                                Text("\(set.number)")
                                    .frame(width: 34)

                                Text(set.previousDisplay)
                                    .frame(maxWidth: .infinity, alignment: .leading)
                                    .foregroundStyle(.secondary)

                                TextField("0", value: $set.weight, format: .number.precision(.fractionLength(0...1)))
                                    .keyboardType(.decimalPad)
                                    .multilineTextAlignment(.center)
                                    .frame(width: 70)
                                    .textFieldStyle(.roundedBorder)

                                TextField("0", value: $set.reps, format: .number)
                                    .keyboardType(.numberPad)
                                    .multilineTextAlignment(.center)
                                    .frame(width: 58)
                                    .textFieldStyle(.roundedBorder)

                                Button {
                                    set.completed.toggle()
                                    if set.completed {
                                        restUntil = Date().addingTimeInterval(TimeInterval(item.restSeconds))
                                    }
                                } label: {
                                    Image(systemName: set.completed ? "checkmark.circle.fill" : "circle")
                                        .font(.title3)
                                }
                                .buttonStyle(.plain)
                                .frame(width: 32)
                            }
                        }

                        Button("Lägg till set") {
                            let n = item.sets.count + 1
                            item.sets.append(.init(number: n, weight: item.sets.last?.weight ?? 0,
                                                   reps: item.sets.last?.reps ?? 10,
                                                   previousDisplay: "–", completed: false))
                        }
                        .font(.subheadline)
                    }
                    .padding(.vertical, 4)
                }
            }

            if let restUntil {
                Section("Vilotimer") {
                    TimelineView(.periodic(from: .now, by: 1)) { context in
                        let remaining = max(0, Int(restUntil.timeIntervalSince(context.date)))
                        HStack {
                            Image(systemName: "timer")
                            Text(String(format: "%d:%02d", remaining / 60, remaining % 60))
                                .font(.title3.monospacedDigit())
                        }
                    }
                }
            }
        }
        .navigationTitle("Träning")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Avsluta") {
                    saveWorkout()
                    dismiss()
                }
            }
        }
        .onAppear { makeDraft() }
    }

    private func makeDraft() {
        guard items.isEmpty else { return }
        let source = (template?.exercises ?? []).sorted { $0.order < $1.order }
        items = source.map { exercise in
            WorkoutDraftExercise(
                exerciseID: exercise.exerciseID,
                name: exercise.name,
                restSeconds: exercise.restSeconds,
                sets: (1...exercise.defaultSets).map {
                    WorkoutDraftSet(number: $0,
                                    weight: exercise.defaultWeight,
                                    reps: exercise.defaultReps,
                                    previousDisplay: "–",
                                    completed: false)
                }
            )
        }
        loadPreviousValues()
    }

    private func loadPreviousValues() {
        for itemIndex in items.indices {
            let exerciseID = items[itemIndex].exerciseID
            let descriptor = FetchDescriptor<WorkoutExercise>(
                predicate: #Predicate { $0.exerciseID == exerciseID }
            )
            guard let matches = try? modelContext.fetch(descriptor) else { continue }

            let previous = matches
                .filter { $0.session?.completedAt != nil }
                .sorted { ($0.session?.completedAt ?? .distantPast) > ($1.session?.completedAt ?? .distantPast) }
                .first

            let oldSets = (previous?.sets ?? []).sorted { $0.setNumber < $1.setNumber }
            for setIndex in items[itemIndex].sets.indices where setIndex < oldSets.count {
                let old = oldSets[setIndex]
                items[itemIndex].sets[setIndex].previousDisplay =
                    "\(old.weight.formatted(.number.precision(.fractionLength(0...1)))) × \(old.reps)"
            }
        }
    }

    private func saveWorkout() {
        let session = WorkoutSession(name: template?.name ?? "Tomt pass", startedAt: startedAt)
        session.completedAt = .now

        for (exerciseOrder, item) in items.enumerated() {
            let exercise = WorkoutExercise(exerciseID: item.exerciseID, name: item.name, order: exerciseOrder)
            exercise.session = session

            for draft in item.sets {
                let set = WorkoutSet(setNumber: draft.number, weight: draft.weight,
                                     reps: draft.reps, restSeconds: item.restSeconds)
                set.completed = draft.completed
                set.completedAt = draft.completed ? .now : nil
                set.exercise = exercise
                exercise.sets.append(set)
            }
            session.exercises.append(exercise)
        }

        modelContext.insert(session)
        try? modelContext.save()
    }

    private func durationString(from start: Date, to end: Date) -> String {
        let seconds = max(0, Int(end.timeIntervalSince(start)))
        return String(format: "%02d:%02d", seconds / 60, seconds % 60)
    }
}

struct WorkoutDraftExercise: Identifiable {
    let id = UUID()
    var exerciseID: String
    var name: String
    var restSeconds: Int
    var sets: [WorkoutDraftSet]
}

struct WorkoutDraftSet: Identifiable {
    let id = UUID()
    var number: Int
    var weight: Double
    var reps: Int
    var previousDisplay: String
    var completed: Bool
}
