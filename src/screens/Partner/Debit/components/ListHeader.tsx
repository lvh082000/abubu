import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';

interface Props {
  numberOfItems: number;
  total: number;
}

const ListHeader = React.memo(({numberOfItems, total}: Props) => {
  return (
    <View
      style={[
        {borderBottomColor: c.green800, borderBottomWidth: 1},
        l.justifyBtw,
        l.flexRow,
      ]}>
      <Text style={[l.mx20, l.my10]}>{numberOfItems} bản ghi</Text>
      <Text style={[l.mx20, l.my10]}>
        Nợ cần thu:{' '}
        <Text style={[t.semi, {color: c.red800}]}>{toStringPrice(total)}</Text>
      </Text>
    </View>
  );
});

export default ListHeader;
