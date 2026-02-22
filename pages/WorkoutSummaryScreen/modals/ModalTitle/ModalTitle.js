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
import { styles } from "./ModalTitle.styles";

export default function ModalTitle({
  visible,
  onClose,
  workoutName,
  onChangeWorkoutName,
  emptyFields,
  postError,
  onSubmit,
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
        <View style={styles.modalTitleView}>
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
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={30}
              color={"#A3FD01"}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>Nomme ta séance</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputText}>Nom de la séance</Text>
            <TextInput
              style={styles.input}
              placeholder="Saisis un nom"
              accessibilityLabel="Donner un nom à la séance"
              onChangeText={onChangeWorkoutName}
              value={workoutName}
            />
          </View>
          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez saisir un nom de séance
            </Text>
          )}
          {postError && (
            <Text style={styles.errorMessage}>
              Ce nom est déjà attribué à l'une de vos séances. Choissisez un
              autre nom
            </Text>
          )}
          <Button
            textButton="Valider ma séance"
            textColor="#A3FD01"
            width="260"
            height="40"
            background="#272D34"
            borderWidth={1}
            borderColor="#A3FD01"
            onPress={onSubmit}
            accessibilityLabel={"Valider le nom donné à la séance"}
            accessibilityHint={
              "Vous serez redirigé vers la d'accueil après la validation. Votre séance crée s'affichera sur cette page"
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
