import { WorkoutHistory } from "../../../shared/types";

/**
 * Retourne les noms de séances uniques de l'historique, du plus récent au plus ancien.
 */
export function getUniqueWorkoutNames(history: WorkoutHistory[]): string[] {
  const names: string[] = [];
  for (const entry of history) {
    if (!names.includes(entry.workoutName)) {
      names.unshift(entry.workoutName);
    }
  }
  return names;
}
