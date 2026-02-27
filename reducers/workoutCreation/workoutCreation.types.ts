import { CustomSet } from '../../shared/types';

export interface WorkoutExerciseCreation {
  exercise: string; // exercise ObjectId
  exerciseName: string;
  muscleGroup: string;
  rest: number;
  customSets: CustomSet[];
  imagePath: string;
}

export interface WorkoutCreationState {
  name: string | null;
  exercises: WorkoutExerciseCreation[];
}

export interface UpdateCustomSetsPayload {
  exerciseID: string;
  newSets: CustomSet[];
  rest: number;
}
