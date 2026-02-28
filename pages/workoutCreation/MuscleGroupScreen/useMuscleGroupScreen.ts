import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../models/navigation";
import { RootState } from "../../../reducers/store.types";
import {
  getExercisesLength,
  getFinishButtonLabel,
  getFinishButtonWidth,
} from "./muscleGroup.service";

type MuscleGroupNavProp = NativeStackNavigationProp<RootStackParamList, "muscleGroup">;
type MuscleGroupRouteProp = RouteProp<RootStackParamList, "muscleGroup">;

export function useMuscleGroupScreen(
  navigation: MuscleGroupNavProp,
  route: MuscleGroupRouteProp
) {
  const { isWorkoutAlreadyCreated = false, workoutID = null } = route.params || {};

  const workoutCreationLength = useSelector(
    (state: RootState) => state.workoutCreation.value.exercises.length
  );
  const workouts = useSelector((state: RootState) => state.workouts.value);

  const exercisesLength = getExercisesLength(
    isWorkoutAlreadyCreated,
    workoutCreationLength,
    workouts,
    workoutID
  );

  const finishButtonLabel = getFinishButtonLabel(isWorkoutAlreadyCreated);
  const finishButtonWidth = getFinishButtonWidth(isWorkoutAlreadyCreated);

  const handleFinish = () => {
    if (!isWorkoutAlreadyCreated) {
      navigation.navigate("workoutSummary", { backTo: "muscleGroup" });
    } else {
      navigation.navigate("startWorkout", { workoutID: workoutID! });
    }
  };

  const handleNavigateToExercice = (name: string) => {
    navigation.navigate("exercicesChoices", { name, isWorkoutAlreadyCreated, workoutID });
  };

  const handleBack = () => {
    navigation.navigate("WorkoutType");
  };

  return {
    isWorkoutAlreadyCreated,
    exercisesLength,
    finishButtonLabel,
    finishButtonWidth,
    handleFinish,
    handleNavigateToExercice,
    handleBack,
  };
}
