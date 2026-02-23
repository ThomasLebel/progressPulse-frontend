import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 25,
  },
  mainTitle: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
    fontWeight: "600",
    marginTop: 20,
  },
  subTitle: {
    fontSize: 35,
    textAlign: "center",
    color: COLORS.primary,
    fontWeight: "800",
  },
  input: {
    width: "60%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 25,
    paddingLeft: 10,
    fontSize: 18,
  },
  imageContainer: {
    height: 350,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 350,
  },
  arrowContainer: {
    width: "100%",
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
  modifyPassword: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
    width: "100%",
  },
  error: {
    color: "#FF4500",
    marginTop: 10,
  },
  done: {
    color: "white",
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
});
