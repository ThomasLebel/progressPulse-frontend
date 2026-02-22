import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Audio } from "expo-av";
import { changeSound } from "../../reducers/user";
import sounds from "../../utils/sounds";
import { getSoundNames } from "./song.service";

export function useSongScreen(navigation) {
  const [soundChoice, setSoundChoice] = useState("");
  const [currentSound, setCurrentSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    setSoundChoice(user.sound);
  }, []);

  const stopSound = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
  };

  const playSound = async (soundName) => {
    if (currentSound) {
      await currentSound.stopAsync();
      await currentSound.unloadAsync();
    }
    const { sound } = await Audio.Sound.createAsync(sounds[soundName]);
    setCurrentSound(sound);
    await sound.playAsync();
  };

  const validateSoundAndNavigate = () => {
    if (currentSound) {
      stopSound();
    }
    setIsLoading(true);
    fetch(`${process.env.EXPO_PUBLIC_SERVER_IP}/users/changeSound`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ token: user.token, newSound: soundChoice }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
          setSoundChoice("");
          navigation.navigate("Settings");
          setIsLoading(false);
        } else {
          dispatch(changeSound(data.soundUpdated));
          setSoundChoice("");
          navigation.navigate("Settings");
          setIsLoading(false);
        }
      });
  };

  const handleChangeSound = (soundName) => {
    if (!soundName) {
      return;
    }
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
