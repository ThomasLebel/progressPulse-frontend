declare module 'react-native-vector-icons/FontAwesome' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle | any;
    onPress?: () => void;
    accessibilityLabel?: string;
    accessibilityHint?: string;
  }

  class Icon extends Component<IconProps> {}
  export default Icon;
}

declare module 'react-native-vector-icons/FontAwesome6' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle | any;
    onPress?: () => void;
    accessibilityLabel?: string;
    accessibilityHint?: string;
  }

  class Icon extends Component<IconProps> {}
  export default Icon;
}

declare module 'react-native-vector-icons/Ionicons' {
  import { Component } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle | ViewStyle | any;
    onPress?: () => void;
    accessibilityLabel?: string;
  }

  class Icon extends Component<IconProps> {}
  export default Icon;
}
