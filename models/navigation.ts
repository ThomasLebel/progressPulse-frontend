import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Weight: undefined;
  ProgressStats: undefined;
  Home: undefined;
  Settings: undefined;
  LogoutAction: undefined;
};

export type RootStackParamList = {
  Signin: undefined;
  passwordForgotten: undefined;
  Signup: undefined;
  TabNavigator: NavigatorScreenParams<TabParamList> | undefined;
  song: undefined;
  WorkoutType: undefined;
  WorkoutDifficulty: undefined;
  workoutChoice: { name: string };
  workoutSummary: { backTo: string; name?: string; categorie?: Record<string, unknown> };
  muscleGroup: { isWorkoutAlreadyCreated?: boolean; workoutID?: string } | undefined;
  exercicesChoices: undefined;
  startWorkout: { workoutID: string };
  exercice: { exerciseID: string; workoutID: string };
  timer: { exerciseID: string; workoutID: string };
  workoutEnding: { workoutID: string };
  historyWorkout: undefined;
  history: undefined;
  exerciseStats: { exerciseName: string };
  allExercises: undefined;
  allWorkouts: undefined;
  exercisesByMuscle: undefined;
};
