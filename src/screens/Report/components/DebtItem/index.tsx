import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {toStringPrice} from 'services/UtilService';
import {c, l, t} from 'styles/shared';

interface Props {
  type: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.mx20,
    ...l.py25,
    ...l.px20,
    ...l.mb20,
    ...l.flexRow,
    ...l.justifyBtw,
    borderWidth: 1,
    borderColor: c.green800,
    borderRadius: 5,
  },
  btnMore: {
    ...l.abs,
    ...l.pinB,
    right: 5,
  },
});

export const DebtItem = React.memo(({type, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          t.bold,
          {color: type === 'thu' || type === 'nhập' ? c.blue500 : c.red800},
        ]}>
        {type === 'thu' && 'PHẢI THU'}
        {type === 'trả' && 'PHẢI TRẢ'}
        {type === 'nhập' && 'GIÁ TRỊ NHẬP KHO'}
        {type === 'xuất' && 'GIÁ TRỊ XUẤT KHO'}
      </Text>
      <Text
        style={[
          t.bold,
          {color: type === 'thu' || type === 'nhập' ? c.blue500 : c.red800},
        ]}>
        {toStringPrice(10000000)}đ
      </Text>
      {onPress && (
        <TouchableOpacity
          style={styles.btnMore}
          onPress={onPress}
          activeOpacity={0.7}>
          <VectorIcon
            type={IconType.antDesign}
            name="caretdown"
            size={24}
            color={c.black200}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
