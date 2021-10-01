import React, {useState, useCallback, useRef} from 'react';
import {Select, SelectProps} from './Select';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {c, l, t} from 'styles/shared';
import {TouchableOpacity, View} from 'react-native';
import DeviceHelper from 'config/DeviceHelper';
import Dayjs from 'dayjs';
import {useBottomSheet} from 'components/BottomSheet';
import Text from 'components/Text';
//@ts-ignore
interface Props
  extends SelectProps,
    Omit<DatePickerProps, 'onDateChange' | 'date'> {
  onValueChange?: (value: number) => void;
  value: number;
}

interface DatePickerBottomSheetProps extends DatePickerProps {
  onSelect: () => void;
  onClose: () => void;
  label: string;
}

const customParseFormat = require('dayjs/plugin/customParseFormat');
Dayjs.extend(customParseFormat);

const DatePickerBottomSheet = React.memo(
  ({
    onClose,
    onSelect,
    onDateChange,
    mode,
    minimumDate,
    maximumDate,
    date,
    label,
  }: DatePickerBottomSheetProps) => {
    return (
      <View style={{backgroundColor: c.white}}>
        <View
          style={[
            l.flexRow,
            l.alignCtr,
            l.justifyBtw,
            l.px20,
            l.mt20,
            l.pb20,
            {borderBottomWidth: 1, borderBottomColor: c.grey100},
          ]}>
          <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
            <Text style={[l.px10, t.h5, t.bold, {color: c.red800}]}>Đóng</Text>
          </TouchableOpacity>
          <Text style={[t.h5, t.bold]}>{label}</Text>
          <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
            <Text style={[l.px10, t.h5, t.bold, {color: c.green800}]}>
              Chọn
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          locale={'vi'}
          mode={mode}
          style={{minWidth: DeviceHelper.width}}
          date={date}
          onDateChange={onDateChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      </View>
    );
  },
);

export const DateTimePicker = React.memo(
  ({
    value,
    error,
    touched,
    placeholder,
    mode,
    maximumDate,
    minimumDate,
    label,
    hint,
    onValueChange,
  }: Props) => {
    const formater = mode === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY - HH:mm';
    const {showBottomSheet, dismissBottomSheet} = useBottomSheet();
    const [date, setDate] = useState(value ?? new Date().getTime());
    const selectedDate = useRef<number>(date);

    const onSelectPress = () => {
      showBottomSheet(
        <DatePickerBottomSheet
          date={new Date(date)}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          label={label}
          mode={mode}
          onClose={dismissBottomSheet}
          onSelect={onSelect}
          onDateChange={onDateChange}
        />,
      );
    };

    const onSelect = useCallback(() => {
      const value = selectedDate.current;
      dismissBottomSheet();
      setDate(value);
      onValueChange?.(value);
    }, [date]);

    const onDateChange = useCallback((date: Date) => {
      selectedDate.current = date.getTime();
    }, []);

    return (
      <Select
        onSelectPress={onSelectPress}
        placeholder={placeholder}
        touched={touched}
        error={error}
        value={Dayjs(date).format(formater)}
        type={'date-picker'}
        label={label}
        hint={hint}
      />
    );
  },
);
