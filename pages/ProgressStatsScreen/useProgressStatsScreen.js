import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllWorkoutsHistory } from '../../reducers/workoutsHistory';
import {
  getTotalWorkouts,
  getAverageWorkoutsPerWeek,
  getBarChartData,
  getBarPercentage,
  getMostFrequentExercises,
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
  const barPercentage = getBarPercentage(selectedPeriod);
  const topExercises = getMostFrequentExercises(filteredHistory);

  const handleNavigateToExercise = (exerciseName) => {
    navigation.navigate('exerciseStats', { exerciseName });
  };

  return {
    isLoading,
    totalWorkouts,
    avgWorkoutsPerWeek,
    barChartData,
    chartTitle,
    barPercentage,
    topExercises,
    handleNavigateToExercise,
    selectedPeriod,
    setSelectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    PERIODS,
  };
}
