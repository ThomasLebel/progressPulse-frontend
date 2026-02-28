import { WeightEntry, FitnessTarget } from '../../../shared/types';

export interface AddWeightResponse {
  result: boolean;
  newWeight?: WeightEntry;
  error?: string;
}

export interface WeightTargetResponse {
  result: boolean;
  weightTarget?: FitnessTarget;
  error?: string;
}

export async function apiAddWeight(
  weight: string | number,
  token: string,
): Promise<AddWeightResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/addWeight`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ weight, token }),
    },
  );
  return response.json();
}

export async function apiWeightTarget(
  weight: string | number,
  token: string,
  date: Date,
  objectif: string,
  initialWeight: string | number,
): Promise<WeightTargetResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/weightTarget`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ weight, token, date, objectif, initialWeight }),
    },
  );
  return response.json();
}
