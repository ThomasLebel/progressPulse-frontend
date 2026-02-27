import { Exercise } from "../../shared/types";
import { CustomSet } from "../../shared/types";
import { WorkoutExerciseCreation } from "../../reducers/workoutCreation/workoutCreation.types";

export function sortExercisesByName(exercisesList: Exercise[]): Exercise[] {
  return [...exercisesList].sort((a, b) => a.name.localeCompare(b.name));
}

export function getExerciseImagePath(
  exercise: Exercise,
  images: Record<string, Record<string, any>>
): any {
  const muscleGroup = exercise.muscleGroupe.toLowerCase();
  return images[muscleGroup]?.[exercise.image ?? ""];
}

export function validateStrengthFields(
  charge: string,
  nbReps: string,
  nbSets: string,
  restMinutes: string,
  restSeconds: string
): boolean {
  return Boolean(charge && nbReps && nbSets && restMinutes && restSeconds);
}

export function validateCardioFields(
  charge: string,
  restMinutes: string,
  restSeconds: string
): boolean {
  return Boolean(charge && restMinutes && restSeconds);
}

export function buildStrengthExercise(
  exerciseID: string,
  exerciseName: string,
  muscleGroupName: string,
  charge: string,
  nbSets: string,
  nbReps: string,
  restMinutes: string,
  restSeconds: string,
  imagePath: any
): WorkoutExerciseCreation {
  const customSets: CustomSet[] = [];
  for (let i = 0; i < parseInt(nbSets); i++) {
    customSets.push({
      weight: parseFloat(String(charge).replace(",", ".")),
      reps: parseInt(nbReps),
    });
  }
  const rest = parseInt(restMinutes) * 60 + parseInt(restSeconds);
  return {
    exercise: exerciseID,
    exerciseName,
    muscleGroup: muscleGroupName,
    rest,
    customSets,
    imagePath,
  };
}

export function buildCardioExercise(
  exerciseID: string,
  exerciseName: string,
  muscleGroupName: string,
  charge: string,
  restMinutes: string,
  restSeconds: string
): WorkoutExerciseCreation {
  const customSets: CustomSet[] = [
    { weight: parseFloat(String(charge).replace(",", ".")), reps: 1 },
  ];
  const rest = parseInt(restMinutes) * 60 * 60 + parseInt(restSeconds) * 60;
  return {
    exercise: exerciseID,
    exerciseName,
    muscleGroup: muscleGroupName,
    rest,
    customSets,
    imagePath: "",
  };
}
