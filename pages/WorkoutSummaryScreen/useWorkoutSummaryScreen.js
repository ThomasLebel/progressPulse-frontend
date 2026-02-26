import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkoutName,
  removeExercise,
  resetWorkoutCreation,
  updateCustomSets,
} from "../../reducers/workoutCreation";
import { addWorkout } from "../../reducers/workouts";
import {
  buildCustomSets,
  buildWorkoutPayload,
  convertRestForStorage,
  groupExercisesByMuscleGroup,
} from "./workoutSummaryScreen.service";

export function useWorkoutSummaryScreen(navigation, route) {
  const { backTo, categorie = {}, name } = route.params || {};

  const [modalCustomSetsVisible, setModalCustomSetsVisible] = useState(false);
  const [modalTitleVisible, setModalTitleVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseID, setExerciseID] = useState("");
  const [charge, setCharge] = useState("");
  const [nbSets, setNbSets] = useState("");
  const [nbReps, setNbReps] = useState("");
  const [restMinutes, setRestMinutes] = useState("1");
  const [restSeconds, setRestSeconds] = useState("00");
  const [emptyFields, setEmptyFields] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [postError, setPostError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("dumbbell");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const workout = useSelector((state) => state.workoutCreation.value);

  const groupedExercises = groupExercisesByMuscleGroup(workout.exercises);

  const closeModalCustomSets = () => {
    setModalCustomSetsVisible(false);
    setExerciseName("");
    setExerciseID("");
    setMuscleGroup("");
    setCharge("");
    setNbReps("");
    setNbSets("");
    setRestMinutes("");
    setRestSeconds("");
  };

  const openModalCustomSets = (
    exerciseName,
    exerciseID,
    charge,
    nbReps,
    nbSets,
    restMinutes,
    restSeconds,
    muscleGroup,
  ) => {
    setExerciseName(exerciseName);
    setExerciseID(exerciseID);
    setCharge(charge.toString());
    setNbReps(nbReps.toString());
    setNbSets(nbSets.toString());
    setRestMinutes(restMinutes.toString());
    setRestSeconds(restSeconds.toString());
    setModalCustomSetsVisible(true);
    setMuscleGroup(muscleGroup);
  };

  const handleDelete = (exerciseID) => {
    dispatch(removeExercise(exerciseID));
  };

  const updateExercise = () => {
    if (!charge || !nbSets || !nbReps || !restSeconds || !restMinutes) {
      setEmptyFields(true);
      return;
    }
    setEmptyFields(false);
    const customSets = buildCustomSets(nbSets, charge, nbReps);
    const restConverted = convertRestForStorage(restMinutes, restSeconds, muscleGroup);
    const exerciseToUpdate = {
      exerciseID,
      newSets: customSets,
      rest: restConverted,
    };
    dispatch(updateCustomSets(exerciseToUpdate));
    closeModalCustomSets();
  };

  const handleSubmit = () => {
    if (!workoutName) {
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      dispatch(addWorkoutName(workoutName));
      const payload = buildWorkoutPayload(
        user.token,
        workoutName,
        workout.exercises,
        selectedIcon,
      );
      setModalTitleVisible(false);
      setIsLoading(true);
      fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/addWorkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === true) {
            setPostError(false);
            const workoutToAddToStore = {
              _id: data.userWorkout._id,
              name: data.userWorkout.name,
              exercises: data.userWorkout.exercises,
              image: data.userWorkout.image,
            };
            dispatch(addWorkout(workoutToAddToStore));
            setModalTitleVisible(false);
            dispatch(resetWorkoutCreation());
            navigation.navigate("Home");
            setIsLoading(false);
          } else {
            setModalTitleVisible(true);
            setPostError(true);
            setIsLoading(false);
          }
        });
    }
  };

  return {
    backTo,
    name,
    modalCustomSetsVisible,
    modalTitleVisible,
    setModalTitleVisible,
    exerciseName,
    muscleGroup,
    charge,
    setCharge,
    nbSets,
    setNbSets,
    nbReps,
    setNbReps,
    restMinutes,
    setRestMinutes,
    restSeconds,
    setRestSeconds,
    emptyFields,
    workoutName,
    setWorkoutName,
    selectedIcon,
    setSelectedIcon,
    postError,
    isLoading,
    groupedExercises,
    closeModalCustomSets,
    openModalCustomSets,
    handleDelete,
    updateExercise,
    handleSubmit,
  };
}
