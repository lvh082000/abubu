import {ContainerItem} from 'components/ListItems';
import Text from 'components/Text';
import React from 'react';
import {View} from 'react-native';
import {c, l, t} from 'styles/shared';
import Dayjs from 'dayjs';
import {InventoryType} from 'types/Responses/FetchGetInventoryListResponse';

interface Props {
  item: InventoryType;
  index: number;
  onItemPress?: (item: InventoryType) => void;
}

const InventoryControlItem = ({item, onItemPress}: Props) => {
  const onPress = () => {
    onItemPress?.(item);
  };

  return (
    <ContainerItem onPress={onPress}>
      <View>
        <Text style={[t.bold, t.h5]}>{item.code}</Text>
        <Text style={l.mt10}>
          {Dayjs(item.createdAt * 1000).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>

      <View>
        <Text
          style={[{color: item.done ? c.brown400 : c.red900}, t.bold, t.h5]}>
          {item.done ? 'Đã cân bằng kho' : 'PHIẾU TẠM'}
        </Text>
        <Text style={[{color: c.brown400}, t.medium, l.mt10]}>
          {Dayjs(item.updateAt * 1000).format('DD/MM/YYYY HH:mm')}
        </Text>
      </View>
    </ContainerItem>
  );
};

export default React.memo(InventoryControlItem);
