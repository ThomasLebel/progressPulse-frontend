import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import { removeExercise } from "../reducers/workoutCreation";

const ExerciseBtn = ({
  exerciseID,
  textButton,
  image,
  openModal,
  accessibilityLabel,
  accessibilityHint,
  isWorkoutAlreadyCreated,
  workoutID,
}) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const workoutCreationExercises = useSelector(
    (state) => state.workoutCreation.value.exercises,
  );

  const workoutSelected = useSelector((state) =>
    state.workouts.value.find((e) => e._id === workoutID),
  );

  useEffect(() => {
    let exerciseAlreadyAdded;
    if (!isWorkoutAlreadyCreated) {
      exerciseAlreadyAdded = workoutCreationExercises.some(
        (exercise) => exercise.exercise === exerciseID,
      );
      setIsAdded(exerciseAlreadyAdded);
    } else {
      exerciseAlreadyAdded = workoutSelected.exercises.some((exercise) => {
        return exercise.exercise._id === exerciseID;
      });
      setIsAdded(exerciseAlreadyAdded);
    }
  }, [workoutCreationExercises, workoutSelected]);

  const handlePress = () => {
    if (!isAdded) {
      openModal(textButton, exerciseID, image);
    } else {
      dispatch(removeExercise(exerciseID));
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={handlePress}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {textButton}
          </Text>
        </View>

        <View style={[styles.actionBtn, isAdded && styles.actionBtnAdded]}>
          <FontAwesome
            name={isAdded ? "check" : "plus"}
            size={14}
            color={isAdded ? COLORS.accent : COLORS.accent}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseBtn;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    width: 350,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
  },
  accentBar: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  imageContainer: {
    marginLeft: 14,
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: "700",
    lineHeight: 24,
    paddingRight: 16,
  },
  actionBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.textSecondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  actionBtnAdded: {
    backgroundColor: COLORS.secondary,
  },
});
