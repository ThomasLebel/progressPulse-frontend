import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { COLORS } from '../../constants/theme';
import { RootStackParamList } from '../../models/navigation';
import { styles } from './SignupScreen.styles';
import { useSignupScreen } from './useSignupScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <Image
            source={require('../../assets/illustrations/imageSigninSignup.webp')}
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
            <Text style={styles.error}>
              Veuillez saisir un email au bon format
            </Text>
          )}
          {signupError && <Text style={styles.error}>{signupError}</Text>}
          <View style={styles.btnContainer}>
            <Button
              textButton="S'inscrire"
              textColor="black"
              width="240"
              height="40"
              background={COLORS.primary}
              onPress={handleSignup}
              accessibilityLabel="S'inscrire"
              accessibilityHint="Vous allez être redirigé vers la page d'acceuil de l'application"
            />
          </View>
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
              <Loader />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
