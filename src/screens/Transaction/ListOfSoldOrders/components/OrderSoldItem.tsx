import Text from 'components/Text';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {toFormatDate, toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {OrderItemType} from 'types/Responses/FetchGetOrdersResponse';

interface Props {
  item: OrderItemType;
  onItemPress: (item: OrderItemType) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.px20,
    ...l.alignCtr,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
    ...l.flexRow,
    ...l.justifyBtw,
    ...l.py10,
  },
});

const OrderSoldItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}>
      <View>
        <Text>{item.code}</Text>
        <Text style={[{color: c.black1000}, l.mb5]}>{item.guestName}</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          {toFormatDate(item.createdAt)}
        </Text>
      </View>
      <View style={[l.flexCenter]}>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {toStringPrice(item.paid)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(OrderSoldItem);
