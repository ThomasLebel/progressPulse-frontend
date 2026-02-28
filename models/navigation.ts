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
  exercicesChoices: { name: string; isWorkoutAlreadyCreated?: boolean; workoutID?: string | null };
  startWorkout: { workoutID: string };
  exercice: { exerciseID: string; workoutID: string };
  timer: { exerciseID: string; workoutID: string };
  workoutEnding: { workoutID: string };
  historyWorkout: { workoutName: string };
  history: undefined;
  exerciseStats: { exerciseName: string };
  allExercises: { exercises?: { name: string; muscleGroupe: string; count: number }[]; title?: string };
  allWorkouts: { workouts?: { name: string; count: number }[] };
  exercisesByMuscle: undefined;
};
