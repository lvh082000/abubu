import {
  CurrencyInput,
  FormikPatchTouched,
  Input,
  YupExtended,
} from 'components/FormControls';
import {
  PaymentMethodSelector,
  OtherRevenueInput,
  UOMInput,
} from 'components/CustomInputs';
import GradientButton from 'components/GradientButton';
import {Formik, useFormikContext} from 'formik';
import React, {useEffect, useMemo, useRef} from 'react';
import {View} from 'react-native';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {l, t, c} from 'styles/shared';
import {MoneyHaveToPay} from './InputControls';
import Text from 'components/Text';
import {TakeAwayCheckoutFormValues as FormValues} from 'types/Properties';

interface Props {
  totalSurcharge: number;
  totalProductAmount: number;
  paymentRequire: number;
  onSubmit: (values: FormValues) => void;
  onValuesChange: (values: FormValues) => void;
}

const initialValues: FormValues = {
  paymentMethod: '',
  otherRevenues: [],
  uom: 'cash',
  value: '',
  paid: '',
  totalPaid: '',
  shipping: '',
};

const FormikValuesChange = ({
  onValuesChange,
}: {
  onValuesChange: (values: FormValues) => void;
}) => {
  const {values} = useFormikContext<FormValues>();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) {
      onValuesChange(values);
    }
    setTimeout(() => {
      isMounted.current = true;
    }, 300);
  }, [values.otherRevenues, values.shipping, values.uom, values.value]);
  return null;
};

const Form = ({
  totalProductAmount,
  paymentRequire,
  totalSurcharge,
  onSubmit,
  onValuesChange,
}: Props) => {
  const validationSchema = useMemo(() => {
    return YupExtended.object().shape({
      paymentMethod: YupExtended.string().required(
        'Vui lòng chọn phương thức thanh toán',
      ),
      paid: YupExtended.string()
        .required('Vui lòng nhập số tiền khách trả')
        .currency(),
    });
  }, [paymentRequire]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}>
      {({values, errors, touched, handleChange, handleSubmit}) => {
        const residualMoney = values.paid
          ? toNumberPrice(values.paid) - paymentRequire
          : 0;
        return (
          <>
            <FormikValuesChange onValuesChange={onValuesChange} />
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

              <MoneyHaveToPay total={paymentRequire} />

              <CurrencyInput
                touched={touched.paid}
                error={errors.paid}
                hint="Nhập số tiền khách thanh toán"
                label="Khách thanh toán"
                value={values.paid}
                widgetStyles={{input: t.textRight}}
                onChangeText={handleChange('paid')}
              />

              <PaymentMethodSelector<FormValues> inputStyle={t.textRight} />

              {residualMoney > 0 && (
                <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
                  <Text style={[t.bold, t.h5LG]}>Tiền thừa trả khách:</Text>
                  <Text style={[t.bold, t.h5LG, {color: c.red800}]}>
                    {toStringPrice(residualMoney)}
                  </Text>
                </View>
              )}

              {residualMoney < 0 && (
                <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
                  <Text style={[t.bold, t.h5LG]}>Tính vào công nợ:</Text>
                  <Text style={[t.bold, t.h5LG, {color: c.red800}]}>
                    {toStringPrice(Math.abs(residualMoney))}
                  </Text>
                </View>
              )}

              <GradientButton
                title="HOÀN THÀNH"
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
