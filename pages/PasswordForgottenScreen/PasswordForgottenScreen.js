import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import { COLORS } from "../../constants/theme";
import { styles } from "./PasswordForgottenScreen.styles";
import { usePasswordForgottenScreen } from "./usePasswordForgottenScreen";

export default function PasswordForgottenScreen({ navigation }) {
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
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <FontAwesome
            name={"chevron-left"}
            size={24}
            color={COLORS.primary}
            accessibilityLabel="Redirection vers la page pour se connecter"
            style={styles.backButton}
            onPress={handleGoToSignin}
          />
          {!isKeyboardVisible && (
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/illustrations/imageSigninSignup.webp")}
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
              <Button
                textButton="Envoyer le code"
                textColor="black"
                width="50%"
                height="40"
                background={COLORS.primary}
                onPress={handleEmail}
                accessibilityLabel={"Envoyer le code sur votre boîte mail"}
                accessibilityHint={
                  "Vous allez recevoir un email avec un code pour changer votre mot de passe"
                }
              />
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
              <Button
                textButton="Valider le code"
                textColor="black"
                width="50%"
                height="40"
                background={COLORS.primary}
                onPress={handleCode}
                accessibilityLabel={"Valider le code reçu"}
                accessibilityHint={
                  "Vous allez pouvoir changer votre mot de passe après avoir écrit le code reçu dans vos mails"
                }
              />
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
              <Button
                textButton="Valider le mot de passe"
                textColor="black"
                width="60%"
                height="50"
                background={COLORS.primary}
                onPress={handlePassword}
                accessibilityLabel={"Valider le mot de passe"}
                accessibilityHint={"Vous avez changer de mot de passe"}
              />
            </View>
          )}

          {isDoneVisible && (
            <View style={styles.modifyPassword}>
              <Text style={styles.done}>
                Le mot de passe a bien été modifié 🎉
              </Text>
              <Button
                textButton="Retourner à la connexion"
                textColor="black"
                width="60%"
                height="50"
                background={COLORS.primary}
                onPress={handleGoToSignin}
                accessibilityLabel={"Retourner à la connexion"}
                accessibilityHint={
                  "Après avoir changer de mot de passe vous aller pouvoir vous connecter"
                }
              />
            </View>
          )}

          {isLoading && (
            <View style={styles.backgroundLoading}>
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                animating={true}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
