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
    backgroundColor: COLORS.background,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: 600,
  },
  btnContainer: {
    flex: 4,
  },
  bottomContainer: {
    flex: 1,
  },
  bottomText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },
  bottomSpan: {
    fontWeight: "bold",
  },
  bottomBtnContainer: {
    alignItems: "center",
  },
});
