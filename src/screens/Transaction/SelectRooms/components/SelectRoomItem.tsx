import {useDialog} from 'components/Dialog';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {WaitingRoomItemType} from 'types/Responses/FetchGetOrderedRoomResponse';

interface Props {
  onCreate?: () => void;
  index: number;
  item: {id: number; name: string};
  orders: Array<WaitingRoomItemType>;
  onItemPress: (value: {id: number; code: string}) => void;
  onDelete?: (id: number) => void;
}

interface OrderItemProps {
  index: number;
  item: WaitingRoomItemType;
  onPress: (value: {id: number; code: string}) => void;
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
  bagItem: {
    width: 40,
    height: 40,
    ...l.alignEnd,
  },
  numberOfOrder: {
    position: 'absolute',
    backgroundColor: c.white,
    width: 20,
    height: 20,
    right: -7,
    borderRadius: 10,
    zIndex: 1,
    borderWidth: 2,
    borderColor: c.red800,
    ...l.flexCenter,
    top: -5,
  },
});

const OrderItem = ({item, index, onPress}: OrderItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress({id: item.id, code: item.code})}
      activeOpacity={0.5}
      style={[l.py5]}>
      <Text style={[t.h5, t.medium, {color: c.red800}]}>
        Đơn {index + 1}: {toStringPrice(item.paymentRequire)}
      </Text>
    </TouchableOpacity>
  );
};

const SelectRoomItem = ({
  item,
  orders,
  onDelete,
  onCreate,
  onItemPress,
}: Props) => {
  const dialog = useDialog();
  const renderItem = (item: WaitingRoomItemType, i: number) => {
    return <OrderItem onPress={onItemPress} index={i} item={item} key={i} />;
  };

  const _onDelete = () => {
    dialog.show({
      type: 'Confirmation',
      message: 'Bạn có muốn xóa bàn phòng nay?',
      onModalConfirm: () => onDelete?.(item.id),
    });
  };

  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={[t.bold, t.h5, l.mb10]}>{item.name}</Text>
        {orders.length > 0 && orders.map(renderItem)}
        {orders.length === 0 && (
          <View>
            <Text>Bàn trống, chưa có đơn</Text>
            <Text>Chọn biểu tượng đơn xanh</Text>
          </View>
        )}
      </View>
      <View>
        <TouchableOpacity
          onPress={onCreate}
          style={styles.bagItem}
          activeOpacity={0.7}>
          <VectorIcon
            size={30}
            color={c.green200}
            name="bag"
            type={IconType.custom}
          />
        </TouchableOpacity>
        {orders.length > 0 && (
          <TouchableOpacity
            style={[styles.bagItem, l.mt10, {position: 'relative'}]}
            activeOpacity={0.7}>
            <View style={styles.numberOfOrder}>
              <Text style={[{color: c.red800}, t.pSM]}>{orders.length}</Text>
            </View>
            <VectorIcon
              size={30}
              color={c.red800}
              name="bag"
              type={IconType.custom}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={_onDelete}
          style={styles.bagItem}
          activeOpacity={0.7}>
          <VectorIcon
            size={42}
            color={c.blue600}
            name="delete-outline"
            type={IconType.material}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(SelectRoomItem);
