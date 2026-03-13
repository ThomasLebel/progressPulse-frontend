import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  topContainer: {
    marginBottom: 28,
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
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  topTitle: {
    fontSize: 30,
    color: COLORS.textPrimary,
    fontWeight: "bold",
    marginRight: 10,
  },
  totalBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  totalBadgeText: {
    color: "#0D0D36",
    fontSize: 13,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
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
  // Carte featured "Toutes les séances"
  featuredCard: {
    flexDirection: "row",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },
  featuredAccentBar: {
    width: 4,
    backgroundColor: COLORS.accent,
  },
  featuredContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  featuredLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },
  featuredRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredCountBadge: {
    backgroundColor: "rgba(163, 253, 1, 0.12)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  featuredCountText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "700",
  },
  sectionLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "600",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 2,
  },
  // Cartes par programme
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },
  cardDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  cardText: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  cardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  countPill: {
    backgroundColor: "rgba(139, 195, 74, 0.12)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  countPillText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },
});
