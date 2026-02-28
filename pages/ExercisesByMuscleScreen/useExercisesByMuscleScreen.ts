import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootState } from "../../reducers/store.types";
import { RootStackParamList } from "../../models/navigation";
import { getMostFrequentExercises } from "../ProgressStatsScreen/progressStatsScreen.service";

type ExercisesByMuscleNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "exercisesByMuscle"
>;

export function useExercisesByMuscleScreen(
  navigation: ExercisesByMuscleNavigationProp,
) {
  const history = useSelector((state: RootState) => state.workoutsHistory.value);
  const allExercises = getMostFrequentExercises(history);

  function handleSelectMuscleGroup(muscleGroup: string) {
    const filtered = allExercises.filter(
      (e) => e.muscleGroupe?.toLowerCase() === muscleGroup.toLowerCase(),
    );
    navigation.navigate("allExercises", {
      exercises: filtered,
      title: muscleGroup,
    });
  }

  function handleSelectAll() {
    navigation.navigate("allExercises", {
      exercises: allExercises,
      title: "Tous les groupes",
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  return { handleSelectMuscleGroup, handleSelectAll, handleBack };
}
