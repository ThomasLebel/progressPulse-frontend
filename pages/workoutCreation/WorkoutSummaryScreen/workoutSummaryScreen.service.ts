import { CustomSet } from '../../../shared/types';
import { WorkoutExerciseCreation } from '../../../reducers/workoutCreation/workoutCreation.types';

export interface RestDisplay {
  minutes: number;
  seconds: number;
}

export interface WorkoutPayload {
  userToken: string;
  name: string;
  exercices: {
    exercise: string;
    rest: number;
    customSets: CustomSet[];
  }[];
  image: string;
}

export function groupExercisesByMuscleGroup(
  exercises: WorkoutExerciseCreation[],
): Record<string, WorkoutExerciseCreation[]> {
  return exercises.reduce(
    (groups, exercise) => {
      const { muscleGroup } = exercise;
      if (!groups[muscleGroup]) {
        groups[muscleGroup] = [];
      }
      groups[muscleGroup].push(exercise);
      return groups;
    },
    {} as Record<string, WorkoutExerciseCreation[]>,
  );
}

export function convertRestForDisplay(rest: number, muscleGroup: string): RestDisplay {
  if (muscleGroup !== 'Cardio') {
    return {
      minutes: Math.floor(rest / 60),
      seconds: rest % 60,
    };
  } else {
    return {
      minutes: Math.floor(rest / 3600),
      seconds: Math.floor((rest % 3600) / 60),
    };
  }
}

export function convertRestForStorage(
  restMinutes: string,
  restSeconds: string,
  muscleGroup: string,
): number {
  if (muscleGroup !== 'Cardio') {
    return parseInt(restMinutes) * 60 + parseInt(restSeconds);
  } else {
    return parseInt(restMinutes) * 3600 + parseInt(restSeconds) * 60;
  }
}

export function buildCustomSets(nbSets: string, charge: string, nbReps: string): CustomSet[] {
  const sets: CustomSet[] = [];
  for (let i = 0; i < parseInt(nbSets); i++) {
    sets.push({
      weight: parseFloat(String(charge).replace(',', '.')),
      reps: parseInt(nbReps),
    });
  }
  return sets;
}

export function buildWorkoutPayload(
  userToken: string,
  workoutName: string,
  exercises: WorkoutExerciseCreation[],
  imageName: string,
): WorkoutPayload {
  const exercices = exercises.map((exercise) => ({
    exercise: exercise.exercise,
    rest: exercise.rest,
    customSets: exercise.customSets,
  }));
  return {
    userToken,
    name: workoutName,
    exercices,
    image: imageName,
  };
}

export function getRandomImageIndex(imagesLength: number): number {
  return Math.floor(Math.random() * imagesLength);
}
