import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../../constants/theme';
import { styles } from './ChangeEmailModal.styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: boolean;
  errorMessage: string;
}

export default function ChangeEmailModal({
  visible,
  onClose,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalView}>
          <View style={styles.topModal}>
            <View style={styles.crossContainer}>
              <View style={styles.infoContainer}>
                <FontAwesome
                  name={'exclamation-triangle'}
                  size={20}
                  color={COLORS.primary}
                  style={styles.infoIcon}
                  accessibilityLabel="Message d'attention lorsque vous voulez changer vos coordonnées"
                />
                <Text style={styles.span}>ATTENTION</Text>
              </View>
              <FontAwesome
                name={'times'}
                size={24}
                color={COLORS.textSecondary}
                onPress={onClose}
                accessibilityLabel="Permet de fermer la modale"
              />
            </View>
            <Text style={styles.textInfo}>
              En modifiant votre adresse e-mail, vous changerez également
              l'e-mail associé à votre compte. Assurez-vous que votre nouvelle
              adresse e-mail est valide et accessible avant de continuer.
            </Text>
          </View>
          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder={'Entrer votre nouvelle adresse email'}
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={(value) => setEmail(value)}
              value={email}
              accessibilityLabel="Entrez votre nouvelle adress mail"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder={'Mot de passe'}
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={(value) => setPassword(value)}
              value={password}
              accessibilityLabel="Entrez votre mot de passe"
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
