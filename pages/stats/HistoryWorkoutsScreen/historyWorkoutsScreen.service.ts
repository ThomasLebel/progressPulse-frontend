import moment from "moment";
import "moment/locale/fr";
import { WorkoutHistory, PerformanceSet } from "../../../shared/types";

moment.locale("fr");

/**
 * Filtre les entrées de l'historique par nom de séance.
 * Retourne toutes les entrées si workoutName vaut "Toutes les séances".
 */
export function filterWorkouts(history: WorkoutHistory[], workoutName: string): WorkoutHistory[] {
  if (workoutName === "Toutes les séances") {
    return history;
  }
  return history.filter((element) => element.workoutName === workoutName);
}

/**
 * Trie les entrées de séance par date, de la plus récente à la plus ancienne.
 */
export function sortWorkoutsByDate(workouts: WorkoutHistory[]): WorkoutHistory[] {
  return [...workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Formate une date en chaîne lisible via moment ("D MMMM YYYY").
 */
export function formatDate(dateStr: string): string {
  return moment(dateStr).format("D MMMM YYYY");
}

/**
 * Retourne un tableau d'indices de longueur égale à la note, pour générer les étoiles dans la vue.
 */
export function buildStarArray(note: number): number[] {
  return Array.from({ length: note }, (_, i) => i);
}

/**
 * Formate le libellé de durée d'une série cardio (heures et minutes) avec sa résistance.
 */
export function formatCardioLabel(set: PerformanceSet): string {
  const setHours = Math.floor(set.rest / 3600);
  const setMinutes = Math.floor(set.rest % 3600) / 60;
  return setHours > 0
    ? `Durée : ${setHours}h ${setMinutes}min - Résistance : ${set.weight}`
    : `Durée : ${setMinutes}min - Résistance : ${set.weight}`;
}
