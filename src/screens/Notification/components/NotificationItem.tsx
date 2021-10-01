import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {c, l, t} from 'styles/shared';

interface Props {
  item: any;
  type?: string;
  onItemPress?: (item: any) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.px20,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
    ...l.py10,
  },
});

const NotificationItem = ({item, type, onItemPress}: Props) => {
  return (
    <View style={[styles.container]}>
      <Text style={[t.bold]}>
        Phi Thủ{' '}
        {type === 'test' && (
          <Text style={[t.regular]}>
            tạo 1 đơn hàng trực tiếp giá trị 200000
          </Text>
        )}
        {type === 'test1' && (
          <Text style={[t.regular]}>
            tạo 1 khách hàng mới là{' '}
            {<Text style={[t.bold]}>Nguyễn Duy Toàn</Text>}
          </Text>
        )}
      </Text>
      <View style={[l.flexRow, l.mt10]}>
        <VectorIcon
          type={IconType.antDesign}
          name="clockcircleo"
          size={20}
          color={c.black1000}
        />
        <Text style={[t.bold, {color: c.green800}, l.ml10]}>
          11:40 26/09/2021
        </Text>
      </View>
    </View>
  );
};

export default React.memo(NotificationItem);
