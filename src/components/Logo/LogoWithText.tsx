import React from 'react';
import {Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {l, t, c} from 'styles/shared';

interface Props {
  progress?: Animated.SharedValue<number>;
}

const MAX_HEIGHT = 120;
const MIN_HEIGHT = 80;
const MAX_FONT_SIZE = 30;
const MIN_FONT_SIZE = 25;

const AnimatedText = Animated.createAnimatedComponent(Text);

export const LogoWithText = React.memo(({progress}: Props) => {
  const animatedImageStyle = useAnimatedStyle(() => {
    if (!progress) {
      return {
        height: MAX_HEIGHT,
      };
    }
    return {
      height: interpolate(
        progress.value,
        [0, 1],
        [MAX_HEIGHT, MIN_HEIGHT],
        Extrapolate.CLAMP,
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    if (!progress) {
      return {
        fontSize: MAX_FONT_SIZE,
      };
    }
    return {
      fontSize: interpolate(
        progress.value,
        [0, 1],
        [MAX_FONT_SIZE, MIN_FONT_SIZE],
        Extrapolate.CLAMP,
      ),
    };
  });
  return (
    <View style={[l.flexCenter, l.fullWidth]}>
      <Animated.Image
        resizeMode={'contain'}
        style={animatedImageStyle}
        source={require('../../assets/images/logo.png')}
      />
      <AnimatedText
        style={[
          animatedTextStyle,
          t.bold,
          t.textCtr,
          l.mt20,
          {color: c.white},
        ]}>
        ABUBU.VN
      </AnimatedText>
    </View>
  );
});
