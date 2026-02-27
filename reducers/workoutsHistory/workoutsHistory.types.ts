import { WorkoutHistory } from '../../shared/types';

export interface WorkoutsHistoryState {
  value: WorkoutHistory[];
}

export interface UpdateNameWorkoutHistoryPayload {
  workoutID: string;
  newName: string;
}
