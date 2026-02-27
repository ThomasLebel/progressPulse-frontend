import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { login } from '../../reducers/user';
import { addAllUserWorkouts } from '../../reducers/workouts';
import { addAllWorkoutsHistory } from '../../reducers/workoutsHistory';
import { RootStackParamList } from '../../models/navigation';
import { signinUser, fetchUserWorkouts, fetchUserHistory } from './signin.api';
import { isEmailValid } from './signin.service';

type SigninNavigation = NativeStackNavigationProp<RootStackParamList, 'Signin'>;

export function useSigninScreen(navigation: SigninNavigation) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.token) {
      navigation.navigate('TabNavigator', { screen: 'Home' });
    }
  }, []);

  const handleSignin = async () => {
    if (!email || !password) {
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

    const signinData = await signinUser(email, password);
    if (!signinData.result) {
      setSignupError(signinData.error ?? null);
      setIsLoading(false);
      return;
    }

    const userToken = signinData.userInfos!.token;
    dispatch(login(signinData.userInfos!));

    const workoutsData = await fetchUserWorkouts(userToken);
    if (workoutsData.userWorkouts) {
      dispatch(addAllUserWorkouts(workoutsData.userWorkouts));
    }

    const historiesData = await fetchUserHistory(userToken);
    dispatch(addAllWorkoutsHistory(historiesData.histories));

    navigation.navigate('TabNavigator', { screen: 'Home' });
    setIsLoading(false);
  };

  const handleGoToPasswordForgotten = () => {
    navigation.navigate('passwordForgotten');
  };

  const handleGoToSignup = () => {
    navigation.navigate('Signup');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    wrongEmail,
    emptyFields,
    signupError,
    isLoading,
    handleSignin,
    handleGoToPasswordForgotten,
    handleGoToSignup,
  };
}
