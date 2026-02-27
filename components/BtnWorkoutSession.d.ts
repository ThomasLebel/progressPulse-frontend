declare const BtnWorkoutSession: (props: {
  name: string;
  time: string;
  nbExercise: string;
  onPress: (...args: unknown[]) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  image?: unknown;
  textBtn?: string;
  isActive?: boolean;
}) => JSX.Element;

export default BtnWorkoutSession;
