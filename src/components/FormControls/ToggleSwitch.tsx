import React, {useImperativeHandle} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {c} from 'styles/shared';

interface Props {
  handleOnPress?: (value: boolean) => void;
  value: boolean;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  thumbColor?: string;
  isDisabled?: boolean;
}

export interface ToggleSwitchRef {
  forceChange: () => void;
}

export const ToggleSwitch = React.forwardRef<ToggleSwitchRef, Props>(
  (
    {
      handleOnPress,
      activeTrackColor = c.green800,
      inActiveTrackColor = '#F2F5F7',
      thumbColor = c.white,
      value = true,
      isDisabled = false,
    },
    ref,
  ) => {
    const open = useSharedValue(value);
    const progress = useDerivedValue(() =>
      open.value ? withSpring(1) : withTiming(0),
    );

    const toggleStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        progress.value,
        [0, 1],
        [3, 25],
        Extrapolate.CLAMP,
      );

      return {
        transform: [{translateX}],
      };
    });

    const containerStyle = useAnimatedStyle(() => {
      const backgroundColor = interpolateColor(
        progress.value,
        [0, 1],
        [inActiveTrackColor, activeTrackColor],
      );
      return {
        backgroundColor,
      };
    });

    const onPress = () => {
      open.value = !open.value;
      handleOnPress?.(!open.value);
    };

    useImperativeHandle(ref, () => ({
      forceChange: onPress,
    }));

    return (
      <Pressable onPress={onPress} disabled={isDisabled}>
        <Animated.View style={[styles.containerStyle, containerStyle]}>
          <Animated.View
            style={[
              styles.circleStyle,
              {backgroundColor: thumbColor},
              styles.shadowValue,
              toggleStyle,
            ]}
          />
        </Animated.View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  containerStyle: {
    width: 50,
    paddingVertical: 2,
    borderRadius: 25 / 2,
    borderWidth: 1,
    borderColor: c.green800,
  },
  shadowValue: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
