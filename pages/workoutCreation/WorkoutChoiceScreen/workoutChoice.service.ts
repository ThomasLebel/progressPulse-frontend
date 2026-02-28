import images, { ExerciseImageMap } from "../../../utils/images";
import { WorkoutExerciseCreation } from "../../../reducers/workoutCreation/workoutCreation.types";
import { WorkoutExerciseDataAPI } from "./workoutChoice.api";

type ImageWorkout = {
  name: string;
  source: unknown;
};

export function calculateWorkoutTime(exercises: WorkoutExerciseDataAPI[]): number {
  let times = 0;
  for (let i = 0; i < exercises.length; i++) {
    times +=
      (exercises[i].sets.length * exercises[i].rest +
        exercises[i].sets.length * 30) /
      60;
  }
  return Math.round(times);
}

export function formatExerciseCount(count: number): string {
  return count + " exercices";
}

export function findWorkoutImage(imageName: string, imageList: ImageWorkout[]): ImageWorkout[] {
  return imageList.filter((imageWorkout) => {
    if (imageWorkout.name === imageName) {
      return imageWorkout.source;
    }
  });
}

export function buildExercisesToAdd(exercicesData: WorkoutExerciseDataAPI[]): WorkoutExerciseCreation[] {
  const imagesMap = images as ExerciseImageMap;
  return exercicesData.map((exercise) => {
    const customSets = exercise.sets.map((set) => ({
      weight: set.weight,
      reps: set.rep,
    }));
    const imagePath = imagesMap[exercise.exercice.muscleGroupe.toLowerCase()]?.[
      exercise.exercice.image
    ];
    return {
      exercise: exercise.exercice._id,
      exerciseName: exercise.exercice.name,
      muscleGroup: exercise.exercice.muscleGroupe,
      rest: exercise.rest,
      customSets,
      imagePath,
    };
  });
}
