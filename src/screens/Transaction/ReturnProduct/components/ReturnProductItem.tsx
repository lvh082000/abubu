import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {OrderService} from 'services/OrderService';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {ReturnStatusType} from 'types/Properties';
import {RefundItemType} from 'types/Responses/FetchGetRefundListResponse';

interface Props {
  item: RefundItemType;
  onItemPress: (item: RefundItemType) => void;
}

const ReturnProductItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  const status = useMemo(() => {
    return OrderService.getReturnStatusName(item.status);
  }, [item.status]);

  const isCanceled = item.status === ReturnStatusType.Cancel;

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

export default React.memo(ReturnProductItem);
