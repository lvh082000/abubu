import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c} from 'styles/shared';

interface Props {
  item: any;
  index: number;
  onItemPress?: (value: any) => void;
}

export const ReportItem = React.memo(({item, index, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text>03/09/2021</Text>
      </View>
      <View>
        <Text>200000</Text>
        <Text style={[{color: c.black200}]}>0 đơn hàng</Text>
      </View>
    </ContainerItem>
  );
});
