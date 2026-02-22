import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkoutInformation,
  resetCurrentWorkout,
} from "../../reducers/currentWorkout";
import {
  removeExercise,
  removeWorkout,
  updateWorkoutName,
  updateWorkoutSets,
} from "../../reducers/workouts";
import { updateNameWorkoutHistory } from "../../reducers/workoutsHistory";
import {
  buildCustomSets,
  computeRestDisplay,
  convertRestToSeconds,
  groupExercisesByMuscleGroup,
} from "./startWorkout.service";

export function useStartWorkout(navigation, workoutID) {
  const [isEditable, setIsEditable] = useState(true);
  const [modalCustomSetsVisible, setModalCustomSetsVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseID, setExerciseID] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [charge, setCharge] = useState("");
  const [nbSets, setNbSets] = useState("");
  const [nbReps, setNbReps] = useState("");
  const [restMinutes, setRestMinutes] = useState("1");
  const [restSeconds, setRestSeconds] = useState("00");
  const [emptyFields, setEmptyFields] = useState(false);
  const [modalTitleVisible, setModalTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const workouts = useSelector((state) => state.workouts.value);
  const workoutSelected = workouts.find((workout) => workout._id === workoutID);
  const currentWorkout = useSelector((state) => state.currentWorkout.value);
  const user = useSelector((state) => state.user.value);

  const [workoutNameInput, setWorkoutNameInput] = useState(
    workoutSelected.name,
  );

  const groupedExercises = groupExercisesByMuscleGroup(
    workoutSelected.exercises,
  );

  const exercisesByGroup = Object.entries(groupedExercises).map(
    ([group, exercises]) => ({
      group,
      exercises: exercises.map((exercise) => {
        const { minutes, seconds } = computeRestDisplay(exercise.rest, group);
        return {
          ...exercise,
          restMinutes: minutes,
          restSeconds: seconds,
        };
      }),
    }),
  );

  const handleDeleteExercise = (exerciseID) => {
    const exerciseToRemove = { workoutID, exerciseID };
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/deleteExercise`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exerciseToRemove),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(removeExercise(exerciseToRemove));
        }
        setIsLoading(false);
      });
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
    setMuscleGroup(muscleGroup);
    setCharge(charge.toString());
    setNbReps(nbReps.toString());
    setNbSets(nbSets.toString());
    setRestMinutes(restMinutes.toString());
    setRestSeconds(restSeconds.toString());
    setModalCustomSetsVisible(true);
  };

  const closeModalCustomSets = () => {
    setModalCustomSetsVisible(false);
    setExerciseName("");
    setExerciseID("");
    setCharge("");
    setNbReps("");
    setNbSets("");
    setRestMinutes("");
    setRestSeconds("");
    setMuscleGroup("");
  };

  const handleChangeName = () => {
    if (workoutNameInput) {
      setEmptyFields(false);
      setModalTitleVisible(false);
      setIsLoading(true);
      fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/updateName`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workoutID,
          newWorkoutName: workoutNameInput,
          token: user.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(updateWorkoutName({ workoutID, newName: workoutNameInput }));
            dispatch(
              updateNameWorkoutHistory({ workoutID, newName: workoutNameInput }),
            );
            setIsLoading(false);
          } else {
            setEmptyFields(true);
            setIsLoading(false);
          }
        });
    } else {
      setEmptyFields(true);
      setIsLoading(false);
    }
  };

  const handleUpdateExercise = () => {
    if (!charge || !nbSets || !nbReps || !restSeconds || !restMinutes) {
      setEmptyFields(true);
      return;
    }
    setEmptyFields(false);
    const customSets = buildCustomSets(nbSets, charge, nbReps);
    const restConverted = convertRestToSeconds(
      restMinutes,
      restSeconds,
      muscleGroup,
    );
    const updateExerciseSets = {
      workoutID,
      exerciseID,
      customSets,
      rest: restConverted,
    };
    closeModalCustomSets();
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/updateSets`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateExerciseSets),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          dispatch(updateWorkoutSets(updateExerciseSets));
        }
        setIsLoading(false);
      });
  };

  const startExercise = (exerciseID) => {
    navigation.navigate("exercice", { exerciseID, workoutID });
  };

  const handlePressButton = () => {
    if (isEditable) {
      setIsEditable(false);
      dispatch(addWorkoutInformation({ userToken: user.token, workoutID }));
    } else {
      navigation.navigate("workoutEnding", { workoutID });
    }
  };

  const handleGoToHome = () => {
    if (currentWorkout.workout) {
      Alert.alert(
        "Attention",
        "La séance est démarée, en quittant cette page vous perdrez votre progression.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Abandonner ma séance",
            onPress: () => {
              dispatch(resetCurrentWorkout());
              navigation.navigate("Home");
            },
          },
        ],
      );
    } else {
      navigation.navigate("Home");
    }
  };

  const handleDeleteWorkout = () => {
    setIsLoading(true);
    fetch(
      `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/deleteWorkout/${workoutID}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.deleted > 0) {
          dispatch(removeWorkout(workoutID));
          navigation.navigate("Home");
        }
        setIsLoading(false);
      });
  };

  const openAlertDeleteWorkout = () => {
    Alert.alert(
      "Attention",
      "Êtes-vous sûr de vouloir supprimer cette séance ? Notez que l'historique associé à cette séance restera accessible dans la section suivie de séance",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", onPress: () => handleDeleteWorkout() },
      ],
    );
  };

  const handleAddExercise = () => {
    navigation.navigate("muscleGroup", {
      isWorkoutAlreadyCreated: true,
      workoutID,
    });
  };

  return {
    isEditable,
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
    isLoading,
    workoutNameInput,
    setWorkoutNameInput,
    workoutSelected,
    exercisesByGroup,
    openModalCustomSets,
    closeModalCustomSets,
    handleChangeName,
    handleUpdateExercise,
    handleDeleteExercise,
    startExercise,
    handlePressButton,
    handleGoToHome,
    openAlertDeleteWorkout,
    handleAddExercise,
  };
}
