import { useSelector } from "react-redux";
import { filterWorkouts, sortWorkoutsByDate } from "./historyWorkoutsScreen.service";

export function useHistoryWorkoutsScreen(navigation, route) {
  const { workoutName } = route.params;
  const history = useSelector((state) => state.workoutsHistory.value);

  const sortedWorkouts = sortWorkoutsByDate(filterWorkouts(history, workoutName));

  function navigateBack() {
    navigation.goBack();
  }

  return {
    workoutName,
    sortedWorkouts,
    navigateBack,
  };
}
