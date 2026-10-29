export interface TimerState {
  exerciseID: string | null; // identifiant de l'exercice en cours — détecte les changements
  minutes: string;
  secondes: string;
  isPlaying: boolean;
  isTimerVisible: boolean;
  startedAt: number | null; // epoch ms — pour recalculer le temps restant au retour
}

export interface InitTimerPayload {
  exerciseID: string;
  minutes: string;
  secondes: string;
}

export interface StartTimerPayload {
  startedAt: number;
}

export interface SetTimerTimePayload {
  minutes: string;
  secondes: string;
}
