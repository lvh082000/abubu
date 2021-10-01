import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import DeviceHelper from 'config/DeviceHelper';

interface Props {
  activeIndex: number;
  offsetX: Animated.SharedValue<number>;
}

const Gradient = ({offsetX}: Props) => {
  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        offsetX.value,
        [0, DeviceHelper.width, DeviceHelper.width * 2],
        [
          'rgba(17, 101, 93,0.76)',
          'rgba(22, 181, 38,1)',
          'rgba(193, 30, 24,1)',
        ],
      ),
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}></Animated.View>
  );
};

export default React.memo(Gradient);
