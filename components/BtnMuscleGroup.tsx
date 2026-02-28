import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";

interface BtnMuscleGroupProps {
  name: string;
  source: unknown;
  onPress: (name: string) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const BtnMuscleGroup = ({
  name,
  source,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}: BtnMuscleGroupProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={styles.btn}
      onPress={() => onPress(name)}
    >
      <View style={styles.card}>
        <Text style={styles.btnText}>{name}</Text>
        <Image source={source as any} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    margin: 8,
  },
  card: {
    height: 80,
    width: 160,
    borderRadius: 16,
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
  btnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    paddingLeft: 12,
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginRight: 8,
  },
});

export default BtnMuscleGroup;
