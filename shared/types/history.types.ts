import { Exercise } from './exercise.types';

export interface PerformanceSet {
  weight: number;
  reps: number;
  rest: number;
}

export interface Performance {
  // Can be a populated Exercise object or a plain ObjectId string
  exercise: Exercise | string;
  sets: PerformanceSet[];
}

export interface WorkoutHistory {
  _id: string;
  user: string;
  name: string;
  performances: Performance[];
  date: string; // ISO date string (Date serialized for Redux)
  note: number;
  ressenti: string;
  workoutName: string;
  workoutID: string;
}
