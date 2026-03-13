//
//  WorkoutListView.swift
//  Progress Pulse Watch App
//

import SwiftUI

// MARK: - WorkoutListView

struct WorkoutListView: View {
    var onFinish: () -> Void = {}

    @State private var workouts: [Workout] = []
    @State private var isLoading = true

    var body: some View {
        ZStack {
            Color.ppBackground.ignoresSafeArea()

            if isLoading {
                ProgressView()
                    .tint(Color.ppAccent)

            } else if workouts.isEmpty {
                Text("Aucune séance disponible")
                    .font(.footnote)
                    .foregroundStyle(Color.ppTextSecondary)
                    .multilineTextAlignment(.center)
                    .padding()

            } else {
                List(workouts) { workout in
                    NavigationLink(value: workout) {
                        WorkoutRowView(workout: workout)
                    }
                    .listRowBackground(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(Color.ppCardBackground)
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .strokeBorder(Color.ppAccentBorder, lineWidth: 1)
                            )
                            .padding(.vertical, 2)
                    )
                    .listRowInsets(EdgeInsets(top: 4, leading: 8, bottom: 4, trailing: 8))
                }
                .listStyle(.plain)
                .scrollContentBackground(.hidden)
                .navigationDestination(for: Workout.self) { workout in
                    ExerciseListView(workout: workout, onFinish: onFinish)
                }
            }
        }
        .navigationTitle("Séances")
        .onAppear { loadMockData() }
    }

    private func loadMockData() {
        guard isLoading else { return }
        Task {
            try? await Task.sleep(for: .milliseconds(600))
            workouts = MockDataService.shared.workouts
            isLoading = false
        }
    }
}

// MARK: - WorkoutRowView

struct WorkoutRowView: View {
    let workout: Workout

    var body: some View {
        HStack(spacing: 10) {
            VStack(alignment: .leading, spacing: 3) {
                Text(workout.name)
                    .font(.footnote)
                    .fontWeight(.semibold)
                    .foregroundStyle(Color.ppTextPrimary)
                    .lineLimit(1)

                Text("\(workout.exercises.count) exercices")
                    .font(.caption2)
                    .foregroundStyle(Color.ppTextSecondary)
            }

            Spacer()
        }
        .padding(.vertical, 6)
        .frame(minHeight: 44)
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        WorkoutListView()
    }
}
