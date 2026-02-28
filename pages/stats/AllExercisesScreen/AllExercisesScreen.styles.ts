import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  filterRow: {
    alignItems: "flex-end",
    marginBottom: 16,
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
    top: 155,
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
    backgroundColor: COLORS.rankBarBg,
  },
  dropdownItemText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  dropdownItemTextActive: {
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  item: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.rankBarBg,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: "800",
  },
  itemContent: {
    flex: 1,
  },
  itemTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 2,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  countPill: {
    backgroundColor: COLORS.accentBorder,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accent,
  },
  itemMuscle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: "capitalize",
    marginBottom: 8,
  },
  barBg: {
    height: 3,
    backgroundColor: COLORS.rankBarBg,
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: 3,
    borderRadius: 2,
  },
  chevron: {
    flexShrink: 0,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
});
