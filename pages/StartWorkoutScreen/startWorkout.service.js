/**
 * Regroupe les exercices d'une séance par groupe musculaire.
 * @param {Array} exercises - liste des exercices de la séance
 * @returns {Object} objet dont les clés sont les groupes musculaires
 */
export function groupExercisesByMuscleGroup(exercises) {
  return exercises.reduce((groups, exercise) => {
    const { muscleGroupe } = exercise.exercise;
    if (!groups[muscleGroupe]) {
      groups[muscleGroupe] = [];
    }
    groups[muscleGroupe].push(exercise);
    return groups;
  }, {});
}

/**
 * Calcule les minutes et secondes à afficher pour le temps de repos d'un exercice.
 * Pour les exercices cardio, la valeur stockée est en secondes totales (hh*3600 + mm*60).
 * Pour les autres, la valeur est en secondes (mm*60 + ss).
 * @param {number} rest - valeur brute du repos stockée
 * @param {string} muscleGroup - groupe musculaire (ex: "Cardio")
 * @returns {{ minutes: number, seconds: number }}
 */
export function computeRestDisplay(rest, muscleGroup) {
  if (muscleGroup !== "Cardio") {
    return {
      minutes: Math.floor(rest / 60),
      seconds: rest % 60,
    };
  }
  return {
    minutes: Math.floor(rest / 3600),
    seconds: Math.floor((rest % 3600) / 60),
  };
}

/**
 * Construit le tableau de séries personnalisées à partir des paramètres saisis.
 * @param {string} nbSets - nombre de séries
 * @param {string} charge - charge en kg ou résistance/inclinaison
 * @param {string} nbReps - nombre de répétitions
 * @returns {Array<{ weight: number, reps: number }>}
 */
export function buildCustomSets(nbSets, charge, nbReps) {
  const sets = [];
  for (let i = 0; i < parseInt(nbSets); i++) {
    sets.push({ weight: parseInt(charge), reps: parseInt(nbReps) });
  }
  return sets;
}

/**
 * Convertit les champs minutes/secondes du formulaire en valeur de repos stockée.
 * Pour les exercices cardio : minutes représentent les heures, secondes les minutes.
 * @param {string} restMinutes - minutes saisies (ou heures pour cardio)
 * @param {string} restSeconds - secondes saisies (ou minutes pour cardio)
 * @param {string} muscleGroup - groupe musculaire
 * @returns {number} valeur convertie en secondes
 */
export function convertRestToSeconds(restMinutes, restSeconds, muscleGroup) {
  if (muscleGroup !== "Cardio") {
    return parseInt(restMinutes) * 60 + parseInt(restSeconds);
  }
  return parseInt(restMinutes) * 3600 + parseInt(restSeconds) * 60;
}
