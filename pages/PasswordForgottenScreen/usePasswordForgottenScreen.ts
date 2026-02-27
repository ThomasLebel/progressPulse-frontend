import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../models/navigation';
import {
  sendForgotPasswordEmail,
  verifyResetToken,
  changeForgottenPassword,
} from './passwordForgotten.api';
import { isEmailValid } from './passwordForgotten.service';

type PasswordForgottenNavigation = NativeStackNavigationProp<
  RootStackParamList,
  'passwordForgotten'
>;

export function usePasswordForgottenScreen(
  navigation: PasswordForgottenNavigation,
) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [validEmail, setValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [codeMail, setCodeMail] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [errorToken, setErrorToken] = useState(false);
  const [noMatchPassword, setNoMatchPassword] = useState(false);
  const [isDoneVisible, setIsDoneVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const showSub = Keyboard.addListener(showEvent, () =>
      setIsKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(hideEvent, () =>
      setIsKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleEmail = async () => {
    if (!email) {
      setWrongEmail(false);
      setEmptyFields(true);
      return;
    }
    setEmptyFields(false);
    if (!isEmailValid(email)) {
      setWrongEmail(true);
      return;
    }
    setWrongEmail(false);
    setIsLoading(true);

    const data = await sendForgotPasswordEmail(email);
    if (!data.result) {
      setSignupError(data.error ?? null);
      setIsLoading(false);
      return;
    }
    setValidEmail(false);
    setCodeMail(true);
    setIsLoading(false);
  };

  const handleCode = async () => {
    setIsLoading(true);
    const data = await verifyResetToken(email, code);
    if (data.result) {
      setErrorToken(false);
      setCodeMail(false);
      setNewPassword(true);
    } else {
      setErrorToken(true);
    }
    setIsLoading(false);
  };

  const handlePassword = async () => {
    if (password !== confirmPassword) {
      setNoMatchPassword(true);
      return;
    }
    setNoMatchPassword(false);
    setIsLoading(true);
    await changeForgottenPassword(email, code, password);
    setNewPassword(false);
    setIsDoneVisible(true);
    setIsLoading(false);
  };

  const handleGoToSignin = () => {
    navigation.navigate('Signin');
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    wrongEmail,
    emptyFields,
    signupError,
    validEmail,
    isLoading,
    codeMail,
    newPassword,
    errorToken,
    noMatchPassword,
    isDoneVisible,
    handleEmail,
    handleCode,
    handlePassword,
    handleGoToSignin,
    isKeyboardVisible,
  };
}
