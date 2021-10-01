import {
  CurrencyInput,
  FormikPatchTouched,
  FormikValuesChange,
  Input,
} from 'components/FormControls';
import {OtherRevenueInput, UOMInput} from 'components/CustomInputs';
import GradientButton from 'components/GradientButton';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {l, t} from 'styles/shared';
import {ShippingCheckoutFormValues as FormValues} from 'types/Properties';

interface Props {
  totalSurcharge: number;
  totalProductAmount: number;
  paymentRequire: number;
  onSubmit: (values: FormValues) => void;
  onValuesChange: (values: FormValues) => void;
}

const initialValues: FormValues = {
  otherRevenues: [],
  uom: 'cash',
  value: '',
  codFee: '',
};

const TrackkingFields = ['otherRevenues', 'codFee', 'uom', 'value'];

const Form = ({
  totalProductAmount,
  paymentRequire,
  totalSurcharge,
  onSubmit,
  onValuesChange,
}: Props) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        return (
          <>
            <FormikValuesChange
              fields={TrackkingFields}
              onValuesChange={onValuesChange}
            />
            <FormikPatchTouched />
            <View style={[l.px20, l.mt30]}>
              <Input
                editable={false}
                label="Tổng giá trị"
                value={toStringPrice(totalProductAmount)}
                widgetStyles={{input: t.textRight}}
              />

              <UOMInput
                title="Chọn loại giảm giá (nếu có)"
                label="Giảm giá"
                hint="Nhập giảm giá (nếu có)"
                inputStyle={t.textRight}
                total={totalProductAmount}
              />

              <OtherRevenueInput<FormValues>
                total={totalSurcharge}
                inputStyle={t.textRight}
              />

              <CurrencyInput
                touched={touched.codFee}
                error={errors.codFee}
                hint="Nhập phí COD"
                label="Phí COD"
                value={values.codFee}
                widgetStyles={{input: t.textRight}}
                onChangeText={handleChange('codFee')}
              />

              <Input
                editable={false}
                label="Khách cần trả"
                value={toStringPrice(paymentRequire)}
                widgetStyles={{input: t.textRight}}
              />

              <GradientButton
                title="XỬ LÍ THANH TOÁN"
                widgetStyles={{container: [l.mt30, l.mb20]}}
                onPress={handleSubmit}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};

export default React.memo(Form);
