import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WorkoutCreationState, WorkoutExerciseCreation, UpdateCustomSetsPayload } from './workoutCreation.types';

const initialState: { value: WorkoutCreationState } = {
  value: { name: null, exercises: [] },
};

export const workoutCreationSlice = createSlice({
  name: 'workoutCreation',
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<WorkoutExerciseCreation>) => {
      state.value.exercises.push(action.payload);
    },

    removeExercise: (state, action: PayloadAction<string>) => {
      state.value.exercises = state.value.exercises.filter(
        (exercise) => exercise.exercise !== action.payload
      );
    },

    updateCustomSets: (
      state,
      action: PayloadAction<UpdateCustomSetsPayload>
    ) => {
      for (const exercise of state.value.exercises) {
        if (exercise.exercise === action.payload.exerciseID) {
          exercise.customSets = action.payload.newSets;
          exercise.rest = action.payload.rest;
        }
      }
    },

    addWorkoutName: (state, action: PayloadAction<string>) => {
      state.value.name = action.payload;
    },

    resetWorkoutCreation: (state) => {
      state.value = { name: null, exercises: [] };
    },

    addAllExercise: (
      state,
      action: PayloadAction<WorkoutExerciseCreation[]>
    ) => {
      for (const exercice of action.payload) {
        state.value.exercises.push({
          exercise: exercice.exercise,
          exerciseName: exercice.exerciseName,
          muscleGroup: exercice.muscleGroup,
          rest: exercice.rest,
          customSets: exercice.customSets,
          imagePath: exercice.imagePath,
        });
      }
    },
  },
});

export const {
  addExercise,
  addWorkoutName,
  resetWorkoutCreation,
  removeExercise,
  updateCustomSets,
  addAllExercise,
} = workoutCreationSlice.actions;

export default workoutCreationSlice.reducer;
