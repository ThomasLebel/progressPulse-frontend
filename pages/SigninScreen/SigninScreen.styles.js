import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  mainTitle: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 35,
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "800",
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 25,
    paddingLeft: 10,
    fontSize: 18,
  },
  btn: {
    fontSize: 40,
    borderRadius: 10,
    backgroundColor: "grey",
    margin: 20,
  },
  btnText: {
    fontSize: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
    color: "white",
  },
  image: {
    height: "40%",
    width: "100%",
  },
  alreadyAccountSection: {
    margin: "auto",
    flexDirection: "row",
  },
  alreadyAccount: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
  },
  signup: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 2,
  },
  error: {
    color: "#FF4500",
    marginTop: 10,
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

  btnContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
});
