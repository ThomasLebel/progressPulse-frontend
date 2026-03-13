import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import currentWorkout from "../reducers/currentWorkout";
import user from "../reducers/user";
import workoutCreation from "../reducers/workoutCreation";
import workouts from "../reducers/workouts";
import workoutsHistory from "../reducers/workoutsHistory";

const reducers = combineReducers({
  user,
  workouts,
  workoutCreation,
  currentWorkout,
  workoutsHistory,
});

const persistConfig = {
  key: "progressPulse",
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
