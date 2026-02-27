import { FontAwesome6 } from '@expo/vector-icons';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../../constants/theme';
import { styles } from './TitleModal.styles';

interface WorkoutIcon {
  name: string;
}

const WORKOUT_ICONS: WorkoutIcon[] = [
  { name: 'dumbbell' },
  { name: 'fire' },
  { name: 'bolt' },
  { name: 'rocket' },
  { name: 'bomb' },
  { name: 'heart' },
  { name: 'heart-circle-bolt' },
  { name: 'explosion' },
  { name: 'weight-hanging' },
  { name: 'trophy' },
  { name: 'medal' },
  { name: 'crown' },
  { name: 'star' },
  { name: 'shield' },
  { name: 'stopwatch' },
  { name: 'hand-fist' },
  { name: 'crosshairs' },
  { name: 'bolt-lightning' },
  { name: 'brain' },
  { name: 'gem' },
  { name: 'flask' },
  { name: 'skull' },
];

interface TitleModalProps {
  visible: boolean;
  onClose: () => void;
  workoutNameInput: string;
  onChangeWorkoutName: (value: string) => void;
  selectedIcon: string;
  onSelectIcon: (iconName: string) => void;
  emptyFields: boolean;
  iconError: boolean;
  onChangeName: () => void;
}

export default function TitleModal({
  visible,
  onClose,
  workoutNameInput,
  onChangeWorkoutName,
  selectedIcon,
  onSelectIcon,
  emptyFields,
  iconError,
  onChangeName,
}: TitleModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalTitleView}>
          <View style={styles.crossContainer}>
            <FontAwesome
              name={'times'}
              size={24}
              color={COLORS.textSecondary}
              onPress={onClose}
            />
          </View>
          <View style={styles.infoContainer}>
            <FontAwesome
              name={'info-circle'}
              size={18}
              color={COLORS.primary}
              style={styles.infoIcon}
            />
            <Text style={styles.textInfo}>Modifie ta séance</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={styles.inputText}>Renomme ta séance</Text>
            <TextInput
              style={styles.input}
              placeholder="Saisis un nom"
              placeholderTextColor={COLORS.textSecondary}
              onChangeText={onChangeWorkoutName}
              value={workoutNameInput}
            />
          </View>

          <View style={styles.iconPickerSection}>
            <Text style={styles.iconPickerTitle}>Choisis un logo pour ta séance</Text>
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
                    style={[styles.iconItem, isSelected && styles.iconItemSelected]}
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

          {iconError && (
            <Text style={styles.errorMessage}>
              Veuillez choisir un logo pour ta séance
            </Text>
          )}
          {emptyFields && (
            <Text style={styles.errorMessage}>
              Veuillez changer le nom de la séance ou le logo pour mettre à jour
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onChangeName}
          >
            <Text style={styles.buttonText}>Enregistrer les modifications</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
