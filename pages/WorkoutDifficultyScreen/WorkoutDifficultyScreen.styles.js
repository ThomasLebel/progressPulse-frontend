import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    color: "white",
    fontWeight: 600,
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

  btnContainer: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
  },

  text: {
    fontSize: 50,
    padding: 50,
    textAlign: "center",
    color: "white",
  },

  btn: {
    fontSize: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    margin: 20,
    borderRadius: 20,
  },

  btnText: {
    fontSize: 30,
    fontWeight: 600,
    top: 40,
    right: 10,
    position: "absolute",
    color: "white",
    textAlign: "right",
  },

  image: {
    width: "35%",
    height: "100%",
    resizeMode: "cover",
    marginLeft: 10,
  },

  gradiant: {
    height: 120,
    width: "100%",
    maxWidth: 500,
    borderRadius: 20,
    justifyContent: "flex-start",
  },
});
