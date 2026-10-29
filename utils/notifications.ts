import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Empêche l'affichage d'une bannière quand l'app est au premier plan —
// on gère la fin du timer directement dans handleTimerComplete.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldShowBanner: false,
    shouldShowList: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions(): Promise<void> {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("timer", {
      name: "Minuteur",
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  await Notifications.requestPermissionsAsync();
}

export async function scheduleTimerNotification(
  seconds: number,
  data: { exerciseID: string; workoutID: string },
): Promise<string> {
  return Notifications.scheduleNotificationAsync({
    content: {
      title: "ProgressPulse — Repos terminé",
      body: "Le repos est terminé — retourne dans l'app",
      data,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      channelId: "timer",
    },
  });
}

export async function cancelNotification(notifId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}
