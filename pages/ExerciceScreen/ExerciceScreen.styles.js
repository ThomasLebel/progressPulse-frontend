import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingHorizontal: 0,
  },

  bottomContainer: {
    paddingHorizontal: 10,
  },

  imageContainer: {
    height: 350,
    width: "100vw%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },

  arrowContainer: {
    width: "100%",
  },

  backRowContainer: {
    position: "absolute",
    left: 20,
    top: 60,
    width: 50,
  },

  image: {
    marginTop: 50,
    width: 280,
    height: 280,
  },

  title: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
    borderColor: "#A3FD01",
    borderWidth: 1,
  },

  textButton: {
    color: "#A3FD01",
    justifyContent: "center",
    textAlign: "center",
    padding: "auto",
  },

  perfcontainer: {
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },

  linearPerf: {
    height: 20,
    width: "40%",
    marginBottom: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },

  perf: {
    color: "#ffffff",
    textAlign: "center",
    margin: "auto",
  },

  text: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  serie: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },

  objContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  obj: {
    color: "#ffffff",
    textAlign: "center",
    margin: "auto",
  },

  linearObj: {
    height: 50,
    width: "60%",
    marginBottom: 10,
    borderRadius: 10,
  },

  button: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
    marginHorizontal: 10,
  },

  goalsContainer: {
    marginBottom: 150,
  },

  noHistory: {
    color: "red",
    fontWeight: "600",
  },
  perfDate: {
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  perfContainer: {
    height: "135",
  },
  performanceDate: {
    color: "white",
    textAlign: "center",
  },
  perfSection: {
    marginTop: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
});
