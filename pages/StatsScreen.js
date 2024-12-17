import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Underline from "../components/Underline";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";

export default function StatsScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const history = useSelector((state) => state.workoutsHistory.value);
  // console.log(history[0].performances);

  // Récupération des 8 dernières entrées de poids à partir de user.weight
  const lastHeightWeight =
    user.weight.length > 0 &&
    [...user.weight]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Liste des poids
  const weights =
    lastHeightWeight && lastHeightWeight.map((element) => element.weight);

  // Liste des dates
  const labels =
    lastHeightWeight &&
    lastHeightWeight.map((element) => {
      return moment(element.date).format("DD-MM");
    });

  const lastWorkoutDate = history.length !== 0 && history.at(-1).date;

  // const

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Statistiques</Text>
        <Underline width={100} />
      </View>
      <View style={styles.secondTtitleContainer}></View>
      <View style={styles.settingWrapper}>
        <View style={styles.settingContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.inputContainer} activeOpacity={0.7}>
              <Text style={styles.text}>
                {history.length <= 1
                  ? "Total entraînement effectué : "
                  : "Total entraînements effectués :"}

                <Text style={styles.span}> {history.length}</Text>
              </Text>
            </View>
            <View style={styles.inputContainer} activeOpacity={0.7}>
              <Text style={styles.text}>
                Dernière séance :
                <Text style={styles.span}>
                  {history.length === 0
                    ? " DD/MM/YYYY"
                    : moment(lastWorkoutDate).format("Do MMM YYYY")}
                </Text>
              </Text>
            </View>
            {/* <View style={styles.inputContainer} activeOpacity={0.7}>
              <Text style={styles.text}>
                Exercice le plus fréquenté :
                <Text style={styles.span}> Bench (15)</Text>
              </Text>
            </View> */}
          </View>
        </View>
      </View>
      <View style={styles.secondTtitleContainer}>
        <Text style={styles.secondTitle}>Ton suivi de poids</Text>
        <Underline width={80} />
      </View>

      <TouchableOpacity
        style={styles.chartContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("weight")}
      >
        <LineChart
          data={{
            labels:
              labels.length > 0
                ? labels
                : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
            datasets: [
              {
                data: weights.length > 0 ? weights : [0],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          withInnerLines={true}
          segments={6}
          height={220}
          yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: "#4645AB",
            backgroundGradientTo: "#1C1C45",
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(163, 253, 1, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "1",
              stroke: "#1D632F",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center", marginBottom: 30 }}></View>
      <View style={styles.secondTtitleContainer}>
        <Text style={styles.secondTitle}>
          Ton nombre d'entraînements par mois
        </Text>
        <Underline width={80} />
      </View>
      <TouchableOpacity
        style={styles.chartContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("hystory")}
      >
        <BarChart
          data={{
            labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
            datasets: [
              {
                data: [10, 5, 6, 4, 3, 11],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          withInnerLines={true}
          segments={6}
          height={220}
          // yAxisSuffix="kg"
          yAxisInterval={1}
          chartConfig={{
            backgroundGradientFrom: "#4645AB",
            backgroundGradientTo: "#1C1C45",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(163, 253, 1, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
              strokeWidth: "1",
              stroke: "#1D632F",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </TouchableOpacity>
      {/* <View style={{ alignItems: "center" }}></View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D36",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    color: "white",
    fontWeight: 600,
  },
  secondTtitleContainer: {
    marginBottom: 20,
  },
  secondTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: 600,
  },
  settingWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },
  settingContainer: {
    width: "100%",
    maxWidth: 500,
    height: 90,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    width: "95%",
    height: "70%",
    borderRadius: 20,
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    height: 30,
  },
  span: {
    fontWeight: 600,
    fontSize: 16,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  buttonContainer: {
    width: 220,
    backgroundColor: "#A3FD01",
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: 600,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
