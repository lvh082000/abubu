import {CounterInput} from 'components/FormControls';
import {ContainerItem} from 'components/ListItems';
import {useSpinner} from 'components/Spinner';
import Text from 'components/Text';
import debounce from 'lodash/debounce';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {ProductService} from 'services/ProductService';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {CreateOrUpdateProductFormValues} from 'types/Properties';
import {ProductItemType} from 'types/Responses/FetchGetProductsResponse';

interface Props {
  item: ProductItemType;
  value: number;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexCenter,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
});

const PriceItem = ({item, value}: Props) => {
  const spinner = useSpinner();

  const onValueChangeDelay = debounce(async (value: number) => {
    try {
      spinner.show();
      const {data} = await ProductService.fetchGetProduct(item.id);
      const {name, quantity, costPrice, images} = data;
      const values = {
        name,
        sellPrice: value.toString(),
        quantity: quantity.toString(),
        costPrice: costPrice.toString(),
        uploadedImages: [],
        removedImages: [],
        id: item.id,
        images: images,
      } as CreateOrUpdateProductFormValues;
      await ProductService.fetchCreateOrUpdateProduct(values);
    } catch (error) {
      console.log('[ERROR] onValueChangeDelay', error);
    } finally {
      spinner.dismiss();
    }
  }, 300);

  const onValueChange = useCallback(onValueChangeDelay, []);

  return (
    <ContainerItem>
      <View style={{width: 120}}>
        <Text style={[{width: 110}]}>{item.name}</Text>
        <Text style={[t.bold, {color: c.green800, width: 110}]}>
          {item.barcode}
        </Text>
      </View>
      <View style={{width: 100}}>
        <Text>{toStringPrice(item.costPrice)}</Text>
      </View>
      <View style={l.flex}>
        {value === -1 ? (
          <CounterInput
            onValueChange={onValueChange}
            step={10000}
            value={item.price}
          />
        ) : (
          <View style={[styles.container]}>
            <Text>{item.price}</Text>
          </View>
        )}
      </View>
    </ContainerItem>
  );
};

export default React.memo(PriceItem);
