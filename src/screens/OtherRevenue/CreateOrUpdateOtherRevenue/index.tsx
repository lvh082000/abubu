import {RouteProp} from '@react-navigation/native';
import {UOMInput} from 'components/CustomInputs';
import {useDialog} from 'components/Dialog';
import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {GradientHeader} from 'components/Header';
import {useSpinner} from 'components/Spinner';
import {Formik} from 'formik';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {
  OtherRevenueScreenID,
  OtherRevenueStackParams,
} from 'navigation/OtherRevenueNavigation';
import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {
  CreateOrUpdateOtherRevenuePrefix,
  fetchCreateOrUpdateOrtherRevenue,
} from 'store/Order';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import {UOMType} from 'types/Properties';
import * as Yup from 'yup';

interface FormValues {
  name: string;
  value: string;
  uom: UOMType;
}

interface Props {
  route: RouteProp<
    OtherRevenueStackParams,
    OtherRevenueScreenID.CreateOrUpdateOtherRevenue
  >;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên tài khoản'),
});

const CreateOrUpdateOtherRevenue = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const initialValues = useMemo(() => {
    let value = '';
    if (params && params.id) {
      if (params.uom === 'cash') {
        value = toStringPrice(params.value);
      } else {
        value = params.value.toString();
      }
    }
    return {
      name: params?.name ?? '',
      value: value,
      uom: params?.uom ?? 'cash',
    };
  }, [params]);

  const onSubmit = useCallback(
    (values: FormValues) => {
      let value = 0;
      if (values.uom === 'percent') {
        value = parseInt(values.value);
      } else {
        value = toNumberPrice(values.value);
      }
      dispatch(
        fetchCreateOrUpdateOrtherRevenue({
          name: values.name,
          value: value,
          uom: values.uom,
          id: params?.id ?? undefined,
        }),
      );
    },
    [params],
  );

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        message: `Loại thu đã được thêm thành công`,
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
    CreateOrUpdateOtherRevenuePrefix,
    onSuccess,
    onError,
    onLoad,
  );

  return (
    <View style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`${params ? 'Cập nhật' : 'Thêm'} loại thu`}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <View style={[l.pt20, l.px20, l.flex]}>
              <Input
                touched={touched.name}
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
                hint={'Nhập tên phiếu thu'}
                label={'Tên phiếu thu'}
              />
              <UOMInput />
              <GradientButton
                title="LƯU"
                widgetStyles={{container: [l.mt15, l.mx0]}}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default CreateOrUpdateOtherRevenue;
