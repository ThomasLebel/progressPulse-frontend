import { COLORS } from "../../../constants/theme";
import { CurrentWorkoutState } from "../../../reducers/currentWorkout/currentWorkout.types";

export interface StarData {
  color: string;
  name: string;
}

/**
 * Génère les données d'affichage pour les étoiles de notation.
 */
export function buildStarsData(personnalNote: number): StarData[] {
  const stars: StarData[] = [];
  for (let star = 0; star < 5; star++) {
    stars.push({
      color: star < personnalNote ? COLORS.primary : "#ffffff",
      name: star < personnalNote ? "star" : "star-o",
    });
  }
  return stars;
}

export interface WorkoutEndingPayload extends CurrentWorkoutState {
  note: number;
  ressenti: string;
}

/**
 * Construit l'objet payload à envoyer à l'API pour enregistrer la séance.
 */
export function buildWorkoutPayload(
  currentWorkout: CurrentWorkoutState,
  note: number,
  ressenti: string
): WorkoutEndingPayload {
  return { ...currentWorkout, note, ressenti };
}
