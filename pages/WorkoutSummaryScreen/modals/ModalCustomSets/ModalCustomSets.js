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
import { COLORS } from "../../../../constants/theme";
import { styles } from "./ModalCustomSets.styles";

export default function ModalCustomSets({
  visible,
  onClose,
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
  onSubmit,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
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
              accessibilityLabel="Fermer la modale"
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
              color={COLORS.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>
              Saisis tes données pour suivre ta progression !
            </Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputText}>
              {muscleGroup === "Cardio"
                ? "Resistance/Inclinaison"
                : "Charge (Kg)"}
            </Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Modifier si besoin la charge ou la résistance de l'exercice"
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
                  placeholder="Nombre de séries"
                  accessibilityLabel="Modifier si besoin le nombre de série de l'exercice"
                  keyboardType="numeric"
                  onChangeText={onChangeNbSets}
                  value={nbSets}
                />
                <Text style={styles.inputText}>Nombre de répétitions</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre de répétitions"
                  accessibilityLabel="Modifier si besoin le nombre de répétitions de l'exercice"
                  keyboardType="numeric"
                  onChangeText={onChangeNbReps}
                  value={nbReps}
                />
              </>
            )}
            <Text style={styles.inputText}>
              {muscleGroup === "Cardio" ? "Durée" : "Temps de repos"}
            </Text>
            <View style={styles.restTimeContainer}>
              <TextInput
                style={styles.restInput}
                placeholder="Minutes"
                keyboardType="numeric"
                accessibilityLabel="Modifier si besoin le temps de repos en minute de l'exercice"
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
                accessibilityLabel="Modifier si besoin le temps de repos en seconde de l'exercice"
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
            textColor={COLORS.primary}
            width="260"
            height="40"
            background="#272D34"
            borderWidth={1}
            borderColor={COLORS.primary}
            onPress={onSubmit}
            accessibilityLabel={"Valider les changements apportés à l'exercice"}
            accessibilityHint={
              "Permet également de fermer la modale, on reste toujours sur la même page après cette action"
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
