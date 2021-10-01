import {GradientHeader} from 'components/Header';
import React, {useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {useDialog} from 'components/Dialog';
import {useSpinner} from 'components/Spinner';
import NavigationService from 'services/NavigationService';
import {RouteProp} from '@react-navigation/native';
import {useAppDispatch, useThunkCallbackAction} from 'hooks/useRedux';
import {CreateOrUpdateRoomPrefix, fetchCreateOrUpdateRoom} from 'store/Order';
import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import {l} from 'styles/shared';
import * as Yup from 'yup';
import {CreateOrUpdateRoomValues as FormValues} from 'types/Properties';
import {
  TransactionScreenID,
  TransactionStackParams,
} from 'navigation/TransactionNavigation';

const validationSchema = Yup.object().shape({
  room: Yup.string().required('Vui lòng nhập vị trí phòng'),
});

interface Props {
  route: RouteProp<
    TransactionStackParams,
    TransactionScreenID.CreateOrUpdateRoom
  >;
}

const initialValues: FormValues = {
  table: '',
  floor: '',
  room: '',
};

const CreateOrUpdateRoom = ({route: {params}}: Props) => {
  const spinner = useSpinner();
  const dialog = useDialog();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (values: FormValues) => {
      if (!!values.floor || !!values.table) {
        dispatch(
          fetchCreateOrUpdateRoom({
            ...values,
            id: params?.id ?? 0,
          }),
        );
      } else {
        dialog.show({
          type: 'Error',
          message: 'Vui lòng nhập tầng hoặc bàn',
        });
      }
    },
    [params],
  );

  const onSuccess = useCallback(() => {
    spinner.dismiss();
    setTimeout(() => {
      dialog.show({
        type: 'Success',
        title: 'Thành công',
        message: `Bàn đã được ${
          params && params.id ? 'cập nhật' : 'tạo'
        } thành công`,
        onModalConfirm: NavigationService.goBack,
      });
    }, 300);
  }, [params]);

  const onLoad = useCallback(() => {
    spinner.show();
  }, []);

  const onError = useCallback(() => {
    spinner.dismiss();
  }, []);

  useThunkCallbackAction(CreateOrUpdateRoomPrefix, onSuccess, onError, onLoad);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      scrollEnabled={false}
      style={ContainerStyles}>
      <GradientHeader
        description="Mô tả về màn hình này"
        useBack
        title={`${params && params.id ? 'Cập nhật' : 'Thêm'} bàn`}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <View style={[l.pt30, l.mx20]}>
              <Input
                keyboardType="numeric"
                touched={touched.floor}
                error={errors.floor}
                onChangeText={handleChange('floor')}
                value={values.floor}
                hint={'Nhập vị trí tầng'}
                label={'Tầng'}
              />
              <Input
                keyboardType="numeric"
                touched={touched.table}
                error={errors.table}
                onChangeText={handleChange('table')}
                value={values.table}
                hint={'Nhập vị trí bàn'}
                label={'Bàn'}
              />
              <Input
                keyboardType="numeric"
                touched={touched.room}
                error={errors.room}
                onChangeText={handleChange('room')}
                value={values.room}
                hint={'Nhập vị trí phòng'}
                label={'Phòng'}
              />
              <GradientButton
                title="LƯU"
                widgetStyles={{container: [l.mt15, l.mx0]}}
                onPress={handleSubmit}
              />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

export default CreateOrUpdateRoom;
