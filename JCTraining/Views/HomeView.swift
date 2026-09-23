import SwiftUI
import SwiftData

struct HomeView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \WorkoutTemplate.createdAt) private var templates: [WorkoutTemplate]

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    NavigationLink {
                        WorkoutView(template: nil)
                    } label: {
                        HStack {
                            Image(systemName: "plus")
                            Text("Starta tomt pass")
                                .fontWeight(.semibold)
                            Spacer()
                        }
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
                                .font(.title3)
                        }
                    }

                    LazyVGrid(
                        columns: [GridItem(.flexible()), GridItem(.flexible())],
                        spacing: 12
                    ) {
                        ForEach(templates) { template in
                            TemplateCard(
                                template: template,
                                onDelete: { deleteTemplate(template) }
                            )
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

    private func deleteTemplate(_ template: WorkoutTemplate) {
        modelContext.delete(template)
        try? modelContext.save()
    }
}

private struct TemplateCard: View {
    let template: WorkoutTemplate
    let onDelete: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .top) {
                NavigationLink {
                    WorkoutView(template: template)
                } label: {
                    VStack(alignment: .leading, spacing: 7) {
                        Text(template.name)
                            .font(.headline)
                            .foregroundStyle(.primary)
                            .multilineTextAlignment(.leading)

                        Text("\(template.exercises.count) övningar")
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }

                Menu {
                    NavigationLink {
                        TemplateEditorView(template: template)
                    } label: {
                        Label("Ändra template", systemImage: "pencil")
                    }

                    Button(role: .destructive, action: onDelete) {
                        Label("Ta bort", systemImage: "trash")
                    }
                } label: {
                    Image(systemName: "ellipsis")
                        .foregroundStyle(.secondary)
                        .padding(4)
                }
            }

            Spacer(minLength: 4)

            NavigationLink {
                WorkoutView(template: template)
            } label: {
                Text("Starta")
                    .font(.caption.bold())
                    .foregroundStyle(.blue)
            }
        }
        .frame(maxWidth: .infinity, minHeight: 118, alignment: .topLeading)
        .padding()
        .background(.thinMaterial, in: RoundedRectangle(cornerRadius: 16))
    }
}
