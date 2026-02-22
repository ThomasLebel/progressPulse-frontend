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
    height: "350",
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
  bottomModal: {
    justifyContent: "center",
    alignItems: "center",
  },
  crossContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  span: {
    color: "white",
    fontWeight: 600,
  },
  infoIcon: {
    marginRight: 10,
  },
  textInfo: {
    color: "white",
    fontSize: 14,
  },
  errorText: {
    color: "#FF4500",
  },
  input: {
    width: "100%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
