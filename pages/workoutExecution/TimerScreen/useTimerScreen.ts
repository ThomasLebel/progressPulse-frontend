import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio } from "expo-av";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootStackParamList } from "../../../models/navigation";
import { addExerciseSet } from "../../../reducers/currentWorkout";
import { RootState } from "../../../reducers/store.types";
import sounds from "../../../utils/sounds";
import {
  buildSetPayload,
  convertRestTime,
  formatMinuteTime,
  formatSecondTime,
} from "./timerScreen.service";

// ─── Types ───────────────────────────────────────────────────────────────────

type TimerNavProp = NativeStackNavigationProp<RootStackParamList, "timer">;
type TimerRouteProp = RouteProp<RootStackParamList, "timer">;

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTimerScreen(
  navigation: TimerNavProp,
  route: TimerRouteProp,
) {
  const { workoutID, exerciseID } = route.params;

  // ── Redux ──────────────────────────────────────────────────────────────────

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  const workouts = useSelector((state: RootState) => state.workouts.value);
  const currentWorkout = useSelector(
    (state: RootState) => state.currentWorkout.value,
  );

  // ── Derived data ───────────────────────────────────────────────────────────

  const currentExercise = currentWorkout.performances.find(
    (e) => e.exercise === exerciseID,
  );

  const workoutSelected = workouts.find((w) => w._id === workoutID);
  const exerciseSelected = workoutSelected!.exercises.find(
    (e) => e.exercise._id === exerciseID,
  );

  const muscleGroup = exerciseSelected!.exercise.muscleGroupe;
  const nbSets = exerciseSelected!.customSets.length;
  const restTime = exerciseSelected!.rest;
  const repsGoal = exerciseSelected!.customSets[0].reps;
  const weightGoal = exerciseSelected!.customSets[0].weight;
  const currentSet = currentExercise ? currentExercise.sets.length + 1 : 1;

  const { minutes: restMinutes, seconds: restSeconds } =
    convertRestTime(restTime);

  // ── Local state ────────────────────────────────────────────────────────────

  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);

  const [reps, setReps] = useState(repsGoal.toString());
  const [weight, setWeight] = useState(weightGoal.toString());
  const [minutes, setMinutes] = useState(restMinutes);
  const [secondes, setSecondes] = useState(restSeconds);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [input, setInput] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const time = parseInt(minutes) * 60 + parseFloat(secondes);

  // ── Sound ──────────────────────────────────────────────────────────────────

  async function playSound() {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(
      sounds[user.sound as keyof typeof sounds],
    );
    setCurrentSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
  }

  // ── Navigation helpers ─────────────────────────────────────────────────────

  function navigateAfterSet() {
    const completedSets = currentExercise ? currentExercise.sets.length + 1 : 1;

    if (completedSets < nbSets) {
      navigation.navigate("exercice", { exerciseID, workoutID });
    } else {
      navigation.navigate("startWorkout", { workoutID });
      stopSound();
    }
  }

  // ── Set management ─────────────────────────────────────────────────────────

  const isCardio = muscleGroup === "Cardio";

  function validateFields() {
    const isValid = isCardio ? !!weight : !!reps && !!weight;
    setEmptyFields(!isValid);
    setInput(isValid);
  }

  const addSet = () => validateFields();

  const updateSet = () => setInput(false);

  const addRep = () => {
    const newReps = parseInt(reps) + 1;
    setReps(newReps.toString());
  };

  const removeRep = () => {
    if (reps === "0") return;
    const newReps = parseInt(reps) - 1;
    setReps(newReps.toString());
  };

  const addWeight = () => {
    let newWeight = 0;
    if (muscleGroup === "Cardio") {
      newWeight = parseFloat(weight) + 0.5;
    } else {
      newWeight = parseFloat(weight) + 1.25;
    }

    setWeight(newWeight.toString());
  };

  const removeWeight = () => {
    let newWeight = 0;
    if (muscleGroup === "Cardio") {
      newWeight = parseFloat(weight) - 0.5;
    } else {
      newWeight = parseFloat(weight) - 1.25;
    }

    if (newWeight < 0) {
      setWeight("0");
    } else {
      setWeight(newWeight.toString());
    }
  };

  const validateSet = (endTimer?: string) => {
    if (endTimer === "onComplete") {
      playSound();
    }

    if (!input) {
      setEmptyFields(true);
      return;
    }

    setEmptyFields(false);

    const setToAdd = buildSetPayload({
      exerciseID,
      weight,
      reps: isCardio ? 1 : reps,
      minutes,
      secondes,
    });

    dispatch(addExerciseSet(setToAdd));

    if (isCardio) {
      navigation.navigate("startWorkout", { workoutID });
      return;
    }

    navigateAfterSet();
  };

  const handleTimerComplete = () => validateSet("onComplete");

  // ── Timer ──────────────────────────────────────────────────────────────────

  const timerClick = () => {
    setIsPlaying(true);
    setIsTimerVisible(true);
  };

  const handleAddTime = () => {
    if (secondes == "45") {
      setSecondes("00");
      const m = formatMinuteTime({ minutes: parseInt(minutes) + 1 });
      if (m !== undefined) setMinutes(m);
    } else {
      const s = formatSecondTime({ seconds: parseInt(secondes) + 15 });
      if (s !== undefined) setSecondes(s);
    }
  };

  const handleRemoveTime = () => {
    if (secondes == "00" && minutes == "00") return;
    if (secondes == "00") {
      setSecondes("45");
      const m = formatMinuteTime({ minutes: parseInt(minutes) - 1 });
      if (m !== undefined) setMinutes(m);
    } else {
      const s = formatSecondTime({ seconds: parseInt(secondes) - 15 });
      if (s !== undefined) setSecondes(s);
    }
  };

  // ── Picker ─────────────────────────────────────────────────────────────────

  const handleOpenPicker = () => setShowPicker(true);
  const handleCancelPicker = () => setShowPicker(false);

  const handleConfirmPicker = (pickedDuration: {
    minutes?: number;
    seconds?: number;
  }) => {
    const m = formatMinuteTime(pickedDuration);
    const s = formatSecondTime(pickedDuration);
    if (m !== undefined) setMinutes(m);
    if (s !== undefined) setSecondes(s);
    setShowPicker(false);
  };

  // ── Return ─────────────────────────────────────────────────────────────────

  return {
    // Data
    muscleGroup,
    currentSet,
    exerciseSelected,
    nbSets,
    // Form
    reps,
    setReps,
    weight,
    setWeight,
    emptyFields,
    input,
    // Timer
    time,
    minutes,
    secondes,
    isPlaying,
    isTimerVisible,
    timerClick,
    handleAddTime,
    handleRemoveTime,
    handleTimerComplete,
    // Picker
    showPicker,
    setShowPicker,
    handleOpenPicker,
    handleCancelPicker,
    handleConfirmPicker,
    // Actions
    addSet,
    validateSet,
    updateSet,
    removeRep,
    addRep,
    addWeight,
    removeWeight,
  };
}
