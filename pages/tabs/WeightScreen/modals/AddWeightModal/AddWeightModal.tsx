import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../../../../../constants/theme';
import { styles } from './AddWeightModal.styles';

interface Props {
  visible: boolean;
  onClose: () => void;
  weight: string | null;
  onChangeWeight: (value: string) => void;
  error: boolean;
  errorMessage: string;
  onAddWeight: () => void;
}

export default function AddWeightModal({
  visible,
  onClose,
  weight,
  onChangeWeight,
  error,
  errorMessage,
  onAddWeight,
}: Props) {
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
        <View style={styles.modalView}>
          <View style={styles.topModal}>
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
              <Text style={styles.textInfo}>
                Ajoutez votre poids pour le voir s'afficher sur le graphique et
                suivre votre progression.
              </Text>
            </View>
          </View>
          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder="Ton poids (ex: 75.5)"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              onChangeText={onChangeWeight}
              value={weight ?? ''}
            />
            {error && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={onAddWeight}
            >
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
