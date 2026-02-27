import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  topContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "600",
  },
  btnContainer: {
    flex: 4,
  },
  bottomContainer: {
    flex: 1,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 8,
    marginBottom: 20,
  },
  badgeLabel: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  badgeCount: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    minWidth: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeCountText: {
    color: "black",
    fontSize: 12,
    fontWeight: "700",
  },
  bottomBtnContainer: {
    alignItems: "center",
  },
});
