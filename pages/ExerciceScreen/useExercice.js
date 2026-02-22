import { Dimensions } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import images from "../../utils/images";
import {
  findExerciseImage,
  splitDescriptionIntoSentences,
  formatHistoryDate,
  formatCardioDuration,
} from "./exercice.service";

export function useExercice(navigation, route) {
  const { workoutID, exerciseID } = route.params || {};

  const screenWidth = Dimensions.get("window").width;

  const workouts = useSelector((state) => state.workouts.value);
  const currentWorkout = useSelector((state) => state.currentWorkout.value);
  const workoutsHistory = useSelector((state) => state.workoutsHistory.value);

  const workoutSelected = workouts.find((workout) => workout._id === workoutID);
  const exerciseSelected = workoutSelected.exercises.find(
    (exercise) => exercise.exercise._id === exerciseID,
  );
  const muscleGroup = exerciseSelected.exercise.muscleGroupe;
  const imagePath = findExerciseImage(exerciseSelected.exercise, images);
  const descriptionSentences = splitDescriptionIntoSentences(
    exerciseSelected.exercise.description,
  );

  const [currentSet, setCurrentSet] = useState(1);

  useEffect(() => {
    const exerciseExist = currentWorkout.performances.find(
      (e) => e.exercise === exerciseID,
    );
    if (exerciseExist) {
      setCurrentSet(exerciseExist.sets.length + 1);
    }
  }, [currentWorkout]);

  const currentWorkoutHistory = workoutsHistory.filter(
    (workout) => workout.workoutID === workoutID,
  );
  const sortedCurrentWorkoutHistory = currentWorkoutHistory.sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  const hasHistory = sortedCurrentWorkoutHistory.some((history) =>
    history.performances.some((p) => p.exercise._id === exerciseID),
  );

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const goBack = () => navigation.navigate("startWorkout", { workoutID });
  const goToTimer = () =>
    navigation.navigate("timer", { exerciseID, workoutID });

  return {
    exerciseSelected,
    muscleGroup,
    imagePath,
    descriptionSentences,
    screenWidth,
    currentSet,
    hasHistory,
    sortedCurrentWorkoutHistory,
    exerciseID,
    workoutID,
    modalVisible,
    openModal,
    closeModal,
    goBack,
    goToTimer,
    formatHistoryDate,
    formatCardioDuration,
  };
}
