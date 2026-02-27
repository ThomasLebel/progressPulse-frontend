import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../models/navigation";
import { getDifficultyOptions } from "./workoutDifficultyScreen.service";

type Navigation = NativeStackNavigationProp<RootStackParamList, "WorkoutDifficulty">;

export function useWorkoutDifficultyScreen(navigation: Navigation) {
  const difficultyOptions = getDifficultyOptions();

  const handleNavigateToWorkout = (name: string) => {
    navigation.navigate("workoutChoice", { name });
  };

  const handleGoBack = () => {
    navigation.navigate("WorkoutType");
  };

  return { difficultyOptions, handleNavigateToWorkout, handleGoBack };
}
