import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
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
import ExerciseStatsScreen from "./pages/ExerciseStatsScreen";
import AllExercisesScreen from "./pages/AllExercisesScreen";
import ProgressStatsScreen from "./pages/ProgressStatsScreen";
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          let iconName = "";
          if (route.name === "Stats") iconName = "bar-chart-o";
          else if (route.name === "Home") iconName = "home";
          else if (route.name === "ProgressStats") iconName = "line-chart";
          else if (route.name === "Settings") iconName = "gears";

          return (
            <View style={{ alignItems: "center" }}>
              <FontAwesome name={iconName} size={22} color={color} />
              <View
                style={{
                  marginTop: 5,
                  width: focused ? 16 : 0,
                  height: 2,
                  borderRadius: 1,
                  backgroundColor: COLORS.accent,
                }}
              />
            </View>
          );
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.35)",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <BlurView
            intensity={85}
            tint="dark"
            style={{
              flex: 1,
              borderRadius: 40,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ),
        tabBarStyle: {
          position: "absolute",
          bottom: 32,
          left: 75,
          right: 75,
          backgroundColor: "transparent",
          borderRadius: 40,
          height: 64,
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
        tabBarItemStyle: {
          height: 64,
          justifyContent: "center",
          alignItems: "center",
        },
        contentStyle: { backgroundColor: "transparent" },
        sceneStyle: { backgroundColor: "transparent" },
      })}
    >
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ProgressStats" component={ProgressStatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={["#0D0D36", "#2A1B5A", "#09091F"]}
            style={StyleSheet.absoluteFill}
          />
          <NavigationContainer
            theme={{
              dark: true,
              colors: {
                background: "transparent",
                primary: COLORS.primary,
                card: COLORS.cardBackground,
                text: COLORS.textPrimary,
                border: "transparent",
                notification: COLORS.primary,
              },
            }}
          >
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "transparent" },
              }}
            >
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
              <Stack.Screen
                name="startWorkout"
                component={StartWorkoutScreen}
              />
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
              <Stack.Screen
                name="exerciseStats"
                component={ExerciseStatsScreen}
              />
              <Stack.Screen
                name="allExercises"
                component={AllExercisesScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
