import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Image section ──────────────────────────────────────────
  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 350,
    backgroundColor: COLORS.textPrimary,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  image: {
    width: "65%",
    height: "70%",
    marginBottom: 30,
  },

  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(13, 13, 54, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
  },

  // ── Scrollable content ─────────────────────────────────────
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // ── Exercise header (title + instructions btn) ─────────────
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 32,
    gap: 12,
  },

  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  instructionsBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  instructionsBtnText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "600",
  },

  // ── Section header (accent bar + title) ───────────────────
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 24,
  },

  sectionAccent: {
    width: 3,
    height: 18,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },

  // ── Performance section ────────────────────────────────────
  perfContainer: {
    marginBottom: 24,
  },

  performanceDate: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
  },

  perfSection: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  // Card style for perf rows (mimics BtnWorkoutSession)
  perfCard: {
    height: 36,
    width: "45%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
    marginVertical: 5,
    marginHorizontal: 5,
  },

  perfSerieLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "600",
    marginLeft: 0,
    marginRight: 6,
  },

  perfText: {
    color: COLORS.textPrimary,
    fontSize: 11,
    fontWeight: "600",
  },

  // ── Goals section ──────────────────────────────────────────
  goalsContainer: {
    marginBottom: 130,
  },

  serieBadge: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    marginBottom: 14,
    gap: 6,
  },

  serieBadgeLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  serieBadgeValue: {
    color: COLORS.accent,
    fontWeight: "700",
    fontSize: 14,
  },

  // Card style for goal rows (mimics BtnWorkoutSession)
  goalCard: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
    marginBottom: 10,
  },

  goalAccentBar: {
    width: 4,
    height: "100%",
    backgroundColor: COLORS.primary,
  },

  goalText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 16,
  },

  // ── CTA button ─────────────────────────────────────────────
  button: {
    position: "absolute",
    alignItems: "center",
    width: "100%",
  },
});
