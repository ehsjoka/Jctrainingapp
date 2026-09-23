import SwiftUI
import SwiftData

@main
struct JCTrainingApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            WorkoutTemplate.self,
            TemplateExercise.self,
            WorkoutSession.self,
            WorkoutExercise.self,
            WorkoutSet.self
        ])
        let configuration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)
        do {
            return try ModelContainer(for: schema, configurations: [configuration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(sharedModelContainer)
    }
}
