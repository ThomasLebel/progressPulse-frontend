import { useSelector } from 'react-redux';
import {
  getSessionsForExercise,
  getTotalVolume,
  getPersonalRecord,
  getVolumeProgressionChart,
} from './exerciseStatsScreen.service';

export function useExerciseStatsScreen(navigation, route) {
  const { exerciseName } = route.params;
  const history = useSelector((state) => state.workoutsHistory.value);

  const sessions = getSessionsForExercise(history, exerciseName);
  const totalVolume = getTotalVolume(sessions, exerciseName);
  const personalRecord = getPersonalRecord(sessions, exerciseName);
  const chartData = getVolumeProgressionChart(sessions, exerciseName);

  const handleBack = () => navigation.goBack();

  return {
    exerciseName,
    totalVolume,
    personalRecord,
    chartData,
    sessionCount: sessions.length,
    handleBack,
  };
}
