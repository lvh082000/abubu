import Text from 'components/Text';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {ProductIntentoryItem} from 'types/Properties';

interface Props {
  data: Array<ProductIntentoryItem>;
  onPressItem?: (item: ProductIntentoryItem) => void;
  onDeleteItem?: (item: ProductIntentoryItem) => void;
}

interface ItemProps {
  item: ProductIntentoryItem;
  onPress?: (item: ProductIntentoryItem) => void;
  onDelete?: (item: ProductIntentoryItem) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.px20,
    ...l.flex,
  },
  viewColumn: {
    width: 80,
  },
  headerContainer: {
    ...l.flexRow,
    ...l.mt10,
    ...l.pb10,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
  },
  itemContainer: {
    ...l.flexRow,
    ...l.pt10,
    ...l.pb15,
    borderTopWidth: 1,
    borderTopColor: c.green800,
  },
});

const Header = React.memo(({data}: {data: Array<ProductIntentoryItem>}) => {
  const total = useMemo(() => {
    return data.reduce((result, item) => {
      return (result += item.quantity);
    }, 0);
  }, [data]);

  const actual = useMemo(() => {
    return data.reduce((result, item) => {
      return (result += item.actual);
    }, 0);
  }, [data]);

  return (
    <View style={styles.headerContainer}>
      <View style={[l.flex]}>
        <Text style={[t.bold, t.h5]}>Hàng kiểm</Text>
        <Text style={[l.mt10]}>{data.length}</Text>
      </View>

      <View style={styles.viewColumn}>
        <Text style={[t.bold, t.textRight, t.h5]}>Tồn kho</Text>
        <Text style={[l.mt10, t.textCtr]}>{total}</Text>
      </View>

      <View style={styles.viewColumn}>
        <Text style={[t.bold, t.textRight, t.h5]}>Thực tế</Text>
        <Text style={[l.mt10, t.textCtr]}>{actual}</Text>
      </View>

      <View style={styles.viewColumn}>
        <Text style={[t.bold, t.textRight, t.h5]}>Lệch</Text>
        <Text style={[l.mt10, t.textRight]}>{actual - total}</Text>
      </View>
    </View>
  );
});

const Item = React.memo(({item, onPress, onDelete}: ItemProps) => {
  const _onPress = () => {
    onPress?.(item);
  };

  const _onDelete = () => {
    onDelete?.(item);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={0.7}
        onPress={_onPress}>
        <View style={[l.flex]}>
          <Text>{item.name}</Text>
          <Text style={[l.mt10, {color: c.green800}, t.bold]}>
            {item.barcode}
          </Text>
          {onDelete && (
            <TouchableOpacity
              style={[l.py5, {borderWidth: 1, borderColor: c.green800}, l.mt5]}
              activeOpacity={0.7}
              onPress={_onDelete}>
              <Text style={[t.textCtr, t.bold, {color: c.red800}]}>XÓA</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.viewColumn}>
          <Text style={[t.textRight]}>Tồn kho</Text>
          <Text style={[l.mt10, t.textCtr]}>{item.quantity}</Text>
        </View>

        <View style={styles.viewColumn}>
          <Text style={[t.textRight]}>Thực tế</Text>
          <View style={l.ml10}>
            <Text style={[l.mt10, t.textCtr, {borderWidth: 1}, l.mx5, l.px5]}>
              {item.actual}
            </Text>
          </View>
        </View>

        <View style={styles.viewColumn}>
          <Text style={[t.textRight]}>Lệch</Text>
          <Text style={[l.mt10, t.textRight]}>
            {item.actual - item.quantity}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
});

const InventoryList = ({data, onPressItem, onDeleteItem}: Props) => {
  return (
    <View style={styles.container}>
      <Header data={data} />
      {data.map((item, index) => (
        <Item
          onPress={onPressItem}
          onDelete={onDeleteItem}
          item={item}
          key={index}
        />
      ))}
    </View>
  );
};

export default React.memo(InventoryList);
