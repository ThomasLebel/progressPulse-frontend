import { useDispatch } from "react-redux";
import { resetWorkoutCreation } from "../../reducers/workoutCreation";

export function useWorkoutTypeScreen(navigation) {
  const dispatch = useDispatch();

  const handleGoHome = () => {
    navigation.navigate("Home");
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
