import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import { COLORS } from "../../constants/theme";
import { styles } from "./ExerciceScreen.styles";
import InstructionsModal from "./modals/InstructionsModal";
import { useExercice } from "./useExercice";

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

      {/* ── Full-width GIF with gradient overlay ── */}
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={imagePath} contentFit="cover" />
        <LinearGradient
          colors={["transparent", COLORS.background]}
          style={styles.imageGradient}
        />
        <Pressable style={styles.backButton} onPress={goBack}>
          <FontAwesome
            name="chevron-left"
            size={16}
            color={COLORS.primary}
            accessibilityLabel="Retour à la liste des exercices"
          />
        </Pressable>
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.bottomContainer}
      >
        {/* Title + instructions button */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>{exerciseSelected.exercise.name}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.instructionsBtn}
            accessibilityLabel="Voir les informations sur l'exécution de l'exercice"
            accessibilityHint="Ouvre une modale"
            onPress={openModal}
          >
            <Text style={styles.instructionsBtnText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* ── Performance history ── */}
        {hasHistory && (
          <View style={styles.perfContainer}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionAccent} />
              <Text style={styles.sectionTitle}>Dernières performances</Text>
            </View>

            <ScrollView
              horizontal
              snapToInterval={screenWidth - 32}
              snapToAlignment="start"
              pagingEnabled={false}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
            >
              {sortedCurrentWorkoutHistory.map((history, i) => {
                const fullDate = formatHistoryDate(history.date);
                return history.performances
                  .map((performance, j) => {
                    if (performance.exercise._id !== exerciseID) return null;
                    return (
                      <View
                        key={`${i}-${j}`}
                        style={{ width: screenWidth - 32, paddingRight: 16 }}
                      >
                        <Text style={styles.performanceDate}>{fullDate}</Text>
                        <View style={styles.perfSection}>
                          {performance.sets.map((set, k) => {
                            const { hours, minutes } = formatCardioDuration(
                              set.rest,
                            );
                            return (
                              <View key={k} style={styles.perfCard}>
                                <View style={styles.perfAccentBar} />
                                <Text style={styles.perfSerieLabel}>
                                  S{k + 1}
                                </Text>
                                {muscleGroup !== "Cardio" ? (
                                  <Text style={styles.perfText}>
                                    {set.reps} reps · {set.weight} kg
                                  </Text>
                                ) : (
                                  <Text style={styles.perfText}>
                                    {set.rest / 60} min · Résistance{" "}
                                    {set.weight}
                                  </Text>
                                )}
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })
                  .filter((item) => item !== null);
              })}
            </ScrollView>
          </View>
        )}

        {/* ── Goals section ── */}
        <View style={styles.goalsContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>Objectifs de la série</Text>
          </View>

          {/* Serie indicator badge */}
          <View style={styles.serieBadge}>
            <Text style={styles.serieBadgeLabel}>Série</Text>
            <Text style={styles.serieBadgeValue}>
              {currentSet} / {exerciseSelected.customSets.length}
            </Text>
          </View>

          {/* Goal cards */}
          {muscleGroup !== "Cardio" && (
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>
                Répétitions : {exerciseSelected.customSets[0].reps}
              </Text>
            </View>
          )}

          <View style={styles.goalCard}>
            <Text style={styles.goalText}>
              {muscleGroup !== "Cardio" ? "Charge" : "Résistance / Inclinaison"}{" "}
              : {exerciseSelected.customSets[0].weight}
              {muscleGroup !== "Cardio" && " kg"}
            </Text>
          </View>

          {muscleGroup === "Cardio" && (
            <View style={styles.goalCard}>
              <Text style={styles.goalText}>
                Durée : {formatCardioDuration(exerciseSelected.rest).hours} h{" "}
                {formatCardioDuration(exerciseSelected.rest).minutes} min
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── CTA button ── */}
      <BlurView style={[styles.button]} intensity={60} tint="dark">
        <Button
          textButton={
            muscleGroup !== "Cardio"
              ? "Valider la série"
              : "Commencer l'exercice"
          }
          textColor="black"
          background={COLORS.primary}
          width={250}
          height={60}
          borderColor="none"
          accessibilityLabel="Aller à la page du minuteur"
          onPress={goToTimer}
        />
      </BlurView>
    </View>
  );
}
