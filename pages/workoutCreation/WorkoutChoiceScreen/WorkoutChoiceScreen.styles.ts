import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

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
    paddingVertical: 50,
    paddingHorizontal: 10,
  },

  title: {
    marginTop: 20,
    fontSize: 28,
    color: "white",
    fontWeight: "600",
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  infoIcon: {
    marginRight: 10,
  },

  textInfo: {
    color: "white",
  },

  text: {
    fontSize: 50,
    padding: 50,
    textAlign: "center",
    color: "white",
  },

  image: {
    width: "45%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
  },

  gradiant: {
    height: 120,
    width: "100%",
    maxWidth: 500,
    borderRadius: 20,
    justifyContent: "flex-start",
  },

  btn: {
    fontSize: 40,
    backgroundColor: COLORS.primary,
    margin: 20,
    borderRadius: 20,
  },

  btnText: {
    fontSize: 30,
    fontWeight: "600",
    top: 40,
    right: 10,
    position: "absolute",
    color: "white",
    textAlign: "right",
  },

  btnContainer: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    marginTop: 10,
  },

  backgroundLoading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
