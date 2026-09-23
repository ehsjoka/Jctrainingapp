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
        ScrollView {
            VStack(spacing: 14) {
                workoutHeader

                ForEach($items) { $item in
                    ExerciseWorkoutCard(
                        item: $item,
                        onSetCompleted: { seconds in
                            restUntil = Date().addingTimeInterval(TimeInterval(seconds))
                        }
                    )
                }

                if items.isEmpty {
                    ContentUnavailableView(
                        "Inga övningar",
                        systemImage: "dumbbell",
                        description: Text("Lägg till övningar i templaten innan du startar passet.")
                    )
                    .padding(.top, 60)
                }

                if let restUntil {
                    RestTimerCard(restUntil: restUntil) {
                        self.restUntil = nil
                    }
                }
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle("Träning")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Avsluta") {
                    saveWorkout()
                    dismiss()
                }
                .fontWeight(.semibold)
            }
        }
        .onAppear { makeDraft() }
    }

    private var workoutHeader: some View {
        HStack {
            VStack(alignment: .leading, spacing: 3) {
                Text(template?.name ?? "Tomt pass")
                    .font(.title2.bold())
                Text("\(items.count) övningar")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            TimelineView(.periodic(from: .now, by: 1)) { context in
                Text(durationString(from: startedAt, to: context.date))
                    .font(.headline.monospacedDigit())
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.horizontal, 2)
    }

    private func makeDraft() {
        guard items.isEmpty else { return }
        let source = (template?.exercises ?? []).sorted { $0.order < $1.order }

        items = source.map { exercise in
            WorkoutDraftExercise(
                exerciseID: exercise.exerciseID,
                name: exercise.name,
                restSeconds: exercise.restSeconds,
                sets: (1...max(1, exercise.defaultSets)).map {
                    WorkoutDraftSet(
                        number: $0,
                        weight: exercise.defaultWeight,
                        reps: exercise.defaultReps,
                        previousDisplay: "–",
                        completed: false
                    )
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
                .sorted {
                    ($0.session?.completedAt ?? .distantPast) >
                    ($1.session?.completedAt ?? .distantPast)
                }
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
        let session = WorkoutSession(
            name: template?.name ?? "Tomt pass",
            startedAt: startedAt
        )
        session.completedAt = .now

        for (exerciseOrder, item) in items.enumerated() {
            let exercise = WorkoutExercise(
                exerciseID: item.exerciseID,
                name: item.name,
                order: exerciseOrder
            )
            exercise.session = session

            for draft in item.sets {
                let set = WorkoutSet(
                    setNumber: draft.number,
                    weight: draft.weight,
                    reps: draft.reps,
                    restSeconds: item.restSeconds
                )
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

private struct ExerciseWorkoutCard: View {
    @Binding var item: WorkoutDraftExercise
    let onSetCompleted: (Int) -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(item.name)
                .font(.headline)

            HStack(spacing: 8) {
                header("SET", width: 34)
                header("FÖRRA", alignment: .leading)
                header("KG", width: 68)
                header("REPS", width: 56)
                Image(systemName: "checkmark")
                    .font(.caption.bold())
                    .foregroundStyle(.secondary)
                    .frame(width: 30)
            }

            ForEach($item.sets) { $set in
                HStack(spacing: 8) {
                    Text("\(set.number)")
                        .font(.subheadline.monospacedDigit())
                        .frame(width: 34)

                    Text(set.previousDisplay)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .frame(maxWidth: .infinity, alignment: .leading)

                    TextField(
                        "0",
                        value: $set.weight,
                        format: .number.precision(.fractionLength(0...1))
                    )
                    .keyboardType(.decimalPad)
                    .multilineTextAlignment(.center)
                    .frame(width: 68)
                    .padding(.vertical, 8)
                    .background(.secondary.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))

                    TextField("0", value: $set.reps, format: .number)
                        .keyboardType(.numberPad)
                        .multilineTextAlignment(.center)
                        .frame(width: 56)
                        .padding(.vertical, 8)
                        .background(.secondary.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))

                    Button {
                        set.completed.toggle()
                        if set.completed {
                            onSetCompleted(item.restSeconds)
                        }
                    } label: {
                        Image(systemName: set.completed ? "checkmark.circle.fill" : "circle")
                            .font(.title3)
                    }
                    .buttonStyle(.plain)
                    .frame(width: 30)
                }
            }

            Button {
                let next = item.sets.count + 1
                item.sets.append(
                    WorkoutDraftSet(
                        number: next,
                        weight: item.sets.last?.weight ?? 0,
                        reps: item.sets.last?.reps ?? 10,
                        previousDisplay: "–",
                        completed: false
                    )
                )
            } label: {
                Label("Lägg till set", systemImage: "plus")
                    .font(.subheadline.weight(.medium))
            }
        }
        .padding(14)
        .background(.background, in: RoundedRectangle(cornerRadius: 16))
    }

    private func header(
        _ text: String,
        width: CGFloat? = nil,
        alignment: Alignment = .center
    ) -> some View {
        Text(text)
            .font(.caption2.bold())
            .foregroundStyle(.secondary)
            .frame(width: width, maxWidth: width == nil ? .infinity : nil, alignment: alignment)
    }
}

private struct RestTimerCard: View {
    let restUntil: Date
    let cancel: () -> Void

    var body: some View {
        TimelineView(.periodic(from: .now, by: 1)) { context in
            let remaining = max(0, Int(restUntil.timeIntervalSince(context.date)))

            HStack {
                Image(systemName: "timer")
                Text("Vila")
                    .fontWeight(.semibold)
                Spacer()
                Text(String(format: "%d:%02d", remaining / 60, remaining % 60))
                    .font(.title3.monospacedDigit())
                Button("Hoppa över", action: cancel)
                    .font(.caption)
            }
            .padding(14)
            .background(.blue.opacity(0.12), in: RoundedRectangle(cornerRadius: 16))
        }
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
