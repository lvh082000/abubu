import {CurrencyInput, Input} from 'components/FormControls';
import Text from 'components/Text';
import {useFormikContext} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {ShippingDeliveryFormValues as FormValues} from 'types/Properties';

interface Props {
  total: number;
  paid: number;
}

const ShippingDeliveryOrderInfo = React.memo(({total, paid}: Props) => {
  const {values, errors, touched, handleChange, setFieldValue, setFieldError} =
    useFormikContext<FormValues>();
  const needToPay = total - paid;

  const onChangeText = (text: string) => {
    setFieldValue('paidCod', text, false);

    const numValue = toNumberPrice(text);
    if (numValue > needToPay) {
      setFieldError(
        'paidCod',
        `Số tiền không được vượt quá ${toStringPrice(needToPay)}`,
      );
    } else {
      setFieldError('paidCod', '');
    }
  };

  return (
    <View style={[{backgroundColor: c.grey100}]}>
      <Text style={[l.py15, l.px20, t.h5]}>Thông tin gói hàng</Text>
      <View style={[{backgroundColor: c.white}, l.p20, l.pb5]}>
        <CurrencyInput
          editable={values.paidCod !== '0'}
          label="Thu hộ COD"
          value={values.paidCod}
          error={errors.paidCod}
          touched={true}
          onChangeText={onChangeText}
        />
        <Input
          keyboardType="numeric"
          hint="Nhập khối lượng"
          label="Khối lượng (g)"
          onChangeText={handleChange('weight')}
          value={values.weight}
        />
        <CurrencyInput
          hint="Nhập phí trả giao hàng"
          label="Phí trả giao hàng"
          onChangeText={handleChange('paidShipper')}
          value={values.paidShipper}
          error={errors.paidShipper}
          touched={touched.paidShipper}
        />
      </View>
    </View>
  );
});

export default ShippingDeliveryOrderInfo;
