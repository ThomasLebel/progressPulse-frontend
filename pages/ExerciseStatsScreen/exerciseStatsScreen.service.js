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

export function getVolumeProgressionChart(sessions, exerciseName) {
  if (sessions.length === 0) {
    return { labels: [], data: [0] };
  }

  const points = sessions.map((workout) => {
    const perf = workout.performances?.find(
      (p) => p.exercise?.name === exerciseName
    );
    const volume = perf ? calculateSessionVolume(perf.sets ?? []) : 0;
    const label = moment(workout.date).locale('fr').format('DD/MM');
    return { label, volume };
  });

  const last8 = points.slice(-8);

  return {
    labels: last8.map((p) => p.label),
    data: last8.map((p) => p.volume),
  };
}
