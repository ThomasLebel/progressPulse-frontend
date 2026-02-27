import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../models/navigation';
import { RootState } from '../../reducers/store.types';
import { calculateWorkoutDuration, formatExerciseCount } from './homeScreen.service';

export function useHomeScreen(navigation: NativeStackNavigationProp<RootStackParamList>) {
  const user = useSelector((state: RootState) => state.user.value);
  const workouts = useSelector((state: RootState) => state.workouts.value);
  const currentWorkout = useSelector((state: RootState) => state.currentWorkout.value);

  const workoutsDisplayData = workouts.map((workout) => ({
    _id: workout._id,
    name: workout.name,
    image: workout.image,
    nbExercises: formatExerciseCount(workout.exercises.length),
    duration: calculateWorkoutDuration(workout.exercises),
  }));

  const handleAddWorkout = () => navigation.navigate('WorkoutType');

  const handleWorkoutNavigation = (workoutID: string) =>
    navigation.navigate('startWorkout', { workoutID });

  return {
    user,
    workouts,
    workoutsDisplayData,
    currentWorkoutID: currentWorkout.workout,
    handleAddWorkout,
    handleWorkoutNavigation,
  };
}
