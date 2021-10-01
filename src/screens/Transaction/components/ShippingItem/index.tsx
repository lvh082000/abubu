import Text from 'components/Text';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {ContainerItem} from 'components/ListItems';
import {OrderItemType} from 'types/Responses/FetchGetOrdersResponse';
import {ShippingOrderStatusType} from 'types/Properties';

interface Props {
  item: OrderItemType;
  index: number;
  onItemPress?: (item: OrderItemType) => void;
}

const ShippingItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  const status = useMemo(() => {
    switch (item.status) {
      case ShippingOrderStatusType.Packing:
        return 'Chờ đóng gói.';
      case ShippingOrderStatusType.Exporting:
        return 'Chờ xuất kho';
      case ShippingOrderStatusType.Delivering:
        return 'Đang giao hàng';
      case ShippingOrderStatusType.Success:
        return 'Hoàn tất';
      case ShippingOrderStatusType.Cancel:
        return 'Đã hủy';
    }
  }, [item.status]);

  const isCanceled = item.status === ShippingOrderStatusType.Cancel;

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text>{item.code}</Text>
        <Text style={[{color: c.black1000}, l.mb5]}>{item.guestName}</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          {toFormatDate(item.createdAt)}
        </Text>
      </View>
      <View style={[l.alignEnd]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(item.paymentRequire)}
        </Text>
        <Text style={{color: isCanceled ? c.red800 : c.black1000}}>
          {status}
        </Text>
        <Text style={[{color: c.green800}, t.medium]}>
          Khách đã trả: {toStringPrice(item.paid)}
        </Text>
      </View>
    </ContainerItem>
  );
};

export default React.memo(ShippingItem);
