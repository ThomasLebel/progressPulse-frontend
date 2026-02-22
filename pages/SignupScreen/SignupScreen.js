import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import { styles } from "./SignupScreen.styles";
import { useSignupScreen } from "./useSignupScreen";

export default function SignupScreen({ navigation }) {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    wrongEmail,
    emptyFields,
    signupError,
    isLoading,
    handleSignup,
    handleGoToSignin,
  } = useSignupScreen(navigation);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("../../assets/illustrations/imageSigninSignup.webp")}
        style={styles.image}
      />
      <Text style={styles.mainTitle}>Commence ton aventure avec</Text>
      <Text style={styles.subTitle}>Progress Pulse</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        onChangeText={(value) => setUsername(value)}
        value={username}
        accessibilityLabel="Entrez votre nom d'utilisateur"
      />
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
        accessibilityLabel="Entrez votre mot de passe"
        onChangeText={(value) => setPassword(value)}
        value={password}
      />
      {emptyFields && (
        <Text style={styles.error}>Veuillez remplir tous les champs</Text>
      )}
      {wrongEmail && (
        <Text style={styles.error}>Veuillez saisir un email au bon format</Text>
      )}
      {signupError && <Text style={styles.error}>{signupError}</Text>}
      <Button
        textButton="S'inscrire"
        textColor="black"
        width="50 %"
        height="40"
        background="#A3FD01"
        onPress={handleSignup}
        accessibilityLabel={"S'inscrire"}
        accessibilityHint={
          "Vous allez être redirigé vers la page d'acceuil de l'application"
        }
      />
      <View style={styles.alreadyAccountSection}>
        <Text style={styles.alreadyAccount}>Déjà un compte ? </Text>
        <TouchableOpacity
          onPress={handleGoToSignin}
          accessibilityLabel="Connecte-toi"
          accessibilityHint="Vous allez être redirigé vers la page de connection"
        >
          <Text style={styles.connect}>Connecte-toi !</Text>
        </TouchableOpacity>
      </View>
      {isLoading && (
        <View style={styles.backgroundLoading}>
          <ActivityIndicator size="large" color="#A3FD01" animating={true} />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
