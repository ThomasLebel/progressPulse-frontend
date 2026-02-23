import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },

  topContainer: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 20,
    flexDirection: "collumn",
    gap: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },

  /* ── Timer inactif (sélecteur) ─────────────────────────── */
  timerContainer: {
    height: "30%",
  },

  timer: {
    width: "65%",
    height: 90,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
  },

  textTimer: {
    fontSize: 52,
    fontWeight: "bold",
    color: COLORS.accent,
    letterSpacing: 3,
  },

  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },

  /* ── Timer actif (countdown) ────────────────────────────── */
  timerContainerStarted: {
    height: "34%",
  },

  count: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },

  timerLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  btnInput: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  /* ── Section saisie (commune) ───────────────────────────── */
  inputSection: {
    flex: 1,
    marginTop: 10,
  },

  /* Carte dégradée — saisie active */
  linear: {
    width: "88%",
    alignSelf: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    backgroundColor: "#1A1740",
    overflow: "hidden",
  },

  cardTopBar: {
    width: "100%",
    height: 3,
    backgroundColor: COLORS.primary,
  },

  data: {
    paddingTop: 15,
    marginLeft: 20,
  },

  text: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: "500",
    paddingTop: 10,
  },

  inputContainer: {
    alignItems: "center",
    marginTop: 8,
  },

  input: {
    width: "80%",
    height: 46,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 15,
  },

  errorMessage: {
    color: "#FF4500",
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
  },

  btnContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },

  /* Carte dégradée — saisie validée (readonly) */
  linearInput: {
    width: "88%",
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    overflow: "hidden",
    backgroundColor: "#1A1740",
  },

  pencil: {
    alignItems: "flex-end",
    marginTop: 12,
    marginRight: 16,
  },

  dataInput: {
    paddingTop: 14,
    marginLeft: 20,
    marginBottom: 4,
  },

  textTitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  textInput: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
    marginTop: 4,
  },
});
