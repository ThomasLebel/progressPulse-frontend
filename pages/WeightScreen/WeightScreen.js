import moment from "moment";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Underline from "../../components/Underline";
import { COLORS } from "../../constants/theme";
import AddWeightModal from "./modals/AddWeightModal";
import TargetWeightModal from "./modals/TargetWeightModal";
import { useWeightScreen } from "./useWeightScreen";
import { styles } from "./WeightScreen.styles";

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

      <TouchableOpacity style={styles.backButton} onPress={handleGoToStats}>
        <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
      </TouchableOpacity>

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
