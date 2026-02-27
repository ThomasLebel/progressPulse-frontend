import { UserState } from './user/user.types';
import { Workout } from '../shared/types';
import { CurrentWorkoutState } from './currentWorkout/currentWorkout.types';
import { WorkoutHistory } from '../shared/types';

export interface RootState {
  user: { value: UserState };
  workouts: { value: Workout[] };
  currentWorkout: { value: CurrentWorkoutState };
  workoutsHistory: { value: WorkoutHistory[] };
}
