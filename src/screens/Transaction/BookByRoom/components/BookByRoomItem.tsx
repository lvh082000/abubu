import Text from 'components/Text';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {OrderItemType} from 'types/Responses/FetchGetOrdersResponse';
import {ContainerItem} from 'components/ListItems';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {BookByRoomOrderStatusType} from 'types/Properties';
import {OrderService} from 'services/OrderService';

interface Props {
  index: number;
  item: OrderItemType;
  onItemPress: (item: OrderItemType) => void;
}

const BookByRoomItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  const status = useMemo(() => {
    return OrderService.getBookByRoomStatusName(item.status);
  }, [item.status]);

  const isCanceled = item.status === BookByRoomOrderStatusType.Cancel;

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text>{item.code}</Text>
        <Text style={{color: c.black1000}}>{item.guestName}</Text>
        <Text style={{color: c.black1000}}>{item.locationName}</Text>
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

export default React.memo(BookByRoomItem);
