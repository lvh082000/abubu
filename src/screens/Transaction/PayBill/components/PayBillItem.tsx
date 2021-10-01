import Text from 'components/Text';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {OrderedPaymentType} from 'types/Responses/FetchGetOrderDetailsResponse';
import Dayjs from 'dayjs';
interface Props {
  onPress?: () => void;
  item: OrderedPaymentType;
}

const styles = StyleSheet.create({
  itemContainer: {
    ...l.flexRow,
    ...l.px20,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.py15,
    backgroundColor: c.white,
    borderBottomWidth: 1,
    borderBottomColor: c.grey100,
  },
});

const PayBillItem = ({item, onPress}: Props) => {
  const createdAt = Dayjs(item.createdAt * 1000).format('DD/MM/YYYY - hh:mm');
  const title = useMemo(() => {
    if (item.method === 'cash') {
      return 'Tiền mặt';
    }
    if (item.method === 'bank' || item.method === 'card') {
      const value = `${item.name} - ${item.account}`;
      if (item.method === 'bank') {
        return `Chuyển khoản: ${value}`;
      }
      return `Quẹt thẻ: ${value}`;
    }
  }, []);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.itemContainer}
      onPress={onPress}>
      <View>
        <Text style={[t.bold, t.h5]}>{title}</Text>
        <Text style={l.mt5}>{createdAt}</Text>
      </View>
      <View>
        <Text style={[t.bold, t.h5, {color: c.green800}]}>
          {toStringPrice(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(PayBillItem);
