import { LoginPayload } from '../../../reducers/user/user.types';

export interface SignupResponse {
  result: boolean;
  error?: string;
  userInfos?: LoginPayload;
}

export async function signupUser(
  username: string,
  email: string,
  password: string,
): Promise<SignupResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/signup`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    },
  );
  return response.json();
}
