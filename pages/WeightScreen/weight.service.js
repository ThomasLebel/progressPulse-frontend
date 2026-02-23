import moment from "moment";

/**
 * Retourne le poids de départ (premier enregistrement) ou 0 si absent.
 * @param {Array} weights - tableau des entrées de poids
 * @returns {number}
 */
export function getStartWeight(weights) {
  return weights?.length === 0 ? 0 : weights[0].weight;
}

/**
 * Retourne la date de départ formatée ou un placeholder si absente.
 * Priorise target.startDate (ajouté côté client lors de la création de l'objectif).
 * @param {Array} weights - tableau des entrées de poids
 * @param {Object} [target] - objet objectif du reducer user
 * @returns {string}
 */
export function getStartDate(weights, target) {
  if (target?.startDate) {
    return moment(target.startDate).format("Do MMM YYYY");
  }
  return weights?.length === 0
    ? "DD/MM/YYYY"
    : moment(weights[0].date).format("Do MMM YYYY");
}

/**
 * Retourne le poids actuel (dernier enregistrement) ou 0 si absent.
 * @param {Array} weights - tableau des entrées de poids
 * @returns {number}
 */
export function getCurrentWeight(weights) {
  return weights?.length === 0 ? 0 : weights.at(-1).weight;
}

/**
 * Retourne la date du dernier poids enregistré formatée ou un placeholder.
 * @param {Array} weights - tableau des entrées de poids
 * @returns {string}
 */
export function getCurrentDate(weights) {
  return weights?.length === 0
    ? "DD/MM/YYYY"
    : moment(weights.at(-1).date).format("Do MMM YYYY");
}

/**
 * Retourne le poids cible défini par l'utilisateur ou 0 si absent.
 * @param {Object} target - objet objectif du reducer user
 * @returns {number}
 */
export function getTargetWeight(target) {
  return !target.weight ? 0 : target.weight;
}

/**
 * Retourne la date objectif formatée ou un placeholder si absente.
 * @param {Object} target - objet objectif du reducer user
 * @returns {string}
 */
export function getTargetDate(target) {
  return !target.date
    ? "DD/MM/YYYY"
    : moment(target.date).format("Do MMM YYYY");
}

/**
 * Calcule la valeur de progression (échelle 0 à 1) pour les composants Progress.
 * Retourne 0 si les conditions ne sont pas remplies.
 * @param {number} initialWeight - poids de départ de l'objectif
 * @param {number} currentWeight - poids actuel
 * @param {number} targetWeight - poids cible
 * @returns {number}
 */
export function computeProgressValue(initialWeight, currentWeight, targetWeight) {
  const raw = (initialWeight - currentWeight) / (initialWeight - targetWeight);
  if (raw < 0) return 0;
  if (raw > 1) return 1;
  return raw;
}

/**
 * Calcule la valeur de progression en pourcentage (0 à 100).
 * @param {number} initialWeight - poids de départ de l'objectif
 * @param {number} currentWeight - poids actuel
 * @param {number} targetWeight - poids cible
 * @returns {number}
 */
export function computeProgressPercent(initialWeight, currentWeight, targetWeight) {
  const raw = Math.floor(
    ((initialWeight - currentWeight) * 100) / (initialWeight - targetWeight),
  );
  if (raw < 0) return 0;
  if (raw > 100) return 100;
  return raw;
}

/**
 * Trie le tableau des entrées de poids par date décroissante.
 * @param {Array} weights - tableau des entrées de poids
 * @returns {Array}
 */
export function sortWeightsByDate(weights) {
  return [...weights].sort((a, b) => new Date(b.date) - new Date(a.date));
}
