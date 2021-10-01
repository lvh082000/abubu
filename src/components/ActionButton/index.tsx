import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import {useBottomAction} from 'hooks/useBottomAction';

const styles = StyleSheet.create({
  container: {
    width: 30,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },
  dotStyles: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: '#EF342F',
    borderRadius: 5,
    top: -2,
    right: 1,
  },
});

interface Props {
  options: Array<string>;
  initialIndex?: number;
  useReset?: boolean;
  style?: StyleProp<ViewStyle>;
  dotStyle?: StyleProp<ViewStyle>;
  children: JSX.Element;
  onReset?: () => void;
  onSelect?: (value: string) => void;
}

const RESET_TEXT = 'Đặt lại mặc định';
const ActionButton = React.memo(
  ({
    options,
    style,
    children,
    initialIndex = 0,
    useReset,
    dotStyle,
    onSelect,
    onReset,
  }: Props) => {
    const {showBottomActions} = useBottomAction();
    const [activeIndex, setIndex] = useState(initialIndex);

    const onPress = () => {
      if (useReset && !options.find(v => v === RESET_TEXT)) {
        options.push(RESET_TEXT);
      }
      showBottomActions({options, initialIndex: activeIndex}, buttonIndex => {
        if (useReset) {
          if (buttonIndex === options.length - 1) {
            setIndex(initialIndex);
            onReset?.();
          } else {
            setIndex(buttonIndex);
            onSelect?.(options[buttonIndex]);
          }
        } else {
          setIndex(buttonIndex);
          onSelect?.(options[buttonIndex]);
        }
      });
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, style]}
        activeOpacity={0.7}>
        {children}
        {activeIndex !== initialIndex && (
          <View style={[styles.dotStyles, dotStyle]} />
        )}
      </TouchableOpacity>
    );
  },
);

export default ActionButton;
