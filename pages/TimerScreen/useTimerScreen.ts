import { Audio } from "expo-av";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { addExerciseSet } from "../../reducers/currentWorkout";
import { RootState } from "../../reducers/store.types";
import { RootStackParamList } from "../../models/navigation";
import sounds from "../../utils/sounds";
import {
  buildSetPayload,
  convertRestTime,
  formatMinuteTime,
  formatSecondTime,
} from "./timerScreen.service";

type TimerNavProp = NativeStackNavigationProp<RootStackParamList, "timer">;
type TimerRouteProp = RouteProp<RootStackParamList, "timer">;

export function useTimerScreen(
  navigation: TimerNavProp,
  route: TimerRouteProp
) {
  const { workoutID, exerciseID } = route.params;
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);

  async function playSound() {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(sounds[user.sound as keyof typeof sounds]);
    setCurrentSound(sound);
    await sound.playAsync();
  }

  async function stopSound() {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
  }

  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [input, setInput] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const currentWorkout = useSelector((state: RootState) => state.currentWorkout.value);
  const currentExercise = currentWorkout.performances.find(
    (e) => e.exercise === exerciseID
  );

  const workouts = useSelector((state: RootState) => state.workouts.value);
  const workoutSelected = workouts.find((workout) => workout._id === workoutID);
  const exerciseSelected = workoutSelected!.exercises.find(
    (exercise) => exercise.exercise._id === exerciseID
  );
  const muscleGroup = exerciseSelected!.exercise.muscleGroupe;
  const nbSets = exerciseSelected!.customSets.length;
  const restTime = exerciseSelected!.rest;

  const { minutes: restMinutes, seconds: restSeconds } = convertRestTime(restTime);

  const [minutes, setMinutes] = useState(restMinutes);
  const [secondes, setSecondes] = useState(restSeconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const time = parseInt(minutes) * 60 + parseFloat(secondes);

  const timerClick = () => {
    setIsPlaying(true);
    setIsTimerVisible(true);
  };

  const addSet = () => {
    if (muscleGroup !== "Cardio") {
      if (!reps || !weight) {
        setEmptyFields(true);
        setInput(false);
      } else {
        setEmptyFields(false);
        setInput(true);
      }
    } else {
      if (!weight) {
        setEmptyFields(true);
        setInput(false);
      } else {
        setEmptyFields(false);
        setInput(true);
      }
    }
  };

  const validateSet = (endTimer?: string) => {
    if (endTimer === "onComplete") {
      playSound();
    }
    if (muscleGroup !== "Cardio") {
      if (input) {
        const setToAdd = buildSetPayload({
          exerciseID,
          weight,
          reps,
          minutes,
          secondes,
        });
        dispatch(addExerciseSet(setToAdd));
        if (currentExercise) {
          if (currentExercise.sets.length + 1 < nbSets) {
            navigation.navigate("exercice", { exerciseID, workoutID });
          } else {
            navigation.navigate("startWorkout", { workoutID });
            stopSound();
          }
        } else {
          if (nbSets === 1) {
            navigation.navigate("startWorkout", { workoutID });
            stopSound();
          } else {
            navigation.navigate("exercice", { exerciseID, workoutID });
            stopSound();
          }
        }
      } else {
        setEmptyFields(true);
      }
    } else {
      if (input) {
        setEmptyFields(false);
        const setToAdd = buildSetPayload({
          exerciseID,
          weight,
          reps: 1,
          minutes,
          secondes,
        });
        dispatch(addExerciseSet(setToAdd));
        navigation.navigate("startWorkout", { workoutID });
      } else {
        setEmptyFields(true);
      }
    }
  };

  const handleTimerComplete = () => validateSet("onComplete");

  const updateSet = () => {
    setInput(false);
  };

  const handleOpenPicker = () => setShowPicker(true);
  const handleCancelPicker = () => setShowPicker(false);
  const handleConfirmPicker = (pickedDuration: { minutes?: number; seconds?: number }) => {
    const m = formatMinuteTime(pickedDuration);
    const s = formatSecondTime(pickedDuration);
    if (m !== undefined) setMinutes(m);
    if (s !== undefined) setSecondes(s);
    setShowPicker(false);
  };

  return {
    muscleGroup,
    reps,
    setReps,
    weight,
    setWeight,
    emptyFields,
    input,
    showPicker,
    setShowPicker,
    minutes,
    secondes,
    isPlaying,
    isTimerVisible,
    time,
    timerClick,
    addSet,
    validateSet,
    handleTimerComplete,
    updateSet,
    handleOpenPicker,
    handleCancelPicker,
    handleConfirmPicker,
  };
}
