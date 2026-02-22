import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
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
