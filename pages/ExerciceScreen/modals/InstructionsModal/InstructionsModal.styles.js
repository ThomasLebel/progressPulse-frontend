import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  modalContainer: {
    width: "80%",
    height: "70%",
    backgroundColor: "#272D34",
    borderRadius: 20,
    padding: 15,
    margin: "auto",
  },

  iconModal: {
    alignItems: "flex-end",
  },

  titleModal: {
    marginTop: 10,
    marginLeft: 15,
  },

  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  descriptionContainer: {
    backgroundColor: "#D9D9D9",
    justifyContent: "flex-start",
    width: "90%",
    height: "70%",
    margin: "auto",
    paddingLeft: 5,
    paddingTop: 20,
    borderRadius: 10,
  },

  sentence: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  btn: {
    width: "40%",
    height: 35,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 10,
    paddingTop: 6,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },

  textButton: {
    color: COLORS.primary,
    justifyContent: "center",
    textAlign: "center",
    padding: "auto",
  },
});
