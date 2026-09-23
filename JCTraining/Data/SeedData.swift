import Foundation
import SwiftData

enum SeedData {
    static func installIfNeeded(in context: ModelContext, templateCount: Int) {
        guard templateCount == 0 else { return }

        let template = WorkoutTemplate(name: "Axlar & Mage")
        let exercises = [
            TemplateExercise(exerciseID: "overhead-press", name: "Overhead Press", order: 0, defaultSets: 3, defaultWeight: 35, defaultReps: 10, restSeconds: 120),
            TemplateExercise(exerciseID: "lateral-raise", name: "Lateral Raise", order: 1, defaultSets: 3, defaultWeight: 8, defaultReps: 12, restSeconds: 60),
            TemplateExercise(exerciseID: "reverse-fly", name: "Reverse Fly", order: 2, defaultSets: 3, defaultWeight: 8, defaultReps: 12, restSeconds: 60),
            TemplateExercise(exerciseID: "ab-wheel", name: "Ab Wheel", order: 3, defaultSets: 3, defaultWeight: 0, defaultReps: 10, restSeconds: 60)
        ]
        exercises.forEach {
            $0.template = template
            template.exercises.append($0)
        }
        context.insert(template)
        try? context.save()
    }
}
