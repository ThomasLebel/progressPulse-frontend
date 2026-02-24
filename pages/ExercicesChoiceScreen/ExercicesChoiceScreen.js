import { BlurView } from "expo-blur";
import { Pressable, ScrollView, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
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
    handleFinish,
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
        <Pressable
          style={styles.backButtonContainer}
          onPress={() =>
            navigation.navigate("muscleGroup", {
              isWorkoutAlreadyCreated,
              workoutID,
            })
          }
        >
          <FontAwesome
            name={"chevron-left"}
            size={20}
            color={COLORS.primary}
            accessibilityLabel="Revenir sur la page pour choisir le groupe musculaire"
          />
        </Pressable>
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
      <BlurView style={styles.bottomContainer} intensity={60} tint="dark">
        <Button
          background={COLORS.primary}
          borderColor="none"
          textButton="Terminer"
          textColor="black"
          width={240}
          height={50}
          onPress={handleFinish}
          isLinearGradiant={false}
          accessibilityLabel={
            "Revenir sur la page pour choisir le groupe musculaire"
          }
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
