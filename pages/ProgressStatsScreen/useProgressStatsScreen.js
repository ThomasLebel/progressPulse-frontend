import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllWorkoutsHistory } from '../../reducers/workoutsHistory';
import {
  getTotalWorkouts,
  getAverageWorkoutsPerWeek,
  getBarChartData,
  getMostFrequentExercises,
  getMostFrequentWorkouts,
  filterHistoryByPeriod,
  PERIODS,
  getChartTitle,
} from './progressStatsScreen.service';

export function useProgressStatsScreen(navigation) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const history = useSelector((state) => state.workoutsHistory.value);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user.token) return;
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/histories/${user.token}`)
      .then((res) => res.json())
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

  const handleNavigateToExercise = (exerciseName) => {
    navigation.navigate('exerciseStats', { exerciseName });
  };

  const handleNavigateToAllExercises = () => {
    navigation.navigate('allExercises', { exercises: topExercises });
  };

  const handleNavigateToAllWorkouts = () => {
    navigation.navigate('allWorkouts', { workouts: getMostFrequentWorkouts(history) });
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
    setSelectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    PERIODS,
  };
}
