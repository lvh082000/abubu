import React, {useState, useCallback, useRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInput,
  TextStyle,
} from 'react-native';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {c, l, t} from 'styles/shared';

interface Props {
  widgetStyles?: {
    container?: StyleProp<ViewStyle>;
    input?: StyleProp<TextStyle>;
  };
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  prefix?: string;
  maxLength?: number;
  onValueChange?: (value: number) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.py5,
    ...l.alignCtr,
    ...l.justifyBtw,
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
  },
  input: {
    height: 40,

    color: c.black1000,
    ...t.medium,
    ...t.h5,
    ...t.textCtr,
  },
  button: {
    borderRadius: 10,
    height: 40,
    width: 20,
    ...l.flexCenter,
  },
});

const RegNumber = new RegExp('^[0-9]+$');

const CounterInputComponent = React.forwardRef<TextInput, Props>(
  (
    {widgetStyles, value, step = 1, min, max, prefix, maxLength, onValueChange},
    ref,
  ) => {
    const [stateValue, setValue] = useState<number>(value ?? 0);
    const inputRef = useRef<TextInput>(null);

    const onReducer = useCallback(() => {
      const value = stateValue - step;
      if (typeof min === 'number') {
        if (min <= value) {
          setValue(value);
        }
      } else {
        setValue(value);
      }
      onValueChange?.(value);
    }, [onValueChange, stateValue]);

    const onIncrease = useCallback(() => {
      const value = stateValue + step;
      if (typeof max === 'number') {
        if (max >= value) {
          setValue(value);
        }
      } else {
        setValue(value);
      }
      onValueChange?.(value);
    }, [onValueChange, stateValue]);

    const onChangeText = (text: string) => {
      const isNumber = RegNumber.test(text);
      if (isNumber) {
        const value = parseInt(text);
        if (typeof min === 'number' && typeof max === 'number') {
          if (value >= min && value <= max) {
            setValue(value);
            onValueChange?.(value);
          }
        } else {
          setValue(value);
          onValueChange?.(value);
        }
      } else {
        setValue(0);
        onValueChange?.(0);
      }
    };

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef?.current?.focus();
      },
      clear: () => {
        inputRef?.current?.clear();
      },
    }));

    return (
      <View style={[styles.container, widgetStyles?.container]}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          disabled={min === stateValue}
          onPress={onReducer}>
          <VectorIcon
            type={IconType.fontAwesome}
            name="minus"
            size={16}
            color={c.green800}
          />
        </TouchableOpacity>

        <View style={[l.flexRow, l.alignCtr]}>
          <TextInput
            ref={inputRef}
            keyboardType="numeric"
            value={stateValue.toString()}
            style={[styles.input, widgetStyles?.input]}
            onChangeText={onChangeText}
            maxLength={maxLength}
          />
          {!!prefix && <Text>{prefix}</Text>}
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          disabled={max === stateValue}
          onPress={onIncrease}>
          <VectorIcon
            type={IconType.fontAwesome}
            name="plus"
            size={16}
            color={c.green800}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

export const CounterInput = React.memo(CounterInputComponent);
