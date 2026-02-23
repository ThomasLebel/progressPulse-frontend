import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { useWorkoutDifficultyScreen } from "./useWorkoutDifficultyScreen";
import { styles } from "./WorkoutDifficultyScreen.styles";

export default function WorkoutDifficultyScreen({ navigation }) {
  const { difficultyOptions, handleNavigateToWorkout, handleGoBack } =
    useWorkoutDifficultyScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable
          style={styles.backButton}
          onPress={handleGoBack}
          accessibilityLabel="Revenir sur la page pour sélectionné le type de séance"
        >
          <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
        </Pressable>
        <View>
          <Text style={styles.title}>Niveau de la séance</Text>
          <Underline width={80} />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome
            name={"info-circle"}
            size={30}
            color={COLORS.primary}
            style={styles.infoIcon}
          />
          <Text style={styles.textInfo}>
            Indique ton niveau pour commencer !
          </Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        {difficultyOptions.map((data) => (
          <TouchableOpacity
            key={data.id}
            activeOpacity={0.7}
            style={styles.btn}
            accessibilityLabel={`Niveau de séance ${data.name}`}
            accessibilityHint="En cliquant sur ce bouton vous serez redirigé vers les exercices à la difficultée associé"
            onPress={() => handleNavigateToWorkout(data.name)}
          >
            <View style={styles.card}>
              <View style={styles.accentBar} />
              <View style={styles.imageContainer}>
                <Image source={data.source} style={styles.image} />
              </View>
              <View style={styles.textBtnContainer}>
                <Text style={styles.btnText}>{data.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
