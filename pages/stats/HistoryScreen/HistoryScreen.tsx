import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Underline from "../../../components/Underline";
import { COLORS } from "../../../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../models/navigation";
import { styles } from "./HistoryScreen.styles";
import { useHistoryScreen } from "./useHistoryScreen";

type Props = NativeStackScreenProps<RootStackParamList, "history">;

export default function HistoryScreen({ navigation }: Props) {
  const { history, uniqueWorkoutNames, navigateToStats, navigateToWorkout } =
    useHistoryScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={navigateToStats}
          accessibilityLabel="Permet de revenir a la page Statistiques"
          accessibilityHint="On va se diriger vers la page Statistiques"
        >
          <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.topTitle}>Suivi de séance</Text>
        <Underline width={120} />
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
              accessibilityLabel="Donne une information pour avoir l'historique des séances"
            />
            <Text style={styles.textInfo}>
              Lancez une séance pour commencer votre suivi personnalisé !
            </Text>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigateToWorkout("Toutes les séances")}
              activeOpacity={0.7}
              accessibilityLabel="Permet de voir l'historique de toutes les séances"
              accessibilityHint="On va arriver sur la page de l'historique de toutes les séances"
            >
              <Text style={styles.text}>Toutes les séances</Text>
              <FontAwesome
                name={"chevron-right"}
                size={16}
                color={COLORS.accent}
              />
            </TouchableOpacity>

            {uniqueWorkoutNames.map((name, i) => (
              <TouchableOpacity
                key={i}
                style={styles.card}
                onPress={() => navigateToWorkout(name)}
                activeOpacity={0.7}
                accessibilityLabel={`Permet de voir l'historique de ${name}`}
              >
                <Text style={styles.text}>{name}</Text>
                <FontAwesome
                  name={"chevron-right"}
                  size={16}
                  color={COLORS.accent}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
