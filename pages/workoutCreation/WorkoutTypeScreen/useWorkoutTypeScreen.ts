import { useDispatch } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { resetWorkoutCreation } from "../../../reducers/workoutCreation";
import { RootStackParamList } from "../../../models/navigation";

type Navigation = NativeStackNavigationProp<RootStackParamList, "WorkoutType">;

export function useWorkoutTypeScreen(navigation: Navigation) {
  const dispatch = useDispatch();

  const handleGoHome = () => {
    navigation.navigate("TabNavigator", { screen: "Home" });
  };

  const handleGoToPersonalized = () => {
    dispatch(resetWorkoutCreation());
    navigation.navigate("muscleGroup");
  };

  const handleGoToPredefined = () => {
    navigation.navigate("WorkoutDifficulty");
  };

  return {
    handleGoHome,
    handleGoToPersonalized,
    handleGoToPredefined,
  };
}
