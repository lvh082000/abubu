import React, {useCallback, useEffect} from 'react';
import {Keyboard, View, ScrollView} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import LinearGradient from 'react-native-linear-gradient';
import {l, c} from 'styles/shared';
import Form from './components/Form';
import BackButton from 'components/BackButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {LogoWithText} from 'components/Logo';
import {useKeyboardListener} from 'hooks/useKeyboardListener';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import NavigationService from 'services/NavigationService';
import {AuthScreenID, AuthStackParams} from 'navigation/AuthNavgation';
import {RouteProp} from '@react-navigation/native';
import {useSpinner} from 'components/Spinner';
import {delay} from 'services/UtilService';
import {AuthenticationService} from 'services/AuthenticationService';
import {Timers} from './components/Timer';

interface Props {
  route: RouteProp<AuthStackParams, AuthScreenID.VerifyOTP>;
}

const VerifyOTP = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const {top} = useSafeAreaInsets();
  const isKeyboardShow = useKeyboardListener();
  const open = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const onSubmit = useCallback(async (code: string) => {
    Keyboard.dismiss();
    try {
      spinner.show();
      await delay(0.3);
      await AuthenticationService.fetchVerifyOTP(params.phone, code);
      NavigationService.replace(AuthScreenID.ResetPassword, {
        phone: params.phone,
        otp: code,
      });
    } catch (error) {
      console.log('[ERROR] fetchVerifyOTP', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  const onResend = useCallback(async () => {
    Keyboard.dismiss();
    try {
      spinner.show();
      await delay(0.3);
      await AuthenticationService.fetchSendOTPCode(params.phone);
    } catch (error) {
      console.log('[ERROR] onResend', error);
    } finally {
      spinner.dismiss();
    }
  }, []);

  useEffect(() => {
    open.value = isKeyboardShow;
  }, [isKeyboardShow]);

  return (
    <View style={ContainerStyles}>
      <LinearGradient
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        colors={c.primaryGradient}
        style={l.flex}>
        <View style={[l.flex, l.mx20, {paddingTop: top}]}>
          <BackButton />
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
            style={l.flex}>
            <LogoWithText progress={progress} />
            <Form onSubmit={onSubmit} progress={progress} />
            <Timers onResend={onResend} />
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default VerifyOTP;
