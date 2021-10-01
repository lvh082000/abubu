import {Input} from 'components/FormControls';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {ContainerStyles} from 'styles/elements';
import {l} from 'styles/shared';
import * as Yup from 'yup';
import {CreateOrUpdatePaymentMethodFormValues} from 'types/Properties';

const validationSchema = Yup.object().shape({
  account: Yup.string().required('Vui lòng nhập số tài khoản'),
  name: Yup.string().required('Vui lòng nhập tên tài khoản'),
  bank: Yup.string().required('Vui lòng nhập tên ngân hàng'),
});

interface FormValues {
  account: string;
  name: string;
  bank: string;
}

const initialValues: FormValues = {
  account: '',
  name: '',
  bank: '',
};

interface Props {
  onFormSubmit: (values: CreateOrUpdatePaymentMethodFormValues) => void;
}

const FormAddAccount = ({onFormSubmit}: Props) => {
  return (
    <View style={ContainerStyles}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onFormSubmit}>
        {({values, errors, touched, handleChange, handleSubmit}) => {
          return (
            <View style={[l.pt20, l.px20, l.flex]}>
              <Input
                touched={touched.account}
                error={errors.account}
                onChangeText={handleChange('account')}
                value={values.account}
                hint={'Nhập số tài khoản'}
                label={'Số tài khoản'}
                keyboardType="number-pad"
              />
              <Input
                touched={touched.name}
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
                hint={'Nhập tên tài khoản'}
                label={'Tên tài khoản'}
              />
              <Input
                touched={touched.bank}
                error={errors.bank}
                onChangeText={handleChange('bank')}
                value={values.bank}
                hint={'Nhập tên ngân hàng'}
                label={'Ngân hàng'}
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
    </View>
  );
};

export default React.memo(FormAddAccount);
