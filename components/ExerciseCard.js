import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import images from "../utils/images";

const ExerciseCard = ({
  exerciseName,
  muscleGroup,
  numberOfSets,
  numberOfReps,
  weight,
  restMinutes,
  restSeconds,
  isEditable = true,
  exerciseID,
  openModalCustomSets,
  handleDelete,
  startExercise,
  accessibilityLabel,
  image,
  exerciseAddedImg,
}) => {
  const currentWorkout = useSelector((state) => state.currentWorkout.value);
  const currentExercise = currentWorkout.performances.find(
    (e) => e.exercise === exerciseID,
  );

  const imagePath = images[muscleGroup.toLowerCase()][image];

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentExercise) {
      setIsCompleted(currentExercise.sets.length >= numberOfSets);
    } else {
      setIsCompleted(false);
    }
  }, [currentExercise]);

  const handleUpdate = () => {
    openModalCustomSets(
      exerciseName,
      exerciseID,
      weight,
      numberOfReps,
      numberOfSets,
      restMinutes,
      restSeconds,
      muscleGroup,
    );
  };

  const handlePress = () => {
    if (!isEditable && !isCompleted) startExercise(exerciseID);
  };

  const isCardio = muscleGroup === "Cardio";

  return (
    <TouchableOpacity
      activeOpacity={isEditable ? 1 : 0.8}
      onPress={handlePress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Vous serez redirigé vers une nouvelle page pour avoir plus détails sur l'exercice"
      style={styles.wrapper}
    >
      <View style={[styles.card, isCompleted && styles.cardCompleted]}>
        <View style={styles.accentBar} />

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={image ? imagePath : exerciseAddedImg}
            contentFit="cover"
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {exerciseName}
          </Text>

          <View style={styles.statsRow}>
            {!isCardio && (
              <>
                <View style={styles.statItem}>
                  <FontAwesome name="list" size={11} color={COLORS.accent} />
                  <Text style={styles.statText}>
                    <Text style={styles.statValue}>{numberOfSets}</Text> séries
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <FontAwesome name="refresh" size={11} color={COLORS.accent} />
                  <Text style={styles.statText}>
                    <Text style={styles.statValue}>{numberOfReps}</Text> reps
                  </Text>
                </View>
              </>
            )}
            <View style={styles.statItem}>
              <FontAwesome
                name="weight-hanging"
                size={11}
                color={COLORS.accent}
              />
              <Text style={styles.statText}>
                <Text style={styles.statValue}>{weight}</Text>
                {!isCardio && " kg"}
              </Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome name="clock-o" size={11} color={COLORS.accent} />
              <Text style={styles.statText}>
                <Text style={styles.statValue}>{restMinutes}</Text>
                {isCardio ? "h " : "min "}
                <Text style={styles.statValue}>{restSeconds}</Text>
                {isCardio ? "min" : "sec"}
              </Text>
            </View>
          </View>
        </View>

        {isEditable ? (
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={handleUpdate}
              accessibilityLabel="Modifier les données de l'exercice"
              accessibilityHint="Permet d'ouvrir une modale"
              style={styles.actionBtn}
            >
              <FontAwesome name="pencil" size={16} color={COLORS.accent} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(exerciseID)}
              accessibilityLabel="Supprimer l'exercice de la séance"
              style={styles.actionBtn}
            >
              <FontAwesome name="trash" size={16} color={COLORS.accent} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actionContainer}>
            <FontAwesome
              name={isCompleted ? "check-circle" : "play-circle-o"}
              size={32}
              color={isCompleted ? COLORS.primary : COLORS.textSecondary}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    height: 110,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
  },
  cardCompleted: {
    borderColor: COLORS.primary,
  },
  accentBar: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  imageContainer: {
    marginLeft: 14,
    width: 66,
    height: 66,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 66,
    height: 66,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 10,
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  statValue: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  actionContainer: {
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  actionBtn: {
    padding: 4,
  },
});
