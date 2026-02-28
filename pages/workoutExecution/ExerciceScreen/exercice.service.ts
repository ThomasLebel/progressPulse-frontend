import { Exercise } from '../../../shared/types';
import { ExerciseImageMap } from '../../../utils/images';

/**
 * Retourne le chemin de l'image correspondant à un exercice.
 */
export function findExerciseImage(
  exercise: Exercise,
  images: ExerciseImageMap,
): number | undefined {
  return images[exercise.muscleGroupe.toLowerCase()]?.[exercise.image ?? ''];
}

/**
 * Découpe le texte de description en phrases individuelles.
 */
export function splitDescriptionIntoSentences(description: string): string[] {
  return description.split(/(?<=[.!?])\s+/);
}

/**
 * Formate une date ISO (YYYY-MM-DD…) en chaîne dd/mm/yyyy.
 */
export function formatHistoryDate(dateString: string): string {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  return `${day}/${month}/${year}`;
}

/**
 * Convertit un nombre de secondes en heures et minutes.
 */
export function formatCardioDuration(seconds: number): { hours: number; minutes: number } {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes };
}
