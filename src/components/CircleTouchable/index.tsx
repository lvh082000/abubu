import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {FC} from 'react';
import {c, l} from 'styles/shared';

interface Props {
  size: number;
  bg: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
}

const CircleTouchable: FC<Props> = ({
  children,
  size = 20,
  style,
  bg = c.grey50,
  onPress,
  disabled,
}) => {
  if (disabled || !onPress) {
    return (
      <View
        style={[
          style,
          {
            backgroundColor: bg,
            width: size,
            height: size,
            borderRadius: size / 2,
            ...l.flexCenter,
          },
        ]}>
        {children}
      </View>
    );
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        style,
        {
          backgroundColor: bg,
          width: size,
          height: size,
          borderRadius: size / 2,
          ...l.flexCenter,
        },
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default CircleTouchable;
