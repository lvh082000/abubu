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
import {useSpinner} from 'components/Spinner';
import {AuthenticationService} from 'services/AuthenticationService';
import NavigationService from 'services/NavigationService';
import {AuthScreenID} from 'navigation/AuthNavgation';
import {delay} from 'services/UtilService';

const EnterPhoneOrEmail = () => {
  const spinner = useSpinner();
  const {top} = useSafeAreaInsets();
  const isKeyboardShow = useKeyboardListener();
  const open = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const onSubmit = useCallback(async (values: {phone: string}) => {
    Keyboard.dismiss();
    try {
      spinner.show();
      delay(0.3);
      await AuthenticationService.fetchSendOTPCode(values.phone);
      NavigationService.replace(AuthScreenID.VerifyOTP, {
        phone: values.phone,
      });
    } catch (error) {
      console.log('[ERROR] fetchForgotPassword', error);
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
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default EnterPhoneOrEmail;
