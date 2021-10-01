import React from 'react';
import {Text, View, TouchableOpacity, LayoutChangeEvent} from 'react-native';
import {l, c, t} from 'styles/shared';
import NetImage from 'components/NetImage';
import DeviceHelper from 'config/DeviceHelper';
import {StyleSheet} from 'react-native';

interface ListProps {
  item: any;
  index: number;
  onLayout: (e: LayoutChangeEvent) => void;
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: c.grey1000,
    ...l.flexRow,
    ...l.wrap,
    ...l.pt20,
  },
  item: {
    width: 80,
    height: 90,
    ...l.alignCtr,
  },
  image: {
    width: 50,
    height: 50,
  },
});

const Product = React.memo(({item, index}: any) => {
  const marginHorizontal = (DeviceHelper.width - 90 - 80 * 3) / 6 - 1.5;
  return (
    <TouchableOpacity key={index} style={[styles.item, {marginHorizontal}]}>
      <NetImage style={styles.image} source={{uri: item.image}} />
      <Text style={[l.mt10, t.textCtr]}>{item.name}</Text>
    </TouchableOpacity>
  );
});

const ListItem = React.memo(({item, index, onLayout}: ListProps) => {
  const renderProduct = (value: any, index: number) => {
    return <Product key={index} item={value} index={index} />;
  };

  return (
    <View
      onLayout={onLayout}
      key={index}
      style={[styles.container, {borderTopWidth: index === 0 ? 0 : 4}]}>
      {item.products.map(renderProduct)}
    </View>
  );
});

export default ListItem;
