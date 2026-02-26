import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import ExerciseBtn from "../../components/ExerciseBtn";
import Loader from "../../components/Loader";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { styles } from "./ExercicesChoiceScreen.styles";
import AddExerciseModal from "./modals/AddExerciseModal";
import { useExercicesChoice } from "./useExercicesChoice";

export default function ExercicesChoicesScreen({ navigation, route }) {
  const {
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
  } = useExercicesChoice(navigation, route);

  return (
    <View style={styles.container}>
      <AddExerciseModal
        visible={modalVisible}
        onClose={closeModal}
        exerciseName={exerciseName}
        isCardio={isCardio}
        charge={charge}
        setCharge={setCharge}
        nbSets={nbSets}
        setNbSets={setNbSets}
        nbReps={nbReps}
        setNbReps={setNbReps}
        restMinutes={restMinutes}
        setRestMinutes={setRestMinutes}
        restSeconds={restSeconds}
        setRestSeconds={setRestSeconds}
        emptyFields={emptyFields}
        isWorkoutAlreadyCreated={isWorkoutAlreadyCreated}
        addToWorkout={addToWorkout}
        addToExistingWorkout={addToExistingWorkout}
      />
      <View style={styles.topContainer}>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.title}>{name}</Text>
          <Underline width={40} />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            paddingBottom: 75,
          }}
        >
          {sortedExercises.map((exercise, i) => (
            <ExerciseBtn
              key={i}
              exerciseID={exercise._id}
              textButton={exercise.name}
              image={exercise.imagePath}
              openModal={openModal}
              accessibilityLabel={`Sélectionné l'exercice ${exercise.name}`}
              workoutID={workoutID}
              isWorkoutAlreadyCreated={isWorkoutAlreadyCreated}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.backBtn}
          onPress={handleBack}
          accessibilityLabel="Revenir sur la page pour choisir le groupe musculaire"
        >
          <FontAwesome6 name="chevron-left" size={14} color={COLORS.textSecondary} />
          <Text style={styles.backBtnText}>Retour</Text>
        </Pressable>
        <Pressable
          style={styles.validateBtn}
          onPress={handleValidate}
          accessibilityLabel={validateLabel}
        >
          <FontAwesome6 name="check" size={15} color={COLORS.background} />
          <Text style={styles.validateBtnText}>{validateLabel}</Text>
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
