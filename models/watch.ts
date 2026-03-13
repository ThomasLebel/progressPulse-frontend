import { WatchPayload } from "react-native-watch-connectivity";

export type WatchMessageType =
  | "CHECK_CONNECTION"
  | "GET_SESSIONS"
  | "GET_ACTIVE_RECORDING"
  | "GET_SESSION_EXERCISES"
  | "CHECK_RECORDING_IN_PROGRESS"
  | "START_SESSION_RECORDING"
  | "GET_EXERCISE_DETAILS"
  | "GET_EXERCISE_SETS_COUNT"
  | "SAVE_SET"
  | "FINISH_SESSION";

export interface WatchMessage extends WatchPayload {
  type: WatchMessageType;
  payload?: Record<string, unknown>;
}

export interface WatchReply extends WatchPayload {
  success: boolean;
  data?: unknown;
  error?: string;
}
