import { BlurView } from "expo-blur";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import ExerciseCard from "../../components/ExerciseCard";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import ModalCustomSets from "./modals/ModalCustomSets";
import ModalTitle from "./modals/ModalTitle";
import { useWorkoutSummaryScreen } from "./useWorkoutSummaryScreen";
import { convertRestForDisplay } from "./workoutSummaryScreen.service";
import { styles } from "./WorkoutSummaryScreen.styles";

export default function WorkoutSummaryScreen({ navigation, route }) {
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
      <View style={{ marginBottom: 20 }}>
        <FontAwesome
          name={"chevron-left"}
          accessibilityLabel={`Permet de revenir sur la page ${backTo}`}
          size={24}
          color={COLORS.primary}
          style={{ marginLeft: 15, marginTop: 5 }}
          onPress={() => navigation.navigate(backTo, { name: name })}
        />
      </View>
      <View style={styles.mainContainer}>
        <ScrollView
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
                const { minutes, seconds } = convertRestForDisplay(
                  exercise.rest,
                  group,
                );
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

      <BlurView style={styles.bottomContainer} intensity={60} tint="dark">
        <Button
          background={COLORS.primary}
          borderColor="none"
          textButton="Valider ma séance"
          textColor="black"
          width={300}
          height={50}
          onPress={() => setModalTitleVisible(true)}
          isLinearGradiant={false}
          accessibilityLabel={
            "Valider la et accepter si des changements ont été apporté sur la séance"
          }
          accessibilityHint={
            "Redirection sur la page d'accueil, votre séance si affichera"
          }
        />
        <FontAwesome
          name={"plus-circle"}
          accessibilityLabel={`Permet de revenir sur la page ${backTo}`}
          size={45}
          color={COLORS.primary}
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("muscleGroup")}
        />
      </BlurView>
      {isLoading && (
        <View style={styles.backgroundLoading}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            animating={true}
          />
        </View>
      )}
    </View>
  );
}
