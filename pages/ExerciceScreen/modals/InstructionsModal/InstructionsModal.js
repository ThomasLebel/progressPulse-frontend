import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Underline from "../../../../components/Underline";
import { COLORS } from "../../../../constants/theme";
import { styles } from "./InstructionsModal.styles";

export default function InstructionsModal({
  visible,
  onClose,
  exerciseName,
  descriptionSentences,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.crossContainer}>
            <FontAwesome
              name={"times"}
              size={24}
              color={COLORS.textSecondary}
              onPress={onClose}
              accessibilityLabel="Permet de fermer la modale"
            />
          </View>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>{exerciseName}</Text>
            <Underline width={80} />
          </View>
          <View style={styles.descriptionContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {descriptionSentences.map((sentence, i) => (
                <Text style={styles.sentence} key={i}>
                  {i + 1} - {sentence}
                </Text>
              ))}
            </ScrollView>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onClose}
            accessibilityLabel="Permet de fermer la modale"
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
