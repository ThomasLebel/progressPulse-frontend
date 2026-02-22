import { useSelector } from "react-redux";
import { getExercisesLength, getFinishButtonLabel, getFinishButtonWidth } from "./muscleGroup.service";

export function useMuscleGroupScreen(navigation, route) {
  const { isWorkoutAlreadyCreated = false, workoutID = null } = route.params || {};

  const workoutCreationLength = useSelector(
    (state) => state.workoutCreation.value.exercises.length
  );
  const workouts = useSelector((state) => state.workouts.value);

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
      navigation.navigate("startWorkout", { workoutID });
    }
  };

  const handleNavigateToExercice = (name) => {
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
