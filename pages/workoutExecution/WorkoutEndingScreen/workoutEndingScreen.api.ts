import { WorkoutHistory } from "../../../shared/types";
import { WorkoutEndingPayload } from "./workoutEndingScreen.service";

interface AddWorkoutResponse {
  result: boolean;
  workoutAdded: WorkoutHistory;
}

/**
 * POST la séance terminée au backend.
 */
export async function postWorkoutHistory(
  payload: WorkoutEndingPayload
): Promise<AddWorkoutResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/histories/addWorkout`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  return response.json();
}
