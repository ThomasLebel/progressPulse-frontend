import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  addWorkoutInformation,
  resetCurrentWorkout,
} from '../../../reducers/currentWorkout';
import {
  removeExercise,
  removeWorkout,
  updateWorkoutImage,
  updateWorkoutName,
  updateWorkoutSets,
} from '../../../reducers/workouts';
import { updateNameWorkoutHistory } from '../../../reducers/workoutsHistory';
import { RootStackParamList } from '../../../models/navigation';
import { RootState } from '../../../reducers/store.types';
import { Workout } from '../../../shared/types';
import {
  apiDeleteExercise,
  apiDeleteWorkout,
  apiUpdateWorkoutName,
  apiUpdateWorkoutSets,
  UpdateExerciseSetsPayload,
} from './startWorkout.api';
import {
  buildCustomSets,
  computeRestDisplay,
  convertRestToSeconds,
  groupExercisesByMuscleGroup,
  WorkoutExerciseWithRest,
} from './startWorkout.service';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export interface ExerciseGroup {
  group: string;
  exercises: WorkoutExerciseWithRest[];
}

export function useStartWorkout(navigation: Navigation, workoutID: string) {
  const currentWorkout = useSelector((state: RootState) => state.currentWorkout.value);
  const [isEditable, setIsEditable] = useState(currentWorkout.workout !== workoutID);
  const [modalCustomSetsVisible, setModalCustomSetsVisible] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseID, setExerciseID] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('');
  const [charge, setCharge] = useState('');
  const [nbSets, setNbSets] = useState('');
  const [nbReps, setNbReps] = useState('');
  const [restMinutes, setRestMinutes] = useState('1');
  const [restSeconds, setRestSeconds] = useState('00');
  const [emptyFields, setEmptyFields] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [modalTitleVisible, setModalTitleVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const workouts = useSelector((state: RootState) => state.workouts.value);
  const workoutSelected = workouts.find((workout) => workout._id === workoutID) as Workout;
  const user = useSelector((state: RootState) => state.user.value);

  const [workoutNameInput, setWorkoutNameInput] = useState(workoutSelected.name);
  const [selectedIcon, setSelectedIcon] = useState(workoutSelected.image || 'dumbbell');

  const groupedExercises = groupExercisesByMuscleGroup(workoutSelected.exercises);

  const exercisesByGroup: ExerciseGroup[] = Object.entries(groupedExercises).map(
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
    })
  );

  const handleDeleteExercise = (exerciseID: string) => {
    const exerciseToRemove = { workoutID, exerciseID };
    setIsLoading(true);
    apiDeleteExercise(workoutID, exerciseID).then((data) => {
      if (data.result === true) {
        dispatch(removeExercise(exerciseToRemove));
      }
      setIsLoading(false);
    });
  };

  const openModalCustomSets = (
    exerciseName: string,
    exerciseID: string,
    charge: number,
    nbReps: number,
    nbSets: number,
    restMinutes: number,
    restSeconds: number,
    muscleGroup: string
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
    setExerciseName('');
    setExerciseID('');
    setCharge('');
    setNbReps('');
    setNbSets('');
    setRestMinutes('');
    setRestSeconds('');
    setMuscleGroup('');
  };

  const handleChangeName = () => {
    if (!selectedIcon) {
      setIconError(true);
      return;
    }
    if (!workoutNameInput) {
      setEmptyFields(true);
      return;
    }
    setEmptyFields(false);
    setIconError(false);
    setIsLoading(true);
    setModalTitleVisible(false);
    apiUpdateWorkoutName(workoutID, workoutNameInput, selectedIcon, user.token as string).then(
      (data) => {
        if (data.result) {
          dispatch(updateWorkoutName({ workoutID, newName: workoutNameInput }));
          dispatch(updateWorkoutImage({ workoutID, newImage: selectedIcon }));
          dispatch(updateNameWorkoutHistory({ workoutID, newName: workoutNameInput }));
          setIsLoading(false);
        } else {
          setModalTitleVisible(true);
          setEmptyFields(true);
          setIsLoading(false);
        }
      }
    );
  };

  const handleUpdateExercise = () => {
    if (!charge || !nbSets || !nbReps || !restSeconds || !restMinutes) {
      setEmptyFields(true);
      return;
    }
    setEmptyFields(false);
    const customSets = buildCustomSets(nbSets, charge, nbReps);
    const restConverted = convertRestToSeconds(restMinutes, restSeconds, muscleGroup);
    const updateExerciseSets: UpdateExerciseSetsPayload = {
      workoutID,
      exerciseID,
      customSets,
      rest: restConverted,
    };
    closeModalCustomSets();
    setIsLoading(true);
    apiUpdateWorkoutSets(updateExerciseSets)
      .then((data) => {
        if (data.result === true) {
          dispatch(updateWorkoutSets(updateExerciseSets));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('updateSets fetch error:', error);
        setIsLoading(false);
      });
  };

  const startExercise = (exerciseID: string) => {
    navigation.navigate('exercice', { exerciseID, workoutID });
  };

  const startWorkoutSession = () => {
    setIsEditable(false);
    dispatch(addWorkoutInformation({ userToken: user.token as string, workoutID }));
  };

  const handlePressButton = () => {
    if (isEditable) {
      if (currentWorkout.workout && currentWorkout.workout !== workoutID) {
        const ongoingWorkout = workouts.find((w) => w._id === currentWorkout.workout);
        const ongoingName = ongoingWorkout ? ongoingWorkout.name : 'une séance';
        Alert.alert(
          'Séance en cours',
          `La séance "${ongoingName}" n'a pas été enregistrée. En lançant une nouvelle séance, vous perdrez les données saisies.`,
          [
            { text: 'Annuler', style: 'cancel' },
            {
              text: 'Démarrer quand même',
              style: 'destructive',
              onPress: () => {
                dispatch(resetCurrentWorkout());
                startWorkoutSession();
              },
            },
          ]
        );
      } else {
        startWorkoutSession();
      }
    } else {
      navigation.navigate('workoutEnding', { workoutID });
    }
  };

  const handleGoToHome = () => {
    navigation.navigate('TabNavigator', { screen: 'Home' });
  };

  const handleDeleteWorkout = () => {
    setIsLoading(true);
    apiDeleteWorkout(workoutID).then((data) => {
      if (data.deleted > 0) {
        dispatch(removeWorkout(workoutID));
        navigation.navigate('TabNavigator', { screen: 'Home' });
      }
      setIsLoading(false);
    });
  };

  const openAlertDeleteWorkout = () => {
    Alert.alert(
      'Attention',
      "Êtes-vous sûr de vouloir supprimer cette séance ? Notez que l'historique associé à cette séance restera accessible dans la section suivie de séance",
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => handleDeleteWorkout() },
      ]
    );
  };

  const handleAddExercise = () => {
    navigation.navigate('muscleGroup', { isWorkoutAlreadyCreated: true, workoutID });
  };

  const handleStopWorkout = () => {
    Alert.alert(
      'Arrêter la séance',
      'Êtes-vous sûr de vouloir arrêter la séance en cours ? Les données saisies seront perdues.',
      [
        { text: 'Continuer', style: 'cancel' },
        {
          text: 'Arrêter',
          style: 'destructive',
          onPress: () => {
            dispatch(resetCurrentWorkout());
            setIsEditable(true);
          },
        },
      ]
    );
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
    iconError,
    isLoading,
    workoutNameInput,
    setWorkoutNameInput,
    selectedIcon,
    setSelectedIcon,
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
    handleStopWorkout,
  };
}
