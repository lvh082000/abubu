import React, {useEffect} from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {l, c} from 'styles/shared';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  interpolate,
  Extrapolate,
  withSpring,
} from 'react-native-reanimated';
import {useMemo} from 'react';
import {generateArray} from 'services/UtilService';

interface CommonProps {
  size?: number;
  color?: string;
}

interface Props extends CommonProps {
  activeIndex: number;
  length: number;
  containerStyle?: StyleProp<ViewStyle>;
}

interface DotItemProps extends CommonProps {
  activeIndex: number;
  index: number;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.alignCtr,
  },
  dot: {
    marginHorizontal: 7,
  },
});

const DotItem = ({
  activeIndex,
  index,
  size = 10,
  color = c.white,
}: DotItemProps) => {
  const open = useSharedValue(false);

  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0),
  );

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 1.5],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      progress.value,
      [0, 1],
      [0.6, 1],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      opacity,
    };
  });

  useEffect(() => {
    open.value = activeIndex === index;
  }, [activeIndex, index]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          height: size,
          width: size,
          backgroundColor: color,
          borderRadius: size / 2,
        },
        animatedStyle,
      ]}
    />
  );
};

const DotPagination = ({
  length,
  activeIndex,
  containerStyle,
  size = 13,
  color = c.white,
}: Props) => {
  const items = useMemo(() => {
    return generateArray(length);
  }, [length]);

  const renderDot = (_: number, index: number) => {
    return (
      <DotItem
        size={size}
        key={index}
        activeIndex={activeIndex}
        index={index}
        color={color}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {items.map(renderDot)}
    </View>
  );
};

export default React.memo(DotPagination);
