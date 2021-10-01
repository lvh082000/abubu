import {NonAvatar} from 'components/Avatar';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {SalaryItemType} from 'types/Responses/FetchGetSalaryListResponse';

interface Props {
  item: SalaryItemType;
  isSelected?: boolean;
  onItemPress: (item: SalaryItemType) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.px20,
    ...l.alignCtr,
    borderBottomWidth: 1,
    borderBottomColor: c.green800,
    ...l.flexRow,
    ...l.justifyBtw,
    ...l.py10,
  },
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

export const PayslipItem = React.memo(
  ({item, isSelected, onItemPress}: Props) => {
    const onPress = () => {
      onItemPress?.(item);
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.container}>
        <View style={[l.flexRow, l.alignCtr]}>
          {!isSelected && <NonAvatar name="Hiếu" type="circle" />}
          {isSelected && <CheckedContainer />}
          <View style={[l.ml10]}>
            <Text style={[{color: c.black1000}]}>{item.personnelName}</Text>
            <Text style={[{color: c.black1000}, l.mb5]}>
              {item.personnelCode}
            </Text>
            <Text style={[t.bold, {color: c.green800}]}>
              {item.personnelPhone}
            </Text>
          </View>
        </View>
        <View style={[l.flexCenter]}>
          <Text style={[t.bold, t.h5LG, {color: c.green800}]}>
            {item.paymentRequire}
          </Text>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  },
);
