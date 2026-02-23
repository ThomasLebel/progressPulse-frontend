import moment from 'moment';
import 'moment/locale/fr';

export const PERIODS = [
  { key: 'month', label: 'Ce mois-ci' },
  { key: '3months', label: '3 derniers mois' },
  { key: '6months', label: '6 derniers mois' },
  { key: 'all', label: 'Depuis toujours' },
];

export function filterHistoryByPeriod(history, period) {
  if (period === 'all') return history;
  let cutoff;
  if (period === 'month') cutoff = moment().startOf('month');
  else if (period === '3months') cutoff = moment().subtract(3, 'months').startOf('day');
  else if (period === '6months') cutoff = moment().subtract(6, 'months').startOf('day');
  return history.filter((w) => moment(w.date).isSameOrAfter(cutoff));
}

export function getChartTitle(period) {
  if (period === 'month') return 'Ce mois-ci (par semaine)';
  if (period === '3months') return '3 derniers mois';
  if (period === '6months') return '6 derniers mois';
  return 'Depuis toujours';
}

export function getTotalWorkouts(history) {
  return history.length;
}

function shortMonth(m) {
  return m.locale('fr').format('MMM').replace('.', '').substring(0, 3);
}

export function getBarChartData(history, period) {
  if (period === 'month') {
    const weeks = { S1: 0, S2: 0, S3: 0, S4: 0 };
    history.forEach((workout) => {
      const d = moment(workout.date);
      if (!d.isSame(moment(), 'month')) return;
      const day = d.date();
      if (day <= 7) weeks.S1++;
      else if (day <= 14) weeks.S2++;
      else if (day <= 21) weeks.S3++;
      else weeks.S4++;
    });
    return { labels: Object.keys(weeks), data: Object.values(weeks) };
  }

  if (period === '3months' || period === '6months') {
    const monthCount = period === '3months' ? 3 : 6;
    const buckets = {};
    for (let i = monthCount - 1; i >= 0; i--) {
      const m = moment().subtract(i, 'months');
      buckets[m.format('YYYY-MM')] = { label: shortMonth(m), count: 0 };
    }
    history.forEach((workout) => {
      const key = moment(workout.date).format('YYYY-MM');
      if (key in buckets) buckets[key].count++;
    });
    const entries = Object.values(buckets);
    return { labels: entries.map((e) => e.label), data: entries.map((e) => e.count) };
  }

  // 'all' : par année
  if (history.length === 0) {
    const year = moment().year();
    return { labels: [String(year)], data: [0] };
  }
  const earliest = moment.min(history.map((w) => moment(w.date)));
  const startYear = earliest.year();
  const endYear = moment().year();
  const years = {};
  for (let y = startYear; y <= endYear; y++) years[y] = 0;
  history.forEach((workout) => {
    const y = moment(workout.date).year();
    if (y in years) years[y]++;
  });
  return { labels: Object.keys(years), data: Object.values(years) };
}

export function getBarPercentage(period) {
  return period === '6months' ? 0.45 : 0.65;
}

export function getAverageWorkoutsPerWeek(history) {
  if (history.length === 0) return 0;

  const monthCounts = {};
  history.forEach((w) => {
    const key = moment(w.date).format('YYYY-MM');
    monthCounts[key] = (monthCounts[key] || 0) + 1;
  });

  const months = Object.values(monthCounts);
  const avgPerWeek = months.reduce((sum, count) => sum + count / 4, 0) / months.length;
  return Math.round(avgPerWeek);
}

export function getMostFrequentWorkouts(history) {
  const countMap = {};

  history.forEach((workout) => {
    const name = workout.workoutName;
    if (!name) return;
    countMap[name] = (countMap[name] || 0) + 1;
  });

  return Object.entries(countMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getMostFrequentExercises(history) {
  const countMap = {};

  history.forEach((workout) => {
    workout.performances?.forEach((perf) => {
      const exercise = perf.exercise;
      if (!exercise?.name) return;
      if (!countMap[exercise.name]) {
        countMap[exercise.name] = {
          muscleGroupe: exercise.muscleGroupe ?? '',
          count: 0,
        };
      }
      countMap[exercise.name].count++;
    });
  });

  return Object.entries(countMap)
    .map(([name, { muscleGroupe, count }]) => ({ name, muscleGroupe, count }))
    .sort((a, b) => b.count - a.count);
}
