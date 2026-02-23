import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: 600,
  },
  secondTtitleContainer: {
    marginBottom: 10,
  },
  secondTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: 600,
  },
  settingWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },
  settingContainer: {
    width: "100%",
    maxWidth: 500,
    height: 90,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    width: "95%",
    height: "70%",
    borderRadius: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    height: 30,
  },
  span: {
    fontWeight: 600,
    fontSize: 16,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  buttonContainer: {
    width: 220,
    backgroundColor: COLORS.primary,
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: 600,
  },
  chartContainer: {
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginRight: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  textInfo: {
    color: "white",
  },
});
