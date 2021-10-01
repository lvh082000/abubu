import {RouteProp} from '@react-navigation/native';
import {useDialog} from 'components/Dialog';
import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {
  ProductScreenID,
  ProductStackParams,
} from 'navigation/ProductNavigation';
import React, {useCallback, useMemo} from 'react';
import {ScrollView} from 'react-native';
import NavigationService from 'services/NavigationService';
import {ProductService} from 'services/ProductService';
import {
  CreateOrUpdatePricePrefix,
  fetchCreateOrUpdatePrice,
} from 'store/Product';
import {ContainerStyles} from 'styles/elements';
import {CreateOrUpdatePriceFormValues as FormValues} from 'types/Properties';
import Form from './components/Form';

interface Props {
  route: RouteProp<ProductStackParams, ProductScreenID.CreateOrUpdatePrice>;
}

const CreateOrUpdatePrice = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const initialValues: FormValues = useMemo(() => {
    return ProductService.mapDataToPriceForm(params);
  }, [params]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      dispatch(fetchCreateOrUpdatePrice({...values, id: params?.id}));
    },
    [params],
  );

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        message: `Bảng giá đã được ${
          params && params.id ? 'cập nhật' : 'tạo'
        } thành công`,
        onModalConfirm: NavigationService.goBack,
        canCloseByBackdrop: false,
      });
    }, 300);
  }, [params]);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  useThunkCallbackAction(CreateOrUpdatePricePrefix, onSuccess, onError, onLoad);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      scrollEnabled={false}
      style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={params ? 'Cập nhật bảng giá' : 'Thêm bảng giá'}
      />
      <Form
        isUpdate={!!params}
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </ScrollView>
  );
};

export default CreateOrUpdatePrice;
