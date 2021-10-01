import {Input, SharedValidationSchema} from 'components/FormControls';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {c, l} from 'styles/shared';
import * as Yup from 'yup';
import styles from '../styles';
import Button from 'components/Button';

const validationSchema = Yup.object().shape({
  oldPassword: SharedValidationSchema.password('Vui lòng nhập mật khẩu'),
  newPassword: SharedValidationSchema.password('Vui lòng nhập mật khẩu'),
  confirmNewPassword: SharedValidationSchema.confirmPassword('newPassword'),
});

export interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const initialValues: FormValues = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

interface FormControlsProps {
  onFormSubmit: (values: FormValues) => void;
}

const COMMON_PROPS = {
  darkTheme: true,
  isPassword: true,
  leftComponent: (
    <VectorIcon
      color={c.green800}
      type={IconType.material}
      name="lock"
      size={20}
    />
  ),
  widgetStyles: {input: l.ml5},
  hintTextColor: c.black400,
  focusedColor: c.grey1000,
  borderColor: c.green800,
};

const ShopSettingForm = React.memo(({onFormSubmit}: FormControlsProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFormSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <View style={styles.formContainer}>
            <Input
              {...COMMON_PROPS}
              touched={touched.oldPassword}
              error={errors.oldPassword}
              onChangeText={handleChange('oldPassword')}
              value={values.oldPassword}
              hint={'Nhập mật khẩu'}
              label={'Mật khẩu cũ'}
            />

            <Input
              {...COMMON_PROPS}
              touched={touched.newPassword}
              error={errors.newPassword}
              onChangeText={handleChange('newPassword')}
              value={values.newPassword}
              hint={'Nhập mật khẩu'}
              label={'Mật khẩu mới'}
            />

            <Input
              {...COMMON_PROPS}
              touched={touched.confirmNewPassword}
              error={errors.confirmNewPassword}
              onChangeText={handleChange('confirmNewPassword')}
              value={values.confirmNewPassword}
              hint={'Nhập mật khẩu'}
              label={'Xác nhận mật khẩu'}
            />

            <Button
              variant="primary"
              size="lg"
              title="THAY ĐỔI"
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
});

export default ShopSettingForm;
