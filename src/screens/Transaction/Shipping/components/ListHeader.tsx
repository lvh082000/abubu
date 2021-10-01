import Text from 'components/Text';
import {TransactionScreenID} from 'navigation/TransactionNavigation';
import {RootScreenID} from 'navigation/types';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import NavigationService from 'services/NavigationService';
import {c, l} from 'styles/shared';
import {ShippingOrderStatusType} from 'types/Properties';
import ShippingStatusItem from './ShippingStatusItem';

interface ItemType {
  name: string;
  count: number;
  id: ShippingOrderStatusType;
}

interface Props {
  statusOrders: Array<ItemType>;
  total: number;
}

const ListHeader = React.memo(({total, statusOrders}: Props) => {
  const onPress = useCallback((item: ItemType) => {
    NavigationService.pushToScreen(RootScreenID.Transaction, {
      screen: TransactionScreenID.ShippingStatusOrders,
      params: {
        status: item.id,
        title: item.name,
      },
    });
  }, []);
  const renderItem = (item: ItemType, index: number) => {
    return (
      <ShippingStatusItem
        onPress={() => onPress(item)}
        key={index}
        title={item.name}
        value={item.count}
      />
    );
  };
  return (
    <View style={[{borderBottomColor: c.green800, borderBottomWidth: 1}]}>
      <Text style={[l.mx20, l.my10]}>Tổng số {total} đơn hàng ship COD</Text>
      {statusOrders.map(renderItem)}
    </View>
  );
});

export default React.memo(ListHeader);
