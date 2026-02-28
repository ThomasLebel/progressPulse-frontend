import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { resetCurrentWorkout } from "../../../reducers/currentWorkout";
import { addWorkout } from "../../../reducers/workoutsHistory";
import { RootState } from "../../../reducers/store.types";
import { RootStackParamList } from "../../../models/navigation";
import { postWorkoutHistory } from "./workoutEndingScreen.api";
import { buildStarsData, buildWorkoutPayload, StarData } from "./workoutEndingScreen.service";

type WorkoutEndingNavProp = NativeStackNavigationProp<RootStackParamList, "workoutEnding">;
type WorkoutEndingRouteProp = RouteProp<RootStackParamList, "workoutEnding">;

export function useWorkoutEndingScreen(
  navigation: WorkoutEndingNavProp,
  route: WorkoutEndingRouteProp
) {
  const { workoutID } = route.params;
  const dispatch = useDispatch();

  const [personnalNote, setPersonnalNote] = useState(0);
  const [ressenti, setRessenti] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentWorkout = useSelector((state: RootState) => state.currentWorkout.value);

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, []);

  const starsData: StarData[] = buildStarsData(personnalNote);

  const handlePress = () => {
    const payload = buildWorkoutPayload(currentWorkout, personnalNote, ressenti);
    setIsLoading(true);
    postWorkoutHistory(payload).then((data) => {
      dispatch(addWorkout(data.workoutAdded));
      dispatch(resetCurrentWorkout());
      navigation.navigate("TabNavigator", { screen: "Home" });
      setIsLoading(false);
    });
  };

  const handleBack = () => {
    navigation.navigate("startWorkout", { workoutID });
  };

  return {
    personnalNote,
    setPersonnalNote,
    ressenti,
    setRessenti,
    isLoading,
    starsData,
    handlePress,
    handleBack,
  };
}
