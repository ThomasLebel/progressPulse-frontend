/**
 * Trie une liste d'exercices par ordre alphabétique.
 */
export function sortExercisesByName(exercisesList) {
  return [...exercisesList].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Retourne le chemin de l'image correspondant à un exercice.
 */
export function getExerciseImagePath(exercise, images) {
  const muscleGroup = exercise.muscleGroupe.toLowerCase();
  return images[muscleGroup][exercise.image];
}

/**
 * Valide les champs du formulaire pour un exercice de force.
 */
export function validateStrengthFields(charge, nbReps, nbSets, restMinutes, restSeconds) {
  return Boolean(charge && nbReps && nbSets && restMinutes && restSeconds);
}

/**
 * Valide les champs du formulaire pour un exercice cardio.
 */
export function validateCardioFields(charge, restMinutes, restSeconds) {
  return Boolean(charge && restMinutes && restSeconds);
}

/**
 * Construit l'objet exercice à ajouter pour un exercice de force.
 */
export function buildStrengthExercise(exerciseID, exerciseName, muscleGroupName, charge, nbSets, nbReps, restMinutes, restSeconds, imagePath) {
  const customSets = [];
  for (let i = 0; i < parseInt(nbSets); i++) {
    customSets.push({ weight: parseFloat(String(charge).replace(",", ".")), reps: parseInt(nbReps) });
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

/**
 * Construit l'objet exercice à ajouter pour un exercice cardio.
 */
export function buildCardioExercise(exerciseID, exerciseName, muscleGroupName, charge, restMinutes, restSeconds) {
  const customSets = [{ weight: parseFloat(String(charge).replace(",", ".")), reps: 1 }];
  const rest = parseInt(restMinutes) * 60 * 60 + parseInt(restSeconds) * 60;
  return {
    exercise: exerciseID,
    exerciseName,
    muscleGroup: muscleGroupName,
    rest,
    customSets,
  };
}
