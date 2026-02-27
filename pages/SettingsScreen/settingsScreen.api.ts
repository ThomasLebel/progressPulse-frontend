export interface ChangeEmailResponse {
  result: boolean;
  newEmail?: string;
  error?: string;
}

export interface ChangePasswordResponse {
  result: boolean;
  error?: string;
}

export interface ChangeUsernameResponse {
  result: boolean;
  newUsername?: string;
  error?: string;
}

export async function apiChangeEmail(
  email: string,
  password: string,
  token: string,
): Promise<ChangeEmailResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeEmail`,
    {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password, token }),
    },
  );
  return response.json();
}

export async function apiChangePassword(
  email: string,
  password: string,
  newPassword: string,
  token: string,
): Promise<ChangePasswordResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changePassword`,
    {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password, token, newPassword }),
    },
  );
  return response.json();
}

export async function apiChangeUsername(
  email: string,
  password: string,
  username: string,
  token: string,
): Promise<ChangeUsernameResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeUsername`,
    {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password, token, username }),
    },
  );
  return response.json();
}
