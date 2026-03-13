//
//  ExerciseListView.swift
//  Progress Pulse Watch App
//

import SwiftUI

// MARK: - ExerciseListView

struct ExerciseListView: View {
    let workout: Workout
    var onFinish: () -> Void = {}

    @State private var completedExerciseIds: Set<String> = []
    @State private var showEndConfirmation = false
    @State private var showRatingSheet = false

    private var groupedExercises: [(muscleGroupe: String, exercises: [WorkoutExercise])] {
        var result: [(muscleGroupe: String, exercises: [WorkoutExercise])] = []
        var indexByGroup: [String: Int] = [:]

        for workoutExercise in workout.exercises {
            let group = workoutExercise.exercise.muscleGroupe
            if let index = indexByGroup[group] {
                result[index].exercises.append(workoutExercise)
            } else {
                indexByGroup[group] = result.count
                result.append((muscleGroupe: group, exercises: [workoutExercise]))
            }
        }
        return result
    }

    var body: some View {
        ZStack {
            Color.ppBackground.ignoresSafeArea()

            if workout.exercises.isEmpty {
                Text("Aucun exercice")
                    .font(.footnote)
                    .foregroundStyle(Color.ppTextSecondary)
                    .multilineTextAlignment(.center)
                    .padding()

            } else {
                List {
                    ForEach(groupedExercises, id: \.muscleGroupe) { group in
                        Section {
                            ForEach(group.exercises, id: \.exercise.id) { workoutExercise in
                                let isCompleted = completedExerciseIds.contains(workoutExercise.exercise.id)
                                NavigationLink(value: workoutExercise) {
                                    ExerciseRowView(workoutExercise: workoutExercise, isCompleted: isCompleted)
                                }
                                .listRowBackground(
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(Color.ppCardBackground)
                                        .overlay(
                                            RoundedRectangle(cornerRadius: 12)
                                                .strokeBorder(
                                                    isCompleted ? Color.ppPrimary : Color.ppAccentBorder,
                                                    lineWidth: isCompleted ? 2 : 1
                                                )
                                        )
                                        .padding(.vertical, 2)
                                )
                                .listRowInsets(EdgeInsets(top: 4, leading: 8, bottom: 4, trailing: 8))
                            }
                        } header: {
                            Text(group.muscleGroupe)
                                .font(.caption2)
                                .fontWeight(.semibold)
                                .foregroundStyle(Color.ppAccent)
                                .textCase(nil)
                        }
                    }
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                .navigationDestination(for: WorkoutExercise.self) { workoutExercise in
                    ExerciseDetailView(workoutExercise: workoutExercise, onComplete: {
                        completedExerciseIds.insert(workoutExercise.exercise.id)
                    })
                }
                .overlay(alignment: .bottomTrailing) {
                    Button(action: { showEndConfirmation = true }) {
                        Image(systemName: "flag.checkered")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundStyle(Color.ppBackground)
                            .frame(width: 32, height: 32)
                            .background(Color.ppPrimary, in: Circle())
                    }
                    .buttonStyle(.plain)
                    .padding(.trailing, 6)
                    .padding(.bottom, 6)
                }
                .alert("Terminer la séance ?", isPresented: $showEndConfirmation) {
                    Button("Terminer", role: .destructive) { showRatingSheet = true }
                    Button("Annuler", role: .cancel) {}
                } message: {
                    Text("La séance sera enregistrée.")
                }
                .sheet(isPresented: $showRatingSheet) {
                    SessionRatingView(onFinish: onFinish)
                }
            }
        }
        .navigationTitle(workout.name)
    }
}

// MARK: - ExerciseRowView

struct ExerciseRowView: View {
    let workoutExercise: WorkoutExercise
    var isCompleted: Bool = false

    var body: some View {
        HStack(spacing: 10) {
            // Placeholder GIF — remplacer par Image quand les GIFs seront importés
            RoundedRectangle(cornerRadius: 6)
                .fill(Color.white)
                .frame(width: 40, height: 40)

            Text(workoutExercise.exercise.name)
                .font(.footnote)
                .fontWeight(.semibold)
                .foregroundStyle(Color.ppTextPrimary)
                .lineLimit(2)

            Spacer()

            if isCompleted {
                Image(systemName: "checkmark.circle.fill")
                    .font(.system(size: 18, weight: .bold))
                    .foregroundStyle(Color.ppPrimary)
            }
        }
        .padding(.vertical, 6)
        .frame(minHeight: 44)
    }
}

// MARK: - SessionRatingView

struct SessionRatingView: View {
    var onFinish: () -> Void = {}

    @State private var rating: Int = 0
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        ZStack {
            Color.ppBackground.ignoresSafeArea()

            VStack(spacing: 14) {
                Text("Note ta séance")
                    .font(.footnote)
                    .fontWeight(.semibold)
                    .foregroundStyle(Color.ppTextPrimary)

                HStack(spacing: 6) {
                    ForEach(1...5, id: \.self) { star in
                        Button(action: { rating = star }) {
                            Image(systemName: star <= rating ? "star.fill" : "star")
                                .font(.system(size: 20))
                                .foregroundStyle(star <= rating ? Color.ppAccent : Color.ppTextSecondary)
                        }
                        .buttonStyle(.plain)
                    }
                }

                Button(action: {
                    // TODO: enregistrer la séance
                    dismiss()
                    onFinish()
                }) {
                    Text("Enregistrer")
                        .font(.footnote)
                        .fontWeight(.semibold)
                        .foregroundStyle(Color.ppBackground)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(
                            rating > 0 ? Color.ppPrimary : Color.ppTextSecondary,
                            in: Capsule()
                        )
                }
                .buttonStyle(.plain)
                .disabled(rating == 0)
            }
            .padding(.horizontal, 12)
        }
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        ExerciseListView(workout: MockDataService.shared.workouts[1])
    }
}
