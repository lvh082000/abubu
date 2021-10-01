import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c, l} from 'styles/shared';

const ListHeader = ({total}: {total: number}) => {
  return (
    <View style={[{borderBottomColor: c.green800, borderBottomWidth: 1}]}>
      <Text style={[l.mx20, l.my10]}>Tổng số {total} đơn trả hàng</Text>
    </View>
  );
};

export default React.memo(ListHeader);
