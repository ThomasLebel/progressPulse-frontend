import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import images from '../../utils/images';
import {
  findExerciseImage,
  splitDescriptionIntoSentences,
  formatHistoryDate,
  formatCardioDuration,
} from './exercice.service';
import { RootState } from '../../reducers/store.types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../models/navigation';
import { WorkoutExercise } from '../../shared/types';

type ExerciceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'exercice'>;
type ExerciceRouteProp = RouteProp<RootStackParamList, 'exercice'>;

export function useExercice(
  navigation: ExerciceNavigationProp,
  route: ExerciceRouteProp,
) {
  const { workoutID, exerciseID } = route.params;

  const screenWidth = Dimensions.get('window').width;

  const workouts = useSelector((state: RootState) => state.workouts.value);
  const currentWorkout = useSelector((state: RootState) => state.currentWorkout.value);
  const workoutsHistory = useSelector((state: RootState) => state.workoutsHistory.value);

  const workoutSelected = workouts.find((workout) => workout._id === workoutID);
  const exerciseSelected = workoutSelected!.exercises.find(
    (exercise: WorkoutExercise) => exercise.exercise._id === exerciseID,
  )!;
  const muscleGroup = exerciseSelected.exercise.muscleGroupe;
  const imagePath = findExerciseImage(exerciseSelected.exercise, images as Record<string, Record<string, unknown>>);
  const descriptionSentences = splitDescriptionIntoSentences(
    exerciseSelected.exercise.description ?? '',
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const hasHistory = sortedCurrentWorkoutHistory.some((history) =>
    history.performances.some((p) => {
      if (typeof p.exercise === 'string') return false;
      return p.exercise._id === exerciseID;
    }),
  );

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const goBack = () => navigation.navigate('startWorkout', { workoutID });
  const goToTimer = () =>
    navigation.navigate('timer', { exerciseID, workoutID });

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
