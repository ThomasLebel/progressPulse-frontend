import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import currentWorkout from "./reducers/currentWorkout";
import user from "./reducers/user";
import workoutCreation from "./reducers/workoutCreation";
import workouts from "./reducers/workouts";
import workoutsHistory from "./reducers/workoutsHistory";

import { COLORS } from "./constants/theme";
import ExercicesChoiceScreen from "./pages/ExercicesChoiceScreen";
import ExerciceScreen from "./pages/ExerciceScreen";
import HistoryScreen from "./pages/HistoryScreen";
import HystoryWorkoutScreen from "./pages/HistoryWorkoutsScreen";
import HomeScreen from "./pages/HomeScreen";
import MuscleGroupScreen from "./pages/MuscleGroupScreen";
import PasswordForgottenScreen from "./pages/PasswordForgottenScreen";
import SettingsScreen from "./pages/SettingsScreen";
import SigninScreen from "./pages/SigninScreen";
import SignupScreen from "./pages/SignupScreen";
import SongScreen from "./pages/SongScreen";
import StartWorkoutScreen from "./pages/StartWorkoutScreen";
import StatsScreen from "./pages/StatsScreen";
import TimerScreen from "./pages/TimerScreen";
import WeightScreen from "./pages/WeightScreen";
import WorkoutChoiceScreen from "./pages/WorkoutChoiceScreen";
import WorkoutDifficultyScreen from "./pages/WorkoutDifficultyScreen";
import WorkoutEndingScreen from "./pages/WorkoutEndingScreen";
import WorkoutSummaryScreen from "./pages/WorkoutSummaryScreen";
import WorkoutTypeScreen from "./pages/WorkoutTypeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const store = configureStore({
//   reducer: {
//     user,
//     workouts,
//     workoutCreation,
//     currentWorkout,
//     workoutsHistory,
//   },
// });
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
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

const TabNavigator = () => {
  return (
    <LinearGradient
      colors={["#77778E", "#3D3D5C"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName = "";

            if (route.name === "Stats") {
              iconName = "bar-chart-o";
            } else if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Settings") {
              iconName = "gears";
            }

            return <FontAwesome name={iconName} size={30} color={color} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: "#EBF2F4",
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "rgba(13, 13, 54, 0.7)",
            borderTopWidth: 0,
            height: 80,
          },
        })}
      >
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </LinearGradient>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen
              name="passwordForgotten"
              component={PasswordForgottenScreen}
            />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="song" component={SongScreen} />
            <Stack.Screen name="weight" component={WeightScreen} />
            <Stack.Screen name="WorkoutType" component={WorkoutTypeScreen} />
            <Stack.Screen
              name="WorkoutDifficulty"
              component={WorkoutDifficultyScreen}
            />
            <Stack.Screen
              name="workoutChoice"
              component={WorkoutChoiceScreen}
            />
            <Stack.Screen
              name="workoutSummary"
              component={WorkoutSummaryScreen}
            />
            <Stack.Screen name="muscleGroup" component={MuscleGroupScreen} />
            <Stack.Screen
              name="exercicesChoices"
              component={ExercicesChoiceScreen}
            />
            <Stack.Screen name="startWorkout" component={StartWorkoutScreen} />
            <Stack.Screen name="exercice" component={ExerciceScreen} />
            <Stack.Screen name="timer" component={TimerScreen} />
            <Stack.Screen
              name="workoutEnding"
              component={WorkoutEndingScreen}
            />
            <Stack.Screen
              name="historyWorkout"
              component={HystoryWorkoutScreen}
            />
            <Stack.Screen name="history" component={HistoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
