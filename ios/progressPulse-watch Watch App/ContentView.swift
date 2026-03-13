//
//  ContentView.swift
//  Progress Pulse Watch App
//

import SwiftUI

// MARK: - Design System

extension Color {
    static let ppPrimary        = Color(hex: "8BC34A")          // CTA, accent bar
    static let ppAccent         = Color(hex: "A3FD01")          // Icons, lime highlights
    static let ppBackground     = Color(hex: "0D0D36")          // App background
    static let ppCardBackground = Color(hex: "1C1C3A")          // Cards
    static let ppTextPrimary    = Color.white
    static let ppTextSecondary  = Color.white.opacity(0.55)
    static let ppAccentBorder   = Color(hex: "A3FD01").opacity(0.12)

    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        self.init(
            .sRGB,
            red:     Double((int >> 16) & 0xFF) / 255,
            green:   Double((int >> 8)  & 0xFF) / 255,
            blue:    Double( int        & 0xFF) / 255,
            opacity: 1
        )
    }
}

// MARK: - HomeView

struct HomeView: View {
    var body: some View {
        ZStack {
            Color.ppBackground
                .ignoresSafeArea()

            VStack(spacing: 10) {

                // Logo haltère
                ZStack {
                    Circle()
                        .fill(Color.ppAccent.opacity(0.12))
                        .frame(width: 58, height: 58)

                    Image(systemName: "dumbbell.fill")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 30, height: 30)
                        .foregroundStyle(Color.ppAccent)
                }

                // Nom de l'app
                Text("ProgressPulse")
                    .font(.headline)
                    .fontWeight(.bold)
                    .foregroundStyle(Color.ppTextPrimary)

                // Tagline
                Text("Prêt à vous entraîner ?")
                    .font(.caption2)
                    .foregroundStyle(Color.ppTextSecondary)
                    .multilineTextAlignment(.center)

                Spacer().frame(height: 2)

                // Bouton CTA → WorkoutListView
                NavigationLink(value: "workoutList") {
                    Text("Démarrer")
                        .font(.footnote)
                        .fontWeight(.semibold)
                        .foregroundStyle(Color.ppBackground)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 10)
                        .background(Color.ppPrimary)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .buttonStyle(.plain)
            }
            .padding(.horizontal, 12)
        }
    }
}

// MARK: - App entry point

struct ContentView: View {
    @State private var path = NavigationPath()

    var body: some View {
        NavigationStack(path: $path) {
            HomeView()
                .navigationDestination(for: String.self) { _ in
                    WorkoutListView(onFinish: { path = NavigationPath() })
                }
        }
    }
}

#Preview {
    HomeView()
}
