import { WorkoutExercise } from '../../shared/types';

/**
 * Calcule la durée estimée d'une séance en minutes.
 * Pour chaque exercice : (séries × repos + séries × 30s) / 60
 */
export function calculateWorkoutDuration(exercises: WorkoutExercise[]): number {
  let total = 0;
  for (let i = 0; i < exercises.length; i++) {
    total +=
      (exercises[i].customSets.length * exercises[i].rest +
        exercises[i].customSets.length * 30) /
      60;
  }
  return Math.round(total);
}

/**
 * Formate le nombre d'exercices avec accord singulier/pluriel.
 */
export function formatExerciseCount(count: number): string {
  return count === 1 ? `${count} exercice` : `${count} exercices`;
}

export interface WorkoutImage {
  name: string;
  source: number;
}

/**
 * Trouve l'image d'une séance dans la liste statique par son nom.
 * Retourne un tableau (compatible avec BtnWorkoutSession qui accède à image[0].source).
 */
export function findWorkoutImage(imageName: string, imageList: WorkoutImage[]): WorkoutImage[] {
  return imageList.filter((imageWorkout) => imageWorkout.name === imageName);
}
