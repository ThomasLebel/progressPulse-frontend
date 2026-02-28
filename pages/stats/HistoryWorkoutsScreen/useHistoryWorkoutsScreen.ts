import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../models/navigation";
import { RootState } from "../../../reducers/store.types";
import { WorkoutHistory } from "../../../shared/types";
import { filterWorkouts, sortWorkoutsByDate } from "./historyWorkoutsScreen.service";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "historyWorkout">;
type RouteType = RouteProp<RootStackParamList, "historyWorkout">;

export function useHistoryWorkoutsScreen(navigation: NavigationProp, route: RouteType) {
  const { workoutName } = route.params;
  const history = useSelector((state: RootState) => state.workoutsHistory.value);

  const sortedWorkouts: WorkoutHistory[] = sortWorkoutsByDate(filterWorkouts(history, workoutName));

  function navigateBack() {
    navigation.goBack();
  }

  return {
    workoutName,
    sortedWorkouts,
    navigateBack,
  };
}
