declare const BtnMuscleGroup: (props: {
  name: string;
  source: unknown;
  onPress: (name: string) => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}) => JSX.Element;

export default BtnMuscleGroup;
