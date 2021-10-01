import {Input} from 'components/FormControls';
import {NavigationNext} from 'components/SharedIcons';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {useFormikContext} from 'formik';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {c, l, t} from 'styles/shared';
import {ShippingDeliveryFormValues as FormValues} from 'types/Properties';

interface Props {
  customer: string;
}

const ShippingDeliveryCustomerAddress = React.memo(({customer}: Props) => {
  const {values, errors, touched, handleChange} =
    useFormikContext<FormValues>();
  return (
    <View style={[{backgroundColor: c.grey100}]}>
      <View style={[{backgroundColor: c.white}, l.p20, l.pb5]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[l.flexRow, l.mb20, l.alignCtr]}>
          <VectorIcon
            color={c.brown400}
            size={20}
            name="person"
            type={IconType.material}
          />
          <Text style={[t.bold, t.h5, l.ml5, l.mr5, {color: c.green800}]}>
            {customer}
          </Text>
          <NavigationNext size={20} color={c.green800} />
        </TouchableOpacity>

        <Input
          value={values.address}
          hint="Nhập địa chỉ giao hàng"
          label="Địa chỉ"
          error={errors.address}
          touched={touched.address}
          onChangeText={handleChange('address')}
        />
      </View>
    </View>
  );
});

export default ShippingDeliveryCustomerAddress;
