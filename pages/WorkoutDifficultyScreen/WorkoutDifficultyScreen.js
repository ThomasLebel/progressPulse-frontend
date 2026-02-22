import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
      <View>
        <FontAwesome
          name={"chevron-left"}
          size={24}
          color={COLORS.primary}
          style={{ marginLeft: 15, marginTop: 5 }}
          accessibilityLabel="Revenir sur la page pour sélectionné le type de séance"
          onPress={handleGoBack}
        />
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
            <LinearGradient
              colors={["#445B9F", COLORS.primary]}
              start={{ x: 1, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradiant}
            >
              <Image source={data.source} style={styles.image} />
              <Text style={styles.btnText}>{data.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
