import { Workout } from "../../../shared/types";

export function getFinishButtonLabel(isWorkoutAlreadyCreated: boolean): string {
  return isWorkoutAlreadyCreated ? "Retourner à ma séance" : "Voir le récap";
}

export function getFinishButtonWidth(isWorkoutAlreadyCreated: boolean): number {
  return isWorkoutAlreadyCreated ? 280 : 150;
}

export function getExercisesLength(
  isWorkoutAlreadyCreated: boolean,
  workoutCreationLength: number,
  workouts: Workout[],
  workoutID: string | null
): number {
  if (!isWorkoutAlreadyCreated) {
    return workoutCreationLength;
  }
  const workoutSelected = workouts.find((e) => e._id === workoutID);
  return workoutSelected ? workoutSelected.exercises.length : 0;
}
