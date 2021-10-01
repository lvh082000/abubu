import {useBottomSheet} from 'components/BottomSheet';
import {RangeCalendar} from 'components/Calendar';
import Text from 'components/Text';
import VectorIcon, {IconType} from 'components/VectorIcon';
import DayJS from 'dayjs';
import {useBottomAction} from 'hooks/useBottomAction';
import React, {useCallback, useMemo, useState} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {c, l, t} from 'styles/shared';

interface DateFilterProps {
  style?: StyleProp<ViewStyle>;
  onSelect?: (value: {start: number; end: number}) => void;
}

const OPTIONS = [
  {
    name: 'Toàn thời gian',
    id: 0,
  },
  {
    name: 'Hôm nay',
    id: 1,
  },
  {
    name: 'Hôm qua',
    id: 2,
  },

  {
    name: 'Tuần này',
    id: 3,
  },
  {
    name: 'Tuần trước',
    id: 4,
  },
  {
    name: 'Tháng này',
    id: 5,
  },
  {
    name: 'Tháng trước',
    id: 6,
  },
  {
    name: 'Tùy chọn',
    id: 7,
  },
];

const BottomSheetContainer = ({
  onDateSelect,
}: {
  onDateSelect?: (dates: string[]) => void;
}) => {
  const [dates, setDates] = useState<string[]>([]);
  const {dismissBottomSheet} = useBottomSheet();

  const onChangeDates = useCallback((dates: string[]) => {
    setDates(dates);
  }, []);

  const onSelect = () => {
    dismissBottomSheet();
    onDateSelect?.(dates);
  };

  return (
    <>
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
        <TouchableOpacity activeOpacity={0.7} onPress={dismissBottomSheet}>
          <Text style={[l.px10, t.h5, t.bold, {color: c.red800}]}>Đóng</Text>
        </TouchableOpacity>
        {dates.length === 2 && (
          <Text style={[t.h5, t.bold]}>
            {DayJS(dates[0]).format('DD/MM/YYYY')} -
            {DayJS(dates[1]).format('DD/MM/YYYY')}
          </Text>
        )}
        {dates.length === 0 && <Text>Chọn khoảng thời gian</Text>}
        <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
          <Text style={[l.px10, t.h5, t.bold, {color: c.green800}]}>Chọn</Text>
        </TouchableOpacity>
      </View>
      <RangeCalendar onChangeDates={onChangeDates} />
    </>
  );
};

export const DateFilter = ({onSelect, style}: DateFilterProps) => {
  const {showBottomActions} = useBottomAction();
  const {showBottomSheet} = useBottomSheet();
  const [selected, setSelected] = useState<number>(0);

  const option = OPTIONS.find(v => v.id === selected);

  const options = useMemo(() => {
    return OPTIONS.map(v => v.name);
  }, []);

  const onDateSelect = useCallback(
    dates => {
      const startTimestamp = dates[0] === 1 ? 1 : Date.parse(dates[0]) / 1000;
      const endTimestamp = dates[1] === 1 ? 1 : Date.parse(dates[1]) / 1000;
      onSelect?.({
        start: startTimestamp,
        end: endTimestamp,
      });
    },
    [onSelect],
  );

  const openBottomSheet = useCallback(() => {
    showBottomActions(
      {
        options,
      },
      index => {
        if (index === 7) {
          setTimeout(() => {
            showBottomSheet(
              <BottomSheetContainer onDateSelect={onDateSelect} />,
            );
          });
          setSelected(index);
        } else {
          setSelected(index);
          const today = new Date();

          const firstDayOfWeek = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1),
          );

          const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
          );

          switch (index) {
            case 0:
              onDateSelect([1, 1]);
              break;
            case 1:
              const firstToday = DayJS(today.setHours(0, 0, 0, 0));
              const lastToday = DayJS(today.setHours(24, 0, 0, 0));
              onDateSelect([firstToday, lastToday]);
              break;
            case 2:
              let yesterday = new Date();
              yesterday.setDate(today.getDate() - 1);
              const firstYesterday = DayJS(yesterday.setHours(0, 0, 0, 0));
              const lastYesterday = DayJS(yesterday.setHours(24, 0, 0, 0));
              onDateSelect([firstYesterday, lastYesterday]);
              break;
            case 3:
              const lastDayOfWeek = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() -
                  today.getDay() +
                  (today.getDay() == 0 ? -6 : 1) +
                  7,
              );
              onDateSelect([firstDayOfWeek, lastDayOfWeek]);
              break;
            case 4:
              const firstDayOfLastWeek = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() -
                  today.getDay() +
                  (today.getDay() == 0 ? -6 : 1) -
                  7,
              );
              onDateSelect([firstDayOfLastWeek, firstDayOfWeek]);
              break;
            case 5:
              const lastDayOfMonth = new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                1,
              );
              onDateSelect([firstDayOfMonth, lastDayOfMonth]);
              break;
            case 6:
              const firstDayOfLastMonth = new Date(
                today.getFullYear(),
                today.getMonth() - 1,
              );
              onDateSelect([firstDayOfLastMonth, firstDayOfMonth]);
              break;
          }
        }
      },
    );
  }, []);

  return (
    <View style={[l.flexRow, l.alignCtr, l.py10, l.mx20, style]}>
      <VectorIcon type={IconType.fontAwesome} name="calendar" />
      <TouchableOpacity
        onPress={openBottomSheet}
        style={[l.flexRow, l.alignCtr]}>
        <Text style={[l.px10]}>{option?.name}</Text>
        <VectorIcon size={22} type={IconType.fontAwesome} name="caret-down" />
      </TouchableOpacity>
    </View>
  );
};
