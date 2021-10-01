import {NonAvatar} from 'components/Avatar';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';
import {EmployeeType} from 'types/Responses/FetchGetEmployeesResponse';

interface Props {
  item: EmployeeType;
  isSelected?: boolean;
  onItemPress: (item: EmployeeType) => void;
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

export const EmployeeItem = React.memo(
  ({item, isSelected, onItemPress}: Props) => {
    const onPress = () => {
      onItemPress(item);
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
            <Text style={[{color: c.black1000}]}>{item.fullName}</Text>
            <Text style={[{color: c.black1000}, l.mb5]}>
              {item.code ?? 'Null'}
            </Text>
            <Text style={[t.bold, {color: c.green800}]}>{item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);
