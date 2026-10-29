import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitTimerPayload,
  SetTimerTimePayload,
  StartTimerPayload,
  TimerState,
} from "./timer.types";

const emptyState: TimerState = {
  exerciseID: null,
  minutes: "00",
  secondes: "00",
  isPlaying: false,
  isTimerVisible: false,
  startedAt: null,
};

const initialState: { value: TimerState } = {
  value: emptyState,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    // Initialise le timer avec le temps de repos de l'exercice
    initTimer: (state, action: PayloadAction<InitTimerPayload>) => {
      state.value.exerciseID = action.payload.exerciseID;
      state.value.minutes = action.payload.minutes;
      state.value.secondes = action.payload.secondes;
      state.value.isPlaying = false;
      state.value.isTimerVisible = false;
      state.value.startedAt = null;
    },

    // Démarre le compte à rebours
    startTimer: (state, action: PayloadAction<StartTimerPayload>) => {
      state.value.isPlaying = true;
      state.value.isTimerVisible = true;
      state.value.startedAt = action.payload.startedAt;
    },

    // Arrête et masque le timer (skip ou fin de séance)
    stopTimer: (state) => {
      state.value.isPlaying = false;
      state.value.isTimerVisible = false;
      state.value.startedAt = null;
    },

    // Met à jour le temps configuré (+15s / -15s / picker)
    setTimerTime: (state, action: PayloadAction<SetTimerTimePayload>) => {
      state.value.minutes = action.payload.minutes;
      state.value.secondes = action.payload.secondes;
    },

    // Réinitialise complètement le timer
    resetTimer: (state) => {
      state.value = { ...emptyState };
    },
  },
});

export const { initTimer, startTimer, stopTimer, setTimerTime, resetTimer } =
  timerSlice.actions;

export default timerSlice.reducer;
