import {NavigationNext} from 'components/SharedIcons';
import Text from 'components/Text';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {l, c, t} from 'styles/shared';

interface Props {
  title: string;
  value?: number;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: c.blue50,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.px20,
    ...l.py10,
    marginBottom: 1,
  },
});

const ShippingStatusItem = ({title, value, onPress}: Props) => {
  const _onPress = () => {
    onPress?.();
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={_onPress}
      activeOpacity={0.7}>
      <Text>{title}</Text>
      <View style={[l.flexRow, l.alignCtr, l.justifyBtw]}>
        <Text style={[t.bold, l.mr5]}>{value ?? 0}</Text>
        <NavigationNext color={c.green800} />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ShippingStatusItem);
