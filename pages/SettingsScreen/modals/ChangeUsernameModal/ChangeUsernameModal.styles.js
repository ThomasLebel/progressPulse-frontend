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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  span: {
    color: COLORS.textPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
  infoIcon: {
    marginRight: 8,
  },
  textInfo: {
    color: COLORS.textSecondary,
    fontSize: 13,
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
