export interface PerformanceSetInput {
  weight: number;
  reps: number;
  rest: number;
}

export interface CurrentPerformance {
  exercise: string; // exercise ObjectId
  sets: PerformanceSetInput[];
}

export interface CurrentWorkoutState {
  user: string | null;
  workout: string | null;
  date: string | null;
  note: number | null;
  ressenti: string | null;
  performances: CurrentPerformance[];
}

export interface AddWorkoutInformationPayload {
  userToken: string;
  workoutID: string;
}

export interface AddExerciseSetPayload {
  exerciseID: string;
  weight: number;
  reps: number;
  rest: number;
}

export interface AddRessentiPayload {
  note: number;
  ressenti: string;
}
