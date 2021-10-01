import React, {useCallback, useState} from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleProp,
  Keyboard,
} from 'react-native';
import Text from 'components/Text';
import {l, c, t} from 'styles/shared';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {ErrorMessage} from './ErrorMessage';

type TypeCheck = 'square' | 'circle';

export type RadioOption = {
  value: string | number;
  title: string;
  canUncheck?: boolean;
};

interface Props {
  type?: TypeCheck;
  options: Array<RadioOption>;
  widgetStyles?: {
    container?: StyleProp<ViewStyle>;
    option?: StyleProp<ViewStyle>;
  };
  value?: string | number | undefined;
  onChangeValue?: (value: string | number | undefined) => void;
  rightComponent?: (index: number) => JSX.Element;
  error?: string;
  touched?: boolean;
}

const CheckSize = 25;

const styles = {
  container: {},
  optionItem: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.mt0,
    ...l.mb20,
    ...l.pb10,
  },
  checkContainer: {
    width: CheckSize,
    height: CheckSize,
    borderRadius: CheckSize / 2,
    borderColor: c.green800,
    ...l.flexCenter,
    backgroundColor: c.white,
    borderWidth: 1,
  },
  checkSquareContainer: {
    width: CheckSize,
    height: CheckSize,
    borderColor: c.grey1000,
    ...l.flexCenter,
    backgroundColor: c.white,
    borderWidth: 1,
    borderRadius: 3,
  },
  checkActive: {
    width: CheckSize - 5,
    height: CheckSize - 5,
    borderRadius: (CheckSize - 5) / 2,
    backgroundColor: c.green800,
  },
  title: {
    ...t.medium,
    ...l.ml10,
    ...t.h5,
  },
};

export const Radio = ({
  type,
  options,
  value,
  widgetStyles,
  error,
  touched,
  onChangeValue,
  rightComponent,
}: Props) => {
  const [selected, setSelectedValue] = useState<string | number | undefined>(
    value,
  );
  const onPress = useCallback(
    (item: RadioOption) => {
      Keyboard.dismiss();
      const canUncheck = !!item.canUncheck;

      if (item.value === selected) {
        if (!canUncheck) {
          return;
        }
        setSelectedValue(undefined);
        onChangeValue?.(undefined);
      } else {
        setSelectedValue(item.value);
        onChangeValue?.(item.value);
      }
    },
    [selected, onChangeValue],
  );

  const renderRightComponent = (index: number) => {
    if (!rightComponent) {
      return null;
    }
    return rightComponent(index);
  };

  const renderOption = (item: RadioOption, index: number) => {
    return (
      <View style={[styles.optionItem, widgetStyles?.option]} key={index}>
        <TouchableOpacity
          onPress={() => onPress(item)}
          activeOpacity={0.7}
          style={[l.flexRow, l.alignCtr]}>
          {type === 'square' && (
            <View style={styles.checkSquareContainer}>
              {selected === item.value && (
                <VectorIcon
                  type={IconType.fontAwesome}
                  name="check"
                  size={16}
                  color={c.green800}
                />
              )}
            </View>
          )}
          {type === 'circle' && (
            <View style={styles.checkContainer}>
              {selected === item.value && <View style={styles.checkActive} />}
            </View>
          )}
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
        {renderRightComponent(index)}
      </View>
    );
  };
  return (
    <View style={[styles.container, widgetStyles?.container]}>
      {options.map(renderOption)}
      <ErrorMessage touched={touched} error={error} />
    </View>
  );
};
