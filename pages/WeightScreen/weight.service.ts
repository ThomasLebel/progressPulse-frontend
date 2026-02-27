import moment from 'moment';
import { FitnessTarget, WeightEntry } from '../../shared/types';

/**
 * Retourne le poids de départ (premier enregistrement) ou 0 si absent.
 */
export function getStartWeight(weights: WeightEntry[]): number {
  return weights?.length === 0 ? 0 : weights[0].weight;
}

/**
 * Retourne la date de départ formatée ou un placeholder si absente.
 * Priorise target.startDate (ajouté côté client lors de la création de l'objectif).
 */
export function getStartDate(weights: WeightEntry[], target?: Partial<FitnessTarget> & { startDate?: string }): string {
  if (target?.startDate) {
    return moment(target.startDate).format('Do MMM YYYY');
  }
  return weights?.length === 0
    ? 'DD/MM/YYYY'
    : moment(weights[0].date).format('Do MMM YYYY');
}

/**
 * Retourne le poids actuel (dernier enregistrement) ou 0 si absent.
 */
export function getCurrentWeight(weights: WeightEntry[]): number {
  return weights?.length === 0 ? 0 : weights.at(-1)!.weight;
}

/**
 * Retourne la date du dernier poids enregistré formatée ou un placeholder.
 */
export function getCurrentDate(weights: WeightEntry[]): string {
  return weights?.length === 0
    ? 'DD/MM/YYYY'
    : moment(weights.at(-1)!.date).format('Do MMM YYYY');
}

/**
 * Retourne le poids cible défini par l'utilisateur ou 0 si absent.
 */
export function getTargetWeight(target: Partial<FitnessTarget>): number {
  return !target.weight ? 0 : target.weight;
}

/**
 * Retourne la date objectif formatée ou un placeholder si absente.
 */
export function getTargetDate(target: Partial<FitnessTarget>): string {
  return !target.date
    ? 'DD/MM/YYYY'
    : moment(target.date).format('Do MMM YYYY');
}

/**
 * Calcule la valeur de progression (échelle 0 à 1) pour les composants Progress.
 * Retourne 0 si les conditions ne sont pas remplies.
 */
export function computeProgressValue(
  initialWeight: number,
  currentWeight: number,
  targetWeight: number,
): number {
  const raw = (initialWeight - currentWeight) / (initialWeight - targetWeight);
  if (raw < 0) return 0;
  if (raw > 1) return 1;
  return raw;
}

/**
 * Calcule la valeur de progression en pourcentage (0 à 100).
 */
export function computeProgressPercent(
  initialWeight: number,
  currentWeight: number,
  targetWeight: number,
): number {
  const raw = Math.floor(
    ((initialWeight - currentWeight) * 100) / (initialWeight - targetWeight),
  );
  if (raw < 0) return 0;
  if (raw > 100) return 100;
  return raw;
}

/**
 * Trie le tableau des entrées de poids par date décroissante.
 */
export function sortWeightsByDate(weights: WeightEntry[]): WeightEntry[] {
  return [...weights].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export interface WeightChartPoint {
  value: number;
  originalValue: number;
  label: string;
  date: string;
}

/**
 * Retourne les points de données pour le graphique gifted-charts (15 derniers max).
 * Les valeurs sont normalisées (min soustrait) pour que l'axe Y parte de 0.
 */
export function getWeightChartPoints(weights: WeightEntry[]): {
  points: WeightChartPoint[];
  minValue: number;
} {
  if (!weights || weights.length === 0) return { points: [], minValue: 0 };
  const sorted = [...weights]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-15);
  const minValue = Math.min(...sorted.map((e) => e.weight));
  const points = sorted.map((entry) => ({
    value: parseFloat((entry.weight - minValue).toFixed(1)),
    originalValue: entry.weight,
    label: moment(entry.date).format('DD/MM'),
    date: moment(entry.date).format('Do MMM YYYY'),
  }));
  return { points, minValue };
}
