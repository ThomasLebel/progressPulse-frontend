import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/user";
import { isEmailValid } from "./signup.service";

export function useSignupScreen(navigation) {
  const dispatch = useDispatch();
  const valeurDuReducer = useSelector((state) => state.user.value);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    if (!email || !username || !password) {
      setWrongEmail(false);
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      if (!isEmailValid(email)) {
        setWrongEmail(true);
      } else {
        setWrongEmail(false);
        setEmptyFields(false);
        const newUser = {
          username,
          email,
          password,
        };
        setIsLoading(true);
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result === false) {
              setSignupError(data.error);
              setIsLoading(false);
            } else {
              dispatch(login(data.userInfos));
              navigation.navigate("TabNavigator", { screen: "Home" });
              setIsLoading(false);
            }
          });
      }
    }
  };

  const handleGoToSignin = () => {
    navigation.navigate("Signin");
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
