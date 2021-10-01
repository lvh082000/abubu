import DeviceHelper from 'config/DeviceHelper';
import {useKeyboardListener} from 'hooks/useKeyboardListener';
import React from 'react';
import {useMemo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {l, c, t} from 'styles/shared';

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: c.grey100,
    elevation: 5,
    ...l.pt15,
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.px20,
  },
});
const FooterButtonContainer = React.memo(
  ({
    style,
    children,
  }: {
    style?: StyleProp<ViewStyle>;
    children: JSX.Element | JSX.Element[];
  }) => {
    const {bottom} = useSafeAreaInsets();
    const visible = useKeyboardListener();

    const getPaddingBottom = useMemo(() => {
      if (!DeviceHelper.isIOS) {
        if (bottom < 15) {
          return 15;
        }
        return bottom;
      }
      if (visible) {
        return 15;
      }
      return bottom;
    }, [visible, bottom]);

    return (
      <View
        style={[styles.container, style, {paddingBottom: getPaddingBottom}]}>
        {children}
      </View>
    );
  },
);

export default FooterButtonContainer;
