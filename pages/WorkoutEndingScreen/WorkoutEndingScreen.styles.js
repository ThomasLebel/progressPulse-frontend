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
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  topContainer: {
    marginTop: 50,
    marginLeft: 30,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    color: "white",
    fontWeight: 600,
  },

  note: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  star: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
  },

  input: {
    width: "70%",
    height: 400,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    margin: 10,
    textAlignVertical: "top",
  },

  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
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
