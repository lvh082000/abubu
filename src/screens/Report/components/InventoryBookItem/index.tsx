import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, t} from 'styles/shared';

interface Props {
  item: any;
  index: number;
  onItemPress?: (value: any) => void;
}

export const InventoryBookItem = React.memo(
  ({item, index, onItemPress}: Props) => {
    const onPress = () => {
      onItemPress?.(item);
    };

    return (
      <ContainerItem onPress={onPress}>
        <View>
          <Text style={[t.bold, {color: c.black1000}]}>Dầu gội</Text>
          <Text style={[{color: c.black200}]}>DHTT000001</Text>
          <Text style={[{color: c.black200}]}>Bán hàng</Text>
          <Text style={[t.bold, {color: c.green800}]}>
            03/09/2021 {`   `} 16:02
          </Text>
        </View>
        <View>
          <Text style={[t.bold, t.h5LG, {color: c.green800}, t.textRight]}>
            {toStringPrice(500000)}
          </Text>
          <Text style={[t.bold, {color: c.black1000}, t.textRight]}>SL: 1</Text>
        </View>
      </ContainerItem>
    );
  },
);
