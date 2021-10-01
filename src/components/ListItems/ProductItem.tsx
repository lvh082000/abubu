import {NonAvatar} from 'components/Avatar';
import NetImage from 'components/NetImage';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {ProductItemType} from 'types/Responses/FetchGetProductsResponse';
import {ContainerItem} from './ContainerItem';

interface Props {
  item: ProductItemType;
  index: number;
  isSelected?: boolean;
  onItemPress?: (value: ProductItemType) => void;
}
const styles = StyleSheet.create({
  checkContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: c.green400,
    ...l.flexCenter,
  },
});

const CheckedContainer = React.memo(() => {
  return (
    <View style={styles.checkContainer}>
      <VectorIcon color={c.white} type={IconType.fontAwesome} name="check" />
    </View>
  );
});

export const ProductItem = React.memo(
  ({item, index, isSelected, onItemPress}: Props) => {
    const onPress = () => {
      onItemPress?.(item);
    };

    const renderImage = () => {
      if (item.avatar && item.avatar.startsWith('http')) {
        return (
          <NetImage
            style={{width: 40, height: 40, borderRadius: 5}}
            source={{uri: item.avatar}}
          />
        );
      }
      return <NonAvatar name={item.name} />;
    };

    return (
      <ContainerItem onPress={onPress}>
        <View style={[l.flexRow]}>
          {!isSelected && renderImage()}
          {isSelected && <CheckedContainer />}
          <View style={[l.ml10]}>
            <Text>{item.name}</Text>
            <Text style={[t.bold, {color: c.green800}]}>{item.barcode}</Text>
          </View>
        </View>
        <View style={[l.flexCenter]}>
          <Text style={[t.bold, t.h5]}>{toStringPrice(item.price)}</Text>
          <View style={[l.flexRow]}>
            <View>
              <Text style={[t.pSM]}>Giá vốn</Text>
              <Text style={[t.textCtr, t.pSM]}>
                {toStringPrice(item.sellPrice)}
              </Text>
            </View>
            <View style={[l.ml10]}>
              <Text style={[t.pSM, {color: c.green800}]}>Tồn kho</Text>
              <Text style={[t.textCtr, t.pSM, {color: c.green800}]}>
                {item.quantity}
              </Text>
            </View>
          </View>
        </View>
      </ContainerItem>
    );
  },
);
