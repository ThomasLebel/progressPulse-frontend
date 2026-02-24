import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/theme";

const Button = ({
  textButton,
  textColor,
  width,
  height,
  background,
  borderWidth,
  borderColor,
  onPress,
  isLinearGradiant,
  colorsGradiant = null,
  accessibilityLabel,
  accessibilityHint,
}) => {
  const h = Number(height) || 50;
  const radius = h / 2;
  const hint = accessibilityHint || undefined;

  if (isLinearGradiant) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={hint}
        style={{
          width,
          shadowColor: COLORS.accent,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 10,
        }}
      >
        <LinearGradient
          colors={colorsGradiant ?? [COLORS.primary, COLORS.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: h,
            borderRadius: radius,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: textColor,
              fontSize: 16,
              fontWeight: "700",
              letterSpacing: 0.6,
            }}
          >
            {textButton}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={hint}
      style={{
        backgroundColor: background,
        width,
        height: h,
        borderWidth: borderWidth,
        borderColor: borderColor,
        borderRadius: radius,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: background,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
      }}
    >
      <Text
        style={{
          color: textColor,
          fontSize: 16,
          fontWeight: "700",
          letterSpacing: 0.6,
        }}
      >
        {textButton}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
