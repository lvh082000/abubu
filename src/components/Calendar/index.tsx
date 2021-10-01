import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2.',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7.',
    'Th.8',
    'Th.9.',
    'Th.10.',
    'Th.11.',
    'Th.12.',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7', 'CN'],
  today: 'Hôm nay',
};

LocaleConfig.defaultLocale = 'vi';

export * from './RangeCalendar';
