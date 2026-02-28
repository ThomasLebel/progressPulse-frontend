import { LoginPayload } from '../../../reducers/user/user.types';
import { Workout } from '../../../shared/types';
import { WorkoutHistory } from '../../../shared/types';

export interface SigninResponse {
  result: boolean;
  error?: string;
  userInfos?: LoginPayload;
}

export interface UserWorkoutsResponse {
  result: boolean;
  userWorkouts?: Workout[];
}

export interface HistoriesResponse {
  result: boolean;
  histories?: WorkoutHistory[];
}

export async function signinUser(
  email: string,
  password: string,
): Promise<SigninResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/signin`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
  );
  return response.json();
}

export async function fetchUserWorkouts(
  token: string,
): Promise<UserWorkoutsResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/${token}`,
  );
  return response.json();
}

export async function fetchUserHistory(
  token: string,
): Promise<HistoriesResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/histories/${token}`,
  );
  return response.json();
}
