/**
 * Retourne le texte du bouton de fin selon si la séance est déjà créée ou non.
 */
export function getFinishButtonLabel(isWorkoutAlreadyCreated) {
  return isWorkoutAlreadyCreated ? "Retourner à ma séance" : "Voir le récap";
}

/**
 * Retourne la largeur du bouton de fin selon si la séance est déjà créée ou non.
 */
export function getFinishButtonWidth(isWorkoutAlreadyCreated) {
  return isWorkoutAlreadyCreated ? 280 : 150;
}

/**
 * Calcule le nombre d'exercices sélectionnés selon le contexte (création ou modification de séance).
 */
export function getExercisesLength(isWorkoutAlreadyCreated, workoutCreationLength, workouts, workoutID) {
  if (!isWorkoutAlreadyCreated) {
    return workoutCreationLength;
  }
  const workoutSelected = workouts.find((e) => e._id === workoutID);
  return workoutSelected ? workoutSelected.exercises.length : 0;
}
