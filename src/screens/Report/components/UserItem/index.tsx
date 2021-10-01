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

export const UserItem = React.memo(({item, index, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text style={[t.bold, {color: c.black1000}]}>DHTT000001</Text>
        <Text style={[t.bold, {color: c.black1000}]}>Nguyễn Văn A</Text>
        <Text style={[t.bold, {color: c.green800}]}>
          03/09/2021 {`   `} 16:02
        </Text>
      </View>
      <View>
        <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
          {' '}
          {toStringPrice(500000)}
        </Text>
      </View>
    </ContainerItem>
  );
});
