import {NonAvatar} from 'components/Avatar';
import {ContainerItem} from 'components/ListItems';
import NetImage from 'components/NetImage';
import Text from 'components/Text';
import React from 'react';
import {View, TextStyle, StyleProp} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';
import {PartnerItemType} from 'types/Responses/FetchGetPartnersResponse';

interface Props {
  item: PartnerItemType;
  index: number;
  onItemPress?: (id: number) => void;
  widgetStyles?: {
    moneyText?: StyleProp<TextStyle>;
  };
  title?: string;
}

export const PartnerItem = React.memo(
  ({item, onItemPress, widgetStyles, title}: Props) => {
    const onPress = () => {
      onItemPress?.(item.id);
    };

    const renderImage = () => {
      if (item.avatar && item.avatar.startsWith('http')) {
        return (
          <NetImage
            style={{width: 40, height: 40, borderRadius: 20}}
            source={{uri: item.avatar}}
          />
        );
      }
      return <NonAvatar type="circle" name={item.name} />;
    };

    return (
      <ContainerItem onPress={onPress}>
        <View style={[l.flexRow, l.alignCtr]}>
          {renderImage()}
          <View style={[l.ml10]}>
            <Text style={[{color: c.black1000}]}>{item.name}</Text>
            <Text style={[{color: c.black1000}, l.mb5]}>{item.code}</Text>
            <Text style={[t.bold, {color: c.green800}]}>{item.phone}</Text>
          </View>
        </View>
        <View style={[l.flexCenter]}>
          <Text
            style={[
              t.bold,
              t.h5LG,
              {color: c.green800},
              widgetStyles?.moneyText,
            ]}>
            {toStringPrice(item.totalTrans)}
          </Text>
          <Text>{title}</Text>
        </View>
      </ContainerItem>
    );
  },
);
