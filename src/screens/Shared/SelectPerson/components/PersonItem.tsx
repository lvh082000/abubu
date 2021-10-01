import {NonAvatar} from 'components/Avatar';
import {ContainerItem} from 'components/ListItems';
import NetImage from 'components/NetImage';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {PersonItemType} from 'types/Responses/FetchGetPersonResponseType';

interface Props {
  item: PersonItemType;
  isSelected?: boolean;
  onItemPress?: (value: PersonItemType) => void;
}
const styles = StyleSheet.create({
  checkContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
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

export const PersonItem = React.memo(
  ({item, isSelected, onItemPress}: Props) => {
    const name = item.name ?? item.fullName;
    const onPress = () => {
      onItemPress?.(item);
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
      return <NonAvatar type="circle" name={name} />;
    };

    return (
      <ContainerItem onPress={onPress}>
        <View style={[l.flexRow, l.alignCtr]}>
          {!isSelected && renderImage()}
          {isSelected && <CheckedContainer />}
          <View style={[l.ml10, l.flex]}>
            <Text style={[{color: c.black1000}]}>{name}</Text>
            <View style={[l.flexRow, l.justifyBtw]}>
              <Text style={[{color: c.black1000}, l.mb5]}>{item.code}</Text>
              <Text style={[t.bold, {color: c.green800}]}>{item.phone}</Text>
            </View>
          </View>
        </View>
      </ContainerItem>
    );
  },
);
