import { COLORS } from "../../constants/theme";

/**
 * Génère les données d'affichage pour les étoiles de notation.
 * Retourne un tableau de 5 objets avec la couleur et le nom de l'icône pour chaque étoile.
 * @param {number} personnalNote - Note actuelle (0 à 5)
 * @returns {{ color: string, name: string }[]}
 */
export function buildStarsData(personnalNote) {
  const stars = [];
  for (let star = 0; star < 5; star++) {
    stars.push({
      color: star < personnalNote ? COLORS.primary : "#ffffff",
      name: star < personnalNote ? "star" : "star-o",
    });
  }
  return stars;
}

/**
 * Construit l'objet payload à envoyer à l'API pour enregistrer la séance.
 * @param {object} currentWorkout - Données de la séance en cours
 * @param {number} note - Note personnelle (0 à 5)
 * @param {string} ressenti - Ressenti textuel de l'utilisateur
 * @returns {object}
 */
export function buildWorkoutPayload(currentWorkout, note, ressenti) {
  return { ...currentWorkout, note, ressenti };
}
