import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../models/navigation";

type ExercisesByMuscleNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "exercisesByMuscle"
>;

export function useExercisesByMuscleScreen(
  navigation: ExercisesByMuscleNavigationProp,
) {

  function handleSelectMuscleGroup(muscleGroup: string) {
    navigation.navigate("allExercises", {
      muscleGroup,
      title: muscleGroup,
    });
  }

  function handleSelectAll() {
    navigation.navigate("allExercises", { title: "Tous les groupes" });
  }

  function handleBack() {
    navigation.goBack();
  }

  return { handleSelectMuscleGroup, handleSelectAll, handleBack };
}
