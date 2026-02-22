import { useSelector } from "react-redux";
import moment from "moment";
import {
  getLastEightWeights,
  getWeightsForChart,
  getLabelsForLineChart,
  getWorkoutsByMonth,
  getLastEightMonths,
} from "./statsScreen.service";

export function useStatsScreen(navigation) {
  const user = useSelector((state) => state.user.value);
  const history = useSelector((state) => state.workoutsHistory.value);

  const lastEightWeights = getLastEightWeights(user.weight);
  const weightsLineChart = getWeightsForChart(lastEightWeights);
  const labelsLineChart = getLabelsForLineChart(lastEightWeights);

  const lastWorkoutRelativeTime =
    history.length !== 0
      ? moment(history.at(-1).date).fromNow(true)
      : null;

  const lastEightMonths = getLastEightMonths(history);
  const trainingData = getWorkoutsByMonth(lastEightMonths);
  const labelsBarChart = Object.keys(trainingData);
  const dataBarChart = Object.values(trainingData);

  const handleNavigateToWeight = () => navigation.navigate("weight");
  const handleNavigateToHistory = () => navigation.navigate("history");

  return {
    history,
    weightsLineChart,
    labelsLineChart,
    lastWorkoutRelativeTime,
    labelsBarChart,
    dataBarChart,
    handleNavigateToWeight,
    handleNavigateToHistory,
  };
}
