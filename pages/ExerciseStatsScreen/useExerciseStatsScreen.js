import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  filterHistoryByPeriod,
  PERIODS,
} from '../ProgressStatsScreen/progressStatsScreen.service';
import {
  getSessionsForExercise,
  getTotalVolume,
  getVolumeProgressionChart,
  getAverageVolumePerSession,
  getLastPerformances,
  getBestPerformance,
  getVolumeProgression,
} from './exerciseStatsScreen.service';

export function useExerciseStatsScreen(navigation, route) {
  const { exerciseName } = route.params;
  const history = useSelector((state) => state.workoutsHistory.value);

  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allSessions = getSessionsForExercise(history, exerciseName);

  const filteredHistory = filterHistoryByPeriod(history, selectedPeriod);
  const filteredSessions = getSessionsForExercise(filteredHistory, exerciseName);

  const muscleGroup =
    allSessions[0]?.performances?.find(
      (p) => p.exercise?.name === exerciseName
    )?.exercise?.muscleGroupe ?? '';

  const sessionCount = filteredSessions.length;
  const totalVolume = getTotalVolume(filteredSessions, exerciseName);
  const averageVolume = getAverageVolumePerSession(filteredSessions, exerciseName);
  const chartData = getVolumeProgressionChart(filteredSessions, exerciseName);

  const hasChartData = chartData.data.length > 0;
  const lastPerformances = getLastPerformances(allSessions, exerciseName);
  const bestPerformance = getBestPerformance(filteredSessions, exerciseName);
  const volumeProgression = getVolumeProgression(filteredSessions, exerciseName);

  const handleBack = () => navigation.goBack();

  return {
    exerciseName,
    muscleGroup,
    selectedPeriod,
    setSelectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    PERIODS,
    sessionCount,
    totalVolume,
    averageVolume,
    chartData,
    hasChartData,
    hasData: allSessions.length > 0,
    lastPerformances,
    bestPerformance,
    volumeProgression,
    handleBack,
  };
}
