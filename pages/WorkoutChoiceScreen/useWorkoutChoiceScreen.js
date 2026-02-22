import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addAllExercise,
  resetWorkoutCreation,
} from "../../reducers/workoutCreation";
import imagesWorkout from "../../utils/imagesWorkout";
import {
  calculateWorkoutTime,
  formatExerciseCount,
  findWorkoutImage,
  buildExercisesToAdd,
} from "./workoutChoice.service";

export function useWorkoutChoiceScreen(navigation, route) {
  const { name } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/workouts/byDifficulty/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data.data);
        setIsLoading(false);
      });
  }, []);

  const handleNavigateToSummary = (exercicesData) => {
    dispatch(resetWorkoutCreation());
    const exercisesToAdd = buildExercisesToAdd(exercicesData);
    dispatch(addAllExercise(exercisesToAdd));
    navigation.navigate("workoutSummary", {
      backTo: "workoutChoice",
      name,
    });
  };

  const handleBack = () => navigation.navigate("WorkoutDifficulty");

  const workoutItems = workouts.map((data, i) => ({
    key: i,
    name: data.name,
    time: calculateWorkoutTime(data.exercices) + " min",
    nbExercise: formatExerciseCount(data.exercices.length),
    image: findWorkoutImage(data.image, imagesWorkout),
    onPress: () => handleNavigateToSummary(data.exercices),
  }));

  return {
    name,
    isLoading,
    workoutItems,
    handleBack,
  };
}
