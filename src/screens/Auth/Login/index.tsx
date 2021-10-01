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
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {fetchLogin, LoginPrefix} from 'store/Authentication';
import NavigationService from 'services/NavigationService';
import {RootScreenID} from 'navigation/types';
import {fetchGetProfile, GetProfilePrefix} from 'store/Me';
import {AuthScreenID} from 'navigation/AuthNavgation';
import {LoginFormValues as FormValues} from 'types/Properties';

const Login = () => {
  const dispatch = useAppDispatch();
  const spinner = useSpinner();
  const {top} = useSafeAreaInsets();
  const isKeyboardShow = useKeyboardListener();
  const open = useSharedValue<boolean>(false);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0),
  );

  const onSubmit = useCallback((values: FormValues) => {
    Keyboard.dismiss();
    dispatch(
      fetchLogin({
        email: values.emailOrPhone,
        password: values.password,
      }),
    );
  }, []);

  const onLoginSuccess = useCallback(() => {
    dispatch(fetchGetProfile());
  }, []);

  const onGetProfileSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      NavigationService.resetToScreen(RootScreenID.SelectShop);
    });
  }, []);

  const onForgot = useCallback(() => {
    NavigationService.pushToScreen(AuthScreenID.EnterPhoneOrEmail);
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  const onLoginLoad = useCallback(() => {
    spinner.show();
  }, []);

  useEffect(() => {
    open.value = isKeyboardShow;
  }, [isKeyboardShow]);

  useThunkCallbackAction(LoginPrefix, onLoginSuccess, onError, onLoginLoad);

  useThunkCallbackAction(GetProfilePrefix, onGetProfileSuccess, onError);

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
            <Form onForgot={onForgot} onSubmit={onSubmit} progress={progress} />
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Login;
