import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import {l, c} from 'styles/shared';

interface Props {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children: JSX.Element | Array<JSX.Element>;
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
});

export const ContainerItem = React.memo(({style, children, onPress}: Props) => {
  const _onPress = () => {
    onPress?.();
  };
  if (!!onPress) {
    return (
      <TouchableOpacity
        onPress={_onPress}
        disabled={!onPress}
        activeOpacity={0.7}
        style={[styles.container, style]}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.container, style]}>{children}</View>;
});
