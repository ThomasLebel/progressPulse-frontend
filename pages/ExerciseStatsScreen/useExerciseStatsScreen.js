import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  filterHistoryByPeriod,
  PERIODS,
} from '../ProgressStatsScreen/progressStatsScreen.service';
import {
  getSessionsForExercise,
  getTotalVolume,
  getPersonalRecord,
  get1RMProgressionChart,
  getBest1RM,
  getAverageVolumePerSession,
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
  const personalRecord = getPersonalRecord(allSessions, exerciseName);
  const best1RM = getBest1RM(allSessions, exerciseName);
  const chartData = get1RMProgressionChart(filteredSessions, exerciseName);

  const hasChartData =
    chartData.data.length > 0 && chartData.data.some((v) => v > 0);

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
    personalRecord,
    best1RM,
    chartData,
    hasChartData,
    hasData: allSessions.length > 0,
    handleBack,
  };
}
