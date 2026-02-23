import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Underline from '../../components/Underline';
import { COLORS } from '../../constants/theme';
import { styles } from './ExerciseStatsScreen.styles';
import { useExerciseStatsScreen } from './useExerciseStatsScreen';

const CHART_CONFIG = {
  backgroundGradientFrom: COLORS.cardBackground,
  backgroundGradientTo: COLORS.background,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(163, 253, 1, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: COLORS.primary,
  },
};

const SCREEN_WIDTH = Dimensions.get('window').width - 40;

export default function ExerciseStatsScreen({ navigation, route }) {
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
    personalRecord,
    best1RM,
    chartData,
    hasChartData,
    hasData,
    handleBack,
  } = useExerciseStatsScreen(navigation, route);

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
          <FontAwesome name="chevron-left" size={16} color={COLORS.textPrimary} />
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
      <Underline width={80} />

      {!hasData ? (
        <Text style={styles.emptyText}>
          Aucune donnée disponible pour cet exercice.
        </Text>
      ) : (
        <>
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
                  name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
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

          {/* Stats overview */}
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Séances</Text>
              <Text style={styles.statValue}>{sessionCount}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Meilleur 1RM</Text>
              {best1RM ? (
                <>
                  <Text style={styles.statValue}>{best1RM.estimated}</Text>
                  <Text style={styles.statUnit}>kg</Text>
                  <Text style={styles.statSub}>
                    {best1RM.weight} kg × {best1RM.reps} reps
                  </Text>
                </>
              ) : (
                <Text style={styles.statValue}>—</Text>
              )}
            </View>
          </View>

          {/* Record personnel (all-time) */}
          {personalRecord && (
            <>
              <Text style={styles.sectionTitle}>Record personnel</Text>
              <View style={styles.statCardFull}>
                <View style={styles.recordRow}>
                  <Text style={styles.recordValue}>{personalRecord.weight}</Text>
                  <Text style={styles.recordUnit}>kg</Text>
                  <Text style={styles.recordUnit}>
                    × {personalRecord.reps} reps
                  </Text>
                </View>
                <Text style={styles.recordDetail}>
                  Réalisé le {personalRecord.date}
                </Text>
              </View>
            </>
          )}

          {/* Progression de la force */}
          <Text style={styles.sectionTitle}>Progression de la force</Text>
          {sessionCount === 0 ? (
            <Text style={styles.emptyPeriodText}>
              Aucune séance sur cette période.
            </Text>
          ) : !hasChartData ? (
            <Text style={styles.emptyPeriodText}>
              Pas de données de charge pour cet exercice.
            </Text>
          ) : (
            <>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: chartData.labels,
                    datasets: [{ data: chartData.data }],
                  }}
                  width={SCREEN_WIDTH}
                  height={220}
                  withInnerLines
                  fromZero={false}
                  yAxisSuffix=" kg"
                  chartConfig={CHART_CONFIG}
                  bezier
                  style={{ borderRadius: 0 }}
                />
              </View>
              <Text style={styles.onermNote}>
                1RM estimé = charge × (1 + reps / 30)
              </Text>
            </>
          )}

          {/* Effort sur la période */}
          {sessionCount > 0 && (
            <>
              <Text style={styles.sectionTitle}>Effort sur la période</Text>
              <View style={styles.effortRow}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Volume total soulevé</Text>
                  <Text style={styles.statValue}>
                    {totalVolume.toLocaleString('fr-FR')}
                  </Text>
                  <Text style={styles.statUnit}>kg</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Moyenne / séance</Text>
                  <Text style={styles.statValue}>
                    {averageVolume.toLocaleString('fr-FR')}
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
