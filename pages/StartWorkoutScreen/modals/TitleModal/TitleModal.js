import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../../constants/theme";
import { styles } from "./TitleModal.styles";

export default function TitleModal({
  visible,
  onClose,
  workoutNameInput,
  onChangeWorkoutName,
  emptyFields,
  onChangeName,
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
              size={24}
              color={COLORS.textSecondary}
              onPress={onClose}
            />
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={18}
              color={COLORS.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>Nomme ta séance</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputText}>Renomme ta séance</Text>
            <TextInput
              style={styles.input}
              placeholder="Saisis un nom"
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={onChangeWorkoutName}
              value={workoutNameInput}
            />
          </View>
          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez saisir un nom de séance
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onChangeName}
          >
            <Text style={styles.buttonText}>Renommer ma séance</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
