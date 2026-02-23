import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";
import { useWorkoutTypeScreen } from "./useWorkoutTypeScreen";
import { styles } from "./WorkoutTypeScreen.styles";

export default function WorkoutTypeScreen({ navigation }) {
  const { handleGoHome, handleGoToPersonalized, handleGoToPredefined } =
    useWorkoutTypeScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable
          style={styles.backButton}
          onPress={handleGoHome}
          accessibilityLabel="Redirection vers la page d'accueil"
        >
          <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
        </Pressable>
        <View style={styles.infoContainer}>
          <FontAwesome
            name={"info-circle"}
            size={30}
            color={COLORS.primary}
            style={styles.infoIcon}
            accessibilityLabel="Donne une information pour choisir entre la séance personnalisé ou pré-définie"
          />
          <Text style={styles.textInfo}>
            Crée ta séance en choisissant tes exercices ou sélectionne-en une
            déjà prête rien que pour toi !
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          accessibilityLabel="Créer une séance personalisée"
          accessibilityHint="Vous allez être redirigé vers la page des groupes musculaires"
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handleGoToPersonalized}
        >
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <FontAwesome6
                  name="dumbbell"
                  size={32}
                  color={COLORS.primary}
                />
              </View>
            </View>
            <View style={styles.textBtnContainer}>
              <Text style={styles.btnText}>Séance{"\n"}personnalisée</Text>
              <Text style={styles.btnSubText}>Construis ta séance</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Créer une séance pré-définie"
          accessibilityHint="Vous allez être redirigé vers la page des différents niveau de séance"
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handleGoToPredefined}
        >
          <View style={styles.card}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <FontAwesome6
                  name="book-open"
                  size={32}
                  color={COLORS.primary}
                />
              </View>
            </View>
            <View style={styles.textBtnContainer}>
              <Text style={styles.btnText}>Séance{"\n"}pré-définie</Text>
              <Text style={styles.btnSubText}>Programme guidé par niveau</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
