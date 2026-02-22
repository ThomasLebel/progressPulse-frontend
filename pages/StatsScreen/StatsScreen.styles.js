import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingVertical: 60,
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
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
    backgroundColor: "#A3FD01",
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
    alignItems: "center",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 10,
  },
  infoIcon: {
    marginRight: 10,
  },
  textInfo: {
    color: "white",
  },
});
