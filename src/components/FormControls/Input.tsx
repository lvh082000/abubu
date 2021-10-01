import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleProp, TextInput, TextStyle, ViewStyle} from 'react-native';
import {VectorIconProps} from 'components/VectorIcon';
import {c, t, l} from 'styles/shared';
import {ErrorMessage} from './ErrorMessage';
import {
  FloatingLabelInput,
  FloatingLabelProps,
} from 'react-native-floating-label-input';
import {StyleSheet} from 'react-native';
import {transparentize} from 'color2k';

export interface InputProps extends FloatingLabelProps {
  error?: string;
  widgetStyles?: {
    container?: StyleProp<ViewStyle>;
    input?: StyleProp<TextStyle>;
  };
  icon?: VectorIconProps;
  touched?: boolean;
  focusedColor?: string;
  borderColor?: string;
  textColor?: string;
}

const styles = StyleSheet.create({
  container: {
    ...l.mb20,
    borderBottomWidth: 1,
    paddingBottom: 0,
  },
  input: {
    fontFamily: t.fontFamily.Winston.Medium,
    height: 50,
    marginBottom: -5,
  },
});

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      hint,
      onChangeText,
      value,
      widgetStyles,
      icon,
      error,
      touched,
      multiline,
      secureTextEntry,
      label,
      hintTextColor = c.black400,
      focusedColor = c.grey1000,
      borderColor = c.green800,
      textColor = c.black400,
      editable,
      maskType,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);
    const handleChange = (value: string) => {
      onChangeText?.(value);
    };
    const hasError = error && touched;

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      focus: () => inputRef?.current?.focus(),
      clear: () => {
        inputRef?.current?.clear();
      },
    }));

    return (
      <>
        <FloatingLabelInput
          {...rest}
          ref={inputRef}
          editable={editable}
          hint={hint}
          label={label}
          value={value}
          onChangeText={handleChange}
          allowFontScaling={false}
          hintTextColor={hasError ? c.red800 : hintTextColor}
          containerStyles={{
            ...styles.container,
            borderBottomColor: hasError ? c.red800 : borderColor,
          }}
          customLabelStyles={{
            colorFocused: hintTextColor,
            colorBlurred: hintTextColor,
            leftFocused: 1,
          }}
          labelStyles={{
            fontFamily: t.fontFamily.Winston.Medium,
          }}
          inputStyles={{
            ...styles.input,
            //@ts-ignore
            ...widgetStyles?.input,
            color: hasError ? c.red800 : textColor,
          }}
          autoCorrect={!!rest.autoCorrect}
          selectionColor={transparentize(textColor, 0.7)}
          staticLabel={true}
        />
        <ErrorMessage touched={touched} error={error} />
      </>
    );
  },
);
