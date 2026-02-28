import { LinearGradient } from "expo-linear-gradient";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { TimerPickerModal } from "react-native-timer-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Button from "../../components/Button";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { RootStackParamList } from "../../models/navigation";
import { styles } from "./TimerScreen.styles";
import { useTimerScreen } from "./useTimerScreen";

type Props = NativeStackScreenProps<RootStackParamList, "timer">;

export default function TimerScreen({ navigation, route }: Props) {
  const {
    muscleGroup,
    reps,
    setReps,
    weight,
    setWeight,
    emptyFields,
    input,
    showPicker,
    setShowPicker,
    minutes,
    secondes,
    isPlaying,
    isTimerVisible,
    time,
    timerClick,
    addSet,
    validateSet,
    handleTimerComplete,
    updateSet,
    handleOpenPicker,
    handleCancelPicker,
    handleConfirmPicker,
  } = useTimerScreen(navigation, route);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={200}
        >
          <View style={styles.topContainer}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Retour à l'exercice"
            >
              <FontAwesome
                name={"chevron-left"}
                size={16}
                color={COLORS.primary}
              />
            </Pressable>
            <View>
              <Text style={styles.title}>
                {muscleGroup !== "Cardio" ? "Temps de repos" : "Cardio"}
              </Text>
              <Underline width={80} />
            </View>
          </View>

          {/* ── Timer inactif : sélecteur ────────────────────── */}
          {!isTimerVisible && (
            <View style={styles.timerContainer}>
              <TouchableOpacity style={styles.timer} onPress={handleOpenPicker}>
                <Text style={styles.textTimer}>
                  {minutes}:{secondes}
                </Text>
              </TouchableOpacity>
              <View style={styles.btn}>
                <Button
                  textButton="Démarrer le minuteur"
                  textColor={"black"}
                  width="70%"
                  height={50}
                  background={COLORS.primary}
                  onPress={timerClick}
                  accessibilityLabel={"Démarer le minuteur"}
                  accessibilityHint={"Le minuteur va se mettre en route"}
                />
              </View>
              <TimerPickerModal
                visible={showPicker}
                setIsVisible={setShowPicker}
                onConfirm={handleConfirmPicker}
                modalTitle="Rest"
                onCancel={handleCancelPicker}
                closeOnOverlayPress
                hideHours
                styles={{
                  theme: "dark",
                }}
                modalProps={{
                  overlayOpacity: 0.4,
                }}
              />
            </View>
          )}

          {/* ── Timer actif : countdown ──────────────────────── */}
          {isTimerVisible && (
            <View style={styles.timerContainerStarted}>
              <View style={styles.count}>
                <CountdownCircleTimer
                  isPlaying={isPlaying}
                  duration={time}
                  colors={[COLORS.primary as `#${string}`, "#E57373", "#EF5350", "#C62828"]}
                  colorsTime={[5, 3, 2, 1]}
                  trailColor={COLORS.cardBackground as `#${string}`}
                  onComplete={handleTimerComplete}
                  updateInterval={1}
                  strokeWidth={5}
                  size={150}
                >
                  {({ remainingTime, color }) => {
                    const mins = Math.floor(remainingTime / 60);
                    const secs = remainingTime % 60;
                    return (
                      <View>
                        <Text style={styles.timerLabel}>Restant</Text>
                        <Text
                          style={{ color, fontSize: 35, textAlign: "center" }}
                        >
                          {mins}:{secs < 10 ? `0${secs}` : secs}
                        </Text>
                      </View>
                    );
                  }}
                </CountdownCircleTimer>
              </View>
              <View style={styles.btnInput}>
                <Button
                  textButton={
                    muscleGroup !== "Cardio"
                      ? "Passer à la série suivante"
                      : "Terminer l'exercice"
                  }
                  textColor={"black"}
                  width="70%"
                  height={50}
                  background={COLORS.primary}
                  onPress={validateSet}
                />
              </View>
            </View>
          )}

          {/* ── Section saisie ───────────────────────────────── */}
          <View style={styles.inputSection}>
            {!input && (
              <LinearGradient
                style={styles.linear}
                colors={[COLORS.cardBackground, COLORS.cardBackground]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                {muscleGroup !== "Cardio" && (
                  <>
                    <View style={styles.data}>
                      <Text style={styles.textTitle}>
                        Nombre de répétitions effectuées :
                      </Text>
                      <Underline width={60} />
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput
                        style={styles.input}
                        placeholder="Nombre de répétitions"
                        placeholderTextColor={COLORS.textSecondary}
                        keyboardType="numeric"
                        onChangeText={setReps}
                        value={reps}
                      />
                    </View>
                  </>
                )}
                <View style={styles.data}>
                  <Text style={styles.textTitle}>
                    {muscleGroup !== "Cardio"
                      ? "Charge de l'exercice :"
                      : "Résistance/Inclinaison"}
                  </Text>
                  <Underline width={60} />
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={
                      muscleGroup !== "Cardio"
                        ? "Charge"
                        : "Résistance/Inclinaison"
                    }
                    placeholderTextColor={COLORS.textSecondary}
                    keyboardType="numeric"
                    onChangeText={setWeight}
                    value={weight}
                  />
                </View>
                {emptyFields && (
                  <Text style={styles.errorMessage}>
                    Veuillez remplir tous les champs
                  </Text>
                )}
                <View style={styles.btnContainer}>
                  <Button
                    textButton="Valider la saisie"
                    textColor={"black"}
                    width="60%"
                    height={50}
                    background={COLORS.primary}
                    onPress={addSet}
                  />
                </View>
              </LinearGradient>
            )}

            {input && (
              <LinearGradient
                style={styles.linearInput}
                colors={[COLORS.cardBackground, COLORS.cardBackground]}
              >
                <View style={styles.pencil}>
                  <FontAwesome
                    name={"pencil"}
                    size={20}
                    color={COLORS.primary}
                    onPress={updateSet}
                  />
                </View>
                {muscleGroup !== "Cardio" && (
                  <>
                    <View style={styles.dataInput}>
                      <Text style={styles.textTitle}>Répétitions effectuées</Text>
                      <Underline width={60} />
                    </View>
                    <Text style={styles.textInput}>{reps} répétitions</Text>
                  </>
                )}
                <View style={styles.dataInput}>
                  <Text style={styles.textTitle}>
                    {muscleGroup !== "Cardio"
                      ? "Charge de l'exercice"
                      : "Résistance / Inclinaison"}
                  </Text>
                  <Underline width={60} />
                </View>
                <Text style={styles.textInput}>
                  {weight} {muscleGroup !== "Cardio" && "kg"}
                </Text>
              </LinearGradient>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}
