import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalTitleView: {
    width: "85%",
    backgroundColor: COLORS.modalBackground,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  crossContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  textInfo: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  inputsContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 12,
  },
  inputText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  input: {
    width: "100%",
    height: 44,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  errorMessage: {
    color: "#FF4500",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "700",
  },
});
