import {StyleSheet} from 'react-native';
import {l, t} from 'styles/shared';

const styles = StyleSheet.create({
  textWarning: {
    ...t.h5LG,
    ...t.bold,
    ...l.pb20,
  },
  debtSettingContainer: {
    ...l.px20,
    ...l.pt20,
  },
  itemContainer: {
    ...l.mb20,
  },
  textTitle: {
    ...t.bold,
    ...l.pr5,
  },
  rowItem: {
    ...l.flexRow,
    ...l.justifyBtw,
    ...l.mb10,
  },
  input: {
    ...l.pl0,
  },
});

export default styles;
