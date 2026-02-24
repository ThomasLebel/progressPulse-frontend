import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Loader from "../../components/Loader";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import { styles } from "./ProgressStatsScreen.styles";
import { useProgressStatsScreen } from "./useProgressStatsScreen";

const RANK_COLORS = [COLORS.rankGold, COLORS.rankSilver, COLORS.rankBronze];

const SCREEN_WIDTH = Dimensions.get("window").width - 40;
const Y_AXIS_WIDTH = 44;

export default function ProgressStatsScreen({ navigation }) {
  const {
    isLoading,
    totalWorkouts,
    avgWorkoutsPerWeek,
    barChartData,
    chartTitle,
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

  const [selectedBarIndex, setSelectedBarIndex] = useState(null);

  const n = barChartData.length;
  const chartAvailable = SCREEN_WIDTH - Y_AXIS_WIDTH - 16 - 8;
  const barWidth = Math.min(
    20,
    Math.max(12, Math.floor(chartAvailable / n / 2)),
  );
  const barSpacing =
    n > 1
      ? Math.max(8, Math.floor((chartAvailable - n * barWidth) / n))
      : chartAvailable - barWidth;

  const chartData = barChartData.map((item, index) => ({
    ...item,
    onPress: () =>
      setSelectedBarIndex(selectedBarIndex === index ? null : index),
    frontColor: selectedBarIndex === index ? COLORS.primary : COLORS.accent,
  }));

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loaderContainer]}>
        <Loader></Loader>
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
                    setSelectedBarIndex(null);
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
          key={selectedPeriod}
          data={chartData}
          width={SCREEN_WIDTH - Y_AXIS_WIDTH}
          height={200}
          barWidth={barWidth}
          spacing={barSpacing}
          initialSpacing={16}
          endSpacing={8}
          frontColor={COLORS.accent}
          roundedTop
          noOfSections={4}
          yAxisLabelWidth={Y_AXIS_WIDTH}
          yAxisTextStyle={styles.chartYLabel}
          xAxisLabelTextStyle={styles.chartXLabel}
          yAxisColor="transparent"
          xAxisColor="rgba(255,255,255,0.08)"
          rulesColor="rgba(255,255,255,0.05)"
          rulesType="solid"
          backgroundColor={COLORS.cardBackground}
        />
        <View style={styles.chartFooter}>
          {selectedBarIndex !== null ? (
            <>
              <Text style={styles.chartFooterLabel}>
                {barChartData[selectedBarIndex]?.label}
              </Text>
              <Text style={styles.chartFooterValue}>
                {barChartData[selectedBarIndex]?.value} séance
                {barChartData[selectedBarIndex]?.value > 1 ? "s" : ""}
              </Text>
            </>
          ) : (
            <Text style={styles.chartFooterHint}>
              Appuie sur une barre pour voir le détail
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        style={styles.muscleStatsBtn}
        activeOpacity={0.75}
        onPress={handleNavigateToExercisesByMuscle}
      >
        <FontAwesome name="th-large" size={15} color={COLORS.background} />
        <Text style={styles.muscleStatsBtnText}>
          Statistiques détaillées des exercices
        </Text>
        <FontAwesome name="chevron-right" size={12} color={COLORS.background} />
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
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    navigation.navigate("exerciseStats", {
                      exerciseName: item.name,
                    });
                  }}
                >
                  <View style={styles.rankItem}>
                    <View
                      style={[
                        styles.rankBadge,
                        { borderColor: RANK_COLORS[index] },
                      ]}
                    >
                      <Text
                        style={[
                          styles.rankNumber,
                          { color: RANK_COLORS[index] },
                        ]}
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
                          <Text style={styles.rankCountText}>
                            ×{item.count}
                          </Text>
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
                </TouchableOpacity>
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
                <TouchableOpacity
                  key={item.name}
                  onPress={() => {
                    navigation.navigate("historyWorkout", {
                      workoutName: item.name,
                    });
                  }}
                >
                  <View style={styles.rankItem}>
                    <View
                      style={[
                        styles.rankBadge,
                        { borderColor: RANK_COLORS[index] },
                      ]}
                    >
                      <Text
                        style={[
                          styles.rankNumber,
                          { color: RANK_COLORS[index] },
                        ]}
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
                          <Text style={styles.rankCountText}>
                            ×{item.count}
                          </Text>
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
                </TouchableOpacity>
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
