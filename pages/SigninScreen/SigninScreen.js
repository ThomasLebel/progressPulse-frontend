import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../../components/Button";
import { styles } from "./SigninScreen.styles";
import { useSigninScreen } from "./useSigninScreen";

export default function SigninScreen({ navigation }) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    wrongEmail,
    emptyFields,
    signupError,
    isLoading,
    handleSignin,
    handleGoToPasswordForgotten,
    handleGoToSignup,
  } = useSigninScreen(navigation);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <Image
            source={require("../../assets/illustrations/imageSigninSignup.webp")}
            style={styles.image}
          />
          <Text style={styles.mainTitle}>Atteins tes objectifs avec</Text>
          <Text style={styles.subTitle}>Progress Pulse</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            autoCapitalize="none"
            accessibilityLabel="Entrez votre email"
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Mot de passe"
            onChangeText={(value) => setPassword(value)}
            value={password}
            accessibilityLabel="Entrez votre mot de passe"
          />
          {emptyFields && (
            <Text style={styles.error}>Veuillez remplir tous les champs</Text>
          )}
          {wrongEmail && (
            <Text style={styles.error}>
              Veuillez saisir un email au bon format
            </Text>
          )}
          {signupError && <Text style={styles.error}>{signupError}</Text>}
          <Button
            textButton="Se connecter"
            textColor="black"
            width="50%"
            height="40"
            background="#A3FD01"
            onPress={handleSignin}
            accessibilityLabel={"Permet de se connecter"}
            accessibilityHint={
              "Si vous avez rempli tous les champs, vous allez être redirigé sur la page d'acceuil"
            }
          />
          <TouchableOpacity
            onPress={handleGoToPasswordForgotten}
            accessibilityLabel="Mot de passe oublié"
            accessibilityHint="Vous allez être redirigé vers la page pour réinitialiser votre mot de passe"
          >
            <Text style={styles.signup}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          <View style={styles.alreadyAccountSection}>
            <Text style={styles.alreadyAccount}>Pas encore de compte ? </Text>
            <TouchableOpacity
              onPress={handleGoToSignup}
              accessibilityLabel="Inscris-toi"
              accessibilityHint="Vousa allez être redirigé vers la page d'inscription"
            >
              <Text style={styles.signup}>Inscris-toi !</Text>
            </TouchableOpacity>
          </View>
          {isLoading && (
            <View style={styles.backgroundLoading}>
              <ActivityIndicator
                size="large"
                color="#A3FD01"
                animating={true}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
