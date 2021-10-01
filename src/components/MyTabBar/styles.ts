import {StyleSheet} from 'react-native';
import {l, c} from 'styles/shared';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    ...l.flex,
    ...l.py5,
    ...l.flexRow,
    ...l.flexCenter,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: c.green300,
    borderRightColor: c.green300,
    borderLeftColor: c.green300,
  },
});

export default styles;
