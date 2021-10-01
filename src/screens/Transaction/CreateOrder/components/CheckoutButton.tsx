import {NavigationNext} from 'components/SharedIcons';
import Text from 'components/Text';
import DeviceHelper from 'config/DeviceHelper';
import {useKeyboardListener} from 'hooks/useKeyboardListener';
import React from 'react';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {toStringPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';
import {OrderType} from 'types/Properties';

interface Props {
  type: OrderType;
  total: number;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: c.grey100,
    elevation: 5,
    ...l.pt15,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.px20,
  },
});
const CheckoutButton = React.memo(({total, type, onPress}: Props) => {
  const {bottom} = useSafeAreaInsets();
  const visible = useKeyboardListener();

  const getPaddingBottom = useMemo(() => {
    if (!DeviceHelper.isIOS) {
      if (bottom < 15) {
        return 15;
      }
      return bottom;
    }
    if (visible) {
      return 15;
    }
    return bottom;
  }, [visible, bottom]);

  const titleButton = useMemo(() => {
    switch (type) {
      case OrderType.TakeAway:
        return 'THANH TOÁN';
      case OrderType.Shipping:
        return 'TIẾP TỤC';
      case OrderType.BookByRoom:
        return 'TẠO ĐƠN';
      case OrderType.Return:
        return 'THANH TOÁN';
    }
  }, []);

  return (
    <View style={[styles.container, {paddingBottom: getPaddingBottom}]}>
      <Text style={[{color: c.black1000}, t.bold]}>
        Tổng tiền:{' '}
        <Text style={[{color: c.green800}, t.h5LG, t.bold]}>
          {toStringPrice(total)}
        </Text>
      </Text>
      {total > 0 && (
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={[l.flexRow, l.alignCtr]}>
          <Text style={[t.bold, {color: c.green800}, l.mr5]}>
            {titleButton}
          </Text>
          <NavigationNext color={c.green800} />
        </TouchableOpacity>
      )}
    </View>
  );
});

export default CheckoutButton;
