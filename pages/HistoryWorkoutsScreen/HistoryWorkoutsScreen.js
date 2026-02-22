import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import HystoryWorkouts from "../../components/HystoryWorkout";
import Underline from "../../components/Underline";
import { useHistoryWorkoutsScreen } from "./useHistoryWorkoutsScreen";
import { styles } from "./HistoryWorkoutsScreen.styles";
import {
  formatDate,
  buildStarArray,
  formatCardioLabel,
} from "./historyWorkoutsScreen.service";

export default function HistoryWorkoutsScreen({ navigation, route }) {
  const { workoutName, sortedWorkouts, navigateBack } =
    useHistoryWorkoutsScreen(navigation, route);

  const hystories = sortedWorkouts.map((element, i) => {
    const date = formatDate(element.date);

    const stars = buildStarArray(element.note).map((index) => (
      <FontAwesome
        key={index}
        name={"star"}
        size={15}
        color={"#3BC95F"}
        accessibilityLabel="Affiche des étoiles correspondant à la note de notre séance"
      />
    ));

    const groupedWorkouts = element.performances.map((performance, j) => {
      const muscleGroupe = performance.exercise.muscleGroupe;
      const name = performance.exercise.name;
      return (
        <View key={j} style={{ width: "100%" }}>
          <Text style={{ color: "white", fontSize: 16 }}>{name} :</Text>
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
                <LinearGradient
                  key={k}
                  colors={["#1C1C45", "#4645AB"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 23,
                    width: "45%",
                    marginBottom: 10,
                    marginRight: 10,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    Série {k + 1} : {set.reps} x {set.weight} kg
                  </Text>
                </LinearGradient>
              ) : (
                <LinearGradient
                  key={k}
                  colors={["#1C1C45", "#4645AB"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 23,
                    width: "75%",
                    marginBottom: 10,
                    marginRight: 10,
                    borderRadius: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    {formatCardioLabel(set)}
                  </Text>
                </LinearGradient>
              )
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
        accessibilityLabel={`Affiche les détails de notre séance`}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={navigateBack}
          accessibilityLabel="Retourn sur la page history"
          accessibilityHint="On va retourner sur la page suivie de séance"
        >
          <FontAwesome name={"chevron-left"} size={24} color={"#3BC95F"} />
          <Text style={styles.backToText}>Suivi</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>{workoutName}</Text>
      </View>
      <ScrollView style={styles.weightContainer}>{hystories}</ScrollView>
    </View>
  );
}
