import {StyleSheet} from 'react-native';
import {l, t} from 'styles/shared';

const styles = StyleSheet.create({
  sectionManagement: {
    ...l.px30,
    ...l.mb20,
    ...l.pb10,
  },
  item: {
    ...l.flexRow,
    ...l.alignCtr,
    ...l.justifyBtw,
    ...l.py10,
  },
  title: {
    ...t.h4SM,
    ...t.bold,
  },
  textDescription: {
    ...t.medium,
  },
  viewButton: {
    marginHorizontal: 60,
    ...l.pt20,
  },
});

export default styles;
