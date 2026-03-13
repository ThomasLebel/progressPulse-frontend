//
//  RestTimerView.swift
//  Progress Pulse Watch App
//

import SwiftUI
import Combine
import UserNotifications

// MARK: - RestTimerView

struct RestTimerView: View {
    let workoutExercise: WorkoutExercise
    let completedSetIndex: Int

    @Environment(\.dismiss)    private var dismiss
    @Environment(\.scenePhase) private var scenePhase

    @State private var restDuration: Int
    @State private var secondsLeft: Int
    @State private var isRunning     = false
    @State private var isFinished    = false
    @State private var isEditingTime = false
    @State private var crownValue:   Double
    @State private var timerEndDate: Date? = nil   // date de fin, calculée au démarrage

    private let ticker = Timer.publish(every: 1, on: .main, in: .common).autoconnect()

    private var totalSets: Int { workoutExercise.customSets.count }

    private var progress: Double {
        guard restDuration > 0 else { return 1 }
        return 1.0 - Double(secondsLeft) / Double(restDuration)
    }

    private var timeString: String {
        let m = secondsLeft / 60
        let s = secondsLeft % 60
        return String(format: "%d:%02d", m, s)
    }

    private var ringColor: Color {
        isFinished ? Color.ppAccent : Color.ppPrimary
    }

    init(workoutExercise: WorkoutExercise, completedSetIndex: Int) {
        self.workoutExercise = workoutExercise
        self.completedSetIndex = completedSetIndex
        let dur = max(10, workoutExercise.rest)
        _restDuration = State(initialValue: dur)
        _secondsLeft  = State(initialValue: dur)
        _crownValue   = State(initialValue: Double(dur))
    }

    // MARK: — Body

    var body: some View {
        GeometryReader { geo in
            let btnH: CGFloat = 32
            let vPad: CGFloat = 8
            let gap:  CGFloat = 6
            let maxRing  = geo.size.height - btnH - gap - vPad * 2
            let ringSize = min(geo.size.width * 0.80, maxRing)
            let timerFont = ringSize * 0.29

            ZStack {
                Color.ppBackground.ignoresSafeArea()

                VStack(spacing: gap) {

                    // Anneau — tappable pour éditer le temps à la couronne
                    ZStack {
                        Circle()
                            .stroke(Color.ppCardBackground, lineWidth: 5)

                        Circle()
                            .trim(from: 0, to: progress)
                            .stroke(ringColor,
                                    style: StrokeStyle(lineWidth: 5, lineCap: .round))
                            .rotationEffect(.degrees(-90))
                            .animation(.linear(duration: 1), value: progress)

                        // Bordure active en mode édition
                        Circle()
                            .strokeBorder(
                                isEditingTime ? Color.ppAccent.opacity(0.55) : Color.clear,
                                lineWidth: 2
                            )

                        VStack(spacing: 2) {
                            Text(timeString)
                                .font(.system(size: timerFont, weight: .bold, design: .rounded))
                                .foregroundStyle(isEditingTime ? Color.ppAccent : Color.ppTextPrimary)
                                .contentTransition(.numericText(countsDown: true))
                                .animation(.default, value: secondsLeft)

                            Text(isFinished    ? "Terminé !"
                                 : isEditingTime ? "couronne ↑↓"
                                 : "repos")
                                .font(.system(size: 9, weight: .medium))
                                .foregroundStyle(
                                    isFinished || isEditingTime ? Color.ppAccent : Color.ppTextSecondary
                                )
                        }
                    }
                    .frame(width: ringSize, height: ringSize)
                    .focusable(isEditingTime)
                    .digitalCrownRotation(
                        $crownValue,
                        from: 10, through: 600, by: 10,
                        sensitivity: .medium,
                        isContinuous: false
                    )
                    .onChange(of: crownValue) { _, newVal in
                        let snapped = max(10, Int((newVal / 10).rounded()) * 10)
                        restDuration = snapped
                        secondsLeft  = snapped
                    }
                    .onTapGesture {
                        guard !isRunning && !isFinished else { return }
                        isEditingTime.toggle()
                    }

                    // Bouton principal
                    Button {
                        isEditingTime = false
                        handleAction()
                    } label: {
                        HStack(spacing: 5) {
                            Image(systemName: (isRunning || isFinished) ? "forward.fill" : "play.fill")
                                .font(.system(size: 11, weight: .bold))
                            Text((isRunning || isFinished) ? "Série suivante" : "Démarrer")
                                .font(.system(size: 12, weight: .semibold))
                        }
                        .frame(maxWidth: .infinity)
                        .frame(height: btnH)
                        .foregroundStyle(Color.ppBackground)
                        .background((isRunning || isFinished) ? Color.ppAccent : Color.ppPrimary)
                        .clipShape(RoundedRectangle(cornerRadius: 10))
                    }
                    .buttonStyle(.plain)
                    .padding(.top, 10)
                }
                .padding(.horizontal, 10)
                .padding(.vertical, vPad)
            }
        }
        .sensoryFeedback(.success, trigger: isFinished)
        // — Tick : recalcul depuis la date de fin (résiste aux pauses background)
        .onReceive(ticker) { _ in
            guard isRunning, !isFinished, let endDate = timerEndDate else { return }
            let remaining = Int(endDate.timeIntervalSinceNow.rounded())
            if remaining > 0 {
                secondsLeft = remaining
            } else {
                finishTimer()
            }
        }
        // — Retour au premier plan : rattrape le temps écoulé en background
        .onChange(of: scenePhase) { _, newPhase in
            guard newPhase == .active,
                  isRunning, !isFinished,
                  let endDate = timerEndDate else { return }
            let remaining = Int(endDate.timeIntervalSinceNow.rounded())
            if remaining <= 0 {
                finishTimer()
            } else {
                secondsLeft = remaining
            }
        }
    }

    // MARK: — Helpers

    private func handleAction() {
        if isRunning || isFinished {
            cancelNotification()
            dismiss()
        } else {
            timerEndDate = Date().addingTimeInterval(Double(restDuration))
            isRunning = true
            scheduleNotification(in: restDuration)
        }
    }

    private func finishTimer() {
        guard !isFinished else { return }
        secondsLeft = 0
        isRunning   = false
        isFinished  = true
        cancelNotification()
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            dismiss()
        }
    }

    // MARK: — Notifications locales

    private func scheduleNotification(in seconds: Int) {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound]) { granted, _ in
            guard granted else { return }
            let content = UNMutableNotificationContent()
            content.title = "Repos terminé !"
            content.body  = "Prêt pour la série suivante 💪"
            content.sound = .default
            let trigger = UNTimeIntervalNotificationTrigger(
                timeInterval: Double(seconds), repeats: false)
            let request = UNNotificationRequest(
                identifier: "restTimer", content: content, trigger: trigger)
            UNUserNotificationCenter.current().add(request)
        }
    }

    private func cancelNotification() {
        UNUserNotificationCenter.current().removePendingNotificationRequests(
            withIdentifiers: ["restTimer"])
    }
}

// MARK: - Preview

#Preview {
    NavigationStack {
        RestTimerView(
            workoutExercise: MockDataService.shared.workouts[0].exercises[0],
            completedSetIndex: 0
        )
    }
}
