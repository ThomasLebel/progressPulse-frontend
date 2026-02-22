import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateEmail, updateUsername, logout } from "../../reducers/user";
import { removeAllWorkout } from "../../reducers/workouts";
import { resetWorkoutsHistory } from "../../reducers/workoutsHistory";
import { validateEmail } from "./settings.service";

export function useSettingsScreen(navigation) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalUsernameVisible, setModalUsernameVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const changeEmail = () => {
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      setError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Adresse email non valide");
      setError(true);
      return;
    }
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeEmail`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password, token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setError(true);
          setErrorMessage(data.error);
        } else {
          dispatch(updateEmail(data.newEmail));
          closeModal("email");
        }
      });
  };

  const changePassword = () => {
    if (!email || !password || !newPassword) {
      setErrorMessage("Veuillez remplir tous les champs");
      setError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Adresse email non valide");
      setError(true);
      return;
    }
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/changePassword`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password, token: user.token, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setError(true);
          setErrorMessage(data.error);
        } else {
          closeModal("password");
        }
      });
  };

  const changeUsername = () => {
    if (!email || !password || !username) {
      setErrorMessage("Veuillez remplir tous les champs");
      setError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Adresse email non valide");
      setError(true);
      return;
    }
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeUsername`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password, token: user.token, username }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setError(true);
          setErrorMessage(data.error);
        } else {
          dispatch(updateUsername(data.newUsername));
          closeModal("username");
        }
      });
  };

  const closeModal = (modal) => {
    setError(false);
    setErrorMessage("");
    setPassword("");
    setEmail("");
    if (modal === "email") {
      setModalEmailVisible(false);
    } else if (modal === "password") {
      setModalPasswordVisible(false);
      setNewPassword("");
    } else if (modal === "username") {
      setModalUsernameVisible(false);
      setUsername("");
    }
  };

  const handleLogout = () => {
    dispatch(removeAllWorkout());
    dispatch(resetWorkoutsHistory());
    dispatch(logout());
    navigation.navigate("Signin");
  };

  const handleGoToSong = () => {
    navigation.navigate("song");
  };

  return {
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
  };
}
