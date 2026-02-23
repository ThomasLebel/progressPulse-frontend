import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

export const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
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
  topModal: {
    marginBottom: 20,
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
  },
  infoIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  textInfo: {
    color: COLORS.textSecondary,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  bottomModal: {
    gap: 12,
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
  dateButton: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  dateText: {
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  checkboxWrapper: {
    gap: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.accentBorder,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkmark: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.background,
    borderRadius: 2,
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  errorText: {
    color: "#FF4500",
    fontSize: 13,
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
    color: COLORS.background,
    fontSize: 15,
    fontWeight: "700",
  },
});
