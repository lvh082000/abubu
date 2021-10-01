import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c, l} from 'styles/shared';

interface Props {
  total: number;
  quatity: number;
}

const ListHeader = ({total, quatity}: Props) => {
  return (
    <View style={[{borderBottomColor: c.green800, borderBottomWidth: 1}]}>
      <Text style={[l.mx20, l.my10]}>
        {`Tổng số ${total} hàng hóa với số tồn kho là ${quatity}`}
      </Text>
    </View>
  );
};

export default React.memo(ListHeader);
