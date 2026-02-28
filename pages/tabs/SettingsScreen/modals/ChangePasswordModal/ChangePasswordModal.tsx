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
import { COLORS } from "../../../../../constants/theme";
import { styles } from "./ChangePasswordModal.styles";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  error: boolean;
  errorMessage: string;
}

export default function ChangePasswordModal({
  visible,
  onClose,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  newPassword,
  setNewPassword,
  error,
  errorMessage,
}: Props) {
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
              <View style={styles.infoContainer}>
                <FontAwesome
                  name={"exclamation-triangle"}
                  size={20}
                  color={COLORS.primary}
                  style={styles.infoIcon}
                  accessibilityLabel="Message d'attention lorsque vous voulez changez vos coordonnées"
                />
                <Text style={styles.span}>ATTENTION</Text>
              </View>
              <FontAwesome
                name={"times"}
                size={24}
                color={COLORS.textSecondary}
                onPress={onClose}
                accessibilityLabel="Permet de fermer la modale"
              />
            </View>
            <Text style={styles.textInfo}>
              Vous êtes sur le point de modifier votre mot de passe.
              Assurez-vous de bien le mémoriser !
            </Text>
          </View>
          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder={"Entrer votre adresse email"}
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={(value) => setEmail(value)}
              value={email}
              accessibilityLabel="Entrez votre adresse mail"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={"Mot de passe actuel"}
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={(value) => setPassword(value)}
              value={password}
              accessibilityLabel="Entrez votre mot de passe actuel"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={"Nouveau mot de passe"}
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={(value) => setNewPassword(value)}
              value={newPassword}
              accessibilityLabel="Entrez votre nouveau mot de passe"
            />
            {error && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={onSubmit}
              accessibilityLabel="Permet de fermer la modale avec les coordonnées modifiées"
              accessibilityHint="Vous allez être redirigé vers la page réglages avec vos nouvelles coordonnées"
            >
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
