/**
 * Returns unique workout names from history, ordered most-recent first.
 * @param {Array} history
 * @returns {string[]}
 */
export function getUniqueWorkoutNames(history) {
  const names = [];
  for (const entry of history) {
    if (!names.includes(entry.workoutName)) {
      names.unshift(entry.workoutName);
    }
  }
  return names;
}
