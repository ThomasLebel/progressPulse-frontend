import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
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

const RANK_COLORS = [COLORS.rankGold, COLORS.rankSilver, COLORS.rankBronze];

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
    topWorkouts,
    handleNavigateToExercise,
    handleNavigateToAllExercises,
    handleNavigateToAllWorkouts,
    handleNavigateToExercisesByMuscle,
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

  const top3Exercises = topExercises.slice(0, 3);
  const top3Workouts = topWorkouts.slice(0, 3);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
    >
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
                    selectedPeriod === period.key && styles.dropdownItemActive,
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

      <Text style={styles.sectionTitle}>Séances effectuées</Text>
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
      <TouchableOpacity
        style={styles.muscleStatsBtn}
        activeOpacity={0.75}
        onPress={handleNavigateToExercisesByMuscle}
      >
        <View style={styles.muscleStatsBtnLeft}>
          <View style={styles.muscleStatsBtnIcon}>
            <FontAwesome name="filter" size={14} color={COLORS.background} />
          </View>
          <Text style={styles.muscleStatsBtnText}>
            Statistiques par groupe musculaire
          </Text>
        </View>
        <FontAwesome name="chevron-right" size={12} color={COLORS.accent} />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Mes tops</Text>
      <View style={styles.topCardsRow}>
        {/* Card Top 3 exercices */}
        <View style={styles.topCard}>
          <View style={styles.topCardHeader}>
            <FontAwesome name="bolt" size={14} color={COLORS.accent} />
            <Text style={styles.topCardTitle}>Exercices</Text>
          </View>
          {top3Exercises.length === 0 ? (
            <Text style={styles.topCardEmpty}>
              Pas encore de données pour cette période.
            </Text>
          ) : (
            top3Exercises.map((item, index) => {
              const maxCount = top3Exercises[0].count;
              return (
                <View key={item.name} style={styles.rankItem}>
                  <View
                    style={[
                      styles.rankBadge,
                      { borderColor: RANK_COLORS[index] },
                    ]}
                  >
                    <Text
                      style={[styles.rankNumber, { color: RANK_COLORS[index] }]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View style={styles.rankContent}>
                    <View style={styles.rankTopRow}>
                      <Text style={styles.rankName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <View style={styles.rankCountPill}>
                        <Text style={styles.rankCountText}>×{item.count}</Text>
                      </View>
                    </View>
                    {item.muscleGroupe ? (
                      <Text style={styles.rankSub} numberOfLines={1}>
                        {item.muscleGroupe}
                      </Text>
                    ) : null}
                    <View style={styles.rankBarBg}>
                      <View
                        style={[
                          styles.rankBarFill,
                          {
                            width: `${Math.round((item.count / maxCount) * 100)}%`,
                            backgroundColor: RANK_COLORS[index],
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })
          )}
          <TouchableOpacity
            style={styles.seeAllBtn}
            activeOpacity={0.75}
            onPress={handleNavigateToAllExercises}
          >
            <Text style={styles.seeAllBtnText}>Voir tous les exercices</Text>
            <FontAwesome
              name="chevron-right"
              size={10}
              color={COLORS.background}
            />
          </TouchableOpacity>
        </View>

        {/* Card Top 3 séances */}
        <View style={styles.topCard}>
          <View style={styles.topCardHeader}>
            <FontAwesome name="fire" size={14} color={COLORS.accent} />
            <Text style={styles.topCardTitle}>Séances</Text>
          </View>
          {top3Workouts.length === 0 ? (
            <Text style={styles.topCardEmpty}>
              Pas encore de données pour cette période.
            </Text>
          ) : (
            top3Workouts.map((item, index) => {
              const maxCount = top3Workouts[0].count;
              return (
                <View key={item.name} style={styles.rankItem}>
                  <View
                    style={[
                      styles.rankBadge,
                      { borderColor: RANK_COLORS[index] },
                    ]}
                  >
                    <Text
                      style={[styles.rankNumber, { color: RANK_COLORS[index] }]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View style={styles.rankContent}>
                    <View style={styles.rankTopRow}>
                      <Text style={styles.rankName} numberOfLines={2}>
                        {item.name}
                      </Text>
                      <View style={styles.rankCountPill}>
                        <Text style={styles.rankCountText}>×{item.count}</Text>
                      </View>
                    </View>
                    <View style={styles.rankBarBg}>
                      <View
                        style={[
                          styles.rankBarFill,
                          {
                            width: `${Math.round((item.count / maxCount) * 100)}%`,
                            backgroundColor: RANK_COLORS[index],
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              );
            })
          )}
          <TouchableOpacity
            style={styles.seeAllBtn}
            activeOpacity={0.75}
            onPress={handleNavigateToAllWorkouts}
          >
            <Text style={styles.seeAllBtnText}>Voir toutes les séances</Text>
            <FontAwesome
              name="chevron-right"
              size={10}
              color={COLORS.background}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
