import SwiftUI
import SwiftData

struct HomeView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \WorkoutTemplate.createdAt) private var templates: [WorkoutTemplate]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    Text("STARTA TRÄNING")
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(.secondary)

                    NavigationLink {
                        WorkoutView(template: nil)
                    } label: {
                        Label("Starta tomt pass", systemImage: "plus")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(.blue, in: RoundedRectangle(cornerRadius: 14))
                            .foregroundStyle(.white)
                    }

                    HStack {
                        Text("Mina templates")
                            .font(.title3.bold())
                        Spacer()
                        Button {
                            addTemplate()
                        } label: {
                            Image(systemName: "plus.circle.fill")
                        }
                    }

                    LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                        ForEach(templates) { template in
                            NavigationLink {
                                WorkoutView(template: template)
                            } label: {
                                VStack(alignment: .leading, spacing: 8) {
                                    Text(template.name)
                                        .font(.headline)
                                        .foregroundStyle(.primary)
                                    Text("\(template.exercises.count) övningar")
                                        .font(.subheadline)
                                        .foregroundStyle(.secondary)
                                    Spacer(minLength: 6)
                                    Text("Starta")
                                        .font(.caption.bold())
                                        .foregroundStyle(.blue)
                                }
                                .frame(maxWidth: .infinity, minHeight: 110, alignment: .topLeading)
                                .padding()
                                .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 16))
                            }
                        }
                    }
                }
                .padding()
            }
            .navigationTitle("JC Training")
            .task {
                SeedData.installIfNeeded(in: modelContext, templateCount: templates.count)
            }
        }
    }

    private func addTemplate() {
        let template = WorkoutTemplate(name: "Ny template")
        modelContext.insert(template)
        try? modelContext.save()
    }
}
