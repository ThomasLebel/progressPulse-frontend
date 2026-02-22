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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 10,
  },
  textInfo: {
    color: "white",
  },
  btnContainer: {
    flex: 4,
    gap: 20,
    justifyContent: "center",
  },
  btn: {
    borderRadius: 20,
    overflow: "hidden",
  },
  gradiant: {
    height: 230,
    width: "100%",
    maxWidth: 500,
    justifyContent: "flex-start",
  },
  image: {
    width: "60%",
    height: "100%",
    resizeMode: "cover",
  },
  textBtnContainer: {
    position: "absolute",
    bottom: 50,
    right: 10,
  },
  btnText: {
    color: "white",
    fontSize: 40,
    fontWeight: 600,
    textAlign: "right",
  },
});
