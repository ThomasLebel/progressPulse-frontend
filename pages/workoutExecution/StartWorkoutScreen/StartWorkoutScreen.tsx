import { FontAwesome6 } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ExerciseCard from '../../../components/ExerciseCard';
import Loader from '../../../components/Loader';
import Underline from '../../../components/Underline';
import { COLORS } from '../../../constants/theme';
import { RootStackParamList } from '../../../models/navigation';
import CustomSetsModal from './modals/CustomSetsModal';
import TitleModal from './modals/TitleModal';
import { styles } from './StartWorkoutScreen.styles';
import { useStartWorkout } from './useStartWorkout';

type Props = NativeStackScreenProps<RootStackParamList, 'startWorkout'>;

export default function StartWorkoutScreen({ navigation, route }: Props) {
  const { workoutID } = route.params;

  const {
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
  } = useStartWorkout(navigation, workoutID);

  return (
    <View style={styles.container}>
      <TitleModal
        visible={modalTitleVisible}
        onClose={() => setModalTitleVisible(false)}
        workoutNameInput={workoutNameInput}
        onChangeWorkoutName={(value) => setWorkoutNameInput(value)}
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
        emptyFields={emptyFields}
        iconError={iconError}
        onChangeName={handleChangeName}
      />

      <CustomSetsModal
        visible={modalCustomSetsVisible}
        exerciseName={exerciseName}
        muscleGroup={muscleGroup}
        charge={charge}
        onChangeCharge={(value) => setCharge(value)}
        nbSets={nbSets}
        onChangeNbSets={(value) => setNbSets(value)}
        nbReps={nbReps}
        onChangeNbReps={(value) => setNbReps(value)}
        restMinutes={restMinutes}
        onChangeRestMinutes={(value) => setRestMinutes(value)}
        restSeconds={restSeconds}
        onChangeRestSeconds={(value) => setRestSeconds(value)}
        emptyFields={emptyFields}
        onClose={closeModalCustomSets}
        onUpdateExercise={handleUpdateExercise}
      />

      <View style={styles.topContainer}>
        <View style={styles.headerSpacer} />

        <View style={styles.workoutNameSection}>
          <FontAwesome6
            name={workoutSelected.image || 'dumbbell'}
            size={18}
            color={COLORS.accent}
          />
          <Text style={styles.topTitle} numberOfLines={1}>
            {workoutSelected.name}
          </Text>
          {isEditable && (
            <Pressable
              style={styles.pencilBtn}
              onPress={() => setModalTitleVisible(!modalTitleVisible)}
            >
              <FontAwesome name="pencil" size={13} color={COLORS.accent} />
            </Pressable>
          )}
        </View>

        {isEditable ? (
          <Pressable style={styles.binContainer} onPress={openAlertDeleteWorkout}>
            <FontAwesome name="trash" size={16} color={COLORS.primary} />
          </Pressable>
        ) : (
          <Pressable
            style={styles.stopBtn}
            onPress={handleStopWorkout}
            accessibilityLabel="Arrêter la séance"
          >
            <FontAwesome6 name="stop" size={13} color="#FF4D4D" />
          </Pressable>
        )}
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 150 }}
          style={{ width: '100%' }}
          alwaysBounceHorizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {exercisesByGroup.map(({ group, exercises }) => (
            <View key={group}>
              <View style={styles.groupTitleSection}>
                <Text style={styles.groupTitle}>{group}</Text>
                <Underline width={40} />
              </View>
              {exercises.map((exercise, i) => (
                <ExerciseCard
                  key={i}
                  exerciseName={exercise.exercise.name}
                  muscleGroup={group}
                  numberOfSets={exercise.customSets.length}
                  numberOfReps={exercise.customSets[0].reps}
                  weight={exercise.customSets[0].weight}
                  restMinutes={exercise.restMinutes}
                  restSeconds={exercise.restSeconds}
                  exerciseID={exercise.exercise._id}
                  handleDelete={handleDeleteExercise}
                  openModalCustomSets={openModalCustomSets}
                  isEditable={isEditable}
                  startExercise={startExercise}
                  accessibilityLabel={`Commencer l'exercice ${exercise.exercise.name}`}
                  image={exercise.exercise.image}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.sideBtn}
          onPress={handleGoToHome}
          accessibilityLabel="Retour à l'accueil"
        >
          <FontAwesome6 name="chevron-left" size={14} color={COLORS.textSecondary} />
          <Text style={styles.sideBtnText}>Retour</Text>
        </Pressable>

        <Pressable
          style={[styles.ctaBtn, !isEditable && styles.ctaBtnEnd]}
          onPress={handlePressButton}
          accessibilityLabel={isEditable ? 'Commencer la séance' : 'Terminer la séance'}
        >
          <FontAwesome6
            name={isEditable ? 'play' : 'flag-checkered'}
            size={15}
            color={COLORS.background}
          />
          <Text style={styles.ctaBtnText}>{isEditable ? 'Commencer' : 'Terminer'}</Text>
        </Pressable>

        <Pressable
          style={styles.sideBtn}
          onPress={handleAddExercise}
          accessibilityLabel="Ajouter un exercice"
        >
          <FontAwesome6 name="plus" size={14} color={COLORS.textSecondary} />
          <Text style={styles.sideBtnText}>Ajouter</Text>
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
