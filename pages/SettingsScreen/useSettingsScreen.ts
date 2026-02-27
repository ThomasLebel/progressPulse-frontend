import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { logout, updateEmail, updateUsername } from '../../reducers/user';
import { removeAllWorkout } from '../../reducers/workouts';
import { resetWorkoutsHistory } from '../../reducers/workoutsHistory';
import { RootStackParamList } from '../../models/navigation';
import { RootState } from '../../reducers/store.types';
import {
  apiChangeEmail,
  apiChangePassword,
  apiChangeUsername,
} from './settingsScreen.api';
import { validateEmail } from './settings.service';

export function useSettingsScreen(navigation: NativeStackNavigationProp<RootStackParamList>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);
  const [modalUsernameVisible, setModalUsernameVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  const changeEmail = async () => {
    if (!email || !password) {
      setErrorMessage('Veuillez remplir tous les champs');
      setError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Adresse email non valide');
      setError(true);
      return;
    }
    const data = await apiChangeEmail(email, password, user.token);
    if (data.result === false) {
      setError(true);
      setErrorMessage(data.error ?? '');
    } else {
      dispatch(updateEmail(data.newEmail));
      closeModal('email');
    }
  };

  const changePassword = async () => {
    if (!email || !password || !newPassword) {
      setErrorMessage('Veuillez remplir tous les champs');
      setError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Adresse email non valide');
      setError(true);
      return;
    }
    const data = await apiChangePassword(email, password, newPassword, user.token);
    if (data.result === false) {
      setError(true);
      setErrorMessage(data.error ?? '');
    } else {
      closeModal('password');
    }
  };

  const changeUsername = async () => {
    if (!email || !password || !username) {
      setErrorMessage('Veuillez remplir tous les champs');
      setError(true);
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Adresse email non valide');
      setError(true);
      return;
    }
    const data = await apiChangeUsername(email, password, username, user.token);
    if (data.result === false) {
      setError(true);
      setErrorMessage(data.error ?? '');
    } else {
      dispatch(updateUsername(data.newUsername));
      closeModal('username');
    }
  };

  const closeModal = (modal: 'email' | 'password' | 'username') => {
    setError(false);
    setErrorMessage('');
    setPassword('');
    setEmail('');
    if (modal === 'email') {
      setModalEmailVisible(false);
    } else if (modal === 'password') {
      setModalPasswordVisible(false);
      setNewPassword('');
    } else if (modal === 'username') {
      setModalUsernameVisible(false);
      setUsername('');
    }
  };

  const handleLogout = () => {
    dispatch(removeAllWorkout());
    dispatch(resetWorkoutsHistory());
    dispatch(logout(undefined));
    navigation.navigate('Signin');
  };

  const handleGoToSong = () => {
    navigation.navigate('song');
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
