import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../models/navigation";

type AllWorkoutsNavigationProp = NativeStackNavigationProp<RootStackParamList, "allWorkouts">;
type AllWorkoutsRouteProp = RouteProp<RootStackParamList, "allWorkouts">;

export interface WorkoutItem {
  name: string;
  count: number;
}

export function useAllWorkoutsScreen(
  navigation: AllWorkoutsNavigationProp,
  route: AllWorkoutsRouteProp,
) {
  const workouts: WorkoutItem[] = route.params?.workouts ?? [];
  const maxCount = workouts.length > 0 ? workouts[0].count : 0;

  function handlePress(item: WorkoutItem) {
    navigation.navigate("historyWorkout", { workoutName: item.name });
  }

  return { workouts, maxCount, handlePress };
}
