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
import Button from "../../../../components/Button";
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
                size={30}
                color={"white"}
                onPress={onClose}
                style={styles.infoIcon}
              />
            </View>
            <View style={styles.infoContainer}>
              <FontAwesome
                name={"info-circle"}
                size={25}
                color={COLORS.primary}
                style={styles.infoIcon}
              />
              <Text style={styles.textInfo}>
                Définissez un objectif de poids et une date pour mieux suivre
                votre progression
              </Text>
            </View>
          </View>
          <View style={styles.bottomModal}>
            <TextInput
              style={styles.input}
              placeholder={`Ton poids de départ`}
              keyboardType="numeric"
              onChangeText={onChangeInitialWeight}
              value={initialWeightInput}
            />
            <TextInput
              style={styles.input}
              placeholder="Ton objectif de poids"
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
                        : "#D3D3D3",
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
                        : "#D3D3D3",
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
            <Button
              textButton="Valider"
              textColor={COLORS.primary}
              width={180}
              height={40}
              background="#272D34"
              borderWidth={1}
              borderColor={COLORS.primary}
              onPress={onAddTarget}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
