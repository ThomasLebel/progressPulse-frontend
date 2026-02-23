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
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 20,
    gap: 20,
  },
  mainContainer: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  groupTitleSection: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  groupTitle: {
    color: "white",
    fontSize: 20,
  },
  backgroundLoading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});
