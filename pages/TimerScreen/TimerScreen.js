import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { TimerPickerModal } from "react-native-timer-picker";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Underline from "../../components/Underline";
import Button from "../../components/Button";
import { useTimerScreen } from "./useTimerScreen";
import { styles } from "./TimerScreen.styles";

export default function TimerScreen({ navigation, route }) {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.topContainer}>
          <Text style={styles.title}>
            {muscleGroup != "Cardio" ? "Temps de repos" : "Cardio"}
          </Text>
          <Underline width={80} />
        </View>
        {!isTimerVisible && (
          <View style={styles.timerContainer}>
            <TouchableOpacity
              style={styles.timer}
              onPress={handleOpenPicker}
            >
              <Text style={styles.textTimer}>
                {minutes}:{secondes}
              </Text>
            </TouchableOpacity>
            <View style={styles.btn}>
              <Button
                textButton="Démarrer le minuteur"
                textColor="black"
                width="70%"
                height={50}
                background="#A3FD01"
                onPress={timerClick}
                accessibilityLabel={"Démarer le minuteur"}
                accessibilityHint={"Le minuteur va se mettre en route"}
              />
            </View>
            {/* Modal permettant de changer son temps de repos */}
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
        {isTimerVisible && (
          <View style={styles.timerContainerStarted}>
            <View style={styles.count}>
              {/* Minuteur */}
              <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={time}
                colors={["#A3FD01", "#850606", "#850606", "#850606", "#850606"]}
                colorsTime={[5, 3, 2, 1, 0]}
                onComplete={handleTimerComplete}
                updateInterval={1}
              >
                {({ remainingTime, color }) => {
                  const mins = Math.floor(remainingTime / 60);
                  const secs = remainingTime % 60;
                  return (
                    <View>
                      <Text
                        style={{
                          color: "#ffffff",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      >
                        Restant :
                      </Text>
                      <Text
                        style={{ color, fontSize: 40, textAlign: "center" }}
                      >
                        {mins}:{secs < 10 ? `0${secs}` : secs}
                      </Text>
                      <Text
                        style={{
                          color: "#ffffff",
                          fontSize: 18,
                          textAlign: "center",
                        }}
                      ></Text>
                    </View>
                  );
                }}
              </CountdownCircleTimer>
            </View>
            <View style={styles.btnInput}>
              <Button
                textButton={
                  muscleGroup != "Cardio"
                    ? "Passer à la série suivante"
                    : "Terminer l'exercice"
                }
                textColor="black"
                width="70%"
                height={50}
                background="#A3FD01"
                onPress={validateSet}
              />
            </View>
          </View>
        )}
        <View style={styles.inputSection}>
          {!input && (
            <LinearGradient
              style={styles.linear}
              colors={["#4645AB", "#1C1C45"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
            >
              {muscleGroup != "Cardio" && (
                <>
                  <View style={styles.data}>
                    <Text style={styles.text}>
                      Nombre de répétitions effectuées :{" "}
                    </Text>
                    <Underline width={60} />
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nombre de répétitions"
                      keyboardType="numeric"
                      onChangeText={setReps}
                      value={reps}
                    />
                  </View>
                </>
              )}
              <View style={styles.data}>
                <Text style={styles.text}>
                  {muscleGroup != "Cardio"
                    ? "Charge de l'exercice :"
                    : "Résitance/Inclinaison"}
                </Text>
                <Underline width={60} />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={
                    muscleGroup != "Cardio" ? "Charge" : "Résitance/Inclinaison"
                  }
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
                  textColor="black"
                  width="60%"
                  height={50}
                  background="#A3FD01"
                  onPress={addSet}
                />
              </View>
            </LinearGradient>
          )}
          {input && (
            <View style={styles}>
              <LinearGradient
                style={styles.linearInput}
                colors={["#4645AB", "#1C1C45"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.pencil}>
                  <FontAwesome
                    name={"pencil"}
                    size={20}
                    color={"#3BC95F"}
                    onPress={updateSet}
                  />
                </View>
                {muscleGroup != "Cardio" && (
                  <>
                    <View style={styles.dataInput}>
                      <Text style={styles.textTitle}>
                        Nombre de répétitions effectuées :{" "}
                      </Text>
                      <Underline width={60} />
                    </View>
                    <Text style={styles.textInput}>{reps} répétitions</Text>
                  </>
                )}
                <View style={styles.dataInput}>
                  <Text style={styles.textTitle}>
                    {muscleGroup != "Cardio"
                      ? "Charge de l'exercice : "
                      : "Résistance/Inclinaison : "}
                  </Text>
                  <Underline width={60} />
                </View>
                <Text style={styles.textInput}>
                  {weight} {muscleGroup != "Cardio" && "kg"}
                </Text>
              </LinearGradient>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
