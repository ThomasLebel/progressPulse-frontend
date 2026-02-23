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

export function getPersonalRecord(sessions, exerciseName) {
  let record = null;

  sessions.forEach((workout) => {
    const perf = workout.performances?.find(
      (p) => p.exercise?.name === exerciseName
    );
    if (!perf) return;

    perf.sets?.forEach((set) => {
      const weight = set.weight ?? 0;
      if (!record || weight > record.weight) {
        record = {
          weight,
          reps: set.reps ?? 0,
          date: moment(workout.date).locale('fr').format('D MMM YYYY'),
        };
      }
    });
  });

  return record;
}

export function getEstimated1RM(weight, reps) {
  if (reps === 0 || weight === 0) return 0;
  return weight * (1 + reps / 30);
}

export function getBestEstimated1RMForSession(sets) {
  let best = 0;
  sets.forEach((set) => {
    const est = getEstimated1RM(set.weight ?? 0, set.reps ?? 0);
    if (est > best) best = est;
  });
  return best;
}

export function get1RMProgressionChart(sessions, exerciseName) {
  if (sessions.length === 0) {
    return { labels: [], data: [] };
  }

  const points = sessions
    .map((workout) => {
      const perf = workout.performances?.find(
        (p) => p.exercise?.name === exerciseName
      );
      const best = perf ? getBestEstimated1RMForSession(perf.sets ?? []) : 0;
      const label = moment(workout.date).locale('fr').format('DD/MM');
      return { label, value: Math.round(best) };
    })
    .filter((p) => p.value > 0);

  if (points.length === 0) {
    return { labels: [], data: [] };
  }

  const MAX_LABELS = 8;
  const step =
    points.length > MAX_LABELS ? Math.ceil(points.length / MAX_LABELS) : 1;
  const labels = points.map((p, i) =>
    i % step === 0 || i === points.length - 1 ? p.label : ''
  );

  return {
    labels,
    data: points.map((p) => p.value),
  };
}

export function getBest1RM(sessions, exerciseName) {
  let best = null;

  sessions.forEach((workout) => {
    const perf = workout.performances?.find(
      (p) => p.exercise?.name === exerciseName
    );
    if (!perf) return;

    perf.sets?.forEach((set) => {
      const weight = set.weight ?? 0;
      const reps = set.reps ?? 0;
      const estimated = getEstimated1RM(weight, reps);
      if (!best || estimated > best.estimated) {
        best = {
          estimated: Math.round(estimated),
          weight,
          reps,
          date: moment(workout.date).locale('fr').format('D MMM YYYY'),
        };
      }
    });
  });

  return best;
}

export function getAverageVolumePerSession(sessions, exerciseName) {
  if (sessions.length === 0) return 0;
  const total = getTotalVolume(sessions, exerciseName);
  return Math.round(total / sessions.length);
}
