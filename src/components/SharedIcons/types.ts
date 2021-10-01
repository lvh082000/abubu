import {StyleProp, ViewStyle} from 'react-native';

export interface SharedIconProps {
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
