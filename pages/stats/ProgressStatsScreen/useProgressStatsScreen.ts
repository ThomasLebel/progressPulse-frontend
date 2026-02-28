import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addAllWorkoutsHistory } from '../../../reducers/workoutsHistory';
import { setStatsPeriod } from '../../../reducers/user';
import { RootStackParamList } from '../../../models/navigation';
import { RootState } from '../../../reducers/store.types';
import { apiFetchHistories } from './progressStatsScreen.api';
import {
  filterHistoryByPeriod,
  getAverageWorkoutsPerWeek,
  getBarChartData,
  getChartTitle,
  getMostFrequentExercises,
  getMostFrequentWorkouts,
  getTotalWorkouts,
  PERIODS,
} from './progressStatsScreen.service';

export function useProgressStatsScreen(navigation: NativeStackNavigationProp<RootStackParamList>) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const history = useSelector((state: RootState) => state.workoutsHistory.value);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedPeriod = user.statsPeriod ?? 'month';

  useEffect(() => {
    if (!user.token) return;
    setIsLoading(true);
    apiFetchHistories(user.token)
      .then((data) => {
        if (data.histories) {
          dispatch(addAllWorkoutsHistory(data.histories));
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredHistory = filterHistoryByPeriod(history, selectedPeriod);
  const totalWorkouts = getTotalWorkouts(filteredHistory);
  const avgWorkoutsPerWeek = getAverageWorkoutsPerWeek(filteredHistory);
  const barChartData = getBarChartData(filteredHistory, selectedPeriod);
  const chartTitle = getChartTitle(selectedPeriod);
  const topExercises = getMostFrequentExercises(filteredHistory);
  const topWorkouts = getMostFrequentWorkouts(filteredHistory);

  const handleNavigateToExercise = (exerciseName: string) => {
    navigation.navigate('exerciseStats', { exerciseName });
  };

  const handleNavigateToAllExercises = () => {
    navigation.navigate('allExercises', {});
  };

  const handleNavigateToAllWorkouts = () => {
    navigation.navigate('allWorkouts', {});
  };

  const handleNavigateToExercisesByMuscle = () => {
    navigation.navigate('exercisesByMuscle');
  };

  return {
    isLoading,
    totalWorkouts,
    avgWorkoutsPerWeek,
    barChartData,
    chartTitle,
    topExercises,
    topWorkouts,
    handleNavigateToExercise,
    handleNavigateToAllExercises,
    handleNavigateToAllWorkouts,
    handleNavigateToExercisesByMuscle,
    selectedPeriod,
    setSelectedPeriod: (period: string) => dispatch(setStatsPeriod(period)),
    dropdownOpen,
    setDropdownOpen,
    PERIODS,
  };
}
