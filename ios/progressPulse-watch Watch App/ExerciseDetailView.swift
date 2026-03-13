//
//  ExerciseDetailView.swift
//  Progress Pulse Watch App
//

import SwiftUI

// MARK: - ExerciseDetailView

struct ExerciseDetailView: View {
    let workoutExercise: WorkoutExercise
    var onComplete: (() -> Void)? = nil

    @State private var currentSetIndex: Int = 0
    @State private var showSetInput: Bool = false
    @State private var showRestTimer: Bool = false
    @State private var restTimerSetIndex: Int = 0   // toujours valide quand showRestTimer = true
    @State private var setValidated: Bool = false   // true si onValidate a été appelé

    @Environment(\.dismiss) private var dismiss

    private var exercise: Exercise { workoutExercise.exercise }
    private var sets: [CustomSet] { workoutExercise.customSets }

    private var performances: [ExercisePerformance] {
        MockDataService.shared.performances(for: exercise.id)
    }


    var body: some View {
        // GeometryReader hors du ScrollView : dimensions fiables de l'écran disponible
        GeometryReader { geo in
            ZStack {
                Color.ppBackground.ignoresSafeArea()
                ScrollView {
                    exerciseContent(screenSize: geo.size)
                }
            }
        }
        .navigationTitle(exercise.name)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $showSetInput, onDismiss: {
            if setValidated {
                setValidated = false
                showRestTimer = true
            }
        }) {
            SetInputView(customSet: sets[currentSetIndex]) { _, _ in
                restTimerSetIndex = currentSetIndex
                setValidated = true
            }
        }
        .sheet(isPresented: $showRestTimer, onDismiss: {
            let idx = restTimerSetIndex
            if idx + 1 < sets.count {
                currentSetIndex = idx + 1
            } else {
                onComplete?()
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
                    dismiss()
                }
            }
        }) {
            RestTimerView(workoutExercise: workoutExercise, completedSetIndex: restTimerSetIndex)
        }
    }

    // Séparé pour pouvoir utiliser `let gifSize` hors du ViewBuilder
    private func exerciseContent(screenSize: CGSize) -> some View {
        // GIF carré : limité par la largeur disponible ET par 58 % de la hauteur écran
        // → le bouton reste toujours visible sans scroller
        let panelWidth: CGFloat = 60
        let hSpacing: CGFloat = 6
        let hPadding: CGFloat = 20   // 10 left + 10 right
        let gifSize = min(
            screenSize.width - hPadding - hSpacing - panelWidth,
            screenSize.height
        )

        return VStack(spacing: 8) {
            if !sets.isEmpty {

                // 1. Indicateur de série — sous le titre, aligné à droite
                HStack {
                    Spacer()
                    Image(systemName: "square.stack.fill")
                        .font(.system(size: 10))
                        .foregroundStyle(Color.ppAccent)
                    Text("Série \(currentSetIndex + 1) / \(sets.count)")
                        .font(.system(size: 12, weight: .semibold, design: .rounded))
                        .foregroundStyle(Color.ppTextPrimary)
                }

                // 2. GIF (gauche, carré adaptatif) + objectifs (droite, étroit)
                HStack(alignment: .top, spacing: hSpacing) {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color.white.opacity(0.08))
                        .frame(width: gifSize, height: gifSize)
                        .overlay(
                            Image(systemName: "photo")
                                .font(.title2)
                                .foregroundStyle(Color.white.opacity(0.18))
                        )

                    ExerciseInfoPanel(customSet: sets[currentSetIndex])
                        .frame(width: panelWidth, height: gifSize)
                }
                .frame(maxWidth: .infinity)

                // 3. Bouton — toujours visible juste sous le GIF
                Button {
                    showSetInput = true
                } label: {
                    HStack(spacing: 5) {
                        Image(systemName: "checkmark")
                            .font(.system(size: 11, weight: .bold))
                        Text("Valider la série")
                            .font(.system(size: 12, weight: .semibold))
                    }
                    .frame(maxWidth: .infinity)
                    .frame(height: 36)
                    .foregroundStyle(Color.ppBackground)
                    .background(Color.ppPrimary)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                }
                .buttonStyle(.plain)
            }

            // 3. Dernières performances (scroll horizontal, en dessous)
            if !performances.isEmpty {
                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 5,) {
                        Rectangle()
                            .fill(Color.ppPrimary)
                            .frame(width: 3, height: 14)
                            .clipShape(Capsule())
                        Text("Dernières perfs")
                            .font(.caption2)
                            .fontWeight(.semibold)
                            .foregroundStyle(Color.ppAccent)
                    }.padding(.vertical, 10)

                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 8) {
                            ForEach(Array(performances.reversed())) { perf in
                                PerformanceCardView(performance: perf)
                                    .containerRelativeFrame(.horizontal)
                            }
                        }
                        .scrollTargetLayout()
                    }
                    .scrollTargetBehavior(.viewAligned)
                    .frame(height: 110)
                }
            }
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 8)
    }
}

// MARK: - ExerciseInfoPanel

struct ExerciseInfoPanel: View {
    let customSet: CustomSet

    private var weightText: String {
        "\(formattedWeight(customSet.weight)) kg"
    }

    private func formattedWeight(_ w: Double) -> String {
        w == w.rounded() ? "\(Int(w))" : "\(w)"
    }

    var body: some View {
        // Pas de padding vertical fixe : les Spacer(minLength:0) distribuent
        // l'espace librement → hauteur minimum réduite à ~80pt (compatible 40mm)
        VStack(spacing: 0) {

            Spacer(minLength: 0)

            // Charge
            VStack(spacing: 2) {
                Image(systemName: "dumbbell.fill")
                    .font(.system(size: 9))
                    .foregroundStyle(Color.ppTextSecondary)
                Text(weightText)
                    .font(.system(size: 12, weight: .bold, design: .rounded))
                    .foregroundStyle(Color.ppTextPrimary)
                    .lineLimit(2)
                    .multilineTextAlignment(.center)
                    .minimumScaleFactor(0.7)
            }

            Spacer(minLength: 0)

            // Répétitions
            VStack(spacing: 2) {
                Image(systemName: "arrow.2.circlepath")
                    .font(.system(size: 9))
                    .foregroundStyle(Color.ppTextSecondary)
                Text("\(customSet.reps)")
                    .font(.system(size: 12, weight: .bold, design: .rounded))
                    .foregroundStyle(Color.ppTextPrimary)
            }

            Spacer(minLength: 0)
        }
        .padding(.horizontal, 5)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.ppCardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(Color.ppAccentBorder, lineWidth: 1)
        )
        .clipped()  // filet de sécurité : ne déborde jamais hors du frame imposé
    }
}

// MARK: - PerformanceCardView

struct PerformanceCardView: View {
    let performance: ExercisePerformance

    private var dateLabel: String {
        let isoFull = ISO8601DateFormatter()
        isoFull.formatOptions = [.withInternetDateTime]
        let isoBasic = ISO8601DateFormatter()
        let date = isoFull.date(from: performance.date) ?? isoBasic.date(from: performance.date)
        guard let date else { return performance.date }
        let display = DateFormatter()
        display.dateFormat = "d MMM"
        display.locale = Locale(identifier: "fr_FR")
        return display.string(from: date)
    }

    private func setLabel(_ set: PerformanceSet) -> String {
        guard set.weight > 0 else { return "\(set.reps) reps" }
        let w = set.weight == set.weight.rounded() ? "\(Int(set.weight))" : "\(set.weight)"
        return "\(set.reps) × \(w) kg"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            // En-tête — date avec icône calendrier
            HStack(spacing: 4) {
                Image(systemName: "calendar")
                    .font(.system(size: 9, weight: .semibold))
                    .foregroundStyle(Color.ppAccent)
                Text(dateLabel)
                    .font(.system(size: 11, weight: .bold, design: .rounded))
                    .foregroundStyle(Color.ppAccent)
            }
            .padding(.bottom, 6)

            // Séparateur
            Rectangle()
                .fill(Color.ppAccent.opacity(0.25))
                .frame(height: 1)
                .padding(.bottom, 6)

            // Liste des séries
            VStack(alignment: .leading, spacing: 4) {
                ForEach(Array(performance.sets.enumerated()), id: \.offset) { index, set in
                    HStack(spacing: 6) {
                        Text("S\(index + 1)")
                            .font(.system(size: 10, weight: .bold, design: .rounded))
                            .foregroundStyle(Color.ppTextSecondary)
                            .padding(.horizontal, 5)
                            .padding(.vertical, 2)

                        Text(setLabel(set))
                            .font(.system(size: 11, weight: .semibold, design: .rounded))
                            .foregroundStyle(Color.ppTextPrimary)
                    }
                }
            }

            Spacer(minLength: 0)
        }
        .padding(10)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .background(Color.ppCardBackground)
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .overlay(
            RoundedRectangle(cornerRadius: 12)
                .strokeBorder(Color.ppAccentBorder, lineWidth: 1)
        )
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        ExerciseDetailView(workoutExercise: MockDataService.shared.workouts[0].exercises[0])
    }
}
