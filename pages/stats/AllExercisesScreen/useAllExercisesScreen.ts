import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../models/navigation";

type AllExercisesNavigationProp = NativeStackNavigationProp<RootStackParamList, "allExercises">;
type AllExercisesRouteProp = RouteProp<RootStackParamList, "allExercises">;

export interface ExerciseItem {
  name: string;
  muscleGroupe: string;
  count: number;
}

export function useAllExercisesScreen(
  navigation: AllExercisesNavigationProp,
  route: AllExercisesRouteProp,
) {
  const exercises: ExerciseItem[] = route.params?.exercises ?? [];
  const title: string = route.params?.title ?? "Tous les exercices";
  const maxCount = exercises.length > 0 ? exercises[0].count : 0;

  function handlePress(item: ExerciseItem) {
    navigation.navigate("exerciseStats", { exerciseName: item.name });
  }

  return { exercises, title, maxCount, handlePress };
}
