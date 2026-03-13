//
//  Workout.swift
//  Progress Pulse Watch App
//

import Foundation

// MARK: - Exercise

struct Exercise: Identifiable, Codable, Hashable {
    let id: String
    let name: String
    let muscleGroupe: String   // ⚠️ orthographe exacte du champ DB
    let description: String?
    let image: String?

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, muscleGroupe, description, image
    }
}

// MARK: - CustomSet

struct CustomSet: Codable, Hashable {
    let weight: Double
    let reps: Int
}

// MARK: - WorkoutExercise

struct WorkoutExercise: Codable, Hashable {
    let exercise: Exercise
    let rest: Int           // secondes (repos entre séries)
    let customSets: [CustomSet]
}

// MARK: - PerformanceSet

struct PerformanceSet: Codable, Hashable {
    let weight: Double
    let reps: Int
    let rest: Int
}

// MARK: - ExercisePerformance

struct ExercisePerformance: Identifiable {
    let id: String
    let date: String
    let sets: [PerformanceSet]
}

// MARK: - Workout

struct Workout: Identifiable, Codable, Hashable {
    let id: String
    let name: String
    let image: String
    let exercises: [WorkoutExercise]

    enum CodingKeys: String, CodingKey {
        case id = "_id"
        case name, image, exercises
    }
}
