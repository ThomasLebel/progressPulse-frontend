import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../../../reducers/user';
import { RootStackParamList } from '../../../models/navigation';
import { signupUser } from './signup.api';
import { isEmailValid } from './signup.service';

type SignupNavigation = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

export function useSignupScreen(navigation: SignupNavigation) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !username || !password) {
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

    const data = await signupUser(username, email, password);
    if (!data.result) {
      setSignupError(data.error ?? null);
      setIsLoading(false);
      return;
    }

    dispatch(login(data.userInfos!));
    navigation.navigate('TabNavigator', { screen: 'Home' });
    setIsLoading(false);
  };

  const handleGoToSignin = () => {
    navigation.navigate('Signin');
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    wrongEmail,
    emptyFields,
    signupError,
    isLoading,
    handleSignup,
    handleGoToSignin,
  };
}
