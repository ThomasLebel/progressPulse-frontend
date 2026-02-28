import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import { COLORS } from '../../../constants/theme';
import { RootStackParamList } from '../../../models/navigation';
import { styles } from './PasswordForgottenScreen.styles';
import { usePasswordForgottenScreen } from './usePasswordForgottenScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'passwordForgotten'>;

export default function PasswordForgottenScreen({ navigation }: Props) {
  const {
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    wrongEmail,
    emptyFields,
    signupError,
    validEmail,
    isLoading,
    codeMail,
    newPassword,
    errorToken,
    noMatchPassword,
    isDoneVisible,
    handleEmail,
    handleCode,
    handlePassword,
    handleGoToSignin,
    isKeyboardVisible,
  } = usePasswordForgottenScreen(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Pressable
            style={styles.backButton}
            onPress={handleGoToSignin}
            accessibilityLabel="Redirection vers la page pour se connecter"
          >
            <FontAwesome
              name="chevron-left"
              size={20}
              color={COLORS.primary}
            />
          </Pressable>
          {!isKeyboardVisible && (
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/illustrations/imageSigninSignup.webp')}
                style={styles.image}
              />
            </View>
          )}

          <Text style={styles.mainTitle}>Réinitialise ton mot de passe</Text>

          {validEmail && (
            <View style={styles.modifyPassword}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => setEmail(value)}
                value={email}
                autoCapitalize="none"
                accessibilityLabel="Entrez votre email"
              />
              {emptyFields && (
                <Text style={styles.error}>
                  Veuillez remplir tous les champs
                </Text>
              )}
              {wrongEmail && (
                <Text style={styles.error}>
                  Veuillez saisir un email au bon format
                </Text>
              )}
              {signupError && <Text style={styles.error}>{signupError}</Text>}
              <View style={styles.btnContainer}>
                <Button
                  textButton="Envoyer le code"
                  textColor="black"
                  width="240"
                  height="40"
                  background={COLORS.primary}
                  onPress={handleEmail}
                  accessibilityLabel="Envoyer le code sur votre boîte mail"
                  accessibilityHint="Vous allez recevoir un email avec un code pour changer votre mot de passe"
                />
              </View>
            </View>
          )}

          {codeMail && (
            <View style={styles.modifyPassword}>
              <TextInput
                style={styles.input}
                placeholder="Code reçu dans tes mails"
                onChangeText={(value) => setCode(value)}
                value={code}
                autoCapitalize="none"
                accessibilityLabel="Entrez le code que vous avez reçu dans votre boîte mail"
              />
              {errorToken && <Text style={styles.error}>Token invalide</Text>}
              <View style={styles.btnContainer}>
                <Button
                  textButton="Valider le code"
                  textColor="black"
                  width="240"
                  height="40"
                  background={COLORS.primary}
                  onPress={handleCode}
                  accessibilityLabel="Valider le code reçu"
                  accessibilityHint="Vous allez pouvoir changer votre mot de passe après avoir écrit le code reçu dans vos mails"
                />
              </View>
            </View>
          )}

          {newPassword && (
            <View style={styles.modifyPassword}>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Nouveau mot de passe"
                onChangeText={(value) => setPassword(value)}
                value={password}
                autoCapitalize="none"
                accessibilityLabel="Entrez votre nouveau mot de passe"
              />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Confirmer le mot de passe"
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmPassword}
                autoCapitalize="none"
                accessibilityLabel="Confirmer votre mot de passe"
              />
              {noMatchPassword && (
                <Text style={styles.error}>
                  Les mots de passe ne correspondent pas
                </Text>
              )}
              <View style={styles.btnContainer}>
                <Button
                  textButton="Valider le mot de passe"
                  textColor="black"
                  width="240"
                  height="50"
                  background={COLORS.primary}
                  onPress={handlePassword}
                  accessibilityLabel="Valider le mot de passe"
                  accessibilityHint="Vous avez changer de mot de passe"
                />
              </View>
            </View>
          )}

          {isDoneVisible && (
            <View style={styles.modifyPassword}>
              <Text style={styles.done}>
                Le mot de passe a bien été modifié 🎉
              </Text>
              <View style={styles.btnContainer}>
                <Button
                  textButton="Retourner à la connexion"
                  textColor="black"
                  width="240"
                  height="50"
                  background={COLORS.primary}
                  onPress={handleGoToSignin}
                  accessibilityLabel="Retourner à la connexion"
                  accessibilityHint="Après avoir changer de mot de passe vous aller pouvoir vous connecter"
                />
              </View>
            </View>
          )}

          {isLoading && (
            <View style={styles.backgroundLoading}>
              <Loader />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
