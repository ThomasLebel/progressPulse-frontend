import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#0D0D36",
    paddingTop: 125,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  topContainer: {
    flex: 1,
  },

  title: {
    fontSize: 40,
    fontWeight: 600,
    color: "white",
    paddingTop: 10,
  },

  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  span: {
    color: "#A3FD01",
  },

  infoIcon: {
    marginRight: 10,
  },

  textInfo: {
    color: "white",
  },

  btnContainer: {
    flex: 1,
  },

  btn: {
    paddingTop: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  seances: {
    marginHorizontal: 15,
    marginBottom: 15,
  },

  image: {
    margin: "auto",
    marginTop: 30,
    width: 350,
    height: 350,
  },
});
