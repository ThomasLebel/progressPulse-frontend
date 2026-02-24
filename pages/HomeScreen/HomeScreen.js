import { Image, ScrollView, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BtnWorkoutSession from "../../components/BtnWorkoutSession";
import Button from "../../components/Button";
import { COLORS } from "../../constants/theme";
import { styles } from "./HomeScreen.styles";
import { useHomeScreen } from "./useHomeScreen";

export default function HomeScreen({ navigation }) {
  const {
    user,
    workouts,
    workoutsDisplayData,
    currentWorkoutID,
    handleAddWorkout,
    handleWorkoutNavigation,
  } = useHomeScreen(navigation);

  const workoutsToShow = workoutsDisplayData.map((workout, index) => (
    <BtnWorkoutSession
      key={index}
      name={workout.name}
      nbExercise={workout.nbExercises}
      time={workout.duration + " min"}
      onPress={() => handleWorkoutNavigation(workout._id)}
      accessibilityLabel={`Commencer la séance ${workout.name}`}
      accessibilityHint="On va être diriger vers le résumé de notre séance avant de la commencer"
      image={workout.image}
      textBtn={currentWorkoutID === workout._id ? "Reprendre" : "Démarrer"}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Hello {user.username},</Text>
        <Text style={styles.span}>prêt pour un nouvel entrainement ?</Text>
        {workouts.length === 0 && (
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={30}
              color={COLORS.primary}
              style={styles.infoIcon}
              accessibilityLabel={`Donne une information si on a pas de séance enregistré`}
            />
            <Text style={styles.textInfo}>
              Crée ta séance et commence l'entrainement
            </Text>
          </View>
        )}
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Button
            background={COLORS.primary}
            borderColor="none"
            textButton="Ajouter une séance"
            textColor="black"
            width={300}
            height={50}
            onPress={handleAddWorkout}
            isLinearGradiant={false}
            accessibilityLabel={"Ajouter une séance d'entrainement"}
            accessibilityHint={
              "On va pouvoir rajouter une séance pré-défini ou personnalisé"
            }
          />
        </View>
        {workouts.length === 0 && (
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require("../../assets/illustrations/homePage.png")}
            />
          </View>
        )}
        <View style={styles.btn}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 400 }}
            showsVerticalScrollIndicator={false}
          >
            {workoutsToShow}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
