import React, {useRef, useImperativeHandle} from 'react';
import {TextInput} from 'react-native';
import NumberFormat from 'react-number-format';
import {Input, InputProps} from './Input';

export const CurrencyInput = React.forwardRef<TextInput, InputProps>(
  ({value, ...rest}, ref) => {
    const inputRef = useRef<TextInput>(null);

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      focus: () => inputRef?.current?.focus(),
      clear: () => {
        inputRef?.current?.clear();
      },
    }));
    return (
      <NumberFormat
        thousandSeparator={true}
        value={value}
        displayType={'text'}
        renderText={value => {
          return (
            <Input
              {...rest}
              currencyDivider=","
              keyboardType={'number-pad'}
              value={value}
            />
          );
        }}
      />
    );
  },
);
