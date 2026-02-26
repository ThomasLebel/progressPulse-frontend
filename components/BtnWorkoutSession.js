import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  isActive,
}) {
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: false,
          }),
        ]),
      ).start();
    } else {
      glowAnim.stopAnimation();
      glowAnim.setValue(0);
    }
  }, [isActive]);

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(163, 253, 1, 0.12)", "rgba(163, 253, 1, 0.85)"],
  });

  const shadowRadius = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 14],
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          borderWidth: 1,
          borderRadius: 16,
          borderColor,
          shadowColor: COLORS.accent,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        onPress={() => onPress(name)}
      >
        <View style={styles.card}>
          <View style={styles.accentBar} />

          <View style={styles.imageContainer}>
            <FontAwesome6
              name={image || "dumbbell"}
              size={36}
              color={COLORS.accent}
              solid
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <View style={styles.iconWrapper}>
              <View style={styles.iconTimeContainer}>
                <FontAwesome6 name={"clock"} size={13} color={COLORS.accent} />
                <Text style={styles.text}>{time}</Text>
              </View>
              <View style={styles.iconExerciseContainer}>
                <FontAwesome6
                  name={"dumbbell"}
                  size={12}
                  color={COLORS.accent}
                />
                <Text style={styles.text}>{nbExercise}</Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>{textBtn}</Text>
              <FontAwesome6
                name={"arrow-right-long"}
                size={14}
                color={"black"}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    overflow: "hidden",
  },

  imageContainer: {
    marginLeft: 14,
    width: 76,
    height: 76,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
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
