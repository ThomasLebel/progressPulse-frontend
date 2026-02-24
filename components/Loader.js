import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export default function NeonSpinner() {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.outer}>
      <Animated.View
        style={[styles.inner, { transform: [{ rotate: rotation }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#A3FD01",
    shadowOpacity: 0.55,
    shadowRadius: 12,
  },
  inner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: "rgba(163,253,1,0.15)",
    borderTopColor: "#A3FD01",
  },
});
