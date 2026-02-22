import { getDifficultyOptions } from "./workoutDifficultyScreen.service";

export function useWorkoutDifficultyScreen(navigation) {
  const difficultyOptions = getDifficultyOptions();

  const handleNavigateToWorkout = (name) => {
    navigation.navigate("workoutChoice", { name });
  };

  const handleGoBack = () => {
    navigation.navigate("WorkoutType");
  };

  return { difficultyOptions, handleNavigateToWorkout, handleGoBack };
}
