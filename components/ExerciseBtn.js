import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeExercise } from "../reducers/workoutCreation";
import { Image } from "expo-image";

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
    (state) => state.workoutCreation.value.exercises
  );

  const workoutSelected = useSelector((state) =>
    state.workouts.value.find((e) => e._id === workoutID)
  );

  useEffect(() => {
    let exerciseAlreadyAdded;
    if (!isWorkoutAlreadyCreated) {
      exerciseAlreadyAdded = workoutCreationExercises.some(
        (exercise) => exercise.exercise === exerciseID
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
      style={styles.container}
    >
      <LinearGradient
            colors={["#445B9F", "#3BC95F"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradiant}
      >
        <Image source={image} style={styles.picture} />
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: 600,
            width: "65%",
          }}
        >
          {textButton}
        </Text>
        <FontAwesome
          name={isAdded ? "check-circle" : "plus-circle"}
          size={35}
          color={isAdded ? "#A3FD01" : "white"}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ExerciseBtn;

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    marginBottom: 25,
  },
  gradiant: {
    height: 70,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
});
