import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import Underline from "../../components/Underline";
import InstructionsModal from "./modals/InstructionsModal";
import { useExercice } from "./useExercice";
import { styles } from "./ExerciceScreen.styles";

export default function ExerciceScreen({ navigation, route }) {
  const {
    exerciseSelected,
    muscleGroup,
    imagePath,
    descriptionSentences,
    screenWidth,
    currentSet,
    hasHistory,
    sortedCurrentWorkoutHistory,
    exerciseID,
    modalVisible,
    openModal,
    closeModal,
    goBack,
    goToTimer,
    formatHistoryDate,
    formatCardioDuration,
  } = useExercice(navigation, route);

  return (
    <View style={styles.container}>
      <InstructionsModal
        visible={modalVisible}
        onClose={closeModal}
        exerciseName={exerciseSelected.exercise.name}
        descriptionSentences={descriptionSentences}
      />

      <View>
        <View style={styles.imageContainer}>
          <View style={styles.arrowContainer}>
            <Pressable style={styles.backRowContainer} onPress={goBack}>
              <FontAwesome
                name={"chevron-left"}
                size={32}
                color={"#3BC95F"}
                accessibilityLabel="Redirection vers la page pour choisir un exercice"
              />
            </Pressable>
          </View>
          <Image style={styles.image} source={imagePath} />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bottomContainer}
      >
        <View style={styles.instruction}>
          <Text style={styles.title}>{exerciseSelected.exercise.name}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            accessibilityLabel="Voir les informations sur l'exécution de l'exercice"
            accessibilityHint="Ouvre une modale"
            onPress={openModal}
          >
            <Text style={styles.textButton}>Voir les instructions</Text>
          </TouchableOpacity>
        </View>

        {hasHistory && (
          <View style={styles.perfContainer}>
            <Text style={styles.text}>
              Performances de tes dernières séances
            </Text>
            <Underline width={100} />
            <ScrollView
              horizontal={true}
              snapToInterval={screenWidth}
              snapToAlignment="start"
              pagingEnabled={false}
              decelerationRate="fast"
              contentContainerStyle={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              showsHorizontalScrollIndicator={false}
            >
              {sortedCurrentWorkoutHistory.map((history, i) => {
                const fullDate = formatHistoryDate(history.date);
                return history.performances
                  .map((performance, j) => {
                    if (performance.exercise._id !== exerciseID) return null;
                    return (
                      <ScrollView key={`${i}-${j}`}>
                        <Text style={styles.performanceDate}>{fullDate}</Text>
                        <View style={[styles.perfSection, { width: screenWidth }]}>
                          {performance.sets.map((set, k) => {
                            const { hours, minutes } = formatCardioDuration(set.rest);
                            return (
                              <LinearGradient
                                key={k}
                                colors={["#1C1C45", "#4645AB"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={
                                  muscleGroup !== "Cardio"
                                    ? [styles.linearPerf]
                                    : [styles.linearPerf, { width: "60%" }]
                                }
                              >
                                {muscleGroup !== "Cardio" ? (
                                  <Text style={styles.perf}>
                                    Série {k + 1} : {set.reps} x {set.weight}kg
                                  </Text>
                                ) : (
                                  <Text style={styles.perf}>
                                    Durée {set.rest / 60} min - Resistance/Inclinaison:{" "}
                                    {set.weight}
                                  </Text>
                                )}
                              </LinearGradient>
                            );
                          })}
                        </View>
                      </ScrollView>
                    );
                  })
                  .filter((item) => item !== null);
              })}
            </ScrollView>
          </View>
        )}

        <View style={styles.goalsContainer}>
          <Text style={styles.text}>Objectifs de la série</Text>
          <Underline width={100} />
          <Text style={styles.serie}>
            Série {currentSet} sur {exerciseSelected.customSets.length}
          </Text>
          <View style={styles.objContainer}>
            {muscleGroup !== "Cardio" && (
              <LinearGradient
                colors={["#1C1C45", "#4645AB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearObj}
              >
                <Text style={styles.obj}>
                  Nombre de répétitons : {exerciseSelected.customSets[0].reps}
                </Text>
              </LinearGradient>
            )}
            <LinearGradient
              colors={["#1C1C45", "#4645AB"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.linearObj}
            >
              <Text style={styles.obj}>
                {muscleGroup !== "Cardio"
                  ? "Charge :"
                  : "Résistance / Inclinaison : "}{" "}
                {exerciseSelected.customSets[0].weight}{" "}
                {muscleGroup !== "Cardio" && "kg"}
              </Text>
            </LinearGradient>
            {muscleGroup === "Cardio" && (
              <LinearGradient
                colors={["#1C1C45", "#4645AB"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.linearObj}
              >
                <Text style={styles.obj}>
                  Durée : {formatCardioDuration(exerciseSelected.rest).hours} h{" "}
                  {formatCardioDuration(exerciseSelected.rest).minutes} min
                </Text>
              </LinearGradient>
            )}
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.button,
          Platform.OS === "ios" ? { bottom: 10 } : { bottom: -5 },
        ]}
      >
        <Button
          textButton={
            muscleGroup !== "Cardio" ? "Valider la série" : "Commencer l'exercice"
          }
          textColor="black"
          background="#A3FD01"
          width={300}
          height={60}
          borderColor="none"
          accessibilityLabel="Aller à la page du minuteur"
          onPress={goToTimer}
        />
      </View>
    </View>
  );
}
