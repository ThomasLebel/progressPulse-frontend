import { Exercise, WorkoutExercise } from "../../../shared/types";
import { WorkoutExerciseCreation } from "../../../reducers/workoutCreation/workoutCreation.types";

interface FetchExercisesResponse {
  data: Exercise[];
}

interface AddExerciseResponse {
  result: boolean;
  updatedWorkout: {
    exercises: WorkoutExercise[];
  };
}

export async function fetchExercisesByMuscle(
  muscleGroup: string
): Promise<Exercise[]> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/exercises/${muscleGroup}`
  );
  const data: FetchExercisesResponse = await response.json();
  return data.data;
}

export async function addExerciseToWorkout(
  workoutID: string,
  exerciseToAdd: WorkoutExerciseCreation
): Promise<WorkoutExercise[]> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/addExercise`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workoutID, exerciseToAdd }),
    }
  );
  const data: AddExerciseResponse = await response.json();
  return data.updatedWorkout.exercises;
}
