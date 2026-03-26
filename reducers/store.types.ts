import { UserState } from './user/user.types';
import { Workout } from '../shared/types';
import { CurrentWorkoutState } from './currentWorkout/currentWorkout.types';
import { WorkoutHistory } from '../shared/types';
import { WorkoutCreationState } from './workoutCreation/workoutCreation.types';
import { TimerState } from './timer/timer.types';

export interface RootState {
  user: { value: UserState };
  workouts: { value: Workout[] };
  workoutCreation: { value: WorkoutCreationState };
  currentWorkout: { value: CurrentWorkoutState };
  workoutsHistory: { value: WorkoutHistory[] };
  timer: { value: TimerState };
}
