import {CounterInput} from 'components/FormControls';
import Text from 'components/Text';
import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {l, c, t} from 'styles/shared';
import {SelectedProductType} from 'types/Properties';

const styles = StyleSheet.create({
  item: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.mt10,
    ...l.px20,
    ...l.pb10,
    borderBottomWidth: 1,
    borderBottomColor: c.grey100,
  },
});

interface ItemProps {
  item: SelectedProductType;
  index: number;
  onQuantityChange?: (value: number, index: number) => void;
}

interface Props {
  data: Array<SelectedProductType>;
  onQuantityChange?: (value: number, index: number) => void;
}

const Item = React.memo(({index, item, onQuantityChange}: ItemProps) => {
  const [quantity, setQuantity] = useState<number>(
    item?.inStock === 0 ? 0 : item.quantity,
  );

  const onValueChange = useCallback(
    value => {
      setQuantity(value);
      onQuantityChange?.(value, index);
    },
    [onQuantityChange],
  );

  return (
    <View style={styles.item}>
      <View>
        <Text
          style={[
            l.mb5,
            t.bold,
            t.h5,
            {textDecorationLine: quantity > 0 ? 'none' : 'line-through'},
          ]}>
          {item.name}
        </Text>
        <Text>{item.barcode}</Text>
        <Text style={[{color: c.green800}, t.bold]}>
          {toStringPrice(item.price)} x {quantity}
        </Text>
      </View>
      <CounterInput
        onValueChange={onValueChange}
        maxLength={3}
        min={0}
        value={quantity}
        widgetStyles={{input: {width: 50}}}
        max={item?.inStock}
      />
    </View>
  );
});

const SelectedProducts = React.memo(({data, onQuantityChange}: Props) => {
  const renderItem = (item: SelectedProductType, index: number) => {
    return (
      <Item
        onQuantityChange={onQuantityChange}
        key={item.id}
        item={item}
        index={index}
      />
    );
  };
  return <View>{data?.map(renderItem)}</View>;
});

export default SelectedProducts;
