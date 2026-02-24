import moment from "moment";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { LineChart } from "react-native-gifted-charts";
import * as Progress from "react-native-progress";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import AddWeightModal from "./modals/AddWeightModal";
import TargetWeightModal from "./modals/TargetWeightModal";
import { useWeightScreen } from "./useWeightScreen";
import { styles } from "./WeightScreen.styles";

const SCREEN_WIDTH = Dimensions.get("window").width - 40;
const Y_AXIS_WIDTH = 52;

export default function WeightScreen({ navigation, route }) {
  const {
    modalVisibleWeight,
    setModalVisibleWeight,
    modalVisibleTarget,
    setModalVisibleTarget,
    weight,
    setWeight,
    weightTarget,
    setWeightTarget,
    errorMessage,
    error,
    date,
    progressValue,
    progressValuePourcent,
    isCheckedLoss,
    isCheckedGain,
    isLoading,
    showConfetti,
    isDatePickerVisible,
    initialWeightInput,
    setInitialWeighInput,
    username,
    targetObjectif,
    startWeight,
    startDate,
    currentWeight,
    currentDate,
    targetWeight,
    targetDate,
    sortedWeights,
    weightChartPoints,
    showDatePicker,
    hideDatePicker,
    handleConfirmDate,
    handleAddWeight,
    addTargetWeight,
    closeModalWeight,
    closeModalTarget,
    handleCheckbox,
    handleGoToStats,
  } = useWeightScreen(navigation);

  return (
    <View style={styles.container}>
      <AddWeightModal
        visible={modalVisibleWeight}
        onClose={closeModalWeight}
        weight={weight}
        onChangeWeight={(value) => setWeight(value)}
        error={error}
        errorMessage={errorMessage}
        onAddWeight={handleAddWeight}
      />

      <TargetWeightModal
        visible={modalVisibleTarget}
        onClose={closeModalTarget}
        initialWeightInput={initialWeightInput}
        onChangeInitialWeight={(value) => setInitialWeighInput(value)}
        weightTarget={weightTarget}
        onChangeWeightTarget={(value) => setWeightTarget(value)}
        date={date}
        isDatePickerVisible={isDatePickerVisible}
        onShowDatePicker={showDatePicker}
        onHideDatePicker={hideDatePicker}
        onConfirmDate={handleConfirmDate}
        isCheckedLoss={isCheckedLoss}
        isCheckedGain={isCheckedGain}
        onCheckbox={handleCheckbox}
        error={error}
        errorMessage={errorMessage}
        onAddTarget={addTargetWeight}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Suivi de poids</Text>
        <Underline width={120} />
      </View>
      <Text style={styles.nameSubtitle}>{username}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Mon objectif</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.columnRow}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Début</Text>
              <Text style={styles.columnWeight}>{startWeight} kg</Text>
              <Text style={styles.columnDate}>{startDate}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>Actuel</Text>
              <View style={styles.circleWrapper}>
                <Progress.Circle
                  progress={progressValue}
                  animated={true}
                  color={COLORS.primary}
                  unfilledColor={"transparent"}
                  borderWidth={0.2}
                  size={90}
                  showsText={false}
                  strokeCap="round"
                />
                <Text style={styles.circleText}>{currentWeight} kg</Text>
              </View>
              <Text style={styles.columnDate}>{currentDate}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>
                Objectif{" "}
                {targetObjectif === "Gain" ? (
                  <FontAwesome6
                    name={"arrow-trend-up"}
                    size={13}
                    color={COLORS.primary}
                  />
                ) : targetObjectif === "Loss" ? (
                  <FontAwesome6
                    name={"arrow-trend-down"}
                    size={13}
                    color={COLORS.primary}
                  />
                ) : null}
              </Text>
              <Text style={styles.columnWeight}>{targetWeight} kg</Text>
              <Text style={styles.columnDate}>{targetDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Progression</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Avancement</Text>
            <Progress.Bar
              progress={progressValue}
              width={160}
              animated={true}
              color={COLORS.primary}
              unfilledColor={"transparent"}
              borderWidth={0}
              height={8}
              borderRadius={4}
            />
            <Text style={styles.progressPercent}>
              {progressValuePourcent} %
            </Text>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.buttonPrimary}
            activeOpacity={0.8}
            onPress={() => setModalVisibleWeight(!modalVisibleWeight)}
          >
            <Text style={styles.buttonPrimaryText}>Ajouter mon poids</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSecondary}
            activeOpacity={0.8}
            onPress={() => setModalVisibleTarget(!modalVisibleTarget)}
          >
            <Text style={styles.buttonSecondaryText}>
              Définir un objectif de poids
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Évolution du poids</Text>
        </View>

        {weightChartPoints.length < 2 ? (
          <View style={styles.card}>
            <Text style={styles.emptyText}>
              Ajoute au moins 2 pesées pour voir ton évolution.
            </Text>
          </View>
        ) : (
          <View style={styles.chartContainer}>
            <LineChart
              data={weightChartPoints}
              areaChart
              curved
              width={SCREEN_WIDTH - Y_AXIS_WIDTH}
              height={200}
              spacing={Math.floor(
                (SCREEN_WIDTH - Y_AXIS_WIDTH - 16 - 8) /
                  (weightChartPoints.length - 1),
              )}
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
              yAxisSuffix=" kg"
              hideDataPoints={false}
              pointerConfig={{
                pointerStripUptoDataPoint: true,
                pointerStripColor: "rgba(163, 253, 1, 0.25)",
                pointerStripWidth: 1,
                pointerColor: COLORS.accent,
                radius: 6,
                pointerLabelWidth: 130,
                pointerLabelHeight: 56,
                activatePointersOnLongPress: false,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (items) => {
                  const item = items[0];
                  return (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipDate}>{item.date}</Text>
                      <Text style={styles.tooltipValue}>
                        {item.originalValue} kg
                      </Text>
                    </View>
                  );
                },
              }}
            />
          </View>
        )}

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Historique de poids</Text>
        </View>

        <View style={styles.card}>
          {sortedWeights.length === 0 ? (
            <Text style={styles.emptyText}>Aucun poids enregistré</Text>
          ) : (
            sortedWeights.map((element, index) => (
              <View
                key={index}
                style={[
                  styles.historyRow,
                  index === sortedWeights.length - 1 && styles.historyRowLast,
                ]}
              >
                <Text style={styles.historyWeight}>{element.weight} kg</Text>
                <Text style={styles.historyDate}>
                  {moment(element.date).format("Do MMM YYYY")}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {showConfetti && (
        <ConfettiCannon
          count={50}
          origin={{ x: 0, y: 0 }}
          fadeOut={true}
          fallSpeed={2000}
        />
      )}

      {isLoading && (
        <View style={styles.backgroundLoading}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            animating={true}
          />
        </View>
      )}
    </View>
  );
}
