import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Checkbox, Input, SharedValidationSchema} from 'components/FormControls';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {c, l, t} from 'styles/shared';
import Button from 'components/Button';
import {AuthInputStyleProps} from 'styles/elements';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text from 'components/Text';
import {LoginFormValues as FormValues} from 'types/Properties';

const MAX_MARGIN_TOP = 80;
const MIN_MARGIN_TOP = 50;

const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string().required('Vui lòng nhập email hoặc số điện thoại'),
  password: SharedValidationSchema.password('Vui lòng nhập mật khẩu'),
});

const initialValues: FormValues = {
  emailOrPhone: '',
  password: '',
  isRemmember: true,
};

interface FormControlsProps {
  onSubmit: (values: FormValues) => void;
  onForgot: () => void;
  progress: Animated.SharedValue<number>;
}

const LoginForm = React.memo(
  ({progress, onSubmit, onForgot}: FormControlsProps) => {
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
                label={'Email/Số điện thoại'}
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

              <View style={[l.alignEnd, l.fullWidth]}>
                <Checkbox
                  checked={values.isRemmember}
                  label="Ghi nhớ, không cần đăng nhập lại"
                />
              </View>

              <Button
                widgetStyles={{container: l.mt10}}
                size="lg"
                title="ĐĂNG NHẬP"
                onPress={handleSubmit}
              />
              <TouchableOpacity
                onPress={onForgot}
                activeOpacity={0.7}
                style={l.mt20}>
                <Text style={[t.textCtr, t.h5LG, t.semi, {color: c.white}]}>
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      </Formik>
    );
  },
);

export default LoginForm;
