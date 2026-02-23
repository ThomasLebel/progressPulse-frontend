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
    totalVolume,
    personalRecord,
    chartData,
    sessionCount,
    handleBack,
  } = useExerciseStatsScreen(navigation, route);

  const hasData = sessionCount > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={handleBack}
        >
          <FontAwesome name="chevron-left" size={16} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>{exerciseName}</Text>
      </View>
      <Underline width={80} />

      {!hasData ? (
        <Text style={styles.emptyText}>
          Aucune donnée disponible pour cet exercice.
        </Text>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Séances</Text>
              <Text style={styles.statValue}>{sessionCount}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>Volume total</Text>
              <Text style={styles.statValue}>
                {totalVolume.toLocaleString('fr-FR')}
              </Text>
              <Text style={styles.statUnit}>kg</Text>
            </View>
          </View>

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

          <Text style={styles.sectionTitle}>Progression du volume</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    data:
                      chartData.data.length > 0 ? chartData.data : [0],
                  },
                ],
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
        </>
      )}
    </ScrollView>
  );
}
