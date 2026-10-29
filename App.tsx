import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, Theme, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import currentWorkout from "./reducers/currentWorkout";
import timer from "./reducers/timer";
import user, { logout } from "./reducers/user";
import workoutCreation from "./reducers/workoutCreation";
import workouts, { removeAllWorkout } from "./reducers/workouts";
import workoutsHistory, {
  resetWorkoutsHistory,
} from "./reducers/workoutsHistory";

import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "./constants/theme";
import AllExercisesScreen from "./pages/stats/AllExercisesScreen";
import AllWorkoutsScreen from "./pages/stats/AllWorkoutsScreen";
import ExercicesChoiceScreen from "./pages/workoutCreation/ExercicesChoiceScreen";
import ExerciceScreen from "./pages/workoutExecution/ExerciceScreen";
import ExercisesByMuscleScreen from "./pages/stats/ExercisesByMuscleScreen";
import ExerciseStatsScreen from "./pages/stats/ExerciseStatsScreen";
import HistoryScreen from "./pages/stats/HistoryScreen";
import HystoryWorkoutScreen from "./pages/stats/HistoryWorkoutsScreen";
import HomeScreen from "./pages/tabs/HomeScreen";
import MuscleGroupScreen from "./pages/workoutCreation/MuscleGroupScreen";
import PasswordForgottenScreen from "./pages/auth/PasswordForgottenScreen";
import ProgressStatsScreen from "./pages/stats/ProgressStatsScreen";
import SettingsScreen from "./pages/tabs/SettingsScreen";
import SigninScreen from "./pages/auth/SigninScreen";
import SignupScreen from "./pages/auth/SignupScreen";
import SongScreen from "./pages/settings/SongScreen";
import StartWorkoutScreen from "./pages/workoutExecution/StartWorkoutScreen";
import TimerScreen from "./pages/workoutExecution/TimerScreen";
import WeightScreen from "./pages/tabs/WeightScreen";
import WorkoutChoiceScreen from "./pages/workoutCreation/WorkoutChoiceScreen";
import WorkoutDifficultyScreen from "./pages/workoutCreation/WorkoutDifficultyScreen";
import WorkoutEndingScreen from "./pages/workoutExecution/WorkoutEndingScreen";
import WorkoutSummaryScreen from "./pages/workoutCreation/WorkoutSummaryScreen";
import WorkoutTypeScreen from "./pages/workoutCreation/WorkoutTypeScreen";
import { RootStackParamList, TabParamList } from "./models/navigation";
import { navigationRef } from "./utils/navigationRef";
import { requestNotificationPermissions } from "./utils/notifications";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const reducers = combineReducers({
  user,
  workouts,
  workoutCreation,
  currentWorkout,
  workoutsHistory,
  timer,
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

type AppDispatch = typeof store.dispatch;

const navigationTheme: Theme = {
  dark: true,
  colors: {
    background: "transparent",
    primary: COLORS.primary,
    card: COLORS.cardBackground,
    text: COLORS.textPrimary,
    border: "transparent",
    notification: COLORS.primary,
  },
};

const TabNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Es-tu sûr de vouloir te déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: () => {
          dispatch(removeAllWorkout());
          dispatch(resetWorkoutsHistory());
          dispatch(logout(undefined));
          navigation.navigate("Signin");
        },
      },
    ]);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
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
              backgroundColor: "rgba(30, 30, 30, 0.85)",
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
  useEffect(() => {
    requestNotificationPermissions();

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data as {
          exerciseID?: string;
          workoutID?: string;
        };
        if (data?.exerciseID && data?.workoutID && navigationRef.isReady()) {
          navigationRef.navigate("timer", {
            exerciseID: data.exerciseID,
            workoutID: data.workoutID,
          });
        }
      },
    );

    return () => subscription.remove();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={["#0D0D36", "#2A1B5A", "#09091F"]}
            style={StyleSheet.absoluteFill}
          />
          <NavigationContainer ref={navigationRef} theme={navigationTheme}>
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
