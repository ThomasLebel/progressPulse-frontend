import moment from "moment";
import "moment/locale/fr";
import {
  Exercise,
  PerformanceSet,
  WorkoutHistory,
} from "../../../shared/types";
import {
  BestPerformance,
  ChartDataPoint,
  LastPerformance,
  VolumeChartData,
} from "./ExerciseStatsScreen.types";

export function getSessionsForExercise(
  history: WorkoutHistory[],
  exerciseName: string,
): WorkoutHistory[] {
  return history
    .filter((workout) =>
      workout.performances?.some((perf) => {
        if (typeof perf.exercise === "string") return false;
        return (perf.exercise as Exercise).name === exerciseName;
      }),
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function calculateSessionVolume(sets: PerformanceSet[]): number {
  return sets.reduce((acc, set) => {
    const reps = set.reps ?? 0;
    const weight = set.weight ?? 0;
    return acc + reps * weight;
  }, 0);
}

export function getTotalVolume(
  sessions: WorkoutHistory[],
  exerciseName: string,
): number {
  return sessions.reduce((total, workout) => {
    const perf = workout.performances?.find((p) => {
      if (typeof p.exercise === "string") return false;
      return (p.exercise as Exercise).name === exerciseName;
    });
    if (!perf) return total;
    return total + calculateSessionVolume(perf.sets ?? []);
  }, 0);
}

export function getVolumeProgressionChart(
  sessions: WorkoutHistory[],
  exerciseName: string,
): VolumeChartData {
  if (sessions.length === 0) {
    return { labels: [], data: [] };
  }

  const points = sessions
    .map((workout) => {
      const perf = workout.performances?.find((p) => {
        if (typeof p.exercise === "string") return false;
        return (p.exercise as Exercise).name === exerciseName;
      });
      const volume = perf ? calculateSessionVolume(perf.sets ?? []) : 0;
      const label = moment(workout.date).locale("fr").format("DD/MM");
      return { label, value: volume };
    })
    .filter((p) => p.value > 0);

  if (points.length === 0) {
    return { labels: [], data: [] };
  }

  const MAX_POINTS = 15;
  const trimmed =
    points.length > MAX_POINTS
      ? points.slice(points.length - MAX_POINTS)
      : points;

  const MAX_LABELS = 6;
  const step =
    trimmed.length > MAX_LABELS ? Math.ceil(trimmed.length / MAX_LABELS) : 1;
  const labels = trimmed.map((p, i) =>
    i % step === 0 || i === trimmed.length - 1 ? p.label : "",
  );

  return {
    labels,
    data: trimmed.map((p) => p.value),
  };
}

export function getAverageVolumePerSession(
  sessions: WorkoutHistory[],
  exerciseName: string,
): number {
  if (sessions.length === 0) return 0;
  const total = getTotalVolume(sessions, exerciseName);
  return Math.round(total / sessions.length);
}

export function getBestPerformance(
  sessions: WorkoutHistory[],
  exerciseName: string,
): BestPerformance | null {
  let best: BestPerformance | null = null;
  let bestVolume = -1;

  sessions.forEach((workout) => {
    const perf = workout.performances?.find((p) => {
      if (typeof p.exercise === "string") return false;
      return (p.exercise as Exercise).name === exerciseName;
    });
    if (!perf) return;

    const volume = calculateSessionVolume(perf.sets ?? []);
    if (volume > bestVolume) {
      bestVolume = volume;
      best = {
        date: moment(workout.date).locale("fr").format("D MMM YYYY"),
        sets: perf.sets ?? [],
        volume,
      };
    }
  });

  return best;
}

export function getVolumeProgression(
  sessions: WorkoutHistory[],
  exerciseName: string,
): number | null {
  if (sessions.length < 2) return null;

  const firstPerf = sessions[0].performances?.find((p) => {
    if (typeof p.exercise === "string") return false;
    return (p.exercise as Exercise).name === exerciseName;
  });
  const lastPerf = sessions[sessions.length - 1].performances?.find((p) => {
    if (typeof p.exercise === "string") return false;
    return (p.exercise as Exercise).name === exerciseName;
  });

  const firstVolume = firstPerf
    ? calculateSessionVolume(firstPerf.sets ?? [])
    : 0;
  const lastVolume = lastPerf ? calculateSessionVolume(lastPerf.sets ?? []) : 0;

  if (firstVolume === 0) return null;

  const percent = Math.round(((lastVolume - firstVolume) / firstVolume) * 100);
  return percent;
}

export function getChartDataPoints(
  sessions: WorkoutHistory[],
  exerciseName: string,
  period = "3months",
): ChartDataPoint[] {
  const isCurrentMonth = period === "month";
  const points = sessions
    .map((workout) => {
      const perf = workout.performances?.find((p) => {
        if (typeof p.exercise === "string") return false;
        return (p.exercise as Exercise).name === exerciseName;
      });
      const sets = perf?.sets ?? [];
      const volume = calculateSessionVolume(sets);
      const label = isCurrentMonth
        ? moment(workout.date).locale("fr").format("D")
        : moment(workout.date)
            .locale("fr")
            .format("MMM")
            .replace(".", "")
            .substring(0, 3);
      const date = moment(workout.date).locale("fr").format("D MMM YYYY");
      return { label, value: volume, date, sets };
    })
    .filter((p) => p.value > 0);

  if (points.length === 0) return [];

  const MAX_POINTS = 20;
  const trimmed =
    points.length > MAX_POINTS
      ? points.slice(points.length - MAX_POINTS)
      : points;

  const MAX_LABELS = 6;
  const step =
    trimmed.length > MAX_LABELS ? Math.ceil(trimmed.length / MAX_LABELS) : 1;

  return trimmed.map((p, i) => ({
    value: p.value,
    label: i % step === 0 || i === trimmed.length - 1 ? p.label : "",
    date: p.date,
    sets: (p.sets ?? []).map((s) => ({ ...s })),
  }));
}

export function getYAxisOffset(chartPoints: ChartDataPoint[]): number {
  const values = chartPoints.map((p) => p.value);

  const min = Math.min(...values);
  const max = Math.max(...values);

  const range = max - min;

  // Si toutes les valeurs sont identiques (range = 0)
  const safeRange = range === 0 ? min * 0.05 : range;

  const padding = safeRange * 0.1; // 10% du range

  const yAxisOffset = min - padding;

  return yAxisOffset;
}

export function getLastPerformances(
  sessions: WorkoutHistory[],
  exerciseName: string,
): LastPerformance[] {
  const recent = [...sessions].reverse().slice(0, 10);
  return recent.map((workout) => {
    const perf = workout.performances?.find((p) => {
      if (typeof p.exercise === "string") return false;
      return (p.exercise as Exercise).name === exerciseName;
    });
    return {
      date: moment(workout.date).locale("fr").format("D MMM YYYY"),
      sets: perf?.sets ?? [],
    };
  });
}
