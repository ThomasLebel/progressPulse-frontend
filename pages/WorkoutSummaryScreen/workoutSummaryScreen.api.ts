import { Workout } from "../../shared/types";
import { WorkoutPayload } from "./workoutSummaryScreen.service";

export interface SaveWorkoutResponse {
  result: boolean;
  userWorkout?: Workout;
}

export async function saveWorkout(
  payload: WorkoutPayload,
): Promise<SaveWorkoutResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/addWorkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );
  return response.json();
}
