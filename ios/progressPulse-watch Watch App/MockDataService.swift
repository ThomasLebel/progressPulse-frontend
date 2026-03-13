//
//  MockDataService.swift
//  Progress Pulse Watch App
//

import Foundation

// MARK: - MockDataService

final class MockDataService {

    static let shared = MockDataService()
    private init() {}

    // MARK: - Workouts mockés

    // MARK: - Performances mockées (par exercice)

    private let mockPerformances: [String: [ExercisePerformance]] = [

        // Squat (ex-001)
        "ex-001": [
            ExercisePerformance(id: "perf-001-1", date: "2026-01-11T10:00:00Z", sets: [
                PerformanceSet(weight: 75, reps: 10, rest: 90),
                PerformanceSet(weight: 75, reps: 10, rest: 90),
                PerformanceSet(weight: 77.5, reps: 8, rest: 90),
                PerformanceSet(weight: 77.5, reps: 8, rest: 90)
            ]),
            ExercisePerformance(id: "perf-001-2", date: "2026-01-18T10:00:00Z", sets: [
                PerformanceSet(weight: 77.5, reps: 10, rest: 90),
                PerformanceSet(weight: 77.5, reps: 10, rest: 90),
                PerformanceSet(weight: 80, reps: 8, rest: 90),
                PerformanceSet(weight: 80, reps: 8, rest: 90)
            ]),
            ExercisePerformance(id: "perf-001-3", date: "2026-01-25T10:00:00Z", sets: [
                PerformanceSet(weight: 80, reps: 10, rest: 90),
                PerformanceSet(weight: 80, reps: 10, rest: 90),
                PerformanceSet(weight: 82.5, reps: 8, rest: 90),
                PerformanceSet(weight: 82.5, reps: 8, rest: 90)
            ]),
            ExercisePerformance(id: "perf-001-4", date: "2026-02-01T10:00:00Z", sets: [
                PerformanceSet(weight: 80, reps: 10, rest: 90),
                PerformanceSet(weight: 82.5, reps: 10, rest: 90),
                PerformanceSet(weight: 82.5, reps: 8, rest: 90),
                PerformanceSet(weight: 85, reps: 8, rest: 90)
            ]),
            ExercisePerformance(id: "perf-001-5", date: "2026-02-08T10:00:00Z", sets: [
                PerformanceSet(weight: 80, reps: 10, rest: 90),
                PerformanceSet(weight: 80, reps: 10, rest: 90),
                PerformanceSet(weight: 85, reps: 8, rest: 90),
                PerformanceSet(weight: 85, reps: 8, rest: 90)
            ])
        ],

        // Développé couché (ex-002)
        "ex-002": [
            ExercisePerformance(id: "perf-002-1", date: "2026-01-09T09:00:00Z", sets: [
                PerformanceSet(weight: 60, reps: 10, rest: 90),
                PerformanceSet(weight: 60, reps: 10, rest: 90),
                PerformanceSet(weight: 62.5, reps: 8, rest: 90),
                PerformanceSet(weight: 62.5, reps: 8, rest: 90)
            ]),
            ExercisePerformance(id: "perf-002-2", date: "2026-01-16T09:00:00Z", sets: [
                PerformanceSet(weight: 62.5, reps: 10, rest: 90),
                PerformanceSet(weight: 62.5, reps: 10, rest: 90),
                PerformanceSet(weight: 65, reps: 8, rest: 90),
                PerformanceSet(weight: 65, reps: 8, rest: 90)
            ]),
            ExercisePerformance(id: "perf-002-3", date: "2026-01-23T09:00:00Z", sets: [
                PerformanceSet(weight: 65, reps: 10, rest: 90),
                PerformanceSet(weight: 65, reps: 8, rest: 90),
                PerformanceSet(weight: 65, reps: 8, rest: 90),
                PerformanceSet(weight: 67.5, reps: 6, rest: 90)
            ]),
            ExercisePerformance(id: "perf-002-4", date: "2026-01-30T09:00:00Z", sets: [
                PerformanceSet(weight: 65, reps: 10, rest: 90),
                PerformanceSet(weight: 67.5, reps: 8, rest: 90),
                PerformanceSet(weight: 67.5, reps: 8, rest: 90),
                PerformanceSet(weight: 70, reps: 6, rest: 90)
            ]),
            ExercisePerformance(id: "perf-002-5", date: "2026-02-06T09:00:00Z", sets: [
                PerformanceSet(weight: 60, reps: 10, rest: 90),
                PerformanceSet(weight: 65, reps: 8, rest: 90),
                PerformanceSet(weight: 65, reps: 8, rest: 90),
                PerformanceSet(weight: 70, reps: 6, rest: 90)
            ])
        ],

        // Tractions (ex-003)
        "ex-003": [
            ExercisePerformance(id: "perf-003-1", date: "2026-01-12T11:00:00Z", sets: [
                PerformanceSet(weight: 0, reps: 7, rest: 90),
                PerformanceSet(weight: 0, reps: 6, rest: 90),
                PerformanceSet(weight: 0, reps: 5, rest: 90)
            ]),
            ExercisePerformance(id: "perf-003-2", date: "2026-01-19T11:00:00Z", sets: [
                PerformanceSet(weight: 0, reps: 8, rest: 90),
                PerformanceSet(weight: 0, reps: 7, rest: 90),
                PerformanceSet(weight: 0, reps: 6, rest: 90)
            ]),
            ExercisePerformance(id: "perf-003-3", date: "2026-01-26T11:00:00Z", sets: [
                PerformanceSet(weight: 0, reps: 8, rest: 90),
                PerformanceSet(weight: 0, reps: 8, rest: 90),
                PerformanceSet(weight: 0, reps: 6, rest: 90)
            ]),
            ExercisePerformance(id: "perf-003-4", date: "2026-02-02T11:00:00Z", sets: [
                PerformanceSet(weight: 0, reps: 8, rest: 90),
                PerformanceSet(weight: 0, reps: 7, rest: 90),
                PerformanceSet(weight: 5, reps: 6, rest: 90)
            ])
        ],

        // Développé militaire (ex-004)
        "ex-004": [
            ExercisePerformance(id: "perf-004-1", date: "2026-01-14T09:30:00Z", sets: [
                PerformanceSet(weight: 37.5, reps: 10, rest: 60),
                PerformanceSet(weight: 37.5, reps: 10, rest: 60),
                PerformanceSet(weight: 40, reps: 8, rest: 60)
            ]),
            ExercisePerformance(id: "perf-004-2", date: "2026-01-21T09:30:00Z", sets: [
                PerformanceSet(weight: 40, reps: 10, rest: 60),
                PerformanceSet(weight: 40, reps: 10, rest: 60),
                PerformanceSet(weight: 42.5, reps: 8, rest: 60)
            ]),
            ExercisePerformance(id: "perf-004-3", date: "2026-01-28T09:30:00Z", sets: [
                PerformanceSet(weight: 40, reps: 10, rest: 60),
                PerformanceSet(weight: 40, reps: 10, rest: 60),
                PerformanceSet(weight: 45, reps: 8, rest: 60)
            ])
        ]
    ]

    func performances(for exerciseId: String) -> [ExercisePerformance] {
        Array((mockPerformances[exerciseId] ?? []).suffix(10))
    }

    // MARK: - Workouts mockés

    let workouts: [Workout] = [

        // ─── 1. Full Body A ──────────────────────────────────────────────────
        Workout(
            id: "mock-001",
            name: "Full Body A",
            image: "fullbody",
            exercises: [
                WorkoutExercise(
                    exercise: Exercise(id: "ex-001", name: "Squat", muscleGroupe: "Jambes",
                                      description: nil, image: nil),
                    rest: 90,
                    customSets: [
                        CustomSet(weight: 80, reps: 10),
                        CustomSet(weight: 80, reps: 10),
                        CustomSet(weight: 85, reps: 8),
                        CustomSet(weight: 85, reps: 8)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-002", name: "Développé couché", muscleGroupe: "Pectoraux",
                                      description: nil, image: nil),
                    rest: 90,
                    customSets: [
                        CustomSet(weight: 60, reps: 10),
                        CustomSet(weight: 65, reps: 8),
                        CustomSet(weight: 65, reps: 8),
                        CustomSet(weight: 70, reps: 6)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-003", name: "Tractions", muscleGroupe: "Dos",
                                      description: nil, image: nil),
                    rest: 75,
                    customSets: [
                        CustomSet(weight: 0, reps: 8),
                        CustomSet(weight: 0, reps: 7),
                        CustomSet(weight: 0, reps: 6)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-004", name: "Développé militaire", muscleGroupe: "Épaules",
                                      description: nil, image: nil),
                    rest: 60,
                    customSets: [
                        CustomSet(weight: 40, reps: 10),
                        CustomSet(weight: 40, reps: 10),
                        CustomSet(weight: 45, reps: 8)
                    ]
                )
            ]
        ),

        // ─── 2. Push Day — Pecs / Épaules / Triceps ──────────────────────────
        Workout(
            id: "mock-002",
            name: "Push Day",
            image: "push",
            exercises: [
                WorkoutExercise(
                    exercise: Exercise(id: "ex-002", name: "Développé couché", muscleGroupe: "Pectoraux",
                                      description: nil, image: nil),
                    rest: 90,
                    customSets: [
                        CustomSet(weight: 70, reps: 8),
                        CustomSet(weight: 70, reps: 8),
                        CustomSet(weight: 75, reps: 6),
                        CustomSet(weight: 75, reps: 6)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-005", name: "Développé incliné", muscleGroupe: "Pectoraux",
                                      description: nil, image: nil),
                    rest: 75,
                    customSets: [
                        CustomSet(weight: 55, reps: 10),
                        CustomSet(weight: 55, reps: 10),
                        CustomSet(weight: 60, reps: 8)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-006", name: "Écarté haltères", muscleGroupe: "Pectoraux",
                                      description: nil, image: nil),
                    rest: 60,
                    customSets: [
                        CustomSet(weight: 16, reps: 12),
                        CustomSet(weight: 16, reps: 12),
                        CustomSet(weight: 18, reps: 10)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-004", name: "Développé militaire", muscleGroupe: "Épaules",
                                      description: nil, image: nil),
                    rest: 90,
                    customSets: [
                        CustomSet(weight: 45, reps: 10),
                        CustomSet(weight: 45, reps: 10),
                        CustomSet(weight: 50, reps: 8),
                        CustomSet(weight: 50, reps: 8)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-007", name: "Extension triceps", muscleGroupe: "Triceps",
                                      description: nil, image: nil),
                    rest: 60,
                    customSets: [
                        CustomSet(weight: 25, reps: 12),
                        CustomSet(weight: 25, reps: 12),
                        CustomSet(weight: 27.5, reps: 10)
                    ]
                )
            ]
        ),

        // ─── 3. Pull Day — Dos / Biceps ───────────────────────────────────────
        Workout(
            id: "mock-003",
            name: "Pull Day",
            image: "pull",
            exercises: [
                WorkoutExercise(
                    exercise: Exercise(id: "ex-003", name: "Tractions", muscleGroupe: "Dos",
                                      description: nil, image: nil),
                    rest: 90,
                    customSets: [
                        CustomSet(weight: 0, reps: 8),
                        CustomSet(weight: 0, reps: 8),
                        CustomSet(weight: 5, reps: 6),
                        CustomSet(weight: 5, reps: 6)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-008", name: "Rowing barre", muscleGroupe: "Dos",
                                      description: nil, image: nil),
                    rest: 75,
                    customSets: [
                        CustomSet(weight: 70, reps: 10),
                        CustomSet(weight: 70, reps: 10),
                        CustomSet(weight: 75, reps: 8),
                        CustomSet(weight: 75, reps: 8)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-009", name: "Tirage vertical", muscleGroupe: "Dos",
                                      description: nil, image: nil),
                    rest: 60,
                    customSets: [
                        CustomSet(weight: 55, reps: 12),
                        CustomSet(weight: 55, reps: 12),
                        CustomSet(weight: 60, reps: 10)
                    ]
                ),
                WorkoutExercise(
                    exercise: Exercise(id: "ex-010", name: "Curl barre", muscleGroupe: "Biceps",
                                      description: nil, image: nil),
                    rest: 60,
                    customSets: [
                        CustomSet(weight: 30, reps: 12),
                        CustomSet(weight: 30, reps: 12),
                        CustomSet(weight: 35, reps: 10)
                    ]
                )
            ]
        )
    ]
}
