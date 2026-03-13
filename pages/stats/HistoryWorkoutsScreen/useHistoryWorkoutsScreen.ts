import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../models/navigation";
import { RootState } from "../../../reducers/store.types";
import { setStatsPeriod } from "../../../reducers/user";
import { WorkoutHistory } from "../../../shared/types";
import {
  PERIODS,
  filterHistoryByPeriod,
} from "../ProgressStatsScreen/progressStatsScreen.service";
import { filterWorkouts, sortWorkoutsByDate } from "./historyWorkoutsScreen.service";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "historyWorkout">;
type RouteType = RouteProp<RootStackParamList, "historyWorkout">;

export function useHistoryWorkoutsScreen(navigation: NavigationProp, route: RouteType) {
  const { workoutName } = route.params;
  const dispatch = useDispatch();

  const history = useSelector((state: RootState) => state.workoutsHistory.value);
  const selectedPeriod = useSelector((state: RootState) => state.user.value.statsPeriod) ?? "all";

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const byName = filterWorkouts(history, workoutName);
  const byPeriod = filterHistoryByPeriod(byName, selectedPeriod);
  const sortedWorkouts: WorkoutHistory[] = sortWorkoutsByDate(byPeriod);

  function navigateBack() {
    navigation.goBack();
  }

  function handleSetPeriod(period: string) {
    dispatch(setStatsPeriod(period));
    setDropdownOpen(false);
  }

  return {
    workoutName,
    sortedWorkouts,
    totalCount: byName.length,
    navigateBack,
    selectedPeriod,
    PERIODS,
    dropdownOpen,
    setDropdownOpen,
    handleSetPeriod,
  };
}
