import { FontAwesome5 } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../constants/theme";

export default function WorkoutSessionButton({
  name,
  time,
  nbExercise,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  image,
  textBtn,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      onPress={() => onPress(name)}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        <View style={styles.accentBar} />

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
          <Text style={styles.title} numberOfLines={1}>
            {name}
          </Text>
          <View style={styles.iconWrapper}>
            <View style={styles.iconTimeContainer}>
              <FontAwesome name={"clock-o"} size={13} color={COLORS.accent} />
              <Text style={styles.text}>{time}</Text>
            </View>
            <View style={styles.iconExerciseContainer}>
              <FontAwesome5 name={"dumbbell"} size={12} color={COLORS.accent} />
              <Text style={styles.text}>{nbExercise}</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>{textBtn}</Text>
            <FontAwesome name={"long-arrow-right"} size={14} color={"black"} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    width: 350,
    maxWidth: 500,
    height: 110,
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
    width: 76,
    height: 76,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  image: {
    width: 56,
    height: 56,
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 14,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 16,
    marginVertical: 6,
  },
  iconTimeContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  iconExerciseContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  btnText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },
});
