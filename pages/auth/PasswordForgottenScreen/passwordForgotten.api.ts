export interface ForgotPasswordResponse {
  result: boolean;
  error?: string;
}

export interface VerifyTokenResponse {
  result: boolean;
}

export interface ChangePasswordResponse {
  result: boolean;
}

export async function sendForgotPasswordEmail(
  email: string,
): Promise<ForgotPasswordResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/forgotPassword`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    },
  );
  return response.json();
}

export async function verifyResetToken(
  email: string,
  token: string,
): Promise<VerifyTokenResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/verifyResetToken`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token }),
    },
  );
  return response.json();
}

export async function changeForgottenPassword(
  email: string,
  token: string,
  newPassword: string,
): Promise<ChangePasswordResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeForgottenPassword`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, newPassword }),
    },
  );
  return response.json();
}
