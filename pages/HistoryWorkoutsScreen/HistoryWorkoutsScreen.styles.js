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
  setChip: {
    height: 28,
    width: "45%",
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  setChipCardio: {
    height: 28,
    width: "75%",
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  setChipText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    textAlign: "center",
  },
});
