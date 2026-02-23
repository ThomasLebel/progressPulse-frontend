import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";

export default function AllExercisesScreen({ navigation, route }) {
  const exercises = route.params?.exercises ?? [];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("exerciseStats", { exerciseName: item.name })
      }
    >
      <View style={styles.itemLeft}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.muscleGroupe ? (
          <Text style={styles.itemMuscle}>{item.muscleGroupe}</Text>
        ) : null}
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemCount}>×{item.count}</Text>
        <FontAwesome name="chevron-right" size={12} color={COLORS.accent} />
      </View>
    </TouchableOpacity>
  );

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
          <Text style={styles.title}>Tous les exercices</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  item: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accentBorder,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  itemMuscle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textTransform: "capitalize",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemCount: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.accent,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 40,
  },
});
