import { useSelector } from 'react-redux';
import { getMostFrequentExercises } from '../ProgressStatsScreen/progressStatsScreen.service';

export function useExercisesByMuscleScreen(navigation) {
  const history = useSelector((state) => state.workoutsHistory.value);
  const allExercises = getMostFrequentExercises(history);

  function handleSelectMuscleGroup(muscleGroup) {
    const filtered = allExercises.filter(
      (e) => e.muscleGroupe?.toLowerCase() === muscleGroup.toLowerCase()
    );
    navigation.navigate('allExercises', {
      exercises: filtered,
      title: muscleGroup,
    });
  }

  function handleSelectAll() {
    navigation.navigate('allExercises', {
      exercises: allExercises,
      title: 'Tous les groupes',
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  return { handleSelectMuscleGroup, handleSelectAll, handleBack };
}
