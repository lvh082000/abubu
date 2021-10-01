import {PlusIcon} from 'components/SharedIcons';
import Text from 'components/Text';
import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {CashBookService} from 'services/CashBookService';
import {c, l, t} from 'styles/shared';
import {CashBookReceiptType} from 'types/Properties';
import capitalize from 'lodash/capitalize';

interface Props {
  onPress?: (type: CashBookReceiptType) => void;
  type: CashBookReceiptType;
}

const styles = StyleSheet.create({
  button: {
    ...l.flex,
    ...l.py15,
    ...l.flexRow,
    ...l.flexCenter,
    ...l.mx20,
    borderRadius: 5,
  },
  text: {
    ...l.ml10,
    ...t.bold,
    ...t.h5,
    color: c.white,
  },
});

export const InputOrOutputButton = React.memo(({type, onPress}: Props) => {
  const bgStyle = useMemo(() => {
    if (type === CashBookReceiptType.Input) {
      return {backgroundColor: c.green200};
    }
    return {
      backgroundColor: c.purple400,
    };
  }, [type]);
  const title = useMemo(() => {
    const value = CashBookService.getReceiptNameType(type);
    return capitalize(value);
  }, [type]);

  const _onPress = () => {
    onPress?.(type);
  };
  return (
    <TouchableOpacity
      style={[styles.button, bgStyle]}
      activeOpacity={0.7}
      onPress={_onPress}>
      <PlusIcon size={16} color={c.white} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
});
