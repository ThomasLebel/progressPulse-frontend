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
import { styles } from "./CustomSetsModal.styles";

export default function CustomSetsModal({
  visible,
  exerciseName,
  muscleGroup,
  charge,
  onChangeCharge,
  nbSets,
  onChangeNbSets,
  nbReps,
  onChangeNbReps,
  restMinutes,
  onChangeRestMinutes,
  restSeconds,
  onChangeRestSeconds,
  emptyFields,
  onClose,
  onUpdateExercise,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
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
              accessibilityLabel="Fermer la modale"
              onPress={onClose}
              style={styles.infoIcon}
            />
          </View>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{exerciseName}</Text>
            <Underline width={70} />
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={30}
              color={"#A3FD01"}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>
              Saisis tes données pour suivre ta progression !
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputText}>
              {muscleGroup === "Cardio"
                ? "Résistance/Inclinaison"
                : "Charge (Kg)"}
            </Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Permet de modfier la charge ou l'inclinaison de l'exercice"
              placeholder={
                muscleGroup === "Cardio" ? "Résistance/Inclinaison" : "Charge"
              }
              keyboardType="numeric"
              onChangeText={onChangeCharge}
              value={charge}
            />
            {muscleGroup != "Cardio" && (
              <>
                <Text style={styles.inputText}>Nombre de séries</Text>
                <TextInput
                  style={styles.input}
                  accessibilityLabel="Permet de modifier le nombres de séries de l'exercice"
                  placeholder="Nombre de séries"
                  keyboardType="numeric"
                  onChangeText={onChangeNbSets}
                  value={nbSets}
                />
                <Text style={styles.inputText}>Nombre de répétitions</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de répétitions"
                  accessibilityLabel="Permet de modifier le nombre de répétitions de l'exercice"
                  keyboardType="numeric"
                  onChangeText={onChangeNbReps}
                  value={nbReps}
                />
              </>
            )}
            <Text style={styles.inputText}>Temps de repos</Text>
            <View style={styles.restTimeContainer}>
              <TextInput
                style={styles.restInput}
                placeholder="Minutes"
                keyboardType="numeric"
                accessibilityLabel="Permet de modifier le temps de repos en minutes"
                accessibilityHint="Si c'est un exercice cardio, modifier l'heure de l'exercice"
                onChangeText={onChangeRestMinutes}
                value={restMinutes}
              />
              <Text style={styles.inputText}>
                {muscleGroup != "Cardio" ? "min" : "h"}
              </Text>
              <TextInput
                style={styles.restInput}
                placeholder="Secondes"
                keyboardType="numeric"
                accessibilityLabel="Permet de modifier le temps de repos en secondes"
                accessibilityHint="Si c'est un exercice cardio, modifier les minutes de l'exercice"
                onChangeText={onChangeRestSeconds}
                value={restSeconds}
              />
              <Text style={styles.inputText}>
                {muscleGroup != "Cardio" ? "sec" : "min"}
              </Text>
            </View>
          </View>
          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez remplir tous les champs
            </Text>
          )}
          <Button
            textButton="Modifier les objectifs"
            textColor="#A3FD01"
            width="260"
            height="40"
            background="#272D34"
            borderWidth={1}
            borderColor="#A3FD01"
            onPress={onUpdateExercise}
            accessibilityLabel="Valider les modifications apportés"
            accessibilityHint="Ferme également la modale"
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
