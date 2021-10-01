import {NavigationNext} from 'components/SharedIcons';
import Text from 'components/Text';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View, TouchableOpacity} from 'react-native';
import {l, c, t} from 'styles/shared';

interface Props {
  icon: JSX.Element;
  value: string;
  placeholder: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.py15,
    ...l.px20,
    ...l.justifyBtw,
    backgroundColor: c.white,
  },
});

const OrderedNavigationButton = ({
  icon,
  value,
  placeholder,
  onPress,
}: Props) => {
  const _onPress = () => {
    onPress?.();
  };
  return (
    <View style={styles.container}>
      <View style={[l.flexRow, l.alignCtr]}>
        {icon}
        <Text style={[t.h5, l.ml5, {color: c.green800}]}>{value}</Text>
      </View>
      <TouchableOpacity
        onPress={_onPress}
        activeOpacity={0.7}
        style={[l.flexRow, l.alignCtr]}>
        <Text style={l.mr5}>{placeholder}</Text>
        <NavigationNext color={c.green800} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(OrderedNavigationButton);
