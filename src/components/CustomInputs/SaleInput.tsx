import {Input} from 'components/FormControls';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import {useFormikContext} from 'formik';
import React, {useCallback, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import {l, c} from 'styles/shared';

interface PriceUnitInputProps {
  hint: string;
  label: string;
  error?: string;
  touched?: boolean;
  title: string;
  value: string;
  isPercent: boolean;
  max?: number;
  onToggleChange: (value: boolean) => void;
  onValueChange: (value: string) => void;
}

interface SaleInputProps {
  total: number;
  fieldName: string;
  title: string;
  hint: string;
}

interface TogglePriceUnitProps {
  isPercent: boolean;
  onValueChange?: (value: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    ...l.flexRow,
    ...l.mb10,
    ...l.alignCtr,
    ...l.justifyBtw,
  },
  btn: {
    ...l.flex,
    ...l.px5,
    ...l.py5,
    ...l.flexCenter,
    borderRadius: 4,
  },
  toggleContainer: {
    ...l.flexRow,
    ...l.justifyBtw,
    width: 80,
    borderWidth: 1,
    borderColor: c.grey1000,
    borderRadius: 5,
  },
});

const PriceUnitToggle = React.memo(
  ({isPercent, onValueChange}: TogglePriceUnitProps) => {
    const onLeftPress = () => {
      onValueChange?.(false);
    };

    const onRightPress = () => {
      onValueChange?.(true);
    };

    return (
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.btn,
            {backgroundColor: !isPercent ? c.green800 : c.white},
          ]}
          onPress={onLeftPress}>
          <VectorIcon
            type={IconType.material}
            name="attach-money"
            size={20}
            color={!isPercent ? c.white : c.black1000}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.btn,

            {backgroundColor: isPercent ? c.green800 : c.white},
          ]}
          onPress={onRightPress}>
          <VectorIcon
            type={IconType.feather}
            name="percent"
            size={20}
            color={isPercent ? c.white : c.black1000}
          />
        </TouchableOpacity>
      </View>
    );
  },
);

const PriceUnitInput = React.memo(
  ({
    hint,
    label,
    error,
    touched,
    title,
    value,
    isPercent,
    max,
    onToggleChange,
    onValueChange,
  }: PriceUnitInputProps) => {
    const maxLengthForMoney = max ? toStringPrice(max).length - 1 : undefined;

    return (
      <>
        <View style={styles.container}>
          <Text>{title}</Text>
          <PriceUnitToggle
            onValueChange={onToggleChange}
            isPercent={isPercent}
          />
        </View>

        <Input
          hint={hint}
          label={label}
          value={value}
          error={error}
          touched={touched}
          onChangeText={onValueChange}
          keyboardType="numeric"
          maskType={isPercent ? undefined : 'currency'}
          maxLength={isPercent ? 3 : maxLengthForMoney}
        />
      </>
    );
  },
);

function SaleInputComponent({total, fieldName, title, hint}: SaleInputProps) {
  const [isToggle, setToggle] = useState<boolean>(false);
  const [inputValue, setValue] = useState<string>('');
  const {errors, setFieldValue, setFieldError} = useFormikContext<any>();

  /* Change isToggle, if it is a new value, the input value will be reset  */

  const onToggleChange = useCallback(
    (value: boolean) => {
      setToggle(value);
      if (isToggle !== value) {
        setValue('');
      }
    },
    [isToggle],
  );

  /* Change input text value & validate error message & set formik value */

  const onValueChange = useCallback(
    (value: string) => {
      setValue(value);
      if (isToggle) {
        const numValue = parseInt(value ?? 0);
        const discount = Math.round(total * (numValue / 100));
        setFieldValue(fieldName, discount);
        if (numValue > 100) {
          setFieldError(fieldName, 'Giá trị phải nhỏ hơn 100');
        } else {
          setFieldError(fieldName, '');
        }
      } else {
        const numValue = toNumberPrice(value ?? 0);
        setFieldValue(fieldName, numValue);
        if (numValue > total) {
          setFieldError(
            fieldName,
            `Số tiền không được vượt quá ${toStringPrice(total)}`,
          );
        } else {
          setFieldError(fieldName, '');
        }
      }
    },
    [isToggle, total],
  );

  return (
    <PriceUnitInput
      isPercent={isToggle}
      value={inputValue}
      title={title}
      hint={hint}
      label="Giá trị"
      //@ts-ignore
      error={errors[fieldName]}
      touched={true}
      max={total}
      onValueChange={onValueChange}
      onToggleChange={onToggleChange}
    />
  );
}

export const SaleInput = React.memo(SaleInputComponent);
