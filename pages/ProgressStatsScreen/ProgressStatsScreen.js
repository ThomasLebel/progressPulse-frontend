import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { styles } from "./ProgressStatsScreen.styles";
import { useProgressStatsScreen } from "./useProgressStatsScreen";

function makeChartConfig(barPercentage) {
  return {
    backgroundGradientFrom: "#1C1C3A",
    backgroundGradientTo: "#0D0D36",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(163, 253, 1, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage,
    style: {
      borderRadius: 0,
    },
    propsForDots: {
      r: "4",
      strokeWidth: "1",
      stroke: "#1D632F",
    },
  };
}

const SCREEN_WIDTH = Dimensions.get("window").width - 40;

export default function ProgressStatsScreen({ navigation }) {
  const {
    isLoading,
    totalWorkouts,
    avgWorkoutsPerWeek,
    barChartData,
    chartTitle,
    barPercentage,
    topExercises,
    handleNavigateToExercise,
    selectedPeriod,
    setSelectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    PERIODS,
  } = useProgressStatsScreen(navigation);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      activeOpacity={0.7}
      onPress={() => handleNavigateToExercise(item.name)}
    >
      <View style={styles.exerciseLeft}>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseMuscle}>{item.muscleGroupe}</Text>
      </View>
      <View style={styles.exerciseRight}>
        <Text style={styles.exerciseCount}>×{item.count}</Text>
        <FontAwesome name="chevron-right" size={12} color={COLORS.accent} />
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      data={topExercises}
      keyExtractor={(item) => item.name}
      renderItem={renderExerciseItem}
      ListHeaderComponent={
        <>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Ma progression</Text>
              <Underline width={100} />
            </View>
          </View>

          <View style={styles.filterRow}>
            <View>
              <TouchableOpacity
                style={styles.filterButton}
                activeOpacity={0.7}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text style={styles.filterButtonText} numberOfLines={1}>
                  {PERIODS.find((p) => p.key === selectedPeriod)?.label}
                </Text>
                <FontAwesome
                  name={dropdownOpen ? "chevron-up" : "chevron-down"}
                  size={10}
                  color={COLORS.accent}
                />
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdown}>
                  {PERIODS.map((period) => (
                    <TouchableOpacity
                      key={period.key}
                      style={[
                        styles.dropdownItem,
                        selectedPeriod === period.key &&
                          styles.dropdownItemActive,
                      ]}
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectedPeriod(period.key);
                        setDropdownOpen(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.dropdownItemText,
                          selectedPeriod === period.key &&
                            styles.dropdownItemTextActive,
                        ]}
                      >
                        {period.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <Text style={styles.sectionTitle}>Séance effectuées</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statValue}>{totalWorkouts}</Text>
              </View>
              <FontAwesome
                name="trophy"
                size={32}
                color={COLORS.primary}
                style={styles.statIcon}
              />
            </View>
            <View style={styles.statCard}>
              <View>
                <Text style={styles.statLabel}>/ semaine</Text>
                <Text style={styles.statValue}>{avgWorkoutsPerWeek}</Text>
              </View>
              <FontAwesome
                name="calendar"
                size={32}
                color={COLORS.primary}
                style={styles.statIcon}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>{chartTitle}</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={{
                labels: barChartData.labels,
                datasets: [
                  {
                    data:
                      barChartData.data.length > 0
                        ? barChartData.data
                        : barChartData.labels.map(() => 0),
                  },
                ],
              }}
              width={SCREEN_WIDTH}
              height={200}
              fromZero
              withInnerLines
              chartConfig={makeChartConfig(barPercentage)}
              style={{ borderRadius: 0 }}
              yAxisLabel=""
              yAxisSuffix=""
            />
          </View>

          <Text style={styles.sectionTitle}>Exercices les plus pratiqués</Text>
          {topExercises.length === 0 && (
            <Text style={styles.emptyText}>
              Aucune donnée disponible pour le moment.
            </Text>
          )}
        </>
      }
    />
  );
}
