import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../models/navigation";
import { styles } from "./HistoryScreen.styles";
import { useHistoryScreen } from "./useHistoryScreen";

type Props = NativeStackScreenProps<RootStackParamList, "history">;

export default function HistoryScreen({ navigation }: Props) {
  const {
    history,
    uniqueWorkoutNames,
    sessionCounts,
    navigateToStats,
    navigateToWorkout,
  } = useHistoryScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={navigateToStats}
          accessibilityLabel="Permet de revenir a la page Statistiques"
          accessibilityHint="On va se diriger vers la page Statistiques"
        >
          <FontAwesome name={"chevron-left"} size={18} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <Text style={styles.topTitle}>Suivi de séance</Text>
          {history.length > 0 && (
            <View style={styles.totalBadge}>
              <Text style={styles.totalBadgeText}>{history.length}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>
          {history.length === 0
            ? "Aucune séance enregistrée"
            : `${history.length} séance${history.length > 1 ? "s" : ""} au total`}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {history.length === 0 ? (
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={22}
              color={COLORS.primary}
              style={styles.infoIcon}
              accessibilityLabel="Information pour avoir l'historique des séances"
            />
            <Text style={styles.textInfo}>
              Lancez une séance pour commencer votre suivi personnalisé !
            </Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.featuredCard}
              onPress={() => navigateToWorkout("Toutes les séances")}
              activeOpacity={0.8}
              accessibilityLabel="Permet de voir l'historique de toutes les séances"
              accessibilityHint="On va arriver sur la page de l'historique de toutes les séances"
            >
              <View style={styles.featuredAccentBar} />
              <View style={styles.featuredContent}>
                <View style={styles.featuredLeft}>
                  <FontAwesome name={"history"} size={15} color={COLORS.accent} />
                  <Text style={styles.featuredText}>Toutes les séances</Text>
                </View>
                <View style={styles.featuredRight}>
                  <View style={styles.featuredCountBadge}>
                    <Text style={styles.featuredCountText}>{history.length}</Text>
                  </View>
                  <FontAwesome name={"chevron-right"} size={13} color={COLORS.accent} />
                </View>
              </View>
            </TouchableOpacity>

            {uniqueWorkoutNames.length > 0 && (
              <Text style={styles.sectionLabel}>Par programme</Text>
            )}

            {uniqueWorkoutNames.map((name, i) => (
              <TouchableOpacity
                key={i}
                style={styles.card}
                onPress={() => navigateToWorkout(name)}
                activeOpacity={0.7}
                accessibilityLabel={`Permet de voir l'historique de ${name}`}
              >
                <View style={styles.cardLeft}>
                  <View style={styles.cardDot} />
                  <Text style={styles.cardText} numberOfLines={1}>{name}</Text>
                </View>
                <View style={styles.cardRight}>
                  <View style={styles.countPill}>
                    <Text style={styles.countPillText}>{sessionCounts[name] ?? 0}</Text>
                  </View>
                  <FontAwesome name={"chevron-right"} size={13} color={COLORS.textSecondary} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
