import {PaymentMethodSelector} from 'components/CustomInputs';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import {c, l} from 'styles/shared';

export interface FormValues {
  paymentMethod: string;
}

interface Props {
  onSubmit: (values: FormValues) => void;
}

const initialValues: FormValues = {
  paymentMethod: '',
};

const Form = ({onSubmit}: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({handleSubmit}) => {
        return (
          <View style={[{backgroundColor: c.white}, l.pt30, l.px20]}>
            <PaymentMethodSelector<FormValues> />

            <View
              style={[
                l.flexRow,
                l.justifyBtw,
                l.py10,
                {borderBottomWidth: 1, borderBottomColor: c.green800},
              ]}>
              <Text style={[{color: c.black1000}]}>Tổng lương</Text>
              <Text>600000</Text>
            </View>

            <GradientButton
              title="XONG"
              widgetStyles={{container: [l.mt30, l.mb20]}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default React.memo(Form);
