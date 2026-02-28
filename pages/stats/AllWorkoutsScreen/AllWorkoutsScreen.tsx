import { DimensionValue, FlatList, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS } from "../../../constants/theme";
import { RootStackParamList } from "../../../models/navigation";
import { styles } from "./AllWorkoutsScreen.styles";
import { useAllWorkoutsScreen, WorkoutItem } from "./useAllWorkoutsScreen";

const RANK_COLORS = [COLORS.rankGold, COLORS.rankSilver, COLORS.rankBronze];

function getRankColor(index: number): string {
  return index < 3 ? RANK_COLORS[index] : COLORS.textSecondary;
}

type Props = NativeStackScreenProps<RootStackParamList, "allWorkouts">;

export default function AllWorkoutsScreen({ navigation, route }: Props) {
  const { workouts, maxCount, handlePress } = useAllWorkoutsScreen(
    navigation,
    route,
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: WorkoutItem;
    index: number;
  }) => {
    const rankColor = getRankColor(index);
    const isPodium = index < 3;
    const barWidth =
      maxCount > 0 ? `${Math.round((item.count / maxCount) * 100)}%` : "0%";

    return (
      <TouchableOpacity
        style={styles.item}
        activeOpacity={0.7}
        onPress={() => handlePress(item)}
      >
        <View
          style={[styles.rankBadge, isPodium && { borderColor: rankColor }]}
        >
          <Text style={[styles.rankNumber, { color: rankColor }]}>
            {index + 1}
          </Text>
        </View>

        <View style={styles.itemContent}>
          <View style={styles.itemTopRow}>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>×{item.count}</Text>
            </View>
          </View>
          <View style={styles.barBg}>
            <View
              style={[
                styles.barFill,
                {
                  width: barWidth as DimensionValue,
                  backgroundColor: isPodium ? rankColor : COLORS.primary,
                },
              ]}
            />
          </View>
        </View>

        <FontAwesome
          name="chevron-right"
          size={12}
          color={COLORS.accent}
          style={styles.chevron}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 120 }}
      showsVerticalScrollIndicator={false}
      data={workouts}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      ListHeaderComponent={
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome name="chevron-left" size={16} color={COLORS.accent} />
          </TouchableOpacity>
          <Text style={styles.title}>Toutes les séances</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>Aucune séance enregistrée.</Text>
      }
    />
  );
}
