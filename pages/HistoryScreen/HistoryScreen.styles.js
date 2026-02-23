import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topContainer: {
    marginBottom: 30,
  },
  backToContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backToText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontSize: 15,
  },
  topTitle: {
    fontSize: 32,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    padding: 16,
    marginTop: 10,
  },
  infoIcon: {
    marginRight: 12,
  },
  textInfo: {
    color: COLORS.textSecondary,
    flex: 1,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
});
