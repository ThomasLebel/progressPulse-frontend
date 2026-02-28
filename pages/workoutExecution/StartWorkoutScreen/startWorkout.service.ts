import { WorkoutExercise, CustomSet } from '../../../shared/types';

export interface WorkoutExerciseWithRest extends WorkoutExercise {
  restMinutes: number;
  restSeconds: number;
}

export function groupExercisesByMuscleGroup(
  exercises: WorkoutExercise[]
): Record<string, WorkoutExercise[]> {
  return exercises.reduce<Record<string, WorkoutExercise[]>>((groups, exercise) => {
    const { muscleGroupe } = exercise.exercise;
    if (!groups[muscleGroupe]) {
      groups[muscleGroupe] = [];
    }
    groups[muscleGroupe].push(exercise);
    return groups;
  }, {});
}

export function computeRestDisplay(
  rest: number,
  muscleGroup: string
): { minutes: number; seconds: number } {
  if (muscleGroup !== 'Cardio') {
    return {
      minutes: Math.floor(rest / 60),
      seconds: rest % 60,
    };
  }
  return {
    minutes: Math.floor(rest / 3600),
    seconds: Math.floor((rest % 3600) / 60),
  };
}

export function buildCustomSets(
  nbSets: string,
  charge: string,
  nbReps: string
): CustomSet[] {
  const sets: CustomSet[] = [];
  for (let i = 0; i < parseInt(nbSets); i++) {
    sets.push({
      weight: parseFloat(String(charge).replace(',', '.')),
      reps: parseInt(nbReps),
    });
  }
  return sets;
}

export function convertRestToSeconds(
  restMinutes: string,
  restSeconds: string,
  muscleGroup: string
): number {
  const mins = parseInt(String(restMinutes).replace(',', '.'));
  const secs = parseInt(String(restSeconds).replace(',', '.'));
  if (muscleGroup !== 'Cardio') {
    return mins * 60 + secs;
  }
  return mins * 3600 + secs * 60;
}
