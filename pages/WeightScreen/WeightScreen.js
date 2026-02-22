import ConfettiCannon from "react-native-confetti-cannon";
import * as Progress from "react-native-progress";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import moment from "moment";
import AddWeightModal from "./modals/AddWeightModal";
import TargetWeightModal from "./modals/TargetWeightModal";
import { styles } from "./WeightScreen.styles";
import { useWeightScreen } from "./useWeightScreen";

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

      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.backToContainer} onPress={handleGoToStats}>
          <FontAwesome name={"chevron-left"} size={24} color={"#3BC95F"} />
          <Text style={styles.backToText}>Statistiques</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Suivi de poids</Text>
      </View>

      <Text style={styles.nameTitle}>{username}</Text>

      <ScrollView style={styles.weightContainer}>
        <View style={styles.objectif}>
          <View style={styles.colunmContainer}>
            <View style={styles.colunm}>
              <Text style={styles.startTitle}>Début</Text>
              <Text style={styles.textWeight}>{startWeight} kg</Text>
              <Text style={styles.text}>{startDate}</Text>
            </View>
            <View style={styles.colunm}>
              <Text style={styles.startTitle}>Actuel</Text>
              <Progress.Circle
                progress={progressValue}
                animated={true}
                color="#A3FD01"
                unfilledColor="#0D0D36"
                borderWidth={0.2}
                size={100}
                showsText={false}
                strokeCap="round"
              />
              <View style={styles.textAbsolute}>
                <Text style={styles.textWeight}>{currentWeight} kg</Text>
              </View>
              <Text style={styles.text}>{currentDate}</Text>
            </View>
            <View style={styles.colunm}>
              <Text style={styles.startTitle}>
                Objectif{" "}
                {targetObjectif && targetObjectif === "Gain" ? (
                  <FontAwesome6
                    name={"arrow-trend-up"}
                    size={15}
                    color={"#3BC95F"}
                  />
                ) : (
                  targetObjectif &&
                  targetObjectif === "Loss" && (
                    <FontAwesome6
                      name={"arrow-trend-down"}
                      size={15}
                      color={"#3BC95F"}
                    />
                  )
                )}
              </Text>
              <Text style={styles.textWeight}>{targetWeight} kg</Text>
              <Text style={styles.text}>{targetDate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.progress}>
          <Text style={styles.text}>Progression</Text>
          <Progress.Bar
            progress={progressValue}
            width={120}
            animated={true}
            color="#A3FD01"
            unfilledColor="#0D0D36"
          />
          <Text style={styles.text}>{progressValuePourcent} %</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8}
            onPress={() => setModalVisibleWeight(!modalVisibleWeight)}
          >
            <Text style={styles.buttonText}>Ajouter mon poids</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8}
            onPress={() => setModalVisibleTarget(!modalVisibleTarget)}
          >
            <Text style={styles.buttonText}>Ajouter un objectif de poids</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.weightList}>
          <Text style={styles.weightListTitle}>Historique de Poids</Text>
          {sortedWeights.map((element, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 10,
              }}
            >
              <Text style={styles.text}>{element.weight} kg</Text>
              <Text style={styles.text}>
                {moment(element.date).format("Do MMM YYYY")}
              </Text>
            </View>
          ))}
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
          <ActivityIndicator size="large" color="#A3FD01" animating={true} />
        </View>
      )}
    </View>
  );
}
