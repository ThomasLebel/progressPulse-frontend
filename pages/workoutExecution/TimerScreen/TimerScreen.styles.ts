import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/theme";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },

  topContainer: {
    marginTop: 50,
    marginLeft: 30,
    marginRight: 20,
    flexDirection: "column",
    gap: 20,
  },

  backButton: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    alignItems: "center",
    justifyContent: "center",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },

  title: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontWeight: "bold",
  },

  nbSets: {
    fontSize: 20,
    color: COLORS.textPrimary,
    fontWeight: 300,
  },

  /* ── Main Container ─────────────────────────── */
  mainContainer: {
    width: "88%",
    alignSelf: "center",
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,

    backgroundColor: COLORS.cardBackground,
    padding: 20,
  },

  timer: {
    width: "65%",
    height: 90,
    backgroundColor: "#1A1740",
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

  timerBtnContainer: {},

  timerActionButton: {
    width: 80,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  timerTimeButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  texttimerTimeButton: {
    fontSize: 14,
    fontWeight: 500,
  },

  btn: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },

  /* ── Timer actif (countdown) ────────────────────────────── */

  countdownContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

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
    marginTop: 25,
  },

  /* ── Section saisie (commune) ───────────────────────────── */
  inputSection: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
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

  perfContainer: {
    width: "100%",
    marginTop: 5,
  },

  perfTitle: {
    fontSize: 18,
    color: "white",
  },

  inputTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: 200,
  },

  inputContainer: {
    marginTop: 15,
    flexDirection: "row",
    gap: 20,
  },

  perfButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.accentBorder,
    justifyContent: "center",
    alignItems: "center",
  },

  perfButtonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },

  input: {
    width: 100,
    height: 46,
    textAlign: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.textPrimary,
    fontSize: 24,
  },

  inputValidate: {
    width: 100,
    height: 46,
    textAlign: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.primary,
    fontSize: 24,
  },

  errorMessage: {
    color: "#FF4500",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },

  btnContainer: {
    alignItems: "center",
    marginTop: 32,
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
    fontSize: 14,
    fontWeight: "300",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    paddingBottom: 5,
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
