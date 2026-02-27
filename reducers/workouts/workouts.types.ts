import { Workout, WorkoutExercise, CustomSet } from '../../shared/types';

export interface WorkoutsState {
  value: Workout[];
}

export interface UpdateWorkoutSetsPayload {
  workoutID: string;
  exerciseID: string;
  customSets: CustomSet[];
  rest: number;
}

export interface RemoveExercisePayload {
  workoutID: string;
  exerciseID: string;
}

export interface UpdateWorkoutNamePayload {
  workoutID: string;
  newName: string;
}

export interface UpdateWorkoutImagePayload {
  workoutID: string;
  newImage: string;
}

export interface UpdateExercisesPayload {
  workoutID: string;
  exercisesToUpdate: WorkoutExercise[];
}
