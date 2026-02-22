import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
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
    height: 125,
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
