import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";
import { styles } from "./AllExercisesScreen.styles";
import { useAllExercisesScreen } from "./useAllExercisesScreen";

const RANK_COLORS = [COLORS.rankGold, COLORS.rankSilver, COLORS.rankBronze];

function getRankColor(index) {
  return index < 3 ? RANK_COLORS[index] : COLORS.textSecondary;
}

export default function AllExercisesScreen({ navigation, route }) {
  const { exercises, title, maxCount, handlePress } = useAllExercisesScreen(
    navigation,
    route
  );

  const renderItem = ({ item, index }) => {
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
            <Text style={styles.itemName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.countPill}>
              <Text style={styles.countText}>×{item.count}</Text>
            </View>
          </View>
          {item.muscleGroupe ? (
            <Text style={styles.itemMuscle}>{item.muscleGroupe}</Text>
          ) : null}
          <View style={styles.barBg}>
            <View
              style={[
                styles.barFill,
                {
                  width: barWidth,
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
      data={exercises}
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
          <Text style={styles.title}>{title}</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>
          Aucun exercice enregistré pour cette période.
        </Text>
      }
    />
  );
}
