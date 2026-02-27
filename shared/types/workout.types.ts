import { Exercise } from './exercise.types';

export interface CustomSet {
  weight: number;
  reps: number;
}

export interface WorkoutExercise {
  exercise: Exercise;
  rest: number;
  customSets: CustomSet[];
}

export interface Workout {
  _id: string;
  name: string;
  image: string;
  exercises: WorkoutExercise[];
}
