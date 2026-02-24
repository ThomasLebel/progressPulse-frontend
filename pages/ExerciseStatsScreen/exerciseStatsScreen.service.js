import moment from 'moment';
import 'moment/locale/fr';

export function getSessionsForExercise(history, exerciseName) {
  return history
    .filter((workout) =>
      workout.performances?.some((perf) => perf.exercise?.name === exerciseName)
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function calculateSessionVolume(sets) {
  return sets.reduce((acc, set) => {
    const reps = set.reps ?? 0;
    const weight = set.weight ?? 0;
    return acc + reps * weight;
  }, 0);
}

export function getTotalVolume(sessions, exerciseName) {
  return sessions.reduce((total, workout) => {
    const perf = workout.performances?.find(
      (p) => p.exercise?.name === exerciseName
    );
    if (!perf) return total;
    return total + calculateSessionVolume(perf.sets ?? []);
  }, 0);
}

export function getVolumeProgressionChart(sessions, exerciseName) {
  if (sessions.length === 0) {
    return { labels: [], data: [] };
  }

  const points = sessions
    .map((workout) => {
      const perf = workout.performances?.find(
        (p) => p.exercise?.name === exerciseName
      );
      const volume = perf ? calculateSessionVolume(perf.sets ?? []) : 0;
      const label = moment(workout.date).locale('fr').format('DD/MM');
      return { label, value: volume };
    })
    .filter((p) => p.value > 0);

  if (points.length === 0) {
    return { labels: [], data: [] };
  }

  // Limit to last MAX_POINTS to avoid rendering issues with many data points
  const MAX_POINTS = 15;
  const trimmed =
    points.length > MAX_POINTS ? points.slice(points.length - MAX_POINTS) : points;

  const MAX_LABELS = 6;
  const step =
    trimmed.length > MAX_LABELS ? Math.ceil(trimmed.length / MAX_LABELS) : 1;
  const labels = trimmed.map((p, i) =>
    i % step === 0 || i === trimmed.length - 1 ? p.label : ''
  );

  return {
    labels,
    data: trimmed.map((p) => p.value),
  };
}

export function getAverageVolumePerSession(sessions, exerciseName) {
  if (sessions.length === 0) return 0;
  const total = getTotalVolume(sessions, exerciseName);
  return Math.round(total / sessions.length);
}

export function getBestPerformance(sessions, exerciseName) {
  let best = null;
  let bestVolume = -1;

  sessions.forEach((workout) => {
    const perf = workout.performances?.find(
      (p) => p.exercise?.name === exerciseName
    );
    if (!perf) return;

    const volume = calculateSessionVolume(perf.sets ?? []);
    if (volume > bestVolume) {
      bestVolume = volume;
      best = {
        date: moment(workout.date).locale('fr').format('D MMM YYYY'),
        sets: perf.sets ?? [],
        volume,
      };
    }
  });

  return best;
}

export function getVolumeProgression(sessions, exerciseName) {
  if (sessions.length < 2) return null;

  const firstPerf = sessions[0].performances?.find(
    (p) => p.exercise?.name === exerciseName
  );
  const lastPerf = sessions[sessions.length - 1].performances?.find(
    (p) => p.exercise?.name === exerciseName
  );

  const firstVolume = firstPerf ? calculateSessionVolume(firstPerf.sets ?? []) : 0;
  const lastVolume = lastPerf ? calculateSessionVolume(lastPerf.sets ?? []) : 0;

  if (firstVolume === 0) return null;

  const percent = Math.round(((lastVolume - firstVolume) / firstVolume) * 100);
  return percent;
}

export function getLastPerformances(sessions, exerciseName) {
  // sessions are sorted asc (oldest → newest), take last 10 in reverse
  const recent = [...sessions].reverse().slice(0, 10);
  return recent.map((workout) => {
    const perf = workout.performances?.find(
      (p) => p.exercise?.name === exerciseName
    );
    return {
      date: moment(workout.date).locale('fr').format('D MMM YYYY'),
      sets: perf?.sets ?? [],
    };
  });
}
