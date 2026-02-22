import images from "../../utils/images";

/**
 * Calcule la durée estimée d'une séance en minutes à partir de ses exercices.
 */
export function calculateWorkoutTime(exercises) {
  let times = 0;
  for (let i = 0; i < exercises.length; i++) {
    times +=
      (exercises[i].sets.length * exercises[i].rest +
        exercises[i].sets.length * 30) /
      60;
  }
  return Math.round(times);
}

/**
 * Formate le nombre d'exercices en chaîne affichable.
 */
export function formatExerciseCount(count) {
  return count + " exercices";
}

/**
 * Recherche la source d'image correspondant au nom d'image donné dans la liste des images de séance.
 */
export function findWorkoutImage(imageName, imageList) {
  return imageList.filter((imageWorkout) => {
    if (imageWorkout.name === imageName) {
      return imageWorkout.source;
    }
  });
}

/**
 * Construit la liste des exercices formatés pour le dispatch Redux à partir des données brutes de la séance.
 */
export function buildExercisesToAdd(exercicesData) {
  return exercicesData.map((exercise) => {
    const customSets = exercise.sets.map((set) => ({
      weight: set.weight,
      reps: set.rep,
    }));
    const imagePath =
      images[exercise.exercice.muscleGroupe.toLowerCase()][
        exercise.exercice.image
      ];
    return {
      exercise: exercise.exercice._id,
      exerciseName: exercise.exercice.name,
      muscleGroup: exercise.exercice.muscleGroupe,
      rest: exercise.rest,
      customSets,
      imagePath,
    };
  });
}
