import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { addWeight, updateTarget } from "../../../reducers/user";
import { RootStackParamList } from "../../../models/navigation";
import { RootState } from "../../../reducers/store.types";
import {
  computeProgressPercent,
  computeProgressValue,
  getCurrentDate,
  getCurrentWeight,
  getStartDate,
  getStartWeight,
  getTargetDate,
  getTargetWeight,
  getWeightChartPoints,
  sortWeightsByDate,
} from "./weight.service";
import {
  AddWeightResponse,
  apiAddWeight,
  apiWeightTarget,
} from "./weightScreen.api";

export function useWeightScreen(navigation: NativeStackNavigationProp<RootStackParamList>) {
  const [modalVisibleWeight, setModalVisibleWeight] = useState(false);
  const [modalVisibleTarget, setModalVisibleTarget] = useState(false);
  const [weight, setWeight] = useState<string | null>(null);
  const [weightTarget, setWeightTarget] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [progressValue, setProgressValue] = useState(0);
  const [progressValuePourcent, setProgressValuePourcent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [initialWeightInput, setInitialWeighInput] = useState<string | null>(
    null,
  );

  const user = useSelector((state: RootState) => state.user.value);
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

  const handleConfirmDate = (selectedDate: Date) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  const handleAddWeight = async () => {
    if (!weight) {
      setError(true);
      setErrorMessage("Veuillez remplir correctement le champ de saisie");
      return;
    }
    setIsLoading(true);
    closeModalWeight();
    const data: AddWeightResponse | null = await apiAddWeight(
      weight,
      user.token ?? '',
    ).catch((err: unknown): null => {
      console.error("addWeight fetch error:", err);
      return null;
    });
    if (!data) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Erreur réseau, veuillez réessayer");
      setModalVisibleWeight(true);
      return;
    }
    if (data.result === false) {
      setError(true);
      setErrorMessage(data.error ?? "");
      setIsLoading(false);
      setModalVisibleWeight(true);
    } else {
      dispatch(addWeight(data.newWeight!));
      setIsLoading(false);
    }
  };

  const addTargetWeight = async () => {
    if (!weightTarget || !date || !initialWeightInput) {
      setError(true);
      setErrorMessage("Veuillez remplir correctement les champs de saisies");
      return;
    }
    const objectif =
      parseFloat(initialWeightInput) < parseFloat(weightTarget)
        ? "Gain"
        : "Loss";
    setIsLoading(true);
    closeModalTarget();
    const data = await apiWeightTarget(
      weightTarget,
      user.token ?? '',
      date,
      objectif,
      initialWeightInput,
    ).catch((err: unknown): null => {
      console.error("weightTarget fetch error:", err);
      return null;
    });
    if (!data) {
      setIsLoading(false);
      setError(true);
      setErrorMessage("Erreur réseau, veuillez réessayer");
      setModalVisibleTarget(true);
      return;
    }
    if (data.result === true) {
      const now = new Date().toISOString();
      dispatch(updateTarget({ ...data.weightTarget!, startDate: now }));
      dispatch(
        addWeight({
          weight: parseFloat(
            initialWeightInput.toString().trim().replace(",", "."),
          ),
          date: now,
        }),
      );
      setIsLoading(false);
    } else {
      setError(true);
      setErrorMessage(data.error ?? "");
      setModalVisibleTarget(true);
      setIsLoading(false);
    }
  };

  const closeModalWeight = () => {
    setModalVisibleWeight(false);
    setError(false);
    setErrorMessage("");
    setWeight(null);
  };

  const closeModalTarget = () => {
    setModalVisibleTarget(false);
    setError(false);
    setErrorMessage("");
    setWeightTarget(null);
    setDate(new Date());
    setInitialWeighInput(null);
  };

  const handleGoToStats = () => {
    navigation.goBack();
  };

  const startWeight = user.target?.initialWeight || getStartWeight(user.weight);
  const startDate = getStartDate(user.weight, user.target);
  const currentDate = getCurrentDate(user.weight);
  const targetDate = getTargetDate(user.target);
  const sortedWeights = sortWeightsByDate(user.weight);
  const { points: weightChartPoints, minValue: weightChartMin } =
    getWeightChartPoints(user.weight);

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
    weightChartPoints,
    weightChartMin,
    showDatePicker,
    hideDatePicker,
    handleConfirmDate,
    handleAddWeight,
    addTargetWeight,
    closeModalWeight,
    closeModalTarget,
    handleGoToStats,
  };
}
