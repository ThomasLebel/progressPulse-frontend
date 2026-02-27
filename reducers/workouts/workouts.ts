import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Workout } from '../../shared/types';
import {
  UpdateWorkoutSetsPayload,
  RemoveExercisePayload,
  UpdateWorkoutNamePayload,
  UpdateWorkoutImagePayload,
  UpdateExercisesPayload,
} from './workouts.types';

const initialState: { value: Workout[] } = {
  value: [],
};

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    addAllUserWorkouts: (state, action: PayloadAction<Workout[]>) => {
      state.value = [];
      for (const seance of action.payload) {
        state.value.push(seance);
      }
    },

    addWorkout: (state, action: PayloadAction<Workout>) => {
      state.value.push(action.payload);
    },

    removeWorkout: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter(
        (seance) => seance._id !== action.payload
      );
    },

    removeExercise: (state, action: PayloadAction<RemoveExercisePayload>) => {
      for (const workout of state.value) {
        if (workout._id === action.payload.workoutID) {
          workout.exercises = workout.exercises.filter(
            (exercise) => exercise.exercise._id !== action.payload.exerciseID
          );
        }
      }
    },

    updateExercises: (state, action: PayloadAction<UpdateExercisesPayload>) => {
      for (const workout of state.value) {
        if (workout._id === action.payload.workoutID) {
          workout.exercises = action.payload.exercisesToUpdate;
        }
      }
    },

    updateWorkoutSets: (
      state,
      action: PayloadAction<UpdateWorkoutSetsPayload>
    ) => {
      for (const workout of state.value) {
        if (workout._id === action.payload.workoutID) {
          for (const exercise of workout.exercises) {
            if (exercise.exercise._id === action.payload.exerciseID) {
              exercise.customSets = action.payload.customSets;
              exercise.rest = action.payload.rest;
            }
          }
        }
      }
    },

    updateWorkoutName: (
      state,
      action: PayloadAction<UpdateWorkoutNamePayload>
    ) => {
      for (const workout of state.value) {
        if (workout._id === action.payload.workoutID) {
          workout.name = action.payload.newName;
        }
      }
    },

    updateWorkoutImage: (
      state,
      action: PayloadAction<UpdateWorkoutImagePayload>
    ) => {
      for (const workout of state.value) {
        if (workout._id === action.payload.workoutID) {
          workout.image = action.payload.newImage;
        }
      }
    },

    removeAllWorkout: (state) => {
      state.value = [];
    },
  },
});

export const {
  addAllUserWorkouts,
  addWorkout,
  removeWorkout,
  updateWorkoutSets,
  removeExercise,
  updateWorkoutName,
  updateWorkoutImage,
  updateExercises,
  removeAllWorkout,
} = workoutsSlice.actions;

export default workoutsSlice.reducer;
