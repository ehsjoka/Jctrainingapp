import Foundation
import SwiftData

@Model
final class WorkoutTemplate {
    @Attribute(.unique) var id: UUID
    var name: String
    var createdAt: Date
    @Relationship(deleteRule: .cascade, inverse: \TemplateExercise.template)
    var exercises: [TemplateExercise]

    init(name: String) {
        self.id = UUID()
        self.name = name
        self.createdAt = .now
        self.exercises = []
    }
}

@Model
final class TemplateExercise {
    @Attribute(.unique) var id: UUID
    var exerciseID: String
    var name: String
    var order: Int
    var defaultSets: Int
    var defaultWeight: Double
    var defaultReps: Int
    var restSeconds: Int
    var template: WorkoutTemplate?

    init(exerciseID: String, name: String, order: Int, defaultSets: Int = 3,
         defaultWeight: Double = 0, defaultReps: Int = 10, restSeconds: Int = 90) {
        self.id = UUID()
        self.exerciseID = exerciseID
        self.name = name
        self.order = order
        self.defaultSets = defaultSets
        self.defaultWeight = defaultWeight
        self.defaultReps = defaultReps
        self.restSeconds = restSeconds
    }
}

@Model
final class WorkoutSession {
    @Attribute(.unique) var id: UUID
    var name: String
    var startedAt: Date
    var completedAt: Date?
    @Relationship(deleteRule: .cascade, inverse: \WorkoutExercise.session)
    var exercises: [WorkoutExercise]

    init(name: String, startedAt: Date = .now) {
        self.id = UUID()
        self.name = name
        self.startedAt = startedAt
        self.completedAt = nil
        self.exercises = []
    }
}

@Model
final class WorkoutExercise {
    @Attribute(.unique) var id: UUID
    var exerciseID: String
    var name: String
    var order: Int
    var session: WorkoutSession?
    @Relationship(deleteRule: .cascade, inverse: \WorkoutSet.exercise)
    var sets: [WorkoutSet]

    init(exerciseID: String, name: String, order: Int) {
        self.id = UUID()
        self.exerciseID = exerciseID
        self.name = name
        self.order = order
        self.sets = []
    }
}

@Model
final class WorkoutSet {
    @Attribute(.unique) var id: UUID
    var setNumber: Int
    var weight: Double
    var reps: Int
    var completed: Bool
    var completedAt: Date?
    var restSeconds: Int
    var exercise: WorkoutExercise?

    init(setNumber: Int, weight: Double, reps: Int, restSeconds: Int) {
        self.id = UUID()
        self.setNumber = setNumber
        self.weight = weight
        self.reps = reps
        self.completed = false
        self.completedAt = nil
        self.restSeconds = restSeconds
    }
}
