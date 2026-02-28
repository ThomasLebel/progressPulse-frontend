import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import {
  addAllExercise,
  resetWorkoutCreation,
} from "../../../reducers/workoutCreation";
import imagesWorkout from "../../../utils/imagesWorkout";
import { RootStackParamList } from "../../../models/navigation";
import { fetchWorkoutsByDifficulty, WorkoutAPI } from "./workoutChoice.api";
import {
  calculateWorkoutTime,
  formatExerciseCount,
  findWorkoutImage,
  buildExercisesToAdd,
} from "./workoutChoice.service";

type Navigation = NativeStackNavigationProp<RootStackParamList, "workoutChoice">;
type Route = RouteProp<RootStackParamList, "workoutChoice">;

type WorkoutItem = {
  key: number;
  name: string;
  time: string;
  nbExercise: string;
  image: { name: string; source: unknown }[];
  onPress: () => void;
};

export function useWorkoutChoiceScreen(navigation: Navigation, route: Route) {
  const { name } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutAPI[]>([]);

  useEffect(() => {
    setIsLoading(true);
    fetchWorkoutsByDifficulty(name).then((data) => {
      setWorkouts(data);
      setIsLoading(false);
    });
  }, []);

  const handleNavigateToSummary = (exercicesData: WorkoutAPI["exercices"]) => {
    dispatch(resetWorkoutCreation());
    const exercisesToAdd = buildExercisesToAdd(exercicesData);
    dispatch(addAllExercise(exercisesToAdd));
    navigation.navigate("workoutSummary", {
      backTo: "workoutChoice",
      name,
    });
  };

  const handleBack = () => navigation.navigate("WorkoutDifficulty");

  const workoutItems: WorkoutItem[] = workouts.map((data, i) => ({
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
