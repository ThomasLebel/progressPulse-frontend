//
//  SetInputView.swift
//  Progress Pulse Watch App
//

import SwiftUI

// MARK: - SetInputView

struct SetInputView: View {
    let customSet: CustomSet
    var onValidate: (Int, Double) -> Void

    enum Field: Hashable { case reps, weight }

    @State private var repsValue: Double
    @State private var weightValue: Double
    @State private var repsTouched = false
    @State private var weightTouched = false
    @FocusState private var focusedField: Field?
    @Environment(\.dismiss) private var dismiss

    init(customSet: CustomSet, onValidate: @escaping (Int, Double) -> Void) {
        self.customSet = customSet
        self.onValidate = onValidate
        _repsValue  = State(initialValue: Double(max(1, customSet.reps)))
        _weightValue = State(initialValue: customSet.weight)
    }

    private var isValid: Bool { repsTouched && weightTouched }

    private var displayReps: Int { max(1, Int(repsValue.rounded())) }

    private var displayWeight: Double {
        max(0, (weightValue / 1.25).rounded() * 1.25)
    }

    private func formattedWeight(_ w: Double) -> String {
        if w == 0 { return "0" }
        let s = String(format: "%.2f", w)
        if s.hasSuffix("0") {
            let t = String(s.dropLast())
            return t.hasSuffix(".0") ? String(t.dropLast(2)) : t
        }
        return s
    }

    // MARK: — Body

    var body: some View {
        ZStack {
            Color.ppBackground.ignoresSafeArea()

            VStack(spacing: 0) {

                // Panneau REPS
                panel(
                    label: "REPS",
                    value: "\(displayReps)",
                    isFocused: focusedField == .reps,
                    isTouched: repsTouched
                )
                .focusable()
                .focused($focusedField, equals: .reps)
                .digitalCrownRotation(
                    $repsValue,
                    from: 1, through: 100, by: 1,
                    sensitivity: .medium,
                    isContinuous: false
                )
                .onChange(of: repsValue) { _, _ in repsTouched = true }
                .onTapGesture { focusedField = .reps; repsTouched = true }

                Rectangle()
                    .fill(Color.ppAccentBorder)
                    .frame(height: 1)
                    .padding(.horizontal, 16)

                // Panneau KG
                panel(
                    label: "KG",
                    value: formattedWeight(displayWeight),
                    isFocused: focusedField == .weight,
                    isTouched: weightTouched
                )
                .focusable()
                .focused($focusedField, equals: .weight)
                .digitalCrownRotation(
                    $weightValue,
                    from: 0, through: 500, by: 1.25,
                    sensitivity: .medium,
                    isContinuous: false
                )
                .onChange(of: weightValue) { _, _ in weightTouched = true }
                .onTapGesture { focusedField = .weight; weightTouched = true }

                // Bouton Valider — uniquement quand les deux valeurs ont été confirmées
                if isValid {
                    Spacer().frame(height: 6)
                    Button {
                        onValidate(displayReps, displayWeight)
                        dismiss()
                    } label: {
                        Text("Valider")
                            .font(.footnote.weight(.semibold))
                            .foregroundStyle(Color.ppBackground)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 8)
                            .background(Color.ppPrimary)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal, 10)
                    .padding(.bottom, 6)
                    .transition(.move(edge: .bottom).combined(with: .opacity))
                }
            }
            .animation(.easeInOut(duration: 0.2), value: isValid)
        }
        .onAppear { focusedField = .reps }
    }

    // MARK: — Panneau générique

    @ViewBuilder
    private func panel(
        label: String,
        value: String,
        isFocused: Bool,
        isTouched: Bool
    ) -> some View {
        VStack(spacing: 2) {
            Text(label)
                .font(.system(size: 10, weight: .bold))
                .foregroundStyle(isFocused ? Color.ppAccent : Color.ppTextSecondary)
                .tracking(2)

            Text(value)
                .font(.system(size: 30, weight: .bold, design: .rounded))
                .foregroundStyle(isTouched ? Color.ppTextPrimary : Color.ppTextSecondary.opacity(0.45))
                .contentTransition(.numericText())
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(isFocused ? Color.ppAccent.opacity(0.07) : Color.clear)
        .clipShape(RoundedRectangle(cornerRadius: 10))
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .strokeBorder(
                    isFocused ? Color.ppAccent.opacity(0.35) : Color.clear,
                    lineWidth: 1
                )
        )
        .padding(.horizontal, 8)
        .padding(.vertical, 4)
    }
}

// MARK: - Preview

#Preview {
    SetInputView(
        customSet: MockDataService.shared.workouts[0].exercises[0].customSets[0]
    ) { reps, weight in
        print("Validé : \(reps) reps × \(weight) kg")
    }
}
