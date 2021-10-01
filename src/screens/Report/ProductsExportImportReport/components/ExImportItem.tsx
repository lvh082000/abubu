import {NonAvatar} from 'components/Avatar';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';

interface Props {
  item: any;
  isSelected?: boolean;
  onItemPress?: (value: any) => void;
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
    width: 30,
    height: 30,
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

export const ExImportItem = React.memo(
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
          {!isSelected && <NonAvatar name="D" size={30} />}
          {isSelected && <CheckedContainer />}
          <View style={[l.ml10]}>
            <Text style={[t.bold, t.pSM]}>Dầu gội</Text>
            <Text style={[t.bold, {color: c.green800}, t.pSM]}>SP000001</Text>
          </View>

          <View style={[l.flexRow, l.justifyBtw, l.flex, l.ml20]}>
            <View>
              <Text style={[{color: c.blue500}, t.pSM]}>
                Nhập: {toStringPrice(2000000)}
              </Text>
              <Text style={[{color: c.blue500}, t.pSM]}>Số lượng: 10</Text>
            </View>

            <View style={[]}>
              <Text style={[{color: c.red800}, t.pSM]}>
                Xuất: {toStringPrice(2000000)}
              </Text>
              <Text style={[{color: c.red800}, t.pSM]}>Số lượng: 10</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);
