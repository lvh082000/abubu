import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {ContainerItem} from 'components/ListItems';
import {OrderItemType} from 'types/Responses/FetchGetOrdersResponse';
import {TakeAwayOrderStatusType} from 'types/Properties';

interface Props {
  item: OrderItemType;
  index: number;
  onItemPress: (item: OrderItemType) => void;
}

const TakeAwayItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  const isSuccess = item.status === TakeAwayOrderStatusType.Success;

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
        <Text style={{color: isSuccess ? c.black1000 : c.red800}}>
          {isSuccess ? 'Hoàn thành đơn' : 'Đã hủy'}
        </Text>
        <Text style={[{color: c.green800}, t.medium]}>
          Khách đã trả: {toStringPrice(item.paid)}
        </Text>
      </View>
    </ContainerItem>
  );
};

export default React.memo(TakeAwayItem);
