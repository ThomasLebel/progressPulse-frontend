import { createNavigationContainerRef } from "@react-navigation/native";

import { RootStackParamList } from "../models/navigation";

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();
