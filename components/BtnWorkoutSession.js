import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

export default function WorkoutSessionButton({
  name,
  time,
  nbExercise,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  image,
  textBtn
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={() => onPress(name)}
      style={{
        marginBottom: 20,
        elevation: 5,
      }}
    >
      <LinearGradient
        colors={["#445B9F", "#3BC95F"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradiant}
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              !image
                ? require("../assets/imagesWorkout/Coaches-amico.png")
                : image[0].source
            }
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.iconWrapper}>
            <View style={styles.iconTimeContainer}>
              <FontAwesome
                name={"clock-o"}
                size={17}
                color={"white"}
                style={{ opacity: 0.6 }}
              />
              <Text style={styles.text}>{time}</Text>
            </View>
            <View style={styles.iconExerciseContainer}>
              <FontAwesome5
                name={"dumbbell"}
                size={15}
                color={"white"}
                style={{ opacity: 0.6 }}
              />
              <Text style={styles.text}>{nbExercise}</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>{textBtn}</Text>
            <FontAwesome
              name={"long-arrow-right"}
              size={20}
              color={"#1D632F"}
            />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  gradiant: {
    borderRadius: 15,
    width: 350,
    maxWidth: 500,
    height: 110,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginLeft: 10,
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems:"center"
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 15,
  },
  textContainer: {
    marginLeft: 20,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: 600,
  },
  text: {
    color: "white",
    opacity: 0.6,
  },
  iconWrapper: {
    flexDirection: "row",
    marginVertical: 10,
  },
  iconExerciseContainer: {
    flexDirection: "row",
    gap: 5,
    marginRight: 5,
    alignItems: "center",
    marginLeft: 10,
  },

  iconTimeContainer: {
    flexDirection: "row",
    gap: 5,
    marginRight: 5,
    alignItems: "center",
  },
  btnContainer: {
    padding: 6,
    width: 130,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnText: {
    color: "#1D632F",
    fontWeight: 600,
  },
});
