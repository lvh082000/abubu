import React, {useEffect} from 'react';
import {useKeyboardListener} from 'hooks/useKeyboardListener';
import Animated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {l, c} from 'styles/shared';
import {PlusIcon} from 'components/SharedIcons';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const SIZE = 50;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    ...l.flexCenter,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: c.green800,
  },
});

interface Props {
  onPress: () => void;
}

const AddButton = React.memo(({onPress}: Props) => {
  const visible = useKeyboardListener();
  const open = useSharedValue(visible);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(0) : withSpring(1),
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: progress.value}],
      opacity: parseFloat(progress.value.toFixed(1)),
    };
  });

  useEffect(() => {
    open.value = visible;
  }, [visible]);

  return (
    <AnimatedTouchable
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, animatedStyle]}>
      <PlusIcon size={25} color={c.white} />
    </AnimatedTouchable>
  );
});

export default AddButton;
