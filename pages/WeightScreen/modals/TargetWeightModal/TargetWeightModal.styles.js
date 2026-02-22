import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "85%",
    height: 470,
    backgroundColor: "#272D34",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topModal: {
    marginBottom: 30,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  bottomModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  crossContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  dateButton: {
    marginBottom: 15,
    alignItems: "center",
  },
  dateText: {
    color: "white",
    borderColor: "white",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  checkboxWrapper: {
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkmark: {
    width: 12,
    height: 12,
    backgroundColor: "#272D34",
    borderRadius: 2,
  },
  errorText: {
    color: "#FF4500",
  },
  textInfo: {
    color: "white",
    fontSize: 12,
    marginLeft: 5,
  },
  text: {
    color: "white",
  },
});
