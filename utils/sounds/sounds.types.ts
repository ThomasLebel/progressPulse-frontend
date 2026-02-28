export type SoundName =
  | "Alarm"
  | "Notification"
  | "Ring de boxe"
  | "Ring"
  | "Féerique"
  | "Silencieux";

export type SoundMap = Record<SoundName, number>;
