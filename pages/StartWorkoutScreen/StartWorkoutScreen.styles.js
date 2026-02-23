import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    marginTop: 15,
    marginBottom: 30,
  },
  backRowContainer: {
    width: 50,
  },
  binContainer: {
    width: 50,
    display: "flex",
    alignItems: "flex-end",
  },
  topTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: 600,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 20,
  },
  groupTitleSection: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  groupTitle: {
    color: "white",
    fontSize: 20,
  },
  workoutNameSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pencilLogo: {
    marginLeft: 10,
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
