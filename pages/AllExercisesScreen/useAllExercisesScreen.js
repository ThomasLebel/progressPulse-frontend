export function useAllExercisesScreen(navigation, route) {
  const exercises = route.params?.exercises ?? [];
  const maxCount = exercises.length > 0 ? exercises[0].count : 0;

  function handlePress(item) {
    navigation.navigate("exerciseStats", { exerciseName: item.name });
  }

  return { exercises, maxCount, handlePress };
}
