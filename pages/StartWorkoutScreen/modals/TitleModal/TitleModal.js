import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../../../components/Button";
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
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
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
            />
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={30}
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
              onChangeText={onChangeWorkoutName}
              value={workoutNameInput}
            />
          </View>
          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez saisir un nom de séance
            </Text>
          )}
          <Button
            textButton="Renommer ma séance"
            textColor={COLORS.primary}
            width="260"
            height="40"
            background="#272D34"
            borderWidth={1}
            borderColor={COLORS.primary}
            onPress={onChangeName}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
