import {RouteProp} from '@react-navigation/native';
import {GradientHeader} from 'components/Header';
import {
  PaymentScreenID,
  PaymentStackParams,
} from 'navigation/PaymentNavigation';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {CreateOrUpdatePaymentMethodFormValues} from 'types/Properties';
import AddPaymentAccountForm from './components/AddPaymentAccountForm';
import {useDialog} from 'components/Dialog';
import {useSpinner} from 'components/Spinner';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import NavigationService from 'services/NavigationService';
import {
  CreateOrUpdatePaymentMethodPrefix,
  fetchCreateOrUpdatePaymentMethod,
} from 'store/Order';

interface Props {
  route: RouteProp<PaymentStackParams, PaymentScreenID.AddPaymentAccount>;
}

const AddPaymentAccount = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: CreateOrUpdatePaymentMethodFormValues) => {
      const type = params.type;
      dispatch(fetchCreateOrUpdatePaymentMethod({...values, type}));
    },
    [],
  );

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        message: `Tài khoản đã được thêm thành công`,
        onModalConfirm: NavigationService.goBack,
        canCloseByBackdrop: false,
      });
    }, 300);
  }, []);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  useThunkCallbackAction(
    CreateOrUpdatePaymentMethodPrefix,
    onSuccess,
    onError,
    onLoad,
  );

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title="Thêm tài khoản"
      />
      <AddPaymentAccountForm onFormSubmit={onSubmit} />
    </View>
  );
};

export default AddPaymentAccount;
