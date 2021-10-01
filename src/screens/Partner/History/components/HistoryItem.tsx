import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {TransDetailType} from 'types/Responses/FetchGetPartnerDetailsResponse';

interface Props {
  item: TransDetailType;
}

const HistoryItem = React.memo(({item}: Props) => {
  return (
    <ContainerItem>
      <View>
        <Text>{item.code}</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          {toFormatDate(item.createdAt)}
        </Text>
      </View>
      <View style={[l.flexCenter]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(item.paymentRequire)}
        </Text>
      </View>
    </ContainerItem>
  );
});

export default HistoryItem;
