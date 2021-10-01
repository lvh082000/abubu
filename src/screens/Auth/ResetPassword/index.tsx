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
import {delay} from 'services/UtilService';
import {AuthenticationService} from 'services/AuthenticationService';
import {AuthScreenID, AuthStackParams} from 'navigation/AuthNavgation';
import {RouteProp} from '@react-navigation/native';
import {useDialog} from 'components/Dialog';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';

interface Props {
  route: RouteProp<AuthStackParams, AuthScreenID.ResetPassword>;
}

const ResetPassword = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const {top} = useSafeAreaInsets();
  const isKeyboardShow = useKeyboardListener();
  const open = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const onSubmit = useCallback(async (values: {password: string}) => {
    Keyboard.dismiss();
    try {
      spinner.show();
      await delay(0.3);
      await AuthenticationService.fetchResetPassword({
        password: values.password,
        otp: params.otp,
        username: params.phone,
      });
      dialog.show({
        type: 'Success',
        message: 'Khôi phục mật khẩu thành công',
        canCloseByBackdrop: false,
        onModalConfirm: () => {
          NavigationService.resetToScreen(RootScreenID.Auth);
        },
      });
    } catch (error) {
      console.log('[ERROR]');
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

export default ResetPassword;
