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
  imageContainer: {
    flex: 4,
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  textBtnContainer: {
    flex: 6,
    paddingRight: 8,
    paddingLeft: 16,
    justifyContent: "center",
  },
  btnText: {
    color: COLORS.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  },
  arrowIcon: {
    marginTop: 12,
  },
});
