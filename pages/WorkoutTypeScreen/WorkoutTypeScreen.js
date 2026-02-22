import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
        <FontAwesome
          name={"chevron-left"}
          accessibilityLabel="Redirection vers la page d'accueil"
          size={24}
          color={COLORS.primary}
          onPress={handleGoHome}
          style={{ marginLeft: 15, marginTop: 5 }}
        />
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
          <LinearGradient
            colors={["#445B9F", COLORS.primary]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradiant}
          >
            <Image
              source={require("../../assets/illustrations/seance-perso.webp")}
              style={styles.image}
            />
            <View style={styles.textBtnContainer}>
              <Text style={styles.btnText}>Séance</Text>
              <Text style={styles.btnText}>personalisée</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Créer une séance pré-définie"
          accessibilityHint="Vous allez être redirigé vers la page des différents niveau de séance"
          activeOpacity={0.7}
          style={styles.btn}
          onPress={handleGoToPredefined}
        >
          <LinearGradient
            colors={["#445B9F", COLORS.primary]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradiant}
          >
            <Image
              source={require("../../assets/illustrations/seance-predef.webp")}
              style={styles.image}
            />
            <View style={styles.textBtnContainer}>
              <Text style={styles.btnText}>Séance</Text>
              <Text style={styles.btnText}>pré-définie</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
