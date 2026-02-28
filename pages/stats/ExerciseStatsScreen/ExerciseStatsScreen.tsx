import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ComponentType } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../constants/theme";
import { RootStackParamList } from "../../../models/navigation";
import { getYAxisOffset } from "./exerciseStatsScreen.service";
import { styles } from "./ExerciseStatsScreen.styles";
import { ChartDataPoint } from "./ExerciseStatsScreen.types";
import { useExerciseStatsScreen } from "./useExerciseStatsScreen";

type LineChartExtendedProps = Parameters<typeof LineChart>[0] & {
  yAxisSuffix?: string;
};
const LineChartExtended = LineChart as ComponentType<LineChartExtendedProps>;

const SCREEN_WIDTH = Dimensions.get("window").width - 40;
const Y_AXIS_WIDTH = 44;

type Props = NativeStackScreenProps<RootStackParamList, "exerciseStats">;

export default function ExerciseStatsScreen({ navigation, route }: Props) {
  const {
    exerciseName,
    muscleGroup,
    selectedPeriod,
    setSelectedPeriod,
    dropdownOpen,
    setDropdownOpen,
    PERIODS,
    sessionCount,
    totalVolume,
    averageVolume,
    chartPoints,
    hasChartData,
    hasData,
    lastPerformances,
    bestPerformance,
    volumeProgression,
    handleBack,
  } = useExerciseStatsScreen(navigation, route);

  const isCardio = muscleGroup === "Cardio";
  const chartSpacing =
    chartPoints.length > 1
      ? Math.floor(
          (SCREEN_WIDTH - Y_AXIS_WIDTH - 16 - 8) / (chartPoints.length - 1),
        )
      : SCREEN_WIDTH - Y_AXIS_WIDTH - 16;

  const chartMinValue =
    chartPoints.length > 0 ? Math.min(...chartPoints.map((p) => p.value)) : 0;

  const yAxisOffset = getYAxisOffset(chartPoints);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={handleBack}
        >
          <FontAwesome
            name="chevron-left"
            size={16}
            color={COLORS.textPrimary}
          />
        </TouchableOpacity>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{exerciseName}</Text>
          {muscleGroup ? (
            <View style={styles.muscleBadge}>
              <Text style={styles.muscleBadgeText}>{muscleGroup}</Text>
            </View>
          ) : null}
        </View>
      </View>

      {!hasData ? (
        <Text style={styles.emptyText}>
          Aucune donnée disponible pour cet exercice.
        </Text>
      ) : (
        <>
          {/* Mes dernières perf */}
          <Text style={styles.sectionTitle}>Mes dernières perf</Text>
          {lastPerformances.length === 0 ? (
            <Text style={styles.emptyPeriodText}>
              Pas encore de données disponibles.
            </Text>
          ) : (
            <ScrollView
              horizontal
              snapToInterval={SCREEN_WIDTH}
              snapToAlignment="start"
              pagingEnabled={false}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
            >
              {lastPerformances.map((session, i) => {
                const sessionTotal = session.sets.reduce(
                  (acc, s) => acc + (s.reps ?? 0) * (s.weight ?? 0),
                  0,
                );
                return (
                  <View key={i} style={{ width: SCREEN_WIDTH }}>
                    <View style={styles.lastPerfCard}>
                      <Text style={styles.lastPerfDate}>{session.date}</Text>
                      <View style={styles.lastPerfSetsRow}>
                        {session.sets.map((set, k) => (
                          <View key={k} style={styles.lastPerfPill}>
                            <Text style={styles.lastPerfPillLabel}>
                              S{k + 1}
                            </Text>
                            {muscleGroup !== "Cardio" ? (
                              <Text style={styles.lastPerfPillText}>
                                {set.reps} reps · {set.weight} kg
                              </Text>
                            ) : (
                              <Text style={styles.lastPerfPillText}>
                                {set.rest / 60} min · Rés. {set.weight}
                              </Text>
                            )}
                          </View>
                        ))}
                      </View>
                      {muscleGroup !== "Cardio" && sessionTotal > 0 && (
                        <View style={styles.lastPerfTotalRow}>
                          <Text style={styles.lastPerfTotalLabel}>
                            Volume total
                          </Text>
                          <Text style={styles.lastPerfTotalValue}>
                            {sessionTotal.toLocaleString("fr-FR")} kg
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}

          {/* Filtre de période */}
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

          {/* Meilleure séance sur la période */}
          {bestPerformance ? (
            <>
              <Text style={styles.sectionTitle}>Meilleure séance</Text>
              <View style={styles.bestPerfCard}>
                <View style={styles.bestPerfHeader}>
                  <View style={styles.bestPerfBadge}>
                    <FontAwesome
                      name="trophy"
                      size={11}
                      color={COLORS.background}
                    />
                    <Text style={styles.bestPerfBadgeText}>Top 1</Text>
                  </View>
                  <Text style={styles.bestPerfDate}>
                    {bestPerformance.date}
                  </Text>
                </View>
                <View style={styles.lastPerfSetsRow}>
                  {bestPerformance.sets.map((set, k) => (
                    <View key={k} style={styles.lastPerfPill}>
                      <Text style={styles.lastPerfPillLabel}>S{k + 1}</Text>
                      {muscleGroup !== "Cardio" ? (
                        <Text style={styles.lastPerfPillText}>
                          {set.reps} reps · {set.weight} kg
                        </Text>
                      ) : (
                        <Text style={styles.lastPerfPillText}>
                          {set.rest / 60} min · Rés. {set.weight}
                        </Text>
                      )}
                    </View>
                  ))}
                </View>
                {muscleGroup !== "Cardio" && bestPerformance.volume > 0 && (
                  <View style={styles.lastPerfTotalRow}>
                    <Text style={styles.lastPerfTotalLabel}>Volume total</Text>
                    <Text style={styles.lastPerfTotalValue}>
                      {bestPerformance.volume.toLocaleString("fr-FR")} kg
                    </Text>
                  </View>
                )}
              </View>
            </>
          ) : (
            sessionCount === 0 && (
              <Text style={styles.emptyPeriodText}>
                Aucune séance sur cette période.
              </Text>
            )
          )}

          {/* Stats overview */}
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Séances</Text>
              <Text style={styles.statValue}>{sessionCount}</Text>
            </View>
            {volumeProgression !== null && (
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Progression</Text>
                <Text
                  style={[
                    styles.statValue,
                    volumeProgression >= 0
                      ? styles.progressionPositive
                      : styles.progressionNegative,
                  ]}
                >
                  {volumeProgression >= 0 ? "+" : ""}
                  {volumeProgression}%
                </Text>
                <Text style={styles.statUnit}>vs 1ère séance</Text>
              </View>
            )}
          </View>

          {/* Progression du volume */}
          <Text style={styles.sectionTitle}>Progression du volume</Text>
          {sessionCount === 0 ? (
            <Text style={styles.emptyPeriodText}>
              Aucune séance sur cette période.
            </Text>
          ) : !hasChartData ? (
            <Text style={styles.emptyPeriodText}>
              Pas de données de charge pour cet exercice.
            </Text>
          ) : (
            <View style={styles.chartContainer}>
              <LineChartExtended
                key={selectedPeriod}
                data={chartPoints}
                areaChart
                curved
                width={SCREEN_WIDTH - Y_AXIS_WIDTH}
                height={200}
                spacing={chartSpacing}
                initialSpacing={16}
                endSpacing={8}
                color={COLORS.accent}
                startFillColor={COLORS.accent}
                endFillColor="transparent"
                startOpacity={0.18}
                endOpacity={0}
                thickness={2}
                dataPointsColor={COLORS.primary}
                dataPointsRadius={4}
                yAxisTextStyle={styles.chartYLabel}
                xAxisLabelTextStyle={styles.chartXLabel}
                yAxisColor="transparent"
                xAxisColor="rgba(255,255,255,0.08)"
                rulesColor="rgba(255,255,255,0.05)"
                rulesType="solid"
                yAxisLabelWidth={Y_AXIS_WIDTH}
                noOfSections={4}
                yAxisOffset={yAxisOffset}
                yAxisSuffix=" kg"
                hideDataPoints={false}
                pointerConfig={{
                  pointerStripUptoDataPoint: true,
                  pointerStripColor: "rgba(163, 253, 1, 0.25)",
                  pointerStripWidth: 1,
                  pointerColor: COLORS.accent,
                  radius: 6,
                  pointerLabelWidth: 164,
                  pointerLabelHeight: 170,
                  activatePointersOnLongPress: false,
                  autoAdjustPointerLabelPosition: true,
                  pointerLabelComponent: (items: ChartDataPoint[]) => {
                    const item = items[0];
                    return (
                      <View style={styles.tooltip}>
                        <Text style={styles.tooltipDate}>{item.date}</Text>
                        {item.sets.map((set, i) => (
                          <Text key={i} style={styles.tooltipSet}>
                            {isCardio
                              ? `S${i + 1}  ${set.rest / 60} min · Rés. ${set.weight}`
                              : `S${i + 1}  ${set.reps} × ${set.weight} kg`}
                          </Text>
                        ))}
                        {!isCardio && item.value > 0 && (
                          <View style={styles.tooltipDivider} />
                        )}
                        {!isCardio && item.value > 0 && (
                          <Text style={styles.tooltipVolume}>
                            {item.value.toLocaleString("fr-FR")} kg
                          </Text>
                        )}
                      </View>
                    );
                  },
                }}
              />
            </View>
          )}

          {/* Effort sur la période */}
          {sessionCount > 0 && (
            <>
              <Text style={styles.sectionTitle}>Effort sur la période</Text>
              <View style={styles.effortRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Volume total soulevé</Text>
                  <Text style={styles.statValue}>
                    {totalVolume.toLocaleString("fr-FR")}
                  </Text>
                  <Text style={styles.statUnit}>kg</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Moyenne / séance</Text>
                  <Text style={styles.statValue}>
                    {averageVolume.toLocaleString("fr-FR")}
                  </Text>
                  <Text style={styles.statUnit}>kg</Text>
                </View>
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}
