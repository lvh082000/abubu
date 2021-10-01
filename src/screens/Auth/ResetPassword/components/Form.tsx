import React from 'react';
import {Input, SharedValidationSchema} from 'components/FormControls';
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

const MAX_MARGIN_TOP = 80;
const MIN_MARGIN_TOP = 50;

const validationSchema = Yup.object().shape({
  password: SharedValidationSchema.password('Vui lòng nhập mật khẩu'),
});

const initialValues = {
  password: '',
};

interface FormControlsProps {
  onSubmit: (values: {password: string}) => void;
  progress: Animated.SharedValue<number>;
}

const ResetPasswordForm = React.memo(
  ({progress, onSubmit}: FormControlsProps) => {
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

              <Button
                widgetStyles={{container: l.mt10}}
                size="lg"
                title="ĐỒNG Ý"
                onPress={handleSubmit}
              />
            </Animated.View>
          );
        }}
      </Formik>
    );
  },
);

export default ResetPasswordForm;
