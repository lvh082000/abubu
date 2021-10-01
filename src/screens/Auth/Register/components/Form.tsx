import React from 'react';
import {Input, SharedValidationSchema} from 'components/FormControls';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {c, l} from 'styles/shared';
import Button from 'components/Button';
import {AuthInputStyleProps} from 'styles/elements';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {RegisterFormValues as FormValues} from 'types/Properties';

const MAX_MARGIN_TOP = 80;
const MIN_MARGIN_TOP = 50;

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Vui lòng nhập email hoặc số điện thoại'),
  emailOrPhone: Yup.string().required('Vui lòng nhập email hoặc số điện thoại'),
  password: SharedValidationSchema.password('Vui lòng nhập mật khẩu'),
  confirmPassword: SharedValidationSchema.confirmPassword('password'),
});

const initialValues: FormValues = {
  emailOrPhone: '',
  password: '',
  confirmPassword: '',
  fullName: '',
};

interface FormControlsProps {
  progress: Animated.SharedValue<number>;
  onSubmit: (values: FormValues) => void;
}

const RegisterForm = React.memo(({progress, onSubmit}: FormControlsProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: interpolate(
        progress.value,
        [0, 1],
        [MAX_MARGIN_TOP, MIN_MARGIN_TOP],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <Animated.View style={[l.flex, animatedStyle]}>
            <Input
              leftComponent={
                <VectorIcon
                  color={c.white}
                  type={IconType.material}
                  name="person"
                  size={20}
                />
              }
              touched={touched.fullName}
              error={errors.fullName}
              onChangeText={handleChange('fullName')}
              value={values.fullName}
              hint={'Nhập họ và tên'}
              label={'Họ và tên'}
              widgetStyles={{input: l.ml10}}
              {...AuthInputStyleProps}
            />

            <Input
              leftComponent={
                <VectorIcon
                  color={c.white}
                  type={IconType.materialCommunity}
                  name="email-newsletter"
                  size={20}
                />
              }
              touched={touched.emailOrPhone}
              error={errors.emailOrPhone}
              onChangeText={handleChange('emailOrPhone')}
              value={values.emailOrPhone}
              hint={'Nhập Email/Số điện thoại'}
              label={'Email/Phone'}
              widgetStyles={{input: l.ml10}}
              {...AuthInputStyleProps}
            />

            <Input
              isPassword
              leftComponent={
                <VectorIcon
                  color={c.white}
                  type={IconType.material}
                  name="lock"
                  size={20}
                />
              }
              touched={touched.password}
              error={errors.password}
              onChangeText={handleChange('password')}
              value={values.password}
              hint={'Nhập mật khẩu'}
              label={'Mật khẩu'}
              widgetStyles={{input: l.ml10}}
              {...AuthInputStyleProps}
            />

            <Input
              isPassword
              leftComponent={
                <VectorIcon
                  color={c.white}
                  type={IconType.material}
                  name="lock"
                  size={20}
                />
              }
              touched={touched.confirmPassword}
              error={errors.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              hint={'Nhập mật khẩu'}
              label={'Xác nhận mật khẩu'}
              widgetStyles={{input: l.ml10}}
              {...AuthInputStyleProps}
            />
            <Button
              widgetStyles={{container: l.mt10}}
              size="md"
              title="ĐĂNG KÍ"
              onPress={handleSubmit}
            />
          </Animated.View>
        );
      }}
    </Formik>
  );
});

export default RegisterForm;
