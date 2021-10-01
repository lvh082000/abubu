import {CounterInput} from 'components/FormControls';
import Text from 'components/Text';
import {useFormikContext} from 'formik';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import {l} from 'styles/shared';
import {ImportProductSettingFormValues as FormValues} from 'types/Properties';

export const QuantityInput = React.memo(() => {
  const {values, setFieldValue} = useFormikContext<FormValues>();

  const onValueChange = useCallback((value: number) => {
    setFieldValue('quantity', value, true);
  }, []);
  return (
    <View style={[l.flexRow, l.justifyBtw, l.alignCtr, l.mt20, l.mb10]}>
      <Text>Số lượng</Text>
      <CounterInput
        onValueChange={onValueChange}
        maxLength={3}
        min={0}
        value={values.quantity}
        widgetStyles={{input: {width: 50}}}
      />
    </View>
  );
});
