import React, {useMemo} from 'react';
import {View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';
import Text from 'components/Text';
import {ContainerItem} from 'components/ListItems';
import {DebtDetailType} from 'types/Responses/FetchGetPartnerDetailsResponse';
import {PartnerType} from 'types/Properties';

interface Props {
  item: DebtDetailType;
  type: PartnerType;
}

enum DebitType {
  Order = 'order',
  Refund = 'refund',
  Input = 'input',
  Output = 'output',
}

export const DebitItem = React.memo(({item, type}: Props) => {
  let mark = '-';
  const title = useMemo(() => {
    if (type === 'guest') {
      if (item.type === DebitType.Order) {
        mark = '';
        return 'Bán hàng';
      }
      return 'Trả hàng';
    } else {
      if (item.type === DebitType.Input) {
        mark = '';
        return 'Nhập hàng';
      }
      return 'Trả hàng nhập';
    }
  }, [type, item.type]);
  return (
    <ContainerItem>
      <View>
        <Text>{item.code}</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          {toFormatDate(item.createdAt)}
        </Text>
      </View>
      <View style={[l.alignEnd]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>{title}</Text>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {mark}
          {toStringPrice(item.paymentRequire)}
        </Text>
        <Text>
          Nợ còn:
          {toStringPrice(item.lack)}
        </Text>
      </View>
    </ContainerItem>
  );
});
