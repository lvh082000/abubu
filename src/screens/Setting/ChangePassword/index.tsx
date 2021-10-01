import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {Keyboard, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/NavigationService';
import {changePassword, ChangePasswordPrefix} from 'store/Authentication';
import {l} from 'styles/shared';
import ChangePasswordForm, {FormValues} from './components/Form';
import {useDialog} from 'components/Dialog';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const dialog = useDialog();
  const spinner = useSpinner();

  const onFormSubmit = useCallback((values: FormValues) => {
    Keyboard.dismiss();
    dispatch(
      changePassword({
        password: values.oldPassword,
        newPassword: values.newPassword,
      }),
    );
  }, []);

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    dialog.show({
      type: 'Success',
      title: 'Thành công!',
      message: 'Thay đổi mật khẩu thành công',
    });
    setTimeout(() => {
      NavigationService.resetToScreen(RootScreenID.MainDrawer);
    });
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  useThunkCallbackAction(ChangePasswordPrefix, onSuccess, onError, onLoad);

  return (
    <View style={l.flex}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Đổi mật khẩu"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ChangePasswordForm onFormSubmit={onFormSubmit} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ChangePassword;
