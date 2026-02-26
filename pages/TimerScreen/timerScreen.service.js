/**
 * Convertit un temps de repos en secondes en objet { minutes, seconds }
 * avec zéros de tête (ex: 65s → { minutes: "01", seconds: "05" }).
 */
export function convertRestTime(restTime) {
  let restMinutes = Math.floor(restTime / 60);
  let restSeconds = restTime % 60;
  if (restMinutes < 10) {
    restMinutes = "0" + restMinutes.toString();
  }
  if (restSeconds < 10) {
    restSeconds = "0" + restSeconds.toString();
  }
  return { minutes: restMinutes, seconds: restSeconds };
}

/**
 * Formate la valeur des minutes issue du TimerPicker en chaîne de 2 chiffres (ex: "05").
 * Retourne la valeur des minutes formatée.
 */
export function formatMinuteTime({ minutes }) {
  if (minutes !== undefined) {
    const timeMinuteParts = minutes.toString().padStart(2, "0");
    return timeMinuteParts;
  }
}

/**
 * Formate la valeur des secondes issue du TimerPicker en chaîne de 2 chiffres (ex: "09").
 * Retourne la valeur des secondes formatée.
 */
export function formatSecondTime({ seconds }) {
  if (seconds !== undefined) {
    const timeSecondParts = seconds.toString().padStart(2, "0");
    return timeSecondParts;
  }
}

/**
 * Construit l'objet de données d'une série à ajouter au store Redux.
 * Convertit les chaînes de caractères en entiers et calcule le repos total en secondes.
 */
export function buildSetPayload({ exerciseID, weight, reps, minutes, secondes }) {
  return {
    exerciseID,
    weight: parseFloat(String(weight).replace(",", ".")),
    reps: parseInt(reps),
    rest: parseInt(minutes) * 60 + parseInt(secondes),
  };
}
