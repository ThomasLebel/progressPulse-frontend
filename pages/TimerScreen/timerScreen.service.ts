/**
 * Convertit un temps de repos en secondes en objet { minutes, seconds }
 * avec zéros de tête (ex: 65s → { minutes: "01", seconds: "05" }).
 */
export function convertRestTime(restTime: number): { minutes: string; seconds: string } {
  let restMinutes: string | number = Math.floor(restTime / 60);
  let restSeconds: string | number = restTime % 60;
  if (restMinutes < 10) {
    restMinutes = "0" + restMinutes.toString();
  }
  if (restSeconds < 10) {
    restSeconds = "0" + restSeconds.toString();
  }
  return { minutes: restMinutes as string, seconds: restSeconds as string };
}

/**
 * Formate la valeur des minutes issue du TimerPicker en chaîne de 2 chiffres (ex: "05").
 */
export function formatMinuteTime({ minutes }: { minutes?: number }): string | undefined {
  if (minutes !== undefined) {
    return minutes.toString().padStart(2, "0");
  }
}

/**
 * Formate la valeur des secondes issue du TimerPicker en chaîne de 2 chiffres (ex: "09").
 */
export function formatSecondTime({ seconds }: { seconds?: number }): string | undefined {
  if (seconds !== undefined) {
    return seconds.toString().padStart(2, "0");
  }
}

export interface SetPayload {
  exerciseID: string;
  weight: number;
  reps: number;
  rest: number;
}

/**
 * Construit l'objet de données d'une série à ajouter au store Redux.
 */
export function buildSetPayload({
  exerciseID,
  weight,
  reps,
  minutes,
  secondes,
}: {
  exerciseID: string;
  weight: string;
  reps: string | number;
  minutes: string;
  secondes: string;
}): SetPayload {
  return {
    exerciseID,
    weight: parseFloat(String(weight).replace(",", ".")),
    reps: parseInt(String(reps)),
    rest: parseInt(minutes) * 60 + parseInt(secondes),
  };
}
