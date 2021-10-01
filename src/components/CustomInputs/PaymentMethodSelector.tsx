import {useBottomSheet} from 'components/BottomSheet';
import {useFormikContext} from 'formik';
import React, {useCallback, useState} from 'react';
import {Select} from 'components/FormControls';
import {
  PaymentMethodBottomSheet,
  PaymentMethodSelectedData,
} from 'components/SharedBottomSheets';
import {StyleProp, TextStyle} from 'react-native';
import {getBankAccountId} from 'services/UtilService';

interface Props {
  inputStyle?: StyleProp<TextStyle>;
}

export function PaymentMethodSelector<
  FormValues extends {paymentMethod: string},
>({inputStyle}: Props) {
  const {values, touched, errors, setFieldValue} =
    useFormikContext<FormValues>();
  const [displayText, setText] = useState('');
  const {showBottomSheet} = useBottomSheet();

  const onSelect = useCallback(
    (data: PaymentMethodSelectedData) => {
      if (data.type === 'cash') {
        setText('Tiền mặt');
        setFieldValue('paymentMethod', 'cash', true);
      } else {
        const accountId = getBankAccountId(data.value);
        setText(data.value as string);
        setFieldValue('paymentMethod', accountId, true);
      }
    },
    [setFieldValue],
  );

  const onSelectPress = useCallback(() => {
    showBottomSheet(
      <PaymentMethodBottomSheet
        onSelect={onSelect}
        value={values.paymentMethod}
      />,
    );
  }, [values.paymentMethod, onSelect]);

  return (
    <Select
      value={values.paymentMethod}
      label={'Phương thức thanh toán'}
      hint={'Chọn phương thức'}
      //@ts-ignore
      touched={touched.paymentMethod}
      //@ts-ignore
      error={errors.paymentMethod}
      onSelectPress={onSelectPress}
      widgetStyles={{input: inputStyle}}
      displayText={displayText}
    />
  );
}
