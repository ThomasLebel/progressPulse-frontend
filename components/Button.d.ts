import { FC } from 'react';

interface ButtonProps {
  textButton: string;
  textColor: string;
  width?: any;
  height?: any;
  background?: string;
  borderWidth?: number;
  borderColor?: string;
  onPress: () => void;
  isLinearGradiant?: boolean;
  colorsGradiant?: string[];
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

declare const Button: FC<ButtonProps>;
export default Button;
