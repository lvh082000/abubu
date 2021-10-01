import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React, {useMemo} from 'react';
import {View} from 'react-native';
import {OrderService} from 'services/OrderService';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {ImportStatusType} from 'types/Properties';
import {ReturnOrImportedType} from 'types/Responses/FetchGetReturnOrImportedGoodsResponse';

interface Props {
  item: ReturnOrImportedType;
  onItemPress: (item: ReturnOrImportedType) => void;
}

const ReturnGoodItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress(item);
  };

  const status = useMemo(() => {
    return OrderService.getImportStatusName(item.status);
  }, [item.status]);

  const isCanceled = item.status === ImportStatusType.Cancel;

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text>{item.code}</Text>
        <Text style={[{color: c.black1000}, l.mb5]}>{item.guestName}</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          {toFormatDate(item.createdAt)}
        </Text>
      </View>
      <View style={l.alignEnd}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(item.paymentRequire)}
        </Text>
        <Text style={{color: isCanceled ? c.red800 : c.black1000}}>
          {status}
        </Text>
        <Text style={[{color: c.green800}, t.medium]}>
          NCC đã trả: {toStringPrice(item.paid)}
        </Text>
      </View>
    </ContainerItem>
  );
};

export default React.memo(ReturnGoodItem);
