import { FontAwesome6 } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../../constants/theme";
import { styles } from "./ModalTitle.styles";

const WORKOUT_ICONS = [
  { name: "dumbbell" },
  { name: "fire" },
  { name: "bolt" },
  { name: "rocket" },
  { name: "bomb" },
  { name: "heart" },
  { name: "heart-circle-bolt" },
  { name: "explosion" },

  { name: "weight-hanging" },
  { name: "trophy" },
  { name: "medal" },
  { name: "crown" },
  { name: "star" },
  { name: "shield" },
  { name: "stopwatch" },
  { name: "hand-fist" },
  { name: "crosshairs" },
  { name: "bolt-lightning" },
  { name: "brain" },
  { name: "gem" },
  { name: "flask" },
  { name: "skull" },
];

export default function ModalTitle({
  visible,
  onClose,
  workoutName,
  onChangeWorkoutName,
  selectedIcon,
  onSelectIcon,
  emptyFields,
  postError,
  onSubmit,
}) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modalTitleView}>
          <View style={styles.crossContainer}>
            <FontAwesome
              name={"times"}
              size={24}
              color={COLORS.textSecondary}
              onPress={onClose}
              accessibilityLabel="Fermer la modale"
            />
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              name={"info-circle"}
              size={18}
              color={COLORS.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>Nomme ta séance</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputText}>Nom de la séance</Text>
            <TextInput
              style={styles.input}
              placeholder="Saisis un nom"
              placeholderTextColor={COLORS.textSecondary}
              accessibilityLabel="Donner un nom à la séance"
              onChangeText={onChangeWorkoutName}
              value={workoutName}
            />
          </View>

          <View style={styles.iconPickerSection}>
            <Text style={styles.iconPickerTitle}>
              Choisis un logo pour ta séance
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.iconScrollContent}
            >
              {WORKOUT_ICONS.map((icon) => {
                const isSelected = selectedIcon === icon.name;
                return (
                  <TouchableOpacity
                    key={icon.name}
                    style={[
                      styles.iconItem,
                      isSelected && styles.iconItemSelected,
                    ]}
                    onPress={() => onSelectIcon(icon.name)}
                    activeOpacity={0.7}
                  >
                    <FontAwesome6
                      name={icon.name}
                      size={22}
                      color={isSelected ? COLORS.background : COLORS.accent}
                      solid
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez saisir un nom de séance
            </Text>
          )}
          {postError && (
            <Text style={styles.errorMessage}>
              Ce nom est déjà attribué à l'une de vos séances. Choisissez un
              autre nom
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onSubmit}
            accessibilityLabel="Valider le nom donné à la séance"
            accessibilityHint="Vous serez redirigé vers la page d'accueil après la validation."
          >
            <Text style={styles.buttonText}>Valider ma séance</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
