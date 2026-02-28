import { WeightEntry, FitnessTarget } from '../../shared/types';

export interface UserState {
  token: string | null;
  username: string | null;
  email: string | null;
  sound: string | null;
  weight: WeightEntry[];
  target: FitnessTarget | Record<string, never>;
  statsPeriod: string;
}

export interface LoginPayload {
  token: string;
  username: string;
  email: string;
  sound: string;
  weight: WeightEntry[];
  target: FitnessTarget | Record<string, never>;
}
