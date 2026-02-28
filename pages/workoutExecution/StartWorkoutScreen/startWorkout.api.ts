import { CustomSet } from '../../../shared/types';

interface DeleteExerciseResponse {
  result: boolean;
}

interface UpdateNameResponse {
  result: boolean;
}

interface UpdateSetsResponse {
  result: boolean;
}

interface DeleteWorkoutResponse {
  deleted: number;
}

export interface UpdateExerciseSetsPayload {
  workoutID: string;
  exerciseID: string;
  customSets: CustomSet[];
  rest: number;
}

export async function apiDeleteExercise(
  workoutID: string,
  exerciseID: string
): Promise<DeleteExerciseResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/deleteExercise`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workoutID, exerciseID }),
    }
  );
  return response.json();
}

export async function apiUpdateWorkoutName(
  workoutID: string,
  newWorkoutName: string,
  newIcon: string,
  token: string
): Promise<UpdateNameResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/updateName`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workoutID, newWorkoutName, newIcon, token }),
    }
  );
  return response.json();
}

export async function apiUpdateWorkoutSets(
  payload: UpdateExerciseSetsPayload
): Promise<UpdateSetsResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/updateSets`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );
  return response.json();
}

export async function apiDeleteWorkout(
  workoutID: string
): Promise<DeleteWorkoutResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/deleteWorkout/${workoutID}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.json();
}
