import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BtnWorkoutSession from "../../components/BtnWorkoutSession";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { useWorkoutChoiceScreen } from "./useWorkoutChoiceScreen";
import { styles } from "./WorkoutChoiceScreen.styles";

export default function WorkoutChoiceScreen({ navigation, route }) {
  const { name, isLoading, workoutItems, handleBack } = useWorkoutChoiceScreen(
    navigation,
    route,
  );

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Redirection vers la page pour choisir la difficultée d'une séance"
        >
          <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
        </Pressable>
        <Text style={styles.title}>{name}</Text>
        <Underline width={80} />
      </View>
      <View style={styles.infoContainer}>
        <FontAwesome
          name={"info-circle"}
          size={30}
          color={COLORS.primary}
          style={styles.infoIcon}
          accessibilityLabel="Choisis ta séance"
        />
        <Text style={styles.textInfo}>Choisis ta séance !</Text>
      </View>
      <View style={styles.btnContainer}>
        <ScrollView contentContainerStyle={{ paddingBottom: 85 }}>
          {workoutItems.map((item) => (
            <BtnWorkoutSession
              key={item.key}
              name={item.name}
              time={item.time}
              nbExercise={item.nbExercise}
              onPress={item.onPress}
              accessibilityLabel={`Choisir la séance ${item.name}`}
              accessibilityHint={
                "Vous serez redirigé vers le résumé de cette séance"
              }
              image={item.image}
              textBtn="Add Workout"
            />
          ))}
        </ScrollView>
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
    </View>
  );
}
