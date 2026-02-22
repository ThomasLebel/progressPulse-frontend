import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCurrentWorkout } from "../../reducers/currentWorkout";
import { addWorkout } from "../../reducers/workoutsHistory";
import {
  buildStarsData,
  buildWorkoutPayload,
} from "./workoutEndingScreen.service";

export function useWorkoutEndingScreen(navigation, route) {
  const { workoutID } = route.params;
  const dispatch = useDispatch();

  const [personnalNote, setPersonnalNote] = useState(0);
  const [ressenti, setRessenti] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentWorkout = useSelector((state) => state.currentWorkout.value);

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, []);

  const starsData = buildStarsData(personnalNote);

  const handlePress = () => {
    const payload = buildWorkoutPayload(
      currentWorkout,
      personnalNote,
      ressenti,
    );
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/histories/addWorkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addWorkout(data.workoutAdded));
        dispatch(resetCurrentWorkout());
        navigation.navigate("Home");
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
