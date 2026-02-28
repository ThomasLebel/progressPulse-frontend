import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Loader from "../../components/Loader";
import { COLORS } from "../../constants/theme";
import { RootStackParamList } from "../../models/navigation";
import { styles } from "./SongScreen.styles";
import { useSongScreen } from "./useSongScreen";

type Props = NativeStackScreenProps<RootStackParamList, "song">;

export default function SongScreen({ navigation }: Props) {
  const {
    soundChoice,
    isLoading,
    soundNames,
    validateSoundAndNavigate,
    handleChangeSound,
  } = useSongScreen(navigation);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backToContainer}
          onPress={validateSoundAndNavigate}
          accessibilityLabel="Permet de retourner sur la page Réglages"
          accessibilityHint="Vous allez être redirigé vers la page Réglages"
        >
          <FontAwesome name={"chevron-left"} size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.topTitle}>Son</Text>
      </View>

      <View style={styles.settingWrapper}>
        <View style={styles.settingContainer}>
          <View style={styles.songWrapper}>
            {soundNames.map((name) => (
              <TouchableOpacity
                key={name}
                style={styles.songContainer}
                activeOpacity={0.7}
                onPress={() => handleChangeSound(name)}
                accessibilityLabel={`Sonnerie ${name}`}
                accessibilityHint={`Vous avez choisi ${name} comme sonnerie`}
              >
                <Text style={styles.text}>{name}</Text>
                {soundChoice === name && (
                  <FontAwesome
                    name={"check"}
                    size={20}
                    color={COLORS.primary}
                    style={styles.infoIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <FontAwesome
          name={"info-circle"}
          size={30}
          color={COLORS.primary}
          style={styles.infoIcon}
          accessibilityLabel="Affiche une information pour choisir la sonnerie de minuteur"
        />
        <Text style={styles.textInfo}>
          Choisis la sonnerie que tu souhaites entendre à la fin de chaque
          exercice
        </Text>
      </View>

      {isLoading && (
        <View style={styles.backgroundLoading}>
          <Loader />
        </View>
      )}
    </View>
  );
}
