import BackButton from 'components/BackButton';
import {LogoWithText} from 'components/Logo';
import {useSpinner} from 'components/Spinner';
import {useKeyboardListener} from 'hooks/useKeyboardListener';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {RootScreenID} from 'navigation/types';
import React, {useCallback, useEffect} from 'react';
import {Keyboard, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NavigationService from 'services/NavigationService';
import {fetchRegister, RegisterPrefix} from 'store/Authentication';
import {fetchGetProfile, GetProfilePrefix} from 'store/Me';
import {ContainerStyles} from 'styles/elements';
import {c, l} from 'styles/shared';
import {RegisterFormValues as FormValues} from 'types/Properties';
import RegisterForm from './components/Form';

const Register = () => {
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
      fetchRegister({
        fullName: values.fullName,
        email: values.emailOrPhone,
        password: values.password,
      }),
    );
  }, []);

  const onRegisterSuccess = useCallback(() => {
    spinner.dismiss();
    dispatch(fetchGetProfile());
  }, []);

  const onGetProfileSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      NavigationService.resetToScreen(RootScreenID.SelectShop);
    });
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  useEffect(() => {
    open.value = isKeyboardShow;
  }, [isKeyboardShow]);

  useThunkCallbackAction(RegisterPrefix, onRegisterSuccess, onError, onLoad);

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
            style={l.flex}
            scrollEnabled={false}>
            <LogoWithText progress={progress} />
            <RegisterForm onSubmit={onSubmit} progress={progress} />
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Register;
