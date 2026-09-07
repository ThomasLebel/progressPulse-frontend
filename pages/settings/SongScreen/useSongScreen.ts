import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AudioPlayer, createAudioPlayer } from "expo-audio";
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
  const [currentSound, setCurrentSound] = useState<AudioPlayer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setSoundChoice(user.sound ?? '');
  }, []);

  const stopSound = () => {
    if (currentSound) {
      currentSound.pause();
      currentSound.remove();
    }
  };

  const playSound = (soundName: string) => {
    if (currentSound) {
      currentSound.pause();
      currentSound.remove();
    }
    const player = createAudioPlayer(sounds[soundName as keyof typeof sounds]);
    setCurrentSound(player);
    player.play();
  };

  const validateSoundAndNavigate = async () => {
    if (currentSound) {
      stopSound();
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
