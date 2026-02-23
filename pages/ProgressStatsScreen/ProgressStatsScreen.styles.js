import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titleRow: {
    marginBottom: 4,
  },
  filterRow: {
    alignItems: "flex-end",
    marginBottom: 4,
    zIndex: 10,
  },
  titleContainer: {
    flex: 1,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
    backgroundColor: COLORS.accentBorder,
  },
  dropdownItemText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  dropdownItemTextActive: {
    color: COLORS.accent,
    fontWeight: "600",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 12,
    marginTop: 28,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.accent,
  },
  statIcon: {
    opacity: 0.6,
  },
  chartContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
    marginBottom: 20,
  },
  exerciseItem: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  exerciseLeft: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  exerciseMuscle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: "capitalize",
  },
  exerciseRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  exerciseCount: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.accent,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 12,
  },
});
