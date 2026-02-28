export type WorkoutSetAPI = {
  weight: number;
  rep: number;
};

export type WorkoutExerciseDataAPI = {
  sets: WorkoutSetAPI[];
  rest: number;
  exercice: {
    _id: string;
    name: string;
    muscleGroupe: string;
    image: string;
  };
};

export type WorkoutAPI = {
  name: string;
  image: string;
  exercices: WorkoutExerciseDataAPI[];
};

type FetchWorkoutsResponse = {
  result: boolean;
  data: WorkoutAPI[];
};

export async function fetchWorkoutsByDifficulty(name: string): Promise<WorkoutAPI[]> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/workouts/byDifficulty/${name}`
  );
  const data: FetchWorkoutsResponse = await response.json();
  return data.data;
}
