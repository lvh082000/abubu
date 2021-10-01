import React, {FC, useEffect} from 'react';
import {Flow} from 'react-native-animated-spinkit';
import {View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Text from 'components/Text';
import {l, t, c} from 'styles/shared';

interface Props {
  visible: boolean;
  title: string | undefined;
}

const colors = ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.65)'];

const Spinner: FC<Props> = ({visible, title = 'Đang xử lí...'}) => {
  const color = useSharedValue(colors[0]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(color.value),
      zIndex: visible ? 1 : -1,
    };
  });

  useEffect(() => {
    if (visible) {
      color.value = colors[1];
    } else {
      color.value = colors[0];
    }
  }, [visible]);

  return (
    <Animated.View style={[l.absoluteFill, animatedStyles]}>
      <View style={[l.flex, l.flexCenter]}>
        <Flow size={45} color={c.white} />
        <Text style={[t.bold, t.h5, l.mt5, {color: c.white}]}>{title}</Text>
      </View>
    </Animated.View>
  );
};

export default Spinner;
