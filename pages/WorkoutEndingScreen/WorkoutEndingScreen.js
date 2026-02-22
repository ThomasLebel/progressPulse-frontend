import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from "../../components/Button";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { useWorkoutEndingScreen } from "./useWorkoutEndingScreen";
import { styles } from "./WorkoutEndingScreen.styles";

export default function WorkoutEndingScreen({ navigation, route }) {
  const {
    personnalNote,
    setPersonnalNote,
    ressenti,
    setRessenti,
    isLoading,
    starsData,
    handlePress,
    handleBack,
  } = useWorkoutEndingScreen(navigation, route);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <FontAwesome
            name={"chevron-left"}
            size={24}
            color={COLORS.primary}
            style={{ marginBottom: 15 }}
            onPress={handleBack}
            accessibilityLabel="Redirection vers la liste des exercices"
          />
          <Text style={styles.title}>Séance terminée !</Text>
          <Underline width={80} />
        </View>
        <View style={styles.note}>
          <Text style={styles.text}>Comment s'est passsé ta séance ? </Text>
          <View style={styles.star}>
            {starsData.map((star, index) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setPersonnalNote(index + 1)}
                key={index}
                accessibilityLabel="Etoiles pour la note"
                accessibilityHint="Les étoiles correspondent à la note que vous voulez donner a la séance"
              >
                <FontAwesome
                  name={star.name}
                  color={star.color}
                  size={50}
                  style={{ marginRight: 25 }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            editable
            placeholder="Saisie ton ressenti sur la séance"
            multiline
            numberOfLines={10}
            maxLength={200}
            style={styles.input}
            onChangeText={(value) => setRessenti(value)}
            value={ressenti}
            accessibilityLabel="Saisie ton ressenti sur la séance"
          />
          <Button
            textButton="Enregistrer ma séance"
            textColor="black"
            width="70%"
            height={50}
            background={COLORS.primary}
            onPress={handlePress}
            accessibilityLabel={"Enregistrer ma séance"}
            accessibilityHint={
              "Vous allez être redirigé vers la page d'acceuil, vous pouvez retrouver votre séance dans l'historique"
            }
          />
        </View>
        {isLoading && (
          <View style={styles.backgroundLoading}>
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              animating={true}
            />
          </View>
        )}
        <ConfettiCannon
          count={50}
          origin={{ x: 0, y: 0 }}
          autoStart={true}
          fadeOut={true}
          fallSpeed={2000}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
