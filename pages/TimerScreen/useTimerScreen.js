import { Audio } from "expo-av";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExerciseSet } from "../../reducers/currentWorkout";
import sounds from "../../utils/sounds";
import {
  buildSetPayload,
  convertRestTime,
  formatMinuteTime,
  formatSecondTime,
} from "./timerScreen.service";

export function useTimerScreen(navigation, route) {
  const { workoutID, exerciseID } = route.params || {};
  const [currentSound, setCurrentSound] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  async function playSound() {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(sounds[user.sound]);
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

  // Récupération des données de la séance en cours
  const currentWorkout = useSelector((state) => state.currentWorkout.value);
  // Récupération de l'exercice en cours
  const currentExercise = currentWorkout.performances.find(
    (e) => e.exercise === exerciseID,
  );

  // Récupération de la séance en cours
  const workouts = useSelector((state) => state.workouts.value);
  const workoutSelected = workouts.find((workout) => workout._id === workoutID);
  // Récupération de l'exercice sélectionné dans la séance
  const exerciseSelected = workoutSelected.exercises.find(
    (exercise) => exercise.exercise._id === exerciseID,
  );
  // Stockage du nom du groupe musculaire de l'exercice sélectionné
  const muscleGroup = exerciseSelected.exercise.muscleGroupe;
  // Récupération du nombre de série à faire
  const nbSets = exerciseSelected.customSets.length;
  // Récupération du temps de repos de l'exercice
  const restTime = exerciseSelected.rest;

  const { minutes: restMinutes, seconds: restSeconds } =
    convertRestTime(restTime);

  const [minutes, setMinutes] = useState(restMinutes);
  const [secondes, setSecondes] = useState(restSeconds);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  // Converti les minutes et les secondes formaté en nombre de secondes
  const time = minutes * 60 + parseFloat(secondes);

  // Permet de lancer et de rendre visible le minuteur
  const timerClick = () => {
    setIsPlaying(true);
    setIsTimerVisible(true);
  };

  // Vérifie si les input sont bien remplis et sauvegarde les données rentrées
  const addSet = () => {
    if (muscleGroup != "Cardio") {
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

  // Je passe un argument à la fonction qui me sert de condition pour savoir où la fonction a été apellé.
  // Parce qu' elle est utilisée 2 fois dans le code. Je veux que le son se joue à la fin du timer et non pas lors de la navigation
  const validateSet = (endTimer) => {
    if (endTimer === "onComplete") {
      playSound();
    }
    if (muscleGroup != "Cardio") {
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
            navigation.navigate("exercice", {
              exerciseID: exerciseID,
              workoutID: workoutID,
            });
          } else {
            navigation.navigate("startWorkout", { workoutID: workoutID });
            stopSound();
          }
        } else {
          if (nbSets === 1) {
            navigation.navigate("startWorkout", { workoutID: workoutID });
            stopSound();
          } else {
            navigation.navigate("exercice", {
              exerciseID: exerciseID,
              workoutID: workoutID,
            });
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
        navigation.navigate("startWorkout", { workoutID: workoutID });
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
  const handleConfirmPicker = (pickedDuration) => {
    setMinutes(formatMinuteTime(pickedDuration));
    setSecondes(formatSecondTime(pickedDuration));
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
