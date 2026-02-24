import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
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
        <View style={styles.headerSpacer} />

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

      <View style={styles.bottomContainer}>
        {/* Retour */}
        <Pressable
          style={styles.footerItem}
          onPress={handleGoToHome}
          accessibilityLabel="Retour à l'accueil"
        >
          <FontAwesome6
            name="circle-chevron-left"
            size={32}
            color={COLORS.tabBarStart}
          />
        </Pressable>
        {isEditable ? (
          <Pressable
            style={styles.footerItem}
            onPress={handlePressButton}
            accessibilityLabel="Commencer la séance"
          >
            <FontAwesome6
              name="circle-play"
              size={48}
              color={COLORS.accent}
              solid
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.footerItem}
            onPress={handlePressButton}
            accessibilityLabel="Terminer la séance"
          >
            <View style={styles.backgroundDisk}>
              <FontAwesome6
                name="flag-checkered"
                solid
                size={28}
                color={"black"}
              />
            </View>
          </Pressable>
        )}

        {/* Ajouter un exercice */}
        <Pressable
          style={styles.footerItem}
          onPress={handleAddExercise}
          accessibilityLabel="Ajouter un exercice"
        >
          <FontAwesome6
            name="circle-plus"
            size={32}
            color={COLORS.tabBarStart}
          />
        </Pressable>
      </View>

      {isLoading && (
        <View style={styles.backgroundLoading}>
          <Loader></Loader>
        </View>
      )}
    </View>
  );
}
