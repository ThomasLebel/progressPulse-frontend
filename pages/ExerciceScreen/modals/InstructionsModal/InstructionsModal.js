import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Underline from "../../../../components/Underline";
import { styles } from "./InstructionsModal.styles";

export default function InstructionsModal({
  visible,
  onClose,
  exerciseName,
  descriptionSentences,
}) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.iconModal}>
          <FontAwesome
            name={"times"}
            size={30}
            color={"white"}
            onPress={onClose}
            accessibilityLabel="Permet de fermer la modale"
          />
        </View>
        <View style={styles.titleModal}>
          <Text style={styles.text}>{exerciseName}</Text>
          <Underline width={80} />
        </View>
        <View style={styles.descriptionContainer}>
          <ScrollView>
            {descriptionSentences.map((sentence, i) => (
              <Text style={styles.sentence} key={i}>
                {i + 1} - {sentence}
              </Text>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={onClose}
          accessibilityLabel="Permet de fermer la modale"
        >
          <Text style={styles.textButton}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
