import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import images from "../../utils/images";
import { addExercise } from "../../reducers/workoutCreation";
import { updateExercises } from "../../reducers/workouts";
import {
  sortExercisesByName,
  getExerciseImagePath,
  validateStrengthFields,
  validateCardioFields,
  buildStrengthExercise,
  buildCardioExercise,
} from "./exercicesChoice.service";

export function useExercicesChoice(navigation, route) {
  const { name, isWorkoutAlreadyCreated, workoutID } = route.params;
  const dispatch = useDispatch();

  const [exercisesList, setExercisesList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseID, setExerciseID] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [charge, setCharge] = useState("");
  const [nbSets, setNbSets] = useState("");
  const [nbReps, setNbReps] = useState("");
  const [restMinutes, setRestMinutes] = useState("1");
  const [restSeconds, setRestSeconds] = useState("00");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isCardio, setIsCardio] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsCardio(name === "Cardio");
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/exercises/${name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setExercisesList(data.data);
          setIsLoading(false);
        }
      });
  }, []);

  const handleBack = () => {
    navigation.navigate("muscleGroup", { workoutID, isWorkoutAlreadyCreated });
  };

  const handleValidate = () => {
    if (!isWorkoutAlreadyCreated) {
      navigation.navigate("workoutSummary", { backTo: "muscleGroup" });
    } else {
      navigation.navigate("startWorkout", { workoutID });
    }
  };

  const validateLabel = isWorkoutAlreadyCreated ? "Retourner à ma séance" : "Voir le récap";

  const openModal = (textButton, id, image) => {
    setModalVisible(true);
    setExerciseName(textButton);
    setExerciseID(id);
    setImagePath(image);
  };

  const closeModal = () => {
    setCharge("");
    setExerciseID("");
    setExerciseName("");
    setNbReps("");
    setNbSets("");
    setRestMinutes("1");
    setRestSeconds("00");
    setModalVisible(false);
  };

  const addToWorkout = () => {
    if (!isCardio) {
      if (!validateStrengthFields(charge, nbReps, nbSets, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildStrengthExercise(exerciseID, exerciseName, name, charge, nbSets, nbReps, restMinutes, restSeconds, imagePath);
        dispatch(addExercise(exerciseToAdd));
        closeModal();
      }
    } else {
      if (!validateCardioFields(charge, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildCardioExercise(exerciseID, exerciseName, name, charge, restMinutes, restSeconds);
        dispatch(addExercise(exerciseToAdd));
        closeModal();
      }
    }
  };

  const addToExistingWorkout = () => {
    if (!isCardio) {
      if (!validateStrengthFields(charge, nbReps, nbSets, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildStrengthExercise(exerciseID, exerciseName, name, charge, nbSets, nbReps, restMinutes, restSeconds, imagePath);
        closeModal();
        setIsLoading(true);
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/addExercise`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workoutID, exerciseToAdd }),
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch(updateExercises({ workoutID, exercisesToUpdate: data.updatedWorkout.exercises }));
            setIsLoading(false);
          });
      }
    } else {
      if (!validateCardioFields(charge, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildCardioExercise(exerciseID, exerciseName, name, charge, restMinutes, restSeconds);
        closeModal();
        setIsLoading(true);
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/addExercise`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ workoutID, exerciseToAdd }),
        })
          .then((response) => response.json())
          .then((data) => {
            dispatch(updateExercises({ workoutID, exercisesToUpdate: data.updatedWorkout.exercises }));
            setIsLoading(false);
          });
      }
    }
  };

  const sortedExercises = sortExercisesByName(exercisesList).map((exercise) => ({
    ...exercise,
    imagePath: getExerciseImagePath(exercise, images),
  }));

  return {
    name,
    isWorkoutAlreadyCreated,
    workoutID,
    sortedExercises,
    modalVisible,
    exerciseName,
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
    isCardio,
    isLoading,
    handleBack,
    handleValidate,
    validateLabel,
    openModal,
    closeModal,
    addToWorkout,
    addToExistingWorkout,
  };
}
