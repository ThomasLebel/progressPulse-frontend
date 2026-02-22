/**
 * Regroupe les exercices par groupe musculaire.
 * @param {Array} exercises - Liste des exercices
 * @returns {Object} Exercices regroupés par groupe musculaire
 */
export function groupExercisesByMuscleGroup(exercises) {
  return exercises.reduce((groups, exercise) => {
    const { muscleGroup } = exercise;
    if (!groups[muscleGroup]) {
      groups[muscleGroup] = [];
    }
    groups[muscleGroup].push(exercise);
    return groups;
  }, {});
}

/**
 * Convertit le temps de repos stocké en minutes et secondes pour l'affichage.
 * @param {number} rest - Temps de repos stocké (en secondes)
 * @param {string} muscleGroup - Groupe musculaire
 * @returns {{ minutes: number, seconds: number }}
 */
export function convertRestForDisplay(rest, muscleGroup) {
  if (muscleGroup !== "Cardio") {
    return {
      minutes: Math.floor(rest / 60),
      seconds: rest % 60,
    };
  } else {
    return {
      minutes: Math.floor(rest / 3600),
      seconds: Math.floor((rest % 3600) / 60),
    };
  }
}

/**
 * Convertit les minutes et secondes saisies en valeur stockable selon le groupe musculaire.
 * @param {string} restMinutes - Minutes saisies
 * @param {string} restSeconds - Secondes saisies
 * @param {string} muscleGroup - Groupe musculaire
 * @returns {number} Valeur de repos convertie
 */
export function convertRestForStorage(restMinutes, restSeconds, muscleGroup) {
  if (muscleGroup !== "Cardio") {
    return parseInt(restMinutes) * 60 + parseInt(restSeconds);
  } else {
    return parseInt(restMinutes) * 3600 + parseInt(restSeconds) * 60;
  }
}

/**
 * Construit un tableau de séries personnalisées à partir des paramètres saisis.
 * @param {string} nbSets - Nombre de séries
 * @param {string} charge - Charge en kg
 * @param {string} nbReps - Nombre de répétitions
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
 * Construit le payload à envoyer à l'API pour créer une séance.
 * @param {string} userToken - Token de l'utilisateur
 * @param {string} workoutName - Nom de la séance
 * @param {Array} exercises - Liste des exercices
 * @param {string} imageName - Nom de l'image associée
 * @returns {Object} Payload formaté pour l'API
 */
export function buildWorkoutPayload(userToken, workoutName, exercises, imageName) {
  const exercices = exercises.map((exercise) => ({
    exercise: exercise.exercise,
    rest: exercise.rest,
    customSets: exercise.customSets,
  }));
  return {
    userToken,
    name: workoutName,
    exercices,
    image: imageName,
  };
}

/**
 * Retourne un index aléatoire dans la liste des images de séance.
 * @param {number} imagesLength - Longueur de la liste d'images
 * @returns {number} Index aléatoire
 */
export function getRandomImageIndex(imagesLength) {
  return Math.floor(Math.random() * imagesLength);
}
