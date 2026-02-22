import moment from "moment";

/**
 * Récupère les 8 dernières entrées de poids triées par date croissante.
 * Retourne un tableau vide si l'historique de poids est vide.
 */
export function getLastEightWeights(weightHistory) {
  if (weightHistory.length === 0) return [];
  return [...weightHistory]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Extrait les valeurs de poids pour le graphique linéaire.
 */
export function getWeightsForChart(lastWeights) {
  return lastWeights.map((element) => element.weight);
}

/**
 * Extrait les labels de dates au format "DD-MM" pour le graphique linéaire.
 */
export function getLabelsForLineChart(lastWeights) {
  return lastWeights.map((element) => moment(element.date).format("DD-MM"));
}

/**
 * Regroupe les séances par mois (format "MMM YY") et compte leur nombre.
 */
export function getWorkoutsByMonth(data) {
  const months = {};
  data.forEach((element) => {
    console.log(element.date);
    const month = moment(element.date).format("MMM YY");

    if (months[month]) {
      months[month] += 1;
    } else {
      months[month] = 1;
    }
  });
  return months;
}

/**
 * Récupère les 8 premières séances triées par date croissante.
 */
export function getLastEightMonths(history) {
  return [...history]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8);
}
