import { BlurView } from "expo-blur";
import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import ExerciseCard from "../../components/ExerciseCard";
import Loader from "../../components/Loader";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import CustomSetsModal from "./modals/CustomSetsModal";
import TitleModal from "./modals/TitleModal";
import { styles } from "./StartWorkoutScreen.styles";
import { useStartWorkout } from "./useStartWorkout";

export default function StartWorkoutScreen({ navigation, route }) {
  const { workoutID } = route.params || {};

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
  } = useStartWorkout(navigation, workoutID);

  return (
    <View style={styles.container}>
      <TitleModal
        visible={modalTitleVisible}
        onClose={() => setModalTitleVisible(false)}
        workoutNameInput={workoutNameInput}
        onChangeWorkoutName={(value) => setWorkoutNameInput(value)}
        emptyFields={emptyFields}
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
        <Pressable style={styles.backRowContainer} onPress={handleGoToHome}>
          <FontAwesome
            name="chevron-left"
            size={20}
            color={COLORS.primary}
            accessibilityLabel="Redirection vers la page d'accueil"
          />
        </Pressable>

        <View style={styles.workoutNameSection}>
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

        <Pressable
          style={[styles.binContainer, !isEditable && styles.binHidden]}
          onPress={isEditable ? openAlertDeleteWorkout : undefined}
        >
          {isEditable && (
            <FontAwesome name="trash" size={16} color={COLORS.primary} />
          )}
        </Pressable>
      </View>

      <View style={styles.mainContainer}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 150 }}
          style={{ width: "100%" }}
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

      <BlurView style={styles.bottomContainer} intensity={60} tint="dark">
        <Button
          background={COLORS.primary}
          borderColor="none"
          textButton={isEditable ? "Commencer la séance" : "Terminer la séance"}
          textColor="black"
          width={250}
          height={50}
          onPress={handlePressButton}
          isLinearGradiant={false}
          accessibilityLabel={
            isEditable
              ? "Permet de commencer la séance"
              : "Permet de terminer la séance"
          }
          accessibilityHint={
            isEditable &&
            "Redirection vers la page pour donner son avis sur la séance"
          }
        />
        <FontAwesome
          name={"plus-circle"}
          accessibilityLabel={`Permet de rajouter un nouveau exercice`}
          size={45}
          color={COLORS.primary}
          style={{ marginRight: 15 }}
          onPress={handleAddExercise}
        />
      </BlurView>

      {isLoading && (
        <View style={styles.backgroundLoading}>
          <Loader></Loader>
        </View>
      )}
    </View>
  );
}
