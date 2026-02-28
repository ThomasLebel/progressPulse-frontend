import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { changeSound } from "../../../reducers/user";
import sounds from "../../../utils/sounds";
import { RootState } from "../../../reducers/store.types";
import { RootStackParamList } from "../../../models/navigation";
import { changeSoundApi } from "./song.api";
import { getSoundNames } from "./song.service";

type SongNavigationProp = NativeStackNavigationProp<RootStackParamList, "song">;

export function useSongScreen(navigation: SongNavigationProp) {
  const [soundChoice, setSoundChoice] = useState("");
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setSoundChoice(user.sound ?? '');
  }, []);

  const stopSound = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
  };

  const playSound = async (soundName: string) => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(
      sounds[soundName as keyof typeof sounds],
    );
    setCurrentSound(sound);
    await sound.playAsync();
  };

  const validateSoundAndNavigate = async () => {
    if (currentSound) {
      await stopSound();
    }
    setIsLoading(true);
    const data = await changeSoundApi(user.token as string, soundChoice);
    if (data.result === false) {
      setSoundChoice("");
      navigation.navigate("TabNavigator", { screen: "Settings" });
      setIsLoading(false);
    } else {
      dispatch(changeSound(data.soundUpdated!));
      setSoundChoice("");
      navigation.navigate("TabNavigator", { screen: "Settings" });
      setIsLoading(false);
    }
  };

  const handleChangeSound = (soundName: string) => {
    if (!soundName) return;
    setSoundChoice(soundName);
    playSound(soundName);
  };

  return {
    soundChoice,
    isLoading,
    soundNames: getSoundNames(),
    validateSoundAndNavigate,
    handleChangeSound,
  };
}
