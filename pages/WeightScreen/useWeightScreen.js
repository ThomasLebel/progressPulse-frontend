import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addWeight, updateTarget } from "../../reducers/user";
import {
  computeProgressPercent,
  computeProgressValue,
  getCurrentWeight,
  getStartWeight,
  getTargetWeight,
  getCurrentDate,
  getStartDate,
  getTargetDate,
  sortWeightsByDate,
} from "./weight.service";

export function useWeightScreen(navigation) {
  const [modalVisibleWeight, setModalVisibleWeight] = useState(false);
  const [modalVisibleTarget, setModalVisibleTarget] = useState(false);
  const [weight, setWeight] = useState(null);
  const [weightTarget, setWeightTarget] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [progressValue, setProgressValue] = useState(0);
  const [progressValuePourcent, setProgressValuePourcent] = useState(0);
  const [isCheckedLoss, setIsCheckedLoss] = useState(false);
  const [isCheckedGain, setIsCheckedGain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [initialWeightInput, setInitialWeighInput] = useState(null);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const currentWeight = getCurrentWeight(user.weight);
  const targetWeight = getTargetWeight(user.target);

  useEffect(() => {
    if (currentWeight && targetWeight && user.target.objectif) {
      const newProgressValue = computeProgressValue(
        user.target.initialWeight,
        currentWeight,
        targetWeight,
      );
      const newProgressValuePourcent = computeProgressPercent(
        user.target.initialWeight,
        currentWeight,
        targetWeight,
      );

      setProgressValue(newProgressValue);
      setProgressValuePourcent(newProgressValuePourcent);

      if (newProgressValue === 1) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setShowConfetti(true);
      }
    }
  }, [user.weight, user.target]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const handleAddWeight = () => {
    if (!weight) {
      setError(true);
      setErrorMessage("Veuillez remplir correctement le champ de saisie");
      return;
    }
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/addWeight`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ weight, token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setError(true);
          setErrorMessage(data.error);
          setIsLoading(false);
          setModalVisibleWeight(true);
        } else {
          dispatch(addWeight(data.newWeight));
          setIsLoading(false);
          closeModalWeight();
        }
      });
  };

  const addTargetWeight = () => {
    if (!weightTarget || !date || !initialWeightInput) {
      setError(true);
      setErrorMessage("Veuillez remplir correctement les champs de saisies");
      return;
    }
    if (!isCheckedGain && !isCheckedLoss) {
      setError(true);
      setErrorMessage("Veuillez cocher une case");
      return;
    }
    const objectif = isCheckedGain ? "Gain" : "Loss";
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/weightTarget`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        weight: weightTarget,
        token: user.token,
        date,
        objectif,
        initialWeight: initialWeightInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === true) {
          const now = new Date().toISOString();
          dispatch(updateTarget({ ...data.weightTarget, startDate: now }));
          dispatch(addWeight({ weight: parseFloat(initialWeightInput), date: now }));
          setIsLoading(false);
          closeModalTarget();
        } else {
          setError(true);
          setErrorMessage(data.error);
          setModalVisibleTarget(true);
          setIsLoading(false);
        }
      });
  };

  const closeModalWeight = () => {
    setModalVisibleWeight(!modalVisibleWeight);
    setError(false);
    setErrorMessage("");
    setWeight(null);
  };

  const closeModalTarget = () => {
    setModalVisibleTarget(!modalVisibleTarget);
    setError(false);
    setErrorMessage("");
    setWeightTarget(null);
    setDate(new Date());
    setIsCheckedGain(false);
    setIsCheckedLoss(false);
    setInitialWeighInput(null);
  };

  const handleCheckbox = (name) => {
    if (name === "Loss") {
      setIsCheckedLoss(true);
      setIsCheckedGain(false);
    } else {
      setIsCheckedLoss(false);
      setIsCheckedGain(true);
    }
  };

  const handleGoToStats = () => {
    navigation.navigate("Stats");
  };

  const startWeight = user.target?.initialWeight || getStartWeight(user.weight);
  const startDate = getStartDate(user.weight, user.target);
  const currentDate = getCurrentDate(user.weight);
  const targetDate = getTargetDate(user.target);
  const sortedWeights = sortWeightsByDate(user.weight);

  return {
    modalVisibleWeight,
    setModalVisibleWeight,
    modalVisibleTarget,
    setModalVisibleTarget,
    weight,
    setWeight,
    weightTarget,
    setWeightTarget,
    errorMessage,
    error,
    date,
    progressValue,
    progressValuePourcent,
    isCheckedLoss,
    isCheckedGain,
    isLoading,
    showConfetti,
    isDatePickerVisible,
    initialWeightInput,
    setInitialWeighInput,
    username: user.username,
    targetObjectif: user.target.objectif,
    startWeight,
    startDate,
    currentWeight,
    currentDate,
    targetWeight,
    targetDate,
    sortedWeights,
    showDatePicker,
    hideDatePicker,
    handleConfirmDate,
    handleAddWeight,
    addTargetWeight,
    closeModalWeight,
    closeModalTarget,
    handleCheckbox,
    handleGoToStats,
  };
}
