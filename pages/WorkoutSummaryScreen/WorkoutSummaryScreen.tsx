import { Pressable, ScrollView, Text, View } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ExerciseCard from '../../components/ExerciseCard';
import Loader from '../../components/Loader';
import Underline from '../../components/Underline';
import { COLORS } from '../../constants/theme';
import { RootStackParamList } from '../../models/navigation';
import ModalCustomSets from './modals/ModalCustomSets';
import ModalTitle from './modals/ModalTitle';
import { useWorkoutSummaryScreen } from './useWorkoutSummaryScreen';
import { convertRestForDisplay } from './workoutSummaryScreen.service';
import { styles } from './WorkoutSummaryScreen.styles';

type Props = NativeStackScreenProps<RootStackParamList, 'workoutSummary'>;

export default function WorkoutSummaryScreen({ navigation, route }: Props) {
  const {
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
  } = useWorkoutSummaryScreen(navigation, route);

  return (
    <View style={styles.container}>
      <ModalTitle
        visible={modalTitleVisible}
        onClose={() => setModalTitleVisible(false)}
        workoutName={workoutName}
        onChangeWorkoutName={setWorkoutName}
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
        emptyFields={emptyFields}
        postError={postError}
        onSubmit={handleSubmit}
      />
      <ModalCustomSets
        visible={modalCustomSetsVisible}
        onClose={closeModalCustomSets}
        exerciseName={exerciseName}
        muscleGroup={muscleGroup}
        charge={charge}
        onChangeCharge={setCharge}
        nbSets={nbSets}
        onChangeNbSets={setNbSets}
        nbReps={nbReps}
        onChangeNbReps={setNbReps}
        restMinutes={restMinutes}
        onChangeRestMinutes={setRestMinutes}
        restSeconds={restSeconds}
        onChangeRestSeconds={setRestSeconds}
        emptyFields={emptyFields}
        onSubmit={updateExercise}
      />

      <View style={styles.mainContainer}>
        {Object.keys(groupedExercises).length === 0 && (
          <View style={styles.emptyContainer}>
            <FontAwesome6 name="dumbbell" size={36} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Aucun exercice encore ajouté</Text>
          </View>
        )}
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 75 }}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(groupedExercises).map(([group, exercises]) => (
            <View key={group}>
              <View style={styles.groupTitleSection}>
                <Text style={styles.groupTitle}>{group}</Text>
                <Underline width={40} />
              </View>
              {exercises.map((exercise, i) => {
                const { minutes, seconds } = convertRestForDisplay(exercise.rest, group);
                return (
                  <ExerciseCard
                    key={i}
                    exerciseName={exercise.exerciseName}
                    muscleGroup={group}
                    numberOfSets={exercise.customSets.length}
                    numberOfReps={exercise.customSets[0].reps}
                    weight={exercise.customSets[0].weight}
                    restMinutes={minutes}
                    restSeconds={seconds}
                    exerciseID={exercise.exercise}
                    openModalCustomSets={openModalCustomSets}
                    handleDelete={handleDelete}
                    accessibilityLabel={`Donnée de l'exercice ${exercise.exerciseName}`}
                    exerciseAddedImg={exercise.imagePath}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.backBtn}
          onPress={() =>
            navigation.navigate(
              backTo as keyof RootStackParamList,
              { name } as never,
            )
          }
          accessibilityLabel={`Permet de revenir sur la page ${backTo}`}
        >
          <FontAwesome6 name="chevron-left" size={14} color={COLORS.textSecondary} />
          <Text style={styles.backBtnText}>Retour</Text>
        </Pressable>
        <Pressable
          style={[
            styles.validateBtn,
            Object.keys(groupedExercises).length === 0 && styles.validateBtnDisabled,
          ]}
          onPress={() => Object.keys(groupedExercises).length > 0 && setModalTitleVisible(true)}
          accessibilityLabel="Valider la séance"
        >
          <FontAwesome6 name="check" size={15} color={COLORS.background} />
          <Text style={styles.validateBtnText}>Valider ma séance</Text>
        </Pressable>
      </View>
      {isLoading && (
        <View style={styles.backgroundLoading}>
          <Loader />
        </View>
      )}
    </View>
  );
}
