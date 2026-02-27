import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../models/navigation';
import { RootState } from '../../reducers/store.types';
import { Exercise } from '../../shared/types';
import {
  filterHistoryByPeriod,
  PERIODS,
} from '../ProgressStatsScreen/progressStatsScreen.service';
import {
  getSessionsForExercise,
  getTotalVolume,
  getVolumeProgressionChart,
  getChartDataPoints,
  getAverageVolumePerSession,
  getLastPerformances,
  getBestPerformance,
  getVolumeProgression,
} from './exerciseStatsScreen.service';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'exerciseStats'>;
type RoutePropType = RouteProp<RootStackParamList, 'exerciseStats'>;

export function useExerciseStatsScreen(navigation: NavigationProp, route: RoutePropType) {
  const { exerciseName } = route.params;
  const history = useSelector((state: RootState) => state.workoutsHistory.value);

  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const allSessions = getSessionsForExercise(history, exerciseName);

  const filteredHistory = filterHistoryByPeriod(history, selectedPeriod);
  const filteredSessions = getSessionsForExercise(filteredHistory, exerciseName);

  const muscleGroupPerf = allSessions[0]?.performances?.find((p) => {
    if (typeof p.exercise === 'string') return false;
    return (p.exercise as Exercise).name === exerciseName;
  });
  const muscleGroup =
    muscleGroupPerf && typeof muscleGroupPerf.exercise !== 'string'
      ? (muscleGroupPerf.exercise as Exercise).muscleGroupe ?? ''
      : '';

  const sessionCount = filteredSessions.length;
  const totalVolume = getTotalVolume(filteredSessions, exerciseName);
  const averageVolume = getAverageVolumePerSession(filteredSessions, exerciseName);
  const chartData = getVolumeProgressionChart(filteredSessions, exerciseName);
  const chartPoints = getChartDataPoints(filteredSessions, exerciseName, selectedPeriod);

  const hasChartData = chartPoints.length > 0;
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
    chartPoints,
    hasChartData,
    hasData: allSessions.length > 0,
    lastPerformances,
    bestPerformance,
    volumeProgression,
    handleBack,
  };
}
