import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';

interface Props {
  item: any;
  onItemPress?: (value: any) => void;
}

export const VoucherItem = React.memo(({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text style={[{color: c.black1000}]}>Làm biển quảng cáo</Text>
        <Text style={[{color: c.black1000}, l.mb5]}>CTM000001</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          01/09/2021{`   `}13:23
        </Text>
      </View>
      <View style={[l.flexCenter]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>1.000.000</Text>
        <Text>Đã thanh toán</Text>
      </View>
    </ContainerItem>
  );
});
