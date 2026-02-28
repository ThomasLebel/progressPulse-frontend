import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WeightEntry, FitnessTarget } from '../../shared/types';
import { UserState, LoginPayload } from './user.types';

const initialState: { value: UserState } = {
  value: {
    token: null,
    username: null,
    email: null,
    sound: null,
    weight: [],
    target: {},
    statsPeriod: 'month',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.sound = action.payload.sound;
      state.value.weight = action.payload.weight;
      state.value.target = action.payload.target;
    },

    logout: (state) => {
      state.value = {
        token: null,
        username: null,
        email: null,
        sound: null,
        weight: [],
        target: {},
        statsPeriod: 'month',
      };
    },

    changeSound: (state, action: PayloadAction<string>) => {
      state.value.sound = action.payload;
    },

    addWeight: (state, action: PayloadAction<WeightEntry>) => {
      state.value.weight.push(action.payload);
    },

    updateEmail: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
    },

    updateUsername: (state, action: PayloadAction<string>) => {
      state.value.username = action.payload;
    },

    updateTarget: (state, action: PayloadAction<FitnessTarget>) => {
      state.value.target = action.payload;
    },

    setStatsPeriod: (state, action: PayloadAction<string>) => {
      state.value.statsPeriod = action.payload;
    },
  },
});

export const {
  login,
  logout,
  changeSound,
  addWeight,
  updateEmail,
  updateTarget,
  updateUsername,
  setStatsPeriod,
} = userSlice.actions;

export default userSlice.reducer;
