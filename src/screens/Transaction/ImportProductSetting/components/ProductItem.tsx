import Text from 'components/Text';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {l, c, t} from 'styles/shared';
import {NonAvatar} from 'components/Avatar';
import {ProductDetailsType} from 'types/Responses/FetchReadProductResponse';
import NetImage from 'components/NetImage';

const styles = StyleSheet.create({
  container: {
    ...l.px20,
    ...l.alignCtr,
    ...l.flexRow,
    ...l.justifyBtw,
    ...l.py15,
    backgroundColor: c.white,
  },
});

interface Props {
  product: ProductDetailsType;
}

const ProductItem = ({product}: Props) => {
  const renderImage = () => {
    if (product.avatar?.startsWith('http')) {
      return (
        <NetImage
          style={{width: 40, height: 40, borderRadius: 5}}
          source={{uri: product.avatar}}
        />
      );
    }
    return <NonAvatar name={product.name} />;
  };
  return (
    <View style={[{backgroundColor: c.grey100}, l.pb20]}>
      <TouchableOpacity activeOpacity={0.7} style={styles.container}>
        <View style={[l.flexRow]}>
          {renderImage()}
          <View style={[l.ml10]}>
            <Text>{product.name}</Text>
            <Text style={[t.bold, {color: c.green800}]}>{product.barcode}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(ProductItem);
