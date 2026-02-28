import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../models/navigation';
import { RootState } from '../../../reducers/store.types';
import { setStatsPeriod } from '../../../reducers/user';
import {
  filterHistoryByPeriod,
  getMostFrequentExercises,
  PERIODS,
} from '../ProgressStatsScreen/progressStatsScreen.service';

type AllExercisesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'allExercises'>;
type AllExercisesRouteProp = RouteProp<RootStackParamList, 'allExercises'>;

export interface ExerciseItem {
  name: string;
  muscleGroupe: string;
  count: number;
}

export function useAllExercisesScreen(
  navigation: AllExercisesNavigationProp,
  route: AllExercisesRouteProp,
) {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.workoutsHistory.value);
  const selectedPeriod = useSelector((state: RootState) => state.user.value.statsPeriod ?? 'month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const title: string = route.params?.title ?? 'Tous les exercices';

  const filteredHistory = filterHistoryByPeriod(history, selectedPeriod);
  const allExercises: ExerciseItem[] = getMostFrequentExercises(filteredHistory);
  const muscleGroup = route.params?.muscleGroup;
  const exercises: ExerciseItem[] = muscleGroup
    ? allExercises.filter((e) => e.muscleGroupe?.toLowerCase() === muscleGroup.toLowerCase())
    : allExercises;
  const maxCount = exercises.length > 0 ? exercises[0].count : 0;

  function handlePress(item: ExerciseItem) {
    navigation.navigate('exerciseStats', { exerciseName: item.name });
  }

  function handleSetPeriod(period: string) {
    dispatch(setStatsPeriod(period));
    setDropdownOpen(false);
  }

  return {
    exercises,
    title,
    maxCount,
    handlePress,
    selectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    handleSetPeriod,
    PERIODS,
  };
}
