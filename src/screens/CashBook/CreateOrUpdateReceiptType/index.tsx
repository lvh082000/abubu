import {RouteProp} from '@react-navigation/native';
import {GradientHeader} from 'components/Header';
import {
  CashBookScreenID,
  CashBookStackParams,
} from 'navigation/CashBookNavigation';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CashBookService} from 'services/CashBookService';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import Form from '../components/CreateOrUpdateReceiptTypeForm';
import {CreateOrUpdateReceiptTypeFormValues as FormValues} from 'types/Properties';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {
  CreateOrUpdateReceiptTypePrefix,
  fetchCreateOrUpdateReceiptType,
} from 'store/CashBook';
import {useDialog} from 'components/Dialog';
import {useSpinner} from 'components/Spinner';
import NavigationService from 'services/NavigationService';
import capitalize from 'lodash/capitalize';

interface Props {
  route: RouteProp<
    CashBookStackParams,
    CashBookScreenID.CreateOrUpdateReceiptType
  >;
}

const CreateOrUpdateReceiptType = ({route: {params}}: Props) => {
  const dispatch = useAppDispatch();
  const spinner = useSpinner();
  const dialog = useDialog();
  const title = useMemo(() => {
    const type = CashBookService.getReceiptNameType(params.type);
    return capitalize(type);
  }, [params.type, params.id]);

  const initialValues = useMemo(() => {
    return {
      name: params.name ?? '',
      description: params.description ?? '',
    };
  }, [params]);

  const onSubmit = useCallback((values: FormValues) => {
    dispatch(
      fetchCreateOrUpdateReceiptType({
        ...values,
        type: params.type,
        id: params.id,
      }),
    );
  }, []);

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        title: 'Thành công',
        message: `${capitalize(title)} đã được ${
          params.id ? 'cập nhật' : 'tạo'
        } thành công`,
        onModalConfirm: NavigationService.goBack,
      });
    }, 300);
  }, [title, params.id]);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  useThunkCallbackAction(
    CreateOrUpdateReceiptTypePrefix,
    onSuccess,
    onError,
    onLoad,
  );

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`${params.id ? 'Cập nhật' : 'Thêm'} ${title}`}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={l.flex}
        keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Form
          initialValues={initialValues}
          type={params.type}
          onSubmit={onSubmit}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateOrUpdateReceiptType;
