/**
 * Retourne le chemin de l'image correspondant à un exercice.
 */
export function findExerciseImage(exercise, images) {
  return images[exercise.muscleGroupe.toLowerCase()][exercise.image];
}

/**
 * Découpe le texte de description en phrases individuelles.
 */
export function splitDescriptionIntoSentences(description) {
  return description.split(/(?<=[.!?])\s+/);
}

/**
 * Formate une date ISO (YYYY-MM-DD…) en chaîne dd/mm/yyyy.
 */
export function formatHistoryDate(dateString) {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(5, 7);
  const day = dateString.slice(8, 10);
  return `${day}/${month}/${year}`;
}

/**
 * Convertit un nombre de secondes en heures et minutes.
 */
export function formatCardioDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes };
}
