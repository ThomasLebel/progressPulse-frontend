import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import currentWorkout from "./reducers/currentWorkout";
import user, { logout } from "./reducers/user";
import workoutCreation from "./reducers/workoutCreation";
import workouts, { removeAllWorkout } from "./reducers/workouts";
import workoutsHistory, {
  resetWorkoutsHistory,
} from "./reducers/workoutsHistory";

import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "./constants/theme";
import AllExercisesScreen from "./pages/AllExercisesScreen";
import AllWorkoutsScreen from "./pages/AllWorkoutsScreen";
import ExercicesChoiceScreen from "./pages/ExercicesChoiceScreen";
import ExerciceScreen from "./pages/ExerciceScreen";
import ExercisesByMuscleScreen from "./pages/ExercisesByMuscleScreen";
import ExerciseStatsScreen from "./pages/ExerciseStatsScreen";
import HistoryScreen from "./pages/HistoryScreen";
import HystoryWorkoutScreen from "./pages/HistoryWorkoutsScreen";
import HomeScreen from "./pages/HomeScreen";
import MuscleGroupScreen from "./pages/MuscleGroupScreen";
import PasswordForgottenScreen from "./pages/PasswordForgottenScreen";
import ProgressStatsScreen from "./pages/ProgressStatsScreen";
import SettingsScreen from "./pages/SettingsScreen";
import SigninScreen from "./pages/SigninScreen";
import SignupScreen from "./pages/SignupScreen";
import SongScreen from "./pages/SongScreen";
import StartWorkoutScreen from "./pages/StartWorkoutScreen";
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
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Es-tu sûr de vouloir te déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: () => {
          dispatch(removeAllWorkout());
          dispatch(resetWorkoutsHistory());
          dispatch(logout());
          navigation.navigate("Signin");
        },
      },
    ]);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }) => {
          if (route.name === "Home") {
            return (
              <View
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: 27,
                  backgroundColor: focused ? COLORS.accent : COLORS.primary,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 26,
                  elevation: 10,
                }}
              >
                <FontAwesome6
                  name="house"
                  size={20}
                  color={COLORS.background}
                />
              </View>
            );
          }

          let iconName = "";
          if (route.name === "ProgressStats") iconName = "chart-line";
          else if (route.name === "Weight") iconName = "weight-scale";
          else if (route.name === "Settings") iconName = "gear";

          return (
            <View style={{ alignItems: "center" }}>
              <FontAwesome6 name={iconName} size={21} color={color} />
              <View
                style={{
                  marginTop: 5,
                  width: focused ? 14 : 0,
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
          <View
            style={{
              flex: 1,
              borderRadius: 40,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.05)",
              backgroundColor: "rgba(30, 30, 30, 0.85)", // gris foncé semi-opaque
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 10,
            }}
          ></View>
        ),
        tabBarStyle: {
          position: "absolute",
          bottom: 32,
          left: 40,
          right: 40,
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
      <Tab.Screen name="Weight" component={WeightScreen} />
      <Tab.Screen name="ProgressStats" component={ProgressStatsScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen
        name="LogoutAction"
        component={HomeScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <FontAwesome
                name="power-off"
                size={21}
                color="rgba(255, 255, 255, 0.35)"
              />
            </TouchableOpacity>
          ),
        }}
      />
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
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{ gestureEnabled: false }}
              />
              <Stack.Screen name="song" component={SongScreen} />
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
              <Stack.Screen name="allWorkouts" component={AllWorkoutsScreen} />
              <Stack.Screen
                name="exercisesByMuscle"
                component={ExercisesByMuscleScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
