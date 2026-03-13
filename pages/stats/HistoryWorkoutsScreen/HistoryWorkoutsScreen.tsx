import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HystoryWorkouts from "../../../components/HystoryWorkout";
import { COLORS } from "../../../constants/theme";
import { RootStackParamList } from "../../../models/navigation";
import { styles } from "./HistoryWorkoutsScreen.styles";
import {
  buildStarArray,
  formatCardioLabel,
  formatDate,
} from "./historyWorkoutsScreen.service";
import { useHistoryWorkoutsScreen } from "./useHistoryWorkoutsScreen";

type Props = NativeStackScreenProps<RootStackParamList, "historyWorkout">;

export default function HistoryWorkoutsScreen({ navigation, route }: Props) {
  const {
    workoutName,
    sortedWorkouts,
    totalCount,
    navigateBack,
    selectedPeriod,
    PERIODS,
    dropdownOpen,
    setDropdownOpen,
    handleSetPeriod,
  } = useHistoryWorkoutsScreen(navigation, route);

  const hystories = sortedWorkouts.map((element, i) => {
    const date = formatDate(element.date);
    const sessionNumber = sortedWorkouts.length - i;

    const stars = buildStarArray(element.note).map((index) => (
      <FontAwesome
        key={index}
        name={"star"}
        size={13}
        color={COLORS.accent}
        accessibilityLabel="Étoile de notation"
      />
    ));

    const groupedWorkouts = element.performances.map((performance, j) => {
      if (typeof performance.exercise === "string") return null;
      const muscleGroupe = performance.exercise.muscleGroupe;
      const name = performance.exercise.name;
      return (
        <View key={j} style={styles.exerciseBlock}>
          <Text style={styles.exerciseName}>{name}</Text>
          <View style={styles.setsRow}>
            {performance.sets.map((set, k) =>
              muscleGroupe !== "Cardio" ? (
                <View key={k} style={styles.setChip}>
                  <Text style={styles.setChipLabel}>S{k + 1}</Text>
                  <Text style={styles.setChipValue}>
                    {set.reps}×{set.weight}kg
                  </Text>
                </View>
              ) : (
                <View key={k} style={styles.setChipCardio}>
                  <Text style={styles.setChipCardioText}>
                    {formatCardioLabel(set)}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>
      );
    });

    return (
      <HystoryWorkouts
        key={i}
        name={element.workoutName}
        date={date}
        stars={stars}
        ressenti={element.ressenti}
        workouts={groupedWorkouts}
        sessionNumber={sessionNumber}
        accessibilityLabel="Affiche les détails de notre séance"
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={navigateBack}
          accessibilityLabel="Retourner sur la page historique"
          accessibilityHint="On va retourner sur la page suivi de séance"
        >
          <FontAwesome name={"chevron-left"} size={18} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.topTitle} numberOfLines={2}>
              {workoutName}
            </Text>
            {totalCount > 0 && (
              <Text style={styles.subtitle}>
                {sortedWorkouts.length === totalCount
                  ? `${totalCount} séance${totalCount > 1 ? "s" : ""}`
                  : `${sortedWorkouts.length} séance${sortedWorkouts.length > 1 ? "s" : ""}`}
              </Text>
            )}
          </View>

          {/* Sélecteur de période — identique à ProgressStatsScreen */}
          <View style={styles.filterWrapper}>
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
                    onPress={() => handleSetPeriod(period.key)}
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedWorkouts.length === 0 && totalCount > 0 ? (
          <View style={styles.emptyPeriod}>
            <FontAwesome
              name="calendar-times-o"
              size={22}
              color={COLORS.primary}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyText}>
              Aucune séance sur cette période.
            </Text>
          </View>
        ) : (
          hystories
        )}
      </ScrollView>
    </View>
  );
}
