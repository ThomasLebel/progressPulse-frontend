import { useSelector } from "react-redux";
import imagesWorkout from "../../utils/imagesWorkout";
import {
  calculateWorkoutDuration,
  findWorkoutImage,
  formatExerciseCount,
} from "./homeScreen.service";

export function useHomeScreen(navigation) {
  const user = useSelector((state) => state.user.value);
  const workouts = useSelector((state) => state.workouts.value);

  const workoutsDisplayData = workouts.map((workout) => ({
    _id: workout._id,
    name: workout.name,
    image: findWorkoutImage(workout.image, imagesWorkout),
    nbExercises: formatExerciseCount(workout.exercises.length),
    duration: calculateWorkoutDuration(workout.exercises),
  }));

  const handleAddWorkout = () => navigation.navigate("WorkoutType");

  const handleWorkoutNavigation = (workoutID) =>
    navigation.navigate("startWorkout", { workoutID });

  return {
    user,
    workouts,
    workoutsDisplayData,
    handleAddWorkout,
    handleWorkoutNavigation,
  };
}
