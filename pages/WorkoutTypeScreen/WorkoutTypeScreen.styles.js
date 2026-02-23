import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 10,
  },
  textInfo: {
    color: COLORS.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  btnContainer: {
    flex: 4,
    gap: 20,
    justifyContent: "center",
  },
  btn: {
    borderRadius: 16,
    overflow: "hidden",
  },
  card: {
    height: 240,
    width: "100%",
    maxWidth: 500,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  accentBar: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 4,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(139, 195, 74, 0.1)",
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtnContainer: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "center",
  },
  btnText: {
    color: COLORS.textPrimary,
    fontSize: 26,
    fontWeight: "700",
    lineHeight: 34,
  },
  btnSubText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
});
