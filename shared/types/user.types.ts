export interface WeightEntry {
  weight: number;
  date: string; // ISO date string (Date serialized for Redux)
}

export interface FitnessTarget {
  weight: number;
  date: string; // ISO date string
  objectif: string;
  initialWeight: number;
}
