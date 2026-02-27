import { WorkoutHistory } from '../../shared/types';

export interface FetchHistoriesResponse {
  histories?: WorkoutHistory[];
  result?: boolean;
  error?: string;
}

export async function apiFetchHistories(token: string): Promise<FetchHistoriesResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/histories/${token}`,
  );
  return response.json();
}
