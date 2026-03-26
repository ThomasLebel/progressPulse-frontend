import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import {
  Animated,
  Keyboard,
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
import {
  default as FontAwesome,
  default as Icon,
} from "react-native-vector-icons/FontAwesome";
import Button from "../../../components/Button";
import { COLORS } from "../../../constants/theme";
import { RootStackParamList } from "../../../models/navigation";
import { styles } from "./TimerScreen.styles";
import { useTimerScreen } from "./useTimerScreen";

type Props = NativeStackScreenProps<RootStackParamList, "timer">;

export default function TimerScreen({ navigation, route }: Props) {
  const {
    muscleGroup,
    reps,
    exerciseSelected,
    currentSet,
    nbSets,
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
    handleAddTime,
    handleRemoveTime,
    addSet,
    validateSet,
    handleTimerComplete,
    updateSet,
    addRep,
    removeRep,
    addWeight,
    removeWeight,
    handleOpenPicker,
    handleCancelPicker,
    handleConfirmPicker,
  } = useTimerScreen(navigation, route);

  const cardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const onShow = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(cardOffset, {
        toValue: -e.endCoordinates.height * 0.75,
        duration: Platform.OS === "ios" ? e.duration : 200,
        useNativeDriver: true,
      }).start();
    });
    const onHide = Keyboard.addListener(hideEvent, (e) => {
      Animated.timing(cardOffset, {
        toValue: 0,
        duration: Platform.OS === "ios" ? e.duration : 200,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, [cardOffset]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateY: cardOffset }] },
          ]}
        >
          <View style={styles.topContainer}>
            <View style={styles.titleContainer}>
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

              <View style={{ flex: 1 }}>
                <View>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {exerciseSelected?.exercise.name}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.setsContainer}>
              <Text style={styles.nbSets}>
                Série : {currentSet} / {nbSets}
              </Text>
            </View>
          </View>
          {/* ── Main Container────────────────────── */}
          <View style={styles.mainContainer}>
            {isTimerVisible ? (
              <View style={styles.countdownContainer}>
                <CountdownCircleTimer
                  isPlaying={isPlaying}
                  duration={time}
                  colors={[
                    COLORS.primary as `#${string}`,
                    "#E57373",
                    "#EF5350",
                    "#C62828",
                  ]}
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
            ) : (
              <TouchableOpacity style={styles.timer} onPress={handleOpenPicker}>
                <Text style={styles.textTimer}>
                  {minutes}:{secondes}
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.btn}>
              {/* Bouton enlever 15 secondes */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleRemoveTime}
                accessibilityLabel="Enlever 15 secondes"
                accessibilityHint="Enleve 15 secondes au minuteur"
                style={styles.timerTimeButton}
              >
                <Text style={styles.texttimerTimeButton}>-15s</Text>
              </TouchableOpacity>

              {/* Bouton démarrer / arreter minuteur */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={isTimerVisible ? () => validateSet() : timerClick}
                accessibilityLabel={
                  isTimerVisible ? "Passer le minuteur" : "Démarrer le minuteur"
                }
                accessibilityHint={
                  isTimerVisible
                    ? "Le minuteur va s'arreter"
                    : "Le minuteur va se mettre en route"
                }
                style={styles.timerActionButton}
              >
                <Icon
                  name={isTimerVisible ? "forward" : "play"}
                  size={20}
                  color={COLORS.accent}
                />
              </TouchableOpacity>

              {/* Bouton ajout 15 secondes */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleAddTime}
                accessibilityLabel="Ajouter 15 secondes"
                accessibilityHint="Ajoute 15 secondes au minuteur"
                style={styles.timerTimeButton}
              >
                <Text style={styles.texttimerTimeButton}>+15s</Text>
              </TouchableOpacity>
            </View>

            {/* Modale Timer */}

            <TimerPickerModal
              visible={showPicker}
              setIsVisible={setShowPicker}
              onConfirm={handleConfirmPicker}
              modalTitle="Temps de repos"
              confirmButtonText="Valider"
              cancelButtonText="Annuler"
              initialValue={{
                minutes: parseInt(minutes),
                seconds: parseInt(secondes),
              }}
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

            {/* Section Peformance */}

            <View style={styles.perfContainer}>
              {/* Répétitions */}

              {muscleGroup !== "Cardio" && (
                <View style={styles.inputSection}>
                  <Text style={styles.inputTitle}>Reps :</Text>
                  <View style={styles.inputContainer}>
                    {/* Bouton - */}
                    {!input && (
                      <TouchableOpacity
                        style={styles.perfButton}
                        onPress={removeRep}
                      >
                        <Text style={styles.perfButtonText}>−</Text>
                      </TouchableOpacity>
                    )}

                    {/* Input répétitions */}
                    <TextInput
                      style={input ? styles.inputValidate : styles.input}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor={COLORS.textSecondary}
                      value={reps}
                      onChangeText={setReps}
                    />

                    {/* Bouton + */}
                    {!input && (
                      <TouchableOpacity
                        style={styles.perfButton}
                        onPress={addRep}
                      >
                        <Text style={styles.perfButtonText}>+</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}

              {/* Charge */}

              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>
                  {muscleGroup === "Cardio"
                    ? "Res / Incl / Vitesse :"
                    : "Charge :"}
                </Text>
                <View style={styles.inputContainer}>
                  {/* Bouton - */}
                  {!input && (
                    <TouchableOpacity
                      style={styles.perfButton}
                      onPress={removeWeight}
                    >
                      <Text style={styles.perfButtonText}>−</Text>
                    </TouchableOpacity>
                  )}

                  {/* Input Charge */}
                  <TextInput
                    style={input ? styles.inputValidate : styles.input}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={COLORS.textSecondary}
                    value={weight}
                    onChangeText={setWeight}
                  />

                  {/* Bouton + */}
                  {!input && (
                    <TouchableOpacity
                      style={styles.perfButton}
                      onPress={addWeight}
                    >
                      <Text style={styles.perfButtonText}>+</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Bouton Validation Input */}
              {emptyFields && (
                <Text style={styles.errorMessage}>Valide tes performances</Text>
              )}
              <View style={styles.btnContainer}>
                <Button
                  textButton={
                    input ? "Modifier la saisie" : "Valider la saisie"
                  }
                  textColor={"black"}
                  width="60%"
                  height={50}
                  background={COLORS.primary}
                  onPress={input ? updateSet : addSet}
                />
              </View>
            </View>
          </View>

          {/* <View style={styles.inputSection}>
            {!input && (
              <LinearGradient
                style={styles.linear}
                colors={[COLORS.cardBackground, COLORS.cardBackground]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                {muscleGroup !== "Cardio" && (
                  <View style={styles.input}>
                    <View style={styles.data}>
                      <Text style={styles.textTitle}>Reps :</Text>
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
                  </View>
                )}
                <View style={styles.data}>
                  <Text style={styles.textTitle}>
                    {muscleGroup !== "Cardio"
                      ? "Charge :"
                      : "Résistance/Inclinaison"}
                  </Text>
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
                      <Text style={styles.textTitle}>
                        Répétitions effectuées
                      </Text>
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
          </View> */}
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
}
