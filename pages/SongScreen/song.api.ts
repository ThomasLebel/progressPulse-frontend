export interface ChangeSoundResponse {
  result: boolean;
  soundUpdated?: string;
}

export async function changeSoundApi(
  token: string,
  newSound: string,
): Promise<ChangeSoundResponse> {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeSound`,
    {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ token, newSound }),
    },
  );
  return response.json();
}
