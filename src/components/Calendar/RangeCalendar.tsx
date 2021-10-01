import DeviceHelper from 'config/DeviceHelper';
import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {
  CalendarList,
  CalendarListBaseProps,
  PeriodMarking,
  DateObject,
} from 'react-native-calendars';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {c} from 'styles/shared';
import DayJS from 'dayjs';
import {CalendarTheme} from './styles';

interface PeriodMarkingValue extends PeriodMarking {
  value: string;
}

interface RangeCalendarProps extends CalendarListBaseProps {
  onChangeDates?: (dates: string[]) => void;
}

type MarkedDates = Record<string, PeriodMarkingValue>;

const getRangeDays = (start: string, end: string) => {
  const ranges = [];

  let currentDate = DayJS(start);
  const endDate = DayJS(end).subtract(1, 'day');

  while (currentDate.isBefore(endDate)) {
    currentDate = currentDate.add(1, 'day');
    ranges.push(currentDate.format('YYYY-MM-DD'));
  }

  return ranges.reduce((result, value) => {
    //@ts-ignore
    result[value] = {
      value: value,
      ...MarkedDateStyle,
    };
    return result;
  }, {});
};

const MarkedDateStyle = {
  color: c.green800,
  textColor: c.white,
};

export const RangeCalendar = React.memo(
  ({current, onChangeDates, ...rest}: RangeCalendarProps) => {
    const {bottom} = useSafeAreaInsets();
    const [markedDates, setMarkedDates] = useState<MarkedDates>({});

    const onDayPress = useCallback(
      ({dateString}: DateObject) => {
        const dates = Object.values(markedDates);
        const selectedStartDay = dates.find(v => v.startingDay);
        const selectedEndDay = dates.find(v => v.endingDay);

        let data: MarkedDates = {};

        if (
          !!selectedStartDay &&
          DayJS(selectedStartDay.value).isAfter(dateString) &&
          !selectedEndDay
        ) {
          data[dateString] = {
            startingDay: true,
            value: dateString,
            ...MarkedDateStyle,
          };
          setMarkedDates({
            ...data,
          });
          return;
        }

        if (!!selectedEndDay && !!selectedStartDay) {
          setMarkedDates({});
          data[dateString] = {
            startingDay: true,
            value: dateString,
            ...MarkedDateStyle,
          };
          setMarkedDates({
            ...data,
          });
          return;
        }
        data[dateString] = {
          startingDay: !selectedStartDay,
          endingDay: !!selectedStartDay && dates.length === 1,
          value: dateString,
          ...MarkedDateStyle,
        };
        if (selectedStartDay) {
          const rangeDays = getRangeDays(selectedStartDay.value, dateString);

          data = {
            ...data,
            ...rangeDays,
          };
        }

        setMarkedDates({
          ...markedDates,
          ...data,
        });
      },
      [markedDates],
    );

    useEffect(() => {
      const dates = Object.values(markedDates);
      if (dates.length > 1) {
        const startDate = dates.find(v => v.startingDay);
        const endDate = dates.find(v => v.endingDay);
        if (startDate && endDate) {
          onChangeDates?.([startDate.value, endDate.value]);
        }
      }
    }, [markedDates, onChangeDates]);

    return (
      <>
        <CalendarList
          {...rest}
          horizontal={true}
          pagingEnabled={true}
          calendarWidth={DeviceHelper.width}
          current={current ?? new Date()}
          markingType={'period'}
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={CalendarTheme}
        />
        <View style={{height: bottom}} />
      </>
    );
  },
);
