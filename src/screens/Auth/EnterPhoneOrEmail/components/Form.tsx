import React from 'react';
import {Input, YupExtended} from 'components/FormControls';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {Formik} from 'formik';

import {c, l} from 'styles/shared';
import Button from 'components/Button';
import {AuthInputStyleProps} from 'styles/elements';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const MAX_MARGIN_TOP = 80;
const MIN_MARGIN_TOP = 50;

const validationSchema = YupExtended.object().shape({
  phone: YupExtended.string().required('Vui lòng nhập số điện thoại').phone(),
});

interface FormValues {
  phone: string;
}

const initialValues: FormValues = {
  phone: '',
};

interface FormControlsProps {
  onSubmit: (values: FormValues) => void;
  progress: Animated.SharedValue<number>;
}

const ForgotPasswordPhoneForm = React.memo(
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
                leftComponent={
                  <VectorIcon
                    color={c.white}
                    type={IconType.materialCommunity}
                    name="phone"
                    size={20}
                  />
                }
                touched={touched.phone}
                error={errors.phone}
                onChangeText={handleChange('phone')}
                value={values.phone}
                hint={'Nhập số điện thoại'}
                label={'Số điện thoại'}
                widgetStyles={{input: l.ml10}}
                keyboardType="phone-pad"
                {...AuthInputStyleProps}
              />

              <Button
                widgetStyles={{container: l.mt10}}
                size="lg"
                title="TIẾP TỤC"
                onPress={handleSubmit}
              />
            </Animated.View>
          );
        }}
      </Formik>
    );
  },
);

export default ForgotPasswordPhoneForm;
