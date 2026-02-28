import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import images from "../../../utils/images";
import { addExercise } from "../../../reducers/workoutCreation";
import { updateExercises } from "../../../reducers/workouts";
import { RootStackParamList } from "../../../models/navigation";
import { Exercise } from "../../../shared/types";
import {
  sortExercisesByName,
  getExerciseImagePath,
  validateStrengthFields,
  validateCardioFields,
  buildStrengthExercise,
  buildCardioExercise,
} from "./exercicesChoice.service";
import { fetchExercisesByMuscle, addExerciseToWorkout } from "./exercicesChoice.api";

type ExerciseWithPath = Exercise & { imagePath: number | undefined };

export function useExercicesChoice(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  route: RouteProp<RootStackParamList, "exercicesChoices">
) {
  const { name, isWorkoutAlreadyCreated, workoutID } = route.params;
  const dispatch = useDispatch();

  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [exerciseID, setExerciseID] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [imagePath, setImagePath] = useState<number | undefined>(undefined);
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
    fetchExercisesByMuscle(name).then((exercises) => {
      setExercisesList(exercises);
      setIsLoading(false);
    });
  }, []);

  const handleBack = () => {
    navigation.navigate("muscleGroup", {
      workoutID: workoutID ?? undefined,
      isWorkoutAlreadyCreated,
    });
  };

  const handleValidate = () => {
    if (!isWorkoutAlreadyCreated) {
      navigation.navigate("workoutSummary", { backTo: "muscleGroup" });
    } else {
      navigation.navigate("startWorkout", { workoutID: workoutID as string });
    }
  };

  const validateLabel = isWorkoutAlreadyCreated
    ? "Retourner à ma séance"
    : "Voir le récap";

  const openModal = (textButton: string, id: string, image: number | undefined) => {
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
        const exerciseToAdd = buildStrengthExercise(
          exerciseID, exerciseName, name, charge, nbSets, nbReps, restMinutes, restSeconds, imagePath
        );
        dispatch(addExercise(exerciseToAdd));
        closeModal();
      }
    } else {
      if (!validateCardioFields(charge, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildCardioExercise(
          exerciseID, exerciseName, name, charge, restMinutes, restSeconds
        );
        dispatch(addExercise(exerciseToAdd));
        closeModal();
      }
    }
  };

  const addToExistingWorkout = async () => {
    if (!isCardio) {
      if (!validateStrengthFields(charge, nbReps, nbSets, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildStrengthExercise(
          exerciseID, exerciseName, name, charge, nbSets, nbReps, restMinutes, restSeconds, imagePath
        );
        closeModal();
        setIsLoading(true);
        const exercises = await addExerciseToWorkout(workoutID as string, exerciseToAdd);
        dispatch(updateExercises({ workoutID: workoutID as string, exercisesToUpdate: exercises }));
        setIsLoading(false);
      }
    } else {
      if (!validateCardioFields(charge, restMinutes, restSeconds)) {
        setEmptyFields(true);
      } else {
        setEmptyFields(false);
        const exerciseToAdd = buildCardioExercise(
          exerciseID, exerciseName, name, charge, restMinutes, restSeconds
        );
        closeModal();
        setIsLoading(true);
        const exercises = await addExerciseToWorkout(workoutID as string, exerciseToAdd);
        dispatch(updateExercises({ workoutID: workoutID as string, exercisesToUpdate: exercises }));
        setIsLoading(false);
      }
    }
  };

  const sortedExercises: ExerciseWithPath[] = sortExercisesByName(exercisesList).map(
    (exercise) => ({
      ...exercise,
      imagePath: getExerciseImagePath(exercise, images),
    })
  );

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
