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
import { styles } from "./AddWeightModal.styles";

export default function AddWeightModal({
  visible,
  onClose,
  weight,
  onChangeWeight,
  error,
  errorMessage,
  onAddWeight,
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
          <View style={styles.topModal}>
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
                size={25}
                color={"#A3FD01"}
                style={styles.infoIcon}
              />
              <Text style={styles.textInfo}>
                Ajoutez votre poids pour le voir s'afficher sur le graphique et
                suivre votre progression.
              </Text>
            </View>
          </View>
          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder="Ton poids"
              keyboardType="numeric"
              onChangeText={onChangeWeight}
              value={weight}
            />
            {error && <Text style={styles.errorText}>{errorMessage}</Text>}
            <Button
              textButton="Valider"
              textColor="#A3FD01"
              width={180}
              height={40}
              background="#272D34"
              borderWidth={1}
              borderColor="#A3FD01"
              onPress={onAddWeight}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
