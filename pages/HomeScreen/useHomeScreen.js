import { useSelector } from "react-redux";
import {
  calculateWorkoutDuration,
  formatExerciseCount,
} from "./homeScreen.service";

export function useHomeScreen(navigation) {
  const user = useSelector((state) => state.user.value);
  const workouts = useSelector((state) => state.workouts.value);
  const currentWorkout = useSelector((state) => state.currentWorkout.value);

  const workoutsDisplayData = workouts.map((workout) => ({
    _id: workout._id,
    name: workout.name,
    image: workout.image,
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
    currentWorkoutID: currentWorkout.workout,
    handleAddWorkout,
    handleWorkoutNavigation,
  };
}
