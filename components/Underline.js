import { View } from "react-native";
import { COLORS } from "../constants/theme";

export default function Underline({ width }) {
  return (
    <View
      style={{
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 2,
        marginVertical: 5,
        width: width,
      }}
    ></View>
  );
}
