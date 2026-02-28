export interface WeightEntry {
  weight: number;
  date: string; // ISO date string (Date serialized for Redux)
}

export interface FitnessTarget {
  weight: number;
  date: string; // ISO date string (target date)
  objectif: string;
  initialWeight: number;
  startDate?: string; // ISO date string (when the goal was set)
}
