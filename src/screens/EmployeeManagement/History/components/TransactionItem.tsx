import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {TranType} from 'types/Responses/FetchGetEmployeeDetailsResponse';

interface Props {
  item: TranType;
}

const TransactionItem = ({item}: Props) => {
  return (
    <ContainerItem>
      <View>
        <Text>{item.code}</Text>
        <Text style={[{color: c.black1000}]}>{item.guestName}</Text>
        <Text style={[t.bold, {color: c.green800}, l.mt5]}>
          {toFormatDate(item.createdAt)}
        </Text>
      </View>
      <View style={[{alignSelf: 'flex-end'}]}>
        <Text style={[{color: c.black1000}, t.pSM]}>{item.locationName}</Text>
      </View>
      <View style={[{alignSelf: 'flex-end'}]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(item.paymentRequire)}
        </Text>
        <Text style={[l.mt5]}>{item.status}</Text>
      </View>
    </ContainerItem>
  );
};

export default React.memo(TransactionItem);
