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
import { COLORS } from "../../../../constants/theme";
import { styles } from "./ChangeUsernameModal.styles";

export default function ChangeUsernameModal({
  visible,
  onClose,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  error,
  errorMessage,
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
              <View style={styles.infoContainer}>
                <FontAwesome
                  name={"exclamation-triangle"}
                  size={25}
                  color={COLORS.primary}
                  style={styles.infoIcon}
                  accessibilityLabel="Message d'attention lorsque vous voulez changer vos coordonnées"
                />
                <Text style={styles.span}>ATTENTION</Text>
              </View>
              <FontAwesome
                name={"times"}
                size={30}
                color={"white"}
                onPress={onClose}
                style={styles.infoIcon}
                accessibilityLabel="Permet de fermer la modale"
              />
            </View>
            <Text style={styles.textInfo}>
              Vous êtes sur le point de modifier votre nom d'utilisateur.
              Assurez-vous qu'il vous convient !
            </Text>
          </View>
          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder={"Entrer votre adresse email"}
              placeholderTextColor={"#272D34"}
              onChangeText={(value) => setEmail(value)}
              value={email}
              accessibilityLabel="Entrez votre adresse mail"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={"Mot de passe"}
              placeholderTextColor={"#272D34"}
              onChangeText={(value) => setPassword(value)}
              value={password}
              accessibilityLabel="Entrez votre mot de passe"
            />
            <TextInput
              style={styles.input}
              placeholder={"Entrer votre nouveau nom d'utilisateur"}
              placeholderTextColor={"#272D34"}
              onChangeText={(value) => setUsername(value)}
              value={username}
              accessibilityLabel="Entrez votre nouveau nom d'utilisateur"
            />
            {error && <Text style={styles.errorText}>{errorMessage}</Text>}
            <Button
              textButton="Valider"
              textColor={COLORS.primary}
              width={180}
              height={40}
              background="#272D34"
              borderWidth={1}
              borderColor={COLORS.primary}
              onPress={onSubmit}
              accessibilityLabel={
                "Permet de fermer la modale avec les coordonnées modifié"
              }
              accessibilityHint={
                "Vous allez être redirigé vers la page réglages avec vos nouvelles coordonnées"
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
