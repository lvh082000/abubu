import {Input} from 'components/FormControls';
import Text from 'components/Text';
import {useFormikContext} from 'formik';
import React from 'react';
import {l, t, c} from 'styles/shared';
import {Radio} from 'components/FormControls';
import {UOMType} from 'types/Properties';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {toNumberPrice, toStringPrice} from 'services/UtilService';
import VectorIcon, {IconType} from 'components/VectorIcon';

interface TogglePriceUnitProps {
  isPercent: boolean;
  onValueChange?: (value: boolean) => void;
}

interface FormValues {
  uom: UOMType;
  value: string;
}

interface UOMRadioProps {
  title?: string;
}

interface InputProps {
  label?: string;
  hint?: string;
  inputStyle?: StyleProp<TextStyle>;
  total?: number;
}

interface Props extends InputProps, UOMRadioProps {}

const styles = StyleSheet.create({
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

const PriceValues = [
  {title: 'Phần trăm', value: 'percent'},
  {title: 'Tiền', value: 'cash'},
];

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

const ValueInput = ({
  label = 'Giá trị',
  hint = 'Nhập giá trị',
  total = 0,
  inputStyle,
}: InputProps) => {
  const {
    values,
    setFieldValue,
    setFieldError,
    touched,
    errors,
    setFieldTouched,
  } = useFormikContext<FormValues>();

  const onChangeText = (text: string) => {
    if (!touched.value) {
      setFieldTouched('value', true);
    }
    setFieldValue('value', text, false);

    if (values.uom === 'percent') {
      if (!!text) {
        if (parseInt(text) > 100) {
          setFieldError('value', 'Giá trị phải nhỏ hơn 100');
        } else {
          setFieldError('value', '');
        }
      }
    }

    if (values.uom === 'cash' && total > 0) {
      if (!!text) {
        if (toNumberPrice(text) > total) {
          setFieldError(
            'value',
            `Số tiền phải nhỏ hơn ${toStringPrice(total)}`,
          );
        } else {
          setFieldError('value', '');
        }
      }
    }
  };

  return (
    <Input
      label={label}
      value={values.value}
      hint={hint}
      onChangeText={onChangeText}
      keyboardType="numeric"
      touched={touched.value}
      error={errors.value}
      maskType={values.uom === 'cash' ? 'currency' : undefined}
      widgetStyles={{input: inputStyle}}
    />
  );
};

const UOMRadioInput = ({title = 'Chọn loại giá trị'}: UOMRadioProps) => {
  const {values, setFieldValue} = useFormikContext<FormValues>();

  const onValueChange = (isPercent: boolean) => {
    const value = isPercent ? 'percent' : 'cash';
    if (value !== values.uom) {
      setFieldValue('uom', value);
      setFieldValue('value', '');
    }
  };

  return (
    <View style={[l.flexRow, l.alignCtr, l.justifyBtw, l.mb10]}>
      <Text style={[t.medium, l.mb10]}>{title}</Text>
      <PriceUnitToggle
        isPercent={values.uom === 'percent'}
        onValueChange={onValueChange}
      />
    </View>
  );

  // return (
  //   <>
  //     <Text style={[t.medium, l.mb10]}>{title}</Text>
  //     <Radio
  //       value={values.uom}
  //       onChangeValue={onChangeValue}
  //       widgetStyles={{
  //         container: [l.flexRow],
  //         option: [l.flex, l.mb10],
  //       }}
  //       type="square"
  //       options={PriceValues}
  //     />
  //   </>
  // );
};

export const UOMInput = React.memo(
  ({title, label, hint, inputStyle, total}: Props) => {
    return (
      <>
        <UOMRadioInput title={title} />
        <ValueInput
          total={total}
          inputStyle={inputStyle}
          hint={hint}
          label={label}
        />
      </>
    );
  },
);
