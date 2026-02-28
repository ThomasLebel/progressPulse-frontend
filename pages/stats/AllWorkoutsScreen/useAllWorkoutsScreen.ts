import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../models/navigation';
import { RootState } from '../../../reducers/store.types';
import { setStatsPeriod } from '../../../reducers/user';
import {
  filterHistoryByPeriod,
  getMostFrequentWorkouts,
  PERIODS,
} from '../ProgressStatsScreen/progressStatsScreen.service';

type AllWorkoutsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'allWorkouts'>;
type AllWorkoutsRouteProp = RouteProp<RootStackParamList, 'allWorkouts'>;

export interface WorkoutItem {
  name: string;
  count: number;
}

export function useAllWorkoutsScreen(
  navigation: AllWorkoutsNavigationProp,
  route: AllWorkoutsRouteProp,
) {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.workoutsHistory.value);
  const selectedPeriod = useSelector((state: RootState) => state.user.value.statsPeriod ?? 'month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredHistory = filterHistoryByPeriod(history, selectedPeriod);
  const workouts: WorkoutItem[] = getMostFrequentWorkouts(filteredHistory);
  const maxCount = workouts.length > 0 ? workouts[0].count : 0;

  function handlePress(item: WorkoutItem) {
    navigation.navigate('historyWorkout', { workoutName: item.name });
  }

  function handleSetPeriod(period: string) {
    dispatch(setStatsPeriod(period));
    setDropdownOpen(false);
  }

  return {
    workouts,
    maxCount,
    handlePress,
    selectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    handleSetPeriod,
    PERIODS,
  };
}
