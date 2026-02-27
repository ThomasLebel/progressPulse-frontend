import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutHistory } from '../../shared/types';
import { UpdateNameWorkoutHistoryPayload } from './workoutsHistory.types';

const initialState: { value: WorkoutHistory[] } = {
  value: [],
};

export const workoutsHistorySlice = createSlice({
  name: 'workoutsHistory',
  initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<WorkoutHistory>) => {
      state.value.push(action.payload);
    },

    addAllWorkoutsHistory: (state, action: PayloadAction<WorkoutHistory[]>) => {
      if (action.payload) {
        state.value = action.payload;
      }
    },

    updateNameWorkoutHistory: (
      state,
      action: PayloadAction<UpdateNameWorkoutHistoryPayload>
    ) => {
      for (const workout of state.value) {
        if (workout.workoutID === action.payload.workoutID) {
          workout.workoutName = action.payload.newName;
        }
      }
    },

    resetWorkoutsHistory: (state) => {
      state.value = [];
    },
  },
});

export const {
  addWorkout,
  addAllWorkoutsHistory,
  updateNameWorkoutHistory,
  resetWorkoutsHistory,
} = workoutsHistorySlice.actions;

export default workoutsHistorySlice.reducer;
