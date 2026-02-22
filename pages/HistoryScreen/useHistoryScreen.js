import { useSelector } from "react-redux";
import { getUniqueWorkoutNames } from "./historyScreen.service";

export function useHistoryScreen(navigation) {
  const history = useSelector((state) => state.workoutsHistory.value);
  const uniqueWorkoutNames = getUniqueWorkoutNames(history);

  function navigateToStats() {
    navigation.navigate("Stats");
  }

  function navigateToWorkout(workoutName) {
    navigation.navigate("historyWorkout", { workoutName });
  }

  return {
    history,
    uniqueWorkoutNames,
    navigateToStats,
    navigateToWorkout,
  };
}
