import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../models/navigation";
import { RootState } from "../../../reducers/store.types";
import { WorkoutHistory } from "../../../shared/types";
import { getUniqueWorkoutNames, getWorkoutSessionCounts } from "./historyScreen.service";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "history">;

export function useHistoryScreen(navigation: NavigationProp) {
  const history = useSelector((state: RootState) => state.workoutsHistory.value) as WorkoutHistory[];
  const uniqueWorkoutNames = getUniqueWorkoutNames(history);
  const sessionCounts = getWorkoutSessionCounts(history);

  function navigateToStats() {
    navigation.goBack();
  }

  function navigateToWorkout(workoutName: string) {
    navigation.navigate("historyWorkout", { workoutName });
  }

  return {
    history,
    uniqueWorkoutNames,
    sessionCounts,
    navigateToStats,
    navigateToWorkout,
  };
}
