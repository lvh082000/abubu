import {TouchableOpacity} from 'react-native';
import React from 'react';
import Text from 'components/Text';
import {l, c, t} from 'styles/shared';
import styles from './styles';

interface TabItemProps {
  index: number;
  isFocused: boolean;
  label: string;
  icon: JSX.Element;
  onPress: () => void;
  onLongPress: () => void;
}

export function TabItem({
  index,
  isFocused,
  label,
  icon,
  onPress,
  onLongPress,
}: TabItemProps) {
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.item,
        {
          backgroundColor: isFocused ? c.green300 : c.white,
          borderLeftWidth: index === 1 ? 1 : 0,
          borderRightWidth: index === 1 ? 1 : 0,
        },
      ]}>
      {React.cloneElement(icon, {
        color: isFocused ? c.white : c.green300,
      })}
      <Text
        style={[
          t.textCtr,
          l.ml5,
          {
            color: isFocused ? c.white : c.green300,
            fontFamily: t.fontFamily.Winston.Medium,
          },
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
