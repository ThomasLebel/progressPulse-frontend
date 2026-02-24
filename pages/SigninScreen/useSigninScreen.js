import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
import { addAllUserWorkouts } from "../../reducers/workouts";
import { addAllWorkoutsHistory } from "../../reducers/workoutsHistory";
import { isEmailValid } from "./signin.service";

export function useSigninScreen(navigation) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user.token) {
      navigation.navigate("TabNavigator", { screen: "Home" });
    }
  }, []);

  const handleSignin = () => {
    if (!email || !password) {
      setWrongEmail(false);
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      if (!isEmailValid(email)) {
        setWrongEmail(true);
      } else {
        setWrongEmail(false);
        setEmptyFields(false);
        const userCredentials = {
          email: email,
          password: password,
        };
        setIsLoading(true);
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userCredentials),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result === false) {
              setSignupError(data.error);
              setIsLoading(false);
            } else {
              const userToken = data.userInfos.token;
              dispatch(login(data.userInfos));
              fetch(
                `${process.env.EXPO_PUBLIC_SERVER_IP}/usersWorkouts/${data.userInfos.token}`,
              )
                .then((response) => response.json())
                .then((data) => {
                  if (data.userWorkouts) {
                    dispatch(addAllUserWorkouts(data.userWorkouts));
                  }
                  fetch(
                    `${process.env.EXPO_PUBLIC_SERVER_IP}/histories/${userToken}`,
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      dispatch(addAllWorkoutsHistory(data.histories));
                      navigation.navigate("TabNavigator", { screen: "Home" });
                      setIsLoading(false);
                    });
                });
            }
          });
      }
    }
  };

  const handleGoToPasswordForgotten = () => {
    navigation.navigate("passwordForgotten");
  };

  const handleGoToSignup = () => {
    navigation.navigate("Signup");
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
