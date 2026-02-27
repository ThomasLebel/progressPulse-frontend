import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddExerciseSetPayload,
  AddRessentiPayload,
  AddWorkoutInformationPayload,
  CurrentWorkoutState,
} from "./currentWorkout.types";

const emptyState: CurrentWorkoutState = {
  user: null,
  workout: null,
  date: null,
  note: null,
  ressenti: null,
  performances: [],
};

const initialState: { value: CurrentWorkoutState } = {
  value: emptyState,
};

export const currentWorkoutSlice = createSlice({
  name: "currentWorkout",
  initialState,
  reducers: {
    addWorkoutInformation: (
      state,
      action: PayloadAction<AddWorkoutInformationPayload>,
    ) => {
      state.value.user = action.payload.userToken;
      state.value.workout = action.payload.workoutID;
      state.value.date = new Date().toISOString();
    },

    addExerciseSet: (state, action: PayloadAction<AddExerciseSetPayload>) => {
      const exerciseAlreadyAdded = state.value.performances.some(
        (performance) => performance.exercise === action.payload.exerciseID,
      );

      if (exerciseAlreadyAdded) {
        for (const performance of state.value.performances) {
          if (performance.exercise === action.payload.exerciseID) {
            performance.sets.push({
              weight: action.payload.weight,
              reps: action.payload.reps,
              rest: action.payload.rest,
            });
          }
        }
      } else {
        state.value.performances.push({
          exercise: action.payload.exerciseID,
          sets: [
            {
              weight: action.payload.weight,
              reps: action.payload.reps,
              rest: action.payload.rest,
            },
          ],
        });
      }
    },

    addRessenti: (state, action: PayloadAction<AddRessentiPayload>) => {
      state.value.note = action.payload.note;
      state.value.ressenti = action.payload.ressenti;
    },

    resetCurrentWorkout: (state) => {
      state.value = { ...emptyState, performances: [] };
    },
  },
});

export const {
  addWorkoutInformation,
  addExerciseSet,
  addRessenti,
  resetCurrentWorkout,
} = currentWorkoutSlice.actions;

export default currentWorkoutSlice.reducer;
