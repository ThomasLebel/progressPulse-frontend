export function useAllWorkoutsScreen(navigation, route) {
  const workouts = route.params?.workouts ?? [];
  const maxCount = workouts.length > 0 ? workouts[0].count : 0;

  function handlePress(item) {
    navigation.navigate("historyWorkout", { workoutName: item.name });
  }

  return { workouts, maxCount, handlePress };
}
