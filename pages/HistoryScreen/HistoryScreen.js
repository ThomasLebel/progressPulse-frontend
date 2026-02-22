import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../constants/theme";
import { styles } from "./HistoryScreen.styles";
import { useHistoryScreen } from "./useHistoryScreen";

export default function HistoryScreen({ navigation }) {
  const { history, uniqueWorkoutNames, navigateToStats, navigateToWorkout } =
    useHistoryScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={navigateToStats}
          accessibilityLabel={`Permet de revenir a la page Statistiques`}
          accessibilityHint="On va se diriger vers la page Statistiques"
        >
          <FontAwesome name={"chevron-left"} size={24} color={COLORS.primary} />
          <Text style={styles.backToText}>Statisques</Text>
        </TouchableOpacity>
        <Text style={styles.topTitle}>Suivi de séance</Text>
      </View>
      <ScrollView style={styles.weightContainer}>
        {history.length === 0 ? (
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={30}
              color={COLORS.primary}
              style={styles.infoIcon}
              accessibilityLabel={`Donne une information pour avoir l'historique des séances`}
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
              accessibilityLabel={`Permet de voir l'historique de toutes les séances`}
              accessibilityHint="On va arriver sur la page de l'historique de toutes les séances"
            >
              <Text style={styles.text}>Toutes les séances</Text>
              <FontAwesome
                name={"arrow-right"}
                size={15}
                color={COLORS.primary}
                style={{ position: "absolute", right: 15, top: 10 }}
                accessibilityLabel={`Permet de voir l'historique de toute les séances`}
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
                  name={"arrow-right"}
                  size={15}
                  color={COLORS.primary}
                  style={{ position: "absolute", right: 15, top: 10 }}
                  accessibilityLabel={`Permet de voir l'historique de ${name}`}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
