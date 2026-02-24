import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  titleContainer: {
    marginBottom: 6,
  },
  title: {
    fontSize: 40,
    color: COLORS.textPrimary,
    fontWeight: "700",
  },
  nameSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 16,
    marginBottom: 24,
    marginTop: 6,
  },
  sectionTitleContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  columnRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
  },
  column: {
    alignItems: "center",
    gap: 8,
  },
  columnTitle: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },
  columnWeight: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  columnDate: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleText: {
    position: "absolute",
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  progressPercent: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    minWidth: 44,
    textAlign: "right",
  },
  buttonRow: {
    gap: 10,
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryText: {
    color: "black",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonSecondaryText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  historyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accentBorder,
  },
  historyRowLast: {
    borderBottomWidth: 0,
  },
  historyWeight: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  historyDate: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: "center",
    paddingVertical: 16,
    fontSize: 14,
  },
  backgroundLoading: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
    marginBottom: 20,
  },
  chartYLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  chartXLabel: {
    color: COLORS.textSecondary,
    fontSize: 8,
  },
  tooltip: {
    backgroundColor: COLORS.modalBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 130,
  },
  tooltipDate: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 4,
    textTransform: "capitalize",
  },
  tooltipValue: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
});
