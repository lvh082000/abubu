import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';

const ListHeader = () => {
  return (
    <View
      style={[
        {
          borderBottomColor: c.green800,
          borderBottomWidth: 1,
          backgroundColor: c.grey200,
        },
      ]}>
      <Text style={[l.mx20, l.my10, {color: c.black200}, t.bold]}>
        Danh sách phiếu thu chi: 5
      </Text>
    </View>
  );
};

export default React.memo(ListHeader);
