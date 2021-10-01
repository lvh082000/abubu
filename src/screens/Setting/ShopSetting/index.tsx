import {GradientHeader} from 'components/Header';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ShopSettingForm from './components/Form';
import {
  fetchCreateOrUpdateStore,
  CreateOrUpdateStorePrefix,
  GetCurrentStore,
} from 'store/Me';
import {useSpinner} from 'components/Spinner';
import {useDialog} from 'components/Dialog';
import {ShopSettingFormValues as FormValues} from 'types/Properties';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import NavigationService from 'services/NavigationService';

const ShopSetting = () => {
  const dialog = useDialog();
  const spinner = useSpinner();
  const currentStore = GetCurrentStore();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = useMemo(() => {
    return {
      name: currentStore?.name ?? '',
      address: currentStore?.address ?? '',
      avatar: currentStore?.avatar ?? '',
    };
  }, [currentStore]);

  const onSubmit = useCallback(values => {
    dispatch(fetchCreateOrUpdateStore(values));
  }, []);

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        message: `Cửa hàng đã được ${
          currentStore ? 'cập nhật' : 'tạo'
        } thành công`,
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

  useThunkCallbackAction(CreateOrUpdateStorePrefix, onSuccess, onError, onLoad);

  return (
    <View style={l.flex}>
      <GradientHeader
        useBack
        title="Thiết lập cửa hàng"
        description="Mô tả về màn hình này"
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ShopSettingForm
          initialImage={currentStore?.avatar as string}
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ShopSetting;
