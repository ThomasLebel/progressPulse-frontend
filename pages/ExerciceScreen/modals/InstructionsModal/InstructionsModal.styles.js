import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  modalContainer: {
    width: "85%",
    maxHeight: "80%",
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
    marginBottom: 12,
  },

  modalTitleContainer: {
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 6,
  },

  descriptionContainer: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    padding: 16,
    maxHeight: 320,
    marginBottom: 20,
  },

  sentence: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },

  button: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "black",
    fontSize: 15,
    fontWeight: "700",
  },
});
