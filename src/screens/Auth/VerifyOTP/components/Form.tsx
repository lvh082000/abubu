import React from 'react';
import {c, l, t} from 'styles/shared';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {StyleSheet} from 'react-native';
import Text from 'components/Text';
const MAX_MARGIN_TOP = 80;
const MIN_MARGIN_TOP = 50;

interface FormControlsProps {
  onSubmit: (value: string) => void;
  progress: Animated.SharedValue<number>;
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    borderWidth: 0,
    borderBottomWidth: 2,
    color: c.white,
    ...t.h5LG,
    ...t.bold,
    borderBottomColor: c.white,
  },
  underlineStyleHighLighted: {
    borderColor: c.green200,
  },
  container: {
    ...l.mx20,
    ...l.mb20,
  },
  title: {
    ...t.textCtr,
    ...t.h5,
    ...t.semi,
    color: c.white,
  },
});

const ForgotPasswordOTPForm = React.memo(
  ({progress, onSubmit}: FormControlsProps) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        marginTop: interpolate(
          progress.value,
          [0, 1],
          [MAX_MARGIN_TOP, MIN_MARGIN_TOP],
          Extrapolate.CLAMP,
        ),
      };
    });

    return (
      <Animated.View style={[l.flex, animatedStyle]}>
        <Text style={styles.title}>Nhập mã xác thực</Text>
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={onSubmit}
          selectionColor={c.white}
          style={styles.container}
        />
      </Animated.View>
    );
  },
);

export default ForgotPasswordOTPForm;
