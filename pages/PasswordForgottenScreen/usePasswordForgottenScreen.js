import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { isEmailValid } from "./passwordForgotten.service";

export function usePasswordForgottenScreen(navigation) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [signupError, setSignupError] = useState(null);
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
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
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

  const handleEmail = () => {
    if (!email) {
      setWrongEmail(false);
      setEmptyFields(true);
    } else {
      setEmptyFields(false);
      if (!isEmailValid(email)) {
        setWrongEmail(true);
      } else {
        setWrongEmail(false);
        setEmptyFields(false);
        const user = { email };
        setIsLoading(true);
        fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/forgotPassword`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result === false) {
              setSignupError(data.error);
              setIsLoading(false);
            } else {
              setValidEmail(false);
              setCodeMail(true);
              setIsLoading(false);
            }
          });
      }
    }
  };

  const handleCode = () => {
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/verifyResetToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token: code }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          setErrorToken(false);
          setCodeMail(false);
          setNewPassword(true);
          setIsLoading(false);
        } else {
          setErrorToken(true);
          setIsLoading(false);
        }
      });
  };

  const handlePassword = () => {
    if (password === confirmPassword) {
      setNoMatchPassword(false);
      const obj = { email, token: code, newPassword: password };
      setIsLoading(true);
      fetch(
        `${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeForgottenPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        },
      )
        .then((response) => response.json())
        .then((data) => {
          setNewPassword(false);
          setIsDoneVisible(true);
          setIsLoading(false);
        });
    } else {
      setNoMatchPassword(true);
      setIsLoading(false);
    }
  };

  const handleGoToSignin = () => {
    navigation.navigate("Signin");
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
