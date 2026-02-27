import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HystoryWorkouts from "../../components/HystoryWorkout";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../models/navigation";
import { styles } from "./HistoryWorkoutsScreen.styles";
import {
  buildStarArray,
  formatCardioLabel,
  formatDate,
} from "./historyWorkoutsScreen.service";
import { useHistoryWorkoutsScreen } from "./useHistoryWorkoutsScreen";

type Props = NativeStackScreenProps<RootStackParamList, "historyWorkout">;

export default function HistoryWorkoutsScreen({ navigation, route }: Props) {
  const { workoutName, sortedWorkouts, navigateBack } =
    useHistoryWorkoutsScreen(navigation, route);

  const hystories = sortedWorkouts.map((element, i) => {
    const date = formatDate(element.date);

    const stars = buildStarArray(element.note).map((index) => (
      <FontAwesome
        key={index}
        name={"star"}
        size={15}
        color={COLORS.primary}
        accessibilityLabel="Affiche des étoiles correspondant à la note de notre séance"
      />
    ));

    const groupedWorkouts = element.performances.map((performance, j) => {
      if (typeof performance.exercise === "string") return null;
      const muscleGroupe = performance.exercise.muscleGroupe;
      const name = performance.exercise.name;
      return (
        <View key={j} style={{ width: "100%" }}>
          <Text style={{ color: COLORS.textPrimary, fontSize: 16 }}>
            {name} :
          </Text>
          <Underline width={40} />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {performance.sets.map((set, k) =>
              muscleGroupe !== "Cardio" ? (
                <View key={k} style={styles.setChip}>
                  <Text style={styles.setChipText}>
                    Série {k + 1} : {set.reps} x {set.weight} kg
                  </Text>
                </View>
              ) : (
                <View key={k} style={styles.setChipCardio}>
                  <Text style={styles.setChipText}>
                    {formatCardioLabel(set)}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>
      );
    });

    return (
      <HystoryWorkouts
        key={i}
        name={element.workoutName}
        date={date}
        stars={stars}
        ressenti={element.ressenti}
        workouts={groupedWorkouts}
        accessibilityLabel="Affiche les détails de notre séance"
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={navigateBack}
          accessibilityLabel="Retourner sur la page historique"
          accessibilityHint="On va retourner sur la page suivi de séance"
        >
          <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>{workoutName}</Text>
        <Underline width={80} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hystories}
      </ScrollView>
    </View>
  );
}
