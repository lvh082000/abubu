import {useDialog} from 'components/Dialog';
import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import NavigationService from 'services/NavigationService';
import {fetchUpdateProfile, GetProfile, UpdateProfilePrefix} from 'store/Me';
import {l} from 'styles/shared';
import {ProfileSettingFormValues as FormValues} from 'types/Properties';
import ProfileSettingForm from './components/Form';

const Profile = () => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const me = GetProfile();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = useMemo(() => {
    return {
      fullName: me?.fullName ?? '',
      phone: me?.phone ?? '',
      email: me?.email ?? '',
      avatar: me?.avatar ?? '',
      // firebaseToken: '123456',
      // dob: 0,
      // setting: {
      //   transaction: true,
      //   product: true,
      //   cash_book: false,
      //   guest: false,
      // },
    };
  }, [me]);

  const onSubmit = useCallback(values => {
    dispatch(fetchUpdateProfile(values));
  }, []);

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        message: `Thông tin người dùng đã được cập nhật thành công`,
        onModalConfirm: NavigationService.goBack,
      });
    }, 300);
  }, []);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  useThunkCallbackAction(UpdateProfilePrefix, onSuccess, onError, onLoad);

  return (
    <View style={l.flex}>
      <GradientHeader
        useBack
        title="Thiết lập người dùng"
        description="Mô tả về màn hình này"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ProfileSettingForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          initialImage={me?.avatar as string}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Profile;
