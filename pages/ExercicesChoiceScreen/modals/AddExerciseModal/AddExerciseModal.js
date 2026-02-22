import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../../../components/Button";
import Underline from "../../../../components/Underline";
import { styles } from "./AddExerciseModal.styles";

export default function AddExerciseModal({
  visible,
  onClose,
  exerciseName,
  isCardio,
  charge,
  setCharge,
  nbSets,
  setNbSets,
  nbReps,
  setNbReps,
  restMinutes,
  setRestMinutes,
  restSeconds,
  setRestSeconds,
  emptyFields,
  isWorkoutAlreadyCreated,
  addToWorkout,
  addToExistingWorkout,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalView}>
          <View style={styles.crossContainer}>
            <FontAwesome
              name={"times"}
              size={30}
              color={"white"}
              onPress={onClose}
              style={styles.infoIcon}
              accessibilityLabel="Fermer la modale"
            />
          </View>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{exerciseName}</Text>
            <Underline width={70} />
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={20}
              color={"#A3FD01"}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>
              Saisis tes données pour suivre ta progression !
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            {isCardio ? (
              <Text style={styles.inputText}>Resistance / Inclinaison</Text>
            ) : (
              <Text style={styles.inputText}>Charge (Kg)</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder={isCardio ? "Resistance/Inclinaison" : "Charge"}
              keyboardType="numeric"
              onChangeText={(value) => setCharge(value)}
              value={charge}
              accessibilityLabel="Entrez la charge ou la résistance pour l'exercice"
            />
            {!isCardio && (
              <>
                <Text style={styles.inputText}>Nombre de séries</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de séries"
                  keyboardType="numeric"
                  onChangeText={(value) => setNbSets(value)}
                  accessibilityLabel="Entrez le nombres de série pour l'exercice"
                  value={nbSets}
                />
                <Text style={styles.inputText}>Nombre de répétitions</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de répétitions"
                  keyboardType="numeric"
                  onChangeText={(value) => setNbReps(value)}
                  accessibilityLabel="Entrez le nombres de répétitions pour l'exercice"
                  value={nbReps}
                />
              </>
            )}
            {isCardio ? (
              <Text style={styles.inputText}>Durée</Text>
            ) : (
              <Text style={styles.inputText}>Temps de repos</Text>
            )}
            <View style={styles.restTimeContainer}>
              <TextInput
                style={styles.restInput}
                placeholder="Minutes"
                keyboardType="numeric"
                onChangeText={(value) => setRestMinutes(value)}
                accessibilityLabel="Entrez le nombres de minutes pour l'exercice"
                value={restMinutes}
              />
              <Text style={styles.inputText}>{isCardio ? "h" : "min"}</Text>
              <TextInput
                style={styles.restInput}
                placeholder="Secondes"
                keyboardType="numeric"
                onChangeText={(value) => setRestSeconds(value)}
                accessibilityLabel="Entrez le nombres de secondes pour l'exercice"
                value={restSeconds}
              />
              <Text style={styles.inputText}>{isCardio ? "min" : "sec"}</Text>
            </View>
          </View>
          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez remplir tous les champs
            </Text>
          )}
          <Button
            textButton="Ajouter à la séance"
            textColor="#A3FD01"
            width="260"
            height="40"
            accessibilityLabel={"Ajouter l'exercice avec les modifications faites à la séance"}
            accessibilityHint={"Ferme la modale"}
            background="#272D34"
            borderWidth={1}
            borderColor="#A3FD01"
            onPress={!isWorkoutAlreadyCreated ? addToWorkout : addToExistingWorkout}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
