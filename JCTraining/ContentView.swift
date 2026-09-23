import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem { Label("Träna", systemImage: "dumbbell.fill") }

            ExerciseLibraryView()
                .tabItem { Label("Övningar", systemImage: "list.bullet") }

            Text("Historik kommer i nästa steg")
                .tabItem { Label("Historik", systemImage: "calendar") }
        }
        .preferredColorScheme(.dark)
        .tint(.blue)
    }
}
