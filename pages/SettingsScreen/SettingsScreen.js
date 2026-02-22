import { Text, View, TouchableOpacity } from "react-native";
import Underline from "../../components/Underline";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import ChangeEmailModal from "./modals/ChangeEmailModal";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import ChangeUsernameModal from "./modals/ChangeUsernameModal";
import { useSettingsScreen } from "./useSettingsScreen";
import { styles } from "./SettingsScreen.styles";

export default function SettingsScreen({ navigation }) {
  const {
    user,
    email,
    setEmail,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    username,
    setUsername,
    modalEmailVisible,
    setModalEmailVisible,
    modalPasswordVisible,
    setModalPasswordVisible,
    modalUsernameVisible,
    setModalUsernameVisible,
    error,
    errorMessage,
    changeEmail,
    changePassword,
    changeUsername,
    closeModal,
    handleLogout,
    handleGoToSong,
  } = useSettingsScreen(navigation);

  return (
    <View style={styles.container}>
      <ChangeEmailModal
        visible={modalEmailVisible}
        onClose={() => closeModal("email")}
        onSubmit={changeEmail}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        errorMessage={errorMessage}
      />

      <ChangePasswordModal
        visible={modalPasswordVisible}
        onClose={() => closeModal("password")}
        onSubmit={changePassword}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        error={error}
        errorMessage={errorMessage}
      />

      <ChangeUsernameModal
        visible={modalUsernameVisible}
        onClose={() => closeModal("username")}
        onSubmit={changeUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        error={error}
        errorMessage={errorMessage}
      />

      <Text style={styles.title}>Réglages</Text>
      <Underline width={100} />

      <View style={styles.settingWrapper}>
        <View style={styles.settingContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={() => setModalEmailVisible(true)}
              accessibilityLabel="Permet d'afficher la modale pour changer son mail"
              accessibilityHint="Une modale va s'ouvrir où vous pourrez changer votre mail"
            >
              <FontAwesome
                name={"envelope"}
                size={20}
                color={"#A3FD01"}
                style={styles.infoIcon}
              />
              <Text style={styles.text}>{user.email}</Text>
              <FontAwesome
                name={"pencil"}
                size={15}
                color={"white"}
                style={{ position: "absolute", right: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={() => setModalPasswordVisible(true)}
              accessibilityLabel="Permet d'afficher la modale pour changer son mot de passe"
              accessibilityHint="Une modale va s'ouvrir où vous pourrez changer votre mot de passe"
            >
              <FontAwesome
                name={"lock"}
                size={25}
                color={"#A3FD01"}
                style={styles.infoIcon}
              />
              <Text style={styles.text}>*********</Text>
              <FontAwesome
                name={"pencil"}
                size={15}
                color={"white"}
                style={{ position: "absolute", right: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={() => setModalUsernameVisible(true)}
              accessibilityLabel="Permet d'afficher la modale pour changer son nom"
              accessibilityHint="Une modale va s'ouvrir où vous pourrez changer votre nom"
            >
              <FontAwesome
                name={"user"}
                size={25}
                color={"#A3FD01"}
                style={styles.infoIcon}
              />
              <Text style={styles.text}>{user.username}</Text>
              <FontAwesome
                name={"pencil"}
                size={15}
                color={"white"}
                style={{ position: "absolute", right: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={handleGoToSong}
              accessibilityLabel="Permet d'aller sur la page Son"
              accessibilityHint="Vous allez être rediriger vers la page Son pour changer le son du minuteur"
            >
              <FontAwesome
                name={"music"}
                size={23}
                color={"#A3FD01"}
                style={styles.infoIcon}
              />
              <Text style={styles.text}>{user.sound}</Text>
              <FontAwesome
                name={"arrow-right"}
                size={15}
                color={"white"}
                style={{ position: "absolute", right: 10 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.inputContainer}
              activeOpacity={0.7}
              onPress={handleLogout}
              accessibilityLabel="Permet de se déconnecter"
              accessibilityHint="Vous allez être rediriger vers la page de connexion"
            >
              <FontAwesome6
                name={"right-to-bracket"}
                size={20}
                color={"#A3FD01"}
                style={styles.infoIcon}
              />
              <Text style={styles.text}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
