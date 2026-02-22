import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Underline from "../../components/Underline";
import { useStatsScreen } from "./useStatsScreen";
import { styles } from "./StatsScreen.styles";

const DEFAULT_LABELS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"];

export default function StatsScreen({ navigation }) {
  const {
    history,
    weightsLineChart,
    labelsLineChart,
    lastWorkoutRelativeTime,
    labelsBarChart,
    dataBarChart,
    handleNavigateToWeight,
    handleNavigateToHistory,
  } = useStatsScreen(navigation);

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
              {history.length === 0 ? (
                <Text style={styles.text}>
                  Dernière séance : <Text style={styles.span}> DD/MM/YYYY</Text>
                </Text>
              ) : (
                <Text style={styles.text}>
                  Dernière séance faite :{" "}
                  <Text style={styles.span}>{lastWorkoutRelativeTime}</Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.secondTtitleContainer}>
        <Text style={styles.secondTitle}>Ton suivi de poids</Text>
        <Underline width={80} />
      </View>
      <View style={styles.infoContainer}>
        <FontAwesome
          name={"info-circle"}
          size={20}
          color={"#A3FD01"}
          style={styles.infoIcon}
        />
        <Text style={styles.textInfo}>
          Clique sur le graphique pour ajouter ton poids et ton objectif !
        </Text>
      </View>
      <TouchableOpacity
        style={styles.chartContainer}
        activeOpacity={0.7}
        onPress={handleNavigateToWeight}
      >
        <LineChart
          data={{
            labels: labelsLineChart.length > 0 ? labelsLineChart : DEFAULT_LABELS,
            datasets: [
              {
                data: weightsLineChart.length > 0 ? weightsLineChart : [0],
              },
            ],
          }}
          width={Dimensions.get("window").width}
          withInnerLines={true}
          segments={6}
          fromZero={false}
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
      <View style={styles.infoContainer}>
        <FontAwesome
          name={"info-circle"}
          size={20}
          color={"#A3FD01"}
          style={styles.infoIcon}
        />
        <Text style={styles.textInfo}>
          Clique sur le graphique pour accéder au suivi de tes séances !
        </Text>
      </View>
      <TouchableOpacity
        style={styles.chartContainer}
        activeOpacity={0.7}
        onPress={handleNavigateToHistory}
      >
        <BarChart
          data={{
            labels: labelsBarChart.length === 0 ? DEFAULT_LABELS : labelsBarChart,
            datasets: [
              {
                data: dataBarChart,
              },
            ],
          }}
          width={Dimensions.get("window").width}
          withInnerLines={true}
          fromZero={true}
          height={220}
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
    </ScrollView>
  );
}
