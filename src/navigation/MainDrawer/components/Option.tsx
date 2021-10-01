import Text from 'components/Text';
import VectorIcon, {VectorIconProps} from 'components/VectorIcon';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {c, l, t} from 'styles/shared';

export type OptionItemType = {
  id: number;
  title: string;
  link?: string;
  icon: VectorIconProps;
  screen?: string | undefined;
};

interface Props {
  onPress?: (link: string | undefined, screen: string | undefined) => void;
  item: OptionItemType;
}

const Option = ({onPress, item}: Props) => {
  const onItem = () => {
    onPress?.(item.link ?? undefined, item.screen);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onItem}>
      <View style={styles.boxIcon}>
        <VectorIcon {...item.icon} />
      </View>
      <Text style={styles.textTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.pl10,
    ...l.py10,
  },
  boxIcon: {
    width: 30,
    ...l.alignCtr,
  },
  textTitle: {
    color: c.white,
    ...l.pl10,
    fontFamily: t.fontFamily.Winston.Regular,
  },
});

export default Option;
