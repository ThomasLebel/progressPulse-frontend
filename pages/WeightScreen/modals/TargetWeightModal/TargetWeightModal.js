import moment from "moment";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from "../../../../constants/theme";
import { styles } from "./TargetWeightModal.styles";

export default function TargetWeightModal({
  visible,
  onClose,
  initialWeightInput,
  onChangeInitialWeight,
  weightTarget,
  onChangeWeightTarget,
  date,
  isDatePickerVisible,
  onShowDatePicker,
  onHideDatePicker,
  onConfirmDate,
  isCheckedLoss,
  isCheckedGain,
  onCheckbox,
  error,
  errorMessage,
  onAddTarget,
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
        <View style={styles.modalView}>
          <View style={styles.topModal}>
            <View style={styles.crossContainer}>
              <FontAwesome
                name={"times"}
                size={24}
                color={COLORS.textSecondary}
                onPress={onClose}
              />
            </View>
            <View style={styles.infoContainer}>
              <FontAwesome
                name={"info-circle"}
                size={18}
                color={COLORS.primary}
                style={styles.infoIcon}
              />
              <Text style={styles.textInfo}>
                Définissez un objectif de poids et une date pour mieux suivre
                votre progression.
              </Text>
            </View>
          </View>

          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder="Ton poids de départ (ex: 80)"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              onChangeText={onChangeInitialWeight}
              value={initialWeightInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Ton objectif de poids (ex: 72)"
              placeholderTextColor={COLORS.textSecondary}
              keyboardType="numeric"
              onChangeText={onChangeWeightTarget}
              value={weightTarget}
            />
            <TouchableOpacity
              style={styles.dateButton}
              onPress={onShowDatePicker}
            >
              <Text style={styles.dateText}>
                {date
                  ? moment(date).format("DD/MM/YYYY")
                  : moment(new Date()).format("DD/MM/YYYY")}
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={onConfirmDate}
                buttonTextColorIOS="black"
                onCancel={onHideDatePicker}
                minimumDate={new Date()}
              />
            </TouchableOpacity>

            <View style={styles.checkboxWrapper}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: isCheckedLoss
                        ? COLORS.primary
                        : "transparent",
                    },
                  ]}
                  onPress={() => onCheckbox("Loss")}
                >
                  {isCheckedLoss && <View style={styles.checkmark} />}
                </TouchableOpacity>
                <Text style={styles.text}>Objectif perte de poids</Text>
              </View>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: isCheckedGain
                        ? COLORS.primary
                        : "transparent",
                    },
                  ]}
                  onPress={() => onCheckbox("Gain")}
                >
                  {isCheckedGain && <View style={styles.checkmark} />}
                </TouchableOpacity>
                <Text style={styles.text}>Objectif gain de poids</Text>
              </View>
            </View>

            {error && <Text style={styles.errorText}>{errorMessage}</Text>}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={onAddTarget}
            >
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
