import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topContainer: {
    marginBottom: 24,
  },
  backToContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  // Ligne titre + dropdown
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  titleBlock: {
    flex: 1,
    marginRight: 12,
  },
  topTitle: {
    fontSize: 28,
    color: COLORS.textPrimary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  // Dropdown filtre période (identique à ProgressStatsScreen)
  filterWrapper: {
    zIndex: 10,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterButtonText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    maxWidth: 110,
    marginRight: 6,
  },
  dropdown: {
    position: "absolute",
    top: 44,
    right: 0,
    backgroundColor: COLORS.modalBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 12,
    zIndex: 100,
    elevation: 10,
    minWidth: 150,
  },
  dropdownItem: {
    paddingVertical: 11,
    paddingHorizontal: 14,
  },
  dropdownItemActive: {
    backgroundColor: "rgba(163, 253, 1, 0.07)",
  },
  dropdownItemText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  dropdownItemTextActive: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Message vide si aucune séance sur la période
  emptyPeriod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    padding: 16,
  },
  emptyIcon: {
    marginRight: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    flex: 1,
  },
  // Blocs exercice à l'intérieur des cartes
  exerciseBlock: {
    marginBottom: 14,
    width: "100%",
  },
  exerciseName: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },
  setsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // Chips force
  setChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(139, 195, 74, 0.10)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(139, 195, 74, 0.22)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  setChipLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "700",
    marginRight: 4,
  },
  setChipValue: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: "500",
  },
  // Chips cardio
  setChipCardio: {
    backgroundColor: "rgba(59, 201, 95, 0.10)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(59, 201, 95, 0.22)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
  },
  setChipCardioText: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "500",
  },
});
